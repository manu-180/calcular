import { definirCasos } from "@/motor/calculo";
import regimenSimplificado from "./regimen-simplificado";

const SIN = "https://siatinfo.impuestos.gob.bo/index.php/regimenes-tributarios/regimenes-especiales/regimen-tributario-simplificado";

export default definirCasos(regimenSimplificado, [
  {
    nombre: "Capital de Bs 20.000: categoría 3",
    origen: { tipo: "oficial", url: SIN, detalle: "Tabla del SIN: de 18.701 a 23.500 es categoría 3, cuota bimestral Bs 147. En el año: 147 × 6 = 882." },
    fecha: "2026-10-08",
    entrada: { capital: 20000 },
    esperado: { categoria: 3, bimestral: 147, anual: 882 },
  },
  {
    nombre: "Borde superior: Bs 60.000, categoría 6",
    origen: { tipo: "oficial", url: SIN, detalle: "De 37.001 a 60.000 es categoría 6, cuota Bs 350." },
    fecha: "2026-10-08",
    entrada: { capital: 60000 },
    esperado: { categoria: 6, bimestral: 350, anual: 2100 },
  },
  {
    nombre: "Borde inferior: Bs 12.001, categoría 1",
    origen: { tipo: "oficial", url: SIN, detalle: "De 12.001 a 15.000 es categoría 1, cuota Bs 47." },
    fecha: "2026-10-08",
    entrada: { capital: 12001 },
    esperado: { categoria: 1, bimestral: 47 },
  },
  {
    nombre: "Capital debajo de la tabla",
    origen: { tipo: "recalculado", detalle: "La tabla empieza en Bs 12.001: no se asigna categoría." },
    fecha: "2026-10-08",
    entrada: { capital: 8000 },
    esperado: { categoria: null, bimestral: null },
  },
  {
    nombre: "Capital de más de Bs 60.000",
    origen: { tipo: "oficial", url: SIN, detalle: "La última categoría llega a Bs 60.000." },
    fecha: "2026-10-08",
    entrada: { capital: 75000 },
    esperaError: true,
  },
]);
