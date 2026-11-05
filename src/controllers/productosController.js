const pool = require("../config/db");

// GET: Listar todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await pool.execute(
      "SELECT * FROM productos ORDER BY id ASC",
    );

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({
      error: "Error interno al obtener productos",
    });
  }
};

// GET: Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        error: "El ID debe ser un entero positivo",
      });
    }

    const [productos] = await pool.execute(
      "SELECT * FROM productos WHERE id = ?",
      [id],
    );

    if (productos.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json(productos[0]);
  } catch (error) {
    console.error("Error al obtener producto:", error.message);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

// POST: Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (
      typeof nombre !== "string" ||
      !nombre.trim() ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio < 0 ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      (descripcion !== undefined &&
        descripcion !== null &&
        typeof descripcion !== "string")
    ) {
      return res.status(400).json({
        error: "Datos inválidos. Verifique nombre, precio y stock",
      });
    }

    const [resultado] = await pool.execute(
      `INSERT INTO productos
       (nombre, descripcion, precio, stock)
       VALUES (?, ?, ?, ?)`,
      [nombre.trim(), descripcion ?? null, precio, stock],
    );

    res.status(201).json({
      mensaje: "Producto registrado correctamente",
      producto: {
        id: resultado.insertId,
        nombre: nombre.trim(),
        descripcion: descripcion ?? null,
        precio,
        stock,
      },
    });
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({
      error: "Error interno al registrar producto",
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
};
