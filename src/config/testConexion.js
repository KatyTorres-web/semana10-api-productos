const pool = require("./db");

async function probarConexion() {
  try {
    const [rows] = await pool.execute(
      "SELECT DATABASE() AS base_datos, COUNT(*) AS total_productos FROM productos",
    );

    console.log("Conexión a MySQL exitosa");
    console.log("Base de datos:", rows[0].base_datos);
    console.log("Total de productos:", rows[0].total_productos);
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

probarConexion();
