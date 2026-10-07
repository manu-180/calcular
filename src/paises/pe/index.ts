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
  ],
  novedades,
  detectores,
});
