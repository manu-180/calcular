import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_ANIO, DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.vacaciones",
  mercado: "gt",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "gt.vacaciones-dias-habiles": "numero",
    "gt.vacaciones-dias-minimos": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio del último año",
      min: 0,
      ayuda: "Con horas extra. Si trabaja en una empresa agrícola o ganadera, use el promedio de los últimos tres meses.",
    },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "Su situación",
      opciones: [
        { valor: "anio-completo", etiqueta: "Cumplió un año de trabajo" },
        { valor: "proporcional", etiqueta: "Dejó de trabajar antes de cumplir el año" },
      ],
      porDefecto: "anio-completo",
    },
    {
      id: "diasTrabajados",
      tipo: "entero",
      etiqueta: "Días trabajados desde su último aniversario",
      min: 1,
      max: 365,
      requerido: false,
      ayuda: "Solo si dejó de trabajar antes de cumplir el año.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const anuales = valores["gt.vacaciones-dias-habiles"];
    let dias = anuales;
    if (entrada.situacion === "proporcional") {
      if (entrada.diasTrabajados === null) throw new ErrorEntrada("Indique cuántos días trabajó desde su último aniversario.", "diasTrabajados");
      dias = redondear((anuales * Math.min(entrada.diasTrabajados, DIAS_ANIO)) / DIAS_ANIO);
    }
    const diario = redondear(entrada.salario / DIAS_MES);
    const observaciones: string[] = [];
    if (entrada.situacion === "anio-completo") {
      observaciones.push("Las vacaciones se gozan con goce de salario. Solo se pagan en dinero si la relación laboral termina sin haberlas tomado.");
    } else {
      observaciones.push("Al terminar la relación laboral, el patrono le paga en dinero la parte proporcional.");
    }
    observaciones.push(`Si su contrato no le pide trabajar todos los días, necesita al menos ${valores["gt.vacaciones-dias-minimos"]} días trabajados en el año.`);
    return { dias, diario, monto: redondear(diario * dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días hábiles de vacaciones", formato: "numero", decimales: 2 },
    { clave: "diario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "monto", etiqueta: "Valor de sus vacaciones", formato: "moneda", destacada: true },
  ],
});
