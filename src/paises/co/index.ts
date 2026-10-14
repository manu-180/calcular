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
import empleadaDomestica from "./calculadoras/empleada-domestica";
import contenidoEmpleadaDomestica from "./contenido/empleada-domestica";
import costoDeUnEmpleado from "./calculadoras/costo-de-un-empleado";
import contenidoCostoDeUnEmpleado from "./contenido/costo-de-un-empleado";
import regimenSimple from "./calculadoras/regimen-simple";
import contenidoRegimenSimple from "./contenido/regimen-simple";
import interesesCesantias from "./calculadoras/intereses-cesantias";
import contenidoInteresesCesantias from "./contenido/intereses-cesantias";
import salarioIntegral from "./calculadoras/salario-integral";
import contenidoSalarioIntegral from "./contenido/salario-integral";
import licenciaDeMaternidad from "./calculadoras/licencia-de-maternidad";
import contenidoLicenciaDeMaternidad from "./contenido/licencia-de-maternidad";
import licenciaDePaternidad from "./calculadoras/licencia-de-paternidad";
import contenidoLicenciaDePaternidad from "./contenido/licencia-de-paternidad";
import incapacidad from "./calculadoras/incapacidad";
import contenidoIncapacidad from "./contenido/incapacidad";
import aportesSeguridadSocial from "./calculadoras/aportes-seguridad-social";
import contenidoAportesSeguridadSocial from "./contenido/aportes-seguridad-social";
import seguridadSocialIndependientes from "./calculadoras/seguridad-social-independientes";
import contenidoSeguridadSocialIndependientes from "./contenido/seguridad-social-independientes";
import retencionHonorarios from "./calculadoras/retencion-honorarios";
import contenidoRetencionHonorarios from "./contenido/retencion-honorarios";
import calc4x1000 from "./calculadoras/4x1000";
import contenidoCalc4x1000 from "./contenido/4x1000";
import cdt from "./calculadoras/cdt";
import contenidoCdt from "./contenido/cdt";
import impuestoDeRenta from "./calculadoras/impuesto-de-renta";
import contenidoImpuestoDeRenta from "./contenido/impuesto-de-renta";
import deboDeclararRenta from "./calculadoras/debo-declarar-renta";
import contenidoDeboDeclararRenta from "./contenido/debo-declarar-renta";
import sancionExtemporaneidad from "./calculadoras/sancion-extemporaneidad";
import contenidoSancionExtemporaneidad from "./contenido/sancion-extemporaneidad";
import gananciaOcasional from "./calculadoras/ganancia-ocasional";
import contenidoGananciaOcasional from "./contenido/ganancia-ocasional";
import impuestoAlConsumo from "./calculadoras/impuesto-al-consumo";
import contenidoImpuestoAlConsumo from "./contenido/impuesto-al-consumo";
import pensionDeVejez from "./calculadoras/pension-de-vejez";
import contenidoPensionDeVejez from "./contenido/pension-de-vejez";
import incrementoArriendo from "./calculadoras/incremento-arriendo";
import contenidoIncrementoArriendo from "./contenido/incremento-arriendo";
import contratoDeAprendizaje from "./calculadoras/contrato-de-aprendizaje";
import contenidoContratoDeAprendizaje from "./contenido/contrato-de-aprendizaje";
import embargoDeSalario from "./calculadoras/embargo-de-salario";
import contenidoEmbargoDeSalario from "./contenido/embargo-de-salario";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import preaviso from "./calculadoras/preaviso";
import contenidoPreaviso from "./contenido/preaviso";
import indemnizacionMoratoria from "./calculadoras/indemnizacion-moratoria";
import contenidoIndemnizacionMoratoria from "./contenido/indemnizacion-moratoria";
import valorHora from "./calculadoras/valor-hora";
import contenidoValorHora from "./contenido/valor-hora";
import salarioMinimoHistorico from "./calculadoras/salario-minimo-historico";
import contenidoSalarioMinimoHistorico from "./contenido/salario-minimo-historico";
import tasaEfectivaAnual from "./calculadoras/tasa-efectiva-anual";
import contenidoTasaEfectivaAnual from "./contenido/tasa-efectiva-anual";
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
  universales: { todas: true, excepto: ["conversor-sueldo"] },
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
    { definicion: empleadaDomestica, contenido: contenidoEmpleadaDomestica, cliente: () => import("./calculadoras/empleada-domestica.cliente") },
    { definicion: costoDeUnEmpleado, contenido: contenidoCostoDeUnEmpleado, cliente: () => import("./calculadoras/costo-de-un-empleado.cliente") },
    { definicion: regimenSimple, contenido: contenidoRegimenSimple, cliente: () => import("./calculadoras/regimen-simple.cliente") },
    { definicion: interesesCesantias, contenido: contenidoInteresesCesantias, cliente: () => import("./calculadoras/intereses-cesantias.cliente") },
    { definicion: salarioIntegral, contenido: contenidoSalarioIntegral, cliente: () => import("./calculadoras/salario-integral.cliente") },
    { definicion: licenciaDeMaternidad, contenido: contenidoLicenciaDeMaternidad, cliente: () => import("./calculadoras/licencia-de-maternidad.cliente") },
    { definicion: licenciaDePaternidad, contenido: contenidoLicenciaDePaternidad, cliente: () => import("./calculadoras/licencia-de-paternidad.cliente") },
    { definicion: incapacidad, contenido: contenidoIncapacidad, cliente: () => import("./calculadoras/incapacidad.cliente") },
    { definicion: aportesSeguridadSocial, contenido: contenidoAportesSeguridadSocial, cliente: () => import("./calculadoras/aportes-seguridad-social.cliente") },
    { definicion: seguridadSocialIndependientes, contenido: contenidoSeguridadSocialIndependientes, cliente: () => import("./calculadoras/seguridad-social-independientes.cliente") },
    { definicion: retencionHonorarios, contenido: contenidoRetencionHonorarios, cliente: () => import("./calculadoras/retencion-honorarios.cliente") },
    { definicion: calc4x1000, contenido: contenidoCalc4x1000, cliente: () => import("./calculadoras/4x1000.cliente") },
    { definicion: cdt, contenido: contenidoCdt, cliente: () => import("./calculadoras/cdt.cliente") },
    { definicion: impuestoDeRenta, contenido: contenidoImpuestoDeRenta, cliente: () => import("./calculadoras/impuesto-de-renta.cliente") },
    { definicion: deboDeclararRenta, contenido: contenidoDeboDeclararRenta, cliente: () => import("./calculadoras/debo-declarar-renta.cliente") },
    { definicion: sancionExtemporaneidad, contenido: contenidoSancionExtemporaneidad, cliente: () => import("./calculadoras/sancion-extemporaneidad.cliente") },
    { definicion: gananciaOcasional, contenido: contenidoGananciaOcasional, cliente: () => import("./calculadoras/ganancia-ocasional.cliente") },
    { definicion: impuestoAlConsumo, contenido: contenidoImpuestoAlConsumo, cliente: () => import("./calculadoras/impuesto-al-consumo.cliente") },
    { definicion: pensionDeVejez, contenido: contenidoPensionDeVejez, cliente: () => import("./calculadoras/pension-de-vejez.cliente") },
    { definicion: incrementoArriendo, contenido: contenidoIncrementoArriendo, cliente: () => import("./calculadoras/incremento-arriendo.cliente") },
    { definicion: contratoDeAprendizaje, contenido: contenidoContratoDeAprendizaje, cliente: () => import("./calculadoras/contrato-de-aprendizaje.cliente") },
    { definicion: embargoDeSalario, contenido: contenidoEmbargoDeSalario, cliente: () => import("./calculadoras/embargo-de-salario.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: indemnizacionMoratoria, contenido: contenidoIndemnizacionMoratoria, cliente: () => import("./calculadoras/indemnizacion-moratoria.cliente") },
    { definicion: valorHora, contenido: contenidoValorHora, cliente: () => import("./calculadoras/valor-hora.cliente") },
    { definicion: salarioMinimoHistorico, contenido: contenidoSalarioMinimoHistorico, cliente: () => import("./calculadoras/salario-minimo-historico.cliente") },
    { definicion: tasaEfectivaAnual, contenido: contenidoTasaEfectivaAnual, cliente: () => import("./calculadoras/tasa-efectiva-anual.cliente") },
  ],
  novedades,
  detectores,
});
