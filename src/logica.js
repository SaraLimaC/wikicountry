// Filtra por texto

export function filtrarPorTexto(  paises, texto) {

  return paises.filter( pais => pais.name.toLowerCase().startsWith(texto.toLowerCase()));

}

// Filtra por región

export function filtrarPorRegion(paises,region) {

  return paises.filter(pais => pais.region === region);

}

// Ordena países alfabéticamente

export function ordenarPaises(paises) {

  return [...paises].sort((a, b) =>a.name.localeCompare( b.name));

}

// Calcula la población total

export function calcularPoblacionTotal(paises) {
    return paises.reduce((acumulador, pais) =>acumulador + pais.population,0);
}

// Devuelve el país más poblado

export function obtenerPaisMasPoblado(paises) {

  return paises.reduce((maximo, pais) => pais.population > maximo.population ? pais : maximo );

}