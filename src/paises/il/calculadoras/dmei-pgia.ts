import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// ביטוח לאומי: 75% del ingreso de los 3 meses anteriores dividido por 90, con tope diario, hasta
// 91 días. Con menos de 12 días de ausencia se paga desde el tercer día después del día de la lesión.
export default definirCalculadora({
  id: "il.dmei-pgia",
  mercado: "il",
  concepto: "propio",
  slug: "dmei-pgia",
  estado: "publicado",
  requiere: { "il.pgia": "mapa", "il.pgia-shiur": "mapa", "il.pgia-yamim": "mapa" },
  campos: [
    {
      id: "hachnasa3",
      tipo: "moneda",
      etiqueta: "סך ההכנסה ב-3 החודשים שלפני הפגיעה",
      ayuda: "ההכנסה שממנה שולמו דמי ביטוח, כולל שעות נוספות, פרמיות, הבראה ומשכורת 13.",
      min: 0,
      porDefecto: 36000,
    },
    {
      id: "yamim",
      tipo: "entero",
      etiqueta: "ימי היעדרות מהעבודה אחרי יום הפגיעה",
      ayuda: "את יום הפגיעה עצמו משלם המעסיק.",
      min: 1,
      max: 365,
      porDefecto: 30,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.hachnasa3 <= 0) throw new ErrorEntrada("הזינו את ההכנסה ב-3 החודשים שלפני הפגיעה.", "hachnasa3");
    const shiur = enMapa(v["il.pgia-shiur"], "shiur") / 100;
    const max = enMapa(v["il.pgia"], "max-yomi");
    const y = v["il.pgia-yamim"];
    const lefiHachnasa = (e.hachnasa3 / 90) * shiur;
    const yomi = redondear(Math.min(max, lefiHachnasa));
    const ktzara = e.yamim < enMapa(y, "saf");
    const lefiYamim = ktzara ? Math.max(0, e.yamim - enMapa(y, "hamtana")) : e.yamim;
    const yamim = Math.min(enMapa(y, "max"), lefiYamim);
    const observaciones = ["הסכום ברוטו. מדמי הפגיעה מנוכים מס הכנסה, דמי ביטוח לאומי ודמי ביטוח בריאות."];
    if (ktzara) observaciones.push("בהיעדרות של פחות מ-12 ימים, דמי הפגיעה משולמים מהיום השלישי שלמחרת יום הפגיעה.");
    if (lefiYamim > yamim) observaciones.push("דמי פגיעה משולמים עד 13 שבועות (91 ימים). אחרי זה אפשר לבדוק זכאות לקצבת נכות מעבודה.");
    if (lefiHachnasa > max) observaciones.push("ההכנסה עוברת את התקרה, ולכן דמי הפגיעה ליום הם הסכום המרבי.");
    return { sach: redondear(yomi * yamim), yomi, yamim, observaciones };
  },
  resultado: [
    { clave: "sach", etiqueta: "סך דמי הפגיעה (ברוטו)", formato: "moneda", destacada: true },
    { clave: "yomi", etiqueta: "דמי פגיעה ליום", formato: "moneda" },
    { clave: "yamim", etiqueta: "ימים לתשלום", formato: "dias" },
  ],
});
