const multer = require('multer');
const path = require('path');

function uploder(
    subfolder,
    allowedMimeTypes,
    fileSizeLimit,
    errorMessage) {

    // File upload fonder
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder}`;

    // define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-') + '-' + Date.now();

            cb(null, fileName + fileExt);
        }
    });

    // prepare the final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: fileSizeLimit
        },
        fileFilter: (req, file, cb) => {
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        }
    })

    return upload;
}

module.exports = uploder;