const express = require("express");
const router = express.Router();
const controllerProducto = require("../controller/producto.controller");

router.use(function (res, req, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/addProducto", controllerProducto.addProducto);
router.put("/editProducto/:id", controllerProducto.editProducto);
router.get("/listProductos", controllerProducto.listProductos);
router.get("/deleteProducto/:id", controllerProducto.deleteProducto)

module.exports = router
