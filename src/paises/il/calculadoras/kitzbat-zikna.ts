import { definirCalculadora, enMapa } from "@/motor/calculo";

// ביטוח לאומי, קצבת אזרח ותיק: básica + תוספת ותק (2% por año de seguro, hasta 50%, sobre la
// básica) + תוספת דחייה (5% por año sobre básica y ותק) + suplementos fijos por cónyuge, hijos y 80.
export default definirCalculadora({
  id: "il.kitzbat-zikna",
  mercado: "il",
  concepto: "jubilacion",
  slug: "kitzbat-zikna",
  estado: "publicado",
  requiere: { "il.zikna": "mapa", "il.zikna-briut": "mapa", "il.zikna-vetek": "mapa", "il.zikna-dchiya": "mapa" },
  campos: [
    { id: "shanim", tipo: "entero", etiqueta: "שנות ביטוח מלאות", ayuda: "שנים שבהן הייתם מבוטחים ותושבי ישראל לפני קבלת הקצבה.", min: 0, max: 70, porDefecto: 35 },
    { id: "dchiya", tipo: "entero", etiqueta: "שנות דחייה בגלל הכנסה מעבודה", ayuda: "שנים מגיל הפרישה ועד גיל 70 שבהן הקצבה לא שולמה בגלל הכנסות גבוהות מעבודה.", min: 0, max: 10, porDefecto: 0 },
    { id: "benZug", tipo: "si-no", etiqueta: "יש בן או בת זוג שזכאים לתוספת", ayuda: "בן או בת זוג תושבי ישראל שלא מקבלים קצבה מהביטוח הלאומי.", porDefecto: false },
    { id: "yeladim", tipo: "entero", etiqueta: "ילדים שזכאים לתוספת", ayuda: "התוספת משולמת רק בעד שני הילדים הראשונים.", min: 0, max: 10, porDefecto: 0 },
    { id: "gil80", tipo: "si-no", etiqueta: "מלאו 80", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const z = v["il.zikna"];
    const vt = v["il.zikna-vetek"];
    const bsisi = enMapa(z, "bsisi");
    const achuzVetek = Math.min(enMapa(vt, "max"), e.shanim * enMapa(vt, "lashana"));
    const vetek = redondear((bsisi * achuzVetek) / 100);
    const achuzDchiya = e.dchiya * enMapa(v["il.zikna-dchiya"], "lashana");
    const dchiya = redondear(((bsisi + vetek) * achuzDchiya) / 100);
    const yeladim = Math.min(2, e.yeladim);
    const tosafot = (e.benZug ? enMapa(z, "ben-zug") : 0) + yeladim * enMapa(z, "yeled") + (e.gil80 ? enMapa(z, "gil-80") : 0);
    const bruto = redondear(bsisi + vetek + dchiya + tosafot);
    const briut = enMapa(v["il.zikna-briut"], e.benZug ? "zug" : "yachid");
    const observaciones = [
      "מגיל הפרישה ועד גיל 70 הקצבה תלויה במבחן הכנסות. הכנסה מפנסיה לא נבדקת.",
      "דמי ביטוח הבריאות שבחישוב הם למי שמקבל קצבה בלי השלמת הכנסה.",
    ];
    if (e.yeladim > 2) observaciones.push("התוספת בעד ילדים משולמת רק בעד שני הילדים הראשונים.");
    return { neto: redondear(bruto - briut), bruto, bsisi, achuzVetek, vetek, dchiya, tosafot, briut, observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "קצבה חודשית אחרי ביטוח בריאות", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "קצבה חודשית ברוטו", formato: "moneda" },
    { clave: "bsisi", etiqueta: "קצבה בסיסית", formato: "moneda" },
    { clave: "achuzVetek", etiqueta: "שיעור תוספת הוותק", formato: "porcentaje", decimales: 0 },
    { clave: "vetek", etiqueta: "תוספת ותק", formato: "moneda" },
    { clave: "dchiya", etiqueta: "תוספת דחיית קצבה", formato: "moneda" },
    { clave: "tosafot", etiqueta: "תוספות לבן זוג, לילדים ומגיל 80", formato: "moneda" },
    { clave: "briut", etiqueta: "דמי ביטוח בריאות", formato: "moneda" },
  ],
});
