import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.pt;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Você está ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} com os valores oficiais em vigor.`,
    ultimoDato: "Último dado carregado",
    ir: (pais) => `Ir para ${g.nombre(pais)}`,
    otro: "Escolher outro país",
    argentina: "Suas calculadoras estão em calcular.ar, com os dados oficiais da Argentina.",
    argentinaIr: "Ir para calcular.ar",
    neutroTitulo: (paises) => `${paises} países, cada um com sua lei e sua moeda`,
    neutroTexto: "Consultamos as fontes oficiais todos os dias.",
    neutroIr: "Ver países",
  },
  selector: {
    buscar: "Buscar país",
    sinResultados: (q) => `Nenhum país corresponde a “${q}”`,
    ubicacion: "Localização atual",
    mismaCalculadora: "Mesma calculadora",
    paises: "Países",
  },
  aviso: { mismaCalculadora: (pais) => `Calcular com dados ${g.de(pais)}` },
  vivo: {
    titulo: "Dados oficiais, atualizados automaticamente",
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
    titulo: (pais) => `O que mudou nos dados oficiais ${g.de(pais)}`,
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
    rige: (fecha) => `Em vigor desde ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Vale de ${desde} a ${hasta}`,
    antes: (valor, fecha) => `Antes: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "Revisamos 1 dado na fonte oficial" : `Revisamos ${n} dados na fonte oficial`),
    revisadosTexto: (organismos) => `Os valores em vigor foram confirmados em ${organismos}.`,
    verDatos: (n) => (n === 1 ? "Ver o dado" : `Ver os ${n} dados`),
    calculadoras: "Usado em",
    rango: (min, max, zonas) => `de ${min} a ${max} conforme a região (${zonas} regiões)`,
    tabla: (filas) => `tabela de ${filas} faixas`,
    valores: (n) => `${n} valores`,
    pasosTitulo: "Como se mantém em dia",
    pasos: [
      { titulo: "Um órgão publica", texto: "Sai uma resolução, um índice ou uma cotação na fonte oficial." },
      { titulo: "Revisado antes de usar", texto: "Índices e cotações chegam automaticamente, com controle de faixas. As normas entram com o documento oficial à vista." },
      { titulo: "As contas se atualizam", texto: "As calculadoras passam a usar o dado novo e aqui fica anotado, com sua fonte." },
    ],
    feedTitulo: (pais) => `Novidades ${g.de(pais)} no CalcularYa`,
    feedSubtitulo: (pais) => `Mudanças nos dados oficiais usados pelas calculadoras ${g.de(pais)}, com vigência e fonte.`,
  },
};

export const pt: Diccionario<TextosInicio> = {
  base,
  usted: {
    arranque: {
      estasEn: (pais) => `Acesso ${g.de(pais)}`,
      argentina: "As calculadoras com os dados oficiais da Argentina estão em calcular.ar.",
    },
  },
};
