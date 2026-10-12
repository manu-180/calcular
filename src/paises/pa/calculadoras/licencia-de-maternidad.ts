import { definirCalculadora, enMapa } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { semanalDeMensual } from "../reglas";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "pa.licencia-de-maternidad",
  mercado: "pa",
  concepto: "propio",
  slug: "licencia-de-maternidad",
  estado: "publicado",
  requiere: {
    "pa.maternidad-semanas": "mapa",
  },
  campos: [
    {
      id: "fechaParto",
      tipo: "fecha",
      etiqueta: "Fecha probable del parto",
      ayuda: "La que dice tu certificado médico.",
    },
    { id: "salario", tipo: "moneda", etiqueta: "Último salario mensual", min: 0 },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio mensual de los últimos 180 días",
      ayuda: "Si ganas comisiones u horas extra. Si lo dejas vacío, usamos el último salario.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const antes = enMapa(valores["pa.maternidad-semanas"], "antes");
    const despues = enMapa(valores["pa.maternidad-semanas"], "despues");
    const semanas = antes + despues;
    const mensual = Math.max(entrada.salario, entrada.promedio ?? 0);
    const semanal = semanalDeMensual(mensual);
    const observaciones = [
      "La Caja de Seguro Social paga el subsidio de maternidad y tu empleador cubre la diferencia hasta tu salario completo.",
      "Si el parto se atrasa, igual te corresponden las semanas completas después del parto.",
    ];
    if (entrada.promedio !== null && entrada.promedio > entrada.salario) observaciones.unshift("Usamos el promedio de 180 días porque es más alto que tu último salario.");
    return {
      inicio: sumarDias(entrada.fechaParto, -antes * DIAS_SEMANA),
      ultimoDia: sumarDias(entrada.fechaParto, despues * DIAS_SEMANA - 1),
      regreso: sumarDias(entrada.fechaParto, despues * DIAS_SEMANA),
      semanas,
      salarioSemanal: redondear(semanal),
      total: redondear(semanal * semanas),
      observaciones,
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza tu licencia", formato: "fecha" },
    { clave: "ultimoDia", etiqueta: "Último día de licencia (si el parto es en la fecha probable)", formato: "fecha" },
    { clave: "regreso", etiqueta: "Vuelves a trabajar", formato: "fecha" },
    { clave: "semanas", etiqueta: "Semanas de licencia", formato: "numero", decimales: 0 },
    { clave: "salarioSemanal", etiqueta: "Salario semanal", formato: "moneda" },
    { clave: "total", etiqueta: "Pago total de la licencia", formato: "moneda", destacada: true },
  ],
});
