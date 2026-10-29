import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

const AVISO =
  "https://www.mra.mw/admin/storage/download_files/1792486281_USE%20OF%20CONSUMER%20PRICE%20INDICES%20(CPIs)%20FOR%20ADJUSTING%20BASIS%20OF%20A%20CAPITAL%20ASSET%20UNDER%20SECTION%202%20OF%20THE%20TAXATION%20ACT%20-%20OCtober%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "MRA example 3: house built in March 1992, sold in June 2014",
    origen: {
      tipo: "oficial",
      url: AVISO,
      detalle: "Factor 135,010.54 / 1,825.64 = 73.95; adjusted basis K73,950,000; gain K11,050,000; provisional tax 30% = K3,315,000.",
    },
    fecha: "2026-10-27",
    entrada: { costo: 1000000, mesCompra: "03", anioCompra: 1992, precio: 85000000, mesVenta: "06", anioVenta: 2014 },
    esperado: { factor: 73.95, base: 73950000, ganancia: 11050000, impuesto: 3315000 },
  },
  {
    nombre: "Loss: no tax",
    origen: { tipo: "recalculado", detalle: "Jan 2024 CPI 652,898.18 to Sep 2026 CPI 1,120,336.60: factor 1.72. Basis 17,200,000 above the price of 15,000,000: loss of 2,200,000." },
    fecha: "2026-10-27",
    entrada: { costo: 10000000, mesCompra: "01", anioCompra: 2024, precio: 15000000, mesVenta: "09", anioVenta: 2026 },
    esperado: { factor: 1.72, base: 17200000, perdida: 2200000, ganancia: 0, impuesto: 0 },
  },
  {
    nombre: "Sale before purchase is rejected",
    origen: { tipo: "recalculado", detalle: "The sale has to come after the purchase." },
    fecha: "2026-10-27",
    entrada: { costo: 1000000, mesCompra: "06", anioCompra: 2020, precio: 2000000, mesVenta: "01", anioVenta: 2020 },
    esperaError: true,
  },
  {
    nombre: "Sale after the latest CPI is rejected",
    origen: { tipo: "recalculado", detalle: "The latest CPI in the MRA notice is September 2026." },
    fecha: "2026-10-27",
    entrada: { costo: 1000000, mesCompra: "06", anioCompra: 2020, precio: 2000000, mesVenta: "10", anioVenta: 2026 },
    esperaError: true,
  },
]);
