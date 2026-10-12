import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.subsidio-por-enfermedad",
  mercado: "uy",
  concepto: "propio",
  slug: "subsidio-por-enfermedad",
  estado: "publicado",
  requiere: {
    "uy.enfermedad-porcentaje": "numero",
    "uy.enfermedad-tope": "numero",
    "uy.enfermedad-dias-sin-pago": "numero",
  },
  campos: [
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio mensual nominal de los últimos 6 meses",
      ayuda: "Lo que cobraste en los 180 días antes del mes en que te enfermaste, sin aguinaldo, dividido entre 6.",
      min: 0,
    },
    { id: "dias", tipo: "entero", etiqueta: "Días de certificación médica", min: 1, max: 730, porDefecto: 10 },
    { id: "internacion", tipo: "si-no", etiqueta: "Estuviste internado (en sanatorio o en domicilio)", ayuda: "Con internación se cobra desde el primer día.", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("La certificación tiene que ser de un día o más.", "dias");
    const mensual = Math.min(porcentaje(entrada.promedio, valores["uy.enfermedad-porcentaje"]), valores["uy.enfermedad-tope"]);
    const diario = mensual / 30;
    const diasPagos = entrada.internacion ? entrada.dias : Math.max(0, entrada.dias - valores["uy.enfermedad-dias-sin-pago"]);
    const subsidio = redondear(diario * diasPagos);
    const observaciones: string[] = [];
    if (porcentaje(entrada.promedio, valores["uy.enfermedad-porcentaje"]) > valores["uy.enfermedad-tope"]) observaciones.push("Llegaste al tope mensual del subsidio.");
    if (!entrada.internacion && entrada.dias <= valores["uy.enfermedad-dias-sin-pago"]) observaciones.push("Las certificaciones cortas no se pagan: el BPS paga desde el cuarto día.");
    observaciones.push("El BPS descuenta del subsidio el aporte personal. Si la enfermedad es por un accidente de trabajo, paga el BSE.");
    return {
      mensual: redondear(mensual),
      diario: redondear(diario),
      diasPagos,
      subsidio,
      aguinaldo: redondear(subsidio / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Subsidio por un mes entero", formato: "moneda" },
    { clave: "diario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "diasPagos", etiqueta: "Días que paga el BPS", formato: "dias" },
    { clave: "subsidio", etiqueta: "Subsidio por la certificación", formato: "moneda", destacada: true },
    { clave: "aguinaldo", etiqueta: "Parte de aguinaldo que también paga el BPS", formato: "moneda" },
  ],
});
