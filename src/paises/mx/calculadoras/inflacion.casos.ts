import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "Mil pesos de agosto de 2025 llevados a agosto de 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "INPC agosto 2025 = 140.867 y agosto 2026 = 145.462 (julio 2026 = 145.169, DOF 10/09/2026). 1000 × 145.462 / 140.867 = 1032.62. Anual: 145.462 / 140.867 − 1 = 3.2619 %. Mensual: 145.462 / 145.169 − 1 = 0.2018 % (el INEGI publica 0.20 %).",
    },
    fecha: "2026-09-05",
    entrada: { monto: 1000, desde: "2025-08-15", hasta: "2026-08-31" },
    esperado: { montoActualizado: 1032.62, diferencia: 32.62, acumulada: 3.2619, interanual: 3.2619, mensual: 0.2018, indiceInicial: 140.867, indiceFinal: 145.462 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Fecha final después del último INPC publicado",
    origen: {
      tipo: "recalculado",
      detalle:
        "Al 20/10/2026 el último INPC es septiembre 2026 = 146.075. Diciembre 2025 = 143.042. 5000 × 146.075 / 143.042 = 5106.02; acumulada 2.1204 %. El cálculo llega hasta septiembre.",
    },
    fecha: "2026-10-20",
    entrada: { monto: 5000, desde: "2025-12-01", hasta: "2026-12-31" },
    esperado: { montoActualizado: 5106.02, acumulada: 2.1204, mesFinal: "septiembre de 2026" },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes inicial antes del primer índice cargado",
    origen: { tipo: "recalculado", detalle: "La serie empieza en enero de 2000: diciembre de 1999 tiene que dar error." },
    fecha: "2026-10-20",
    entrada: { monto: 100, desde: "1999-12-01", hasta: "2026-01-01" },
    esperaError: true,
  },
  {
    nombre: "Fecha inicial posterior a la final",
    origen: { tipo: "recalculado", detalle: "Desde marzo 2026 hasta enero 2026 no es un periodo válido." },
    fecha: "2026-10-20",
    entrada: { monto: 100, desde: "2026-03-01", hasta: "2026-01-01" },
    esperaError: true,
  },
]);
