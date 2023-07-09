const {Router} = require('express');
const contoroller = require('./contoroller') //rodemap for express
const verifyToken = require('./verifyToken')
const router = Router()
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images')
    }, 
    filename:(req,file, cb) =>{
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})
const upload = multer({storage: storage})




// routers for CRUD and login
router.get("/getusers", contoroller.getUsers);
router.post("/register", contoroller.addUser);
// router.post("/Rest-password", contoroller.RestPassword);
router.delete("/:id", contoroller.removeUser);
router.post("/login",contoroller.loginUser);
router.post("/upload",upload.single("image") ,contoroller.uploadImage)

module.exports = router


