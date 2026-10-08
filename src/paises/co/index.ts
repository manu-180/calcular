import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import auxilioDeTransporte from "./calculadoras/auxilio-de-transporte";
import cesantias from "./calculadoras/cesantias";
import horasExtras from "./calculadoras/horas-extras";
import indemnizacionPorDespido from "./calculadoras/indemnizacion-por-despido";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import primaDeServicios from "./calculadoras/prima-de-servicios";
import retencionEnLaFuente from "./calculadoras/retencion-en-la-fuente";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import trm from "./calculadoras/trm";
import uvr from "./calculadoras/uvr";
import uvt from "./calculadoras/uvt";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAuxilio from "./contenido/auxilio-de-transporte";
import contenidoCesantias from "./contenido/cesantias";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIndemnizacion from "./contenido/indemnizacion-por-despido";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPrima from "./contenido/prima-de-servicios";
import contenidoRetencion from "./contenido/retencion-en-la-fuente";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoTrm from "./contenido/trm";
import contenidoUvr from "./contenido/uvr";
import contenidoUvt from "./contenido/uvt";
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
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: primaDeServicios, contenido: contenidoPrima, cliente: () => import("./calculadoras/prima-de-servicios.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: cesantias, contenido: contenidoCesantias, cliente: () => import("./calculadoras/cesantias.cliente") },
    { definicion: horasExtras, contenido: contenidoHorasExtras, cliente: () => import("./calculadoras/horas-extras.cliente") },
    { definicion: indemnizacionPorDespido, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion-por-despido.cliente") },
    { definicion: retencionEnLaFuente, contenido: contenidoRetencion, cliente: () => import("./calculadoras/retencion-en-la-fuente.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: auxilioDeTransporte, contenido: contenidoAuxilio, cliente: () => import("./calculadoras/auxilio-de-transporte.cliente") },
    { definicion: uvt, contenido: contenidoUvt, cliente: () => import("./calculadoras/uvt.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: trm, contenido: contenidoTrm, cliente: () => import("./calculadoras/trm.cliente") },
    { definicion: uvr, contenido: contenidoUvr, cliente: () => import("./calculadoras/uvr.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
  ],
  novedades,
  detectores,
});
