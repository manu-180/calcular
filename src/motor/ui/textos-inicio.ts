import type { Idioma, Trato } from "../tipos";

// Textos del arranque por país, el selector, el sello de datos vivos y el registro de novedades.
// Aparte de src/motor/i18n para no pisar el diccionario que editan otros frentes; misma regla: sin
// rayas, sin emojis y con el trato del mercado (tú, vos o usted).

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

const es: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Estás en ${pais}`,
    resumen: (calculadoras) => `${calculadoras} con los valores oficiales vigentes.`,
    ultimoDato: "Último dato cargado",
    ir: (pais) => `Ir a ${pais}`,
    otro: "Elige otro país",
    argentina: "Tus calculadoras están en calcular.ar, con los datos oficiales de Argentina.",
    argentinaIr: "Ir a calcular.ar",
    neutroTitulo: (paises) => `${paises} países, cada uno con su ley y su moneda`,
    neutroTexto: "Consultamos las fuentes oficiales todos los días.",
    neutroIr: "Ver países",
  },
  selector: {
    buscar: "Buscar país",
    sinResultados: (q) => `Ningún país coincide con «${q}»`,
    ubicacion: "Ubicación actual",
    mismaCalculadora: "Misma calculadora",
    paises: "Países",
  },
  aviso: { mismaCalculadora: (pais) => `Calcularlo con datos de ${pais}` },
  vivo: {
    titulo: "Datos oficiales, actualizados solos",
    vigilado: "Un proceso automático consulta las fuentes oficiales todos los días. Los cambios de normas se cargan después de verificarlos.",
    sinVigilar: "Cada valor tiene su fuente oficial y la fecha en que lo revisamos.",
    verificado: "Última revisión de normas",
    automatico: "Último dato automático",
    fuentes: "Fuentes oficiales",
    nFuentes: (n) => (n === 1 ? "1 documento oficial" : `${n} documentos oficiales`),
    verFuentes: "Ver fuentes",
    verNovedades: "Ver novedades",
    hoy: "hoy",
    ayer: "ayer",
    elDia: (fecha) => `el ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Datos verificados en fuente oficial el ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: actualizado ${cuando}, con el último dato de ${organismo}.`,
    diario: "Consultamos las fuentes oficiales todos los días, de forma automática.",
    actualizado: "Actualizado",
  },
  novedades: {
    pildora: "Novedades",
    titulo: (pais) => `Lo que cambió en los datos oficiales de ${pais}`,
    acento: "el día que cambió",
    bajada: "Cada dato nuevo que llega a las calculadoras queda anotado acá: qué cambió, desde cuándo rige y de dónde salió.",
    ultimoCambio: "Último cambio",
    revision: "Revisión de las fuentes",
    diaria: "Todos los días",
    porNorma: "Con cada norma nueva",
    siguiendo: "Fuentes que seguimos",
    masOrganismos: (n) => `y ${n} más`,
    proximos: "Ya publicado, rige pronto",
    proximosTexto: "Valores oficiales ya cargados que empiezan a regir en los próximos días.",
    registro: "Registro de cambios",
    rss: "Seguir por RSS",
    vacio: "Todavía no hay cambios registrados para este país.",
    etiqueta: { editorial: "Norma", dato: "Dato nuevo", proximo: "Rige pronto", serie: "Automático", revision: "Revisión" },
    rige: (fecha) => `Rige desde el ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Rige del ${desde} al ${hasta}`,
    antes: (valor, fecha) => `Antes: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "Revisamos 1 dato contra la fuente oficial" : `Revisamos ${n} datos contra la fuente oficial`),
    revisadosTexto: (organismos) => `Los valores vigentes se confirmaron en ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Ver el dato" : `Ver los ${n} datos`),
    calculadoras: "Lo usan",
    rango: (min, max, zonas) => `de ${min} a ${max} según la zona (${zonas} zonas)`,
    tabla: (filas) => `tabla de ${filas} tramos`,
    valores: (n) => `${n} valores`,
    pasosTitulo: "Cómo se mantiene al día",
    pasos: [
      { titulo: "Un organismo publica", texto: "Sale una resolución, un índice o un tipo de cambio en la fuente oficial." },
      { titulo: "Se revisa antes de usarlo", texto: "Índices y tipos de cambio llegan solos, con controles de rango. Las normas se cargan con el documento oficial a la vista." },
      { titulo: "Las cuentas se actualizan", texto: "Las calculadoras pasan a usar el dato nuevo y acá queda anotado, con su fuente." },
    ],
    feedTitulo: (pais) => `Novedades de ${pais} en CalcularYa`,
    feedSubtitulo: (pais) => `Cambios en los datos oficiales que usan las calculadoras de ${pais}, con su vigencia y su fuente.`,
  },
};

const pt: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Você está no ${pais}`,
    resumen: (calculadoras) => `${calculadoras} com os valores oficiais vigentes.`,
    ultimoDato: "Último dado carregado",
    ir: (pais) => `Ir para ${pais}`,
    otro: "Escolher outro país",
    argentina: "Suas calculadoras estão em calcular.ar, com os dados oficiais da Argentina.",
    argentinaIr: "Ir para calcular.ar",
    neutroTitulo: (paises) => `${paises} países, cada um com sua lei e sua moeda`,
    neutroTexto: "Consultamos as fontes oficiais todos os dias.",
    neutroIr: "Ver países",
  },
  selector: {
    buscar: "Buscar país",
    sinResultados: (q) => `Nenhum país corresponde a «${q}»`,
    ubicacion: "Localização atual",
    mismaCalculadora: "Mesma calculadora",
    paises: "Países",
  },
  aviso: { mismaCalculadora: (pais) => `Calcular com dados do ${pais}` },
  vivo: {
    titulo: "Dados oficiais, atualizados sozinhos",
    vigilado: "Um processo automático consulta as fontes oficiais todos os dias. Mudanças de normas entram depois de verificadas.",
    sinVigilar: "Cada valor tem sua fonte oficial e a data em que foi revisado.",
    verificado: "Última revisão de normas",
    automatico: "Último dado automático",
    fuentes: "Fontes oficiais",
    nFuentes: (n) => (n === 1 ? "1 documento oficial" : `${n} documentos oficiais`),
    verFuentes: "Ver fontes",
    verNovedades: "Ver novidades",
    hoy: "hoje",
    ayer: "ontem",
    elDia: (fecha) => `em ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Dados verificados na fonte oficial em ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: atualizado ${cuando}, com o último dado de ${organismo}.`,
    diario: "Consultamos as fontes oficiais todos os dias, de forma automática.",
    actualizado: "Atualizado",
  },
  novedades: {
    pildora: "Novidades",
    titulo: (pais) => `O que mudou nos dados oficiais do ${pais}`,
    acento: "no dia em que mudou",
    bajada: "Cada dado novo que chega às calculadoras fica anotado aqui: o que mudou, desde quando vale e de onde saiu.",
    ultimoCambio: "Última mudança",
    revision: "Revisão das fontes",
    diaria: "Todos os dias",
    porNorma: "A cada norma nova",
    siguiendo: "Fontes que seguimos",
    masOrganismos: (n) => `e mais ${n}`,
    proximos: "Já publicado, vale em breve",
    proximosTexto: "Valores oficiais já carregados que passam a valer nos próximos dias.",
    registro: "Registro de mudanças",
    rss: "Seguir por RSS",
    vacio: "Ainda não há mudanças registradas para este país.",
    etiqueta: { editorial: "Norma", dato: "Dado novo", proximo: "Vale em breve", serie: "Automático", revision: "Revisão" },
    rige: (fecha) => `Vale desde ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Vale de ${desde} a ${hasta}`,
    antes: (valor, fecha) => `Antes: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "Revisamos 1 dado na fonte oficial" : `Revisamos ${n} dados na fonte oficial`),
    revisadosTexto: (organismos) => `Os valores vigentes foram confirmados em ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Ver o dado" : `Ver os ${n} dados`),
    calculadoras: "Usado em",
    rango: (min, max, zonas) => `de ${min} a ${max} conforme a região (${zonas} regiões)`,
    tabla: (filas) => `tabela de ${filas} faixas`,
    valores: (n) => `${n} valores`,
    pasosTitulo: "Como se mantém em dia",
    pasos: [
      { titulo: "Um órgão publica", texto: "Sai uma resolução, um índice ou uma cotação na fonte oficial." },
      { titulo: "Revisado antes de usar", texto: "Índices e cotações chegam sozinhos, com controles de faixa. As normas entram com o documento oficial à vista." },
      { titulo: "As contas se atualizam", texto: "As calculadoras passam a usar o dado novo e aqui fica anotado, com sua fonte." },
    ],
    feedTitulo: (pais) => `Novidades do ${pais} no CalcularYa`,
    feedSubtitulo: (pais) => `Mudanças nos dados oficiais usados pelas calculadoras do ${pais}, com vigência e fonte.`,
  },
};

const porTrato: Record<Exclude<Trato, "tu">, (b: TextosInicio) => TextosInicio> = {
  vos: (b) => ({ ...b, arranque: { ...b.arranque, otro: "Elegí otro país", argentina: "Tus calculadoras están en calcular.ar, con los datos oficiales de Argentina." } }),
  usted: (b) => ({
    ...b,
    arranque: {
      ...b.arranque,
      estasEn: (pais) => `Está en ${pais}`,
      otro: "Elija otro país",
      argentina: "Sus calculadoras están en calcular.ar, con los datos oficiales de Argentina.",
    },
  }),
};

export function textosInicio(idioma: Idioma, trato: Trato): TextosInicio {
  if (idioma === "pt") return pt;
  return trato === "tu" ? es : porTrato[trato](es);
}
