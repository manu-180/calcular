import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.indemnizatie-de-somaj",
  mercado: "md",
  concepto: "propio",
  slug: "indemnizatie-de-somaj",
  estado: "publicado",
  requiere: { "md.somaj-procent": "numero", "md.somaj-luni": "mapa" },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul mediu lunar asigurat", min: 0, porDefecto: 12000, ayuda: "Din 12 luni din ultimele 24 înainte de înregistrarea ca șomer." },
    { id: "stagiu", tipo: "opcion-dato", etiqueta: "Stagiul de cotizare", dato: "md.somaj-luni", porDefecto: "sub10" },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const lunar = redondear((e.venit * v["md.somaj-procent"]) / 100);
    const luni = enMapa(v["md.somaj-luni"], e.stagiu);
    return {
      lunar,
      luni,
      total: redondear(lunar * luni),
      observaciones: ["Indemnizația nu poate depăși salariul mediu lunar pe economie din anul precedent. La venituri mari, CNAS o reduce la această sumă."],
    };
  },
  resultado: [
    { clave: "lunar", etiqueta: "Indemnizația de șomaj pe lună", formato: "moneda", destacada: true },
    { clave: "luni", etiqueta: "Perioada de plată", formato: "meses" },
    { clave: "total", etiqueta: "Total pe toată perioada", formato: "moneda" },
  ],
});
