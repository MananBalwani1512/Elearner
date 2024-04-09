var express = require('express');
var entities = require('./../datalayer/entities');
var manager = require('./../datalayer/manager');
var app = express();
app.use(express.json());
//Courses operation starts here
app.post("/getAllCourses",async function(request,response)
{
    var obj = request.body;
    console.log(obj);
    var pageSize = obj.pageSize;
    var pageNumber = obj.pageNumber;
    delete obj.pageSize;
    delete obj.pageNumber;
    try
    {
        var courseManager = new manager.CourseManager();
        var courses = await courseManager.getAll(obj,pageSize,pageNumber);
        response.send(courses);
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/addCourse",async function(request,response)
{
    var name = request.body.name;
    var category = request.body.category;
    var popularity = request.body.popularity;
    var level = request.body.level;
    try
    {
        if(! request.headers.role || request.headers.role != "admin")
            throw Error("Unauthorised user");    
        var course = new entities.Course(0,name,category,level,popularity);
        var courseManager = new manager.CourseManager();
        await courseManager.add(course);
        response.send({"success" : true,"id" : course.id});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/updateCourse",async function(request,response)
{
    var id = request.body.id;
    var name = request.body.name;
    var category = request.body.category;
    var popularity = request.body.popularity;
    var level = request.body.level;
    try
    {
        if(! request.headers.role || request.headers.role != "admin")
            throw Error("Unauthorised user");
        var course = new entities.Course(id,name,category,level,popularity);
        var courseManager = new manager.CourseManager();
        await courseManager.update(course);
        response.send({"success" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/deleteCourse",async function(request,response)
{
    var id = request.body.id;
    try
    {
        if(! request.headers.role || request.headers.role != "admin")
            throw Error("Unauthorised user");
        var courseManager = new manager.CourseManager();
        await courseManager.remove(id);
        response.send({"success" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
//Courses operation ends here
//Course Enrollment operation starts here
app.post("/enrollUserInCourse",async function(request,response)
{
    var userId = request.body.userId;
    var courseId = request.body.courseId;
    try
    {
        var enrollManager = new manager.EnrollManager();
        await enrollManager.add(userId,courseId);
        response.send({"succcess" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/unenrollUserInCourse",async function(request,response)
{
    var userId = request.body.userId;
    var courseId = request.body.courseId;
    try
    {
        var enrollManager = new manager.EnrollManager();
        await enrollManager.remove(userId,courseId);
        response.send({"success" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
//Course Enrollment operation ends here
app.listen(5001,function(err)
{
    if(err)
        return console.log(err);
    else
        console.log("Server started on port : 5001");
});
