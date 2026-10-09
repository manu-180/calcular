import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

const PLANILLA_INE = "https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/IPC/Base%20Octubre%202022=100/IPC%20gral%20y%20variaciones_base%202022.xlsx";

export default definirCasos(inflacion, [
  {
    nombre: "$ 10.000 de setiembre 2025 llevados a setiembre 2026",
    origen: {
      tipo: "oficial",
      url: PLANILLA_INE,
      detalle:
        "IPC set. 2026 119,13131514 y set. 2025 113,80957493. 10.000 × 119,13131514 / 113,80957493 = 10.467,60. Variación en 12 meses 4,68 %, la del informe del INE de setiembre 2026; mensual 0,54 % y acumulada en el año 4,21 %, también como el INE.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 10000, desde: "2025-09-15", hasta: "2026-09-30" },
    esperado: {
      montoActualizado: 10467.6,
      variacionPeriodo: 4.676,
      mesDesde: "setiembre de 2025",
      mesHasta: "setiembre de 2026",
      variacionMensual: 0.5431,
      variacionAnio: 4.2127,
      variacionInteranual: 4.676,
    },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes de destino sin IPC publicado: usa el último",
    origen: {
      tipo: "recalculado",
      detalle: "El 8/10/2026 el último IPC es el de setiembre 2026. 50.000 × 119,13131514 / 115,36455812 (enero 2026) = 51.632,55.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 50000, desde: "2026-01-01", hasta: "2026-10-08" },
    esperado: { montoActualizado: 51632.55, mesHasta: "setiembre de 2026", indiceHasta: 119.13131514 },
  },
  {
    nombre: "Mismo mes de origen y destino",
    origen: { tipo: "recalculado", detalle: "Sin meses de diferencia el monto no cambia." },
    fecha: "2026-10-08",
    entrada: { monto: 1234.56, desde: "2024-03-10", hasta: "2024-03-20" },
    esperado: { montoActualizado: 1234.56, variacionPeriodo: 0 },
  },
  {
    nombre: "Origen posterior al destino",
    origen: { tipo: "recalculado", detalle: "El mes de origen no puede ser posterior al de destino." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-05-01", hasta: "2026-02-01" },
    esperaError: true,
  },
  {
    nombre: "Mes anterior a la serie cargada",
    origen: { tipo: "recalculado", detalle: "La serie arranca en enero de 2000." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "1999-12-01", hasta: "2026-02-01" },
    esperaError: true,
  },
]);
