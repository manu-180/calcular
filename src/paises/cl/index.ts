import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import valorUf from "./calculadoras/valor-uf";
import valorUtm from "./calculadoras/valor-utm";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import impuestoUnico from "./calculadoras/impuesto-unico";
import finiquito from "./calculadoras/finiquito";
import vacacionesProporcionales from "./calculadoras/vacaciones-proporcionales";
import horasExtra from "./calculadoras/horas-extra";
import gratificacion from "./calculadoras/gratificacion";
import boletaHonorarios from "./calculadoras/boleta-de-honorarios";
import iva from "./calculadoras/iva";
import sueldoMinimo from "./calculadoras/sueldo-minimo";
import contenidoValorUf from "./contenido/valor-uf";
import contenidoValorUtm from "./contenido/valor-utm";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoImpuestoUnico from "./contenido/impuesto-unico";
import contenidoFiniquito from "./contenido/finiquito";
import contenidoVacacionesProporcionales from "./contenido/vacaciones-proporcionales";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoGratificacion from "./contenido/gratificacion";
import contenidoBoletaHonorarios from "./contenido/boleta-honorarios";
import contenidoIva from "./contenido/iva";
import contenidoSueldoMinimo from "./contenido/sueldo-minimo";
import inflacion from "./calculadoras/inflacion";
import contenidoInflacion from "./contenido/inflacion";
import trabajadoraCasaParticular from "./calculadoras/trabajadora-de-casa-particular";
import contenidoTrabajadoraCasaParticular from "./contenido/trabajadora-de-casa-particular";
import costoEmpresa from "./calculadoras/costo-empresa";
import contenidoCostoEmpresa from "./contenido/costo-empresa";
import indemnizacionPorAnosDeServicio from "./calculadoras/indemnizacion-por-anos-de-servicio";
import contenidoIndemnizacionPorAnosDeServicio from "./contenido/indemnizacion-por-anos-de-servicio";
import avisoPrevio from "./calculadoras/aviso-previo";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
import feriadoProgresivo from "./calculadoras/feriado-progresivo";
import contenidoFeriadoProgresivo from "./contenido/feriado-progresivo";
import topeImponible from "./calculadoras/tope-imponible";
import contenidoTopeImponible from "./contenido/tope-imponible";
import ufPorFecha from "./calculadoras/uf-por-fecha";
import contenidoUfPorFecha from "./contenido/uf-por-fecha";
import sueldoBruto from "./calculadoras/sueldo-bruto";
import contenidoSueldoBruto from "./contenido/sueldo-bruto";
import cotizacionesPrevisionales from "./calculadoras/cotizaciones-previsionales";
import contenidoCotizacionesPrevisionales from "./contenido/cotizaciones-previsionales";
import asignacionFamiliar from "./calculadoras/asignacion-familiar";
import contenidoAsignacionFamiliar from "./contenido/asignacion-familiar";
import pensionDeAlimentos from "./calculadoras/pension-de-alimentos";
import contenidoPensionDeAlimentos from "./contenido/pension-de-alimentos";
import pgu from "./calculadoras/pgu";
import contenidoPgu from "./contenido/pgu";
import aguinaldoPensionados from "./calculadoras/aguinaldo-pensionados";
import contenidoAguinaldoPensionados from "./contenido/aguinaldo-pensionados";
import semanaCorrida from "./calculadoras/semana-corrida";
import contenidoSemanaCorrida from "./contenido/semana-corrida";
import prenatalYPostnatal from "./calculadoras/prenatal-y-postnatal";
import contenidoPrenatalYPostnatal from "./contenido/prenatal-y-postnatal";
import ley40Horas from "./calculadoras/ley-40-horas";
import contenidoLey40Horas from "./contenido/ley-40-horas";
import sueldoProporcional from "./calculadoras/sueldo-proporcional";
import contenidoSueldoProporcional from "./contenido/sueldo-proporcional";
import seguroDeCesantia from "./calculadoras/seguro-de-cesantia";
import contenidoSeguroDeCesantia from "./contenido/seguro-de-cesantia";
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
    { definicion: valorUf, contenido: contenidoValorUf, cliente: () => import("./calculadoras/valor-uf.cliente") },
    { definicion: valorUtm, contenido: contenidoValorUtm, cliente: () => import("./calculadoras/valor-utm.cliente") },
    { definicion: sueldoLiquido, contenido: contenidoSueldoLiquido, cliente: () => import("./calculadoras/sueldo-liquido.cliente") },
    { definicion: impuestoUnico, contenido: contenidoImpuestoUnico, cliente: () => import("./calculadoras/impuesto-unico.cliente") },
    { definicion: finiquito, contenido: contenidoFiniquito, cliente: () => import("./calculadoras/finiquito.cliente") },
    { definicion: vacacionesProporcionales, contenido: contenidoVacacionesProporcionales, cliente: () => import("./calculadoras/vacaciones-proporcionales.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: gratificacion, contenido: contenidoGratificacion, cliente: () => import("./calculadoras/gratificacion.cliente") },
    { definicion: boletaHonorarios, contenido: contenidoBoletaHonorarios, cliente: () => import("./calculadoras/boleta-de-honorarios.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: sueldoMinimo, contenido: contenidoSueldoMinimo, cliente: () => import("./calculadoras/sueldo-minimo.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: trabajadoraCasaParticular, contenido: contenidoTrabajadoraCasaParticular, cliente: () => import("./calculadoras/trabajadora-de-casa-particular.cliente") },
    { definicion: costoEmpresa, contenido: contenidoCostoEmpresa, cliente: () => import("./calculadoras/costo-empresa.cliente") },
    { definicion: indemnizacionPorAnosDeServicio, contenido: contenidoIndemnizacionPorAnosDeServicio, cliente: () => import("./calculadoras/indemnizacion-por-anos-de-servicio.cliente") },
    { definicion: avisoPrevio, contenido: contenidoAvisoPrevio, cliente: () => import("./calculadoras/aviso-previo.cliente") },
    { definicion: feriadoProgresivo, contenido: contenidoFeriadoProgresivo, cliente: () => import("./calculadoras/feriado-progresivo.cliente") },
    { definicion: topeImponible, contenido: contenidoTopeImponible, cliente: () => import("./calculadoras/tope-imponible.cliente") },
    { definicion: ufPorFecha, contenido: contenidoUfPorFecha, cliente: () => import("./calculadoras/uf-por-fecha.cliente") },
    { definicion: sueldoBruto, contenido: contenidoSueldoBruto, cliente: () => import("./calculadoras/sueldo-bruto.cliente") },
    { definicion: cotizacionesPrevisionales, contenido: contenidoCotizacionesPrevisionales, cliente: () => import("./calculadoras/cotizaciones-previsionales.cliente") },
    { definicion: asignacionFamiliar, contenido: contenidoAsignacionFamiliar, cliente: () => import("./calculadoras/asignacion-familiar.cliente") },
    { definicion: pensionDeAlimentos, contenido: contenidoPensionDeAlimentos, cliente: () => import("./calculadoras/pension-de-alimentos.cliente") },
    { definicion: pgu, contenido: contenidoPgu, cliente: () => import("./calculadoras/pgu.cliente") },
    { definicion: aguinaldoPensionados, contenido: contenidoAguinaldoPensionados, cliente: () => import("./calculadoras/aguinaldo-pensionados.cliente") },
    { definicion: semanaCorrida, contenido: contenidoSemanaCorrida, cliente: () => import("./calculadoras/semana-corrida.cliente") },
    { definicion: prenatalYPostnatal, contenido: contenidoPrenatalYPostnatal, cliente: () => import("./calculadoras/prenatal-y-postnatal.cliente") },
    { definicion: ley40Horas, contenido: contenidoLey40Horas, cliente: () => import("./calculadoras/ley-40-horas.cliente") },
    { definicion: sueldoProporcional, contenido: contenidoSueldoProporcional, cliente: () => import("./calculadoras/sueldo-proporcional.cliente") },
    { definicion: seguroDeCesantia, contenido: contenidoSeguroDeCesantia, cliente: () => import("./calculadoras/seguro-de-cesantia.cliente") },
  ],
  novedades,
  detectores,
});
