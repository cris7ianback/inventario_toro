const proveedorModule = require("../models/proveedor.model");
const conexion = require("../config/conexion");

module.exports = {

    addProveedor: async (req, res) => {
        const nombre = req.body.nombre;
        const sucursal = req.body.sucursal;
        const contacto = req.body.contacto;       

        proveedorModule.buscarProveedor(nombre, function (data) {
            if (data != undefined) {
                return res.status(501).send("Provedor ya se encuentra Registrado");
            } else {
                proveedorModule.addProveedor(
                    nombre,sucursal, contacto,
                    function (data) {
                        return res.status(200).send("Provedor registrado con exito");
                    })
            }
        })
    },

    editProveedor: async (req, res) => {
        const id = req.params.id;
        const nombre = req.body.nombre;
        const sucursal = req.body.sucursal;
        const contacto = req.body.contacto;       

        proveedorModule.buscarId(id, function (data) {
            if (data == undefined) {
                return res.status(501).send("Proveedor no existe")
            } else {
                proveedorModule.editProveedor(
                    id, nombre, sucursal, contacto,  function (data) {
                        res.send(data);
                    }
                )
            }
        })
    },

    listProveedor: function (req, res) {
        proveedorModule.listProveedor(function (data) {
            res.send(data);
        })
    },

    deleteProveedor: function (req, res) {
        const id = req.params.id;
        proveedorModule.buscarId(id, function (data) {
            if (data == undefined) {
                res.status(501).json({
                    msg: "Proveedor no existe",
                    status: "failed"
                });
            } else {
                proveedorModule.deleteProveedor(id, function (data) {
                    res.status(200).json({
                        msg: "Proveedor Eliminado",
                        status: "success"
                    })
                });
            }
        })
    },


}