// Arranque por país, selector, sello de datos vivos y registro de novedades.
export interface TextosInicio {
  arranque: {
    estasEn: (pais: string) => string;
    resumen: (calculadoras: string) => string;
    ultimoDato: string;
    ir: (pais: string) => string;
    otro: string;
    argentina: string;
    argentinaIr: string;
    neutroTitulo: (paises: number) => string;
    neutroTexto: string;
    neutroIr: string;
  };
  selector: {
    buscar: string;
    sinResultados: (q: string) => string;
    ubicacion: string;
    mismaCalculadora: string;
    paises: string;
  };
  aviso: { mismaCalculadora: (pais: string) => string };
  vivo: {
    titulo: string;
    vigilado: string;
    sinVigilar: string;
    verificado: string;
    automatico: string;
    fuentes: string;
    nFuentes: (n: number) => string;
    verFuentes: string;
    verNovedades: string;
    hoy: string;
    ayer: string;
    elDia: (fecha: string) => string;
    actualizadoSerie: (serie: string, cuando: string) => string;
  };
  sello: {
    verificado: (fecha: string) => string;
    serie: (serie: string, cuando: string, organismo: string) => string;
    diario: string;
    actualizado: string;
  };
  novedades: {
    pildora: string;
    titulo: (pais: string) => string;
    acento: string;
    bajada: string;
    ultimoCambio: string;
    revision: string;
    diaria: string;
    porNorma: string;
    siguiendo: string;
    masOrganismos: (n: number) => string;
    proximos: string;
    proximosTexto: string;
    registro: string;
    rss: string;
    vacio: string;
    etiqueta: Record<"editorial" | "dato" | "proximo" | "serie" | "revision", string>;
    rige: (fecha: string) => string;
    rigeDesdeHasta: (desde: string, hasta: string) => string;
    antes: (valor: string, fecha: string) => string;
    revisados: (n: number) => string;
    revisadosTexto: (organismos: string) => string;
    verDatos: (n: number) => string;
    calculadoras: string;
    rango: (min: string, max: string, zonas: number) => string;
    tabla: (filas: number) => string;
    valores: (n: number) => string;
    pasos: readonly { titulo: string; texto: string }[];
    pasosTitulo: string;
    feedTitulo: (pais: string) => string;
    feedSubtitulo: (pais: string) => string;
  };
}
