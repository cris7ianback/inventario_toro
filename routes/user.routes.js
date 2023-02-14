const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/user.controller");
const middlewareController = require("../middleware/auth.middleware");
const controllerAuth = require("../controller/auth.controller");

router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//   Rutas para Loguear & Logout 
router.post("/login", controllerAuth.login);
router.get("/logout", controllerAuth.LogOut);

//rutas Usuario

router.post("/addUser", controllerUser.registerUser);
router.get("/deleteUser/:id_user", controllerUser.deleteUser);
router.get("/listUser", controllerUser.listUser);
router.get("/listUserId/:id_user", controllerUser.listarUserId);
router.put("/modifyUser/:id_user", controllerUser.modifyUser);
router.put("/modifyPass", controllerUser.modifyPass);
router.put("/modifyPassUser/:id_user", controllerUser.modifyPassUser);
router.get("/isRolId", middlewareController.isAuthenticated, middlewareController.isRoleId);


module.exports = router;