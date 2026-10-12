import { definirCasos } from "@/motor/calculo";
import rentaTercera from "./impuesto-a-la-renta-empresas";

export default definirCasos(rentaTercera, [
  {
    nombre: "Empresa sin coeficiente y utilidad de S/ 200,000",
    origen: { tipo: "recalculado", detalle: "LIR, arts. 55 y 85: pago a cuenta 1.5 % de 80,000 = 1,200. Impuesto anual 29.5 % de 200,000 = 59,000." },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 80000, coeficiente: null, rentaNeta: 200000 },
    esperado: { tasaPagoCuenta: 1.5, pagoCuenta: 1200, impuestoAnual: 59000 },
  },
  {
    nombre: "Coeficiente mayor que el mínimo",
    origen: { tipo: "recalculado", detalle: "Coeficiente 2.14 % > 1.5 %: 2.14 % de 80,000 = 1,712." },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 80000, coeficiente: 2.14, rentaNeta: null },
    esperado: { tasaPagoCuenta: 2.14, pagoCuenta: 1712, impuestoAnual: null },
  },
  {
    nombre: "Coeficiente menor que el mínimo",
    origen: { tipo: "recalculado", detalle: "Coeficiente 0.8 % < 1.5 %: se paga 1.5 % de 10,000 = 150." },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 10000, coeficiente: 0.8, rentaNeta: null },
    esperado: { tasaPagoCuenta: 1.5, pagoCuenta: 150 },
  },
]);
