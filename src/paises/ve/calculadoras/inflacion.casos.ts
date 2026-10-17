import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

const BCV = "https://www.bcv.org.ve/estadisticas/consumidor";

export default definirCasos(inflacion, [
  {
    nombre: "Acumulada de 2026 a septiembre",
    origen: { tipo: "oficial", url: BCV, detalle: "BCV: inflación acumulada a septiembre 2026 = 225,3 %, mensual 8,4 %. INPC diciembre 2025 = 212.393.273.459.827,03; septiembre 2026 = 690.967.674.312.665,0. Bs 1.000 × 3,2532 = Bs 3.253,25." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2025-12-01", hasta: "2026-09-30" },
    esperado: { montoActualizado: 3253.25, variacionAcumulada: 225.32, variacionMensual: 8.4, mesDestino: "septiembre de 2026" },
  },
  {
    nombre: "Un año completo: septiembre 2025 a septiembre 2026",
    origen: { tipo: "recalculado", detalle: "INPC BCV septiembre 2025 = 122.169.616.603.138,98. 690.967.674.312.665 / 122.169.616.603.138,98 = 5,6558: interanual 465,58 %. Bs 1.000 → Bs 5.655,81." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2025-09-01", hasta: "2026-09-01" },
    esperado: { montoActualizado: 5655.81, variacionAcumulada: 465.58, variacionInteranual: 465.58 },
  },
  {
    nombre: "Un mes sin INPC publicado usa el último disponible",
    origen: { tipo: "recalculado", detalle: "Al 8/10/2026 el último INPC es septiembre. Agosto a septiembre: 690.967.674.312.665 / 637.409.769.724.325,1 = 1,0840. Bs 1.000 → Bs 1.084,02." },
    fecha: "2026-10-08",
    // El último dato va fijo: con la serie real el caso se rompía al entrar el mes siguiente y frenaba la publicación del país.
    valores: { "ve.inpc": { fecha: "2026-09-01", valor: 690967674312665 } },
    entrada: { monto: 1000, desde: "2026-08-01", hasta: "2026-10-08" },
    esperado: { montoActualizado: 1084.02, mesDestino: "septiembre de 2026" },
  },
  {
    nombre: "Un monto anterior a la reconversión de octubre 2021 da error",
    origen: { tipo: "recalculado", detalle: "Antes del 1/10/2021 los montos estaban en la expresión monetaria anterior (Decreto 4.553)." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2021-09-30", hasta: "2026-09-01" },
    esperaError: true,
  },
]);
