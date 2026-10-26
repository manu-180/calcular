import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "mu.notice-period-calculator",
  mercado: "mu",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "mu.notice-days": "numero",
  },
  campos: [
    { id: "aviso", tipo: "fecha", etiqueta: "Date notice is given", porDefecto: "hoy" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 30000 },
    { id: "contrato", tipo: "entero", etiqueta: "Notice in your contract, in days (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.aviso)) throw new ErrorEntrada("Enter the date notice is given.", "aviso");
    if (e.sueldo < 0) throw new ErrorEntrada("Pay cannot be negative.", "sueldo");
    const legal = v["mu.notice-days"];
    const dias = Math.max(legal, e.contrato ?? 0);
    const observaciones = ["Pay in lieu is worked out as one thirtieth of your monthly pay for each day of notice."];
    if (e.contrato !== null && e.contrato < legal) observaciones.push(`Your contract cannot give less than ${legal} days, so the legal minimum applies.`);
    return {
      dias,
      fin: sumarDias(e.aviso, dias),
      enLugar: redondear((e.sueldo / 30) * dias),
      legal,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Notice period", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "Notice ends on", formato: "fecha" },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
    { clave: "legal", etiqueta: "Minimum under the Workers' Rights Act", formato: "dias" },
  ],
});
