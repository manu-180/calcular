import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import costoEmpleador from "./calculadoras/costo-empleador";
import decimoTercerMes from "./calculadoras/decimo-tercer-mes";
import horasExtra from "./calculadoras/horas-extra";
import impuestoSobreLaRenta from "./calculadoras/impuesto-sobre-la-renta";
import inflacion from "./calculadoras/inflacion";
import indemnizacion from "./calculadoras/indemnizacion-por-despido";
import itbms from "./calculadoras/itbms";
import liquidacion from "./calculadoras/liquidacion";
import primaDeAntiguedad from "./calculadoras/prima-de-antiguedad";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import vacaciones from "./calculadoras/vacaciones";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoDecimo from "./contenido/decimo-tercer-mes";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIsr from "./contenido/impuesto-sobre-la-renta";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIndemnizacion from "./contenido/indemnizacion-por-despido";
import contenidoItbms from "./contenido/itbms";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPrima from "./contenido/prima-de-antiguedad";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoVacaciones from "./contenido/vacaciones";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: decimoTercerMes, contenido: contenidoDecimo, cliente: () => import("./calculadoras/decimo-tercer-mes.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: primaDeAntiguedad, contenido: contenidoPrima, cliente: () => import("./calculadoras/prima-de-antiguedad.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion-por-despido.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: impuestoSobreLaRenta, contenido: contenidoIsr, cliente: () => import("./calculadoras/impuesto-sobre-la-renta.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: itbms, contenido: contenidoItbms, cliente: () => import("./calculadoras/itbms.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
  ],
  novedades,
  detectores,
});
