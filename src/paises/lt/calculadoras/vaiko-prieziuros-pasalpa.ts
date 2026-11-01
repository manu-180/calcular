import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.vaiko-prieziuros-pasalpa",
  mercado: "lt",
  concepto: "propio",
  slug: "vaiko-prieziuros-pasalpa",
  estado: "borrador",
  requiere: {
    "lt.vaiko-prieziuros-procentai": "mapa",
  },
  campos: [
    { id: "vidutinis", tipo: "moneda", etiqueta: "Vidutinis mėnesio darbo užmokestis", min: 0, porDefecto: 2000 },
    { id: "trukme", tipo: "opcion-dato", etiqueta: "Atostogų trukmė", dato: "lt.vaiko-prieziuros-procentai" },
  ],
  calcular(e, v, { redondear }) {
    const proc = enMapa(v["lt.vaiko-prieziuros-procentai"], e.trukme);
    return { perMenesi: redondear(porcentaje(e.vidutinis, proc)), proc };
  },
  resultado: [
    { clave: "perMenesi", etiqueta: "Pašalpa per mėnesį", formato: "moneda", destacada: true },
    { clave: "proc", etiqueta: "Pašalpos dydis", formato: "porcentaje" },
  ],
});
