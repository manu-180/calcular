import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "md.salariul-mediu-pe-economie",
  mercado: "md",
  concepto: "propio",
  slug: "salariul-mediu-pe-economie",
  estado: "publicado",
  requiere: { "md.salariu-mediu": "numero", "md.plafon-salarii-medii": "numero", "md.salariu-minim": "numero" },
  campos: [
    { id: "salariu", tipo: "moneda", etiqueta: "Salariul dumneavoastră brut lunar (opțional)", min: 0, requerido: false, ayuda: "Îl comparăm cu salariul mediu pe economie." },
  ],
  calcular(e, v) {
    const mediu = v["md.salariu-mediu"];
    return {
      mediu,
      anual: mediu * 12,
      plafon: mediu * v["md.plafon-salarii-medii"],
      minimLaMediu: Number(((v["md.salariu-minim"] / mediu) * 100).toFixed(2)),
      procent: e.salariu === null || e.salariu <= 0 ? null : Number(((e.salariu / mediu) * 100).toFixed(2)),
    };
  },
  resultado: [
    { clave: "mediu", etiqueta: "Salariul mediu lunar pe economie, prognozat", formato: "moneda", destacada: true },
    { clave: "procent", etiqueta: "Salariul dumneavoastră față de cel mediu", formato: "porcentaje", decimales: 1 },
    { clave: "anual", etiqueta: "Salariul mediu pe an", formato: "moneda" },
    { clave: "plafon", etiqueta: "Plafonul lunar al venitului asigurat pentru indemnizații", formato: "moneda" },
    { clave: "minimLaMediu", etiqueta: "Salariul minim față de cel mediu", formato: "porcentaje", decimales: 1 },
  ],
});
