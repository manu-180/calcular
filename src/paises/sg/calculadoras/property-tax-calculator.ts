import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { desgloseEscala } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.property-tax-calculator",
  mercado: "sg",
  concepto: "propio",
  slug: "property-tax-calculator",
  estado: "publicado",
  requiere: {
    "sg.impuesto-propiedad-ocupada": "escala",
    "sg.impuesto-propiedad-no-ocupada": "escala",
    "sg.impuesto-propiedad-otros": "numero",
  },
  campos: [
    { id: "valorAnual", tipo: "moneda", etiqueta: "Annual Value (AV) of the property", min: 0, porDefecto: 36000, ayuda: "The yearly rent IRAS estimates the property could fetch, based on similar properties." },
    {
      id: "uso",
      tipo: "opcion",
      etiqueta: "How the property is used",
      opciones: [
        { valor: "ocupada", etiqueta: "Home you live in (owner-occupied)" },
        { valor: "no-ocupada", etiqueta: "Home you rent out or leave empty" },
        { valor: "otros", etiqueta: "Commercial or industrial property" },
      ],
      porDefecto: "ocupada",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valorAnual < 0) throw new ErrorEntrada("Enter the Annual Value.", "valorAnual");
    let impuesto: number;
    let observaciones: string[];
    if (entrada.uso === "otros") {
      impuesto = redondear((entrada.valorAnual * v["sg.impuesto-propiedad-otros"]) / 100);
      observaciones = [`Non-residential property is taxed at a flat ${v["sg.impuesto-propiedad-otros"]}% of the Annual Value.`];
    } else {
      const escala = entrada.uso === "ocupada" ? v["sg.impuesto-propiedad-ocupada"] : v["sg.impuesto-propiedad-no-ocupada"];
      impuesto = redondear(aplicarEscalaMarginal(escala, entrada.valorAnual));
      observaciones = desgloseEscala(escala, entrada.valorAnual, redondear);
    }
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      efectiva: entrada.valorAnual > 0 ? (impuesto / entrada.valorAnual) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Property tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Per month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of the Annual Value", formato: "porcentaje", decimales: 2 },
  ],
});
