import multer from 'multer';

// SET STORAGE
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Assets');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

/* defined filter */
const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/octet-stream'
    ) {
        cb(null, true);
    } else {
        cb(new Error("File format should be PNG,JPG,JPEG for images"), false);
    }
};

export const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

