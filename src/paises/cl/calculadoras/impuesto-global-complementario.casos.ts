import { definirCasos } from "@/motor/calculo";
import globalComplementario from "./impuesto-global-complementario";

export default definirCasos(globalComplementario, [
  {
    nombre: "Renta de $30.000.000 con la UTA de octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "LIR art. 52. UTM oct 2026 = 72.151, UTA = 865.812. 30.000.000 / 865.812 = 34,64955 UTA: tramo 30 a 50 (8 %). Impuesto = (0,66 + 4,64955 × 0,08) UTA = 1,031964 UTA = 893.487,1 → 893.487. Retenciones 600.000: faltan 293.487.",
    },
    fecha: "2026-10-07",
    entrada: { renta: 30000000, retenciones: 600000 },
    esperado: { uta: 865812, impuesto: 893487, aPagar: 293487, aDevolver: 0 },
  },
  {
    nombre: "Renta exenta con retenciones de honorarios",
    origen: { tipo: "recalculado", detalle: "10.000.000 / 865.812 = 11,55 UTA, bajo 13,5 UTA: exento. Se devuelven las retenciones de 1.525.000." },
    fecha: "2026-10-07",
    entrada: { renta: 10000000, retenciones: 1525000 },
    esperado: { impuesto: 0, aPagar: 0, aDevolver: 1525000 },
  },
  {
    nombre: "Renta en el tramo de 40 %",
    origen: {
      tipo: "recalculado",
      detalle: "300.000.000 / 865.812 = 346,49554 UTA. (85,18 + 36,49554 × 0,40) × 865.812 = 86.389.178,2 → 86.389.178.",
    },
    fecha: "2026-10-07",
    entrada: { renta: 300000000, retenciones: 0 },
    esperado: { impuesto: 86389178 },
  },
]);
