const multer = require("multer")

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
    const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    const file_extension = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1
    );

    if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(file.mimetype)) {
      throw Error('Invalid file');
    }
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(req.body)
    cb(null, Date.now() + "-" + file.originalname);
  }
})

const upload = multer({ storage: fileStorage });

module.exports = upload;