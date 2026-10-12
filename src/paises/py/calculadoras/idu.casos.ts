import { definirCasos } from "@/motor/calculo";
import idu from "./idu";

const DNIT = "https://www.dnit.gov.py/web/portal-institucional/idu" as const;

export default definirCasos(idu, [
  {
    nombre: "Socio residente",
    origen: { tipo: "recalculado", url: DNIT, detalle: "Tasa para residentes 8 %: 100.000.000 × 8 % = 8.000.000; neto 92.000.000." },
    fecha: "2026-10-12",
    entrada: { monto: 100000000, residencia: "residente" },
    esperado: { tasa: 8, impuesto: 8000000, neto: 92000000 },
  },
  {
    nombre: "Accionista no residente",
    origen: { tipo: "recalculado", url: DNIT, detalle: "Tasa para no residentes 15 %: 100.000.000 × 15 % = 15.000.000; neto 85.000.000." },
    fecha: "2026-10-12",
    entrada: { monto: 100000000, residencia: "no-residente" },
    esperado: { tasa: 15, impuesto: 15000000, neto: 85000000 },
  },
]);
