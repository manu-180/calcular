import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { paye } from "../lib/impuestos";

export default definirCalculadora({
  id: "ng.net-salary-calculator",
  mercado: "ng",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: {
    "ng.paye-bands": "escala",
    "ng.rent-relief-rate": "numero",
    "ng.rent-relief-cap": "numero",
    "ng.minimum-wage": "numero",
    "ng.pension-employee": "numero",
    "ng.nhf-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 250000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "Housing allowance a month", min: 0, porDefecto: 125000 },
    { id: "transporte", tipo: "moneda", etiqueta: "Transport allowance a month", min: 0, porDefecto: 75000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other allowances a month", min: 0, porDefecto: 50000 },
    { id: "nhf", tipo: "si-no", etiqueta: "You contribute to the National Housing Fund", porDefecto: true },
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent you pay a year", min: 0, porDefecto: 1200000 },
  ],
  calcular(entrada, v, { redondear }) {
    const brutoMes = entrada.basico + entrada.vivienda + entrada.transporte + entrada.otros;
    if (brutoMes <= 0) throw new ErrorEntrada("Enter your monthly pay.", "basico");
    const pensionMes = redondear(porcentaje(entrada.basico + entrada.vivienda + entrada.transporte, v["ng.pension-employee"]));
    const nhfMes = entrada.nhf ? redondear(porcentaje(entrada.basico, v["ng.nhf-rate"])) : 0;
    const r = paye(
      brutoMes * 12,
      (pensionMes + nhfMes) * 12,
      entrada.alquiler,
      v["ng.paye-bands"],
      v["ng.rent-relief-rate"],
      v["ng.rent-relief-cap"],
      v["ng.minimum-wage"] * 12,
    );
    const payeMes = redondear(r.impuesto / 12);
    const netoMes = redondear(brutoMes - pensionMes - nhfMes - payeMes);
    return {
      neto: netoMes,
      netoAnual: redondear(netoMes * 12),
      bruto: redondear(brutoMes),
      pension: pensionMes,
      nhf: nhfMes,
      paye: payeMes,
      gravable: redondear(r.gravable),
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net salary a month", formato: "moneda", destacada: true },
    { clave: "netoAnual", etiqueta: "Net salary a year", formato: "moneda" },
    { clave: "bruto", etiqueta: "Gross pay a month", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension (your share)", formato: "moneda" },
    { clave: "nhf", etiqueta: "National Housing Fund", formato: "moneda", ocultarSiCero: true },
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "gravable", etiqueta: "Chargeable income for the year", formato: "moneda" },
  ],
});
