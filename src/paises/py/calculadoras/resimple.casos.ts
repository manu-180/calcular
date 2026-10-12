import { definirCasos } from "@/motor/calculo";
import resimple from "./resimple";

const DNIT = "https://www.dnit.gov.py/web/portal-institucional/w/ire-resimple-ingresos-de-2025-deben-declararse-en-febrero" as const;

export default definirCasos(resimple, [
  {
    nombre: "Escalón más bajo",
    origen: { tipo: "oficial", url: DNIT, detalle: "DNIT: las cuatro cuotas trimestrales van de Gs. 60.000 (ingresos hasta Gs. 20.000.000) a Gs. 240.000. Ley 6380 art. 27: Gs. 20.000 por mes." },
    fecha: "2026-10-12",
    entrada: { ingresos: 20000000 },
    esperado: { cuotaMensual: 20000, cuotaTrimestral: 60000, anual: 240000 },
  },
  {
    nombre: "Escalón más alto",
    origen: { tipo: "oficial", url: DNIT, detalle: "Ingresos de Gs. 80.000.000: Gs. 80.000 por mes (art. 27), cuota trimestral de Gs. 240.000 (DNIT)." },
    fecha: "2026-10-12",
    entrada: { ingresos: 80000000 },
    esperado: { cuotaMensual: 80000, cuotaTrimestral: 240000, anual: 960000 },
  },
  {
    nombre: "Ingresos de 35 millones",
    origen: { tipo: "recalculado", detalle: "Entre Gs. 20.000.001 y Gs. 40.000.000: Gs. 40.000 por mes; trimestre 120.000; año 480.000." },
    fecha: "2026-10-12",
    entrada: { ingresos: 35000000 },
    esperado: { cuotaMensual: 40000, cuotaTrimestral: 120000, anual: 480000 },
  },
  {
    nombre: "Pasa el tope del RESIMPLE",
    origen: { tipo: "recalculado", detalle: "Gs. 90.000.000 supera los Gs. 80.000.000 del art. 27: no hay cuota." },
    fecha: "2026-10-12",
    entrada: { ingresos: 90000000 },
    esperado: { cuotaMensual: null, cuotaTrimestral: null, anual: null },
  },
]);
