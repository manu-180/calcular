import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

const DIAS_SEMANA = 7;

// Día de la semana (0 = domingo) con el método de Sakamoto: el cálculo es puro y no puede usar Date.
function diaDeLaSemana(fecha: FechaISO): number {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const [a, m, d] = fecha.split("-").map(Number);
  const y = m < 3 ? a - 1 : a;
  return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[m - 1] + d) % 7;
}

const esHabil = (fecha: FechaISO) => {
  const dia = diaDeLaSemana(fecha);
  return dia !== 0 && dia !== 6;
};

export default definirCalculadora({
  id: "pa.licencia-de-paternidad",
  mercado: "pa",
  concepto: "propio",
  slug: "licencia-de-paternidad",
  estado: "publicado",
  requiere: {
    "pa.paternidad-dias-habiles": "numero",
    "pa.paternidad-aviso-semanas": "numero",
  },
  campos: [
    {
      id: "fechaNacimiento",
      tipo: "fecha",
      etiqueta: "Fecha de nacimiento (o fecha probable del parto)",
    },
  ],
  calcular(entrada, valores) {
    const dias = valores["pa.paternidad-dias-habiles"];
    let fecha = entrada.fechaNacimiento;
    while (!esHabil(fecha)) fecha = sumarDias(fecha, 1);
    const inicio = fecha;
    let contados = 1;
    while (contados < dias) {
      fecha = sumarDias(fecha, 1);
      if (esHabil(fecha)) contados++;
    }
    let regreso = sumarDias(fecha, 1);
    while (!esHabil(regreso)) regreso = sumarDias(regreso, 1);
    return {
      avisarAntesDe: sumarDias(entrada.fechaNacimiento, -valores["pa.paternidad-aviso-semanas"] * DIAS_SEMANA),
      inicio,
      ultimoDia: fecha,
      regreso,
      observaciones: [
        "Contamos de lunes a viernes. Si en esos días cae un feriado, la licencia se corre un día más.",
        "Los días de licencia se pagan y cuentan como tiempo trabajado. Al volver, presenta el certificado de nacimiento del Registro Civil.",
      ],
    };
  },
  resultado: [
    { clave: "avisarAntesDe", etiqueta: "Avisa a tu empleador a más tardar el", formato: "fecha" },
    { clave: "inicio", etiqueta: "Primer día de licencia", formato: "fecha" },
    { clave: "ultimoDia", etiqueta: "Último día de licencia", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Vuelves a trabajar", formato: "fecha" },
  ],
});
