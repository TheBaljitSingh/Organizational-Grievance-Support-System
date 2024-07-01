const cloudinary = require('cloudinary').v2;
const fs = require('fs');

require('dotenv').config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});

console.log("cloudinary cloud address "+process.env.CLOUDINARY_CLOUD);


const uploadOnCloudinary = async (localFilePath)=>{
    try{
        
        // console.log("cloudinary function is called "+ localFilePath);
        if(!localFilePath) return null;
        //upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath ,{
            resource_type : "auto"
        })
        //file has been uploaded successfylly
        // console.log(response);
        // console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);

        
        return response;


    } catch(error){
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the uploaded operation got failed
        console.log("error while uploading on cloudinary"+error)
        return null;

    }
}

module.exports =  {uploadOnCloudinary};

