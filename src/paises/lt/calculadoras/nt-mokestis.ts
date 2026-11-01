import { definirCalculadora, aplicarEscalaMarginal } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.nt-mokestis",
  mercado: "lt",
  concepto: "propio",
  slug: "nt-mokestis",
  estado: "borrador",
  requiere: {
    "lt.nt-tarifai": "escala",
  },
  campos: [
    { id: "verte", tipo: "moneda", etiqueta: "Nekilnojamojo turto mokestinė vertė", min: 0, porDefecto: 150000 },
  ],
  calcular(e, v, { redondear }) {
    const mokestis = redondear(aplicarEscalaMarginal(v["lt.nt-tarifai"], e.verte));
    return { mokestis, dalis: e.verte > 0 ? (mokestis / e.verte) * 100 : 0 };
  },
  resultado: [
    { clave: "mokestis", etiqueta: "NT mokestis per metus", formato: "moneda", destacada: true },
    { clave: "dalis", etiqueta: "Mokesčio dalis nuo vertės", formato: "porcentaje" },
  ],
});
