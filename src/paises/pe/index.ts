import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import cts from "./calculadoras/cts";
import gratificacion from "./calculadoras/gratificacion";
import horasExtras from "./calculadoras/horas-extras";
import igv from "./calculadoras/igv";
import despido from "./calculadoras/indemnizacion-por-despido-arbitrario";
import liquidacion from "./calculadoras/liquidacion-de-beneficios-sociales";
import recibo from "./calculadoras/recibo-por-honorarios";
import rentaQuinta from "./calculadoras/renta-de-quinta-categoria";
import sueldoMinimo from "./calculadoras/sueldo-minimo";
import sueldoNeto from "./calculadoras/sueldo-neto";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import uit from "./calculadoras/uit";
import vacaciones from "./calculadoras/vacaciones";
import contenidoCts from "./contenido/cts";
import contenidoGratificacion from "./contenido/gratificacion";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIgv from "./contenido/igv";
import contenidoDespido from "./contenido/indemnizacion-por-despido-arbitrario";
import contenidoLiquidacion from "./contenido/liquidacion-de-beneficios-sociales";
import contenidoRecibo from "./contenido/recibo-por-honorarios";
import contenidoRentaQuinta from "./contenido/renta-de-quinta-categoria";
import contenidoSueldoMinimo from "./contenido/sueldo-minimo";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoUit from "./contenido/uit";
import contenidoVacaciones from "./contenido/vacaciones";
import inflacion from "./calculadoras/inflacion";
import contenidoInflacion from "./contenido/inflacion";
import trabajadoraDelHogar from "./calculadoras/trabajadora-del-hogar";
import contenidoTrabajadoraDelHogar from "./contenido/trabajadora-del-hogar";
import costoLaboral from "./calculadoras/costo-laboral";
import contenidoCostoLaboral from "./contenido/costo-laboral";
import nuevoRus from "./calculadoras/nuevo-rus";
import contenidoNuevoRus from "./contenido/nuevo-rus";
import gratificacionTrunca from "./calculadoras/gratificacion-trunca";
import contenidoGratificacionTrunca from "./contenido/gratificacion-trunca";
import ctsTrunca from "./calculadoras/cts-trunca";
import contenidoCtsTrunca from "./contenido/cts-trunca";
import vacacionesTruncas from "./calculadoras/vacaciones-truncas";
import contenidoVacacionesTruncas from "./contenido/vacaciones-truncas";
import asignacionFamiliar from "./calculadoras/asignacion-familiar";
import contenidoAsignacionFamiliar from "./contenido/asignacion-familiar";
import afpOOnp from "./calculadoras/afp-o-onp";
import contenidoAfpOOnp from "./contenido/afp-o-onp";
import essalud from "./calculadoras/essalud";
import contenidoEssalud from "./contenido/essalud";
import trabajoNocturno from "./calculadoras/trabajo-nocturno";
import contenidoTrabajoNocturno from "./contenido/trabajo-nocturno";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import sueldoPorHora from "./calculadoras/sueldo-por-hora";
import contenidoSueldoPorHora from "./contenido/sueldo-por-hora";
import utilidades from "./calculadoras/utilidades";
import contenidoUtilidades from "./contenido/utilidades";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import preavisoDeRenuncia from "./calculadoras/preaviso-de-renuncia";
import contenidoPreavisoDeRenuncia from "./contenido/preaviso-de-renuncia";
import retiroDeCts from "./calculadoras/retiro-de-cts";
import contenidoRetiroDeCts from "./contenido/retiro-de-cts";
import itf from "./calculadoras/itf";
import contenidoItf from "./contenido/itf";
import rentaDePrimeraCategoria from "./calculadoras/renta-de-primera-categoria";
import contenidoRentaDePrimeraCategoria from "./contenido/renta-de-primera-categoria";
import impuestoVentaDeInmueble from "./calculadoras/impuesto-venta-de-inmueble";
import contenidoImpuestoVentaDeInmueble from "./contenido/impuesto-venta-de-inmueble";
import impuestoALosDividendos from "./calculadoras/impuesto-a-los-dividendos";
import contenidoImpuestoALosDividendos from "./contenido/impuesto-a-los-dividendos";
import interesesMoratoriosSunat from "./calculadoras/intereses-moratorios-sunat";
import contenidoInteresesMoratoriosSunat from "./contenido/intereses-moratorios-sunat";
import rer from "./calculadoras/rer";
import contenidoRer from "./contenido/rer";
import regimenMypeTributario from "./calculadoras/regimen-mype-tributario";
import contenidoRegimenMypeTributario from "./contenido/regimen-mype-tributario";
import impuestoALaRentaEmpresas from "./calculadoras/impuesto-a-la-renta-empresas";
import contenidoImpuestoALaRentaEmpresas from "./contenido/impuesto-a-la-renta-empresas";
import gastosDeducibles from "./calculadoras/gastos-deducibles";
import contenidoGastosDeducibles from "./contenido/gastos-deducibles";
import detracciones from "./calculadoras/detracciones";
import contenidoDetracciones from "./contenido/detracciones";
import plazoFijo from "./calculadoras/plazo-fijo";
import contenidoPlazoFijo from "./contenido/plazo-fijo";
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
  universales: "todas",
  calculadoras: [
    { definicion: gratificacion, contenido: contenidoGratificacion, cliente: () => import("./calculadoras/gratificacion.cliente") },
    { definicion: cts, contenido: contenidoCts, cliente: () => import("./calculadoras/cts.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion-de-beneficios-sociales.cliente") },
    { definicion: rentaQuinta, contenido: contenidoRentaQuinta, cliente: () => import("./calculadoras/renta-de-quinta-categoria.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtras, contenido: contenidoHorasExtras, cliente: () => import("./calculadoras/horas-extras.cliente") },
    { definicion: despido, contenido: contenidoDespido, cliente: () => import("./calculadoras/indemnizacion-por-despido-arbitrario.cliente") },
    { definicion: recibo, contenido: contenidoRecibo, cliente: () => import("./calculadoras/recibo-por-honorarios.cliente") },
    { definicion: igv, contenido: contenidoIgv, cliente: () => import("./calculadoras/igv.cliente") },
    { definicion: uit, contenido: contenidoUit, cliente: () => import("./calculadoras/uit.cliente") },
    { definicion: sueldoMinimo, contenido: contenidoSueldoMinimo, cliente: () => import("./calculadoras/sueldo-minimo.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: sueldoNeto, contenido: contenidoSueldoNeto, cliente: () => import("./calculadoras/sueldo-neto.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: trabajadoraDelHogar, contenido: contenidoTrabajadoraDelHogar, cliente: () => import("./calculadoras/trabajadora-del-hogar.cliente") },
    { definicion: costoLaboral, contenido: contenidoCostoLaboral, cliente: () => import("./calculadoras/costo-laboral.cliente") },
    { definicion: nuevoRus, contenido: contenidoNuevoRus, cliente: () => import("./calculadoras/nuevo-rus.cliente") },
    { definicion: gratificacionTrunca, contenido: contenidoGratificacionTrunca, cliente: () => import("./calculadoras/gratificacion-trunca.cliente") },
    { definicion: ctsTrunca, contenido: contenidoCtsTrunca, cliente: () => import("./calculadoras/cts-trunca.cliente") },
    { definicion: vacacionesTruncas, contenido: contenidoVacacionesTruncas, cliente: () => import("./calculadoras/vacaciones-truncas.cliente") },
    { definicion: asignacionFamiliar, contenido: contenidoAsignacionFamiliar, cliente: () => import("./calculadoras/asignacion-familiar.cliente") },
    { definicion: afpOOnp, contenido: contenidoAfpOOnp, cliente: () => import("./calculadoras/afp-o-onp.cliente") },
    { definicion: essalud, contenido: contenidoEssalud, cliente: () => import("./calculadoras/essalud.cliente") },
    { definicion: trabajoNocturno, contenido: contenidoTrabajoNocturno, cliente: () => import("./calculadoras/trabajo-nocturno.cliente") },
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: sueldoPorHora, contenido: contenidoSueldoPorHora, cliente: () => import("./calculadoras/sueldo-por-hora.cliente") },
    { definicion: utilidades, contenido: contenidoUtilidades, cliente: () => import("./calculadoras/utilidades.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: preavisoDeRenuncia, contenido: contenidoPreavisoDeRenuncia, cliente: () => import("./calculadoras/preaviso-de-renuncia.cliente") },
    { definicion: retiroDeCts, contenido: contenidoRetiroDeCts, cliente: () => import("./calculadoras/retiro-de-cts.cliente") },
    { definicion: itf, contenido: contenidoItf, cliente: () => import("./calculadoras/itf.cliente") },
    { definicion: rentaDePrimeraCategoria, contenido: contenidoRentaDePrimeraCategoria, cliente: () => import("./calculadoras/renta-de-primera-categoria.cliente") },
    { definicion: impuestoVentaDeInmueble, contenido: contenidoImpuestoVentaDeInmueble, cliente: () => import("./calculadoras/impuesto-venta-de-inmueble.cliente") },
    { definicion: impuestoALosDividendos, contenido: contenidoImpuestoALosDividendos, cliente: () => import("./calculadoras/impuesto-a-los-dividendos.cliente") },
    { definicion: interesesMoratoriosSunat, contenido: contenidoInteresesMoratoriosSunat, cliente: () => import("./calculadoras/intereses-moratorios-sunat.cliente") },
    { definicion: rer, contenido: contenidoRer, cliente: () => import("./calculadoras/rer.cliente") },
    { definicion: regimenMypeTributario, contenido: contenidoRegimenMypeTributario, cliente: () => import("./calculadoras/regimen-mype-tributario.cliente") },
    { definicion: impuestoALaRentaEmpresas, contenido: contenidoImpuestoALaRentaEmpresas, cliente: () => import("./calculadoras/impuesto-a-la-renta-empresas.cliente") },
    { definicion: gastosDeducibles, contenido: contenidoGastosDeducibles, cliente: () => import("./calculadoras/gastos-deducibles.cliente") },
    { definicion: detracciones, contenido: contenidoDetracciones, cliente: () => import("./calculadoras/detracciones.cliente") },
    { definicion: plazoFijo, contenido: contenidoPlazoFijo, cliente: () => import("./calculadoras/plazo-fijo.cliente") },
  ],
  novedades,
  detectores,
});
