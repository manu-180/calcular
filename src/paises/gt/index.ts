import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import bonificacionIncentivo from "./calculadoras/bonificacion-incentivo";
import bono14 from "./calculadoras/bono-14";
import costoPatronal from "./calculadoras/costo-patronal";
import cuotasIgss from "./calculadoras/cuotas-igss";
import embargoDeSalario from "./calculadoras/embargo-de-salario";
import horasExtra from "./calculadoras/horas-extra";
import impuestoDeSolidaridad from "./calculadoras/impuesto-de-solidaridad";
import impuestoDeTimbres from "./calculadoras/impuesto-de-timbres";
import indemnizacion from "./calculadoras/indemnizacion";
import inflacion from "./calculadoras/inflacion";
import isrAsalariados from "./calculadoras/isr-asalariados";
import isrRegimenSimplificado from "./calculadoras/isr-regimen-simplificado";
import isrRentasDeCapital from "./calculadoras/isr-rentas-de-capital";
import isrSobreUtilidades from "./calculadoras/isr-sobre-utilidades";
import iusi from "./calculadoras/iusi";
import iva from "./calculadoras/iva";
import licenciaDeMaternidad from "./calculadoras/licencia-de-maternidad";
import pagoDiaDeAsueto from "./calculadoras/pago-dia-de-asueto";
import pensionIgss from "./calculadoras/pension-igss";
import pequenoContribuyente from "./calculadoras/pequeno-contribuyente";
import periodoDeLactancia from "./calculadoras/periodo-de-lactancia";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import permisosConGoceDeSalario from "./calculadoras/permisos-con-goce-de-salario";
import plazoFijo from "./calculadoras/plazo-fijo";
import preaviso from "./calculadoras/preaviso";
import prestacionPostMortem from "./calculadoras/prestacion-post-mortem";
import salarioDiario from "./calculadoras/salario-diario";
import salarioMinimo from "./calculadoras/salario-minimo";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import suspensionIgss from "./calculadoras/suspension-igss";
import terminacionContratoPlazoFijo from "./calculadoras/terminacion-contrato-plazo-fijo";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import trabajadorasDeCasaParticular from "./calculadoras/trabajadoras-de-casa-particular";
import vacaciones from "./calculadoras/vacaciones";
import ventajasEconomicas from "./calculadoras/ventajas-economicas";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoBonificacionIncentivo from "./contenido/bonificacion-incentivo";
import contenidoBono14 from "./contenido/bono-14";
import contenidoCostoPatronal from "./contenido/costo-patronal";
import contenidoCuotasIgss from "./contenido/cuotas-igss";
import contenidoEmbargoDeSalario from "./contenido/embargo-de-salario";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoImpuestoDeSolidaridad from "./contenido/impuesto-de-solidaridad";
import contenidoImpuestoDeTimbres from "./contenido/impuesto-de-timbres";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIsrAsalariados from "./contenido/isr-asalariados";
import contenidoIsrRegimenSimplificado from "./contenido/isr-regimen-simplificado";
import contenidoIsrRentasDeCapital from "./contenido/isr-rentas-de-capital";
import contenidoIsrSobreUtilidades from "./contenido/isr-sobre-utilidades";
import contenidoIusi from "./contenido/iusi";
import contenidoIva from "./contenido/iva";
import contenidoLicenciaDeMaternidad from "./contenido/licencia-de-maternidad";
import contenidoPagoDiaDeAsueto from "./contenido/pago-dia-de-asueto";
import contenidoPensionIgss from "./contenido/pension-igss";
import contenidoPequenoContribuyente from "./contenido/pequeno-contribuyente";
import contenidoPeriodoDeLactancia from "./contenido/periodo-de-lactancia";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoPermisosConGoceDeSalario from "./contenido/permisos-con-goce-de-salario";
import contenidoPlazoFijo from "./contenido/plazo-fijo";
import contenidoPreaviso from "./contenido/preaviso";
import contenidoPrestacionPostMortem from "./contenido/prestacion-post-mortem";
import contenidoSalarioDiario from "./contenido/salario-diario";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoSuspensionIgss from "./contenido/suspension-igss";
import contenidoTerminacionContratoPlazoFijo from "./contenido/terminacion-contrato-plazo-fijo";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoTrabajadorasDeCasaParticular from "./contenido/trabajadoras-de-casa-particular";
import contenidoVacaciones from "./contenido/vacaciones";
import contenidoVentajasEconomicas from "./contenido/ventajas-economicas";
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
    { definicion: bono14, contenido: contenidoBono14, cliente: () => import("./calculadoras/bono-14.cliente") },
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: isrAsalariados, contenido: contenidoIsrAsalariados, cliente: () => import("./calculadoras/isr-asalariados.cliente") },
    { definicion: sueldoLiquido, contenido: contenidoSueldoLiquido, cliente: () => import("./calculadoras/sueldo-liquido.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: bonificacionIncentivo, contenido: contenidoBonificacionIncentivo, cliente: () => import("./calculadoras/bonificacion-incentivo.cliente") },
    { definicion: cuotasIgss, contenido: contenidoCuotasIgss, cliente: () => import("./calculadoras/cuotas-igss.cliente") },
    { definicion: costoPatronal, contenido: contenidoCostoPatronal, cliente: () => import("./calculadoras/costo-patronal.cliente") },
    { definicion: pequenoContribuyente, contenido: contenidoPequenoContribuyente, cliente: () => import("./calculadoras/pequeno-contribuyente.cliente") },
    { definicion: isrRegimenSimplificado, contenido: contenidoIsrRegimenSimplificado, cliente: () => import("./calculadoras/isr-regimen-simplificado.cliente") },
    { definicion: pensionIgss, contenido: contenidoPensionIgss, cliente: () => import("./calculadoras/pension-igss.cliente") },
    { definicion: suspensionIgss, contenido: contenidoSuspensionIgss, cliente: () => import("./calculadoras/suspension-igss.cliente") },
    { definicion: licenciaDeMaternidad, contenido: contenidoLicenciaDeMaternidad, cliente: () => import("./calculadoras/licencia-de-maternidad.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: isrSobreUtilidades, contenido: contenidoIsrSobreUtilidades, cliente: () => import("./calculadoras/isr-sobre-utilidades.cliente") },
    { definicion: impuestoDeSolidaridad, contenido: contenidoImpuestoDeSolidaridad, cliente: () => import("./calculadoras/impuesto-de-solidaridad.cliente") },
    { definicion: isrRentasDeCapital, contenido: contenidoIsrRentasDeCapital, cliente: () => import("./calculadoras/isr-rentas-de-capital.cliente") },
    { definicion: plazoFijo, contenido: contenidoPlazoFijo, cliente: () => import("./calculadoras/plazo-fijo.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: iusi, contenido: contenidoIusi, cliente: () => import("./calculadoras/iusi.cliente") },
    { definicion: impuestoDeTimbres, contenido: contenidoImpuestoDeTimbres, cliente: () => import("./calculadoras/impuesto-de-timbres.cliente") },
    { definicion: trabajadorasDeCasaParticular, contenido: contenidoTrabajadorasDeCasaParticular, cliente: () => import("./calculadoras/trabajadoras-de-casa-particular.cliente") },
    { definicion: prestacionPostMortem, contenido: contenidoPrestacionPostMortem, cliente: () => import("./calculadoras/prestacion-post-mortem.cliente") },
    { definicion: embargoDeSalario, contenido: contenidoEmbargoDeSalario, cliente: () => import("./calculadoras/embargo-de-salario.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: periodoDeLactancia, contenido: contenidoPeriodoDeLactancia, cliente: () => import("./calculadoras/periodo-de-lactancia.cliente") },
    { definicion: permisosConGoceDeSalario, contenido: contenidoPermisosConGoceDeSalario, cliente: () => import("./calculadoras/permisos-con-goce-de-salario.cliente") },
    { definicion: pagoDiaDeAsueto, contenido: contenidoPagoDiaDeAsueto, cliente: () => import("./calculadoras/pago-dia-de-asueto.cliente") },
    { definicion: ventajasEconomicas, contenido: contenidoVentajasEconomicas, cliente: () => import("./calculadoras/ventajas-economicas.cliente") },
    { definicion: terminacionContratoPlazoFijo, contenido: contenidoTerminacionContratoPlazoFijo, cliente: () => import("./calculadoras/terminacion-contrato-plazo-fijo.cliente") },
    { definicion: salarioDiario, contenido: contenidoSalarioDiario, cliente: () => import("./calculadoras/salario-diario.cliente") },
  ],
  novedades,
  detectores,
});
