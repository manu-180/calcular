import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.indemnizatie-crestere-copil",
  mercado: "ro",
  concepto: "propio",
  slug: "indemnizatie-crestere-copil",
  estado: "borrador",
  requiere: { "ro.indemnizatie-copil": "mapa" },
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "Venitul net mediu lunar din ultimele 12 luni", min: 0, porDefecto: 5000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.net <= 0) throw new ErrorEntrada("Introduceți venitul net mediu.", "net");
    const p = v["ro.indemnizatie-copil"];
    const calculat = redondear((e.net * enMapa(p, "procent")) / 100);
    const indemnizatie = Math.min(enMapa(p, "maxim"), Math.max(enMapa(p, "minim"), calculat));
    return { indemnizatie, calculat, procent: enMapa(p, "procent") };
  },
  resultado: [
    { clave: "indemnizatie", etiqueta: "Indemnizația lunară", formato: "moneda", destacada: true },
    { clave: "calculat", etiqueta: "Procentul aplicat la venitul net", formato: "moneda" },
    { clave: "procent", etiqueta: "Procent", formato: "porcentaje", decimales: 0 },
  ],
});
