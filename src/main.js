import './style.css';

import {
  cargarPaises,
  buscarPais
} from './api.js';

import {
  mostrarLista,
  mostrarPais
} from './render.js';

 //constantes que seleccionan del documento los ids
const input = document.querySelector("#pais");
const boton = document.querySelector("#buscar");
const mensaje = document.querySelector("#mensaje");
const listaPaises = document.querySelector("#listaPaises");
const resultado = document.querySelector("#resultado");
const busqueda = document.querySelector("#busqueda");
const detalle = document.querySelector("#detalle");
const botonVolver = document.querySelector("#volver");
const selectorRegion = document.querySelector("#region");
const estadisticas = document.querySelector("#estadisticas");

//array para guardar los paises

let todosPaises = [];

//esconde el resto de paises y solo te muestra el que buscaste o pinchaste

function verPais() {
  busqueda.hidden = true;
  detalle.hidden = false;
  window.scrollTo(0, 0);
}

function verLista() {
  detalle.hidden = true;
  busqueda.hidden = false;
  resultado.innerHTML = "";
}

//Funcion que carga los paises y la página

async function iniciar() {
  try {
    mensaje.textContent = "Cargando países...";
    // Cacheamos los países en localStorage
    // para evitar repetir peticiones a la API
    const cache = localStorage.getItem("paises");

    if (cache) {
      todosPaises = JSON.parse(cache);
    } else {

      todosPaises = await cargarPaises();

      localStorage.setItem(
        "paises",
        JSON.stringify(todosPaises)
      );
    }

    todosPaises.sort((a, b) => a.name.localeCompare(b.name) );

    mostrarLista( todosPaises, listaPaises );

    const poblacionTotal = todosPaises.reduce((acumulador, pais) => acumulador + pais.population,0);

    estadisticas.textContent = "Población total de los resultados: " + poblacionTotal.toLocaleString("es-ES");


    mensaje.textContent = "";

  } catch (error) {

    mensaje.textContent = error.message;

    console.error(error);
  }
}

// Busca

async function abrirPais(nombre) {

  nombre = nombre.trim();

  if (nombre === "") {
    mensaje.textContent = "Escribe el nombre de un país.";
    return;
  }

  try {

    mensaje.textContent = "Cargando...";

    const data = await buscarPais(nombre);

    const pais = data.find( p => p.name.toLowerCase() === nombre.toLowerCase() ) || data[0];

    if (!pais) {
      throw new Error(
        "País no encontrado"
      );
    }

    mostrarPais( pais, resultado);

    mensaje.textContent = "";

    verPais();

  } catch (error) {

    mensaje.textContent = error.message;

    console.error(error);
  }
}

//si se hace click sobre un país se llama a la función que lo abre

listaPaises.addEventListener("click", (e) => {
  const item = e.target.closest(".pais-item");

  if (item) {

    abrirPais(item.dataset.nombre);
  }

});

//si introduces por el teclado un texto lo lee y da resultados que lo contengan

input.addEventListener( "keydown", (event) => {

  if (event.key === "Enter") {

    abrirPais(input.value);
  }

});

//Botón buscar

boton.addEventListener( "click",() => {
  abrirPais(
    input.value
  );

});

// Volver

botonVolver.addEventListener("click",verLista);

//Filtro por texto

input.addEventListener( "input", () => {
  const texto = input.value.trim().toLowerCase();

  if (texto === "") {

    mostrarLista( todosPaises, listaPaises );

    return;
  }

  const filtrados = todosPaises.filter( pais => pais.name.toLowerCase() .startsWith(texto) );

  const poblacionTotal = filtrados.reduce(
    (acumulador, pais) => acumulador + pais.population, 0
  );

  estadisticas.textContent = `Población total de los resultados: ${poblacionTotal.toLocaleString("es-ES")}`;

  mostrarLista( filtrados, listaPaises);

});

// Filtro por región

selectorRegion?.addEventListener( "change", () => {

  const region = selectorRegion.value;

    if (region === "") {

      mostrarLista( todosPaises, listaPaises );

      return;
    }

  const filtrados = todosPaises.filter( pais => pais.region === region );
  const poblacionTotal = filtrados.reduce( (acc, pais) => acc + pais.population, 0 );

  estadisticas.textContent =`Población total: ${poblacionTotal.toLocaleString("es-ES")}`; 
  mostrarLista( filtrados,listaPaises );

});

//iniciamos

iniciar();