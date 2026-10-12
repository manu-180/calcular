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
  ],
  novedades,
  detectores,
});
