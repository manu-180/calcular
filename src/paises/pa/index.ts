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
import salarioPorHora from "./calculadoras/salario-por-hora";
import jornadaNocturna from "./calculadoras/jornada-nocturna";
import domingoTrabajado from "./calculadoras/domingo-trabajado";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import preaviso from "./calculadoras/preaviso";
import liquidacionPorRenuncia from "./calculadoras/liquidacion-por-renuncia";
import renunciaJustificada from "./calculadoras/renuncia-justificada";
import fondoDeCesantia from "./calculadoras/fondo-de-cesantia";
import licenciaDeMaternidad from "./calculadoras/licencia-de-maternidad";
import licenciaPorEnfermedad from "./calculadoras/licencia-por-enfermedad";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import contratoPorTiempoDefinido from "./calculadoras/contrato-por-tiempo-definido";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import muerteDelTrabajador from "./calculadoras/muerte-del-trabajador";
import cuotaSeguroSocial from "./calculadoras/cuota-seguro-social";
import gastosDeRepresentacion from "./calculadoras/gastos-de-representacion";
import prestamoPersonal from "./calculadoras/prestamo-personal";
import impuestoDeInmueble from "./calculadoras/impuesto-de-inmueble";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoJornadaNocturna from "./contenido/jornada-nocturna";
import contenidoDomingoTrabajado from "./contenido/domingo-trabajado";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoLiquidacionPorRenuncia from "./contenido/liquidacion-por-renuncia";
import contenidoRenunciaJustificada from "./contenido/renuncia-justificada";
import contenidoFondoDeCesantia from "./contenido/fondo-de-cesantia";
import contenidoLicenciaDeMaternidad from "./contenido/licencia-de-maternidad";
import contenidoLicenciaPorEnfermedad from "./contenido/licencia-por-enfermedad";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoContratoPorTiempoDefinido from "./contenido/contrato-por-tiempo-definido";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoMuerteDelTrabajador from "./contenido/muerte-del-trabajador";
import contenidoCuotaSeguroSocial from "./contenido/cuota-seguro-social";
import contenidoGastosDeRepresentacion from "./contenido/gastos-de-representacion";
import contenidoPrestamoPersonal from "./contenido/prestamo-personal";
import contenidoImpuestoDeInmueble from "./contenido/impuesto-de-inmueble";
import licenciaDePaternidad from "./calculadoras/licencia-de-paternidad";
import interesesPorMoraLaboral from "./calculadoras/intereses-por-mora-laboral";
import indemnizacionAntesDe1995 from "./calculadoras/indemnizacion-antes-de-1995";
import contenidoLicenciaDePaternidad from "./contenido/licencia-de-paternidad";
import contenidoInteresesPorMoraLaboral from "./contenido/intereses-por-mora-laboral";
import contenidoIndemnizacionAntesDe1995 from "./contenido/indemnizacion-antes-de-1995";
import jubilacion from "./calculadoras/jubilacion";
import contenidoJubilacion from "./contenido/jubilacion";
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
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: jornadaNocturna, contenido: contenidoJornadaNocturna, cliente: () => import("./calculadoras/jornada-nocturna.cliente") },
    { definicion: domingoTrabajado, contenido: contenidoDomingoTrabajado, cliente: () => import("./calculadoras/domingo-trabajado.cliente") },
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: liquidacionPorRenuncia, contenido: contenidoLiquidacionPorRenuncia, cliente: () => import("./calculadoras/liquidacion-por-renuncia.cliente") },
    { definicion: renunciaJustificada, contenido: contenidoRenunciaJustificada, cliente: () => import("./calculadoras/renuncia-justificada.cliente") },
    { definicion: fondoDeCesantia, contenido: contenidoFondoDeCesantia, cliente: () => import("./calculadoras/fondo-de-cesantia.cliente") },
    { definicion: licenciaDeMaternidad, contenido: contenidoLicenciaDeMaternidad, cliente: () => import("./calculadoras/licencia-de-maternidad.cliente") },
    { definicion: licenciaPorEnfermedad, contenido: contenidoLicenciaPorEnfermedad, cliente: () => import("./calculadoras/licencia-por-enfermedad.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: contratoPorTiempoDefinido, contenido: contenidoContratoPorTiempoDefinido, cliente: () => import("./calculadoras/contrato-por-tiempo-definido.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: muerteDelTrabajador, contenido: contenidoMuerteDelTrabajador, cliente: () => import("./calculadoras/muerte-del-trabajador.cliente") },
    { definicion: cuotaSeguroSocial, contenido: contenidoCuotaSeguroSocial, cliente: () => import("./calculadoras/cuota-seguro-social.cliente") },
    { definicion: gastosDeRepresentacion, contenido: contenidoGastosDeRepresentacion, cliente: () => import("./calculadoras/gastos-de-representacion.cliente") },
    { definicion: prestamoPersonal, contenido: contenidoPrestamoPersonal, cliente: () => import("./calculadoras/prestamo-personal.cliente") },
    { definicion: impuestoDeInmueble, contenido: contenidoImpuestoDeInmueble, cliente: () => import("./calculadoras/impuesto-de-inmueble.cliente") },
    { definicion: licenciaDePaternidad, contenido: contenidoLicenciaDePaternidad, cliente: () => import("./calculadoras/licencia-de-paternidad.cliente") },
    { definicion: interesesPorMoraLaboral, contenido: contenidoInteresesPorMoraLaboral, cliente: () => import("./calculadoras/intereses-por-mora-laboral.cliente") },
    { definicion: indemnizacionAntesDe1995, contenido: contenidoIndemnizacionAntesDe1995, cliente: () => import("./calculadoras/indemnizacion-antes-de-1995.cliente") },
    { definicion: jubilacion, contenido: contenidoJubilacion, cliente: () => import("./calculadoras/jubilacion.cliente") },
  ],
  novedades,
  detectores,
});
