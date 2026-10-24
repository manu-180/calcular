import type { TipoEvento } from "../calendario/eventos";
import type { Idioma, Trato } from "../tipos";
import { GRAMATICA } from "./gramatica";
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

export const DICCIONARIOS_CALENDARIO: Diccionarios<TextosCalendario> = { es, pt, en, fr, de, it, nl, ja, ko, zh, id: idn };

export function textosCalendario(idioma: Idioma, trato: Trato, locale?: string): TextosCalendario {
  return resolver(DICCIONARIOS_CALENDARIO, idioma, trato, locale);
}
