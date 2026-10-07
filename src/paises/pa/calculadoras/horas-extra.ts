import { definirCalculadora, enMapa } from "@/motor/calculo";

const SEMANAS_POR_MES = 52 / 12;

export default definirCalculadora({
  id: "pa.horas-extra",
  mercado: "pa",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "pa.jornada-semanal": "mapa",
    "pa.recargo-horas-extra": "mapa",
    "pa.horas-extra-maximo-semana": "numero",
    "pa.horas-extra-maximo-dia": "numero",
    "pa.recargo-exceso-horas-extra": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada ordinaria",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (entre las 6 a. m. y las 6 p. m.)" },
        { valor: "nocturna", etiqueta: "Nocturna (más de tres horas entre las 6 p. m. y las 6 a. m.)" },
        { valor: "mixta", etiqueta: "Mixta (de día y hasta tres horas de noche)" },
      ],
      porDefecto: "diurna",
    },
    {
      id: "horasDiurnas",
      tipo: "numero",
      etiqueta: "Horas extra de día en la semana",
      ayuda: "Entre las 6 a. m. y las 6 p. m.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "horasNocturnas",
      tipo: "numero",
      etiqueta: "Horas extra de noche en la semana",
      ayuda: "Entre las 6 p. m. y las 6 a. m., o al alargar una jornada mixta que empezó de día.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "horasProlongacion",
      tipo: "numero",
      etiqueta: "Horas extra al alargar una jornada nocturna",
      ayuda: "También al alargar una jornada mixta que empezó de noche.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasSemana = enMapa(valores["pa.jornada-semanal"], entrada.jornada);
    const recargos = valores["pa.recargo-horas-extra"];
    const hora = entrada.salario / (horasSemana * SEMANAS_POR_MES);
    const pago = (horas: number, recargo: number) => horas * hora * (1 + recargo / 100);

    const diurnas = redondear(pago(entrada.horasDiurnas, enMapa(recargos, "diurna")));
    const nocturnas = redondear(pago(entrada.horasNocturnas, enMapa(recargos, "nocturna")));
    const prolongacion = redondear(pago(entrada.horasProlongacion, enMapa(recargos, "prolongacion-nocturna")));

    const totalHoras = entrada.horasDiurnas + entrada.horasNocturnas + entrada.horasProlongacion;
    const maximo = valores["pa.horas-extra-maximo-semana"];
    const horasExceso = Math.max(totalHoras - maximo, 0);
    const exceso = redondear(horasExceso * hora * (valores["pa.recargo-exceso-horas-extra"] / 100));

    const observaciones: string[] = [];
    if (horasExceso > 0) {
      observaciones.push(`Pasaste el límite de ${maximo} horas extra por semana. Las ${horasExceso} horas de más llevan un recargo adicional y el empleador puede ser multado.`);
    }
    observaciones.push(`Tampoco se pueden trabajar más de ${valores["pa.horas-extra-maximo-dia"]} horas extra en un mismo día.`);

    return {
      valorHora: redondear(hora),
      diurnas,
      nocturnas,
      prolongacion,
      exceso,
      total: redondear(diurnas + nocturnas + prolongacion + exceso),
      observaciones,
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda" },
    { clave: "diurnas", etiqueta: "Horas extra de día", formato: "moneda", ocultarSiCero: true },
    { clave: "nocturnas", etiqueta: "Horas extra de noche", formato: "moneda", ocultarSiCero: true },
    { clave: "prolongacion", etiqueta: "Horas extra al alargar la jornada nocturna", formato: "moneda", ocultarSiCero: true },
    { clave: "exceso", etiqueta: "Recargo adicional por pasar el límite semanal", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de horas extra de la semana", formato: "moneda", destacada: true },
  ],
});
