import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import sueldoNeto from "./calculadoras/sueldo-neto";
import retencionIrpf from "./calculadoras/retencion-irpf";
import cotizacionSeguridadSocial from "./calculadoras/cotizacion-seguridad-social";
import costeTrabajador from "./calculadoras/coste-trabajador";
import iva from "./calculadoras/iva";
import salarioMinimo from "./calculadoras/salario-minimo";
import cuotaAutonomos from "./calculadoras/cuota-autonomos";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
import contenidoRetencionIrpf from "./contenido/retencion-irpf";
import contenidoCotizacionSeguridadSocial from "./contenido/cotizacion-seguridad-social";
import contenidoCosteTrabajador from "./contenido/coste-trabajador";
import contenidoIva from "./contenido/iva";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoCuotaAutonomos from "./contenido/cuota-autonomos";
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
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
