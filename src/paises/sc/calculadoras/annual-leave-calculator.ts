import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.annual-leave-calculator",
  mercado: "sc",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "sc.annual-leave-days": "numero",
    "sc.leave-days-per-month": "numero",
    "sc.leave-minimum-block": "numero",
    "sc.leave-accumulation-cap": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of employment in the leave year", min: 1, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Working days of leave already taken", min: 0, porDefecto: 0 },
    { id: "acumulados", tipo: "numero", etiqueta: "Leave days carried over from earlier years", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.meses < 1) throw new ErrorEntrada("Enter at least one month of employment.", "meses");
    const derecho = e.meses >= 12 ? v["sc.annual-leave-days"] : Math.min(v["sc.annual-leave-days"], Math.ceil(v["sc.leave-days-per-month"] * e.meses));
    const disponible = derecho + e.acumulados - e.tomados;
    if (disponible < 0) throw new ErrorEntrada("You have taken more days than you are entitled to.", "tomados");
    const tope = v["sc.leave-accumulation-cap"];
    const observaciones = [
      "Saturdays, Sundays and public holidays are not counted as leave days.",
      "Your employer must see that you take at least " + v["sc.leave-minimum-block"] + " consecutive days in a year, unless you agree to accumulate your leave.",
    ];
    if (e.acumulados + derecho > tope) observaciones.push("Accumulated leave above " + tope + " days is paid at one and a half times the normal pay if it is converted to cash.");
    return { derecho, disponible, exceso: Math.max(0, e.acumulados + derecho - tope), observaciones };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Leave earned this year", formato: "numero", decimales: 0 },
    { clave: "disponible", etiqueta: "Working days of leave you still have", formato: "numero", decimales: 0, destacada: true },
    { clave: "exceso", etiqueta: "Days above the accumulation limit", formato: "numero", decimales: 0, ocultarSiCero: true },
  ],
});
