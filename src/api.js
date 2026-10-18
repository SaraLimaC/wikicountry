export async function cargarPaises() {

    const response = await fetch(
        "https://countries.dev/countries"
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo cargar la lista de países"
        );
    }

    return await response.json();
}

export async function buscarPais(nombre) {

    const response = await fetch(
        `https://countries.dev/name/${encodeURIComponent(nombre)}`
    );

    if (!response.ok) {
        throw new Error(
            "País no encontrado"
        );
    }

    return await response.json();
}
