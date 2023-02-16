const productoModule = require("../models/productos.model");
const conexion = require("../config/conexion");

module.exports = {

    addProducto: async (req, res) => {
        const nombre = req.body.nombre;
        const valor = req.body.valor;
        const fecha_vencimiento = req.body.fecha_vencimiento;
        const cantidad = req.body.cantidad;
        const proveedor = req.body.proveedor;

        productoModule.buscarProducto(nombre, function (data) {
            if (data != undefined) {
                return res.status(501).send("Producto ya se encuentra Registrado");
            } else {
                productoModule.addProducto(
                    nombre, valor, fecha_vencimiento, cantidad, proveedor,
                    function (data) {
                        return res.status(200).send("Producto registrado con exito");
                    })
            }
        })
    },

    editProducto: async (req, res) => {
        const id = req.params.id;
        const nombre = req.body.nombre;
        const valor = req.body.valor;
        const fecha_vencimiento = req.body.fecha_vencimiento;
        const cantidad = req.body.cantidad;
        const proveedor = req.body.proveedor;

        productoModule.buscarId(id, function (data) {
            if (data == undefined) {
                return res.status(501).send("Firewall no existe")
            } else {
                productoModule.editProducto(
                    id, nombre, valor, fecha_vencimiento, cantidad, proveedor, function (data) {
                        res.send(data);
                    }
                )
            }
        })
    },

    listProductos: function (req, res) {
        productoModule.listProductos(function (data) {
            res.send(data);
        })
    },

    deleteProducto: function (req, res) {
        const id = req.params.id;
        productoModule.buscarId(id, function (data) {
            if (data == undefined) {
                res.status(501).json({
                    msg: "Producto no existe",
                    status: "failed"
                });
            } else {
                productoModule.deleteProducto(id, function (data) {
                    res.status(200).json({
                        msg: "Producto Eliminado",
                        status: "success"
                    })
                });
            }
        })
    },


}