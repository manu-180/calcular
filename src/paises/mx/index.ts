import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import finiquito from "./calculadoras/finiquito";
import horasExtra from "./calculadoras/horas-extra";
import inflacion from "./calculadoras/inflacion";
import isr from "./calculadoras/isr";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import ptu from "./calculadoras/ptu";
import resico from "./calculadoras/resico";
import salarioMinimo from "./calculadoras/salario-minimo";
import sueldoNeto from "./calculadoras/sueldo-neto";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import udis from "./calculadoras/udis";
import uma from "./calculadoras/uma";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoFiniquito from "./contenido/finiquito";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIsr from "./contenido/isr";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPtu from "./contenido/ptu";
import contenidoResico from "./contenido/resico";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSueldoNeto from "./contenido/sueldo-neto";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoUdis from "./contenido/udis";
import contenidoUma from "./contenido/uma";
import contenidoVacaciones from "./contenido/vacaciones";
import trabajadoraDelHogar from "./calculadoras/trabajadora-del-hogar";
import contenidoTrabajadoraDelHogar from "./contenido/trabajadora-del-hogar";
import cuotasImss from "./calculadoras/cuotas-imss";
import contenidoCuotasImss from "./contenido/cuotas-imss";
import costoDeUnTrabajador from "./calculadoras/costo-de-un-trabajador";
import contenidoCostoDeUnTrabajador from "./contenido/costo-de-un-trabajador";
import salarioDiarioIntegrado from "./calculadoras/salario-diario-integrado";
import contenidoSalarioDiarioIntegrado from "./contenido/salario-diario-integrado";
import primaDeAntiguedad from "./calculadoras/prima-de-antiguedad";
import contenidoPrimaDeAntiguedad from "./contenido/prima-de-antiguedad";
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
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: finiquito, contenido: contenidoFiniquito, cliente: () => import("./calculadoras/finiquito.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: isr, contenido: contenidoIsr, cliente: () => import("./calculadoras/isr.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: ptu, contenido: contenidoPtu, cliente: () => import("./calculadoras/ptu.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: uma, contenido: contenidoUma, cliente: () => import("./calculadoras/uma.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: resico, contenido: contenidoResico, cliente: () => import("./calculadoras/resico.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: udis, contenido: contenidoUdis, cliente: () => import("./calculadoras/udis.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: trabajadoraDelHogar, contenido: contenidoTrabajadoraDelHogar, cliente: () => import("./calculadoras/trabajadora-del-hogar.cliente") },
    { definicion: cuotasImss, contenido: contenidoCuotasImss, cliente: () => import("./calculadoras/cuotas-imss.cliente") },
    { definicion: costoDeUnTrabajador, contenido: contenidoCostoDeUnTrabajador, cliente: () => import("./calculadoras/costo-de-un-trabajador.cliente") },
    { definicion: salarioDiarioIntegrado, contenido: contenidoSalarioDiarioIntegrado, cliente: () => import("./calculadoras/salario-diario-integrado.cliente") },
    { definicion: primaDeAntiguedad, contenido: contenidoPrimaDeAntiguedad, cliente: () => import("./calculadoras/prima-de-antiguedad.cliente") },
  ],
  novedades,
  detectores,
});
