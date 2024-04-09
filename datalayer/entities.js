class User
{
    constructor(id,name,email,password,role,profilePic)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profilePic = profilePic;
    }
    getId()
    {
        return this.id;
    }
    getName()
    {
        return this.name;
    }
    getEmail()
    {
        return this.email;
    }
    getPassword()
    {
        return this.password;
    }
    getRole()
    {
        return this.role;
    }
    getProfilePic()
    {
        return this.profilePic;
    }
}
class Course
{
    constructor(id,name,category,level,popularity)
    {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
        this.popularity = popularity;
    }
    getId()
    {
        return this.id;
    }
    getName()
    {
        return this.name;
    }
    getCategory()
    {
        return this.category;
    }
    getLevel()
    {
        return this.level;
    }
    getPopularity()
    {
        return this.popularity;
    }
}
module.exports = { User, Course };