import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.darbo-vietos-kaina",
  mercado: "lt",
  concepto: "costo-empleador",
  slug: "darbo-vietos-kaina",
  estado: "borrador",
  requiere: {
    "lt.vsd-darbdavio": "mapa",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mėnesio atlyginimas ant popieriaus", min: 0, porDefecto: 2000 },
    { id: "sutartis", tipo: "opcion-dato", etiqueta: "Darbo sutartis", dato: "lt.vsd-darbdavio" },
  ],
  calcular(e, v, { redondear }) {
    const imokos = redondear(porcentaje(e.bruto, enMapa(v["lt.vsd-darbdavio"], e.sutartis)));
    return { kaina: redondear(e.bruto + imokos), imokos, perMetus: redondear((e.bruto + imokos) * 12) };
  },
  resultado: [
    { clave: "kaina", etiqueta: "Darbo vietos kaina per mėnesį", formato: "moneda", destacada: true },
    { clave: "imokos", etiqueta: "Darbdavio įmokos", formato: "moneda" },
    { clave: "perMetus", etiqueta: "Darbo vietos kaina per metus", formato: "moneda" },
  ],
});
