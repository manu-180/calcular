import { definirCasos } from "@/motor/calculo";
import impoconsumo from "./impuesto-al-consumo";

export default definirCasos(impoconsumo, [
  {
    nombre: "Cuenta de 50.000 sin impuesto",
    origen: { tipo: "recalculado", detalle: "ET art. 512-9: 8 % de 50.000 = 4.000. Total 54.000." },
    fecha: "2026-10-15",
    entrada: { operacion: "agregar", monto: 50000 },
    esperado: { impuesto: 4000, total: 54000 },
  },
  {
    nombre: "Sacar el impuesto de 54.000",
    origen: { tipo: "recalculado", detalle: "54.000 / 1,08 = 50.000; impuesto 4.000." },
    fecha: "2026-10-15",
    entrada: { operacion: "quitar", monto: 54000 },
    esperado: { base: 50000, impuesto: 4000 },
  },
  {
    nombre: "Precio que no divide exacto",
    origen: { tipo: "recalculado", detalle: "100.000 / 1,08 = 92.592,6, que redondea a 92.593; impuesto 7.407." },
    fecha: "2026-10-15",
    entrada: { operacion: "quitar", monto: 100000 },
    esperado: { base: 92593, impuesto: 7407, total: 100000 },
  },
]);
