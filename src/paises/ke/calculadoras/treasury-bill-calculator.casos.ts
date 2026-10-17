import { definirCasos } from "@/motor/calculo";
import calculadora from "./treasury-bill-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "CBK example: KSh 12 million, 91 days at 7.65%",
    origen: {
      tipo: "oficial",
      url: "https://www.centralbank.go.ke/images/FAQs/FAQsGoKSecurities.pdf",
      detalle:
        "The CBK example rounds the price to 98.128, so it gets 11,775,360 plus tax of 33,696 = 11,809,056 and a return of 190,944. Without rounding the price it is 11,809,100.40 and 190,899.60.",
    },
    fecha: "2026-10-17",
    entrada: { nominal: 12000000, dias: "91", tasa: 7.65, exento: false },
    esperado: { pago: 11809056, ganancia: 190944 },
    tolerancia: 50,
  },
  {
    nombre: "Auction of 19 October 2026: 91 days at 8.75%",
    origen: {
      tipo: "oficial",
      url: "https://www.centralbank.go.ke/uploads/91_day_historical_treasury_bill_results/1647758237_RESULTS%202704-091%202678-182%202633-364%20DATED%2019-10-2026.pdf",
      detalle: "Price per KSh 100 at the average rate: 97.8651.",
    },
    fecha: "2026-10-17",
    entrada: { nominal: 100000, dias: "91", tasa: 8.75, exento: false },
    esperado: { precio100: 97.8651 },
    tolerancia: 0.0001,
  },
  {
    nombre: "KSh 100,000, 91 days at 9%",
    origen: { tipo: "recalculado", detalle: "Price 100 / (1 + 9 × 91 / 36,500) = 97.8054. Cost 97,805.41. Discount 2,194.59. Tax 15% = 329.19. Pay 98,134.60. Return 1,865.40." },
    fecha: "2026-10-17",
    entrada: { nominal: 100000, dias: "91", tasa: 9, exento: false },
    esperado: { costo: 97805.41, descuento: 2194.59, impuesto: 329.19, pago: 98134.6, ganancia: 1865.4 },
  },
  {
    nombre: "Exempt investor pays no withholding tax",
    origen: { tipo: "recalculado", detalle: "With a KRA exemption certificate the tax is zero, so the return is the full discount." },
    fecha: "2026-10-17",
    entrada: { nominal: 100000, dias: "91", tasa: 9, exento: true },
    esperado: { impuesto: 0, pago: 97805.41, ganancia: 2194.59 },
  },
]);
