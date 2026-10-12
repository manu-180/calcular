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
  ],
  novedades,
  detectores,
});
