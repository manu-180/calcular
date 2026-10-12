import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import aguinaldoProporcional from "./calculadoras/aguinaldo-proporcional";
import antiguedadLaboral from "./calculadoras/antiguedad-laboral";
import bonificacionFamiliar from "./calculadoras/bonificacion-familiar";
import costoEmpleador from "./calculadoras/costo-empleador";
import cotizacionDolar from "./calculadoras/cotizacion-dolar";
import estabilidadLaboral from "./calculadoras/estabilidad-laboral";
import fallecimientoDelTrabajador from "./calculadoras/fallecimiento-del-trabajador";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import horasExtra from "./calculadoras/horas-extra";
import idu from "./calculadoras/idu";
import indemnizacionPorDespido from "./calculadoras/indemnizacion-por-despido";
import ire from "./calculadoras/ire";
import irp from "./calculadoras/irp";
import irpAlquiler from "./calculadoras/irp-alquiler";
import irpVentaInmueble from "./calculadoras/irp-venta-inmueble";
import iva from "./calculadoras/iva";
import ivaAPagar from "./calculadoras/iva-a-pagar";
import jornalMinimo from "./calculadoras/jornal-minimo";
import liquidacion from "./calculadoras/liquidacion";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import preaviso from "./calculadoras/preaviso";
import renuncia from "./calculadoras/renuncia";
import resimple from "./calculadoras/resimple";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import salarioPorHora from "./calculadoras/salario-por-hora";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import trabajoNocturno from "./calculadoras/trabajo-nocturno";
import vacaciones from "./calculadoras/vacaciones";
import vacacionesProporcionales from "./calculadoras/vacaciones-proporcionales";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAguinaldoProporcional from "./contenido/aguinaldo-proporcional";
import contenidoAntiguedadLaboral from "./contenido/antiguedad-laboral";
import contenidoBonificacionFamiliar from "./contenido/bonificacion-familiar";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoCotizacionDolar from "./contenido/cotizacion-dolar";
import contenidoEstabilidadLaboral from "./contenido/estabilidad-laboral";
import contenidoFallecimientoDelTrabajador from "./contenido/fallecimiento-del-trabajador";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIdu from "./contenido/idu";
import contenidoIndemnizacionPorDespido from "./contenido/indemnizacion-por-despido";
import contenidoIre from "./contenido/ire";
import contenidoIrp from "./contenido/irp";
import contenidoIrpAlquiler from "./contenido/irp-alquiler";
import contenidoIrpVentaInmueble from "./contenido/irp-venta-inmueble";
import contenidoIva from "./contenido/iva";
import contenidoIvaAPagar from "./contenido/iva-a-pagar";
import contenidoJornalMinimo from "./contenido/jornal-minimo";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoRenuncia from "./contenido/renuncia";
import contenidoResimple from "./contenido/resimple";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoTrabajoNocturno from "./contenido/trabajo-nocturno";
import contenidoVacaciones from "./contenido/vacaciones";
import contenidoVacacionesProporcionales from "./contenido/vacaciones-proporcionales";
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
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: indemnizacionPorDespido, contenido: contenidoIndemnizacionPorDespido, cliente: () => import("./calculadoras/indemnizacion-por-despido.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: irp, contenido: contenidoIrp, cliente: () => import("./calculadoras/irp.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: jornalMinimo, contenido: contenidoJornalMinimo, cliente: () => import("./calculadoras/jornal-minimo.cliente") },
    { definicion: bonificacionFamiliar, contenido: contenidoBonificacionFamiliar, cliente: () => import("./calculadoras/bonificacion-familiar.cliente") },
    { definicion: cotizacionDolar, contenido: contenidoCotizacionDolar, cliente: () => import("./calculadoras/cotizacion-dolar.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: aguinaldoProporcional, contenido: contenidoAguinaldoProporcional, cliente: () => import("./calculadoras/aguinaldo-proporcional.cliente") },
    { definicion: antiguedadLaboral, contenido: contenidoAntiguedadLaboral, cliente: () => import("./calculadoras/antiguedad-laboral.cliente") },
    { definicion: estabilidadLaboral, contenido: contenidoEstabilidadLaboral, cliente: () => import("./calculadoras/estabilidad-laboral.cliente") },
    { definicion: fallecimientoDelTrabajador, contenido: contenidoFallecimientoDelTrabajador, cliente: () => import("./calculadoras/fallecimiento-del-trabajador.cliente") },
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: idu, contenido: contenidoIdu, cliente: () => import("./calculadoras/idu.cliente") },
    { definicion: ire, contenido: contenidoIre, cliente: () => import("./calculadoras/ire.cliente") },
    { definicion: irpAlquiler, contenido: contenidoIrpAlquiler, cliente: () => import("./calculadoras/irp-alquiler.cliente") },
    { definicion: irpVentaInmueble, contenido: contenidoIrpVentaInmueble, cliente: () => import("./calculadoras/irp-venta-inmueble.cliente") },
    { definicion: ivaAPagar, contenido: contenidoIvaAPagar, cliente: () => import("./calculadoras/iva-a-pagar.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: resimple, contenido: contenidoResimple, cliente: () => import("./calculadoras/resimple.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: trabajoNocturno, contenido: contenidoTrabajoNocturno, cliente: () => import("./calculadoras/trabajo-nocturno.cliente") },
    { definicion: vacacionesProporcionales, contenido: contenidoVacacionesProporcionales, cliente: () => import("./calculadoras/vacaciones-proporcionales.cliente") },
  ],
  novedades,
  detectores,
});
