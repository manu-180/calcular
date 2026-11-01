import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.home-leave-calculator",
  mercado: "np",
  concepto: "vacaciones",
  slug: "home-leave-calculator",
  estado: "publicado",
  requiere: {
    "np.home-leave-days-worked": "numero",
    "np.home-leave-cap": "numero",
  },
  campos: [
    { id: "trabajados", tipo: "entero", etiqueta: "Days you have worked", min: 0, porDefecto: 300, ayuda: "Days of actual work since you joined or since the leave was last paid out." },
    { id: "tomados", tipo: "numero", etiqueta: "Home leave days already taken", min: 0, porDefecto: 0 },
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month (optional, to value the leave)", min: 0, requerido: false },
    { id: "diasMes", tipo: "entero", etiqueta: "Paid days in a month", min: 20, max: 31, porDefecto: 30, ayuda: "The Labour Act does not fix this number. Use the one in your contract." },
  ],
  calcular(e, v, { redondear }) {
    if (e.tomados > e.trabajados / v["np.home-leave-days-worked"]) throw new ErrorEntrada("You have taken more home leave than you have earned.", "tomados");
    const ganados = e.trabajados / v["np.home-leave-days-worked"];
    const disponible = ganados - e.tomados;
    const saldo = Math.min(disponible, v["np.home-leave-cap"]);
    const exceso = Math.max(0, disponible - v["np.home-leave-cap"]);
    const diario = e.basico === null ? null : e.basico / e.diasMes;
    const observaciones: string[] = [];
    if (exceso > 0) observaciones.push("Leave above the accumulation limit is paid out in cash at the end of the year.");
    return {
      ganados: redondear(ganados),
      saldo: redondear(saldo),
      exceso: redondear(exceso),
      valorSaldo: diario === null ? null : redondear(diario * saldo),
      valorExceso: diario === null || exceso === 0 ? null : redondear(diario * exceso),
      observaciones,
    };
  },
  resultado: [
    { clave: "ganados", etiqueta: "Home leave days earned", formato: "numero", decimales: 2 },
    { clave: "saldo", etiqueta: "Days you can carry forward", formato: "numero", decimales: 2, destacada: true },
    { clave: "exceso", etiqueta: "Days above the limit, paid in cash", formato: "numero", decimales: 2, ocultarSiCero: true },
    { clave: "valorSaldo", etiqueta: "Value of the days you carry forward", formato: "moneda" },
    { clave: "valorExceso", etiqueta: "Cash for the days above the limit", formato: "moneda" },
  ],
});
