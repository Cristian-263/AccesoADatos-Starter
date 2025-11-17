<script>
  import { onMount } from 'svelte';

  let apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5174";
  let bmwData = []; // Variable para guardar los datos de BMW
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      // Pedimos los datos al backend (Paso 1)
      const response = await fetch(`${apiBase}/api/datos-csv`);

      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.statusText}`);
      }

      bmwData = await response.json(); // Guardamos los datos de bmw.csv
      loading = false;
    } catch (err) {
      console.error("Error al cargar datos del CSV:", err);
      error = err.message;
      loading = false;
    }
  });

  // Función para obtener las cabeceras
  function getHeaders(data) {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }
</script>

<div class="container">
  <h1>Dashboard BMW CSV Data</h1>
  <p>Datos cargados desde: <code>{apiBase}/api/datos-csv</code></p>

  {#if loading}
    <p>Cargando datos del CSV...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if bmwData.length > 0}
    <p>Se cargaron {bmwData.length} filas.</p>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            {#each getHeaders(bmwData) as header}
              <th>{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each bmwData.slice(0, 10) as row}
            <tr>
              {#each getHeaders(bmwData) as header}
                <td>{row[header]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
      {#if bmwData.length > 10}
        <p><i>(Mostrando las primeras 10 filas de {bmwData.length})</i></p>
      {/if}
    </div>
  {:else}
    <p>No se encontraron datos en el archivo CSV.</p>
  {/if}
</div>

<style>
  .container {
    padding: 2rem;
    font-family: system-ui, sans-serif;
    color: #e6f1ff;
    background: #0b0f14;
    min-height: 100vh;
  }
  code {
    background: rgba(255,255,255,0.15);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
  .error {
    color: #ff8c8c;
  }
  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 0.9em;
  }
  th, td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.6rem 0.8rem;
    text-align: left;
  }
  th {
    background-color: rgba(255, 255, 255, 0.1);
    font-weight: bold;
  }
  tbody tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.05);
  }
</style>