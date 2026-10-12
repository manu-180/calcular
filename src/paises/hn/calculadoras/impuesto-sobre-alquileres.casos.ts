import { definirCasos } from "@/motor/calculo";
import impuestoSobreAlquileres from "./impuesto-sobre-alquileres";

export default definirCasos(impuestoSobreAlquileres, [
  {
    nombre: "Casa alquilada en L20,000 todo el año",
    origen: { tipo: "recalculado", detalle: "Decreto 17-2010 art. 5: 10 % sobre el alquiler si la renta mensual pasa de L15,000. 20000 × 12 = 240000; × 10 % = 24000." },
    fecha: "2026-10-12",
    entrada: { alquiler: 20000, meses: 12 },
    esperado: { anual: 240000, tasa: 10, impuesto: 24000, mensual: 2000 },
  },
  {
    nombre: "Alquiler de exactamente L15,000",
    origen: { tipo: "recalculado", detalle: "El artículo grava los alquileres superiores a L15,000: con 15000 no se paga." },
    fecha: "2026-10-12",
    entrada: { alquiler: 15000, meses: 12 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "L15,000.01 durante 6 meses",
    origen: { tipo: "recalculado", detalle: "15000.01 × 6 = 90000.06; × 10 % = 9000.006, redondeado 9000.01." },
    fecha: "2026-10-12",
    entrada: { alquiler: 15000.01, meses: 6 },
    esperado: { anual: 90000.06, impuesto: 9000.01 },
  },
]);
