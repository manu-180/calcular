import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "USD 1.000 de agosto 2025 llevados a agosto 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.ecuadorencifras.gob.ec/indice-de-precios-al-consumidor/",
      detalle:
        "IPC del INEC (serie empalmada): agosto 2026 100,83802381 y agosto 2025 99,72134077. 1.000 × 100,83802381 / 99,72134077 = 1.011,20. El INEC publica para agosto 2026: mensual 0,04 %, anual 1,12 % y acumulada 1,34 %.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2025-08-01", hasta: "2026-08-31" },
    esperado: {
      montoActualizado: 1011.2,
      mesDesde: "agosto de 2025",
      mesHasta: "agosto de 2026",
      variacionPeriodo: 1.1198,
      variacionMensual: 0.0429,
      variacionAnio: 1.3443,
      variacionInteranual: 1.1198,
    },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes de destino todavía sin IPC: usa el último publicado",
    origen: { tipo: "recalculado", detalle: "El 8/10/2026 el último IPC es el de agosto 2026. 500 × 100,83802381 / 99,86421643 (enero 2026) = 504,88." },
    fecha: "2026-10-08",
    entrada: { monto: 500, desde: "2026-01-15", hasta: "2026-10-08" },
    esperado: { montoActualizado: 504.88, mesHasta: "agosto de 2026" },
  },
  {
    nombre: "Mes anterior a la serie cargada",
    origen: { tipo: "recalculado", detalle: "La serie cargada arranca en enero de 2000, el año de la dolarización." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "1999-06-01", hasta: "2026-01-01" },
    esperaError: true,
  },
  {
    nombre: "Origen posterior al destino",
    origen: { tipo: "recalculado", detalle: "El mes de origen tiene que ser anterior al de destino." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-06-01", hasta: "2026-03-01" },
    esperaError: true,
  },
]);
