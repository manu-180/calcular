import { definirCasos } from "@/motor/calculo";
import muerte from "./prestacion-por-muerte";

export default definirCasos(muerte, [
  {
    nombre: "Seis años con $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 313: 60 días × 20 = 1.200. Ley de renuncia, arts. 3 y 8: tope 2 × 13,44 = 26,88 > 20; 15 × 6 × 20 = 1.800. Total 3.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2020-09-01", fallecimiento: "2026-09-30", region: "comercio-servicios" },
    esperado: { sepelio: 1200, prestacion: 1800, total: 3000 },
  },
  {
    nombre: "Un año de servicio: solo la ayuda para el sepelio",
    origen: { tipo: "recalculado", detalle: "Menos de 2 años: sin prestación. 60 × 15 = 900." },
    fecha: "2026-10-12",
    entrada: { salario: 450, inicio: "2025-06-01", fallecimiento: "2026-09-30", region: "comercio-servicios" },
    esperado: { sepelio: 900, prestacion: 0, total: 900 },
  },
  {
    nombre: "Salario alto: la prestación usa el tope",
    origen: { tipo: "recalculado", detalle: "Sepelio 60 × 50 = 3.000. Prestación 15 × 4 × 26,88 = 1.612,80." },
    fecha: "2026-10-12",
    entrada: { salario: 1500, inicio: "2022-01-10", fallecimiento: "2026-03-15", region: "comercio-servicios" },
    esperado: { sepelio: 3000, prestacion: 1612.8, total: 4612.8 },
  },
]);
