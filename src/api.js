//Carga de la lista de países
async function cargarPaises() {
  try {
    mensaje.textContent = "Cargando países...";

    const response = await fetch("https://countries.dev/countries");
    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de países");
    }

    todosPaises = await response.json();
    mensaje.textContent = "";
    mostrarLista(todosPaises);
  } catch (error) {
    mensaje.textContent = error.message;
    console.error(error);
  }
}


//Busqueda
async function buscarPais(nombre) {
  nombre = nombre.trim();

  // Si no han escrito nada, avisamos en vez de hacer la petición
  if (nombre === "") {
    mensaje.textContent = "Escribe el nombre de un país.";
    return;
  }

  try {
    mensaje.textContent = "Cargando...";

    const response = await fetch(
      `https://countries.dev/name/${nombre}`
    );

    // Si no lo encuentra lanzamos un error que se muestra en pantalla
    if (!response.ok) {
      throw new Error("País no encontrado");
    }

    const data = await response.json();

    // Preferimos la coincidencia exacta; si no hay, usamos la primera
    const pais = data.find(
      p => p.name.toLowerCase() === nombre.toLowerCase()
    ) || data[0];

    if (!pais) {
      throw new Error("País no encontrado");
    }

    mensaje.textContent = "";
    mostrarPais(pais);
  } catch (error) {
    mensaje.textContent = error.message;
    console.error(error.message);
  }
}