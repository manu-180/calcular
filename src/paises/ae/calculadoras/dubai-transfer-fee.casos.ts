import { definirCasos } from "@/motor/calculo";
import calculadora from "./dubai-transfer-fee";

const URL = "https://dubailand.gov.ae/en/eservices/registering-the-sale-of-a-mortgaged-property/";

export default definirCasos(calculadora, [
  {
    nombre: "AED 2 million with a 1.5 million mortgage",
    origen: { tipo: "oficial", url: URL, detalle: "4% of 2,000,000 = 80,000; registrar 4,200 (price of 500,000 or more); mortgage 0.25% of 1,500,000 = 3,750; title deed 250. Total 88,200." },
    fecha: "2026-10-18",
    entrada: { precio: 2000000, prestamo: 1500000 },
    esperado: { transferencia: 80000, registro: 4200, hipoteca: 3750, titulo: 250, total: 88200 },
  },
  {
    nombre: "AED 450,000 cash purchase",
    origen: { tipo: "oficial", url: URL, detalle: "4% = 18,000; registrar 2,100 (below 500,000); title deed 250. Total 20,350." },
    fecha: "2026-10-18",
    entrada: { precio: 450000, prestamo: 0 },
    esperado: { registro: 2100, hipoteca: 0, total: 20350 },
  },
  {
    nombre: "No price is not valid",
    origen: { tipo: "recalculado", detalle: "Price 0." },
    fecha: "2026-10-18",
    entrada: { precio: 0, prestamo: 0 },
    esperaError: true,
  },
]);
