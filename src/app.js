require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API de productos funcionando correctamente",
  });
});

// Rutas de productos
app.use("/api/productos", productosRoutes);

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
