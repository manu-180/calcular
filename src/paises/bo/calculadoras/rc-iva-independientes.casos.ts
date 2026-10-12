import { definirCasos } from "@/motor/calculo";
import rcIvaIndependientes from "./rc-iva-independientes";

const L843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(rcIvaIndependientes, [
  {
    nombre: "Trimestre de Bs 30.000 sin facturas",
    origen: {
      tipo: "recalculado",
      url: L843,
      detalle: "D.S. 21531 art. 9: 13 % × 30.000 = 3.900. Cómputo 13 % de 2 salarios mínimos por mes: 13 % × 3.300 × 2 × 3 = 2.574. A pagar 1.326. IT 3 % × 30.000 = 900.",
    },
    fecha: "2026-10-12",
    entrada: { ingresos: 30000, emiteFactura: false, aportes: 0, facturas: null, saldoAnterior: null },
    esperado: { base: 30000, impuesto: 3900, computoSmn: 2574, aPagar: 1326, saldoAFavor: 0, it: 900 },
  },
  {
    nombre: "Con facturas que cubren el impuesto",
    origen: { tipo: "recalculado", detalle: "Facturas 15.000: 13 % = 1.950 contra 1.326: paga 0 y queda 624 a favor." },
    fecha: "2026-10-12",
    entrada: { ingresos: 30000, emiteFactura: false, aportes: 0, facturas: 15000, saldoAnterior: null },
    esperado: { creditoFacturas: 1950, aPagar: 0, saldoAFavor: 624 },
  },
  {
    nombre: "Emite factura y aporta a la Gestora",
    origen: {
      tipo: "recalculado",
      url: L843,
      detalle: "Con factura se declara la venta menos el IVA: 30.000 − 3.900 = 26.100. Menos aportes 4.326: 21.774. 13 % = 2.830,62 − 2.574 = 256,62.",
    },
    fecha: "2026-10-12",
    entrada: { ingresos: 30000, emiteFactura: true, aportes: 4326, facturas: null, saldoAnterior: null },
    esperado: { base: 21774, impuesto: 2830.62, aPagar: 256.62, it: 900 },
  },
  {
    nombre: "Ingresos bajos: el cómputo de salarios mínimos lo cubre",
    origen: { tipo: "recalculado", detalle: "15.000: 13 % = 1.950, menor que 2.574. No paga y no genera saldo a favor." },
    fecha: "2026-10-12",
    entrada: { ingresos: 15000, emiteFactura: false, aportes: 0, facturas: null, saldoAnterior: null },
    esperado: { aPagar: 0, saldoAFavor: 0 },
  },
]);
