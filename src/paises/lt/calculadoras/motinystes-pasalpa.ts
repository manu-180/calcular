import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.motinystes-pasalpa",
  mercado: "lt",
  concepto: "propio",
  slug: "motinystes-pasalpa",
  estado: "borrador",
  requiere: {
    "lt.motinystes-procentas": "numero",
    "lt.motinystes-dienos": "numero",
  },
  campos: [
    { id: "vidutinis", tipo: "moneda", etiqueta: "Vidutinis mėnesio darbo užmokestis", min: 0, porDefecto: 2000 },
  ],
  calcular(e, v, { redondear }) {
    const perMenesi = porcentaje(e.vidutinis, v["lt.motinystes-procentas"]);
    const dienos = v["lt.motinystes-dienos"];
    return { viso: redondear((perMenesi * dienos) / 30), perMenesi: redondear(perMenesi), dienos };
  },
  resultado: [
    { clave: "viso", etiqueta: "Pašalpa už visą laikotarpį", formato: "moneda", destacada: true },
    { clave: "perMenesi", etiqueta: "Pašalpa per mėnesį", formato: "moneda" },
    { clave: "dienos", etiqueta: "Laikotarpio trukmė", formato: "dias" },
  ],
});
