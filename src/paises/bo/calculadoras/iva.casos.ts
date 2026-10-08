import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

const LEY843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(iva, [
  {
    nombre: "Factura de 1.000",
    origen: { tipo: "recalculado", url: LEY843, detalle: "Ley 843: IVA 13 % incluido en el precio (arts. 5 y 15) = 130; IT 3 % sobre el ingreso bruto (arts. 74 y 75) = 30. Queda 840." },
    fecha: "2026-10-07",
    entrada: { sentido: "precio", monto: 1000 },
    esperado: { precio: 1000, iva: 130, it: 30, neto: 840 },
  },
  {
    nombre: "Quiere recibir 840 limpios",
    origen: { tipo: "recalculado", detalle: "840 / (1 − 0,16) = 1.000." },
    fecha: "2026-10-07",
    entrada: { sentido: "neto", monto: 840 },
    esperado: { precio: 1000, iva: 130, it: 30, neto: 840 },
  },
  {
    nombre: "Quiere recibir 5.000 limpios",
    origen: { tipo: "recalculado", detalle: "5.000 / 0,84 = 5.952,38; IVA 773,81; IT 178,57; queda 5.000." },
    fecha: "2026-10-07",
    entrada: { sentido: "neto", monto: 5000 },
    esperado: { precio: 5952.38, iva: 773.81, it: 178.57, neto: 5000 },
  },
]);
