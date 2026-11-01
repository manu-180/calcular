import { GRAMATICA } from "../gramatica";
import { pluralHe, prefijoHe } from "../hebreo";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.he;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `אתם ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} עם הערכים הרשמיים שבתוקף.`,
    ultimoDato: "הנתון האחרון שנטען",
    ir: (pais) => `מעבר ${g.para(pais)}`,
    otro: "בחירת מדינה אחרת",
    argentina: "המחשבונים שלכם נמצאים ב-calcular.ar, עם הנתונים הרשמיים של ארגנטינה.",
    argentinaIr: "מעבר ל-calcular.ar",
    neutroTitulo: (paises) => `${pluralHe(paises, { uno: "מדינה אחת", dos: "שתי מדינות", otros: "{n} מדינות" })}, ולכל אחת החוקים והמטבע שלה`,
    neutroTexto: "אנחנו בודקים את המקורות הרשמיים כל יום.",
    neutroIr: "לרשימת המדינות",
  },
  selector: {
    buscar: "חיפוש מדינה",
    sinResultados: (q) => `אין מדינה שמתאימה ל-"${q}"`,
    ubicacion: "המיקום שלכם",
    mismaCalculadora: "אותו מחשבון",
    paises: "מדינות",
  },
  aviso: { mismaCalculadora: (pais) => `לחישוב עם הנתונים ${g.de(pais)}` },
  vivo: {
    titulo: "נתונים רשמיים שמתעדכנים אוטומטית",
    vigilado: "תהליך אוטומטי בודק את המקורות הרשמיים כל יום. שינויים בכללים נכנסים רק אחרי שאנחנו מאמתים אותם.",
    sinVigilar: "לכל ערך יש מקור רשמי ותאריך שבו בדקנו אותו.",
    verificado: "בדיקת הכללים האחרונה",
    automatico: "הנתון האוטומטי האחרון",
    fuentes: "מקורות רשמיים",
    nFuentes: (n) => pluralHe(n, { uno: "מסמך רשמי אחד", dos: "שני מסמכים רשמיים", otros: "{n} מסמכים רשמיים" }),
    verFuentes: "למקורות",
    verNovedades: "לעדכונים",
    hoy: "היום",
    ayer: "אתמול",
    elDia: (fecha) => `ב-${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `בדקנו את הנתונים במקור הרשמי ב-${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: עודכן ${cuando} עם הנתון האחרון ${prefijoHe("מ", organismo)}.`,
    diario: "אנחנו בודקים את המקורות הרשמיים באופן אוטומטי כל יום.",
    actualizado: "מעודכן",
  },
  novedades: {
    pildora: "עדכונים",
    titulo: (pais) => `מה השתנה בנתונים הרשמיים ${g.en(pais)}`,
    acento: "ביום שזה משתנה",
    bajada: "כל מספר חדש שמגיע למחשבונים נרשם כאן: מה השתנה, ממתי הוא בתוקף ומאיפה הוא הגיע.",
    ultimoCambio: "השינוי האחרון",
    revision: "בדיקת המקורות",
    diaria: "כל יום",
    porNorma: "עם כל כלל חדש",
    siguiendo: "המקורות שאנחנו עוקבים אחריהם",
    masOrganismos: (n) => `ועוד ${pluralHe(n, { uno: "גוף אחד", dos: "שני גופים", otros: "{n} גופים" })}`,
    proximos: "פורסמו ונכנסים לתוקף בקרוב",
    proximosTexto: "ערכים רשמיים שכבר טענו ושייכנסו לתוקף בימים הקרובים.",
    registro: "יומן השינויים",
    rss: "מעקב ב-RSS",
    vacio: "עדיין אין שינויים רשומים למדינה הזו.",
    etiqueta: { editorial: "כלל", dato: "נתון חדש", proximo: "בקרוב", serie: "אוטומטי", revision: "בדיקה" },
    rige: (fecha) => `בתוקף מ-${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `בתוקף מ-${desde} עד ${hasta}`,
    antes: (valor, fecha) => `קודם: ${valor} (${fecha})`,
    revisados: (n) => `בדקנו ${pluralHe(n, { uno: "נתון אחד", dos: "שני נתונים", otros: "{n} נתונים" })} במקור הרשמי`,
    revisadosTexto: (organismos) => `וידאנו את הערכים שבתוקף מול ${organismos}.`,
    verDatos: (n) => (n === 1 ? "לנתון" : `ל-${pluralHe(n, { uno: "נתון אחד", dos: "שני הנתונים", otros: "{n} הנתונים" })}`),
    calculadoras: "משתמשים בו",
    rango: (min, max, zonas) => `מ-${min} עד ${max} לפי אזור (${pluralHe(zonas, { uno: "אזור אחד", dos: "שני אזורים", otros: "{n} אזורים" })})`,
    tabla: (filas) => `טבלה של ${pluralHe(filas, { uno: "מדרגה אחת", dos: "שתי מדרגות", otros: "{n} מדרגות" })}`,
    valores: (n) => pluralHe(n, { uno: "ערך אחד", dos: "שני ערכים", otros: "{n} ערכים" }),
    pasosTitulo: "איך הנתונים נשארים מעודכנים",
    pasos: [
      { titulo: "גוף רשמי מפרסם", texto: "החלטה, מדד או שער חליפין מתפרסמים במקור הרשמי." },
      { titulo: "בודקים לפני שמשתמשים", texto: "מדדים ושערי חליפין מגיעים אוטומטית, עם בדיקה שהם בטווח סביר. כללים אנחנו טוענים כשהמסמך הרשמי מולנו." },
      { titulo: "המחשבונים מתעדכנים", texto: "המחשבונים עוברים למספר החדש, והשינוי נרשם כאן עם המקור שלו." },
    ],
    feedTitulo: (pais) => `עדכונים ${g.en(pais)} ב-CalcularYa`,
    feedSubtitulo: (pais) => `שינויים בנתונים הרשמיים שעליהם המחשבונים ${g.en(pais)} מתבססים, עם תאריכי התוקף והמקורות.`,
  },
};

export const he: Diccionario<TextosInicio> = { base };
