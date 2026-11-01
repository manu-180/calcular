import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "il.alut-maasik",
  mercado: "il",
  concepto: "costo-empleador",
  slug: "alut-maasik",
  estado: "publicado",
  requiere: {
    "il.bl-tikrot": "mapa",
    "il.bl-maasik": "mapa",
    "il.pensia-maasik": "numero",
    "il.pitzuyim-hafrasha": "mapa",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "שכר ברוטו חודשי", min: 0, porDefecto: 15000 },
    {
      id: "pitzuyim",
      tipo: "opcion",
      etiqueta: "הפרשה לפיצויים",
      opciones: [
        { valor: "basis", etiqueta: "השיעור הבסיסי של צו ההרחבה" },
        { valor: "male", etiqueta: "הפרשה מלאה (סעיף 14)" },
      ],
      porDefecto: "basis",
    },
    {
      id: "hishtalmut",
      tipo: "porcentaje",
      etiqueta: "הפרשת המעסיק לקרן השתלמות (%)",
      ayuda: "לא חובה לפי החוק. אם יש הסכם, הזינו את האחוז שהמעסיק מפריש. אחרת השאירו 0.",
      min: 0,
      max: 10,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("הזינו את השכר הברוטו.", "bruto");
    const tikrot = v["il.bl-tikrot"];
    const basis = Math.min(e.bruto, enMapa(tikrot, "merbit"));
    const mufchat = Math.min(basis, enMapa(tikrot, "mufchat"));
    const bl = v["il.bl-maasik"];
    const bituachLeumi = redondear(porcentaje(mufchat, enMapa(bl, "mufchat")) + porcentaje(basis - mufchat, enMapa(bl, "male")));
    const pensia = redondear(porcentaje(e.bruto, v["il.pensia-maasik"]));
    const pitzuyim = redondear(porcentaje(e.bruto, enMapa(v["il.pitzuyim-hafrasha"], e.pitzuyim)));
    const hishtalmut = redondear(porcentaje(e.bruto, e.hishtalmut));
    const alut = redondear(e.bruto + bituachLeumi + pensia + pitzuyim + hishtalmut);
    return {
      alut,
      bituachLeumi,
      pensia,
      pitzuyim,
      hishtalmut,
      tosefet: redondear(alut - e.bruto),
      achuz: ((alut - e.bruto) / e.bruto) * 100,
      shnati: redondear(alut * 12),
      observaciones: ["לא נכללים דמי הבראה, ביגוד, נסיעות, ביטוח אובדן כושר עבודה מעבר לתגמולים או הטבות אחרות שבהסכם."],
    };
  },
  resultado: [
    { clave: "alut", etiqueta: "עלות המעסיק לחודש", formato: "moneda", destacada: true },
    { clave: "bituachLeumi", etiqueta: "ביטוח לאומי (חלק המעסיק)", formato: "moneda" },
    { clave: "pensia", etiqueta: "הפרשה לתגמולים בפנסיה", formato: "moneda" },
    { clave: "pitzuyim", etiqueta: "הפרשה לפיצויים", formato: "moneda" },
    { clave: "hishtalmut", etiqueta: "קרן השתלמות", formato: "moneda", ocultarSiCero: true },
    { clave: "tosefet", etiqueta: "תוספת על הברוטו", formato: "moneda" },
    { clave: "achuz", etiqueta: "תוספת באחוזים", formato: "porcentaje", decimales: 1 },
    { clave: "shnati", etiqueta: "עלות שנתית (12 משכורות)", formato: "moneda" },
  ],
});
