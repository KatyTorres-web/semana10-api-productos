const express = require("express");
const router = express.Router();

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
} = require("../controllers/productosController");

// Obtener todos los productos
router.get("/", obtenerProductos);

// Obtener producto por ID
router.get("/:id", obtenerProductoPorId);

// Registrar un nuevo producto
router.post("/", crearProducto);

module.exports = router;
