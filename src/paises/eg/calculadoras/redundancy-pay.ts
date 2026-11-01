import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.redundancy-pay",
  mercado: "eg",
  concepto: "propio",
  slug: "redundancy-pay",
  estado: "publicado",
  requiere: { "eg.redundancy": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري", min: 0, porDefecto: 10000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة", min: 0, max: 60, porDefecto: 8, ayuda: "يمكنك إدخال كسر السنة، مثل 7.5." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل أجرك الشهري.", "salario");
    if (e.anios <= 0) throw new ErrorEntrada("أدخل سنوات خدمتك.", "anios");
    const m = v["eg.redundancy"];
    const primeros = Math.min(e.anios, 5);
    const resto = Math.max(0, e.anios - 5);
    const mesesPrimeros = (primeros * enMapa(m, "first5")) / 100;
    const mesesResto = (resto * enMapa(m, "after5")) / 100;
    const observaciones: string[] = [];
    if (!Number.isInteger(e.anios)) observaciones.push("كسر السنة محسوب بنسبته.");
    return {
      total: redondear(e.salario * (mesesPrimeros + mesesResto)),
      parteInicial: redondear(e.salario * mesesPrimeros),
      parteResto: redondear(e.salario * mesesResto),
      meses: mesesPrimeros + mesesResto,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "المكافأة المستحقة", formato: "moneda", destacada: true },
    { clave: "parteInicial", etiqueta: "عن السنوات الخمس الأولى", formato: "moneda" },
    { clave: "parteResto", etiqueta: "عن السنوات التالية", formato: "moneda", ocultarSiCero: true },
    { clave: "meses", etiqueta: "عدد الأشهر", formato: "meses", decimales: 1 },
  ],
});
