export function mostrarLista(paises, listaPaises) {

    if (paises.length === 0) {

        listaPaises.innerHTML =
            "<p class='vacio'>No hay países que coincidan con el filtro.</p>";

        return;
    }

    listaPaises.innerHTML = paises
        .map(pais => `
            <div class="pais-item" data-nombre="${pais.name}">
                <img
                    src="${pais.flags?.svg || ""}"
                    alt="${pais.name}"
                    width="40"
                >

                <span>${pais.name}</span>
            </div>
        `)
        .join("");
}

export function mostrarPais(pais, resultado) {

    const capital =
        pais.capital || "—";

    const subregion =
        pais.subregion || "—";

    const moneda =
        pais.currencies?.[0]?.name || "—";

    const poblacion =
        pais.population
            ? pais.population.toLocaleString("es-ES")
            : "—";

    resultado.innerHTML = `
        <article class="ficha">

            <img
                class="ficha-bandera"
                src="${pais.flags?.svg || ""}"
                alt="Bandera de ${pais.name}"
            >

            <h2>${pais.name}</h2>

            <dl>

                <dt>Capital</dt>
                <dd>${capital}</dd>

                <dt>Población</dt>
                <dd>${poblacion}</dd>

                <dt>Región</dt>
                <dd>${pais.region || "—"}</dd>

                <dt>Subregión</dt>
                <dd>${subregion}</dd>

                <dt>Moneda</dt>
                <dd>${moneda}</dd>

            </dl>

        </article>
    `;
}