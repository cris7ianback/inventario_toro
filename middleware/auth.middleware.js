const jwt = require("jsonwebtoken");
const models = require("../models/auth.model.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.EXP_SESSION_CRYPTO);

module.exports = {
    isAuthenticated: async (req, res, next) => {
      if (req.headers.authorization) {
        try {
          const session_id = await jwt.verify(
            req.headers.authorization.substr(7),
            process.env.JWT_SECRETO
          ).idr;
          const idr = cryptr.decrypt(session_id);
          models.validarSesion(idr, function (data) {
            if (!data) {
              return res.status(401).send("Token no encontrado");
            } else {
              const expiresNew = Math.round(
                (Date.now() + process.env.TIEMPO_EXTRA * 60 * 60 * 1000) / 1000
              );
              models.tiempoExtra(expiresNew, idr, function (data) { });
              req.session_id = idr;
              return next();
            }
          });
        } catch (error) {
          return res.status(401).send("No Autorizado, Token invalido");
        }
      } else {
        return res.status(401).send("No Autorizado, Token no encontrado");
      }
    },
  
    //validación de Rol desde front End hacia middleware
    isRoleAdmin: async (req, res, next) => {
      const session_id = req.session_id;
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res
              .status(401)
              .send("No Autorizado, session id no encontrada");
          } else {
            let id_rol = JSON.parse(data.data).id_rol;
            if (id_rol === "admin") {
              res.status(200).send("Es Admin");
            } else {
              return res.status(401).send("No Autorizado");
            }
          }
        });
      } catch (error) {
        res.status(401).json({ error: "No Autorizado" });
      }
    },
  
    isRoleEditor: async (req, res, next) => {
      //const session_id = req.headers.rid_ss0.substr(7)
      const session_id = req.session_id;
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res
              .status(401)
              .send("No autorizado, Session Id no encontrada");
          } else {
            const id_rol = JSON.parse(data.data).id_rol;
            if (id_rol === "usuario") {
              res.status(200).send("Rol Informática");
            } else {
              return res.status(401).send("No Autorizado");
            }
          }
        });
      } catch (error) {
        res.statu(401).json({ error: "No Autorizado" });
      }
    },
  
    isRoleEditorAdmin: async (req, res, next) => {
      //const session_id = req.rolekey //req.headers.rid_ss0.substr(7)
      const session_id = req.session_id;
  
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res
              .status(401)
              .send("No Autorizado, session id no encontrada");
          } else {
            let id_rol = JSON.parse(data.data).id_rol;
            if (id_rol === "usuario" || id_rol === "admin") {
              res.status(200).send("Autorizado");
            } else {
              return res.status(401).send("No Autorizado");
            }
          }
        });
      } catch (error) {
        res.status(401).json({ error: "No Autorizado" });
      }
    },
  
    isAuthRoleEditorAdmin: async (req, res, next) => {
      //const session_id = req.headers.rid_ss0.substr(7)
      const session_id = req.session_id;
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res.status(401).send("No Autorizado, session no encontrada");
          } else {
            let id_rol = JSON.parse(data.data).id_rol;
            if (id_rol === "usuario" || id_rol === "admin") {
              return next();
            } else {
              return res.status(401).send("No Autorizado");
            }
          }
        });
      } catch (error) {
        res.status(401).jswon({ error: " No Autorizado" });
      }
    },
  
    isAuthRoleAdmin: async (req, res, next) => {
      const session_id = req.session_id;
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res.status(401).send("No Autorizado, session no encontrada");
          } else {
            const id_rol = JSON.parse(data.data).id_rol;
            if (id_rol === "admin") {
              return next();
            } else {
              return res.status(401).send("No Autorizado");
            }
          }
        });
      } catch (error) {
        res.status(401).jswon({ error: "No Autorizado" });
      }
    },
  
    isRoleId: async (req, res, next) => {
      const session_id = req.session_id;
      try {
        models.validarSesion(session_id, function (data) {
          if (!data) {
            return res.status(401).send("Not authorized, session id not found");
          } else {
            let session_rolid = JSON.parse(data.data).id_rol;
            req.rolid = session_rolid;
            if (session_rolid === "admin") {
              return res.status(200).json({ status: 201 });
            } else if (session_rolid === "usuario") {
              return res.status(200).json({ status: 202 });
            }
          }
        });
      } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
      }
    },
  };