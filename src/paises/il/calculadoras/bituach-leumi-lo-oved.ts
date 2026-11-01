import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// דמי ביטוח de quien no trabaja: sobre ingresos que no son de trabajo (alquiler, dividendos) se
// descuenta la הכנסה פטורה y al resto se aplica la tasa reducida hasta la primera תקרה y la normal
// hasta la máxima, como en el ejemplo del ביטוח לאומי. Nunca menos que el pago mínimo.
export default definirCalculadora({
  id: "il.bituach-leumi-lo-oved",
  mercado: "il",
  concepto: "propio",
  slug: "bituach-leumi-lo-oved",
  estado: "publicado",
  requiere: { "il.bl-lo-oved": "mapa", "il.bl-lo-oved-schumim": "mapa", "il.bl-tikrot": "mapa" },
  campos: [
    {
      id: "hachnasa",
      tipo: "moneda",
      etiqueta: "הכנסה חודשית שלא מעבודה",
      ayuda: "למשל שכר דירה חייב, דיבידנד או ריבית. מי שאין לו הכנסות מזין 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.hachnasa < 0) throw new ErrorEntrada("ההכנסה לא יכולה להיות שלילית.", "hachnasa");
    const s = v["il.bl-lo-oved"];
    const sc = v["il.bl-lo-oved-schumim"];
    const t = v["il.bl-tikrot"];
    const chayav = Math.min(enMapa(t, "merbit"), Math.max(0, e.hachnasa - enMapa(sc, "ptor")));
    const nimuch = Math.min(chayav, enMapa(t, "mufchat"));
    const gavoha = chayav - nimuch;
    const leumiAchuz = redondear((nimuch * enMapa(s, "bl-mufchat") + gavoha * enMapa(s, "bl-male")) / 100);
    const sachAchuz = redondear((nimuch * (enMapa(s, "bl-mufchat") + enMapa(s, "briut-mufchat"))) / 100) +
      redondear((gavoha * (enMapa(s, "bl-male") + enMapa(s, "briut-male"))) / 100);
    const minimum = enMapa(sc, "minimum-bl") + enMapa(sc, "minimum-briut");
    const baMinimum = sachAchuz < minimum;
    const sach = redondear(baMinimum ? minimum : sachAchuz);
    const leumi = baMinimum ? enMapa(sc, "minimum-bl") : leumiAchuz;
    const observaciones: string[] = [];
    if (baMinimum) observaciones.push("דמי הביטוח לפי ההכנסה נמוכים מהתשלום המינימלי, ולכן משלמים את המינימום.");
    if (e.hachnasa - enMapa(sc, "ptor") > enMapa(t, "merbit")) observaciones.push("על ההכנסה שמעל ההכנסה המרבית לא משלמים דמי ביטוח.");
    observaciones.push("לסטודנטים ולחלק מבני הזוג של מבוטחים יש כללים אחרים, שלא נכללים כאן.");
    return {
      sach,
      leumi,
      briut: redondear(sach - leumi),
      chayav,
      shnati: redondear(sach * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "sach", etiqueta: "דמי ביטוח לחודש", formato: "moneda", destacada: true },
    { clave: "leumi", etiqueta: "מזה ביטוח לאומי", formato: "moneda" },
    { clave: "briut", etiqueta: "מזה ביטוח בריאות", formato: "moneda" },
    { clave: "chayav", etiqueta: "הכנסה שחייבת בדמי ביטוח", formato: "moneda", ocultarSiCero: true },
    { clave: "shnati", etiqueta: "דמי ביטוח לשנה", formato: "moneda" },
  ],
});
