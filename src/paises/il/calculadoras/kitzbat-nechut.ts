import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// קצבת נכות כללית: monto según la דרגת אי-כושר, más תוספת por hasta dos hijos y por el cónyuge
// que gana hasta la תקרה y no cobra otra קצבה. No descuenta ingresos propios (tabla aparte).
export default definirCalculadora({
  id: "il.kitzbat-nechut",
  mercado: "il",
  concepto: "propio",
  slug: "kitzbat-nechut",
  estado: "publicado",
  requiere: { "il.nechut-kitzba": "mapa", "il.nechut-yeled": "mapa", "il.nechut-zug": "mapa" },
  campos: [
    {
      id: "darga",
      tipo: "opcion",
      etiqueta: "דרגת אי-הכושר שנקבעה",
      opciones: [
        { valor: "male", etiqueta: "100% או 75% (דרגה מלאה)" },
        { valor: "chelki-74", etiqueta: "74%" },
        { valor: "chelki-65", etiqueta: "65%" },
        { valor: "chelki-60", etiqueta: "60%" },
      ],
      porDefecto: "male",
    },
    {
      id: "yeladim",
      tipo: "entero",
      etiqueta: "מספר הילדים",
      ayuda: "ילדים עד גיל 18, או עד 24 בשירות צבאי או לאומי. התוספת משולמת עד שני ילדים.",
      min: 0,
      max: 15,
      porDefecto: 0,
    },
    { id: "zug", tipo: "si-no", etiqueta: "יש בן או בת זוג שלא מקבלים קצבה אחרת", porDefecto: false },
    { id: "hachnasatZug", tipo: "moneda", etiqueta: "הכנסת בן הזוג ברוטו לחודש", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.yeladim < 0) throw new ErrorEntrada("מספר הילדים לא יכול להיות שלילי.", "yeladim");
    if (e.hachnasatZug < 0) throw new ErrorEntrada("ההכנסה לא יכולה להיות שלילית.", "hachnasatZug");
    const z = v["il.nechut-zug"];
    const kitzba = enMapa(v["il.nechut-kitzba"], e.darga);
    const yeladimBaTosefet = Math.min(2, e.yeladim);
    const tosefetYeladim = yeladimBaTosefet * enMapa(v["il.nechut-yeled"], e.darga);
    const zugZakai = e.zug && e.hachnasatZug <= enMapa(z, "tikrat-hachnasa");
    const tosefetZug = zugZakai ? enMapa(z, e.darga) : 0;
    const observaciones: string[] = [];
    if (e.yeladim > 2) observaciones.push("התוספת עבור ילדים משולמת רק עבור שני הילדים הראשונים.");
    if (e.zug && !zugZakai) observaciones.push("הכנסת בן הזוג גבוהה מהתקרה, ולכן אין תוספת עבורו.");
    observaciones.push("הכנסה מעבודה או הכנסה שלא מעבודה עשויות להפחית את הקצבה. החישוב כאן לא מביא אותן בחשבון.");
    return { sach: kitzba + tosefetYeladim + tosefetZug, kitzba, tosefetYeladim, tosefetZug, observaciones };
  },
  resultado: [
    { clave: "sach", etiqueta: "קצבת הנכות לחודש", formato: "moneda", destacada: true },
    { clave: "kitzba", etiqueta: "הקצבה הבסיסית", formato: "moneda" },
    { clave: "tosefetYeladim", etiqueta: "תוספת עבור ילדים", formato: "moneda", ocultarSiCero: true },
    { clave: "tosefetZug", etiqueta: "תוספת עבור בן או בת זוג", formato: "moneda", ocultarSiCero: true },
  ],
});
