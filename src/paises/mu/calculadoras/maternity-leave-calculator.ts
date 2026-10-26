import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "mu.maternity-leave-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "mu.maternity-weeks": "numero",
    "mu.maternity-weeks-after-birth": "numero",
    "mu.maternity-extra-weeks": "numero",
    "mu.maternity-allowance": "numero",
    "mu.paternity-weeks": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Expected date of birth", porDefecto: "hoy" },
    { id: "semanasAntes", tipo: "entero", etiqueta: "Weeks of leave you want before the birth", min: 0, max: 8, porDefecto: 2 },
    { id: "multiple", tipo: "si-no", etiqueta: "Twins or more, or a premature baby", porDefecto: false },
    { id: "meses", tipo: "entero", etiqueta: "Months with your employer when the baby is born", min: 0, porDefecto: 24 },
  ],
  calcular(e, v) {
    if (!esFechaISO(e.parto)) throw new ErrorEntrada("Enter the expected date of birth.", "parto");
    const semanas = v["mu.maternity-weeks"];
    const despues = v["mu.maternity-weeks-after-birth"];
    if (e.semanasAntes > semanas - despues) {
      throw new ErrorEntrada(`At least ${despues} weeks have to be taken right after the birth, so you can take at most ${semanas - despues} weeks before.`, "semanasAntes");
    }
    const total = semanas + (e.multiple ? v["mu.maternity-extra-weeks"] : 0);
    const inicio = sumarDias(e.parto, -7 * e.semanasAntes);
    const ultimo = sumarDias(inicio, total * 7 - 1);
    const subsidio = e.meses >= 12 ? v["mu.maternity-allowance"] : 0;
    const observaciones = ["You need a medical certificate. The leave is on full pay."];
    if (subsidio === 0) observaciones.push("The maternity allowance needs 12 months of continuous employment with the same employer.");
    return {
      total,
      inicio,
      ultimo,
      regreso: sumarDias(ultimo, 1),
      semanasDespues: total - e.semanasAntes,
      subsidio,
      paternidad: v["mu.paternity-weeks"],
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity leave on full pay", formato: "semanas", destacada: true },
    { clave: "inicio", etiqueta: "First day of leave", formato: "fecha" },
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha" },
    { clave: "regreso", etiqueta: "Back to work on", formato: "fecha" },
    { clave: "semanasDespues", etiqueta: "Weeks after the birth", formato: "semanas" },
    { clave: "subsidio", etiqueta: "Maternity allowance from your employer", formato: "moneda" },
    { clave: "paternidad", etiqueta: "Paternity leave for the father", formato: "semanas" },
  ],
});
