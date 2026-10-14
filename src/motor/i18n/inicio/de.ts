import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.de;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Du bist ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} mit den geltenden amtlichen Werten.`,
    ultimoDato: "Zuletzt geladener Wert",
    ir: (pais) => `Weiter zu ${pais}`,
    otro: "Anderes Land wählen",
    argentina: "Deine Rechner findest du auf calcular.ar, mit den amtlichen Daten Argentiniens.",
    argentinaIr: "Zu calcular.ar",
    neutroTitulo: (paises) => `${paises} Länder, jedes mit eigenen Gesetzen und eigener Währung`,
    neutroTexto: "Wir prüfen die amtlichen Quellen jeden Tag.",
    neutroIr: "Länder ansehen",
  },
  selector: {
    buscar: "Land suchen",
    sinResultados: (q) => `Kein Land passt zu „${q}“`,
    ubicacion: "Aktueller Standort",
    mismaCalculadora: "Derselbe Rechner",
    paises: "Länder",
  },
  aviso: { mismaCalculadora: (pais) => `Mit den Daten ${g.para(pais)} rechnen` },
  vivo: {
    titulo: "Amtliche Daten, automatisch aktualisiert",
    vigilado: "Ein automatischer Prozess prüft die amtlichen Quellen jeden Tag. Geänderte Vorschriften übernehmen wir nach einer Prüfung.",
    sinVigilar: "Zu jedem Wert gibt es die amtliche Quelle und das Datum unserer Prüfung.",
    verificado: "Letzte Prüfung der Vorschriften",
    automatico: "Letzter automatischer Wert",
    fuentes: "Amtliche Quellen",
    nFuentes: (n) => (n === 1 ? "1 amtliches Dokument" : `${n} amtliche Dokumente`),
    verFuentes: "Quellen ansehen",
    verNovedades: "Neuigkeiten ansehen",
    hoy: "heute",
    ayer: "gestern",
    elDia: (fecha) => `am ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Daten am ${fecha} an der amtlichen Quelle geprüft.`,
    serie: (serie, cuando, organismo) => `${serie}: aktualisiert ${cuando}, mit dem neuesten Wert von ${organismo}.`,
    diario: "Wir prüfen die amtlichen Quellen jeden Tag automatisch.",
    actualizado: "Aktualisiert",
  },
  novedades: {
    pildora: "Neuigkeiten",
    titulo: (pais) => `Was sich an den amtlichen Daten ${g.para(pais)} geändert hat`,
    acento: "am Tag der Änderung",
    bajada: "Jeder neue Wert, der in die Rechner einfließt, wird hier festgehalten: was sich geändert hat, ab wann es gilt und woher es stammt.",
    ultimoCambio: "Letzte Änderung",
    revision: "Prüfung der Quellen",
    diaria: "Täglich",
    porNorma: "Bei jeder neuen Vorschrift",
    siguiendo: "Quellen, die wir verfolgen",
    masOrganismos: (n) => `und ${n} weitere`,
    proximos: "Veröffentlicht, gilt bald",
    proximosTexto: "Bereits geladene amtliche Werte, die in den nächsten Tagen gelten.",
    registro: "Änderungsprotokoll",
    rss: "Per RSS folgen",
    vacio: "Für dieses Land sind noch keine Änderungen erfasst.",
    etiqueta: { editorial: "Vorschrift", dato: "Neuer Wert", proximo: "Gilt bald", serie: "Automatisch", revision: "Prüfung" },
    rige: (fecha) => `Gilt ab ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Gilt vom ${desde} bis ${hasta}`,
    antes: (valor, fecha) => `Vorher: ${valor} (${fecha})`,
    revisados: (n) => (n === 1 ? "1 Wert an der amtlichen Quelle geprüft" : `${n} Werte an der amtlichen Quelle geprüft`),
    revisadosTexto: (organismos) => `Die geltenden Werte wurden bei ${organismos} bestätigt.`,
    verDatos: (n) => (n === 1 ? "Wert ansehen" : `Alle ${n} Werte ansehen`),
    calculadoras: "Verwendet in",
    rango: (min, max, zonas) => `von ${min} bis ${max} je nach Gebiet (${zonas} Gebiete)`,
    tabla: (filas) => `Tabelle mit ${filas} Stufen`,
    valores: (n) => `${n} Werte`,
    pasosTitulo: "So bleibt alles aktuell",
    pasos: [
      { titulo: "Eine Behörde veröffentlicht", texto: "Eine Verordnung, ein Index oder ein Wechselkurs erscheint in der amtlichen Quelle." },
      { titulo: "Geprüft vor dem Einsatz", texto: "Indizes und Wechselkurse kommen automatisch und mit Plausibilitätsprüfung. Vorschriften übernehmen wir mit dem amtlichen Dokument vor Augen." },
      { titulo: "Die Rechner ziehen nach", texto: "Die Rechner verwenden den neuen Wert, und die Änderung wird hier mit Quelle festgehalten." },
    ],
    feedTitulo: (pais) => `Neuigkeiten ${g.para(pais)} auf CalcularYa`,
    feedSubtitulo: (pais) => `Änderungen an den amtlichen Daten der Rechner ${g.para(pais)}, mit Stichtag und Quelle.`,
  },
};

export const de: Diccionario<TextosInicio> = {
  base,
  usted: {
    arranque: {
      estasEn: (pais) => `Sie sind ${g.en(pais)}`,
      argentina: "Ihre Rechner finden Sie auf calcular.ar, mit den amtlichen Daten Argentiniens.",
    },
  },
};
