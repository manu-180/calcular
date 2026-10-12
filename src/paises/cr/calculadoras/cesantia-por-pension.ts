import { definirCalculadora } from "@/motor/calculo";
import { prestacionesSinPreaviso } from "../reglas";

export default definirCalculadora({
  id: "cr.cesantia-por-pension",
  mercado: "cr",
  concepto: "propio",
  slug: "cesantia-por-pension",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.cesantia-dias-menos-de-un-anio": "mapa",
    "cr.cesantia-dias-por-anio": "mapa",
    "cr.cesantia-tope-anios": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio de los últimos seis meses", ayuda: "Bruto, con horas extra y comisiones.", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo antes de pensionarse", porDefecto: "hoy" },
    { id: "vacaciones", tipo: "numero", etiqueta: "Días de vacaciones que no disfrutó", min: 0, porDefecto: 0 },
    {
      id: "salariosAguinaldo",
      tipo: "moneda",
      etiqueta: "Salarios ganados desde el 1 de diciembre",
      ayuda: "Si lo deja vacío, lo estimamos con su salario promedio.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = prestacionesSinPreaviso(entrada, valores, redondear);
    return {
      ...r,
      observaciones: [...r.observaciones, "Vale para la pensión de la CCSS y para los demás regímenes de pensiones del Estado y sus instituciones."],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "diasCesantia", etiqueta: "Días de cesantía", formato: "dias" },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a recibir", formato: "moneda", destacada: true },
  ],
});
