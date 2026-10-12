import { definirCalculadora, enMapa } from "@/motor/calculo";

const MESES_TRIMESTRE = 3;
const SEMANAS_ANIO = 52;

export default definirCalculadora({
  id: "pa.fondo-de-cesantia",
  mercado: "pa",
  concepto: "fondo-cesantia",
  slug: "fondo-de-cesantia",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
    "pa.indemnizacion-semanas": "mapa",
    "pa.fondo-cesantia-indemnizacion": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "De un trabajador, o el total de la planilla mensual si quieres la cuota de toda la empresa.",
      min: 0,
    },
    {
      id: "masDeDiez",
      tipo: "si-no",
      etiqueta: "El trabajador lleva más de diez años en la empresa",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const trimestre = entrada.salario * MESES_TRIMESTRE;
    const semanasIndemnizacion = enMapa(valores["pa.indemnizacion-semanas"], entrada.masDeDiez ? "desde-anio-11" : "primeros-10-anios");
    // Un año de salario son 52 semanas: la prima (una semana por año) es 1/52 de lo pagado, y la
    // indemnización (3.4 semanas por año en los diez primeros) es 3.4/52. Del fondo va todo lo de la
    // prima y el 5 % de lo de la indemnización (art. 229-B).
    const prima = (trimestre * valores["pa.prima-antiguedad-semanas"]) / SEMANAS_ANIO;
    const indemnizacion = (trimestre * semanasIndemnizacion * valores["pa.fondo-cesantia-indemnizacion"]) / 100 / SEMANAS_ANIO;
    const total = prima + indemnizacion;
    return {
      prima: redondear(prima),
      indemnizacion: redondear(indemnizacion),
      trimestral: redondear(total),
      anual: redondear(total * 4),
      porcentaje: redondear((total / trimestre) * 100),
      observaciones: [
        "La cuota se deposita cada trimestre en un fideicomiso con una administradora autorizada, que no puede ser del mismo grupo que la empresa.",
        "Lo de la prima es del trabajador y lo recibe al terminar la relación por cualquier causa. Lo de la indemnización solo lo recibe si el despido fue injustificado, si la renuncia fue justificada o si lo pactan por mutuo acuerdo.",
      ],
    };
  },
  resultado: [
    { clave: "prima", etiqueta: "Cuota trimestral por prima de antigüedad", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Cuota trimestral por indemnización", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Aporte trimestral al fondo", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Aporte en un año", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "Porcentaje sobre los salarios", formato: "porcentaje" },
  ],
});
