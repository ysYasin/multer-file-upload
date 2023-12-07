const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

/* -------------------------------------------------------------------------- */
/*                                multer staps                                */
/* -------------------------------------------------------------------------- */

/**
 *install and require multer
 * multer fuction create
 * 1) in that function, dest, limits, filefilter ,
 * 1|> filefilter as a parameter req,file and cb(callback)
 * 1|> if it will not pass eny arror then cb(null, true) parameter
 * 1|> if it will pass with error then cb({errormessage:'fdy'}, false) parameter --error handling
  /* -------------------------------- post router params -------------------------------- */
/**
 * // to post one data from an input write "upload.single("name")"
* to post multiple data from an input write "upload.array("name", 12)" :: 12 mean number of lifes, like here we ar want to get 3 fiels we can use here any intiger
* to post multiple data from multiple inpute write this |~~
*upload.fields([
   { name: 'image', maxCount: 3 },
   { name: 'pdf', maxCount: 1 }
])
/* -------------------------- * stem-3 filename set ------------------------- */
/**
 * a const by the name of storage {its a convention, it can be any name}
 * this cost will contain a mulder.diskStorage()
 * in this has mainly tow parameters
 * 1/ destination(req,file,cd) , means destination file ;
 * filename(req,file,cb) means filename diclieration
  */

/* -------------------------------------------------------------------------- */
/*                    code step by step , last>first>middle                   */
/* -------------------------------------------------------------------------- */

const myUpload = './myUploads' // defaining the destinamtion file in a constant
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, myUpload) // setting destination
    },
    filename: (req, file, cb) => {
        //setting file name controled by developer
        const ext = path.extname(`${req.originalname}`);
        const filen = file.originalname
            .replace(ext, '')
            .toLowerCase()
            .split(" ")
            .join("-" + "-" + Date.now().toLocaleString)

        cb(null, filen + ext)
    }

})

const upload = multer({ // mulder method declier
    storage: storage, // storage is the previus storage constant
    limits: { fileSize: 1024 * 1024 }, // setting file size limmits
    fileFilter: function (req, file, cb) { // filterd uploaded files
        if (file.fieldname === 'image') {
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png'
            ) {
                cb(null, true); // if requerment success
            } else {
                cb(new Error('only image/jpeg and image/jpg and image/png are supported!'), false) // error handling callback
            }
        } else if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else (new Error('uploaded file is invalied'), false) // error handling callback

    }
})

// post route,
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

// error handler middleware
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