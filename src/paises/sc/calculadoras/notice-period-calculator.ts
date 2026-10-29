import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

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

export default definirCalculadora({
  id: "sc.notice-period-calculator",
  mercado: "sc",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: { "sc.notice-months-standard": "numero", "sc.notice-days-probation": "numero", "sc.notice-days-casual": "numero", "sc.probation-max-months": "numero" },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of worker",
      opciones: [
        { valor: "standard", etiqueta: "Seychellois worker on a regular contract" },
        { valor: "probation", etiqueta: "Worker on probation" },
        { valor: "casual", etiqueta: "Casual worker" },
      ],
      porDefecto: "standard",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "Day the notice is given", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 20000, visibleSi: { tipo: ["standard"] } },
    { id: "pagaDia", tipo: "moneda", etiqueta: "Pay for one working day", min: 0, porDefecto: 800, visibleSi: { tipo: ["probation", "casual"] } },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the day the notice is given.", "inicio");
    if (e.tipo === "standard") {
      if (e.salario === null || e.salario <= 0) throw new ErrorEntrada("Enter the monthly wage.", "salario");
      const meses = v["sc.notice-months-standard"];
      return {
        duracion: meses + " month",
        ultimo: sumarDias(sumarMeses(e.inicio, meses), -1),
        pago: redondear(e.salario * meses),
        observaciones: [
          "A non-Seychellois worker is given the notice in the contract, or one month where the contract is silent.",
          "Pay in lieu of notice is allowed for the part of the notice that is not worked.",
        ],
      };
    }
    if (e.pagaDia === null || e.pagaDia <= 0) throw new ErrorEntrada("Enter the pay for one working day.", "pagaDia");
    const dias = e.tipo === "probation" ? v["sc.notice-days-probation"] : v["sc.notice-days-casual"];
    return {
      duracion: dias + (dias === 1 ? " day" : " days"),
      ultimo: sumarDias(e.inicio, dias - 1),
      pago: redondear(e.pagaDia * dias),
      observaciones: [
        "Probation cannot run for more than " + v["sc.probation-max-months"] + " months unless the competent officer authorises it.",
        "Pay in lieu of notice is allowed for the part of the notice that is not worked.",
      ],
    };
  },
  resultado: [
    { clave: "duracion", etiqueta: "Notice required", formato: "texto", destacada: true },
    { clave: "ultimo", etiqueta: "Last day of the notice", formato: "fecha" },
    { clave: "pago", etiqueta: "Pay in lieu of the full notice", formato: "moneda" },
  ],
});
