import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_SEMANA } from "../lib/comun";

export default definirCalculadora({
  id: "ls.annual-leave",
  mercado: "ls",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "ls.leave-days-per-month": "numero",
    "ls.leave-minimum-days": "numero",
    "ls.leave-pay-minimum-months": "numero",
    "ls.hours-divisor": "mapa",
    "ls.daily-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your monthly wage", min: 0, porDefecto: 6000, ayuda: "Include any cost-of-living allowance. Leave out bonuses." },
    { id: "semana", tipo: "opcion", etiqueta: "You normally work", opciones: OPCIONES_SEMANA, porDefecto: "five-day" },
    { id: "meses", tipo: "entero", etiqueta: "Completed months of continuous employment this leave year", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken this year", min: 0, max: 366, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const ganados = entrada.meses * v["ls.leave-days-per-month"];
    if (entrada.tomados > Math.max(ganados, v["ls.leave-minimum-days"])) {
      throw new ErrorEntrada("You have entered more days taken than the leave you have earned.", "tomados");
    }
    const diario = redondear((entrada.salario / v["ls.hours-divisor"]["monthly"]) * enMapa(v["ls.daily-hours"], entrada.semana));
    const pendientes = Math.max(0, ganados - entrada.tomados);
    const pagable = entrada.meses >= v["ls.leave-pay-minimum-months"];
    const observaciones: string[] = [];
    if (!pagable && pendientes > 0) {
      observaciones.push(`If your job ends before ${v["ls.leave-pay-minimum-months"]} months of continuous work, the law does not require payment for untaken leave.`);
    }
    return {
      ganados,
      pendientes,
      diario,
      valor: redondear(pendientes * diario),
      pagoFinal: pagable ? redondear(pendientes * diario) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Leave days still due", formato: "dias", destacada: true },
    { clave: "ganados", etiqueta: "Leave days earned", formato: "dias" },
    { clave: "diario", etiqueta: "One day's full pay", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of the days still due", formato: "moneda" },
    { clave: "pagoFinal", etiqueta: "Leave pay if your job ended today", formato: "moneda" },
  ],
});
