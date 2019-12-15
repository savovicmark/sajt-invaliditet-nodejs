const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `file-${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Samo su slike dozvoljene za upload'))
        } else {
            cb(null, true)
        }
    }
})

exports.uploadImage = upload.single('image');

exports.returnImageName = (req, res) => {
    console.log(req.file);
    res.status(200).json({
        file: req.file.filename
    })
}