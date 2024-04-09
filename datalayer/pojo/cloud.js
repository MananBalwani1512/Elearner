const { v2 } = require('cloudinary'); 
var fs = require('fs');
v2.config({ 
    cloud_name: 'dadq2ec1o', 
    api_key: '864874291683237', 
    api_secret: 'agZh7Kb5XvGaoxbdVER5BOrxpuA' 
});
function uploadImage(file,id)
{
    v2.uploader.upload(file,
    {
        public_id: id
    },
    function(error, result)
    {
        if(error)
        {
            console.log(error);
            throw Error("Cannot upload photo");
        }
        deleteFile(file);
    });
}
async function deleteImage(email)
{
    var result = await v2.uploader.destroy(email);
    if(result.result != "ok")
        throw Error("Unable to delete resource : "+email);
}
async function deleteFile(path)
{
    fs.unlink(path,function(err)
    {
        if(err)
            throw Error("Unable to delete file at : "+path);
    });
}
async function hasImage(email)
{
    try
    {
        var result = await v2.api.resource(email);
        console.log(result.error);
        if(result.error)
            return false;
        return true;
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports = { uploadImage,deleteImage,hasImage };