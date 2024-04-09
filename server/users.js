var express = require('express');
var app = express();
var expressFileUpload = require('express-fileupload');
var entities = require('../datalayer/entities');
var manager = require('../datalayer/manager');
app.use(expressFileUpload({
    "limit" : 
    {
        "fileSize" : 1024*1024*5
    }
}));
//User operations start here
app.post("/test",async function(request,response)
{
    console.log(request.headers.role);
    console.log(request.role);
    console.log(request);
    response.send(true);
})
app.post("/addUser",async function(request,response)
{
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var profilePic;
    if(request.files && Object.keys(request.files).length > 0)
    {
        if(request.files.profilePic.truncated == true)
        {
            throw Error("File Size exceeded");
        }
        else
        {
            var path = __dirname+"/Images/"+request.files.profilePic.name;
            profilePic = path;
            request.files.profilePic.mv(path,function(err)
            {
                if(err)
                    throw Error("Unable to upload image");
            });
        }
    }
    try
    {
        var user = new entities.User(0,name,email,password,"user",profilePic);
        var userManager = new manager.UserManager();
        await userManager.add(user);
        response.send({"success" : true,"id" : user.id});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.get("/getUserByEmail",async function(request,response)
{
    var email = request.query.email;
    try
    {
        var userManager = new manager.UserManager();
        var user = await userManager.getByEmail(email);
        response.send(user);
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/updateUser",async function(request,response)
{
    var id = request.body.id;
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var role = "user";
    var profilePic;
    if(request.files && Object.keys(request.files).length > 0)
    {
        if(request.files.profilePic.truncated == true)
        {
            throw Error("File Size exceeded");
        }
        else
        {
            var path = __dirname+"/Images/"+request.files.profilePic.name;
            profilePic = path;
            request.files.profilePic.mv(path,function(err)
            {
                if(err)
                    throw Error("Unable to upload image");
            });
        }
    }
    try
    {
        var user = new entities.User(id,name,email,password,role,profilePic);
        var userManager = new manager.UserManager();
        await userManager.update(user);
        //also call method to remove user from all the courses he is enrolled in.
        response.send({"success" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/deleteUser",async function(request,response)
{
    var id = request.body.id;
    try
    {
        var userManager = new manager.UserManager();
        await userManager.remove(id);
        response.send({"success" : true});
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
app.post("/authenticateUser",async function(request,response)
{
    var email = request.body.email;
    var password = request.body.password;
    try
    {
        var user = new entities.User(0,"",email,password,"","");
        var userManager = new manager.UserManager();
        await userManager.verifyUser(user);
        response.send(user);
    }
    catch(err)
    {
        console.log(err);
        response.send({"success" : false,"exception" : err.message});
    }
});
//User operations end here
app.listen(5000,function(err)
{
    if(err)
        return console.log(err);
    else
        console.log("Server started on port : 5000");
});