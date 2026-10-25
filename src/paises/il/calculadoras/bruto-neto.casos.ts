import { definirCasos } from "@/motor/calculo";
import calculadora from "./bruto-neto";

export default definirCasos(calculadora, [
  {
    nombre: "Inverso del caso de 15.000 brutos",
    origen: { tipo: "recalculado", detalle: "El caso de sachar-neto da 11.549,19 netos con 15.000 brutos (hombre, pensión 6 %): el bruto pedido vuelve a 15.000." },
    fecha: "2026-10-24",
    entrada: { neto: 11549.19, min: "gever", nekudotNosafot: 0, pensia: 6 },
    esperado: { bruto: 15000, netoBafoal: 11549.19 },
    tolerancia: 0.02,
  },
  {
    nombre: "Inverso del caso de 10.000 brutos sin impuesto",
    origen: { tipo: "recalculado", detalle: "10.000 brutos (mujer, 2 puntos más) dan 8.791,54 netos." },
    fecha: "2026-10-24",
    entrada: { neto: 8791.54, min: "isha", nekudotNosafot: 2, pensia: 6 },
    esperado: { bruto: 10000, masHachnasa: 0 },
    tolerancia: 0.02,
  },
  {
    nombre: "Sin neto",
    origen: { tipo: "recalculado", detalle: "Neto 0." },
    fecha: "2026-10-24",
    entrada: { neto: 0, min: "gever", nekudotNosafot: 0, pensia: 6 },
    esperaError: true,
  },
]);
