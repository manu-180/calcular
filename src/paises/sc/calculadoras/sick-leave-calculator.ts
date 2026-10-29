import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.sick-leave-calculator",
  mercado: "sc",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: { "sc.sick-paid-days": "numero", "sc.sick-unpaid-days": "numero", "sc.sick-child-days": "numero" },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Reason for the sick leave",
      opciones: [
        { valor: "own", etiqueta: "My own illness" },
        { valor: "child", etiqueta: "Caring for a sick child under 12" },
      ],
      porDefecto: "own",
    },
    { id: "dias", tipo: "entero", etiqueta: "Days of sick leave you need", min: 1, max: 200, porDefecto: 5 },
    { id: "usados", tipo: "entero", etiqueta: "Paid sick days already used in the last 12 months", min: 0, max: 200, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.dias < 1) throw new ErrorEntrada("Enter the days of sick leave you need.", "dias");
    const bolsaHijo = e.motivo === "child" ? Math.min(e.dias, v["sc.sick-child-days"]) : 0;
    const propios = e.dias - bolsaHijo;
    const disponiblePagado = Math.max(0, v["sc.sick-paid-days"] - e.usados);
    const pagados = Math.min(propios, disponiblePagado);
    const sinPago = Math.min(propios - pagados, v["sc.sick-unpaid-days"]);
    const sinCobertura = propios - pagados - sinPago;
    const observaciones = ["A medical certificate is needed. Tell your employer within 24 hours if you can."];
    if (sinCobertura > 0) observaciones.push("Some days are beyond the paid and unpaid sick leave in the regulations.");
    return { bolsaHijo, pagados, sinPago, sinCobertura, quedan: disponiblePagado - pagados, observaciones };
  },
  resultado: [
    { clave: "pagados", etiqueta: "Days paid from your own sick leave", formato: "numero", decimales: 0, destacada: true },
    { clave: "bolsaHijo", etiqueta: "Days from the sick child allowance", formato: "numero", decimales: 0, ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "Unpaid sick days", formato: "numero", decimales: 0, ocultarSiCero: true },
    { clave: "sinCobertura", etiqueta: "Days not covered by sick leave", formato: "numero", decimales: 0, ocultarSiCero: true },
    { clave: "quedan", etiqueta: "Paid sick days left afterwards", formato: "numero", decimales: 0 },
  ],
});
