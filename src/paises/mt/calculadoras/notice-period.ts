import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";
import { anioDe, diaDeSemana, sumarDias, sumarMeses } from "../lib/fechas";
import { feriados } from "../lib/malta";

// Art. 36(5) de la Employment and Industrial Relations Act: «más de» cada umbral de antigüedad.
function semanasDePreaviso(inicio: FechaISO, aviso: FechaISO, tabla: Readonly<Record<string, number>>): number {
  if (aviso <= sumarMeses(inicio, 1)) return 0;
  if (aviso <= sumarMeses(inicio, 6)) return enMapa(tabla, "over-1-month");
  if (aviso <= sumarMeses(inicio, 24)) return enMapa(tabla, "over-6-months");
  if (aviso <= sumarMeses(inicio, 48)) return enMapa(tabla, "over-2-years");
  const ocho = enMapa(tabla, "over-4-years");
  if (aviso <= sumarMeses(inicio, 84)) return ocho;
  const maximo = enMapa(tabla, "maximum");
  let semanas = ocho;
  while (semanas < maximo && aviso > sumarMeses(inicio, 84 + 12 * (semanas - ocho))) semanas++;
  return semanas;
}

// El preaviso corre desde el día hábil siguiente al aviso (art. 36(7)).
function diaHabilSiguiente(fecha: FechaISO): FechaISO {
  let d = sumarDias(fecha, 1);
  for (;;) {
    const libres = new Set(feriados(anioDe(d)).map((f) => f.fecha));
    const dia = diaDeSemana(d);
    if (dia !== 0 && dia !== 6 && !libres.has(d)) return d;
    d = sumarDias(d, 1);
  }
}

function antiguedad(inicio: FechaISO, aviso: FechaISO): string {
  let meses = 0;
  while (sumarMeses(inicio, meses + 1) <= aviso) meses++;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const partes: string[] = [];
  if (anios > 0) partes.push(`${anios} year${anios === 1 ? "" : "s"}`);
  if (resto > 0 || anios === 0) partes.push(`${resto} month${resto === 1 ? "" : "s"}`);
  return partes.join(" and ");
}

export default definirCalculadora({
  id: "mt.notice-period",
  mercado: "mt",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: { "mt.notice-weeks": "mapa" },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date you started with this employer", porDefecto: "2022-03-01" },
    { id: "aviso", tipo: "fecha", etiqueta: "Date notice is given", porDefecto: "hoy" },
    { id: "semanal", tipo: "moneda", etiqueta: "Basic weekly wage (optional, for pay in lieu of notice)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (!esFechaISO(entrada.inicio)) throw new ErrorEntrada("Enter the date you started.", "inicio");
    if (!esFechaISO(entrada.aviso)) throw new ErrorEntrada("Enter the date notice is given.", "aviso");
    if (entrada.aviso < entrada.inicio) throw new ErrorEntrada("Notice cannot be given before you started.", "aviso");
    const semanas = semanasDePreaviso(entrada.inicio, entrada.aviso, v["mt.notice-weeks"]);
    const observaciones: string[] = [];
    let empieza: FechaISO | null = null;
    let termina: FechaISO | null = null;
    if (semanas === 0) {
      observaciones.push("With one month of service or less, no notice period is required by law.");
    } else {
      empieza = diaHabilSiguiente(entrada.aviso);
      termina = sumarDias(empieza, semanas * 7 - 1);
    }
    let empleador: number | null = null;
    let empleado: number | null = null;
    if (entrada.semanal !== null && semanas > 0) {
      empleador = redondear(entrada.semanal * semanas);
      empleado = redondear(empleador / 2);
    }
    observaciones.push("These periods apply to contracts for an indefinite time. Technical, administrative, executive or managerial posts can agree longer periods.");
    return { semanas, antiguedad: antiguedad(entrada.inicio, entrada.aviso), empieza, termina, empleador, empleado, observaciones };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Notice period", formato: "semanas", destacada: true },
    { clave: "antiguedad", etiqueta: "Length of service", formato: "texto" },
    { clave: "empieza", etiqueta: "Notice starts on", formato: "fecha" },
    { clave: "termina", etiqueta: "Notice ends on", formato: "fecha" },
    { clave: "empleador", etiqueta: "If the employer gives no notice, it pays you", formato: "moneda" },
    { clave: "empleado", etiqueta: "If you leave without notice, you owe the employer", formato: "moneda" },
  ],
});
