import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.notice-period-calculator",
  mercado: "bt",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "bt.notice-days-min": "numero",
    "bt.redundancy-extra-days-per-year": "numero",
    "bt.redundancy-extra-days-max": "numero",
    "bt.probation-notice-days": "numero",
    "bt.probation-max-days": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Why the job is ending",
      opciones: [
        { valor: "standard", etiqueta: "Resignation or dismissal after probation" },
        { valor: "probation", etiqueta: "Ending during probation" },
        { valor: "redundancy", etiqueta: "Redundancy" },
      ],
      porDefecto: "standard",
    },
    { id: "anios", tipo: "entero", etiqueta: "Complete years with this employer", min: 0, max: 60, porDefecto: 4, visibleSi: { motivo: ["redundancy"] } },
    { id: "salario", tipo: "moneda", etiqueta: "Basic pay for one month", min: 0, porDefecto: 25000 },
    { id: "contrato", tipo: "entero", etiqueta: "Notice written in your contract, in days (optional)", min: 0, max: 365, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario < 0) throw new ErrorEntrada("Pay cannot be negative.", "salario");
    const minimo = v["bt.notice-days-min"];
    const extra = e.motivo === "redundancy" ? Math.min((e.anios ?? 0) * v["bt.redundancy-extra-days-per-year"], v["bt.redundancy-extra-days-max"]) : 0;
    const legal = e.motivo === "probation" ? v["bt.probation-notice-days"] : minimo + extra;
    const dias = Math.max(legal, e.contrato ?? 0);
    const enLugar = redondear((e.salario / minimo) * dias);
    const observaciones: string[] = [];
    observaciones.push("Pay in lieu treats one month as the minimum notice period, so 30 days of notice equals one month of basic pay.");
    if (e.motivo === "redundancy") observaciones.push("The extra redundancy days are capped. We read the cap as applying to the extra days only, not to the total.");
    if ((e.contrato ?? 0) > legal) observaciones.push("Your contract gives more notice than the Act, so the longer period applies.");
    return { dias, legal, extra, enLugar, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Notice to give or receive", formato: "dias", destacada: true },
    { clave: "legal", etiqueta: "Notice required by the Act", formato: "dias" },
    { clave: "extra", etiqueta: "Extra redundancy days included", formato: "dias", ocultarSiCero: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
