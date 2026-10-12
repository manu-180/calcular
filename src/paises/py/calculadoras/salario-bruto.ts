import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.salario-bruto",
  mercado: "py",
  concepto: "propio",
  slug: "salario-bruto",
  estado: "publicado",
  requiere: {
    "py.ips-trabajador": "numero",
  },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Salario neto que querés cobrar en mano", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["py.ips-trabajador"];
    const bruto = redondear(entrada.neto / (1 - tasa / 100));
    const ips = redondear(porcentaje(bruto, tasa));
    return {
      bruto,
      ips,
      neto: bruto - ips,
      observaciones: ["Por redondeo, el neto puede diferir en un guaraní del que pediste."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Salario bruto que tenés que pedir", formato: "moneda", destacada: true },
    { clave: "ips", etiqueta: "Aporte al IPS", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que cobrás en mano", formato: "moneda" },
  ],
});
