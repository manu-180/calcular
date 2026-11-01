import type { TipoEvento } from "../calendario/eventos";
import type { Idioma, Trato } from "../tipos";
import { formaAr, pluralAr } from "./arabe";
import { cifrasBn } from "./bengali";
import { GRAMATICA, mayusculaHu } from "./gramatica";
import { formaCs, formaEl, formaRu, formaUk, pluralCs, pluralEl, pluralRo, pluralRu, pluralUk } from "./plural";
import { formaSr, pluralSr } from "./plural";
import { DIAS_HE, formaHe, pluralHe, type FormasHe } from "./hebreo";
import { resolver, type Diccionario, type Diccionarios } from "./resolver";

// Calendario laboral y fiscal de cada edición. Los textos no le hablan a nadie en segunda persona a
// propósito: así un mismo texto sirve para tú, vos y usted (y para tu/vous, du/Sie, je/u) sin parches.
// Lo que dice cada fecha sale del registro; acá solo está cómo se dice.

export interface TextosCalendario {
  nombre: string;
  seo: {
    // Candidatos de mayor a menor; elegirTitulo toma el primero que entra en 60 de ancho.
    titulo: (pais: string, anios: string) => readonly string[];
    descripcion: (pais: string, proximas: string) => string;
    descripcionSin: (pais: string) => string;
  };
  ceja: (anios: string) => string;
  h1: (pais: string) => string;
  acento: string;
  bajada: string;
  proxima: string;
  cuenta: { hoy: string; manana: string; ayer: string; en: (n: number) => string; hace: (n: number) => string; dias: (n: number) => string };
  queViene: string;
  yaRige: string;
  mesPorMes: string;
  sinFechas: string;
  filtro: string;
  todo: string;
  tipos: Record<TipoEvento, string>;
  pasa: (antes: string, despues: string) => string;
  queda: (valor: string) => string;
  cambian: string;
  zonas: (lista: string) => string;
  limite: string;
  agregar: string;
  descargar: string;
  google: string;
  calcular: string;
  tambien: string;
  fuente: (organismo: string, fecha: string) => string;
  verificado: (fecha: string) => string;
  suscribir: { titulo: string; texto: string; boton: string; copiar: string; copiado: string };
  fuentes: { titulo: string; texto: string };
  vacio: string;
  destacado: { ceja: string; titulo: string; ir: string; proxima: (titulo: string, fecha: string) => string };
  ics: { nombre: (pais: string) => string; descripcion: (pais: string) => string; calculadora: string; fuente: string };
  og: { proxima: string; mas: (n: number) => string };
}

const gEs = GRAMATICA.es;
const es: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Calendario laboral y fiscal",
    seo: {
      titulo: (pais, anios) => [`Calendario laboral ${anios} ${gEs.de(pais)}: fechas clave`, `Calendario laboral ${anios} ${gEs.de(pais)}`, `Calendario laboral ${gEs.de(pais)}`],
      descripcion: (pais, proximas) => `Las fechas que cambian el sueldo ${gEs.en(pais)}, con fuente oficial: ${proximas}. Cada una con su calculadora.`,
      descripcionSin: (pais) => `Las fechas que cambian el sueldo ${gEs.en(pais)}, con fuente oficial y su calculadora. Para agregar al calendario del teléfono.`,
    },
    ceja: (anios) => `Calendario ${anios}`,
    h1: (pais) => `Calendario laboral ${gEs.de(pais)}`,
    acento: "las fechas que mueven el sueldo",
    bajada: "Cada fecha sale de una fuente oficial y lleva a la calculadora que le corresponde. La página se actualiza sola cuando se publica un valor nuevo.",
    proxima: "La próxima fecha",
    cuenta: { hoy: "Hoy", manana: "Mañana", ayer: "Ayer", en: (n) => `En ${n} días`, hace: (n) => `Hace ${n} días`, dias: (n) => (n === 1 ? "día" : "días") },
    queViene: "Lo que viene",
    yaRige: "Lo que ya rige",
    mesPorMes: "El año mes por mes",
    sinFechas: "Sin cambios anunciados",
    filtro: "Filtrar por tema",
    todo: "Todo",
    tipos: { pago: "Pagos", "salario-minimo": "Salario mínimo", impuestos: "Impuestos", aportes: "Aportes y pensiones", laboral: "Reglas laborales", indices: "Índices" },
    pasa: (antes, despues) => `Pasa de ${antes} a ${despues}`,
    queda: (valor) => `Queda en ${valor}`,
    cambian: "Cambian los valores",
    zonas: (lista) => `En ${lista}`,
    limite: "Fecha límite",
    agregar: "Agregar a mi calendario",
    descargar: "Apple, Outlook y otros (archivo .ics)",
    google: "Calendario de Google",
    calcular: "Calcular",
    tambien: "También en",
    fuente: (organismo, fecha) => `Fuente: ${organismo}. Verificado el ${fecha}.`,
  verificado: (fecha) => `Verificado el ${fecha}`,
    suscribir: {
      titulo: "El calendario completo, siempre al día",
      texto: "Con la suscripción, las fechas nuevas aparecen solas en el calendario del teléfono o de la computadora.",
      boton: "Suscribirme al calendario",
      copiar: "Copiar el enlace",
      copiado: "Enlace copiado",
    },
    fuentes: {
      titulo: "De dónde sale cada fecha",
      texto: "Solo entran fechas que ya están en una norma o en un valor que publicó el organismo oficial. Si algo todavía no se publicó, no aparece.",
    },
    vacio: "No hay fechas de este tema en los próximos doce meses.",
    destacado: {
      ceja: "Calendario laboral",
      titulo: "Las fechas que mueven el sueldo este año",
      ir: "Ver el calendario",
      proxima: (titulo, fecha) => `Próxima: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Calendario laboral ${gEs.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Fechas laborales y fiscales ${gEs.de(pais)}, con fuente oficial.`,
      calculadora: "Calculadora",
      fuente: "Fuente",
    },
    og: { proxima: "Próxima fecha", mas: (n) => `Y ${n} fechas más en el año` },
  },
};

const gPt = GRAMATICA.pt;
const pt: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Calendário trabalhista e fiscal",
    seo: {
      titulo: (pais, anios) => [`Calendário trabalhista ${anios} ${gPt.de(pais)}: datas-chave`, `Calendário trabalhista ${anios} ${gPt.de(pais)}`, `Calendário trabalhista ${gPt.de(pais)}`],
      descripcion: (pais, proximas) => `As datas que mudam o salário ${gPt.en(pais)}, com fonte oficial: ${proximas}. Cada uma com a sua calculadora.`,
      descripcionSin: (pais) => `As datas que mudam o salário ${gPt.en(pais)}, com fonte oficial e a sua calculadora. Para adicionar ao calendário do telemóvel ou celular.`,
    },
    ceja: (anios) => `Calendário ${anios}`,
    h1: (pais) => `Calendário trabalhista ${gPt.de(pais)}`,
    acento: "as datas que mexem no salário",
    bajada: "Cada data sai de uma fonte oficial e leva à calculadora certa. A página se atualiza sozinha quando sai um valor novo.",
    proxima: "A próxima data",
    cuenta: { hoy: "Hoje", manana: "Amanhã", ayer: "Ontem", en: (n) => `Em ${n} dias`, hace: (n) => `Há ${n} dias`, dias: (n) => (n === 1 ? "dia" : "dias") },
    queViene: "O que vem por aí",
    yaRige: "O que já vale",
    mesPorMes: "O ano mês a mês",
    sinFechas: "Sem mudanças anunciadas",
    filtro: "Filtrar por assunto",
    todo: "Tudo",
    tipos: { pago: "Pagamentos", "salario-minimo": "Salário mínimo", impuestos: "Impostos", aportes: "Contribuições e pensões", laboral: "Regras trabalhistas", indices: "Indicadores" },
    pasa: (antes, despues) => `Passa de ${antes} para ${despues}`,
    queda: (valor) => `Fica em ${valor}`,
    cambian: "Os valores mudam",
    zonas: (lista) => `Em ${lista}`,
    limite: "Prazo final",
    agregar: "Adicionar ao meu calendário",
    descargar: "Apple, Outlook e outros (ficheiro .ics)",
    google: "Google Agenda",
    calcular: "Fazer a conta",
    tambien: "Também em",
    fuente: (organismo, fecha) => `Fonte: ${organismo}. Verificado em ${fecha}.`,
  verificado: (fecha) => `Verificado em ${fecha}`,
    suscribir: {
      titulo: "O calendário completo, sempre em dia",
      texto: "Com a assinatura, as datas novas aparecem sozinhas no calendário do telefone ou do computador.",
      boton: "Assinar o calendário",
      copiar: "Copiar o link",
      copiado: "Link copiado",
    },
    fuentes: {
      titulo: "De onde sai cada data",
      texto: "Só entram datas que já estão numa norma ou num valor publicado pelo órgão oficial. O que ainda não saiu não aparece.",
    },
    vacio: "Não há datas deste tema nos próximos doze meses.",
    destacado: {
      ceja: "Calendário trabalhista",
      titulo: "As datas que mexem no salário este ano",
      ir: "Ver o calendário",
      proxima: (titulo, fecha) => `A seguir: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Calendário trabalhista ${gPt.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Datas trabalhistas e fiscais ${gPt.de(pais)}, com fonte oficial.`,
      calculadora: "Calculadora",
      fuente: "Fonte",
    },
    og: { proxima: "Próxima data", mas: (n) => `E mais ${n} datas no ano` },
  },
  regional: {
    "pt-PT": {
      seo: { descripcionSin: (pais) => `As datas que mudam o salário ${gPt.en(pais)}, com fonte oficial e a sua calculadora. Para adicionar ao calendário do telemóvel.` },
      bajada: "Cada data sai de uma fonte oficial e leva à calculadora certa. A página atualiza-se sozinha quando sai um valor novo.",
      tipos: { laboral: "Regras laborais" },
    },
    "pt-BR": {
      seo: { descripcionSin: (pais) => `As datas que mudam o salário ${gPt.en(pais)}, com fonte oficial e a sua calculadora. Para adicionar à agenda do celular.` },
      descargar: "Apple, Outlook e outros (arquivo .ics)",
    },
  },
};

const gEn = GRAMATICA.en;
const en: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Pay and tax calendar",
    seo: {
      titulo: (pais, anios) => [`${pais} pay and tax calendar ${anios}: key dates`, `${pais} pay and tax calendar ${anios}`, `${pais} pay calendar`],
      descripcion: (pais, proximas) => `The dates that change pay ${gEn.en(pais)}, from official sources: ${proximas}. Each one with its calculator.`,
      descripcionSin: (pais) => `The dates that change pay ${gEn.en(pais)}, from official sources, each with its calculator. Add them to your phone's calendar.`,
    },
    ceja: (anios) => `${anios} calendar`,
    h1: (pais) => `Pay and tax calendar ${gEn.para(pais)}`,
    acento: "the dates that move your pay",
    bajada: "Every date comes from an official source and links to the calculator it affects. The page updates itself when a new figure is published.",
    proxima: "Next date",
    cuenta: { hoy: "Today", manana: "Tomorrow", ayer: "Yesterday", en: (n) => `In ${n} days`, hace: (n) => `${n} days ago`, dias: (n) => (n === 1 ? "day" : "days") },
    queViene: "Coming up",
    yaRige: "Already in force",
    mesPorMes: "The year, month by month",
    sinFechas: "No changes announced",
    filtro: "Filter by topic",
    todo: "All",
    tipos: { pago: "Payments", "salario-minimo": "Minimum wage", impuestos: "Taxes", aportes: "Contributions and pensions", laboral: "Employment rules", indices: "Reference values" },
    pasa: (antes, despues) => `Goes from ${antes} to ${despues}`,
    queda: (valor) => `Set at ${valor}`,
    cambian: "The figures change",
    zonas: (lista) => `In ${lista}`,
    limite: "Deadline",
    agregar: "Add to my calendar",
    descargar: "Apple, Outlook and others (.ics file)",
    google: "Google Calendar",
    calcular: "Calculate",
    tambien: "Also in",
    fuente: (organismo, fecha) => `Source: ${organismo}. Checked on ${fecha}.`,
  verificado: (fecha) => `Checked on ${fecha}`,
    suscribir: {
      titulo: "The whole calendar, always up to date",
      texto: "Subscribe once and new dates show up on their own in the calendar on a phone or computer.",
      boton: "Subscribe to the calendar",
      copiar: "Copy link",
      copiado: "Link copied",
    },
    fuentes: {
      titulo: "Where each date comes from",
      texto: "Only dates already set in a rule or in a figure published by the official body make it in. If something isn't published yet, it doesn't show.",
    },
    vacio: "No dates on this topic in the next twelve months.",
    destacado: {
      ceja: "Pay calendar",
      titulo: "The dates that move pay this year",
      ir: "See the calendar",
      proxima: (titulo, fecha) => `Next: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${pais} pay and tax calendar (CalcularYa)`,
      descripcion: (pais) => `Pay and tax dates ${gEn.en(pais)}, from official sources.`,
      calculadora: "Calculator",
      fuente: "Source",
    },
    og: { proxima: "Next date", mas: (n) => `And ${n} more dates this year` },
  },
};

const gFr = GRAMATICA.fr;
const fr: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Calendrier de la paie et des impôts",
    seo: {
      titulo: (pais, anios) => [`Calendrier de la paie ${anios} ${gFr.en(pais)} : dates clés`, `Calendrier de la paie ${anios} ${gFr.en(pais)}`, `Calendrier de la paie ${gFr.en(pais)}`],
      descripcion: (pais, proximas) => `Les dates qui changent le salaire ${gFr.en(pais)}, avec source officielle : ${proximas}. Chacune avec son calculateur.`,
      descripcionSin: (pais) => `Les dates qui changent le salaire ${gFr.en(pais)}, avec source officielle et calculateur. À ajouter à l'agenda du téléphone.`,
    },
    ceja: (anios) => `Calendrier ${anios}`,
    h1: (pais) => `Calendrier de la paie et des impôts ${gFr.en(pais)}`,
    acento: "les dates qui font bouger le salaire",
    bajada: "Chaque date vient d'une source officielle et mène au calculateur concerné. La page se met à jour seule dès qu'une nouvelle valeur est publiée.",
    proxima: "Prochaine date",
    cuenta: { hoy: "Aujourd'hui", manana: "Demain", ayer: "Hier", en: (n) => `Dans ${n} jours`, hace: (n) => `Il y a ${n} jours`, dias: (n) => (n === 1 ? "jour" : "jours") },
    queViene: "À venir",
    yaRige: "Déjà en vigueur",
    mesPorMes: "L'année mois par mois",
    sinFechas: "Aucun changement annoncé",
    filtro: "Filtrer par thème",
    todo: "Tout",
    tipos: { pago: "Paiements", "salario-minimo": "Salaire minimum", impuestos: "Impôts", aportes: "Cotisations et retraites", laboral: "Droit du travail", indices: "Indices" },
    pasa: (antes, despues) => `Passe de ${antes} à ${despues}`,
    queda: (valor) => `Fixé à ${valor}`,
    cambian: "Les montants changent",
    zonas: (lista) => `Pour ${lista}`,
    limite: "Date limite",
    agregar: "Ajouter à mon agenda",
    descargar: "Apple, Outlook et autres (fichier .ics)",
    google: "Google Agenda",
    calcular: "Calculer",
    tambien: "Aussi dans",
    fuente: (organismo, fecha) => `Source : ${organismo}. Vérifié le ${fecha}.`,
  verificado: (fecha) => `Vérifié le ${fecha}`,
    suscribir: {
      titulo: "Le calendrier complet, toujours à jour",
      texto: "Avec l'abonnement, les nouvelles dates s'ajoutent seules à l'agenda du téléphone ou de l'ordinateur.",
      boton: "S'abonner au calendrier",
      copiar: "Copier le lien",
      copiado: "Lien copié",
    },
    fuentes: {
      titulo: "D'où vient chaque date",
      texto: "Seules entrent les dates déjà fixées par un texte ou par une valeur publiée par l'organisme officiel. Ce qui n'est pas encore publié n'apparaît pas.",
    },
    vacio: "Aucune date sur ce thème dans les douze prochains mois.",
    destacado: {
      ceja: "Calendrier de la paie",
      titulo: "Les dates qui font bouger le salaire cette année",
      ir: "Voir le calendrier",
      proxima: (titulo, fecha) => `Prochaine : ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Calendrier de la paie ${gFr.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Dates de la paie et des impôts ${gFr.en(pais)}, avec source officielle.`,
      calculadora: "Calculateur",
      fuente: "Source",
    },
    og: { proxima: "Prochaine date", mas: (n) => `Et ${n} autres dates dans l'année` },
  },
  regional: { "fr-CA": { agregar: "Ajouter à mon calendrier", google: "Google Agenda", descargar: "Apple, Outlook et autres (fichier .ics)" } },
};

const gDe = GRAMATICA.de;
const de: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Lohn- und Steuerkalender",
    seo: {
      titulo: (pais, anios) => [`Lohnkalender ${anios} ${gDe.en(pais)}: wichtige Termine`, `Lohnkalender ${anios} ${gDe.en(pais)}`, `Lohnkalender ${gDe.en(pais)}`],
      descripcion: (pais, proximas) => `Die Termine, die den Lohn ${gDe.en(pais)} verändern, mit amtlicher Quelle: ${proximas}. Jeweils mit passendem Rechner.`,
      descripcionSin: (pais) => `Die Termine, die den Lohn ${gDe.en(pais)} verändern, mit amtlicher Quelle und passendem Rechner. Direkt in den Handykalender.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Lohn- und Steuerkalender ${gDe.en(pais)}`,
    acento: "die Termine, die den Lohn bewegen",
    bajada: "Jeder Termin stammt aus einer amtlichen Quelle und führt zum passenden Rechner. Die Seite aktualisiert sich selbst, sobald ein neuer Wert erscheint.",
    proxima: "Nächster Termin",
    cuenta: { hoy: "Heute", manana: "Morgen", ayer: "Gestern", en: (n) => `In ${n} Tagen`, hace: (n) => `Vor ${n} Tagen`, dias: (n) => (n === 1 ? "Tag" : "Tage") },
    queViene: "Was kommt",
    yaRige: "Gilt schon",
    mesPorMes: "Das Jahr Monat für Monat",
    sinFechas: "Keine Änderung angekündigt",
    filtro: "Nach Thema filtern",
    todo: "Alles",
    tipos: { pago: "Zahlungen", "salario-minimo": "Mindestlohn", impuestos: "Steuern", aportes: "Beiträge und Renten", laboral: "Arbeitsrecht", indices: "Kennzahlen" },
    pasa: (antes, despues) => `Von ${antes} auf ${despues}`,
    queda: (valor) => `Neu: ${valor}`,
    cambian: "Die Werte ändern sich",
    zonas: (lista) => `In ${lista}`,
    limite: "Frist",
    agregar: "Zum Kalender hinzufügen",
    descargar: "Apple, Outlook und andere (.ics-Datei)",
    google: "Google Kalender",
    calcular: "Berechnen",
    tambien: "Auch in",
    fuente: (organismo, fecha) => `Quelle: ${organismo}. Geprüft am ${fecha}.`,
  verificado: (fecha) => `Geprüft am ${fecha}`,
    suscribir: {
      titulo: "Der ganze Kalender, immer aktuell",
      texto: "Mit dem Abo erscheinen neue Termine von selbst im Kalender auf Handy oder Computer.",
      boton: "Kalender abonnieren",
      copiar: "Link kopieren",
      copiado: "Link kopiert",
    },
    fuentes: {
      titulo: "Woher jeder Termin kommt",
      texto: "Es kommen nur Termine hinein, die schon in einer Vorschrift stehen oder von der zuständigen Behörde veröffentlicht wurden. Was noch nicht veröffentlicht ist, fehlt.",
    },
    vacio: "Zu diesem Thema gibt es in den nächsten zwölf Monaten keinen Termin.",
    destacado: {
      ceja: "Lohnkalender",
      titulo: "Die Termine, die den Lohn dieses Jahr bewegen",
      ir: "Kalender ansehen",
      proxima: (titulo, fecha) => `Nächster Termin: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Lohnkalender ${gDe.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Lohn- und Steuertermine ${gDe.en(pais)}, mit amtlicher Quelle.`,
      calculadora: "Rechner",
      fuente: "Quelle",
    },
    og: { proxima: "Nächster Termin", mas: (n) => `Und ${n} weitere Termine im Jahr` },
  },
};

const gIt = GRAMATICA.it;
const it: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Calendario del lavoro e del fisco",
    seo: {
      titulo: (pais, anios) => [`Calendario del lavoro ${anios} ${gIt.en(pais)}: date chiave`, `Calendario del lavoro ${anios} ${gIt.en(pais)}`, `Calendario del lavoro ${gIt.en(pais)}`],
      descripcion: (pais, proximas) => `Le date che cambiano lo stipendio ${gIt.en(pais)}, con fonte ufficiale: ${proximas}. Ognuna con il suo calcolatore.`,
      descripcionSin: (pais) => `Le date che cambiano lo stipendio ${gIt.en(pais)}, con fonte ufficiale e calcolatore. Da aggiungere al calendario del telefono.`,
    },
    ceja: (anios) => `Calendario ${anios}`,
    h1: (pais) => `Calendario del lavoro e del fisco ${gIt.en(pais)}`,
    acento: "le date che muovono lo stipendio",
    bajada: "Ogni data viene da una fonte ufficiale e porta al calcolatore giusto. La pagina si aggiorna da sola quando esce un nuovo valore.",
    proxima: "Prossima data",
    cuenta: { hoy: "Oggi", manana: "Domani", ayer: "Ieri", en: (n) => `Fra ${n} giorni`, hace: (n) => `${n} giorni fa`, dias: (n) => (n === 1 ? "giorno" : "giorni") },
    queViene: "In arrivo",
    yaRige: "Già in vigore",
    mesPorMes: "L'anno mese per mese",
    sinFechas: "Nessun cambio annunciato",
    filtro: "Filtra per tema",
    todo: "Tutto",
    tipos: { pago: "Pagamenti", "salario-minimo": "Salario minimo", impuestos: "Imposte", aportes: "Contributi e pensioni", laboral: "Regole del lavoro", indices: "Indici" },
    pasa: (antes, despues) => `Passa da ${antes} a ${despues}`,
    queda: (valor) => `Fissato a ${valor}`,
    cambian: "Cambiano gli importi",
    zonas: (lista) => `In ${lista}`,
    limite: "Scadenza",
    agregar: "Aggiungi al mio calendario",
    descargar: "Apple, Outlook e altri (file .ics)",
    google: "Google Calendar",
    calcular: "Calcola",
    tambien: "Anche in",
    fuente: (organismo, fecha) => `Fonte: ${organismo}. Verificato il ${fecha}.`,
  verificado: (fecha) => `Verificato il ${fecha}`,
    suscribir: {
      titulo: "Il calendario completo, sempre aggiornato",
      texto: "Con l'abbonamento, le nuove date compaiono da sole nel calendario del telefono o del computer.",
      boton: "Abbonati al calendario",
      copiar: "Copia il link",
      copiado: "Link copiato",
    },
    fuentes: {
      titulo: "Da dove viene ogni data",
      texto: "Entrano solo date già fissate da una norma o da un valore pubblicato dall'ente ufficiale. Quello che non è ancora pubblicato non compare.",
    },
    vacio: "Nessuna data su questo tema nei prossimi dodici mesi.",
    destacado: {
      ceja: "Calendario del lavoro",
      titulo: "Le date che muovono lo stipendio quest'anno",
      ir: "Vedi il calendario",
      proxima: (titulo, fecha) => `Prossima: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Calendario del lavoro ${gIt.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Date del lavoro e del fisco ${gIt.en(pais)}, con fonte ufficiale.`,
      calculadora: "Calcolatore",
      fuente: "Fonte",
    },
    og: { proxima: "Prossima data", mas: (n) => `E altre ${n} date nell'anno` },
  },
};

const gNl = GRAMATICA.nl;
const nl: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Loon- en belastingkalender",
    seo: {
      titulo: (pais, anios) => [`Loonkalender ${anios} ${gNl.en(pais)}: belangrijke data`, `Loonkalender ${anios} ${gNl.en(pais)}`, `Loonkalender ${gNl.en(pais)}`],
      descripcion: (pais, proximas) => `De data die het loon ${gNl.en(pais)} veranderen, met officiële bron: ${proximas}. Elk met een rekenhulp.`,
      descripcionSin: (pais) => `De data die het loon ${gNl.en(pais)} veranderen, met officiële bron en rekenhulp. Meteen in de agenda op de telefoon.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Loon- en belastingkalender ${gNl.en(pais)}`,
    acento: "de data die het loon veranderen",
    bajada: "Elke datum komt uit een officiële bron en leidt naar de juiste rekenhulp. De pagina werkt zichzelf bij zodra er een nieuwe waarde verschijnt.",
    proxima: "Volgende datum",
    cuenta: { hoy: "Vandaag", manana: "Morgen", ayer: "Gisteren", en: (n) => `Over ${n} dagen`, hace: (n) => `${n} dagen geleden`, dias: (n) => (n === 1 ? "dag" : "dagen") },
    queViene: "Wat eraan komt",
    yaRige: "Geldt al",
    mesPorMes: "Het jaar per maand",
    sinFechas: "Geen wijziging aangekondigd",
    filtro: "Filteren op onderwerp",
    todo: "Alles",
    tipos: { pago: "Betalingen", "salario-minimo": "Minimumloon", impuestos: "Belastingen", aportes: "Premies en pensioenen", laboral: "Arbeidsregels", indices: "Indexcijfers" },
    pasa: (antes, despues) => `Gaat van ${antes} naar ${despues}`,
    queda: (valor) => `Wordt ${valor}`,
    cambian: "De bedragen veranderen",
    zonas: (lista) => `In ${lista}`,
    limite: "Uiterste datum",
    agregar: "Toevoegen aan mijn agenda",
    descargar: "Apple, Outlook en andere (.ics-bestand)",
    google: "Google Agenda",
    calcular: "Berekenen",
    tambien: "Ook in",
    fuente: (organismo, fecha) => `Bron: ${organismo}. Gecontroleerd op ${fecha}.`,
  verificado: (fecha) => `Gecontroleerd op ${fecha}`,
    suscribir: {
      titulo: "De hele kalender, altijd bijgewerkt",
      texto: "Met een abonnement verschijnen nieuwe data vanzelf in de agenda op telefoon of computer.",
      boton: "Abonneren op de kalender",
      copiar: "Link kopiëren",
      copiado: "Link gekopieerd",
    },
    fuentes: {
      titulo: "Waar elke datum vandaan komt",
      texto: "Alleen data die al in een regeling staan of die de officiële instantie heeft gepubliceerd, komen erin. Wat nog niet gepubliceerd is, staat er niet.",
    },
    vacio: "Geen data over dit onderwerp in de komende twaalf maanden.",
    destacado: {
      ceja: "Loonkalender",
      titulo: "De data die het loon dit jaar veranderen",
      ir: "Bekijk de kalender",
      proxima: (titulo, fecha) => `Volgende: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Loonkalender ${gNl.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Loon- en belastingdata ${gNl.en(pais)}, met officiële bron.`,
      calculadora: "Rekenhulp",
      fuente: "Bron",
    },
    og: { proxima: "Volgende datum", mas: (n) => `En nog ${n} data dit jaar` },
  },
};

const gJa = GRAMATICA.ja;
const ja: Diccionario<TextosCalendario> = {
  base: {
    nombre: "給与と税金のカレンダー",
    seo: {
      titulo: (pais, anios) => [`${gJa.de(pais)}給与・税金カレンダー${anios}`, `${gJa.de(pais)}給与カレンダー`],
      descripcion: (pais, proximas) => `${gJa.de(pais)}給与が変わる日を公式の出典つきでまとめています。${proximas}。それぞれ計算ツールにつながります。`,
      descripcionSin: (pais) => `${gJa.de(pais)}給与が変わる日を公式の出典つきでまとめています。スマホのカレンダーに追加できます。`,
    },
    ceja: (anios) => `${anios}年のカレンダー`,
    h1: (pais) => `${gJa.de(pais)}給与・税金カレンダー`,
    acento: "給与が動く日",
    bajada: "どの日付も公式の出典にもとづき、対応する計算ツールにつながります。新しい値が公表されると、ページは自動で更新されます。",
    proxima: "次の日付",
    cuenta: { hoy: "今日", manana: "明日", ayer: "昨日", en: (n) => `${n}日後`, hace: (n) => `${n}日前`, dias: () => "日" },
    queViene: "これからの予定",
    yaRige: "すでに適用中",
    mesPorMes: "月ごとの一年",
    sinFechas: "発表された変更はありません",
    filtro: "テーマで絞り込む",
    todo: "すべて",
    tipos: { pago: "支払い", "salario-minimo": "最低賃金", impuestos: "税金", aportes: "社会保険と年金", laboral: "労働ルール", indices: "指標" },
    pasa: (antes, despues) => `${antes}から${despues}に変わります`,
    queda: (valor) => `${valor}になります`,
    cambian: "金額が変わります",
    zonas: (lista) => `${lista}が対象`,
    limite: "期限",
    agregar: "カレンダーに追加",
    descargar: "Apple、Outlookなど（.icsファイル）",
    google: "Googleカレンダー",
    calcular: "計算する",
    tambien: "関連ツール",
    fuente: (organismo, fecha) => `出典：${organismo}。${fecha}に確認しました。`,
  verificado: (fecha) => `${fecha}に確認`,
    suscribir: {
      titulo: "カレンダー全体をいつも最新に",
      texto: "購読すると、新しい日付がスマホやパソコンのカレンダーに自動で追加されます。",
      boton: "カレンダーを購読",
      copiar: "リンクをコピー",
      copiado: "コピーしました",
    },
    fuentes: {
      titulo: "日付の出典について",
      texto: "法令や公的機関が公表した値にもとづく日付だけを載せています。まだ公表されていないものは表示しません。",
    },
    vacio: "今後12か月、このテーマの日付はありません。",
    destacado: {
      ceja: "給与カレンダー",
      titulo: "今年、給与が動く日",
      ir: "カレンダーを見る",
      proxima: (titulo, fecha) => `次の予定：${titulo}（${fecha}）`,
    },
    ics: {
      nombre: (pais) => `${gJa.de(pais)}給与カレンダー（CalcularYa）`,
      descripcion: (pais) => `${gJa.de(pais)}給与と税金に関する日付です。公式の出典つき。`,
      calculadora: "計算ツール",
      fuente: "出典",
    },
    og: { proxima: "次の日付", mas: (n) => `ほかに${n}件の予定があります` },
  },
};

const gKo = GRAMATICA.ko;
const ko: Diccionario<TextosCalendario> = {
  base: {
    nombre: "급여·세금 달력",
    seo: {
      titulo: (pais, anios) => [`${gKo.de(pais)} 급여·세금 달력 ${anios}`, `${gKo.de(pais)} 급여 달력`],
      descripcion: (pais, proximas) => `${gKo.de(pais)} 급여가 바뀌는 날을 공식 출처와 함께 정리했어요. ${proximas}. 날짜마다 계산기로 이어져요.`,
      descripcionSin: (pais) => `${gKo.de(pais)} 급여가 바뀌는 날을 공식 출처와 함께 정리했어요. 휴대폰 달력에 바로 추가할 수 있어요.`,
    },
    ceja: (anios) => `${anios} 달력`,
    h1: (pais) => `${gKo.de(pais)} 급여·세금 달력`,
    acento: "급여가 움직이는 날",
    bajada: "모든 날짜는 공식 출처에서 가져오고, 해당 계산기로 이어져요. 새 값이 발표되면 페이지가 저절로 바뀌어요.",
    proxima: "다음 날짜",
    cuenta: { hoy: "오늘", manana: "내일", ayer: "어제", en: (n) => `${n}일 후`, hace: (n) => `${n}일 전`, dias: () => "일" },
    queViene: "다가오는 일정",
    yaRige: "이미 적용 중",
    mesPorMes: "월별로 보는 한 해",
    sinFechas: "발표된 변경 없음",
    filtro: "주제로 거르기",
    todo: "전체",
    tipos: { pago: "지급", "salario-minimo": "최저임금", impuestos: "세금", aportes: "사회보험과 연금", laboral: "노동 규정", indices: "지표" },
    pasa: (antes, despues) => `${antes}에서 ${despues}(으)로 바뀌어요`,
    queda: (valor) => `${valor}(으)로 정해져요`,
    cambian: "금액이 바뀌어요",
    zonas: (lista) => `${lista} 해당`,
    limite: "마감일",
    agregar: "내 달력에 추가",
    descargar: "Apple, Outlook 등 (.ics 파일)",
    google: "Google 캘린더",
    calcular: "계산하기",
    tambien: "관련 계산기",
    fuente: (organismo, fecha) => `출처: ${organismo}. ${fecha}에 확인했어요.`,
  verificado: (fecha) => `${fecha}에 확인했어요`,
    suscribir: {
      titulo: "달력 전체를 늘 최신으로",
      texto: "구독하면 새 날짜가 휴대폰이나 컴퓨터 달력에 저절로 추가돼요.",
      boton: "달력 구독하기",
      copiar: "링크 복사",
      copiado: "링크를 복사했어요",
    },
    fuentes: {
      titulo: "날짜는 어디서 오나요",
      texto: "법령이나 공공기관이 발표한 값에 있는 날짜만 넣어요. 아직 발표되지 않은 것은 보이지 않아요.",
    },
    vacio: "앞으로 12개월 동안 이 주제의 날짜는 없어요.",
    destacado: {
      ceja: "급여 달력",
      titulo: "올해 급여가 움직이는 날",
      ir: "달력 보기",
      proxima: (titulo, fecha) => `다음: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${gKo.de(pais)} 급여 달력 (CalcularYa)`,
      descripcion: (pais) => `${gKo.de(pais)} 급여와 세금 날짜예요. 공식 출처 포함.`,
      calculadora: "계산기",
      fuente: "출처",
    },
    og: { proxima: "다음 날짜", mas: (n) => `올해 ${n}개의 날짜가 더 있어요` },
  },
};

const gZh = GRAMATICA.zh;
const zhHant: TextosCalendario = {
  nombre: "薪資與稅務日曆",
  seo: {
    titulo: (pais, anios) => [`${gZh.de(pais)}薪資與稅務日曆${anios}`, `${gZh.de(pais)}薪資日曆`],
    descripcion: (pais, proximas) => `${gZh.de(pais)}薪資變動日期，附官方出處：${proximas}。每個日期都連到對應的計算器。`,
    descripcionSin: (pais) => `${gZh.de(pais)}薪資變動日期，附官方出處與計算器。可直接加入手機日曆。`,
  },
  ceja: (anios) => `${anios}日曆`,
  h1: (pais) => `${gZh.de(pais)}薪資與稅務日曆`,
  acento: "影響薪資的日期",
  bajada: "每個日期都來自官方出處，並連到對應的計算器。有新數值公布時，頁面會自動更新。",
  proxima: "下一個日期",
  cuenta: { hoy: "今天", manana: "明天", ayer: "昨天", en: (n) => `${n}天後`, hace: (n) => `${n}天前`, dias: () => "天" },
  queViene: "即將到來",
  yaRige: "已經生效",
  mesPorMes: "逐月看一年",
  sinFechas: "沒有公布的變動",
  filtro: "依主題篩選",
  todo: "全部",
  tipos: { pago: "給付", "salario-minimo": "最低工資", impuestos: "稅務", aportes: "社保與退休金", laboral: "勞動規定", indices: "指標" },
  pasa: (antes, despues) => `由${antes}改為${despues}`,
  queda: (valor) => `定為${valor}`,
  cambian: "金額有變動",
  zonas: (lista) => `適用於${lista}`,
  limite: "截止日",
  agregar: "加入我的日曆",
  descargar: "Apple、Outlook等（.ics檔）",
  google: "Google日曆",
  calcular: "開始計算",
  tambien: "相關計算器",
  fuente: (organismo, fecha) => `出處：${organismo}。${fecha}確認。`,
  verificado: (fecha) => `${fecha}確認`,
  suscribir: {
    titulo: "完整日曆，隨時最新",
    texto: "訂閱後，新的日期會自動出現在手機或電腦的日曆中。",
    boton: "訂閱日曆",
    copiar: "複製連結",
    copiado: "已複製連結",
  },
  fuentes: {
    titulo: "日期從哪裡來",
    texto: "只收錄法規或官方機構已公布數值中的日期。尚未公布的不會出現。",
  },
  vacio: "未來十二個月沒有這個主題的日期。",
  destacado: {
    ceja: "薪資日曆",
    titulo: "今年影響薪資的日期",
    ir: "查看日曆",
    proxima: (titulo, fecha) => `下一個：${titulo}，${fecha}`,
  },
  ics: {
    nombre: (pais) => `${gZh.de(pais)}薪資日曆（CalcularYa）`,
    descripcion: (pais) => `${gZh.de(pais)}薪資與稅務日期，附官方出處。`,
    calculadora: "計算器",
    fuente: "出處",
  },
  og: { proxima: "下一個日期", mas: (n) => `今年還有${n}個日期` },
};

const zhHans: TextosCalendario = {
  nombre: "工资与税务日历",
  seo: {
    titulo: (pais, anios) => [`${gZh.de(pais)}工资与税务日历${anios}`, `${gZh.de(pais)}工资日历`],
    descripcion: (pais, proximas) => `${gZh.de(pais)}工资变动日期，附官方出处：${proximas}。每个日期都连到对应的计算器。`,
    descripcionSin: (pais) => `${gZh.de(pais)}工资变动日期，附官方出处与计算器。可直接加入手机日历。`,
  },
  ceja: (anios) => `${anios}日历`,
  h1: (pais) => `${gZh.de(pais)}工资与税务日历`,
  acento: "影响工资的日期",
  bajada: "每个日期都来自官方出处，并连到对应的计算器。有新数值公布时，页面会自动更新。",
  proxima: "下一个日期",
  cuenta: { hoy: "今天", manana: "明天", ayer: "昨天", en: (n) => `${n}天后`, hace: (n) => `${n}天前`, dias: () => "天" },
  queViene: "即将到来",
  yaRige: "已经生效",
  mesPorMes: "逐月看一年",
  sinFechas: "没有公布的变动",
  filtro: "按主题筛选",
  todo: "全部",
  tipos: { pago: "发放", "salario-minimo": "最低工资", impuestos: "税务", aportes: "社保与养老金", laboral: "劳动规定", indices: "指标" },
  pasa: (antes, despues) => `由${antes}改为${despues}`,
  queda: (valor) => `定为${valor}`,
  cambian: "金额有变动",
  zonas: (lista) => `适用于${lista}`,
  limite: "截止日",
  agregar: "加入我的日历",
  descargar: "Apple、Outlook等（.ics文件）",
  google: "Google日历",
  calcular: "开始计算",
  tambien: "相关计算器",
  fuente: (organismo, fecha) => `出处：${organismo}。${fecha}确认。`,
  verificado: (fecha) => `${fecha}确认`,
  suscribir: {
    titulo: "完整日历，随时最新",
    texto: "订阅后，新的日期会自动出现在手机或电脑的日历中。",
    boton: "订阅日历",
    copiar: "复制链接",
    copiado: "已复制链接",
  },
  fuentes: {
    titulo: "日期从哪里来",
    texto: "只收录法规或官方机构已公布数值中的日期。尚未公布的不会出现。",
  },
  vacio: "未来十二个月没有这个主题的日期。",
  destacado: {
    ceja: "工资日历",
    titulo: "今年影响工资的日期",
    ir: "查看日历",
    proxima: (titulo, fecha) => `下一个：${titulo}，${fecha}`,
  },
  ics: {
    nombre: (pais) => `${gZh.de(pais)}工资日历（CalcularYa）`,
    descripcion: (pais) => `${gZh.de(pais)}工资与税务日期，附官方出处。`,
    calculadora: "计算器",
    fuente: "出处",
  },
  og: { proxima: "下一个日期", mas: (n) => `今年还有${n}个日期` },
};

const zh: Diccionario<TextosCalendario> = { base: zhHant, regional: { "zh-CN": zhHans, "zh-SG": zhHans } };

// ───────────────────────────── pl ─────────────────────────────

const gPl = GRAMATICA.pl;
const dniKalendarzPl = (n: number) => (n === 1 ? "dzień" : "dni");
const pl: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Kalendarz płacowy i podatkowy",
    seo: {
      titulo: (pais, anios) => [`Kalendarz płacowy ${anios} ${gPl.en(pais)}: ważne terminy`, `Kalendarz płacowy ${anios} ${gPl.en(pais)}`, `Kalendarz płacowy ${gPl.en(pais)}`],
      descripcion: (pais, proximas) => `Terminy, które zmieniają wynagrodzenie ${gPl.en(pais)}, z oficjalnym źródłem: ${proximas}. Przy każdym odpowiedni kalkulator.`,
      descripcionSin: (pais) => `Terminy, które zmieniają wynagrodzenie ${gPl.en(pais)}, z oficjalnym źródłem i odpowiednim kalkulatorem. Do dodania w kalendarzu telefonu.`,
    },
    ceja: (anios) => `Kalendarz ${anios}`,
    h1: (pais) => `Kalendarz płacowy i podatkowy ${gPl.en(pais)}`,
    acento: "terminy, które zmieniają pensję",
    bajada: "Każda data pochodzi z oficjalnego źródła i prowadzi do kalkulatora, którego dotyczy. Strona aktualizuje się sama, gdy pojawia się nowa wartość.",
    proxima: "Najbliższy termin",
    cuenta: { hoy: "Dziś", manana: "Jutro", ayer: "Wczoraj", en: (n) => `Za ${n} ${dniKalendarzPl(n)}`, hace: (n) => `${n} ${dniKalendarzPl(n)} temu`, dias: (n) => dniKalendarzPl(n) },
    queViene: "Co przed nami",
    yaRige: "Już obowiązuje",
    mesPorMes: "Rok miesiąc po miesiącu",
    sinFechas: "Brak zapowiedzianych zmian",
    filtro: "Filtruj według tematu",
    todo: "Wszystko",
    tipos: { pago: "Wypłaty", "salario-minimo": "Płaca minimalna", impuestos: "Podatki", aportes: "Składki i emerytury", laboral: "Prawo pracy", indices: "Wskaźniki" },
    pasa: (antes, despues) => `Zmiana z ${antes} na ${despues}`,
    queda: (valor) => `Nowa wartość: ${valor}`,
    cambian: "Zmieniają się wartości",
    zonas: (lista) => `Dotyczy: ${lista}`,
    limite: "Ostateczny termin",
    agregar: "Dodaj do kalendarza",
    descargar: "Apple, Outlook i inne (plik .ics)",
    google: "Kalendarz Google",
    calcular: "Oblicz",
    tambien: "Także w",
    fuente: (organismo, fecha) => `Źródło: ${organismo}. Sprawdzono ${fecha}.`,
    verificado: (fecha) => `Sprawdzono ${fecha}`,
    suscribir: {
      titulo: "Cały kalendarz, zawsze aktualny",
      texto: "Po zasubskrybowaniu nowe terminy same pojawiają się w kalendarzu w telefonie albo na komputerze.",
      boton: "Subskrybuj kalendarz",
      copiar: "Kopiuj link",
      copiado: "Link skopiowany",
    },
    fuentes: {
      titulo: "Skąd pochodzi każda data",
      texto: "Trafiają tu tylko daty zapisane w przepisach albo w wartości opublikowanej przez oficjalną instytucję. Jeśli coś nie zostało jeszcze opublikowane, nie ma tego w kalendarzu.",
    },
    vacio: "W najbliższych dwunastu miesiącach nie ma terminów z tego tematu.",
    destacado: {
      ceja: "Kalendarz płacowy",
      titulo: "Terminy, które w tym roku zmieniają pensję",
      ir: "Zobacz kalendarz",
      proxima: (titulo, fecha) => `Najbliższy: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Kalendarz płacowy ${gPl.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Terminy płacowe i podatkowe ${gPl.en(pais)}, z oficjalnym źródłem.`,
      calculadora: "Kalkulator",
      fuente: "Źródło",
    },
    og: { proxima: "Najbliższy termin", mas: (n) => `I jeszcze ${n} ${n === 1 ? "termin" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "terminy" : "terminów"} w tym roku` },
  },
};

// ───────────────────────────── sv ─────────────────────────────

const gSv = GRAMATICA.sv;
const sv: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Löne- och skattekalender",
    seo: {
      titulo: (pais, anios) => [`Lönekalender ${anios} ${gSv.de(pais)}: viktiga datum`, `Lönekalender ${anios} ${gSv.de(pais)}`, `Lönekalender ${gSv.de(pais)}`],
      descripcion: (pais, proximas) => `Datumen som påverkar lönen ${gSv.en(pais)}, med officiell källa: ${proximas}. Varje datum har sin kalkylator.`,
      descripcionSin: (pais) => `Datumen som påverkar lönen ${gSv.en(pais)}, med officiell källa och tillhörande kalkylator. Lägg in dem i kalendern i mobilen.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Löne- och skattekalender ${gSv.de(pais)}`,
    acento: "datumen som påverkar lönen",
    bajada: "Varje datum kommer från en officiell källa och leder till kalkylatorn det gäller. Sidan uppdateras av sig själv när ett nytt värde publiceras.",
    proxima: "Nästa datum",
    cuenta: { hoy: "I dag", manana: "I morgon", ayer: "I går", en: (n) => `Om ${n} dagar`, hace: (n) => `För ${n} dagar sedan`, dias: (n) => (n === 1 ? "dag" : "dagar") },
    queViene: "Det som kommer",
    yaRige: "Det som redan gäller",
    mesPorMes: "Året månad för månad",
    sinFechas: "Inga aviserade ändringar",
    filtro: "Filtrera efter ämne",
    todo: "Allt",
    tipos: { pago: "Utbetalningar", "salario-minimo": "Minimilön", impuestos: "Skatter", aportes: "Avgifter och pension", laboral: "Arbetsrättsliga regler", indices: "Referensvärden" },
    pasa: (antes, despues) => `Går från ${antes} till ${despues}`,
    queda: (valor) => `Fastställs till ${valor}`,
    cambian: "Beloppen ändras",
    zonas: (lista) => `Gäller ${lista}`,
    limite: "Sista dag",
    agregar: "Lägg till i min kalender",
    descargar: "Apple, Outlook med flera (.ics-fil)",
    google: "Google Kalender",
    calcular: "Räkna",
    tambien: "Finns även i",
    fuente: (organismo, fecha) => `Källa: ${organismo}. Kontrollerat ${fecha}.`,
    verificado: (fecha) => `Kontrollerat ${fecha}`,
    suscribir: {
      titulo: "Hela kalendern, alltid aktuell",
      texto: "Med en prenumeration dyker nya datum upp av sig själva i kalendern i mobilen eller datorn.",
      boton: "Prenumerera på kalendern",
      copiar: "Kopiera länken",
      copiado: "Länken är kopierad",
    },
    fuentes: {
      titulo: "Var varje datum kommer ifrån",
      texto: "Bara datum som redan står i en författning eller i ett värde som den ansvariga myndigheten har publicerat kommer med. Det som inte är publicerat än syns inte.",
    },
    vacio: "Inga datum inom det här ämnet de kommande tolv månaderna.",
    destacado: {
      ceja: "Lönekalender",
      titulo: "Datumen som påverkar lönen i år",
      ir: "Se kalendern",
      proxima: (titulo, fecha) => `Nästa: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Lönekalender ${gSv.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Löne- och skattedatum ${gSv.de(pais)}, med officiell källa.`,
      calculadora: "Kalkylator",
      fuente: "Källa",
    },
    og: { proxima: "Nästa datum", mas: (n) => `Och ${n} datum till under året` },
  },
};

// ───────────────────────────── da ─────────────────────────────

const gDa = GRAMATICA.da;
const da: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Løn- og skattekalender",
    seo: {
      titulo: (pais, anios) => [`Løn- og skattekalender ${anios} ${gDa.de(pais)}: vigtige datoer`, `Lønkalender ${anios} ${gDa.de(pais)}`, `Lønkalender ${gDa.de(pais)}`],
      descripcion: (pais, proximas) => `Datoerne, der ændrer lønnen ${gDa.en(pais)}, med officiel kilde: ${proximas}. Hver dato med sin beregner.`,
      descripcionSin: (pais) => `Datoerne, der ændrer lønnen ${gDa.en(pais)}, med officiel kilde og beregner. Klar til kalenderen på din telefon.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Løn- og skattekalender ${gDa.de(pais)}`,
    acento: "datoerne, der flytter lønnen",
    bajada: "Hver dato kommer fra en officiel kilde og fører til den beregner, den hører til. Siden opdaterer sig selv, når en ny værdi bliver offentliggjort.",
    proxima: "Næste dato",
    cuenta: { hoy: "I dag", manana: "I morgen", ayer: "I går", en: (n) => `Om ${n} dage`, hace: (n) => `For ${n} dage siden`, dias: (n) => (n === 1 ? "dag" : "dage") },
    queViene: "Det kommer",
    yaRige: "Det gælder allerede",
    mesPorMes: "Året måned for måned",
    sinFechas: "Ingen varslede ændringer",
    filtro: "Filtrér efter emne",
    todo: "Alt",
    tipos: { pago: "Udbetalinger", "salario-minimo": "Mindsteløn", impuestos: "Skat", aportes: "Bidrag og pension", laboral: "Regler på arbejdsmarkedet", indices: "Satser og indeks" },
    pasa: (antes, despues) => `Går fra ${antes} til ${despues}`,
    queda: (valor) => `Fastsat til ${valor}`,
    cambian: "Satserne ændres",
    zonas: (lista) => `Gælder i ${lista}`,
    limite: "Frist",
    agregar: "Føj til min kalender",
    descargar: "Apple, Outlook og andre (.ics-fil)",
    google: "Google Kalender",
    calcular: "Beregn",
    tambien: "Også i",
    fuente: (organismo, fecha) => `Kilde: ${organismo}. Tjekket ${fecha}.`,
    verificado: (fecha) => `Tjekket ${fecha}`,
    suscribir: {
      titulo: "Hele kalenderen, altid opdateret",
      texto: "Med et abonnement dukker nye datoer selv op i kalenderen på telefonen eller computeren.",
      boton: "Abonnér på kalenderen",
      copiar: "Kopiér linket",
      copiado: "Linket er kopieret",
    },
    fuentes: {
      titulo: "Hvor hver dato kommer fra",
      texto: "Kun datoer, der allerede står i en regel eller i en værdi offentliggjort af den officielle myndighed, kommer med. Er noget endnu ikke offentliggjort, vises det ikke.",
    },
    vacio: "Der er ingen datoer om dette emne de næste tolv måneder.",
    destacado: {
      ceja: "Lønkalender",
      titulo: "Datoerne, der flytter lønnen i år",
      ir: "Se kalenderen",
      proxima: (titulo, fecha) => `Næste: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Lønkalender ${gDa.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Løn- og skattedatoer ${gDa.de(pais)}, med officiel kilde.`,
      calculadora: "Beregner",
      fuente: "Kilde",
    },
    og: { proxima: "Næste dato", mas: (n) => `Og ${n} datoer mere i år` },
  },
};

// ───────────────────────────── nb ─────────────────────────────

const gNb = GRAMATICA.nb;
const nb: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Lønns- og skattekalender",
    seo: {
      titulo: (pais, anios) => [`Lønns- og skattekalender ${anios} ${gNb.de(pais)}: viktige datoer`, `Lønns- og skattekalender ${anios} ${gNb.de(pais)}`, `Lønnskalender ${gNb.de(pais)}`],
      descripcion: (pais, proximas) => `Datoene som endrer lønnen ${gNb.en(pais)}, med offisiell kilde: ${proximas}. Hver dato med sin kalkulator.`,
      descripcionSin: (pais) => `Datoene som endrer lønnen ${gNb.en(pais)}, med offisiell kilde og egen kalkulator. Klare til å legges inn i kalenderen på mobilen.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Lønns- og skattekalender ${gNb.de(pais)}`,
    acento: "datoene som påvirker lønnen",
    bajada: "Hver dato kommer fra en offisiell kilde og fører til kalkulatoren den gjelder. Siden oppdateres av seg selv når en ny verdi blir publisert.",
    proxima: "Neste dato",
    cuenta: { hoy: "I dag", manana: "I morgen", ayer: "I går", en: (n) => (n === 1 ? "Om 1 dag" : `Om ${n} dager`), hace: (n) => (n === 1 ? "For 1 dag siden" : `For ${n} dager siden`), dias: (n) => (n === 1 ? "dag" : "dager") },
    queViene: "Dette kommer",
    yaRige: "Dette gjelder allerede",
    mesPorMes: "Året måned for måned",
    sinFechas: "Ingen varslede endringer",
    filtro: "Filtrer etter tema",
    todo: "Alt",
    tipos: { pago: "Utbetalinger", "salario-minimo": "Minstelønn", impuestos: "Skatt", aportes: "Avgifter og pensjon", laboral: "Arbeidsregler", indices: "Satser og indekser" },
    pasa: (antes, despues) => `Endres fra ${antes} til ${despues}`,
    queda: (valor) => `Fastsatt til ${valor}`,
    cambian: "Satsene endres",
    zonas: (lista) => `I ${lista}`,
    limite: "Frist",
    agregar: "Legg til i kalenderen min",
    descargar: "Apple, Outlook og andre (.ics-fil)",
    google: "Google Kalender",
    calcular: "Regn ut",
    tambien: "Også i",
    fuente: (organismo, fecha) => `Kilde: ${organismo}. Sjekket ${fecha}.`,
    verificado: (fecha) => `Sjekket ${fecha}`,
    suscribir: {
      titulo: "Hele kalenderen, alltid oppdatert",
      texto: "Med et abonnement dukker nye datoer opp av seg selv i kalenderen på mobilen eller datamaskinen.",
      boton: "Abonner på kalenderen",
      copiar: "Kopier lenken",
      copiado: "Lenken er kopiert",
    },
    fuentes: {
      titulo: "Hvor hver dato kommer fra",
      texto: "Bare datoer som allerede står i en lov eller forskrift, eller i en verdi som myndigheten har publisert, kommer med. Det som ikke er publisert ennå, vises ikke.",
    },
    vacio: "Ingen datoer om dette temaet de neste tolv månedene.",
    destacado: {
      ceja: "Lønnskalender",
      titulo: "Datoene som påvirker lønnen i år",
      ir: "Se kalenderen",
      proxima: (titulo, fecha) => `Neste: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Lønns- og skattekalender ${gNb.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Lønns- og skattedatoer ${gNb.de(pais)}, med offisiell kilde.`,
      calculadora: "Kalkulator",
      fuente: "Kilde",
    },
    og: { proxima: "Neste dato", mas: (n) => (n === 1 ? "Og 1 dato til i år" : `Og ${n} datoer til i år`) },
  },
};

// ───────────────────────────── fi ─────────────────────────────

// Finés (ADR 0002, D9): sin segunda persona, como el resto del calendario. gFi.de da el genitivo que va
// delante del sustantivo («Suomen palkkakalenteri») y gFi.en el caso de lugar completo («Suomessa»).
const gFi = GRAMATICA.fi;
const fi: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Palkka- ja verokalenteri",
    seo: {
      titulo: (pais, anios) => [`${gFi.de(pais)} palkka- ja verokalenteri ${anios}: tärkeät päivät`, `${gFi.de(pais)} palkkakalenteri ${anios}`, `${gFi.de(pais)} palkkakalenteri`],
      descripcion: (pais, proximas) => `Päivät, jotka muuttavat palkkaa ${gFi.en(pais)}, virallisine lähteineen: ${proximas}. Jokaisella oma laskurinsa.`,
      descripcionSin: (pais) => `Päivät, jotka muuttavat palkkaa ${gFi.en(pais)}, virallisine lähteineen ja laskureineen. Lisää ne puhelimen kalenteriin.`,
    },
    ceja: (anios) => `Kalenteri ${anios}`,
    h1: (pais) => `${gFi.de(pais)} palkka- ja verokalenteri`,
    acento: "päivät, jotka vaikuttavat palkkaan",
    bajada: "Jokainen päivä tulee virallisesta lähteestä ja vie siihen liittyvään laskuriin. Sivu päivittyy itsestään, kun uusi arvo julkaistaan.",
    proxima: "Seuraava päivä",
    cuenta: {
      hoy: "Tänään",
      manana: "Huomenna",
      ayer: "Eilen",
      en: (n) => `${n} päivän päästä`,
      hace: (n) => (n === 1 ? "1 päivä sitten" : `${n} päivää sitten`),
      dias: (n) => (n === 1 ? "päivä" : "päivää"),
    },
    queViene: "Tulossa",
    yaRige: "Jo voimassa",
    mesPorMes: "Vuosi kuukausi kerrallaan",
    sinFechas: "Ei ilmoitettuja muutoksia",
    filtro: "Rajaa aiheen mukaan",
    todo: "Kaikki",
    tipos: { pago: "Maksut", "salario-minimo": "Minimipalkka", impuestos: "Verot", aportes: "Maksut ja eläkkeet", laboral: "Työelämän säännöt", indices: "Indeksit" },
    pasa: (antes, despues) => `Muuttuu: ${antes} → ${despues}`,
    queda: (valor) => `Uusi arvo: ${valor}`,
    cambian: "Arvot muuttuvat",
    zonas: (lista) => `Koskee: ${lista}`,
    limite: "Määräpäivä",
    agregar: "Lisää kalenteriini",
    descargar: "Apple, Outlook ja muut (.ics-tiedosto)",
    google: "Google-kalenteri",
    calcular: "Laske",
    tambien: "Myös täällä",
    fuente: (organismo, fecha) => `Lähde: ${organismo}. Tarkistettu ${fecha}.`,
    verificado: (fecha) => `Tarkistettu ${fecha}`,
    suscribir: {
      titulo: "Koko kalenteri, aina ajan tasalla",
      texto: "Tilauksen jälkeen uudet päivät ilmestyvät itsestään puhelimen tai tietokoneen kalenteriin.",
      boton: "Tilaa kalenteri",
      copiar: "Kopioi linkki",
      copiado: "Linkki kopioitu",
    },
    fuentes: {
      titulo: "Mistä päivät tulevat",
      texto: "Mukana on vain päiviä, jotka on jo kirjattu säädökseen tai viranomaisen julkaisemaan arvoon. Mitä ei ole vielä julkaistu, ei näy täällä.",
    },
    vacio: "Tästä aiheesta ei ole päiviä seuraavan kahdentoista kuukauden aikana.",
    destacado: {
      ceja: "Palkkakalenteri",
      titulo: "Tämän vuoden päivät, jotka vaikuttavat palkkaan",
      ir: "Katso kalenteri",
      proxima: (titulo, fecha) => `Seuraavaksi: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${gFi.de(pais)} palkkakalenteri (CalcularYa)`,
      descripcion: (pais) => `${gFi.de(pais)} palkka- ja veropäivät virallisine lähteineen.`,
      calculadora: "Laskuri",
      fuente: "Lähde",
    },
    og: { proxima: "Seuraava päivämäärä", mas: (n) => (n === 1 ? "Ja vielä 1 päivämäärä tänä vuonna" : `Ja vielä ${n} päivämäärää tänä vuonna`) },
  },
};

// ───────────────────────────── ar ─────────────────────────────

// Árabe estándar moderno, impersonal como el resto del calendario (ADR 0002, D10). Los días van con
// pluralAr; detrás de «بعد» y «قبل» el dual va en genitivo (بعد يومين).
const gAr = GRAMATICA.ar;
const TRAS_DIAS_AR = { uno: "يوم واحد", dos: "يومين", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" };
const MAS_FECHAS_AR = { uno: "وموعد آخر", dos: "وموعدان آخران", pocos: "و{n} مواعيد أخرى", muchos: "و{n} موعدًا آخر", otros: "و{n} موعد آخر" };
const ar: Diccionario<TextosCalendario> = {
  base: {
    nombre: "تقويم الرواتب والضرائب",
    seo: {
      titulo: (pais, anios) => [`تقويم الرواتب والضرائب ${gAr.en(pais)} ${anios}: أهم المواعيد`, `تقويم الرواتب والضرائب ${gAr.en(pais)} ${anios}`, `تقويم الرواتب ${gAr.en(pais)}`],
      descripcion: (pais, proximas) => `المواعيد التي تغيّر الرواتب ${gAr.en(pais)}، من مصادر رسمية: ${proximas}. ولكل موعد حاسبته.`,
      descripcionSin: (pais) => `المواعيد التي تغيّر الرواتب ${gAr.en(pais)}، من مصادر رسمية، ولكل موعد حاسبته. أضفها إلى تقويم الهاتف.`,
    },
    ceja: (anios) => `تقويم ${anios}`,
    h1: (pais) => `تقويم الرواتب والضرائب ${gAr.en(pais)}`,
    acento: "المواعيد التي تحرّك الراتب",
    bajada: "كل موعد مأخوذ من مصدر رسمي ومرتبط بالحاسبة التي يؤثر فيها. وتتحدّث الصفحة وحدها عند نشر رقم جديد.",
    proxima: "الموعد القادم",
    cuenta: {
      hoy: "اليوم",
      manana: "غدًا",
      ayer: "أمس",
      en: (n) => `بعد ${pluralAr(n, TRAS_DIAS_AR)}`,
      hace: (n) => `قبل ${pluralAr(n, TRAS_DIAS_AR)}`,
      // La unidad debajo de la cifra grande: el número ya está a la vista, así que el 2 lleva el plural y no el dual.
      dias: (n) => formaAr(n, { uno: "يوم", dos: "أيام", pocos: "أيام", muchos: "يومًا", otros: "يوم" }),
    },
    queViene: "القادم",
    yaRige: "ساري المفعول",
    mesPorMes: "السنة شهرًا بشهر",
    sinFechas: "لا تغييرات معلنة",
    filtro: "التصفية حسب الموضوع",
    todo: "الكل",
    tipos: { pago: "المدفوعات", "salario-minimo": "الحد الأدنى للأجور", impuestos: "الضرائب", aportes: "الاشتراكات والمعاشات", laboral: "قواعد العمل", indices: "القيم المرجعية" },
    pasa: (antes, despues) => `من ${antes} إلى ${despues}`,
    queda: (valor) => `يُحدَّد عند ${valor}`,
    cambian: "تتغيّر الأرقام",
    zonas: (lista) => `في ${lista}`,
    limite: "آخر موعد",
    agregar: "إضافة إلى تقويمي",
    descargar: "Apple وOutlook وغيرها (ملف ics)",
    google: "تقويم Google",
    calcular: "احسب",
    tambien: "متاح أيضًا في",
    fuente: (organismo, fecha) => `المصدر: ${organismo}. تمت المراجعة في ${fecha}.`,
    verificado: (fecha) => `تمت المراجعة في ${fecha}`,
    suscribir: {
      titulo: "التقويم كاملًا ومحدّثًا دائمًا",
      texto: "اشتراك واحد يكفي، فتظهر المواعيد الجديدة وحدها في تقويم الهاتف أو الحاسوب.",
      boton: "الاشتراك في التقويم",
      copiar: "نسخ الرابط",
      copiado: "تم نسخ الرابط",
    },
    fuentes: {
      titulo: "مصدر كل موعد",
      texto: "لا يدخل إلا ما حدّدته قاعدة قانونية أو رقم نشرته الجهة الرسمية. وما لم يُنشر بعد لا يظهر.",
    },
    vacio: "لا مواعيد في هذا الموضوع خلال الأشهر الاثني عشر القادمة.",
    destacado: {
      ceja: "تقويم الرواتب",
      titulo: "المواعيد التي تحرّك الرواتب هذه السنة",
      ir: "عرض التقويم",
      proxima: (titulo, fecha) => `الموعد القادم: ${titulo}، ${fecha}`,
    },
    ics: {
      nombre: (pais) => `تقويم الرواتب والضرائب ${gAr.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `مواعيد الرواتب والضرائب ${gAr.en(pais)}، من مصادر رسمية.`,
      calculadora: "الحاسبة",
      fuente: "المصدر",
    },
    og: { proxima: "الموعد القادم", mas: (n) => `${pluralAr(n, MAS_FECHAS_AR)} هذه السنة` },
  },
};

// Indonesio (ADR 0002, D11): impersonal como los demás, frases cortas. El poseedor va detrás sin
// preposición (GRAMATICA.id: «Kalender gaji Indonesia») y tras un número no hay plural («3 hari»).
const gId = GRAMATICA.id;
const idn: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Kalender gaji dan pajak",
    seo: {
      titulo: (pais, anios) => [
        `Kalender gaji dan pajak ${gId.de(pais)} ${anios}: tanggal penting`,
        `Kalender gaji dan pajak ${gId.de(pais)} ${anios}`,
        `Kalender gaji ${gId.de(pais)}`,
      ],
      descripcion: (pais, proximas) => `Tanggal yang mengubah gaji ${gId.en(pais)}, dari sumber resmi: ${proximas}. Masing-masing dengan kalkulatornya.`,
      descripcionSin: (pais) => `Tanggal yang mengubah gaji ${gId.en(pais)}, dari sumber resmi dan dengan kalkulatornya. Siap ditambahkan ke kalender ponsel.`,
    },
    ceja: (anios) => `Kalender ${anios}`,
    h1: (pais) => `Kalender gaji dan pajak ${gId.de(pais)}`,
    acento: "tanggal yang memengaruhi gaji",
    bajada: "Setiap tanggal berasal dari sumber resmi dan tertaut ke kalkulator yang terkait. Halaman ini diperbarui sendiri saat ada angka baru yang diterbitkan.",
    proxima: "Tanggal berikutnya",
    cuenta: { hoy: "Hari ini", manana: "Besok", ayer: "Kemarin", en: (n) => `${n} hari lagi`, hace: (n) => `${n} hari lalu`, dias: () => "hari" },
    queViene: "Yang akan datang",
    yaRige: "Sudah berlaku",
    mesPorMes: "Sepanjang tahun, bulan demi bulan",
    sinFechas: "Belum ada perubahan yang diumumkan",
    filtro: "Saring menurut topik",
    todo: "Semua",
    tipos: { pago: "Pembayaran", "salario-minimo": "Upah minimum", impuestos: "Pajak", aportes: "Iuran dan pensiun", laboral: "Aturan ketenagakerjaan", indices: "Nilai acuan" },
    pasa: (antes, despues) => `Berubah dari ${antes} menjadi ${despues}`,
    queda: (valor) => `Ditetapkan sebesar ${valor}`,
    cambian: "Angkanya berubah",
    zonas: (lista) => `Berlaku di ${lista}`,
    limite: "Batas waktu",
    agregar: "Tambahkan ke kalender saya",
    descargar: "Apple, Outlook, dan lainnya (berkas .ics)",
    google: "Google Kalender",
    calcular: "Hitung",
    tambien: "Juga di",
    fuente: (organismo, fecha) => `Sumber: ${organismo}. Diperiksa pada ${fecha}.`,
    verificado: (fecha) => `Diperiksa pada ${fecha}`,
    suscribir: {
      titulo: "Seluruh kalender, selalu terbaru",
      texto: "Cukup berlangganan sekali, dan tanggal baru muncul sendiri di kalender ponsel atau komputer.",
      boton: "Berlangganan kalender",
      copiar: "Salin tautan",
      copiado: "Tautan disalin",
    },
    fuentes: {
      titulo: "Dari mana setiap tanggal berasal",
      texto: "Yang masuk hanya tanggal yang sudah ditetapkan dalam peraturan atau dalam angka yang diterbitkan instansi resmi. Yang belum diterbitkan tidak ditampilkan.",
    },
    vacio: "Tidak ada tanggal untuk topik ini dalam dua belas bulan ke depan.",
    destacado: {
      ceja: "Kalender gaji",
      titulo: "Tanggal yang memengaruhi gaji tahun ini",
      ir: "Lihat kalender",
      proxima: (titulo, fecha) => `Berikutnya: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Kalender gaji dan pajak ${gId.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `Tanggal gaji dan pajak ${gId.en(pais)}, dari sumber resmi.`,
      calculadora: "Kalkulator",
      fuente: "Sumber",
    },
    og: { proxima: "Tanggal berikutnya", mas: (n) => `Dan ${n} tanggal lain tahun ini` },
  },
};

// Turco (ADR 0002, D12): impersonal como los demás; el país lleva el sufijo con GRAMATICA.tr y nada se
// pega a cifras, fechas ni valores interpolados (van sueltos o tras dos puntos). Tras un número el
// sustantivo va en singular («3 gün»).
const gTr = GRAMATICA.tr;
const tr: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Maaş ve vergi takvimi",
    seo: {
      titulo: (pais, anios) => [
        `${gTr.de(pais)} ${anios} maaş ve vergi takvimi: önemli tarihler`,
        `${gTr.de(pais)} ${anios} maaş ve vergi takvimi`,
        `${gTr.de(pais)} maaş takvimi`,
      ],
      descripcion: (pais, proximas) => `${gTr.en(pais)} maaşı değiştiren tarihler, resmî kaynaklarıyla: ${proximas}. Her biri kendi hesaplama aracıyla.`,
      descripcionSin: (pais) => `${gTr.en(pais)} maaşı değiştiren tarihler, resmî kaynakları ve hesaplama araçlarıyla. Telefon takvimine eklemek için hazır.`,
    },
    ceja: (anios) => `Takvim: ${anios}`,
    h1: (pais) => `${gTr.de(pais)} maaş ve vergi takvimi`,
    acento: "maaşı etkileyen tarihler",
    bajada: "Her tarih resmî bir kaynaktan gelir ve ilgili hesaplama aracına götürür. Yeni bir değer yayımlandığında sayfa kendiliğinden güncellenir.",
    proxima: "Sıradaki tarih",
    cuenta: { hoy: "Bugün", manana: "Yarın", ayer: "Dün", en: (n) => `${n} gün sonra`, hace: (n) => `${n} gün önce`, dias: () => "gün" },
    queViene: "Yaklaşanlar",
    yaRige: "Yürürlükte olanlar",
    mesPorMes: "Ay ay bütün yıl",
    sinFechas: "Açıklanmış bir değişiklik yok",
    filtro: "Konuya göre süz",
    todo: "Tümü",
    tipos: { pago: "Ödemeler", "salario-minimo": "Asgari ücret", impuestos: "Vergiler", aportes: "Primler ve emeklilik", laboral: "Çalışma kuralları", indices: "Endeksler" },
    pasa: (antes, despues) => `Eski değer: ${antes}. Yeni değer: ${despues}`,
    queda: (valor) => `Belirlenen değer: ${valor}`,
    cambian: "Tutarlar değişiyor",
    zonas: (lista) => `Geçerli olduğu yerler: ${lista}`,
    limite: "Son gün",
    agregar: "Takvimime ekle",
    descargar: "Apple, Outlook ve diğerleri (.ics dosyası)",
    google: "Google Takvim",
    calcular: "Hesapla",
    tambien: "Şu hesaplama araçlarında da",
    fuente: (organismo, fecha) => `Kaynak: ${organismo}. Doğrulama tarihi: ${fecha}.`,
    verificado: (fecha) => `Doğrulama tarihi: ${fecha}`,
    suscribir: {
      titulo: "Bütün takvim, her zaman güncel",
      texto: "Abone olduğunuzda yeni tarihler telefonunuzun ya da bilgisayarınızın takviminde kendiliğinden görünür.",
      boton: "Takvime abone ol",
      copiar: "Bağlantıyı kopyala",
      copiado: "Bağlantı kopyalandı",
    },
    fuentes: {
      titulo: "Her tarih nereden geliyor",
      texto: "Yalnızca bir mevzuatta yer alan ya da resmî kurumun yayımladığı bir değere dayanan tarihler girer. Henüz yayımlanmamış bir şey burada görünmez.",
    },
    vacio: "Önümüzdeki on iki ayda bu konuda bir tarih yok.",
    destacado: {
      ceja: "Maaş takvimi",
      titulo: "Bu yıl maaşı etkileyen tarihler",
      ir: "Takvimi gör",
      proxima: (titulo, fecha) => `Sıradaki: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${gTr.de(pais)} maaş ve vergi takvimi (CalcularYa)`,
      descripcion: (pais) => `${gTr.de(pais)} maaş ve vergi tarihleri, resmî kaynaklarıyla.`,
      calculadora: "Hesaplama aracı",
      fuente: "Kaynak",
    },
    og: { proxima: "Sıradaki tarih", mas: (n) => `Bu yıl ${n} tarih daha var` },
  },
};

// Bengalí (ADR 0002, D14): «আপনি» con las formas corteses, dari «।» y dígitos bengalíes (cifrasBn
// para lo que llega como número). El bengalí no flexiona detrás de un número («৩ দিন»).
const gBn = GRAMATICA.bn;
const cBn = cifrasBn;
const bn: Diccionario<TextosCalendario> = {
  base: {
    nombre: "বেতন ও করের ক্যালেন্ডার",
    seo: {
      titulo: (pais, anios) => [`${gBn.de(pais)} বেতন ও করের ক্যালেন্ডার ${cBn(anios)}: জরুরি তারিখ`, `${gBn.de(pais)} বেতন ও করের ক্যালেন্ডার ${cBn(anios)}`, `${gBn.de(pais)} বেতন ক্যালেন্ডার`],
      descripcion: (pais, proximas) => `${gBn.en(pais)} বেতনে প্রভাব ফেলে এমন তারিখ, সরকারি সূত্র থেকে: ${cBn(proximas)}। প্রতিটির সঙ্গে তার ক্যালকুলেটর।`,
      descripcionSin: (pais) => `${gBn.en(pais)} বেতনে প্রভাব ফেলে এমন তারিখ, সরকারি সূত্র থেকে, প্রতিটির সঙ্গে তার ক্যালকুলেটর। ফোনের ক্যালেন্ডারে যোগ করে নিন।`,
    },
    ceja: (anios) => `${cBn(anios)} সালের ক্যালেন্ডার`,
    h1: (pais) => `${gBn.de(pais)} বেতন ও করের ক্যালেন্ডার`,
    acento: "যে তারিখগুলো আপনার বেতন বদলায়",
    bajada: "প্রতিটি তারিখ সরকারি সূত্র থেকে নেওয়া, আর যে ক্যালকুলেটরে তার প্রভাব পড়ে সেটির সঙ্গে যুক্ত। নতুন মান প্রকাশ হলে পাতাটি নিজেই হালনাগাদ হয়।",
    proxima: "পরের তারিখ",
    cuenta: { hoy: "আজ", manana: "আগামীকাল", ayer: "গতকাল", en: (n) => `${cBn(n)} দিন পর`, hace: (n) => `${cBn(n)} দিন আগে`, dias: () => "দিন" },
    queViene: "সামনে যা আছে",
    yaRige: "এখন চালু আছে",
    mesPorMes: "মাসে মাসে পুরো বছর",
    sinFechas: "কোনো পরিবর্তনের ঘোষণা নেই",
    filtro: "বিষয় অনুযায়ী বাছাই",
    todo: "সব",
    tipos: { pago: "পরিশোধ", "salario-minimo": "ন্যূনতম মজুরি", impuestos: "কর", aportes: "চাঁদা ও পেনশন", laboral: "শ্রমের নিয়ম", indices: "হিসাবের সূচক" },
    pasa: (antes, despues) => `আগে: ${cBn(antes)}। এখন: ${cBn(despues)}`,
    queda: (valor) => `নতুন মান: ${cBn(valor)}`,
    cambian: "অঙ্ক বদলায়",
    zonas: (lista) => `যে এলাকায় প্রযোজ্য: ${lista}`,
    limite: "শেষ তারিখ",
    agregar: "আমার ক্যালেন্ডারে যোগ করুন",
    descargar: "Apple, Outlook ও অন্যান্য (.ics ফাইল)",
    google: "Google ক্যালেন্ডার",
    calcular: "হিসাব করুন",
    tambien: "আরও দেখুন",
    fuente: (organismo, fecha) => `সূত্র: ${organismo}। যাচাই ${cBn(fecha)} তারিখে।`,
    verificado: (fecha) => `যাচাই ${cBn(fecha)} তারিখে`,
    suscribir: {
      titulo: "পুরো ক্যালেন্ডার, সব সময় হালনাগাদ",
      texto: "একবার সাবস্ক্রাইব করলে নতুন তারিখগুলো ফোন বা কম্পিউটারের ক্যালেন্ডারে নিজে থেকেই চলে আসবে।",
      boton: "ক্যালেন্ডারে সাবস্ক্রাইব করুন",
      copiar: "লিংক কপি করুন",
      copiado: "লিংক কপি হয়েছে",
    },
    fuentes: {
      titulo: "প্রতিটি তারিখ কোথা থেকে আসে",
      texto: "শুধু সেই তারিখগুলো থাকে, যার মান আইনে ঠিক করা বা কোনো সরকারি দপ্তর প্রকাশ করেছে। যা এখনো প্রকাশ হয়নি, তা দেখানো হয় না।",
    },
    vacio: "আগামী বারো মাসে এই বিষয়ে কোনো তারিখ নেই।",
    destacado: {
      ceja: "বেতন ক্যালেন্ডার",
      titulo: "এ বছর যে তারিখগুলো আপনার বেতনে প্রভাব ফেলে",
      ir: "ক্যালেন্ডার দেখুন",
      proxima: (titulo, fecha) => `পরেরটি: ${titulo}, ${cBn(fecha)}`,
    },
    ics: {
      nombre: (pais) => `${gBn.de(pais)} বেতন ও করের ক্যালেন্ডার (CalcularYa)`,
      descripcion: (pais) => `${gBn.en(pais)} বেতন ও করের তারিখ, সরকারি সূত্র থেকে।`,
      calculadora: "ক্যালকুলেটর",
      fuente: "সূত্র",
    },
    og: { proxima: "পরের তারিখ", mas: (n) => `এ বছর আরও ${cBn(n)}টি তারিখ আছে` },
  },
};

// Tailandés (ADR 0002, D13): sin pronombre ni ครับ/ค่ะ, sin punto final. `anios` llega en gregoriano
// («2026» o «2026-2027») y se escribe en พ.ศ., como las fechas que formatea Intl con th.
const gTh = GRAMATICA.th;
const aniosBe = (anios: string) => anios.replace(/\d{4}/g, (a) => String(Number(a) + 543));
const th: Diccionario<TextosCalendario> = {
  base: {
    nombre: "ปฏิทินเงินเดือนและภาษี",
    seo: {
      titulo: (pais, anios) => [
        `ปฏิทินเงินเดือนและภาษี${gTh.de(pais)} พ.ศ. ${aniosBe(anios)} วันสำคัญ`,
        `ปฏิทินเงินเดือนและภาษี${gTh.de(pais)} พ.ศ. ${aniosBe(anios)}`,
        `ปฏิทินเงินเดือน${gTh.de(pais)}`,
      ],
      descripcion: (pais, proximas) => `วันที่ทำให้เงินเดือน${gTh.en(pais)}เปลี่ยน จากแหล่งทางการ: ${proximas} แต่ละวันเชื่อมกับเครื่องคำนวณที่เกี่ยวข้อง`,
      descripcionSin: (pais) => `วันที่ทำให้เงินเดือน${gTh.en(pais)}เปลี่ยน จากแหล่งทางการ พร้อมเครื่องคำนวณของแต่ละวัน และเพิ่มลงในปฏิทินบนมือถือได้`,
    },
    ceja: (anios) => `ปฏิทิน พ.ศ. ${aniosBe(anios)}`,
    h1: (pais) => `ปฏิทินเงินเดือนและภาษี${gTh.para(pais)}`,
    acento: "วันที่เงินเดือนเปลี่ยน",
    bajada: "ทุกวันที่มาจากแหล่งทางการและเชื่อมกับเครื่องคำนวณที่ได้รับผล หน้านี้อัปเดตเองเมื่อมีการประกาศตัวเลขใหม่",
    proxima: "วันถัดไป",
    cuenta: { hoy: "วันนี้", manana: "พรุ่งนี้", ayer: "เมื่อวาน", en: (n) => `อีก ${n} วัน`, hace: (n) => `${n} วันที่แล้ว`, dias: () => "วัน" },
    queViene: "ที่กำลังจะมาถึง",
    yaRige: "มีผลแล้ว",
    mesPorMes: "ทั้งปีแยกรายเดือน",
    sinFechas: "ยังไม่มีการประกาศการเปลี่ยนแปลง",
    filtro: "กรองตามหัวข้อ",
    todo: "ทั้งหมด",
    tipos: { pago: "การจ่ายเงิน", "salario-minimo": "ค่าจ้างขั้นต่ำ", impuestos: "ภาษี", aportes: "เงินสมทบและบำนาญ", laboral: "กฎการจ้างงาน", indices: "ค่าอ้างอิง" },
    pasa: (antes, despues) => `เปลี่ยนจาก ${antes} เป็น ${despues}`,
    queda: (valor) => `กำหนดไว้ที่ ${valor}`,
    cambian: "ตัวเลขเปลี่ยน",
    zonas: (lista) => `ใน${lista}`,
    limite: "วันครบกำหนด",
    agregar: "เพิ่มลงในปฏิทิน",
    descargar: "Apple, Outlook และอื่น ๆ (ไฟล์ .ics)",
    google: "Google ปฏิทิน",
    calcular: "คำนวณ",
    tambien: "ที่เกี่ยวข้อง",
    fuente: (organismo, fecha) => `แหล่งที่มา: ${organismo} ตรวจสอบเมื่อ ${fecha}`,
    verificado: (fecha) => `ตรวจสอบเมื่อ ${fecha}`,
    suscribir: {
      titulo: "ปฏิทินทั้งหมด อัปเดตอยู่เสมอ",
      texto: "สมัครรับเพียงครั้งเดียว วันที่ใหม่จะปรากฏในปฏิทินบนมือถือหรือคอมพิวเตอร์เอง",
      boton: "สมัครรับปฏิทิน",
      copiar: "คัดลอกลิงก์",
      copiado: "คัดลอกลิงก์แล้ว",
    },
    fuentes: {
      titulo: "วันที่แต่ละวันมาจากไหน",
      texto: "แสดงเฉพาะวันที่ที่กำหนดไว้ในกฎหมายหรือในตัวเลขที่หน่วยงานทางการประกาศแล้ว สิ่งที่ยังไม่ประกาศจะไม่แสดง",
    },
    vacio: "ไม่มีวันที่ในหัวข้อนี้ในอีกสิบสองเดือนข้างหน้า",
    destacado: {
      ceja: "ปฏิทินเงินเดือน",
      titulo: "วันที่เงินเดือนเปลี่ยนในปีนี้",
      ir: "ดูปฏิทิน",
      proxima: (titulo, fecha) => `ถัดไป: ${titulo} ${fecha}`,
    },
    ics: {
      nombre: (pais) => `ปฏิทินเงินเดือนและภาษี${gTh.de(pais)} (CalcularYa)`,
      descripcion: (pais) => `วันที่เกี่ยวกับเงินเดือนและภาษี${gTh.en(pais)} จากแหล่งทางการ`,
      calculadora: "เครื่องคำนวณ",
      fuente: "แหล่งที่มา",
    },
    og: { proxima: "วันถัดไป", mas: (n) => `และอีก ${n} วันในปีนี้` },
  },
};

// Ucraniano (ADR 0002, D15): impersonal como los demás; el país se declina con GRAMATICA.uk y los
// días con formaUk/pluralUk (one/few/many).
const gUk = GRAMATICA.uk;
const uk: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Календар зарплати і податків",
    seo: {
      titulo: (pais, anios) => [
        `Календар зарплати і податків ${gUk.para(pais)} ${anios}: ключові дати`,
        `Календар зарплати і податків ${gUk.para(pais)} ${anios}`,
        `Календар виплат ${gUk.para(pais)}`,
      ],
      descripcion: (pais, proximas) => `Дати, які змінюють зарплату ${gUk.en(pais)}, з офіційних джерел: ${proximas}. До кожної є свій калькулятор.`,
      descripcionSin: (pais) => `Дати, які змінюють зарплату ${gUk.en(pais)}, з офіційних джерел і з калькулятором до кожної. Додайте їх у календар телефона.`,
    },
    ceja: (anios) => `Календар на ${anios}`,
    h1: (pais) => `Календар зарплати і податків ${gUk.para(pais)}`,
    acento: "дати, від яких залежить зарплата",
    bajada: "Кожна дата взята з офіційного джерела і веде до калькулятора, на який вона впливає. Сторінка оновлюється сама, коли публікують нове значення.",
    proxima: "Найближча дата",
    cuenta: {
      hoy: "Сьогодні",
      manana: "Завтра",
      ayer: "Учора",
      en: (n) => `Через ${pluralUk(n, "день", "дні", "днів")}`,
      hace: (n) => `${pluralUk(n, "день", "дні", "днів")} тому`,
      dias: (n) => formaUk(n, "день", "дні", "днів"),
    },
    queViene: "Незабаром",
    yaRige: "Уже діє",
    mesPorMes: "Рік по місяцях",
    sinFechas: "Змін не оголошено",
    filtro: "Фільтр за темою",
    todo: "Усе",
    tipos: { pago: "Виплати", "salario-minimo": "Мінімальна зарплата", impuestos: "Податки", aportes: "Внески і пенсії", laboral: "Трудові правила", indices: "Довідкові значення" },
    pasa: (antes, despues) => `Змінюється з ${antes} на ${despues}`,
    queda: (valor) => `Встановлено: ${valor}`,
    cambian: "Суми змінюються",
    zonas: (lista) => `Регіони: ${lista}`,
    limite: "Кінцевий строк",
    agregar: "Додати в мій календар",
    descargar: "Apple, Outlook та інші (файл .ics)",
    google: "Google Календар",
    calcular: "Розрахувати",
    tambien: "Також у калькуляторах",
    fuente: (organismo, fecha) => `Джерело: ${organismo}. Перевірено ${fecha}.`,
    verificado: (fecha) => `Перевірено ${fecha}`,
    suscribir: {
      titulo: "Увесь календар, завжди актуальний",
      texto: "Підпишіться один раз, і нові дати самі зʼявлятимуться в календарі на телефоні чи компʼютері.",
      boton: "Підписатися на календар",
      copiar: "Скопіювати посилання",
      copiado: "Посилання скопійовано",
    },
    fuentes: {
      titulo: "Звідки береться кожна дата",
      texto: "Сюди потрапляють лише дати, уже встановлені нормативним актом або значенням, яке опублікувала офіційна установа. Якщо чогось ще не опубліковано, його тут немає.",
    },
    vacio: "Найближчі дванадцять місяців дат на цю тему немає.",
    destacado: {
      ceja: "Календар виплат",
      titulo: "Дати, від яких залежить зарплата цього року",
      ir: "Переглянути календар",
      proxima: (titulo, fecha) => `Найближча: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Календар зарплати і податків ${gUk.para(pais)} (CalcularYa)`,
      descripcion: (pais) => `Дати виплат і податків ${gUk.en(pais)} з офіційних джерел.`,
      calculadora: "Калькулятор",
      fuente: "Джерело",
    },
    og: { proxima: "Найближча дата", mas: (n) => `І ще ${pluralUk(n, "дата", "дати", "дат")} цього року` },
  },
};

// Uzbeko (ADR 0002, D16): impersonal como los demás. Los sufijos de caso nunca van pegados a una cifra
// ni a un valor interpolado: el número va con su sustantivo suelto («${n} kun», «${anios} yil»).
const gUz = GRAMATICA.uz;
const uz: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Ish haqi va soliqlar taqvimi",
    seo: {
      titulo: (pais, anios) => [`${gUz.de(pais)} ish haqi va soliqlar taqvimi ${anios}: muhim sanalar`, `${gUz.de(pais)} ish haqi va soliqlar taqvimi ${anios}`, `${gUz.de(pais)} ish haqi taqvimi`],
      descripcion: (pais, proximas) => `${gUz.en(pais)} ish haqiga taʼsir qiladigan sanalar, rasmiy manbalardan: ${proximas}. Har biri oʻz kalkulyatori bilan.`,
      descripcionSin: (pais) => `${gUz.en(pais)} ish haqiga taʼsir qiladigan sanalar, rasmiy manbalardan va har biri oʻz kalkulyatori bilan. Ularni telefon taqvimiga qoʻshish mumkin.`,
    },
    ceja: (anios) => `${anios} yil taqvimi`,
    h1: (pais) => `${gUz.de(pais)} ish haqi va soliqlar taqvimi`,
    acento: "maoshga taʼsir qiladigan sanalar",
    bajada: "Har bir sana rasmiy manbadan olingan va u taʼsir qiladigan kalkulyatorga bogʻlangan. Yangi qiymat eʼlon qilinsa, sahifa oʻzi yangilanadi.",
    proxima: "Navbatdagi sana",
    cuenta: { hoy: "Bugun", manana: "Ertaga", ayer: "Kecha", en: (n) => `${n} kundan keyin`, hace: (n) => `${n} kun oldin`, dias: () => "kun" },
    queViene: "Oldinda",
    yaRige: "Allaqachon amalda",
    mesPorMes: "Yil, oyma-oy",
    sinFechas: "Eʼlon qilingan oʻzgarishlar yoʻq",
    filtro: "Mavzu boʻyicha saralash",
    todo: "Hammasi",
    tipos: { pago: "Toʻlovlar", "salario-minimo": "Eng kam ish haqi", impuestos: "Soliqlar", aportes: "Badallar va pensiyalar", laboral: "Mehnat qoidalari", indices: "Hisob koʻrsatkichlari" },
    pasa: (antes, despues) => `Oldin: ${antes}. Endi: ${despues}`,
    queda: (valor) => `Yangi qiymat: ${valor}`,
    cambian: "Summalar oʻzgaradi",
    zonas: (lista) => `Amal qiladigan hudud: ${lista}`,
    limite: "Soʻnggi muddat",
    agregar: "Taqvimimga qoʻshish",
    descargar: "Apple, Outlook va boshqalar (.ics fayl)",
    google: "Google Taqvim",
    calcular: "Hisoblash",
    tambien: "Shuningdek",
    fuente: (organismo, fecha) => `Manba: ${organismo}. Tekshirilgan sana: ${fecha}.`,
    verificado: (fecha) => `Tekshirilgan sana: ${fecha}`,
    suscribir: {
      titulo: "Butun taqvim, doim yangilangan holda",
      texto: "Bir marta obuna boʻlinsa, yangi sanalar telefon yoki kompyuterdagi taqvimda oʻzi paydo boʻladi.",
      boton: "Taqvimga obuna boʻlish",
      copiar: "Havolani nusxalash",
      copiado: "Havola nusxalandi",
    },
    fuentes: {
      titulo: "Har bir sana qayerdan olinadi",
      texto: "Faqat qonunda belgilangan yoki rasmiy idora eʼlon qilgan qiymatga asoslangan sanalar kiritiladi. Hali eʼlon qilinmagan narsa koʻrsatilmaydi.",
    },
    vacio: "Keyingi oʻn ikki oyda bu mavzu boʻyicha sanalar yoʻq.",
    destacado: {
      ceja: "Ish haqi taqvimi",
      titulo: "Bu yil maoshga taʼsir qiladigan sanalar",
      ir: "Taqvimni koʻrish",
      proxima: (titulo, fecha) => `Navbatdagisi: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${gUz.de(pais)} ish haqi va soliqlar taqvimi (CalcularYa)`,
      descripcion: (pais) => `${gUz.en(pais)} ish haqi va soliqlarga oid sanalar, rasmiy manbalardan.`,
      calculadora: "Kalkulyator",
      fuente: "Manba",
    },
    og: { proxima: "Navbatdagi sana", mas: (n) => `Bu yil yana ${n} ta sana bor` },
  },
};

// Ruso (ADR 0002, D17): impersonal como los demás; el país se declina con GRAMATICA.ru y los días
// con formaRu/pluralRu (one/few/many).
const gRu = GRAMATICA.ru;
const ru: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Календарь зарплаты и налогов",
    seo: {
      titulo: (pais, anios) => [
        `Календарь зарплаты и налогов ${gRu.para(pais)} ${anios}: ключевые даты`,
        `Календарь зарплаты и налогов ${gRu.para(pais)} ${anios}`,
        `Календарь выплат ${gRu.para(pais)}`,
      ],
      descripcion: (pais, proximas) => `Даты, которые меняют зарплату ${gRu.en(pais)}, из официальных источников: ${proximas}. У каждой есть свой калькулятор.`,
      descripcionSin: (pais) => `Даты, которые меняют зарплату ${gRu.en(pais)}, из официальных источников и с калькулятором для каждой. Добавьте их в календарь телефона.`,
    },
    ceja: (anios) => `Календарь на ${anios}`,
    h1: (pais) => `Календарь зарплаты и налогов ${gRu.para(pais)}`,
    acento: "даты, от которых зависит зарплата",
    bajada: "Каждая дата взята из официального источника и ведет к калькулятору, на который она влияет. Страница обновляется сама, когда публикуют новое значение.",
    proxima: "Ближайшая дата",
    cuenta: {
      hoy: "Сегодня",
      manana: "Завтра",
      ayer: "Вчера",
      en: (n) => `Через ${pluralRu(n, "день", "дня", "дней")}`,
      hace: (n) => `${pluralRu(n, "день", "дня", "дней")} назад`,
      dias: (n) => formaRu(n, "день", "дня", "дней"),
    },
    queViene: "Скоро",
    yaRige: "Уже действует",
    mesPorMes: "Год по месяцам",
    sinFechas: "Изменений не объявлено",
    filtro: "Фильтр по теме",
    todo: "Все",
    tipos: { pago: "Выплаты", "salario-minimo": "Минимальная зарплата", impuestos: "Налоги", aportes: "Взносы и пенсии", laboral: "Трудовые правила", indices: "Справочные значения" },
    pasa: (antes, despues) => `Меняется с ${antes} на ${despues}`,
    queda: (valor) => `Установлено: ${valor}`,
    cambian: "Суммы меняются",
    zonas: (lista) => `Регионы: ${lista}`,
    limite: "Крайний срок",
    agregar: "Добавить в мой календарь",
    descargar: "Apple, Outlook и другие (файл .ics)",
    google: "Google Календарь",
    calcular: "Рассчитать",
    tambien: "Также в калькуляторах",
    fuente: (organismo, fecha) => `Источник: ${organismo}. Проверено ${fecha}.`,
    verificado: (fecha) => `Проверено ${fecha}`,
    suscribir: {
      titulo: "Весь календарь, всегда актуальный",
      texto: "Подпишитесь один раз, и новые даты сами будут появляться в календаре на телефоне или компьютере.",
      boton: "Подписаться на календарь",
      copiar: "Скопировать ссылку",
      copiado: "Ссылка скопирована",
    },
    fuentes: {
      titulo: "Откуда берется каждая дата",
      texto: "Сюда попадают только даты, уже установленные нормативным актом или значением, которое опубликовало официальное ведомство. Если что-то еще не опубликовано, этого здесь нет.",
    },
    vacio: "В ближайшие двенадцать месяцев дат по этой теме нет.",
    destacado: {
      ceja: "Календарь выплат",
      titulo: "Даты, от которых зависит зарплата в этом году",
      ir: "Посмотреть календарь",
      proxima: (titulo, fecha) => `Ближайшая: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Календарь зарплаты и налогов ${gRu.para(pais)} (CalcularYa)`,
      descripcion: (pais) => `Даты выплат и налогов ${gRu.en(pais)} из официальных источников.`,
      calculadora: "Калькулятор",
      fuente: "Источник",
    },
    og: { proxima: "Ближайшая дата", mas: (n) => `И еще ${pluralRu(n, "дата", "даты", "дат")} в этом году` },
  },
};

// Rumano (ADR 0002, D18): impersonal como los demás; el país va con «pentru» o «în» (GRAMATICA.ro),
// que no cambian con la terminación del nombre, y los días con pluralRo («3 zile», «20 de zile»).
const gRo = GRAMATICA.ro;
const zileRo = (n: number) => pluralRo(n, "zi", "zile");
const ro: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Calendar salarial și fiscal",
    seo: {
      titulo: (pais, anios) => [
        `Calendar salarial și fiscal ${anios} ${gRo.para(pais)}: date-cheie`,
        `Calendar salarial și fiscal ${anios} ${gRo.para(pais)}`,
        `Calendar salarial ${gRo.para(pais)}`,
      ],
      descripcion: (pais, proximas) => `Datele care schimbă salariul ${gRo.en(pais)}, din surse oficiale: ${proximas}. Fiecare are calculatorul ei.`,
      descripcionSin: (pais) => `Datele care schimbă salariul ${gRo.en(pais)}, din surse oficiale și cu calculatorul potrivit. Se pot adăuga în calendarul telefonului.`,
    },
    ceja: (anios) => `Calendarul ${anios}`,
    h1: (pais) => `Calendar salarial și fiscal ${gRo.para(pais)}`,
    acento: "datele de care depinde salariul",
    bajada: "Fiecare dată vine dintr-o sursă oficială și duce la calculatorul pe care îl influențează. Pagina se actualizează singură când se publică o valoare nouă.",
    proxima: "Următoarea dată",
    cuenta: {
      hoy: "Astăzi",
      manana: "Mâine",
      ayer: "Ieri",
      en: (n) => `Peste ${zileRo(n)}`,
      hace: (n) => `Acum ${zileRo(n)}`,
      dias: (n) => (Number(n) === 1 ? "zi" : "zile"),
    },
    queViene: "Ce urmează",
    yaRige: "Ce se aplică deja",
    mesPorMes: "Anul lună cu lună",
    sinFechas: "Nu s-au anunțat schimbări",
    filtro: "Filtrare după temă",
    todo: "Toate",
    tipos: { pago: "Plăți", "salario-minimo": "Salariul minim", impuestos: "Impozite", aportes: "Contribuții și pensii", laboral: "Reguli de muncă", indices: "Valori de referință" },
    pasa: (antes, despues) => `Se schimbă de la ${antes} la ${despues}`,
    queda: (valor) => `Rămâne la ${valor}`,
    cambian: "Valorile se schimbă",
    zonas: (lista) => `Regiuni: ${lista}`,
    limite: "Termen limită",
    agregar: "Adăugați în calendarul meu",
    descargar: "Apple, Outlook și altele (fișier .ics)",
    google: "Google Calendar",
    calcular: "Calculați",
    tambien: "Și în calculatoarele",
    fuente: (organismo, fecha) => `Sursa: ${organismo}. Verificat la ${fecha}.`,
    verificado: (fecha) => `Verificat la ${fecha}`,
    suscribir: {
      titulo: "Tot calendarul, mereu la zi",
      texto: "Cu abonamentul, datele noi apar singure în calendarul de pe telefon sau de pe calculator.",
      boton: "Abonați-vă la calendar",
      copiar: "Copiați linkul",
      copiado: "Linkul a fost copiat",
    },
    fuentes: {
      titulo: "De unde vine fiecare dată",
      texto: "Aici intră doar datele stabilite deja printr-un act normativ sau printr-o valoare publicată de instituția oficială. Ce nu s-a publicat încă nu apare.",
    },
    vacio: "Pentru această temă nu există date în următoarele douăsprezece luni.",
    destacado: {
      ceja: "Calendar salarial",
      titulo: "Datele de care depinde salariul anul acesta",
      ir: "Vedeți calendarul",
      proxima: (titulo, fecha) => `Următoarea: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Calendar salarial și fiscal ${gRo.para(pais)} (CalcularYa)`,
      descripcion: (pais) => `Datele salariale și fiscale ${gRo.en(pais)}, din surse oficiale.`,
      calculadora: "Calculator",
      fuente: "Sursa",
    },
    og: { proxima: "Următoarea dată", mas: (n) => `Și încă ${pluralRo(n, "dată", "date")} anul acesta` },
  },
};

// Checo (ADR 0002, D19): impersonal como los demás; el país se declina con GRAMATICA.cs («v Česku»)
// y los días con formaCs/pluralCs (one/few/other; «před 5 dny» va en instrumental).
const gCs = GRAMATICA.cs;
const cs: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Výplatní a daňový kalendář",
    seo: {
      titulo: (pais, anios) => [
        `Výplatní a daňový kalendář ${anios} ${gCs.en(pais)}: důležitá data`,
        `Výplatní a daňový kalendář ${anios} ${gCs.en(pais)}`,
        `Výplatní kalendář ${gCs.en(pais)}`,
      ],
      descripcion: (pais, proximas) => `Data, která mění mzdu ${gCs.en(pais)}, z oficiálních zdrojů: ${proximas}. Ke každému je kalkulačka.`,
      descripcionSin: (pais) => `Data, která mění mzdu ${gCs.en(pais)}, z oficiálních zdrojů a ke každému kalkulačka. Přidejte si je do kalendáře v telefonu.`,
    },
    ceja: (anios) => `Kalendář na rok ${anios}`,
    h1: (pais) => `Výplatní a daňový kalendář ${gCs.en(pais)}`,
    acento: "data, na kterých závisí mzda",
    bajada: "Každé datum pochází z oficiálního zdroje a vede ke kalkulačce, kterou ovlivňuje. Stránka se aktualizuje sama, jakmile se zveřejní nová hodnota.",
    proxima: "Nejbližší datum",
    cuenta: {
      hoy: "Dnes",
      manana: "Zítra",
      ayer: "Včera",
      en: (n) => `Za ${pluralCs(n, "den", "dny", "dní")}`,
      hace: (n) => `Před ${pluralCs(n, "dnem", "dny", "dny")}`,
      dias: (n) => formaCs(n, "den", "dny", "dní"),
    },
    queViene: "Brzy",
    yaRige: "Už platí",
    mesPorMes: "Rok po měsících",
    sinFechas: "Žádné změny nebyly oznámeny",
    filtro: "Filtrovat podle tématu",
    todo: "Vše",
    tipos: { pago: "Výplaty", "salario-minimo": "Minimální mzda", impuestos: "Daně", aportes: "Pojistné a důchody", laboral: "Pracovní pravidla", indices: "Referenční hodnoty" },
    pasa: (antes, despues) => `Mění se z ${antes} na ${despues}`,
    queda: (valor) => `Platí: ${valor}`,
    cambian: "Částky se mění",
    zonas: (lista) => `Regiony: ${lista}`,
    limite: "Poslední termín",
    agregar: "Přidat do mého kalendáře",
    descargar: "Apple, Outlook a další (soubor .ics)",
    google: "Kalendář Google",
    calcular: "Spočítat",
    tambien: "Také v kalkulačkách",
    fuente: (organismo, fecha) => `Zdroj: ${organismo}. Ověřeno ${fecha}.`,
    verificado: (fecha) => `Ověřeno ${fecha}`,
    suscribir: {
      titulo: "Celý kalendář, vždy aktuální",
      texto: "Přihlaste se k odběru jednou a nová data se vám sama objeví v kalendáři v telefonu nebo počítači.",
      boton: "Odebírat kalendář",
      copiar: "Zkopírovat odkaz",
      copiado: "Odkaz zkopírován",
    },
    fuentes: {
      titulo: "Odkud se bere každé datum",
      texto: "Patří sem jen data, která už stanovil právní předpis nebo hodnota zveřejněná oficiálním úřadem. Co ještě není zveřejněné, tady není.",
    },
    vacio: "V příštích dvanácti měsících k tomuto tématu žádná data nejsou.",
    destacado: {
      ceja: "Výplatní kalendář",
      titulo: "Data, na kterých letos závisí mzda",
      ir: "Zobrazit kalendář",
      proxima: (titulo, fecha) => `Nejbližší: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Výplatní a daňový kalendář ${gCs.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Výplatní a daňové termíny ${gCs.en(pais)} z oficiálních zdrojů.`,
      calculadora: "Kalkulačka",
      fuente: "Zdroj",
    },
    og: { proxima: "Nejbližší datum", mas: (n) => `A ještě ${pluralCs(n, "další termín", "další termíny", "dalších termínů")} letos` },
  },
};

// Griego (ADR 0002, D20): impersonal como los demás; el país con GRAMATICA.el («στην Ελλάδα», «για
// την Κύπρο») y los días con formaEl/pluralEl (one/other). «Ημερολόγιο μισθοδοσίας» es como se
// busca; «φορολογίας» suma las fechas de impuestos y aportes.
const gEl = GRAMATICA.el;
const el: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Ημερολόγιο μισθοδοσίας και φορολογίας",
    seo: {
      titulo: (pais, anios) => [
        `Ημερολόγιο μισθοδοσίας και φορολογίας ${anios} ${gEl.en(pais)}: βασικές ημερομηνίες`,
        `Ημερολόγιο μισθοδοσίας και φορολογίας ${anios} ${gEl.en(pais)}`,
        `Ημερολόγιο μισθοδοσίας ${gEl.en(pais)}`,
      ],
      descripcion: (pais, proximas) => `Οι ημερομηνίες που αλλάζουν τον μισθό ${gEl.en(pais)}, από επίσημες πηγές: ${proximas}. Η καθεμία με τον υπολογισμό της.`,
      descripcionSin: (pais) => `Οι ημερομηνίες που αλλάζουν τον μισθό ${gEl.en(pais)}, από επίσημες πηγές, η καθεμία με τον υπολογισμό της. Προσθέστε τες στο ημερολόγιο του κινητού σας.`,
    },
    ceja: (anios) => `Ημερολόγιο ${anios}`,
    h1: (pais) => `Ημερολόγιο μισθοδοσίας και φορολογίας ${gEl.en(pais)}`,
    acento: "οι ημερομηνίες που αλλάζουν τον μισθό",
    bajada: "Κάθε ημερομηνία προέρχεται από επίσημη πηγή και οδηγεί στον υπολογισμό που επηρεάζει. Η σελίδα ενημερώνεται μόνη της μόλις δημοσιευτεί νέα τιμή.",
    proxima: "Επόμενη ημερομηνία",
    cuenta: {
      hoy: "Σήμερα",
      manana: "Αύριο",
      ayer: "Χθες",
      en: (n) => `Σε ${pluralEl(n, "ημέρα", "ημέρες")}`,
      hace: (n) => `Πριν από ${pluralEl(n, "ημέρα", "ημέρες")}`,
      dias: (n) => formaEl(n, "ημέρα", "ημέρες"),
    },
    queViene: "Έρχεται",
    yaRige: "Ισχύει ήδη",
    mesPorMes: "Το έτος μήνα προς μήνα",
    sinFechas: "Δεν έχουν ανακοινωθεί αλλαγές",
    filtro: "Φιλτράρισμα ανά θέμα",
    todo: "Όλα",
    tipos: { pago: "Πληρωμές", "salario-minimo": "Κατώτατος μισθός", impuestos: "Φόροι", aportes: "Εισφορές και συντάξεις", laboral: "Εργασιακοί κανόνες", indices: "Τιμές αναφοράς" },
    pasa: (antes, despues) => `Από ${antes} σε ${despues}`,
    queda: (valor) => `Ορίζεται σε ${valor}`,
    cambian: "Αλλάζουν τα ποσά",
    zonas: (lista) => `Περιοχές: ${lista}`,
    limite: "Προθεσμία",
    agregar: "Προσθήκη στο ημερολόγιό μου",
    descargar: "Apple, Outlook και άλλα (αρχείο .ics)",
    google: "Ημερολόγιο Google",
    calcular: "Υπολογισμός",
    tambien: "Και στους υπολογισμούς",
    fuente: (organismo, fecha) => `Πηγή: ${organismo}. Επαλήθευση: ${fecha}.`,
    verificado: (fecha) => `Επαλήθευση: ${fecha}`,
    suscribir: {
      titulo: "Όλο το ημερολόγιο, πάντα ενημερωμένο",
      texto: "Εγγραφείτε μία φορά και οι νέες ημερομηνίες θα εμφανίζονται μόνες τους στο ημερολόγιο του κινητού ή του υπολογιστή σας.",
      boton: "Εγγραφή στο ημερολόγιο",
      copiar: "Αντιγραφή συνδέσμου",
      copiado: "Ο σύνδεσμος αντιγράφηκε",
    },
    fuentes: {
      titulo: "Από πού προέρχεται κάθε ημερομηνία",
      texto: "Εδώ μπαίνουν μόνο ημερομηνίες που έχει ήδη ορίσει ένας κανόνας ή μια τιμή που δημοσίευσε ο αρμόδιος επίσημος φορέας. Ό,τι δεν έχει δημοσιευτεί ακόμη δεν εμφανίζεται.",
    },
    vacio: "Δεν υπάρχουν ημερομηνίες για αυτό το θέμα τους επόμενους δώδεκα μήνες.",
    destacado: {
      ceja: "Ημερολόγιο μισθοδοσίας",
      titulo: "Οι ημερομηνίες που αλλάζουν τον μισθό φέτος",
      ir: "Δείτε το ημερολόγιο",
      proxima: (titulo, fecha) => `Επόμενη: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Ημερολόγιο μισθοδοσίας και φορολογίας ${gEl.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Ημερομηνίες μισθοδοσίας και φορολογίας ${gEl.en(pais)}, από επίσημες πηγές.`,
      calculadora: "Υπολογισμός",
      fuente: "Πηγή",
    },
    og: { proxima: "Επόμενη ημερομηνία", mas: (n) => `Και ακόμη ${pluralEl(n, "ημερομηνία", "ημερομηνίες")} φέτος` },
  },
};

// Húngaro (ADR 0002, D21): impersonal como los demás. El país va como poseedor sin sufijo delante del
// poseído («Magyarország fizetési naptára»; mayusculaHu si el nombre lleva artículo y abre el título)
// o con el sufijo de lugar de GRAMATICA.hu («Magyarországon»). Ningún sufijo pegado a un número: «{n}
// nap múlva», «{n} nappal ezelőtt» llevan el sufijo en la palabra, que no cambia con el número.
const gHu = GRAMATICA.hu;
const delPaisHu = (pais: string) => mayusculaHu(gHu.de(pais));
const hu: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Fizetési és adónaptár",
    seo: {
      titulo: (pais, anios) => [
        `${delPaisHu(pais)} fizetési és adónaptára, ${anios}: fontos dátumok`,
        `${delPaisHu(pais)} fizetési és adónaptára, ${anios}`,
        `${delPaisHu(pais)} fizetési naptára`,
      ],
      descripcion: (pais, proximas) => `A fizetést érintő dátumok ${gHu.en(pais)}, hivatalos forrásokból: ${proximas}. Mindegyikhez tartozik kalkulátor.`,
      descripcionSin: (pais) => `A fizetést érintő dátumok ${gHu.en(pais)}, hivatalos forrásokból és mindegyikhez kalkulátorral. A telefon naptárába is felvehetők.`,
    },
    ceja: (anios) => `Naptár: ${anios}`,
    h1: (pais) => `${delPaisHu(pais)} fizetési és adónaptára`,
    acento: "a dátumok, amelyeken a fizetés múlik",
    bajada: "Minden dátum hivatalos forrásból származik, és ahhoz a kalkulátorhoz vezet, amelyre hatással van. Az oldal magától frissül, amint új érték jelenik meg.",
    proxima: "A következő dátum",
    cuenta: {
      hoy: "Ma",
      manana: "Holnap",
      ayer: "Tegnap",
      en: (n) => `${n} nap múlva`,
      hace: (n) => `${n} nappal ezelőtt`,
      dias: () => "nap",
    },
    queViene: "Hamarosan",
    yaRige: "Már érvényes",
    mesPorMes: "Az év hónapról hónapra",
    sinFechas: "Nincs bejelentett változás",
    filtro: "Szűrés téma szerint",
    todo: "Mind",
    tipos: { pago: "Kifizetések", "salario-minimo": "Minimálbér", impuestos: "Adók", aportes: "Járulékok és nyugdíj", laboral: "Munkajogi szabályok", indices: "Referenciaértékek" },
    pasa: (antes, despues) => `Változás: ${antes} helyett ${despues}`,
    queda: (valor) => `Érvényes: ${valor}`,
    cambian: "Az összegek változnak",
    zonas: (lista) => `Régiók: ${lista}`,
    limite: "Határidő",
    agregar: "Hozzáadás a naptárhoz",
    descargar: "Apple, Outlook és más naptárak (.ics fájl)",
    google: "Google Naptár",
    calcular: "Kiszámítás",
    tambien: "A kalkulátorokban is",
    fuente: (organismo, fecha) => `Forrás: ${organismo}. Ellenőrizve: ${fecha}`,
    verificado: (fecha) => `Ellenőrizve: ${fecha}`,
    suscribir: {
      titulo: "A teljes naptár, mindig naprakészen",
      texto: "Egyetlen feliratkozás után az új dátumok maguktól megjelennek a telefon vagy a számítógép naptárában.",
      boton: "Feliratkozás a naptárra",
      copiar: "Link másolása",
      copiado: "Link kimásolva",
    },
    fuentes: {
      titulo: "Honnan származnak a dátumok",
      texto: "Csak olyan dátum kerül ide, amelyet jogszabály már rögzített, vagy amely hivatalos szerv által közzétett értékhez tartozik. Ami még nem jelent meg, az itt sincs.",
    },
    vacio: "A következő tizenkét hónapban ebben a témában nincs dátum.",
    destacado: {
      ceja: "Fizetési naptár",
      titulo: "Az idei dátumok, amelyeken a fizetés múlik",
      ir: "A naptár megnyitása",
      proxima: (titulo, fecha) => `A következő: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `${delPaisHu(pais)} fizetési és adónaptára (CalcularYa)`,
      descripcion: (pais) => `Fizetési és adózási határidők ${gHu.en(pais)}, hivatalos forrásokból.`,
      calculadora: "Kalkulátor",
      fuente: "Forrás",
    },
    og: { proxima: "A következő dátum", mas: (n) => `És még ${n} határidő idén` },
  },
};

// ───────────────────────────── he ─────────────────────────────

// Hebreo, impersonal como el resto del calendario (ADR 0002, D22). Los días van con pluralHe: el dual
// dice el 2 con la palabra («בעוד יומיים», «לפני יומיים»).
const gHe = GRAMATICA.he;
const MAS_FECHAS_HE: FormasHe = { uno: "ועוד מועד אחד", dos: "ועוד שני מועדים", otros: "ועוד {n} מועדים" };
const he: Diccionario<TextosCalendario> = {
  base: {
    nombre: "לוח המועדים של השכר והמסים",
    seo: {
      titulo: (pais, anios) => [`לוח מועדי שכר ומסים ${gHe.en(pais)} ${anios}: התאריכים החשובים`, `לוח מועדי שכר ומסים ${gHe.en(pais)} ${anios}`, `לוח מועדי שכר ${gHe.en(pais)}`],
      descripcion: (pais, proximas) => `התאריכים שמשנים את השכר ${gHe.en(pais)}, ממקורות רשמיים: ${proximas}. לכל מועד יש מחשבון משלו.`,
      descripcionSin: (pais) => `התאריכים שמשנים את השכר ${gHe.en(pais)}, ממקורות רשמיים, ולכל מועד מחשבון משלו. אפשר להוסיף אותם ליומן בטלפון.`,
    },
    ceja: (anios) => `לוח ${anios}`,
    h1: (pais) => `לוח מועדי השכר והמסים ${gHe.en(pais)}`,
    acento: "התאריכים שמזיזים את השכר",
    bajada: "כל תאריך מגיע ממקור רשמי ומקושר למחשבון שהוא משנה. כשמתפרסם נתון חדש, הדף מתעדכן לבד.",
    proxima: "המועד הבא",
    cuenta: {
      hoy: "היום",
      manana: "מחר",
      ayer: "אתמול",
      en: (n) => `בעוד ${pluralHe(n, DIAS_HE)}`,
      hace: (n) => `לפני ${pluralHe(n, DIAS_HE)}`,
      // La unidad debajo de la cifra grande: el número ya está a la vista, así que el 2 lleva el plural y no el dual.
      dias: (n) => formaHe(n, { uno: "יום", dos: "ימים", otros: "ימים" }),
    },
    queViene: "בקרוב",
    yaRige: "כבר בתוקף",
    mesPorMes: "השנה חודש אחרי חודש",
    sinFechas: "לא הוכרזו שינויים",
    filtro: "סינון לפי נושא",
    todo: "הכול",
    tipos: { pago: "תשלומים", "salario-minimo": "שכר מינימום", impuestos: "מסים", aportes: "ביטוח לאומי ופנסיה", laboral: "דיני עבודה", indices: "ערכי ייחוס" },
    pasa: (antes, despues) => `מ-${antes} ל-${despues}`,
    queda: (valor) => `נקבע על ${valor}`,
    cambian: "הסכומים משתנים",
    zonas: (lista) => `באזורים: ${lista}`,
    limite: "מועד אחרון",
    agregar: "להוספה ליומן",
    descargar: "Apple, Outlook ועוד (קובץ ics)",
    google: "יומן Google",
    calcular: "לחישוב",
    tambien: "גם במחשבונים:",
    fuente: (organismo, fecha) => `מקור: ${organismo}. נבדק ב-${fecha}.`,
    verificado: (fecha) => `נבדק ב-${fecha}`,
    suscribir: {
      titulo: "הלוח המלא, מעודכן תמיד",
      texto: "מנוי אחד מספיק: המועדים החדשים מופיעים לבד ביומן בטלפון או במחשב.",
      boton: "להרשמה ללוח",
      copiar: "העתקת הקישור",
      copiado: "הקישור הועתק",
    },
    fuentes: {
      titulo: "המקור של כל תאריך",
      texto: "נכנס רק מה שנקבע בחוק או בתקנה, או סכום שהגוף הרשמי פרסם. מה שעוד לא פורסם לא מופיע.",
    },
    vacio: "אין מועדים בנושא הזה ב-12 החודשים הקרובים.",
    destacado: {
      ceja: "לוח מועדי השכר",
      titulo: "התאריכים שמזיזים את השכר השנה",
      ir: "לצפייה בלוח",
      proxima: (titulo, fecha) => `המועד הבא: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `לוח מועדי השכר והמסים ${gHe.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `מועדי השכר והמסים ${gHe.en(pais)}, ממקורות רשמיים.`,
      calculadora: "מחשבון",
      fuente: "מקור",
    },
    og: { proxima: "המועד הבא", mas: (n) => `${pluralHe(n, MAS_FECHAS_HE)} השנה` },
  },
};

// Serbio en latinica y ekavski (ADR 0002, D23): impersonal como los demás; el país se declina con
// GRAMATICA.sr («u Srbiji») y los días con formaSr/pluralSr (one/few/other: «za 3 dana», «pre 21 dan»).
const gSr = GRAMATICA.sr;
const sr: Diccionario<TextosCalendario> = {
  base: {
    nombre: "Kalendar isplata i poreza",
    seo: {
      titulo: (pais, anios) => [
        `Kalendar isplata i poreza ${anios} ${gSr.en(pais)}: važni datumi`,
        `Kalendar isplata i poreza ${anios} ${gSr.en(pais)}`,
        `Kalendar isplata ${gSr.en(pais)}`,
      ],
      descripcion: (pais, proximas) => `Datumi koji menjaju platu ${gSr.en(pais)}, iz zvaničnih izvora: ${proximas}. Uz svaki datum ide kalkulator.`,
      descripcionSin: (pais) => `Datumi koji menjaju platu ${gSr.en(pais)}, iz zvaničnih izvora, i uz svaki kalkulator. Dodajte ih u kalendar na telefonu.`,
    },
    ceja: (anios) => `Kalendar ${anios}`,
    h1: (pais) => `Kalendar isplata i poreza ${gSr.en(pais)}`,
    acento: "datumi od kojih zavisi plata",
    bajada: "Svaki datum dolazi iz zvaničnog izvora i vodi do kalkulatora na koji utiče. Stranica se ažurira sama čim se objavi nova vrednost.",
    proxima: "Sledeći datum",
    cuenta: {
      hoy: "Danas",
      manana: "Sutra",
      ayer: "Juče",
      en: (n) => `Za ${pluralSr(n, "dan", "dana", "dana")}`,
      hace: (n) => `Pre ${pluralSr(n, "dan", "dana", "dana")}`,
      dias: (n) => formaSr(n, "dan", "dana", "dana"),
    },
    queViene: "Uskoro",
    yaRige: "Već važi",
    mesPorMes: "Godina po mesecima",
    sinFechas: "Nisu najavljene promene",
    filtro: "Filtriraj po temi",
    todo: "Sve",
    tipos: { pago: "Isplate", "salario-minimo": "Minimalna zarada", impuestos: "Porezi", aportes: "Doprinosi i penzije", laboral: "Pravila rada", indices: "Referentne vrednosti" },
    pasa: (antes, despues) => `Menja se sa ${antes} na ${despues}`,
    queda: (valor) => `Važi: ${valor}`,
    cambian: "Iznosi se menjaju",
    zonas: (lista) => `Regioni: ${lista}`,
    limite: "Krajnji rok",
    agregar: "Dodaj u moj kalendar",
    descargar: "Apple, Outlook i drugi (datoteka .ics)",
    google: "Google kalendar",
    calcular: "Izračunaj",
    tambien: "Takođe u kalkulatorima",
    fuente: (organismo, fecha) => `Izvor: ${organismo}. Provereno ${fecha}`,
    verificado: (fecha) => `Provereno ${fecha}`,
    suscribir: {
      titulo: "Ceo kalendar, uvek ažuran",
      texto: "Pretplatite se jednom i novi datumi će se sami pojavljivati u kalendaru na telefonu ili računaru.",
      boton: "Pretplati se na kalendar",
      copiar: "Kopiraj link",
      copiado: "Link je kopiran",
    },
    fuentes: {
      titulo: "Odakle dolazi svaki datum",
      texto: "Ovde su samo datumi koje je već utvrdio propis ili vrednost koju je objavio zvanični organ. Ono što još nije objavljeno, ovde nije.",
    },
    vacio: "U narednih dvanaest meseci za ovu temu nema datuma.",
    destacado: {
      ceja: "Kalendar isplata",
      titulo: "Datumi od kojih ove godine zavisi plata",
      ir: "Prikaži kalendar",
      proxima: (titulo, fecha) => `Sledeće: ${titulo}, ${fecha}`,
    },
    ics: {
      nombre: (pais) => `Kalendar isplata i poreza ${gSr.en(pais)} (CalcularYa)`,
      descripcion: (pais) => `Rokovi za isplate i poreze ${gSr.en(pais)}, iz zvaničnih izvora.`,
      calculadora: "Kalkulator",
      fuente: "Izvor",
    },
    og: { proxima: "Sledeći datum", mas: (n) => `I još ${pluralSr(n, "rok", "roka", "rokova")} ove godine` },
  },
};

export const DICCIONARIOS_CALENDARIO: Diccionarios<TextosCalendario> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id: idn, tr, bn, th, uk, uz, ru, ro, cs, el, hu, he, sr };

export function textosCalendario(idioma: Idioma, trato: Trato, locale?: string): TextosCalendario {
  return resolver(DICCIONARIOS_CALENDARIO, idioma, trato, locale);
}
