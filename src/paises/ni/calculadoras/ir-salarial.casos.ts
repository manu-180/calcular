import { definirCasos } from "@/motor/calculo";
import irSalarial from "./ir-salarial";

export default definirCasos(irSalarial, [
  {
    nombre: "C$30,000 al mes, régimen integral",
    origen: {
      tipo: "recalculado",
      detalle:
        "Ley 822 art. 21 y 23; Reglamento art. 19. INSS 7 %: 2100. (30000 − 2100) × 12 = 334800. 15000 + 20 % × 134800 = 41960 al año; 3496.67 al mes. Tramo 20 %. 3496.67 / 30000 = 11.66 %.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 30000, regimen: "integral" },
    esperado: { inss: 2100, rentaNetaAnual: 334800, irAnual: 41960, irMensual: 3496.67, marginal: 20, efectiva: 11.66 },
  },
  {
    nombre: "Cambio de tramo: del 20 % al 25 %",
    origen: {
      tipo: "recalculado",
      detalle: "INSS 2800. (40000 − 2800) × 12 = 446400. 45000 + 25 % × 96400 = 69100 al año; 5758.33 al mes.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 40000, regimen: "integral" },
    esperado: { rentaNetaAnual: 446400, irAnual: 69100, irMensual: 5758.33, marginal: 25 },
  },
  {
    nombre: "Renta neta justo debajo de C$100,000: no paga",
    origen: { tipo: "recalculado", detalle: "INSS 627.24. (8960.57 − 627.24) × 12 = 99999.96: primer tramo (hasta 100000, 0 %)." },
    fecha: "2026-10-07",
    entrada: { salario: 8960.57, regimen: "integral" },
    esperado: { irAnual: 0, irMensual: 0, marginal: 0 },
  },
]);
