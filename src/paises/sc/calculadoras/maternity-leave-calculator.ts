import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre, esFechaISO, sumarDias } from "@/motor/vigencia";

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return (anio + "-" + String(mes).padStart(2, "0") + "-" + String(Math.min(d, diasDelMes(anio, mes))).padStart(2, "0")) as FechaISO;
}

// El 3 de enero de 2000 fue lunes: sirve de ancla para saber si un día es sábado o domingo.
function esFinDeSemana(fecha: FechaISO): boolean {
  const n = (((diasEntre("2000-01-03", fecha) % 7) + 7) % 7);
  return n >= 5;
}

export default definirCalculadora({
  id: "sc.maternity-leave-calculator",
  mercado: "sc",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "sc.maternity-paid-weeks": "numero",
    "sc.maternity-weeks-after-birth": "numero",
    "sc.paternity-working-days": "numero",
    "sc.paternity-window-months": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of leave",
      opciones: [
        { valor: "maternity", etiqueta: "Maternity leave" },
        { valor: "paternity", etiqueta: "Paternity leave" },
      ],
      porDefecto: "maternity",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
    { id: "nacimiento", tipo: "fecha", etiqueta: "Date of birth of the child", requerido: false, visibleSi: { tipo: ["paternity"] } },
  ],
  calcular(e, v) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of leave.", "inicio");
    if (e.tipo === "maternity") {
      const ultimo = sumarDias(e.inicio, v["sc.maternity-paid-weeks"] * 7 - 1);
      return {
        ultimo,
        regreso: sumarDias(ultimo, 1),
        limite: null,
        observaciones: [
          "At least " + v["sc.maternity-weeks-after-birth"] + " of the " + v["sc.maternity-paid-weeks"] + " paid weeks must be taken after the birth.",
          "Give your employer notice of your expected date of confinement at least 3 months ahead.",
        ],
      };
    }
    let contados = 0;
    let dia: FechaISO = e.inicio;
    while (true) {
      if (!esFinDeSemana(dia)) contados += 1;
      if (contados >= v["sc.paternity-working-days"]) break;
      dia = sumarDias(dia, 1);
    }
    const limite = e.nacimiento !== null && esFechaISO(e.nacimiento) ? sumarMeses(e.nacimiento, v["sc.paternity-window-months"]) : null;
    return {
      ultimo: dia,
      regreso: sumarDias(dia, 1),
      limite,
      observaciones: [
        "The " + v["sc.paternity-working-days"] + " days are consecutive working days. This calculator counts Monday to Friday, so adjust it if your working week differs.",
        "Paternity leave must be taken within " + v["sc.paternity-window-months"] + " months of the birth, after 12 months with your employer and once probation is over.",
      ],
    };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Day after your leave ends", formato: "fecha" },
    { clave: "limite", etiqueta: "Latest day paternity leave can end", formato: "fecha" },
  ],
});
