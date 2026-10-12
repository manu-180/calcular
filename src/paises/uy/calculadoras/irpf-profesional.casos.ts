import { definirCasos } from "@/motor/calculo";
import irpfProfesional from "./irpf-profesional";

export default definirCasos(irpfProfesional, [
  {
    nombre: "Profesional que factura $ 1.200.000 en el año",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/todgi2023/101-2024/45_T7",
      detalle:
        "TO 2023, T7, art. 45: se deduce 30 % ficto, renta 840.000. Escala anual (BPC 6.864): 10 % de 247.104 = 24.710,40 + 15 % de 16.320 = 2.448; total 27.158,40. Deducciones 120.000 al 14 % = 16.800. IRPF 10.358,40.",
    },
    fecha: "2026-10-12",
    entrada: { facturacion: 1200000, aportes: 120000, hijos: 0 },
    esperado: { renta: 840000, impuestoEscala: 27158.4, descuento: 16800, irpf: 10358.4, porMes: 863.2 },
  },
  {
    nombre: "Facturación alta: deducciones al 8 %",
    origen: {
      tipo: "recalculado",
      detalle: "3.000.000: renta 2.100.000. 24.710,40 + 15 % de 411.840 (61.776) + 24 % de 864.480 (207.475,20) = 293.961,60. Facturación sobre 180 BPC: deducciones 200.000 al 8 % = 16.000. IRPF 277.961,60.",
    },
    fecha: "2026-10-12",
    entrada: { facturacion: 3000000, aportes: 200000, hijos: 0 },
    esperado: { impuestoEscala: 293961.6, descuento: 16000, irpf: 277961.6 },
  },
  {
    nombre: "Facturación baja: sin IRPF",
    origen: { tipo: "recalculado", detalle: "600.000: renta 420.000, bajo 84 BPC (576.576). IRPF 0." },
    fecha: "2026-10-12",
    entrada: { facturacion: 600000, aportes: 60000, hijos: 1 },
    esperado: { impuestoEscala: 0, irpf: 0 },
  },
]);
