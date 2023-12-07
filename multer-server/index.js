const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

const myUpload = './myUploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, myUpload)
    },
    filename: (req, file, cb) => {
        //yasin arafat.pdf
        const ext = path.extname(`${req.originalname}`);
        const filen = file.originalname
            .replace(ext, '')
            .toLowerCase()
            .split(" ")
            .join("-" + "-" + Date.now().toLocaleString)

        cb(null, filen + ext)
    }

})

const upload = multer({
    storage: storage,
    limits: { fieldNameSize: 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'image') {
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png'
            ) {
                cb(null, true);
            } else {
                cb(new Error('only image/jpeg and image/jpg and image/png are supported!'), false)
            }
        } else if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else (new Error('uploaded file is invalied'), false)

    }
})
// to post one data from an input write "upload.single("name")"
// to post multiple data from an input write "upload.array("name", 12)" :: 12 mean number of lifes, like here we ar want to get 3 fiels we can use here any intiger
// to post multiple data from multiple inpute write this |~~
app.post('/', upload.fields([
    { name: 'image', maxCount: 3 },
    { name: 'pdf', maxCount: 1 }
]), (req, res) => {
    if (req.files) {
        res.json({ success: req.files })
    } else {
        res.send({ message: "file upload failed" })
    }
})
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.sed({ err: err.message }).status(500)
        } else {
            res.send(`${err.message}`).status(401)
        }
    } else {
        res.sed(`wooow! file successfully uploaded`)
    }
})

app.listen(port, function () {
    console.log(`listening on ${port}`);
})