import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { desgloseEscala, dolares, impuestoResidente, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.income-tax-calculator",
  mercado: "sg",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "sg.renta-residentes": "escala",
    "sg.alivio-ingreso-ganado": "mapa",
    "sg.tope-alivios": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Yearly employment income (salary and bonus)", min: 0, porDefecto: 72000 },
    {
      id: "edad",
      tipo: "opcion-dato",
      dato: "sg.alivio-ingreso-ganado",
      etiqueta: "Your age on 31 December of the income year",
      porDefecto: "menos-55",
    },
    { id: "cpf", tipo: "moneda", etiqueta: "Your own CPF contributions in the year", min: 0, porDefecto: 0, ayuda: "Citizens and PRs: the employee CPF on your payslips. Leave it at zero if you do not pay CPF." },
    { id: "otros", tipo: "moneda", etiqueta: "Other reliefs you can claim", min: 0, porDefecto: 0, ayuda: "For example child, parent, spouse or SRS relief." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your yearly income.", "ingreso");
    const escala = v["sg.renta-residentes"];
    const eir = Math.min(enMapa(v["sg.alivio-ingreso-ganado"], entrada.edad), entrada.ingreso);
    const pedidos = eir + entrada.cpf + entrada.otros;
    const tope = v["sg.tope-alivios"];
    const alivios = Math.min(pedidos, tope);
    const gravable = Math.max(0, entrada.ingreso - alivios);
    const impuesto = redondear(impuestoResidente(gravable, escala));
    const observaciones: string[] = [];
    if (pedidos > tope) observaciones.push(`Your reliefs add up to ${dolares(pedidos)}, but the total you can claim in a year is capped at ${dolares(tope)}.`);
    observaciones.push(...desgloseEscala(escala, gravable, redondear));
    observaciones.push("These are the rates for tax residents. Any Personal Income Tax Rebate announced for the year comes off the bill afterwards.");
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      alivios,
      gravable,
      efectiva: (impuesto / entrada.ingreso) * 100,
      marginal: tasaMarginal(escala, gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Spread over 12 months", formato: "moneda" },
    { clave: "alivios", etiqueta: "Total reliefs", formato: "moneda" },
    { clave: "gravable", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your income", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Tax rate on your next dollar", formato: "porcentaje", decimales: 1 },
  ],
});
