import { definirCasos } from "@/motor/calculo";
import baja from "./baja-laboral";

const SS = "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10952/28362/28365/cuantia";

export default definirCasos(baja, [
  {
    nombre: "30 días de baja por enfermedad común con base de 1.800",
    origen: {
      tipo: "recalculado",
      url: SS,
      detalle: "Base diaria 60. Días 4 a 20: 17 × 36 = 612. Días 21 a 30: 10 × 45 = 450. Total 1.062. Empresa días 4 a 15: 12 × 36 = 432.",
    },
    fecha: "2026-10-14",
    entrada: { base: 1800, dias: 30, tipo: "comun" },
    esperado: { diaria: 60, sinPrestacion: 3, tramo60: 17, tramo75: 10, total: 1062, empresa: 432, inss: 630 },
  },
  {
    nombre: "Baja corta de 3 días",
    origen: { tipo: "recalculado", url: SS, detalle: "Los tres primeros días no tienen prestación." },
    fecha: "2026-10-14",
    entrada: { base: 1800, dias: 3, tipo: "comun" },
    esperado: { total: 0, empresa: 0 },
  },
  {
    nombre: "10 días por accidente de trabajo",
    origen: { tipo: "recalculado", url: SS, detalle: "Desde el día siguiente a la baja, al 75 %: 9 × 45 = 405." },
    fecha: "2026-10-14",
    entrada: { base: 1800, dias: 10, tipo: "profesional" },
    esperado: { tramo75: 9, total: 405, empresa: null },
  },
]);
