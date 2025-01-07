const {
  uploadBase64,
  resizeImage,
  getAllSizeImages,
  removeImage,
} = require("../../helper/FileSystem");
const { existsSync } = require("fs");

const upload = async (req, res) => {
  let { image, folder_name } = req.body;
  // let mode = 'resize';

  if (image) {
    let uploadResp = await uploadBase64(image, folder_name);
    if (uploadResp.status) {
      let imageFile = uploadResp.imageUrl.split("/");
      let fileName = imageFile[imageFile.length - 1];
      imageFile[imageFile.length - 1] = "";
      // let filePath  = imageFile.join('/');

      // resizeImage(uploadResp.imageUrl,'970*672',`${filePath}/L-${fileName}`,mode)
      // resizeImage(uploadResp.imageUrl,'485*336',`${filePath}/M-${fileName}`,mode)
      // resizeImage(uploadResp.imageUrl,'235*162',`${filePath}/S-${fileName}`,mode)

      res.json({
        status: uploadResp.status,
        imageUrl: uploadResp.imageUrl,
        message: uploadResp.message,
        fileName: fileName,
      });
    } else {
      res.json({
        status: false,
        message: uploadResp.message,
      });
    }
  } else {
    res.json({
      status: false,
      message: "Image Field Required",
    });
  }
};

const deleteImage = async (req, res) => {
  let { image } = req.body;

  if (image) {
    if (existsSync(image)) {
      if (removeImage(image)) {
        res.send({
          status: true,
          message: "Image Deleted Succesfully",
        });
      } else {
        res.send({
          status: false,
          message: "Something went wrong please try later",
        });
      }
    } else {
      res.send({
        status: false,
        message: "Image not found",
      });
    }
  } else {
    res.send({
      status: false,
      message: "Image Field is required",
    });
  }
};

module.exports = { upload, deleteImage };
