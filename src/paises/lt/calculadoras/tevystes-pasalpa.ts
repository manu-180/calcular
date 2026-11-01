import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.tevystes-pasalpa",
  mercado: "lt",
  concepto: "propio",
  slug: "tevystes-pasalpa",
  estado: "borrador",
  requiere: {
    "lt.tevystes-procentas": "numero",
    "lt.tevystes-dienos": "numero",
  },
  campos: [
    { id: "vidutinis", tipo: "moneda", etiqueta: "Vidutinis mėnesio darbo užmokestis", min: 0, porDefecto: 2000 },
  ],
  calcular(e, v, { redondear }) {
    const perMenesi = porcentaje(e.vidutinis, v["lt.tevystes-procentas"]);
    const dienos = v["lt.tevystes-dienos"];
    return { viso: redondear((perMenesi * dienos) / 30), perMenesi: redondear(perMenesi), dienos };
  },
  resultado: [
    { clave: "viso", etiqueta: "Pašalpa už visą laikotarpį", formato: "moneda", destacada: true },
    { clave: "perMenesi", etiqueta: "Pašalpa per mėnesį", formato: "moneda" },
    { clave: "dienos", etiqueta: "Laikotarpio trukmė", formato: "dias" },
  ],
});
