import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";
import { semanalDesdeMensual } from "../lib/pago";

export default definirCalculadora({
  id: "bz.maternity-leave-calculator",
  mercado: "bz",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "bz.maternity-weeks": "numero",
    "bz.maternity-before-max": "numero",
    "bz.maternity-before-mandatory": "numero",
    "bz.maternity-after-mandatory": "numero",
    "bz.maternity-qualifying-days": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of confinement", porDefecto: "hoy" },
    { id: "antes", tipo: "entero", etiqueta: "Weeks of leave you want before that date", min: 0, max: 7, porDefecto: 4 },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 2000 },
    { id: "servicio", tipo: "entero", etiqueta: "Days with this employer in the last 12 months", min: 0, max: 366, porDefecto: 250 },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.parto)) throw new ErrorEntrada("Enter the expected date of confinement.", "parto");
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly pay.", "sueldo");
    const total = v["bz.maternity-weeks"];
    const maximoAntes = v["bz.maternity-before-max"];
    const obligatorioAntes = v["bz.maternity-before-mandatory"];
    if (e.antes > maximoAntes) throw new ErrorEntrada(`You can take at most ${maximoAntes} weeks before the expected date.`, "antes");
    if (e.antes < obligatorioAntes) throw new ErrorEntrada(`The last ${obligatorioAntes} weeks before the expected date are mandatory leave.`, "antes");
    const despues = total - e.antes;
    const inicio = sumarDias(e.parto, -e.antes * 7);
    const ultimo = sumarDias(e.parto, despues * 7 - 1);
    const elegible = e.servicio >= v["bz.maternity-qualifying-days"];
    const observaciones = [
      `The last ${obligatorioAntes} weeks before and the first ${v["bz.maternity-after-mandatory"]} weeks after the expected date are mandatory.`,
      "Apply in writing at least ten weeks before the expected date, with a medical certificate that states the date.",
      "If you also receive the Social Security maternity allowance, your employer pays only the difference between that allowance and your full pay.",
    ];
    if (!elegible) observaciones.unshift(`Full pay needs at least ${v["bz.maternity-qualifying-days"]} days with the same employer in the 12 months before the birth. Without them the leave is unpaid.`);
    return {
      inicio,
      ultimo,
      regreso: sumarDias(ultimo, 1),
      semanasDespues: despues,
      pago: elegible ? redondear(semanalDesdeMensual(e.sueldo) * total) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "First day of leave", formato: "fecha", destacada: true },
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Day you return to work", formato: "fecha" },
    { clave: "semanasDespues", etiqueta: "Weeks of leave after the expected date", formato: "semanas" },
    { clave: "pago", etiqueta: "Full pay for the whole leave", formato: "moneda", ocultarSiCero: true },
  ],
});
