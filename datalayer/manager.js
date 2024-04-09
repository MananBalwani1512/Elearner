var connector = require('./connector');
var entities = require('./entities');
var encrypter = require('./pojo/encrypter');
var emailSender = require('./pojo/emailSender');
var cloud  = require('./pojo/cloud');
class UserManager
{
    async getByEmail(email)
    {
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select * from users where email = '${email}'`);
            var row = resultSet.rows[0];
            var user = new entities.User(row.id,row.name,row.email,row.password,row.role,"Profile pic");
            return user;
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async add(user)
    {
        var name = user.name;
        var email = user.email;
        var password = user.password;
        var role = "user";
        var profilePic = user.profilePic;
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id from users where email = '${email}'`);
            if(resultSet.rows.length > 0)
            {
                throw Error(`Email ${email} already exists`);
            }
            var hashCode = await encrypter.encryptPassword(password);
            resultSet = await connection.query(`insert into users (name,email,password,role) values ('${name}','${email}','${hashCode}','${role}') returning id`);
            user.id = resultSet.rows[0].id;
            console.log(user.id);
            if(profilePic)
            {
                cloud.uploadImage(profilePic,email);
            }
            var html = `<h2>We welcome you ${name}.</h2><br>`;
            html = html+`<p>You can access courses and enroll in our courses for better learning and increase your performance</p><br>`;
            html = html+`<p>Waiting for you to enroll in a course and kick start your career.</p><br>`;
            html = html+`<b>Thank You <br> Team Elearners</b>`;
            emailSender.sendEmail(email,"Welcome to our platform",html);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async update(user)
    {
        var id = user.id;
        var name = user.name;
        var email = user.email;
        var password = user.password;
        var profilePic = user.profilePic;
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id,email from users where id = ${id}`);
            if(resultSet.rows.length == 0)
                throw Error("Invalid user id : "+id);
            var prevEmail = await resultSet.rows[0].email;    
            resultSet = await connection.query(`select id from users where email = '${email}' and id <> ${id}`);
            if(resultSet.rows.length > 0)
            {
                await connection.close();
                throw Error(`Email ${email} already exists`);
            }
            var hashCode = await encrypter.encryptPassword(password);
            resultSet = await connection.query(`update users set name = '${name}',email = '${email}',password = '${hashCode}' where id = ${id}`);
            var result = await cloud.hasImage(prevEmail);
            console.log(result);
            if(result)
                await cloud.deleteImage(prevEmail);
            await cloud.uploadImage(profilePic,email);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async remove(id)
    {
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select email from users where id = ${id}`);
            if(resultSet.rows.length == 0)
                throw Error("Invalid user id : "+id);
            var email = resultSet.rows[0].email;
            await connection.query(`delete from user_course_enroll where user_id = ${id}`);
            await connection.query(`delete from users where id = ${id}`);
            if(await cloud.hasImage(email))
            {
                await cloud.deleteImage(email);
            }    
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async verifyUser(user)
    {
        var email = user.email;
        var password = user.password;
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id,password,role from users where email = '${email}'`);
            if(resultSet.rows.length == 0)
            {
                throw Error(`Invalid email : ${email}`);
            }
            var psswrd = resultSet.rows[0].password;
            if(! await encrypter.comparePassword(psswrd,password))
            {
                throw Error("Invalid Password");
            }
            var id = resultSet.rows[0].id;
            var role = resultSet.rows[0].role;
            user.id = id;
            user.role = role;
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
}
class CourseManager
{
    async getAll(filters,pageSize,pageNumber)
    {
        var startIndex = (pageNumber-1)*pageSize;
        var keys = Object.keys(filters);
        var query = `select * from course`;
        if(keys.length != 0)
            query = query+` where `;
        for(var i = 0; i < keys.length ; i++)
        {
            var key = keys[i];
            var obj = filters[key];
            if(i >= 1)
                query = query+` and`;
            if(obj.type == "text")
                query = query+` lower(${key})`
            else
                query = query+` ${key}`;
            if(obj.operation == "gt")
            {
                query = query+` > `;
            }
            else if(obj.operation == "eq")
                query = query+` = `;
            else if(obj.operation == "lt")
                query = query+` < `;
            else if(obj.operation == "lteq")
                query = query+` <= `;
            else if(obj.operation == "gteq")
                query = query+` >= `;
            else
                query = query+` <> `;
            if(obj.type == "text")
                query = query+`lower('${obj.value}')`;
            else
                query = query+`${parseInt(obj.value)}`;
        }
        query = query+` limit ${pageSize} offset ${startIndex}`;
        console.log(query);
        var courses = [];
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(query);
            for(var i = 0; i < resultSet.rows.length; i++)
            {
                var row = resultSet.rows[i];
                courses.push(new entities.Course(row.id,row.name,row.category,row.level,row.popularity));
            }
            return courses;
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async remove(id)
    {
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id from course where id = ${id}`);
            if(resultSet.rows.length == 0)
            {
                throw Error("Invalid course Id : "+id);
            }
            resultSet = await connection.query(`select user_id from user_course_enroll where course_id = ${id}`);
            if(resultSet.rows.length > 0)
            {
                throw Error("Some users are enrolled to this course cannot delete this course");
            }
            connection.query(`delete from course where id = ${id}`);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async add(course)
    {
        var name = course.name;
        var category = course.category;
        var level = course.level;
        var popularity = course.popularity;
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id from course where lower(name) = lower('${course.name}')`);
            if(resultSet.rows.length > 0)
            {
                throw Error("A course named "+course.name+" already exists");
            }
            resultSet = await connection.query(`insert into course (name,category,level,popularity) values ('${name}','${category}','${level}','${popularity}') returning id`);
            course.id = resultSet.rows[0].id;
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async update(course)
    {
        var id = course.id;
        var name = course.name;
        var category = course.category;
        var level = course.level;
        var popularity = course.popularity;
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select id from course where id = ${id}`);
            if(resultSet.rows.length == 0)
            {
                throw Error("Invalid course code : "+id);
            }
            await connection.query(`update course set name = '${name}',category = '${category}', level = '${level}',popularity = '${popularity}' where id = ${id}`);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
}
class EnrollManager
{
    async add(userId,courseId)
    {
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select name,email from users where id = ${userId}`);
            if(resultSet.rows.length == 0)
                throw Error(`Invalid user id : ${userId}`);
            var email = resultSet.rows[0].email;
            var userName = resultSet.rows[0].name;    
            resultSet = await connection.query(`select name from course where id = ${courseId}`);
            if(resultSet.rows.length == 0)
                throw Error(`Invalid course id : ${courseId}`);
            var name = resultSet.rows[0].name;    
            resultSet = await connection.query(`select user_id from user_course_enroll where user_id = ${userId} and course_id = ${courseId}`);        
            if(resultSet.rows.length > 0 )
                throw Error("User already enrolled in this course.");
            await connection.query(`insert into user_course_enroll values (${userId},${courseId})`);
            var html = html+`<h3>${userName} registered Succesfully</h3><br>`;
            html = html+`Welcome ${userName} we hope all the best for yor journey with us.`;
            html = html+`<h2>Thank You<br>Team Elearners`;
            emailSender.sendEmail(email,`Succesfully Registered in ${name} course`,html);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message);
        }
    }
    async remove(userId,courseId)
    {
        try
        {
            var connection = await connector.getConnection();
            var resultSet = await connection.query(`select user_id from user_course_enroll where user_id = ${userId} and course_id = ${courseId}`);
            if(resultSet.rows.length == 0)
                throw Error("Cannot unenroll user since he is not enrolled in it");
            await connection.query(`delete from user_course_enroll where user_id = ${userId} and course_id = ${courseId}`);
        }
        catch(err)
        {
            console.log(err);
            throw Error(err.message());
        }
    }
}
module.exports = { UserManager, CourseManager, EnrollManager };