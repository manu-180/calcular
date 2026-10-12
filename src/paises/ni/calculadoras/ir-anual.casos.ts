import { definirCasos } from "@/motor/calculo";
import irAnual from "./ir-anual";

export default definirCasos(irAnual, [
  {
    nombre: "Negocio con C$1 millón de ingresos y C$300,000 de renta neta",
    origen: {
      tipo: "recalculado",
      detalle: "LCT art. 52: ingresos hasta C$12 millones, estrato de C$200,000.01 a C$350,000: 20 % sobre toda la renta neta = 60000. Art. 61 (Ley 987): 1 % de 1000000 = 10000. Art. 55: se paga el mayor, 60000. Menos 12000 de retenciones: 48000.",
    },
    fecha: "2026-10-12",
    entrada: { ingresos: 1000000, rentaNeta: 300000, contribuyente: "demas", retenciones: 12000 },
    esperado: { alicuota: 20, irAnual: 60000, pagoMinimo: 10000, irAPagar: 60000, saldo: 48000 },
  },
  {
    nombre: "Margen chico: manda el pago mínimo",
    origen: { tipo: "recalculado", detalle: "Renta neta 50000: estrato del 10 % = 5000. Pago mínimo 1 % de 5000000 = 50000. Se paga 50000." },
    fecha: "2026-10-12",
    entrada: { ingresos: 5000000, rentaNeta: 50000, contribuyente: "demas", retenciones: null },
    esperado: { alicuota: 10, irAnual: 5000, pagoMinimo: 50000, irAPagar: 50000 },
  },
  {
    nombre: "Más de C$12 millones: alícuota del 30 %",
    origen: { tipo: "recalculado", detalle: "Art. 52: 30 % de 2000000 = 600000. Principal contribuyente: pago mínimo 2 % de 20000000 = 400000. Se paga 600000." },
    fecha: "2026-10-12",
    entrada: { ingresos: 20000000, rentaNeta: 2000000, contribuyente: "principales", retenciones: null },
    esperado: { alicuota: 30, irAnual: 600000, pagoMinimo: 400000, irAPagar: 600000 },
  },
]);
