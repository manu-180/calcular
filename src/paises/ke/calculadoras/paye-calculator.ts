import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nssf, paye, shif } from "../lib/nomina";
import { parametrosNssf, parametrosPaye, REQUIERE_NOMINA } from "../lib/requisitos";

export default definirCalculadora({
  id: "ke.paye-calculator",
  mercado: "ke",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 100000, ayuda: "Basic pay plus allowances and taxable benefits." },
    { id: "otraPension", tipo: "moneda", etiqueta: "Your contribution to a registered pension scheme", min: 0, porDefecto: 0, ayuda: "On top of NSSF." },
    { id: "fondoMedico", tipo: "moneda", etiqueta: "Post-retirement medical fund contribution", min: 0, porDefecto: 0 },
    { id: "interesHipoteca", tipo: "moneda", etiqueta: "Mortgage interest on your home for the month", min: 0, porDefecto: 0 },
    { id: "primasSeguro", tipo: "moneda", etiqueta: "Life, health or education insurance premiums for the month", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const n = redondear(nssf(e.bruto, parametrosNssf(v)).total);
    const s = redondear(shif(e.bruto, v["ke.shif-rate"], v["ke.shif-minimum"]));
    const h = redondear(porcentaje(e.bruto, v["ke.housing-levy-rate"]));
    const r = paye(
      { bruto: e.bruto, nssf: n, shif: s, housingLevy: h, otraPension: e.otraPension, fondoMedico: e.fondoMedico, interesHipoteca: e.interesHipoteca, primasSeguro: e.primasSeguro },
      parametrosPaye(v),
    );
    const impuesto = redondear(r.paye);
    const observaciones: string[] = [];
    if (impuesto === 0) observaciones.push("Your reliefs cover the whole tax, so no PAYE is due this month.");
    if (r.pension < n + e.otraPension) observaciones.push("Pension contributions, NSSF included, are deductible only up to the monthly cap.");
    return {
      paye: impuesto,
      anual: redondear(impuesto * 12),
      gravable: redondear(r.gravable),
      nssf: n,
      shif: s,
      housingLevy: h,
      deducciones: redondear(r.deducciones),
      impuestoBruto: redondear(r.impuestoBruto),
      alivioPersonal: v["ke.personal-relief"],
      alivioSeguro: redondear(r.alivioSeguro),
      efectiva: (impuesto / e.bruto) * 100,
      marginal: r.marginal,
      observaciones,
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE for the month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "PAYE for a full year at this pay", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable pay", formato: "moneda" },
    { clave: "nssf", etiqueta: "NSSF deducted", formato: "moneda" },
    { clave: "shif", etiqueta: "SHIF deducted", formato: "moneda" },
    { clave: "housingLevy", etiqueta: "Housing Levy deducted", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total allowable deductions", formato: "moneda" },
    { clave: "impuestoBruto", etiqueta: "Tax before reliefs", formato: "moneda" },
    { clave: "alivioPersonal", etiqueta: "Personal relief", formato: "moneda" },
    { clave: "alivioSeguro", etiqueta: "Insurance relief", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "PAYE as a share of gross pay", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Top band you reach", formato: "porcentaje", decimales: 1 },
  ],
});
