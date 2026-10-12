import { definirCasos } from "@/motor/calculo";
import retencionServiciosProfesionales from "./retencion-servicios-profesionales";

export default definirCasos(retencionServiciosProfesionales, [
  {
    nombre: "Honorarios de C$10,000 con IVA",
    origen: {
      tipo: "recalculado",
      detalle: "Reglamento de la LCT, art. 44 numeral 2.5 (Decreto 08-2019): 10 %. LCT art. 109: IVA 15 %. IVA 1500; factura 11500; retención 1000; recibís 10500.",
    },
    fecha: "2026-10-12",
    entrada: { honorarios: 10000, conIva: true },
    esperado: { iva: 1500, factura: 11500, retencion: 1000, recibis: 10500 },
  },
  {
    nombre: "Honorarios chicos sin IVA",
    origen: { tipo: "recalculado", detalle: "La retención del 10 % se aplica aunque sea menos de C$1,000 (numeral 3). 800 × 10 % = 80; recibís 720." },
    fecha: "2026-10-12",
    entrada: { honorarios: 800, conIva: false },
    esperado: { iva: 0, retencion: 80, recibis: 720 },
  },
]);
