import { definirCasos } from "@/motor/calculo";
import salarioBruto from "./salario-bruto";

export default definirCasos(salarioBruto, [
  {
    nombre: "Neto del salario mínimo",
    origen: {
      tipo: "oficial",
      url: "https://portal.ips.gov.py/sistemas/ipsportal/contenido.php?c=372",
      detalle: "Tabla N° 1 del IPS: base 3.044.000, aporte del trabajador 9 % = 273.960, neto 2.770.040. A la inversa: 2.770.040 / 0,91 = 3.044.000.",
    },
    fecha: "2026-10-12",
    entrada: { neto: 2770040 },
    esperado: { bruto: 3044000, ips: 273960, neto: 2770040 },
  },
  {
    nombre: "Neto de 3.640.000",
    origen: { tipo: "recalculado", detalle: "3.640.000 / 0,91 = 4.000.000; IPS 360.000." },
    fecha: "2026-10-12",
    entrada: { neto: 3640000 },
    esperado: { bruto: 4000000, ips: 360000, neto: 3640000 },
  },
]);
