import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import accidenteDeTrabajo from "./calculadoras/accidente-de-trabajo";
import antiguedad from "./calculadoras/antiguedad";
import contratoAPlazoFijo from "./calculadoras/contrato-a-plazo-fijo";
import costoDeUnEmpleado from "./calculadoras/costo-de-un-empleado";
import decimoCuartoMes from "./calculadoras/decimo-cuarto-mes";
import decimoTercerMes from "./calculadoras/decimo-tercer-mes";
import depositoAPlazo from "./calculadoras/deposito-a-plazo";
import despidoEmbarazada from "./calculadoras/despido-embarazada";
import embargoDeSalario from "./calculadoras/embargo-de-salario";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import gananciaDeCapital from "./calculadoras/ganancia-de-capital";
import horasExtra from "./calculadoras/horas-extra";
import impuestoSobreAlquileres from "./calculadoras/impuesto-sobre-alquileres";
import impuestoSobreDividendos from "./calculadoras/impuesto-sobre-dividendos";
import impuestoSobreLaRenta from "./calculadoras/impuesto-sobre-la-renta";
import inflacion from "./calculadoras/inflacion";
import isrEmpresas from "./calculadoras/isr-empresas";
import isrNoResidentes from "./calculadoras/isr-no-residentes";
import isv from "./calculadoras/isv";
import liquidacion from "./calculadoras/liquidacion";
import maternidad from "./calculadoras/maternidad";
import muerteDelTrabajador from "./calculadoras/muerte-del-trabajador";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import preaviso from "./calculadoras/preaviso";
import prestacionesLaborales from "./calculadoras/prestaciones-laborales";
import prestamo from "./calculadoras/prestamo";
import renuncia from "./calculadoras/renuncia";
import reservaLaboral from "./calculadoras/reserva-laboral";
import retencionHonorarios from "./calculadoras/retencion-honorarios";
import retencionUnoPorCiento from "./calculadoras/retencion-uno-por-ciento";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import salarioPorHora from "./calculadoras/salario-por-hora";
import septimoDia from "./calculadoras/septimo-dia";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAccidenteDeTrabajo from "./contenido/accidente-de-trabajo";
import contenidoAntiguedad from "./contenido/antiguedad";
import contenidoContratoAPlazoFijo from "./contenido/contrato-a-plazo-fijo";
import contenidoCostoDeUnEmpleado from "./contenido/costo-de-un-empleado";
import contenidoDecimoCuartoMes from "./contenido/decimo-cuarto-mes";
import contenidoDecimoTercerMes from "./contenido/decimo-tercer-mes";
import contenidoDepositoAPlazo from "./contenido/deposito-a-plazo";
import contenidoDespidoEmbarazada from "./contenido/despido-embarazada";
import contenidoEmbargoDeSalario from "./contenido/embargo-de-salario";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import contenidoGananciaDeCapital from "./contenido/ganancia-de-capital";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoImpuestoSobreAlquileres from "./contenido/impuesto-sobre-alquileres";
import contenidoImpuestoSobreDividendos from "./contenido/impuesto-sobre-dividendos";
import contenidoImpuestoSobreLaRenta from "./contenido/impuesto-sobre-la-renta";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIsrEmpresas from "./contenido/isr-empresas";
import contenidoIsrNoResidentes from "./contenido/isr-no-residentes";
import contenidoIsv from "./contenido/isv";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoMaternidad from "./contenido/maternidad";
import contenidoMuerteDelTrabajador from "./contenido/muerte-del-trabajador";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoPrestacionesLaborales from "./contenido/prestaciones-laborales";
import contenidoPrestamo from "./contenido/prestamo";
import contenidoRenuncia from "./contenido/renuncia";
import contenidoReservaLaboral from "./contenido/reserva-laboral";
import contenidoRetencionHonorarios from "./contenido/retencion-honorarios";
import contenidoRetencionUnoPorCiento from "./contenido/retencion-uno-por-ciento";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoSeptimoDia from "./contenido/septimo-dia";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
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
    { definicion: decimoCuartoMes, contenido: contenidoDecimoCuartoMes, cliente: () => import("./calculadoras/decimo-cuarto-mes.cliente") },
    { definicion: prestacionesLaborales, contenido: contenidoPrestacionesLaborales, cliente: () => import("./calculadoras/prestaciones-laborales.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: impuestoSobreLaRenta, contenido: contenidoImpuestoSobreLaRenta, cliente: () => import("./calculadoras/impuesto-sobre-la-renta.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: decimoTercerMes, contenido: contenidoDecimoTercerMes, cliente: () => import("./calculadoras/decimo-tercer-mes.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: isv, contenido: contenidoIsv, cliente: () => import("./calculadoras/isv.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: septimoDia, contenido: contenidoSeptimoDia, cliente: () => import("./calculadoras/septimo-dia.cliente") },
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: maternidad, contenido: contenidoMaternidad, cliente: () => import("./calculadoras/maternidad.cliente") },
    { definicion: despidoEmbarazada, contenido: contenidoDespidoEmbarazada, cliente: () => import("./calculadoras/despido-embarazada.cliente") },
    { definicion: accidenteDeTrabajo, contenido: contenidoAccidenteDeTrabajo, cliente: () => import("./calculadoras/accidente-de-trabajo.cliente") },
    { definicion: muerteDelTrabajador, contenido: contenidoMuerteDelTrabajador, cliente: () => import("./calculadoras/muerte-del-trabajador.cliente") },
    { definicion: embargoDeSalario, contenido: contenidoEmbargoDeSalario, cliente: () => import("./calculadoras/embargo-de-salario.cliente") },
    { definicion: contratoAPlazoFijo, contenido: contenidoContratoAPlazoFijo, cliente: () => import("./calculadoras/contrato-a-plazo-fijo.cliente") },
    { definicion: antiguedad, contenido: contenidoAntiguedad, cliente: () => import("./calculadoras/antiguedad.cliente") },
    { definicion: reservaLaboral, contenido: contenidoReservaLaboral, cliente: () => import("./calculadoras/reserva-laboral.cliente") },
    { definicion: retencionHonorarios, contenido: contenidoRetencionHonorarios, cliente: () => import("./calculadoras/retencion-honorarios.cliente") },
    { definicion: retencionUnoPorCiento, contenido: contenidoRetencionUnoPorCiento, cliente: () => import("./calculadoras/retencion-uno-por-ciento.cliente") },
    { definicion: isrEmpresas, contenido: contenidoIsrEmpresas, cliente: () => import("./calculadoras/isr-empresas.cliente") },
    { definicion: gananciaDeCapital, contenido: contenidoGananciaDeCapital, cliente: () => import("./calculadoras/ganancia-de-capital.cliente") },
    { definicion: impuestoSobreDividendos, contenido: contenidoImpuestoSobreDividendos, cliente: () => import("./calculadoras/impuesto-sobre-dividendos.cliente") },
    { definicion: impuestoSobreAlquileres, contenido: contenidoImpuestoSobreAlquileres, cliente: () => import("./calculadoras/impuesto-sobre-alquileres.cliente") },
    { definicion: isrNoResidentes, contenido: contenidoIsrNoResidentes, cliente: () => import("./calculadoras/isr-no-residentes.cliente") },
    { definicion: prestamo, contenido: contenidoPrestamo, cliente: () => import("./calculadoras/prestamo.cliente") },
    { definicion: depositoAPlazo, contenido: contenidoDepositoAPlazo, cliente: () => import("./calculadoras/deposito-a-plazo.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: costoDeUnEmpleado, contenido: contenidoCostoDeUnEmpleado, cliente: () => import("./calculadoras/costo-de-un-empleado.cliente") },
  ],
  novedades,
  detectores,
});
