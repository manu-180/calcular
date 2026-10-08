import { definirCalculadora, enMapa } from "@/motor/calculo";
import { irSalarial } from "../prestaciones";

export default definirCalculadora({
  id: "ni.ir-salarial",
  mercado: "ni",
  concepto: "impuesto-renta",
  slug: "ir-salarial",
  estado: "publicado",
  requiere: {
    "ni.inss-laboral": "mapa",
    "ni.ir-rentas-trabajo": "escala",
    "ni.ir-renta-exenta": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    { id: "regimen", tipo: "opcion-dato", dato: "ni.inss-laboral", etiqueta: "Régimen del INSS", porDefecto: "integral" },
  ],
  calcular(entrada, valores, { redondear }) {
    const escala = valores["ni.ir-rentas-trabajo"];
    const r = irSalarial(entrada.salario, enMapa(valores["ni.inss-laboral"], entrada.regimen), escala, redondear);
    let marginal = 0;
    for (const f of escala) if (r.rentaNetaAnual > f.desde) marginal = f.tasa;
    const efectiva = entrada.salario > 0 ? redondear((r.irMensual / entrada.salario) * 100) : 0;
    const observaciones = ["Es la retención mensual del empleador. Al cerrar el año, el empleador liquida el IR con lo que de verdad cobraste."];
    if (r.irAnual === 0) observaciones.unshift("Tu renta neta del año queda en el tramo exento: no te retienen IR.");
    return {
      inss: r.inss,
      rentaNetaAnual: r.rentaNetaAnual,
      irAnual: r.irAnual,
      irMensual: r.irMensual,
      marginal,
      efectiva,
      observaciones,
    };
  },
  resultado: [
    { clave: "inss", etiqueta: "INSS laboral del mes (se descuenta antes del IR)", formato: "moneda" },
    { clave: "rentaNetaAnual", etiqueta: "Renta neta del año", formato: "moneda" },
    { clave: "irAnual", etiqueta: "IR del año", formato: "moneda" },
    { clave: "irMensual", etiqueta: "Retención de IR por mes", formato: "moneda", destacada: true },
    { clave: "marginal", etiqueta: "Tramo de la tarifa", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "Lo que representa sobre tu salario bruto", formato: "porcentaje", decimales: 2 },
  ],
});
