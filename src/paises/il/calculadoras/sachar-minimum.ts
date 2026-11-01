import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "il.sachar-minimum",
  mercado: "il",
  concepto: "salario-minimo",
  slug: "sachar-minimum",
  estado: "publicado",
  requiere: { "il.sachar-minimum": "mapa" },
  campos: [
    {
      id: "sug",
      tipo: "opcion",
      etiqueta: "איך משולם השכר?",
      opciones: [
        { valor: "chodshi", etiqueta: "משכורת חודשית" },
        { valor: "shaati", etiqueta: "לפי שעות" },
      ],
      porDefecto: "chodshi",
    },
    { id: "misra", tipo: "porcentaje", etiqueta: "היקף המשרה (%)", min: 1, max: 100, porDefecto: 100, visibleSi: { sug: ["chodshi"] } },
    { id: "shaot", tipo: "numero", etiqueta: "שעות עבודה בחודש", min: 0, max: 400, porDefecto: 100, visibleSi: { sug: ["shaati"] } },
    {
      id: "bsis",
      tipo: "opcion",
      etiqueta: "היקף משרה מלאה בחודש",
      ayuda: "הביטוח הלאומי מפרסם שכר מינימום לשעה לפי שני ההיקפים. אם אינכם יודעים, בחרו 182 שעות.",
      opciones: [
        { valor: "shaa-182", etiqueta: "182 שעות" },
        { valor: "shaa-186", etiqueta: "186 שעות" },
      ],
      porDefecto: "shaa-182",
    },
  ],
  calcular(e, v, { redondear }) {
    const m = v["il.sachar-minimum"];
    const shaa = enMapa(m, e.bsis);
    let minimum: number;
    if (e.sug === "chodshi") {
      if (!e.misra || e.misra <= 0) throw new ErrorEntrada("הזינו את היקף המשרה.", "misra");
      minimum = redondear(porcentaje(enMapa(m, "chodshi"), e.misra));
    } else {
      if (!e.shaot || e.shaot <= 0) throw new ErrorEntrada("הזינו את מספר השעות בחודש.", "shaot");
      minimum = redondear(shaa * e.shaot);
    }
    return {
      minimum,
      chodshi: enMapa(m, "chodshi"),
      shaa,
      yom5: enMapa(m, "yom-5"),
      yom6: enMapa(m, "yom-6"),
      observaciones: ["הסכומים הם שכר המינימום לעובד מגיל 18."],
    };
  },
  resultado: [
    { clave: "minimum", etiqueta: "שכר המינימום שמגיע לכם", formato: "moneda", destacada: true },
    { clave: "chodshi", etiqueta: "שכר מינימום למשרה מלאה בחודש", formato: "moneda" },
    { clave: "shaa", etiqueta: "שכר מינימום לשעה", formato: "moneda" },
    { clave: "yom5", etiqueta: "ליום עבודה (5 ימים בשבוע)", formato: "moneda" },
    { clave: "yom6", etiqueta: "ליום עבודה (6 ימים בשבוע)", formato: "moneda" },
  ],
});
