import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { salarioDiario } from "../reglas";

export default definirCalculadora({
  id: "hn.accidente-de-trabajo",
  mercado: "hn",
  concepto: "propio",
  slug: "accidente-de-trabajo",
  estado: "publicado",
  requiere: {
    "hn.riesgo-incapacidad-temporal": "numero",
    "hn.riesgo-incapacidad-max-dias": "numero",
    "hn.riesgo-muerte-dias": "numero",
    "hn.riesgo-funeral-meses": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual al momento del accidente",
      ayuda: "La base nunca puede ser menor que el salario mínimo.",
      min: 0,
    },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Qué pasó",
      opciones: [
        { valor: "incapacidad-temporal", etiqueta: "Incapacidad temporal (no puede trabajar por un tiempo)" },
        { valor: "muerte", etiqueta: "El trabajador falleció" },
      ],
      porDefecto: "incapacidad-temporal",
    },
    { id: "diasIncapacidad", tipo: "entero", etiqueta: "Días de incapacidad", min: 0, porDefecto: 30, ayuda: "Solo para incapacidad temporal." },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = salarioDiario(entrada.salario);
    const observaciones: string[] = [];
    let diasPagados = 0;
    let incapacidad = 0;
    let funeral = 0;
    let dependientes = 0;
    if (entrada.caso === "incapacidad-temporal") {
      if (entrada.diasIncapacidad <= 0) throw new ErrorEntrada("Indique cuántos días duró la incapacidad.", "diasIncapacidad");
      const maximo = valores["hn.riesgo-incapacidad-max-dias"];
      diasPagados = Math.min(entrada.diasIncapacidad, maximo);
      incapacidad = redondear(porcentaje(diario, valores["hn.riesgo-incapacidad-temporal"]) * diasPagados);
      if (entrada.diasIncapacidad > maximo) observaciones.push("Pasado un año, la incapacidad se trata como permanente y se indemniza con la tabla de valuación de incapacidades.");
      observaciones.push("Se paga desde el primer día. A los tres meses se puede revisar si la incapacidad pasa a permanente.");
    } else {
      funeral = redondear(entrada.salario * valores["hn.riesgo-funeral-meses"]);
      dependientes = redondear(diario * valores["hn.riesgo-muerte-dias"]);
      observaciones.push("La indemnización se reparte en partes iguales entre la esposa o compañera, los hijos menores y los padres que dependían del trabajador, salvo testamento.");
    }
    observaciones.push("Si el patrono tenía asegurado al trabajador contra riesgos profesionales, por ejemplo en el IHSS, paga el seguro según sus propias reglas.");
    return {
      diasPagados,
      incapacidad,
      funeral,
      dependientes,
      total: redondear(incapacidad + funeral + dependientes),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasPagados", etiqueta: "Días que se pagan", formato: "dias", ocultarSiCero: true },
    { clave: "incapacidad", etiqueta: "Pago por la incapacidad temporal", formato: "moneda", ocultarSiCero: true },
    { clave: "funeral", etiqueta: "Gastos de funeral", formato: "moneda", ocultarSiCero: true },
    { clave: "dependientes", etiqueta: "Indemnización para los dependientes", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total", formato: "moneda", destacada: true },
  ],
});
