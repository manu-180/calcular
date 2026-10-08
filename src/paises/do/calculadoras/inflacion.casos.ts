import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "RD$10,000 de agosto de 2025 llevados a agosto de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bancentral.gov.do/",
      detalle:
        "IPC agosto 2025 = 133.8965 y agosto 2026 = 140.7598 (BCRD). 140.7598 / 133.8965 = 1.0512582: 10,000 × 1.0512582 = 10,512.58. La portada del BCRD publica para agosto 2026 inflación interanual 5.13 % y mensual 0.38 %.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 10000, desde: "2025-08", hasta: "2026-08" },
    esperado: { actualizado: 10512.58, diferencia: 512.58, acumulada: 5.13, mensual: 0.38, interanual: 5.13 },
  },
  {
    nombre: "Inflación acumulada del año: diciembre 2025 a agosto 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bancentral.gov.do/",
      detalle: "IPC diciembre 2025 = 137.1955 y agosto 2026 = 140.7598. 140.7598 / 137.1955 = 1.025980: acumulada 2.60 %, la misma que publica el BCRD. 50,000 × 1.025980 = 51,298.99.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 50000, desde: "2025-12", hasta: "2026-08" },
    esperado: { actualizado: 51298.99, acumulada: 2.6 },
  },
  {
    nombre: "Primer mes de la serie: sin dato interanual",
    origen: { tipo: "recalculado", detalle: "La serie cargada empieza en enero de 2000: para febrero de 2000 no hay febrero de 1999 y la interanual no se muestra." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2000-01", hasta: "2000-02" },
    esperado: { interanual: null },
  },
  {
    nombre: "Mes de origen posterior al final",
    origen: { tipo: "recalculado", detalle: "El mes de origen tiene que ser anterior." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-08", hasta: "2026-01" },
    esperaError: true,
  },
]);
