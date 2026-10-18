import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nssf, paye, shif } from "../lib/nomina";
import { parametrosNssf, parametrosPaye, REQUIERE_NOMINA } from "../lib/requisitos";

export default definirCalculadora({
  id: "ke.net-salary-calculator",
  mercado: "ke",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 100000, ayuda: "Basic pay plus allowances and taxable benefits." },
    { id: "otraPension", tipo: "moneda", etiqueta: "Your contribution to a registered pension scheme", min: 0, porDefecto: 0, ayuda: "On top of NSSF. It comes out of your pay and lowers your tax." },
    { id: "interesHipoteca", tipo: "moneda", etiqueta: "Mortgage interest on your home for the month", min: 0, porDefecto: 0 },
    { id: "primasSeguro", tipo: "moneda", etiqueta: "Life, health or education insurance premiums for the month", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const n = nssf(e.bruto, parametrosNssf(v));
    const nTotal = redondear(n.total);
    const s = redondear(shif(e.bruto, v["ke.shif-rate"], v["ke.shif-minimum"]));
    const h = redondear(porcentaje(e.bruto, v["ke.housing-levy-rate"]));
    const r = paye(
      { bruto: e.bruto, nssf: nTotal, shif: s, housingLevy: h, otraPension: e.otraPension, fondoMedico: 0, interesHipoteca: e.interesHipoteca, primasSeguro: e.primasSeguro },
      parametrosPaye(v),
    );
    const impuesto = redondear(r.paye);
    const totalDeducido = redondear(nTotal + s + h + impuesto + e.otraPension);
    const neto = redondear(e.bruto - totalDeducido);
    const observaciones: string[] = [];
    if (neto < 0) observaciones.push("Your deductions are larger than your pay. Check the amounts you entered.");
    return {
      neto,
      paye: impuesto,
      nssf: nTotal,
      nssfTier1: redondear(n.tier1),
      nssfTier2: redondear(n.tier2),
      shif: s,
      housingLevy: h,
      otraPension: e.otraPension,
      totalDeducido,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "nssf", etiqueta: "NSSF", formato: "moneda" },
    { clave: "nssfTier1", etiqueta: "of which Tier I", formato: "moneda" },
    { clave: "nssfTier2", etiqueta: "of which Tier II", formato: "moneda" },
    { clave: "shif", etiqueta: "SHIF", formato: "moneda" },
    { clave: "housingLevy", etiqueta: "Housing Levy", formato: "moneda" },
    { clave: "otraPension", etiqueta: "Other pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Net pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
});
