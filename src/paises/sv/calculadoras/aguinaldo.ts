import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Salario diario = mensual / 30, como en las planillas. El decreto de salario mínimo publica un
// diario menor (mensual × 12 / 365) y su art. 7 lo pone como piso de las prestaciones: dividir por 30
// nunca queda por debajo de ese piso.
const DIAS_DEL_MES = 30;
const DIAS_DEL_ANIO = 365;
const TRAMO_PROPORCIONAL = "uno-a-tres";

export default definirCalculadora({
  id: "sv.aguinaldo",
  mercado: "sv",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {
    "sv.aguinaldo-dias": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Su salario básico a la fecha de pago, sin horas extra.",
      min: 0,
    },
    {
      id: "antiguedad",
      tipo: "opcion",
      etiqueta: "Tiempo trabajando con el mismo patrono",
      opciones: [
        { valor: "menos-de-uno", etiqueta: "Menos de 1 año" },
        { valor: "uno-a-tres", etiqueta: "De 1 a menos de 3 años" },
        { valor: "tres-a-diez", etiqueta: "De 3 a menos de 10 años" },
        { valor: "diez-o-mas", etiqueta: "10 años o más" },
      ],
      porDefecto: "uno-a-tres",
    },
    {
      id: "diasTrabajados",
      tipo: "entero",
      etiqueta: "Días trabajados (solo si tiene menos de 1 año)",
      ayuda: "Cuente desde su primer día de trabajo.",
      min: 1,
      max: 365,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const proporcional = entrada.antiguedad === "menos-de-uno";
    if (proporcional && entrada.diasTrabajados === null) {
      throw new ErrorEntrada("Indique cuántos días lleva trabajando.", "diasTrabajados");
    }
    const diario = entrada.salario / DIAS_DEL_MES;
    const dias = enMapa(valores["sv.aguinaldo-dias"], proporcional ? TRAMO_PROPORCIONAL : entrada.antiguedad);
    const diasAguinaldo = proporcional ? (dias * (entrada.diasTrabajados ?? 0)) / DIAS_DEL_ANIO : dias;
    const observaciones: string[] = [];
    if (proporcional) observaciones.push(`Con menos de un año cobra la parte proporcional de ${dias} días de salario.`);
    return {
      diario: redondear(diario),
      diasAguinaldo: redondear(diasAguinaldo),
      aguinaldo: redondear(diario * diasAguinaldo),
      observaciones,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "diasAguinaldo", etiqueta: "Días de salario que le corresponden", formato: "dias" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo", formato: "moneda", destacada: true },
  ],
});
