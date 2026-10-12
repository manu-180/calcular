import { definirCasos } from "@/motor/calculo";
import retencionIva from "./retencion-iva";

export default definirCasos(retencionIva, [
  {
    nombre: "Venta de $1,000 a un gran contribuyente",
    origen: { tipo: "recalculado", detalle: "Código Tributario art. 162: IVA 13 % = 130; retención 1 % de 1.000 = 10; total 1.000 + 130 − 10 = 1.120." },
    fecha: "2026-10-12",
    entrada: { precio: 1000, operacion: "retencion" },
    esperado: { iva: 130, anticipo: 10, total: 1120 },
  },
  {
    nombre: "Compra de $1,000 a un gran contribuyente",
    origen: { tipo: "recalculado", detalle: "Art. 163: percepción 1 % = 10; total 1.000 + 130 + 10 = 1.140." },
    fecha: "2026-10-12",
    entrada: { precio: 1000, operacion: "percepcion" },
    esperado: { iva: 130, anticipo: 10, total: 1140 },
  },
  {
    nombre: "Justo $100: aplica",
    origen: { tipo: "recalculado", detalle: "Igual o superior a $100: 1 % = 1; IVA 13; total 112." },
    fecha: "2026-10-12",
    entrada: { precio: 100, operacion: "retencion" },
    esperado: { anticipo: 1, total: 112 },
  },
  {
    nombre: "$99.99: no aplica",
    origen: { tipo: "recalculado", detalle: "Menos de $100: sin anticipo. IVA 13 % de 99,99 = 12,9987 → 13,00; total 112,99." },
    fecha: "2026-10-12",
    entrada: { precio: 99.99, operacion: "percepcion" },
    esperado: { anticipo: 0, iva: 13, total: 112.99 },
  },
]);
