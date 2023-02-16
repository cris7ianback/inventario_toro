const express = require("express");
const router = express.Router();
const controllerProveedor = require("../controller/proveedor.controller");

router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/addProveedor", controllerProveedor.addProveedor);
router.put("/editProveedor/:id", controllerProveedor.editProveedor);
router.get("/listProveedores", controllerProveedor.listProveedor);
router.get("/deleteProveedor/:id", controllerProveedor.deleteProveedor)

module.exports = router
