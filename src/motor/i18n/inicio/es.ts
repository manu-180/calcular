import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.es;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Estás ${g.en(pais)}`,
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
  aviso: { mismaCalculadora: (pais) => `Calcularlo con datos ${g.de(pais)}` },
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
    titulo: (pais) => `Lo que cambió en los datos oficiales ${g.de(pais)}`,
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
    feedTitulo: (pais) => `Novedades ${g.de(pais)} en CalcularYa`,
    feedSubtitulo: (pais) => `Cambios en los datos oficiales que usan las calculadoras ${g.de(pais)}, con su vigencia y su fuente.`,
  },
};

export const es: Diccionario<TextosInicio> = {
  base,
  vos: { arranque: { otro: "Elegí otro país" } },
  usted: {
    arranque: {
      estasEn: (pais) => `Está ${g.en(pais)}`,
      otro: "Elija otro país",
      argentina: "Sus calculadoras están en calcular.ar, con los datos oficiales de Argentina.",
    },
  },
};
