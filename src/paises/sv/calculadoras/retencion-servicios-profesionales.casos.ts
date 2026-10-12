import { definirCasos } from "@/motor/calculo";
import retencion from "./retencion-servicios-profesionales";

export default definirCasos(retencion, [
  {
    nombre: "Honorarios de $1,000 sin IVA",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/D1841CC7-A62E-4221-824E-BE348589A1A1.pdf",
      detalle: "Art. 156 del Código Tributario: 10 % de 1.000 = 100. Recibe 900.",
    },
    fecha: "2026-10-12",
    entrada: { monto: 1000, operacion: "servicio", cobraIva: false },
    esperado: { servicio: 1000, iva: 0, retencion: 100, liquido: 900 },
  },
  {
    nombre: "Honorarios de $1,000 con IVA",
    origen: { tipo: "recalculado", detalle: "IVA 13 % = 130; retención 10 % de 1.000 = 100. Recibe 1.030." },
    fecha: "2026-10-12",
    entrada: { monto: 1000, operacion: "servicio", cobraIva: true },
    esperado: { iva: 130, retencion: 100, liquido: 1030 },
  },
  {
    nombre: "Quiere recibir $900 sin IVA",
    origen: { tipo: "recalculado", detalle: "900 / 0,90 = 1.000 de honorarios." },
    fecha: "2026-10-12",
    entrada: { monto: 900, operacion: "liquido", cobraIva: false },
    esperado: { servicio: 1000, retencion: 100, liquido: 900 },
  },
]);
