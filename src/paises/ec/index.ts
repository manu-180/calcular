import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import decimoCuartoSueldo from "./calculadoras/decimo-cuarto-sueldo";
import decimoTercerSueldo from "./calculadoras/decimo-tercer-sueldo";
import fondosDeReserva from "./calculadoras/fondos-de-reserva";
import horasExtras from "./calculadoras/horas-extras";
import impuestoALaRenta from "./calculadoras/impuesto-a-la-renta";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import rimpe from "./calculadoras/rimpe";
import salarioBasico from "./calculadoras/salario-basico";
import sueldoNeto from "./calculadoras/sueldo-neto";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import utilidades from "./calculadoras/utilidades";
import vacaciones from "./calculadoras/vacaciones";
import contenidoDecimoCuartoSueldo from "./contenido/decimo-cuarto-sueldo";
import contenidoDecimoTercerSueldo from "./contenido/decimo-tercer-sueldo";
import contenidoFondosDeReserva from "./contenido/fondos-de-reserva";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoImpuestoALaRenta from "./contenido/impuesto-a-la-renta";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoRimpe from "./contenido/rimpe";
import contenidoSalarioBasico from "./contenido/salario-basico";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoUtilidades from "./contenido/utilidades";
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
    { definicion: decimoCuartoSueldo, contenido: contenidoDecimoCuartoSueldo, cliente: () => import("./calculadoras/decimo-cuarto-sueldo.cliente") },
    { definicion: decimoTercerSueldo, contenido: contenidoDecimoTercerSueldo, cliente: () => import("./calculadoras/decimo-tercer-sueldo.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: sueldoNeto, contenido: contenidoSueldoNeto, cliente: () => import("./calculadoras/sueldo-neto.cliente") },
    { definicion: impuestoALaRenta, contenido: contenidoImpuestoALaRenta, cliente: () => import("./calculadoras/impuesto-a-la-renta.cliente") },
    { definicion: salarioBasico, contenido: contenidoSalarioBasico, cliente: () => import("./calculadoras/salario-basico.cliente") },
    { definicion: fondosDeReserva, contenido: contenidoFondosDeReserva, cliente: () => import("./calculadoras/fondos-de-reserva.cliente") },
    { definicion: utilidades, contenido: contenidoUtilidades, cliente: () => import("./calculadoras/utilidades.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtras, contenido: contenidoHorasExtras, cliente: () => import("./calculadoras/horas-extras.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: rimpe, contenido: contenidoRimpe, cliente: () => import("./calculadoras/rimpe.cliente") },
  ],
  novedades,
  detectores,
});
