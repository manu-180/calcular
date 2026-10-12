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
import sueldoBruto from "./calculadoras/sueldo-bruto";
import contenidoSueldoBruto from "./contenido/sueldo-bruto";
import asimiladosASalarios from "./calculadoras/asimilados-a-salarios";
import contenidoAsimiladosASalarios from "./contenido/asimilados-a-salarios";
import primaDominical from "./calculadoras/prima-dominical";
import contenidoPrimaDominical from "./contenido/prima-dominical";
import diaFestivoTrabajado from "./calculadoras/dia-festivo-trabajado";
import contenidoDiaFestivoTrabajado from "./contenido/dia-festivo-trabajado";
import subsidioAlEmpleo from "./calculadoras/subsidio-al-empleo";
import contenidoSubsidioAlEmpleo from "./contenido/subsidio-al-empleo";
import incapacidadImss from "./calculadoras/incapacidad-imss";
import contenidoIncapacidadImss from "./contenido/incapacidad-imss";
import cetes from "./calculadoras/cetes";
import contenidoCetes from "./contenido/cetes";
import declaracionAnual from "./calculadoras/declaracion-anual";
import contenidoDeclaracionAnual from "./contenido/declaracion-anual";
import deduccionesPersonales from "./calculadoras/deducciones-personales";
import contenidoDeduccionesPersonales from "./contenido/deducciones-personales";
import reciboDeHonorarios from "./calculadoras/recibo-de-honorarios";
import contenidoReciboDeHonorarios from "./contenido/recibo-de-honorarios";
import isrArrendamiento from "./calculadoras/isr-arrendamiento";
import contenidoIsrArrendamiento from "./contenido/isr-arrendamiento";
import salarioMinimoProfesional from "./calculadoras/salario-minimo-profesional";
import contenidoSalarioMinimoProfesional from "./contenido/salario-minimo-profesional";
import retiroPorDesempleo from "./calculadoras/retiro-por-desempleo";
import contenidoRetiroPorDesempleo from "./contenido/retiro-por-desempleo";
import isrAguinaldoArticulo174 from "./calculadoras/isr-aguinaldo-articulo-174";
import contenidoIsrAguinaldoArticulo174 from "./contenido/isr-aguinaldo-articulo-174";
import aportacionInfonavit from "./calculadoras/aportacion-infonavit";
import contenidoAportacionInfonavit from "./contenido/aportacion-infonavit";
import salarioPorHora from "./calculadoras/salario-por-hora";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import jornadaLaboral from "./calculadoras/jornada-laboral";
import contenidoJornadaLaboral from "./contenido/jornada-laboral";
import fondoDeAhorro from "./calculadoras/fondo-de-ahorro";
import contenidoFondoDeAhorro from "./contenido/fondo-de-ahorro";
import isrHorasExtra from "./calculadoras/isr-horas-extra";
import contenidoIsrHorasExtra from "./contenido/isr-horas-extra";
import antiguedadLaboral from "./calculadoras/antiguedad-laboral";
import contenidoAntiguedadLaboral from "./contenido/antiguedad-laboral";
import valesDeDespensa from "./calculadoras/vales-de-despensa";
import contenidoValesDeDespensa from "./contenido/vales-de-despensa";
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
    { definicion: sueldoBruto, contenido: contenidoSueldoBruto, cliente: () => import("./calculadoras/sueldo-bruto.cliente") },
    { definicion: asimiladosASalarios, contenido: contenidoAsimiladosASalarios, cliente: () => import("./calculadoras/asimilados-a-salarios.cliente") },
    { definicion: primaDominical, contenido: contenidoPrimaDominical, cliente: () => import("./calculadoras/prima-dominical.cliente") },
    { definicion: diaFestivoTrabajado, contenido: contenidoDiaFestivoTrabajado, cliente: () => import("./calculadoras/dia-festivo-trabajado.cliente") },
    { definicion: subsidioAlEmpleo, contenido: contenidoSubsidioAlEmpleo, cliente: () => import("./calculadoras/subsidio-al-empleo.cliente") },
    { definicion: incapacidadImss, contenido: contenidoIncapacidadImss, cliente: () => import("./calculadoras/incapacidad-imss.cliente") },
    { definicion: cetes, contenido: contenidoCetes, cliente: () => import("./calculadoras/cetes.cliente") },
    { definicion: declaracionAnual, contenido: contenidoDeclaracionAnual, cliente: () => import("./calculadoras/declaracion-anual.cliente") },
    { definicion: deduccionesPersonales, contenido: contenidoDeduccionesPersonales, cliente: () => import("./calculadoras/deducciones-personales.cliente") },
    { definicion: reciboDeHonorarios, contenido: contenidoReciboDeHonorarios, cliente: () => import("./calculadoras/recibo-de-honorarios.cliente") },
    { definicion: isrArrendamiento, contenido: contenidoIsrArrendamiento, cliente: () => import("./calculadoras/isr-arrendamiento.cliente") },
    { definicion: salarioMinimoProfesional, contenido: contenidoSalarioMinimoProfesional, cliente: () => import("./calculadoras/salario-minimo-profesional.cliente") },
    { definicion: retiroPorDesempleo, contenido: contenidoRetiroPorDesempleo, cliente: () => import("./calculadoras/retiro-por-desempleo.cliente") },
    { definicion: isrAguinaldoArticulo174, contenido: contenidoIsrAguinaldoArticulo174, cliente: () => import("./calculadoras/isr-aguinaldo-articulo-174.cliente") },
    { definicion: aportacionInfonavit, contenido: contenidoAportacionInfonavit, cliente: () => import("./calculadoras/aportacion-infonavit.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: jornadaLaboral, contenido: contenidoJornadaLaboral, cliente: () => import("./calculadoras/jornada-laboral.cliente") },
    { definicion: fondoDeAhorro, contenido: contenidoFondoDeAhorro, cliente: () => import("./calculadoras/fondo-de-ahorro.cliente") },
    { definicion: isrHorasExtra, contenido: contenidoIsrHorasExtra, cliente: () => import("./calculadoras/isr-horas-extra.cliente") },
    { definicion: antiguedadLaboral, contenido: contenidoAntiguedadLaboral, cliente: () => import("./calculadoras/antiguedad-laboral.cliente") },
    { definicion: valesDeDespensa, contenido: contenidoValesDeDespensa, cliente: () => import("./calculadoras/vales-de-despensa.cliente") },
  ],
  novedades,
  detectores,
});
