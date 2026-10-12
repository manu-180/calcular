import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import aguinaldoProporcional from "./calculadoras/aguinaldo-proporcional";
import bonificacionFamiliar from "./calculadoras/bonificacion-familiar";
import costoEmpleador from "./calculadoras/costo-empleador";
import cotizacionDolar from "./calculadoras/cotizacion-dolar";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import horasExtra from "./calculadoras/horas-extra";
import indemnizacionPorDespido from "./calculadoras/indemnizacion-por-despido";
import irp from "./calculadoras/irp";
import iva from "./calculadoras/iva";
import jornalMinimo from "./calculadoras/jornal-minimo";
import liquidacion from "./calculadoras/liquidacion";
import preaviso from "./calculadoras/preaviso";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import salarioPorHora from "./calculadoras/salario-por-hora";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import trabajoNocturno from "./calculadoras/trabajo-nocturno";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAguinaldoProporcional from "./contenido/aguinaldo-proporcional";
import contenidoBonificacionFamiliar from "./contenido/bonificacion-familiar";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoCotizacionDolar from "./contenido/cotizacion-dolar";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIndemnizacionPorDespido from "./contenido/indemnizacion-por-despido";
import contenidoIrp from "./contenido/irp";
import contenidoIva from "./contenido/iva";
import contenidoJornalMinimo from "./contenido/jornal-minimo";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoTrabajoNocturno from "./contenido/trabajo-nocturno";
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
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: trabajoNocturno, contenido: contenidoTrabajoNocturno, cliente: () => import("./calculadoras/trabajo-nocturno.cliente") },
  ],
  novedades,
  detectores,
});
