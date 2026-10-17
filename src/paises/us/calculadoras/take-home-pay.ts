import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { escalaDe, ESCALAS, estadoValido, impuestoFederal, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";
import { FICA, ficaEmpleado, OPCIONES_FRECUENCIA, PAGOS_POR_ANIO } from "../lib/nomina";

export default definirCalculadora({
  id: "us.take-home-pay",
  mercado: "us",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    ...FICA,
    "us.standard-deduction": "mapa",
    "us.additional-medicare-threshold": "mapa",
    "us.401k-limit": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Annual salary before taxes", min: 0, porDefecto: 60000 },
    { id: "frecuencia", tipo: "opcion", etiqueta: "How often you get paid", opciones: OPCIONES_FRECUENCIA, porDefecto: "biweekly" },
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "aporte", tipo: "porcentaje", etiqueta: "Traditional 401(k) contribution (% of salary)", min: 0, max: 100, porDefecto: 0 },
    {
      id: "salud",
      tipo: "moneda",
      etiqueta: "Pre-tax health insurance and FSA per year",
      min: 0,
      requerido: false,
      ayuda: "Premiums and flexible spending paid through a cafeteria plan. They lower both income tax and FICA.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const pagos = PAGOS_POR_ANIO[entrada.frecuencia];
    if (!pagos) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const salud = entrada.salud ?? 0;
    if (salud > entrada.sueldo) throw new ErrorEntrada("Pre-tax benefits can't be larger than your salary.", "salud");
    const pedido = (entrada.sueldo * entrada.aporte) / 100;
    const k401 = redondear(Math.min(pedido, valores["us.401k-limit"], entrada.sueldo - salud));
    const salariosFica = entrada.sueldo - salud;
    const fica = ficaEmpleado(valores, salariosFica, enMapa(valores["us.additional-medicare-threshold"], estado), redondear);
    const gravable = Math.max(0, entrada.sueldo - salud - k401 - enMapa(valores["us.standard-deduction"], estado));
    const federal = redondear(impuestoFederal(escalaDe(valores, estado), gravable));
    const netoAnual = redondear(entrada.sueldo - salud - k401 - federal - fica.socialSecurity - fica.medicare - fica.adicional);
    const porPago = (n: number) => redondear(n / pagos);
    const observaciones = ["State and local income taxes are not included. Use your state's tax agency to add them."];
    if (k401 < redondear(pedido)) observaciones.push("Your 401(k) contribution was capped at the yearly employee limit.");
    return {
      bruto: porPago(entrada.sueldo),
      k401: porPago(k401),
      salud: porPago(salud),
      federal: porPago(federal),
      socialSecurity: porPago(fica.socialSecurity),
      medicare: porPago(fica.medicare + fica.adicional),
      neto: porPago(netoAnual),
      netoAnual,
      impuestosAnuales: redondear(federal + fica.socialSecurity + fica.medicare + fica.adicional),
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross pay per paycheck", formato: "moneda" },
    { clave: "k401", etiqueta: "401(k) contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "salud", etiqueta: "Pre-tax health benefits", formato: "moneda", ocultarSiCero: true },
    { clave: "federal", etiqueta: "Federal income tax", formato: "moneda" },
    { clave: "socialSecurity", etiqueta: "Social Security tax", formato: "moneda" },
    { clave: "medicare", etiqueta: "Medicare tax", formato: "moneda" },
    { clave: "neto", etiqueta: "Take-home pay per paycheck", formato: "moneda", destacada: true },
    { clave: "netoAnual", etiqueta: "Take-home pay per year", formato: "moneda" },
    { clave: "impuestosAnuales", etiqueta: "Federal taxes per year", formato: "moneda" },
  ],
});
