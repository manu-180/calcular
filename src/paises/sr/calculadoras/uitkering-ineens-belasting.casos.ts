import { definirCasos } from "@/motor/calculo";
import calculadora from "./uitkering-ineens-belasting";

const WLB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "SRD 100.000 ineens",
    origen: { tipo: "recalculado", url: WLB, detalle: "Artikel 17a lid 2: 42.000 × 5% = 2.100; 42.000 × 15% = 6.300; 16.000 × 25% = 4.000; samen 12.400." },
    fecha: "2026-10-27",
    entrada: { bedrag: 100000 },
    esperado: { belasting: 12400, netto: 87600, gemiddeld: 12.4 },
  },
  {
    nombre: "SRD 200.000 ineens",
    origen: { tipo: "recalculado", url: WLB, detalle: "2.100 + 6.300 + 10.500 + 74.000 × 35% (25.900) = 44.800." },
    fecha: "2026-10-27",
    entrada: { bedrag: 200000 },
    esperado: { belasting: 44800, netto: 155200 },
  },
  {
    nombre: "SRD 30.000 ineens",
    origen: { tipo: "recalculado", url: WLB, detalle: "30.000 × 5% = 1.500." },
    fecha: "2026-10-27",
    entrada: { bedrag: 30000 },
    esperado: { belasting: 1500 },
  },
]);
