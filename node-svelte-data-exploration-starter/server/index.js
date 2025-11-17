import express from "express";
import cors from "cors";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// --- Endpoint para leer bmw.csv ---
app.get("/api/datos-csv", (_req, res) => {
  const results = [];
  
  // Ruta corregida: Sube dos niveles (desde server/ -> node-svelte.../ -> AccesoADatos.../)
  const csvFilePath = path.join(__dirname, '..', '..', 'bmw.csv'); // <--- RUTA CORRECTA A BMW.CSV

  console.log(`Intentando leer el archivo CSV desde: ${csvFilePath}`); // Para depuración

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(`CSV leído con éxito. Se encontraron ${results.length} filas.`); // Para depuración
      res.json(results);
    })
    .on('error', (error) => {
      console.error("Error al leer el archivo CSV:", error);
      res.status(500).json({ error: "Error al leer los datos del archivo CSV", details: error.message });
    });
});
// --- Fin del endpoint ---

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`Endpoint CSV disponible en: http://localhost:${PORT}/api/datos-csv`);
});