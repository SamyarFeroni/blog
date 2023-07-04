const {Router} = require('express');
const contoroller = require('./contoroller') //rodemap for express

const router = Router()

// routers for CRUD and login
router.get("/getusers", contoroller.getUsers);
router.post("/register", contoroller.addUser);
// router.post("/Rest-password", contoroller.RestPassword);
router.post("/login/upload", contoroller.loginUser)
router.delete("/:id", contoroller.removeUser);
router.post("/login",contoroller.loginUser);


module.exports = router


