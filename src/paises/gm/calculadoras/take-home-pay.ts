import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { payeMensual, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "gm.take-home-pay",
  mercado: "gm",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "gm.paye-bands": "escala",
    "gm.npf-employee-rate": "numero",
    "gm.npf-employer-rate": "numero",
    "gm.fps-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 15000 },
    { id: "subsidios", tipo: "moneda", etiqueta: "Allowances a month (transport, housing, risk)", min: 0, porDefecto: 0 },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Your pension scheme",
      opciones: [
        { valor: "npf", etiqueta: "National Provident Fund (most private employers)" },
        { valor: "fps", etiqueta: "Federated Pension Scheme (employer pays it all)" },
        { valor: "ninguno", etiqueta: "None (civil service or not registered)" },
      ],
      porDefecto: "npf",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your basic salary.", "basico");
    const bruto = entrada.basico + entrada.subsidios;
    const paye = redondear(payeMensual(v["gm.paye-bands"], bruto));
    const npf = entrada.esquema === "npf" ? redondear(porcentaje(entrada.basico, v["gm.npf-employee-rate"])) : 0;
    const neto = redondear(bruto - paye - npf);
    return {
      neto,
      bruto: redondear(bruto),
      paye,
      npf,
      anual: redondear(neto * 12),
      marginal: tasaMarginal(v["gm.paye-bands"], bruto * 12),
      porcentajeNeto: (neto / bruto) * 100,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay a month", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE income tax", formato: "moneda" },
    { clave: "npf", etiqueta: "Your NPF contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top band rate", formato: "porcentaje", decimales: 0 },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "basico", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { subsidios: 0, esquema: "npf" } },
});
