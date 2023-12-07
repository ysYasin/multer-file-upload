# multer-file-upload app, 
#### Express node and html css used


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
