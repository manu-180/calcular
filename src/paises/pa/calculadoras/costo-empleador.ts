import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.costo-empleador",
  mercado: "pa",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "pa.css-empleador": "numero",
    "pa.seguro-educativo-empleador": "numero",
    "pa.css-decimo-empleador": "numero",
    "pa.decimo-divisor": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    {
      id: "riesgoProfesional",
      tipo: "porcentaje",
      etiqueta: "Tasa de riesgos profesionales de tu empresa",
      ayuda: "La fija la Caja de Seguro Social según la actividad. Si no la sabes, déjala vacía.",
      min: 0,
      max: 10,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario } = entrada;
    const css = redondear(porcentaje(salario, valores["pa.css-empleador"]));
    const seguroEducativo = redondear(porcentaje(salario, valores["pa.seguro-educativo-empleador"]));
    const riesgo = entrada.riesgoProfesional === null ? 0 : redondear(porcentaje(salario, entrada.riesgoProfesional));
    const decimo = redondear(salario / valores["pa.decimo-divisor"]);
    const cssDecimo = redondear(porcentaje(decimo, valores["pa.css-decimo-empleador"]));
    const mensual = redondear(salario + css + seguroEducativo + riesgo + decimo + cssDecimo);
    const observaciones = ["No incluye las vacaciones ni el aporte al fondo de cesantía para la prima de antigüedad."];
    if (entrada.riesgoProfesional === null) observaciones.unshift("Falta la cuota de riesgos profesionales. Súmala cuando sepas la tasa de tu empresa.");
    return {
      css,
      seguroEducativo,
      riesgo,
      decimo,
      cssDecimo,
      mensual,
      anual: redondear(mensual * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "css", etiqueta: "Cuota patronal al Seguro Social", formato: "moneda" },
    { clave: "seguroEducativo", etiqueta: "Seguro educativo patronal", formato: "moneda" },
    { clave: "riesgo", etiqueta: "Riesgos profesionales", formato: "moneda", ocultarSiCero: true },
    { clave: "decimo", etiqueta: "Décimo tercer mes (reserva mensual)", formato: "moneda" },
    { clave: "cssDecimo", etiqueta: "Seguro Social patronal sobre el décimo", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual del trabajador", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual", formato: "moneda" },
  ],
});
