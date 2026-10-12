import { definirCasos } from "@/motor/calculo";
import iusi from "./iusi";

export default definirCasos(iusi, [
  {
    nombre: "Inmueble de Q500,000",
    origen: { tipo: "recalculado", detalle: "Decreto 15-98 art. 11: más de Q70,000, 9 por millar: 4500 al año." },
    fecha: "2026-10-12",
    entrada: { valor: 500000 },
    esperado: { porMillar: 9, anual: 4500 },
  },
  {
    nombre: "Inmueble de Q50,000",
    origen: { tipo: "recalculado", detalle: "Entre Q20,000.01 y Q70,000: 6 por millar = 300." },
    fecha: "2026-10-12",
    entrada: { valor: 50000 },
    esperado: { porMillar: 6, anual: 300 },
  },
  {
    nombre: "Inmueble de Q15,000",
    origen: { tipo: "recalculado", detalle: "Entre Q2,000.01 y Q20,000: 2 por millar = 30." },
    fecha: "2026-10-12",
    entrada: { valor: 15000 },
    esperado: { porMillar: 2, anual: 30 },
  },
  {
    nombre: "Exento",
    origen: { tipo: "recalculado", detalle: "Hasta Q2,000 está exento." },
    fecha: "2026-10-12",
    entrada: { valor: 1500 },
    esperado: { porMillar: 0, anual: 0 },
  },
]);
