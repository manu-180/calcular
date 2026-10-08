import { definirCasos } from "@/motor/calculo";
import salarioNeto from "./salario-neto";

const IPS = "https://portal.ips.gov.py/sistemas/ipsportal/contenido.php?c=372" as const;

export default definirCasos(salarioNeto, [
  {
    nombre: "Cotizante general con el salario mínimo",
    origen: { tipo: "oficial", url: IPS, detalle: "Tabla N° 1 del IPS: base 3.044.000, trabajador 9 % = 273.960, empleador 16,5 % = 502.260." },
    fecha: "2026-10-07",
    entrada: { bruto: 3044000 },
    esperado: { ips: 273960, neto: 2770040, aporteEmpleador: 502260, costoEmpleador: 3546260 },
  },
  {
    nombre: "Chofer cobrador, con redondeo",
    origen: { tipo: "oficial", url: IPS, detalle: "Tabla N° 1 del IPS: base 3.996.788, trabajador 359.711 (359.710,92 redondeado), empleador 659.470." },
    fecha: "2026-07-01",
    entrada: { bruto: 3996788 },
    esperado: { ips: 359711, neto: 3637077, aporteEmpleador: 659470 },
  },
  {
    nombre: "Salario de 4 millones",
    origen: { tipo: "recalculado", detalle: "4.000.000 × 9 % = 360.000; neto 3.640.000. Empleador 16,5 % = 660.000." },
    fecha: "2026-10-07",
    entrada: { bruto: 4000000 },
    esperado: { ips: 360000, neto: 3640000, aporteEmpleador: 660000, costoEmpleador: 4660000 },
  },
]);
