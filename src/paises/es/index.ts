import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import sueldoNeto from "./calculadoras/sueldo-neto";
import retencionIrpf from "./calculadoras/retencion-irpf";
import cotizacionSeguridadSocial from "./calculadoras/cotizacion-seguridad-social";
import costeTrabajador from "./calculadoras/coste-trabajador";
import iva from "./calculadoras/iva";
import salarioMinimo from "./calculadoras/salario-minimo";
import cuotaAutonomos from "./calculadoras/cuota-autonomos";
import indemnizacionDespido from "./calculadoras/indemnizacion-despido";
import finiquito from "./calculadoras/finiquito";
import vacaciones from "./calculadoras/vacaciones";
import pagasExtra from "./calculadoras/pagas-extra";
import horasExtra from "./calculadoras/horas-extra";
import paro from "./calculadoras/paro";
import bajaLaboral from "./calculadoras/baja-laboral";
import iprem from "./calculadoras/iprem";
import facturaAutonomo from "./calculadoras/factura-autonomo";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
import contenidoRetencionIrpf from "./contenido/retencion-irpf";
import contenidoCotizacionSeguridadSocial from "./contenido/cotizacion-seguridad-social";
import contenidoCosteTrabajador from "./contenido/coste-trabajador";
import contenidoIva from "./contenido/iva";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoCuotaAutonomos from "./contenido/cuota-autonomos";
import contenidoIndemnizacionDespido from "./contenido/indemnizacion-despido";
import contenidoFiniquito from "./contenido/finiquito";
import contenidoVacaciones from "./contenido/vacaciones";
import contenidoPagasExtra from "./contenido/pagas-extra";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoParo from "./contenido/paro";
import contenidoBajaLaboral from "./contenido/baja-laboral";
import contenidoIprem from "./contenido/iprem";
import contenidoFacturaAutonomo from "./contenido/factura-autonomo";
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
    { definicion: sueldoNeto, contenido: contenidoSueldoNeto, cliente: () => import("./calculadoras/sueldo-neto.cliente") },
    { definicion: retencionIrpf, contenido: contenidoRetencionIrpf, cliente: () => import("./calculadoras/retencion-irpf.cliente") },
    { definicion: cotizacionSeguridadSocial, contenido: contenidoCotizacionSeguridadSocial, cliente: () => import("./calculadoras/cotizacion-seguridad-social.cliente") },
    { definicion: costeTrabajador, contenido: contenidoCosteTrabajador, cliente: () => import("./calculadoras/coste-trabajador.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: cuotaAutonomos, contenido: contenidoCuotaAutonomos, cliente: () => import("./calculadoras/cuota-autonomos.cliente") },
    { definicion: indemnizacionDespido, contenido: contenidoIndemnizacionDespido, cliente: () => import("./calculadoras/indemnizacion-despido.cliente") },
    { definicion: finiquito, contenido: contenidoFiniquito, cliente: () => import("./calculadoras/finiquito.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: pagasExtra, contenido: contenidoPagasExtra, cliente: () => import("./calculadoras/pagas-extra.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: paro, contenido: contenidoParo, cliente: () => import("./calculadoras/paro.cliente") },
    { definicion: bajaLaboral, contenido: contenidoBajaLaboral, cliente: () => import("./calculadoras/baja-laboral.cliente") },
    { definicion: iprem, contenido: contenidoIprem, cliente: () => import("./calculadoras/iprem.cliente") },
    { definicion: facturaAutonomo, contenido: contenidoFacturaAutonomo, cliente: () => import("./calculadoras/factura-autonomo.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
