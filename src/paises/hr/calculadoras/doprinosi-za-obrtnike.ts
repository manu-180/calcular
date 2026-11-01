import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.doprinosi-za-obrtnike",
  mercado: "hr",
  concepto: "propio",
  slug: "doprinosi-za-obrtnike",
  estado: "borrador",
  requiere: { "hr.osnovice-samostalni": "mapa", "hr.stope-samostalni": "mapa" },
  campos: [{ id: "vrsta", tipo: "opcion-dato", etiqueta: "Vrsta djelatnosti", dato: "hr.osnovice-samostalni", porDefecto: "obrt-dohodak" }],
  calcular(e, v, { redondear }) {
    const o = enMapa(v["hr.osnovice-samostalni"], e.vrsta);
    const s = v["hr.stope-samostalni"];
    const mioI = redondear((o * (s["mio-i"] ?? 0)) / 100);
    const mioII = redondear((o * (s["mio-ii"] ?? 0)) / 100);
    const zdravstveno = redondear((o * (s["zdravstveno"] ?? 0)) / 100);
    const mjesecno = redondear(mioI + mioII + zdravstveno);
    return { mjesecno, osnovica: o, mioI, mioII, zdravstveno, godisnje: redondear(mjesecno * 12) };
  },
  resultado: [
    { clave: "mjesecno", etiqueta: "Doprinosi mjesečno", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Mjesečna osnovica", formato: "moneda" },
    { clave: "mioI", etiqueta: "Mirovinsko, I. stup", formato: "moneda" },
    { clave: "mioII", etiqueta: "Mirovinsko, II. stup", formato: "moneda" },
    { clave: "zdravstveno", etiqueta: "Zdravstveno osiguranje", formato: "moneda" },
    { clave: "godisnje", etiqueta: "Doprinosi za godinu", formato: "moneda" },
  ],
});
