const { isJSON, foreach } = require('./General')
const { writeFile, existsSync, mkdirSync, unlink } = require('fs');
const Jimp = require("jimp");
const fileSystemPath = process.cwd();

const getAllSizeImages = (file) => {
    let data = null;
    if(isJSON(file))
    {
        file = JSON.parse(file);
        data = [];
        file.map((item,index)=>{
            let path = getOnlyPath(item); 
            let name = getFileNameFromPath(item); 
            
            data.push({
                'original':existsSync(item),
                'large':existsSync(`${path}L-${name}`) ? `${path}L-${name}` : '',
                'medium':existsSync(`${path}M-${name}`) ? `${path}M-${name}` : '' ,
                'small':existsSync(`${path}S-${name}`) ? `${path}S-${name}` : '',
            });
        })
    }
    else
    {
        let path = getOnlyPath(file); 
        let name = getFileNameFromPath(file); 
        
        data = {
            'original':existsSync(file) ? file : '',
            'large':existsSync(`${path}L-${name}`) ? `${path}L-${name}` : '',
            'medium':existsSync(`${path}M-${name}`) ? `${path}M-${name}`: '',
            'small':existsSync(`${path}S-${name}`) ? `${path}S-${name}` : '',
        };
    }

    return data;
}

const getFileNameFromPath = (path) => {
    let name = path.split('/');
    return name[(name.length)-1];
}

const getOnlyPath = (path) => {
    let name = path.split('/');
    name[(name.length)-1] = '';
    return name.join('/');
}

const uploadBase64 = async (base64Data, folderName) => {
    let [temp,base64] = base64Data.split(',');
    let ext = await getExtensionFromBase64(base64Data);
    
    let fileName     = `${Date.now()}.${ext}`;
    let imageBuffer  =  Buffer.from(base64, 'base64');
    let path         = null;
    
    if(folderName)
    {
        path = `uploads/${folderName}`;
    }
    else
    {
        path = `uploads`;
    }
    
    if(!existsSync(path))
    {
        mkdirSync(`${fileSystemPath}/${path}`)
    }
    path = `${path}/${fileName}`;    

    let uploadFile = new Promise((resolve,reject)=>{
        let returnData   = null;
        
        let callBack = async (err) => {
            if(err)
            {
                returnData = { 
                    status:false,
                    imageUrl:null,
                    message:'Error in image saving'
                };
                resolve(returnData);
            }
            else
            {
                returnData = { 
                    status:true,
                    imageUrl:path,
                    message: 'File Uploaded Successfully',
                };
                resolve(returnData);
            }
        }
        writeFile(path, imageBuffer, 'base64', callBack);
    })

    return await uploadFile;
}

const removeImage = async (path) => {
    if(typeof path == 'string')
    {
        if(existsSync(path))
        {
            unlink(path,(err) => {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    console.log("File Removed Successfuly")
                }
            })
        }
        else
        {
            console.log("File Not Found in filesystem")
        }
    }
    else if(typeof path == 'object')
    {
        foreach(path, (key,item)=>{
            removeImage(item)
        })
    }
}

const getExtensionFromBase64 = (base64) =>{
    let [mimeType,ext]   = base64.split(',')[0].split(';')[0].split('/');
    
    return ext;
}

const resizeImage = (image,sizes,filePath,type = 'resize') => {
    return Jimp.read(`${fileSystemPath}/${image}`)
            .then((obj) => {
                let [w,h] = sizes.split('*');
                let newFilePath = `${fileSystemPath}/${filePath}`;
                let resp;
                
                if(type == 'resize')
                {
                    resp = obj.resize(parseInt(w),parseInt(h)).write(newFilePath);
                }
                else if(type == 'crop')
                {
                    resp = obj.crop(50,50,parseInt(w),parseInt(h)).write(newFilePath);
                }

                if(resp)
                {
                    return {
                        status:true,
                        file:filePath
                    }
                }
                else
                {
                    return {
                        status:false,
                        file:null
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                return {
                    status:false,
                    file:null
                }
            });
}

const imageGetter = (image)=>{
    return image ? getAllSizeImages(image) : null;
}

module.exports = {
    getAllSizeImages,
    getFileNameFromPath,
    getOnlyPath,
    uploadBase64,
    resizeImage,
    imageGetter,
    removeImage
}