import { definirCasos } from "@/motor/calculo";
import colones from "./colones-a-dolares";

export default definirCasos(colones, [
  {
    nombre: "250,000 colones del impuesto de bienes raíces",
    origen: {
      tipo: "oficial",
      url: "https://www.mh.gob.sv/wp-content/uploads/2020/11/PMHDC8216.pdf",
      detalle: "La ley de bienes raíces exime hasta 250.000 colones y Hacienda lo publica como $28,571.43: 250.000 / 8,75.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 250000, direccion: "colones" },
    esperado: { colones: 250000, dolares: 28571.43 },
  },
  {
    nombre: "$100 a colones",
    origen: { tipo: "recalculado", detalle: "100 × 8,75 = 875 (Ley de Integración Monetaria, art. 1)." },
    fecha: "2026-10-12",
    entrada: { monto: 100, direccion: "dolares" },
    esperado: { colones: 875, dolares: 100 },
  },
  {
    nombre: "1,000 colones",
    origen: { tipo: "recalculado", detalle: "1.000 / 8,75 = 114,2857 → 114,29." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, direccion: "colones" },
    esperado: { dolares: 114.29 },
  },
]);
