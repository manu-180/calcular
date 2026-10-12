import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import costoEmpleador from "./calculadoras/costo-empleador";
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
import contenidoCostoEmpleador from "./contenido/costo-empleador";
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
import despidoIntempestivo from "./calculadoras/despido-intempestivo";
import contenidoDespidoIntempestivo from "./contenido/despido-intempestivo";
import desahucio from "./calculadoras/desahucio";
import contenidoDesahucio from "./contenido/desahucio";
import despidoIneficaz from "./calculadoras/despido-ineficaz";
import contenidoDespidoIneficaz from "./contenido/despido-ineficaz";
import jornadaNocturna from "./calculadoras/jornada-nocturna";
import contenidoJornadaNocturna from "./contenido/jornada-nocturna";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import licenciaMaternidad from "./calculadoras/licencia-maternidad";
import contenidoLicenciaMaternidad from "./contenido/licencia-maternidad";
import licenciaPaternidad from "./calculadoras/licencia-paternidad";
import contenidoLicenciaPaternidad from "./contenido/licencia-paternidad";
import contratoEventual from "./calculadoras/contrato-eventual";
import contenidoContratoEventual from "./contenido/contrato-eventual";
import jornadaParcial from "./calculadoras/jornada-parcial";
import contenidoJornadaParcial from "./contenido/jornada-parcial";
import sueldoPorDias from "./calculadoras/sueldo-por-dias";
import contenidoSueldoPorDias from "./contenido/sueldo-por-dias";
import aportesIess from "./calculadoras/aportes-iess";
import contenidoAportesIess from "./contenido/aportes-iess";
import gastosPersonales from "./calculadoras/gastos-personales";
import contenidoGastosPersonales from "./contenido/gastos-personales";
import cesantiaIess from "./calculadoras/cesantia-iess";
import contenidoCesantiaIess from "./contenido/cesantia-iess";
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
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: despidoIntempestivo, contenido: contenidoDespidoIntempestivo, cliente: () => import("./calculadoras/despido-intempestivo.cliente") },
    { definicion: desahucio, contenido: contenidoDesahucio, cliente: () => import("./calculadoras/desahucio.cliente") },
    { definicion: despidoIneficaz, contenido: contenidoDespidoIneficaz, cliente: () => import("./calculadoras/despido-ineficaz.cliente") },
    { definicion: jornadaNocturna, contenido: contenidoJornadaNocturna, cliente: () => import("./calculadoras/jornada-nocturna.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: licenciaMaternidad, contenido: contenidoLicenciaMaternidad, cliente: () => import("./calculadoras/licencia-maternidad.cliente") },
    { definicion: licenciaPaternidad, contenido: contenidoLicenciaPaternidad, cliente: () => import("./calculadoras/licencia-paternidad.cliente") },
    { definicion: contratoEventual, contenido: contenidoContratoEventual, cliente: () => import("./calculadoras/contrato-eventual.cliente") },
    { definicion: jornadaParcial, contenido: contenidoJornadaParcial, cliente: () => import("./calculadoras/jornada-parcial.cliente") },
    { definicion: sueldoPorDias, contenido: contenidoSueldoPorDias, cliente: () => import("./calculadoras/sueldo-por-dias.cliente") },
    { definicion: aportesIess, contenido: contenidoAportesIess, cliente: () => import("./calculadoras/aportes-iess.cliente") },
    { definicion: gastosPersonales, contenido: contenidoGastosPersonales, cliente: () => import("./calculadoras/gastos-personales.cliente") },
    { definicion: cesantiaIess, contenido: contenidoCesantiaIess, cliente: () => import("./calculadoras/cesantia-iess.cliente") },
  ],
  novedades,
  detectores,
});
