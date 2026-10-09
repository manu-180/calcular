import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

const TABLA_IPS = "https://portal.ips.gov.py/sistemas/ipsportal/contenido.php?c=372";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Salario mínimo desde julio 2026",
    origen: {
      tipo: "oficial",
      url: TABLA_IPS,
      detalle: "Tabla N° 1 del IPS, fila «Seguro doméstico»: base Gs. 3.044.000, trabajador 9 % = 273.960, empleador 16,5 % = 502.260, total 776.220. Aguinaldo 3.044.000 / 12 = 253.667. Costo 3.044.000 + 502.260 + 253.667 = 3.799.927.",
    },
    fecha: "2026-10-08",
    entrada: { salario: null },
    esperado: { minimo: 3044000, salario: 3044000, ipsTrabajador: 273960, neto: 2770040, ipsEmpleador: 502260, ipsTotal: 776220, aguinaldoMensual: 253667, costoMensual: 3799927 },
  },
  {
    nombre: "Salario por encima del mínimo",
    origen: { tipo: "recalculado", detalle: "3.500.000: IPS 9 % = 315.000; neto 3.185.000; empleador 16,5 % = 577.500; aguinaldo 291.667; costo 4.369.167." },
    fecha: "2026-10-08",
    entrada: { salario: 3500000 },
    esperado: { ipsTrabajador: 315000, neto: 3185000, ipsEmpleador: 577500, aguinaldoMensual: 291667, costoMensual: 4369167 },
  },
  {
    nombre: "Salario debajo del mínimo: el IPS cobra sobre el mínimo",
    origen: { tipo: "recalculado", detalle: "Con 2.000.000 los aportes salen de la base mínima de 3.044.000: 273.960 y 502.260." },
    fecha: "2026-10-08",
    entrada: { salario: 2000000 },
    esperado: { ipsTrabajador: 273960, ipsEmpleador: 502260, neto: 1726040 },
  },
]);
