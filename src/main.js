import './style.css';

import {
  cargarPaises,
  buscarPais
} from './api.js';

import {
  mostrarLista,
  mostrarPais
} from './render.js';

// ---------- Referencias al DOM ----------

const input = document.querySelector("#pais");
const boton = document.querySelector("#buscar");
const mensaje = document.querySelector("#mensaje");
const listaPaises = document.querySelector("#listaPaises");
const resultado = document.querySelector("#resultado");
const busqueda = document.querySelector("#busqueda");
const detalle = document.querySelector("#detalle");
const botonVolver = document.querySelector("#volver");
const selectorRegion = document.querySelector("#region");

// ---------- Datos ----------

let todosPaises = [];

// ---------- Cambio de vista ----------

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

// ---------- Inicio ----------

async function iniciar() {
  try {
    mensaje.textContent = "Cargando países...";

    todosPaises = await cargarPaises();

    todosPaises.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    mostrarLista(
      todosPaises,
      listaPaises
    );

    mensaje.textContent = "";

  } catch (error) {

    mensaje.textContent =
      error.message;

    console.error(error);
  }
}

// ---------- Buscar país ----------

async function abrirPais(nombre) {

  nombre = nombre.trim();

  if (nombre === "") {
    mensaje.textContent =
      "Escribe el nombre de un país.";
    return;
  }

  try {

    mensaje.textContent =
      "Cargando...";

    const data =
      await buscarPais(nombre);

    const pais =
      data.find(
        p =>
          p.name.toLowerCase() ===
          nombre.toLowerCase()
      ) || data[0];

    if (!pais) {
      throw new Error(
        "País no encontrado"
      );
    }

    mostrarPais(
      pais,
      resultado
    );

    mensaje.textContent = "";

    verPais();

  } catch (error) {

    mensaje.textContent =
      error.message;

    console.error(error);
  }
}

// ---------- Eventos ----------

// Click sobre un país

listaPaises.addEventListener(
  "click",
  (e) => {

    const item =
      e.target.closest(".pais-item");

    if (item) {

      abrirPais(
        item.dataset.nombre
      );

    }

  }
);

// Enter

input.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      abrirPais(
        input.value
      );

    }

  }
);

// Botón buscar

boton.addEventListener(
  "click",
  () => {

    abrirPais(
      input.value
    );

  }
);

// Volver

botonVolver.addEventListener(
  "click",
  verLista
);

// Filtro por texto

input.addEventListener(
  "input",
  () => {

    const texto =
      input.value
        .trim()
        .toLowerCase();

    if (texto === "") {

      mostrarLista(
        todosPaises,
        listaPaises
      );

      return;
    }

    const filtrados =
      todosPaises.filter(
        pais =>
          pais.name
            .toLowerCase()
            .startsWith(texto)
      );

    mostrarLista(
      filtrados,
      listaPaises
    );

  }
);

// Filtro por región

selectorRegion?.addEventListener(
  "change",
  () => {

    const region =
      selectorRegion.value;

    if (region === "") {

      mostrarLista(
        todosPaises,
        listaPaises
      );

      return;
    }

    const filtrados =
      todosPaises.filter(
        pais =>
          pais.region === region
      );

    mostrarLista(
      filtrados,
      listaPaises
    );

  }
);

// ---------- Arranque ----------

iniciar();