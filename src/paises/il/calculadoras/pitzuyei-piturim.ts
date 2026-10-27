import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Artículo 12 del חוק פיצויי פיטורים: un sueldo mensual por año de trabajo, con la parte de año en
// proporción, para quien trabajó al menos un año seguido (artículo 1). Solo עובד במשכורת: el que
// cobra por día u hora tiene otra base.
export default definirCalculadora({
  id: "il.pitzuyei-piturim",
  mercado: "il",
  concepto: "indemnizacion-despido",
  slug: "pitzuyei-piturim",
  estado: "publicado",
  requiere: { "il.pitzuyim-chodashim": "numero", "il.pitzuyim-ptor": "numero" },
  campos: [
    { id: "sachar", tipo: "moneda", etiqueta: "המשכורת החודשית האחרונה", min: 0, porDefecto: 12000 },
    { id: "shanim", tipo: "entero", etiqueta: "שנות עבודה מלאות", min: 0, max: 60, porDefecto: 5 },
    { id: "chodashim", tipo: "entero", etiqueta: "חודשים נוספים", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sachar <= 0) throw new ErrorEntrada("הזינו את המשכורת החודשית האחרונה.", "sachar");
    if (e.chodashim > 11) throw new ErrorEntrada("הזינו עד 11 חודשים. 12 חודשים הם שנה נוספת.", "chodashim");
    const vetek = e.shanim + e.chodashim / 12;
    if (vetek < 1) {
      return {
        pitzuyim: 0,
        vetek,
        ptor: 0,
        chayav: 0,
        observaciones: ["לפי החוק מגיעים פיצויי פיטורים אחרי שנת עבודה רצופה אחת לפחות אצל אותו מעסיק."],
      };
    }
    const pitzuyim = redondear(e.sachar * v["il.pitzuyim-chodashim"] * vetek);
    const ptor = redondear(Math.min(pitzuyim, v["il.pitzuyim-ptor"] * vetek));
    return {
      pitzuyim,
      vetek,
      ptor,
      chayav: redondear(pitzuyim - ptor),
      observaciones: [
        "החישוב לעובד במשכורת חודשית. כספים שהמעסיק הפריש לפיצויים בקופת הגמל נחשבים חלק מהפיצויים.",
        "הפטור ממס חושב עד התקרה לכל שנת עבודה. על החלק שמעליה יש מס הכנסה.",
      ],
    };
  },
  resultado: [
    { clave: "pitzuyim", etiqueta: "פיצויי פיטורים", formato: "moneda", destacada: true },
    { clave: "vetek", etiqueta: "ותק בשנים", formato: "numero", decimales: 2 },
    { clave: "ptor", etiqueta: "החלק הפטור ממס (עד התקרה)", formato: "moneda" },
    { clave: "chayav", etiqueta: "החלק שחייב במס", formato: "moneda", ocultarSiCero: true },
  ],
});
