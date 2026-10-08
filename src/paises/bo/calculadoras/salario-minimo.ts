import { definirCalculadora } from "@/motor/calculo";

const DIAS_DEL_MES = 30;
const HORAS_POR_DIA = 8;

export default definirCalculadora({
  id: "bo.salario-minimo",
  mercado: "bo",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "bo.salario-minimo": "numero",
    "bo.dolar": "serie",
  },
  campos: [
    {
      id: "haberBasico",
      tipo: "moneda",
      etiqueta: "Su haber básico mensual (opcional)",
      ayuda: "Si lo escribe, le decimos si alcanza el mínimo y cuánto falta.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = valores["bo.salario-minimo"];
    const dolar = valores["bo.dolar"];
    const faltante = entrada.haberBasico === null ? null : redondear(Math.max(0, mensual - entrada.haberBasico));
    const observaciones = ["El salario por día es el mensual dividido 30 y la hora, el diario dividido 8 (jornada de 8 horas)."];
    if (faltante !== null && faltante > 0) observaciones.push("Con jornada completa, el haber básico no puede ser menor al salario mínimo. El empleador tiene que nivelarlo.");
    if (faltante === 0) observaciones.push("Su haber básico alcanza el salario mínimo.");
    return {
      mensual,
      diario: redondear(mensual / DIAS_DEL_MES),
      hora: redondear(mensual / DIAS_DEL_MES / HORAS_POR_DIA),
      enDolares: redondear(mensual / dolar.valor),
      faltante,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario Mínimo Nacional por mes", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Por día", formato: "moneda" },
    { clave: "hora", etiqueta: "Por hora", formato: "moneda" },
    { clave: "enDolares", etiqueta: "En dólares, al tipo de cambio oficial de hoy", formato: "moneda", moneda: "USD" },
    { clave: "faltante", etiqueta: "Le falta para llegar al mínimo", formato: "moneda", ocultarSiCero: true },
  ],
});
