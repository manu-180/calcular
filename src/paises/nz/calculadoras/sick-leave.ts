import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.sick-leave",
  mercado: "nz",
  concepto: "propio",
  slug: "sick-leave",
  estado: "publicado",
  requiere: {
    "nz.sick-leave-days": "numero",
    "nz.sick-leave-max-balance": "numero",
    "nz.sick-leave-qualifying-months": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months you've worked for this employer", min: 0, porDefecto: 12 },
    { id: "arrastre", tipo: "numero", etiqueta: "Unused sick days carried over", min: 0, max: 20, porDefecto: 0 },
    { id: "dias", tipo: "numero", etiqueta: "Sick days you need this year", min: 0, max: 365, porDefecto: 3 },
    { id: "pagoDiario", tipo: "moneda", etiqueta: "What you'd normally earn for a day's work", min: 0, porDefecto: 200 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.arrastre > v["nz.sick-leave-max-balance"]) {
      throw new ErrorEntrada(`Your sick leave balance can't be more than ${v["nz.sick-leave-max-balance"]} days.`, "arrastre");
    }
    const elegible = entrada.meses >= v["nz.sick-leave-qualifying-months"];
    const disponibles = elegible ? Math.min(entrada.arrastre + v["nz.sick-leave-days"], v["nz.sick-leave-max-balance"]) : 0;
    const pagados = Math.min(entrada.dias, disponibles);
    const observaciones: string[] = [];
    if (!elegible) {
      observaciones.push(
        "You get sick leave after 6 months of continuous work with the same employer. You may qualify sooner if you've averaged 10 hours a week over 6 months, with at least 1 hour every week or 40 hours every month.",
      );
    }
    if (entrada.dias > pagados) observaciones.push("Days beyond your balance are unpaid unless your employer agrees otherwise.");
    return {
      disponibles,
      pagados,
      sinPago: Math.max(0, entrada.dias - pagados),
      pago: redondear(pagados * entrada.pagoDiario),
      restante: disponibles - pagados,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay for the days you need", formato: "moneda", destacada: true },
    { clave: "disponibles", etiqueta: "Sick days available this year", formato: "dias" },
    { clave: "pagados", etiqueta: "Paid sick days used", formato: "dias" },
    { clave: "sinPago", etiqueta: "Days not covered", formato: "dias", ocultarSiCero: true },
    { clave: "restante", etiqueta: "Sick days left", formato: "dias" },
  ],
});
