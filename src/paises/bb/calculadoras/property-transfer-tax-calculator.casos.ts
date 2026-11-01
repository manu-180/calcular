import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-transfer-tax-calculator";

const URL = "https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PropertyTransferTaxCAP084A.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "House sold for Bds$600,000",
    origen: { tipo: "recalculado", url: URL, detalle: "(600,000 − 150,000) × 2.5% = 11,250.00." },
    fecha: "2026-10-27",
    valores: { "bb.property-transfer-tax-rate": 2.5, "bb.property-transfer-tax-exemption": 150000 },
    entrada: { precio: 600000, vivienda: "si" },
    esperado: { exento: 150000, base: 450000, impuesto: 11250 },
  },
  {
    nombre: "Vacant land sold for Bds$200,000",
    origen: { tipo: "recalculado", url: URL, detalle: "200,000 × 2.5% = 5,000.00." },
    fecha: "2026-10-27",
    valores: { "bb.property-transfer-tax-rate": 2.5, "bb.property-transfer-tax-exemption": 150000 },
    entrada: { precio: 200000, vivienda: "no" },
    esperado: { impuesto: 5000 },
  },
  {
    nombre: "No price",
    origen: { tipo: "recalculado", detalle: "A zero price is rejected." },
    fecha: "2026-10-27",
    valores: { "bb.property-transfer-tax-rate": 2.5, "bb.property-transfer-tax-exemption": 150000 },
    entrada: { precio: 0, vivienda: "si" },
    esperaError: true,
  },
]);
