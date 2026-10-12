import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import accidenteDeTrabajo from "./calculadoras/accidente-de-trabajo";
import aguinaldo from "./calculadoras/aguinaldo";
import aguinaldoAtrasado from "./calculadoras/aguinaldo-atrasado";
import anticipoIr from "./calculadoras/anticipo-ir";
import canastaBasica from "./calculadoras/canasta-basica";
import costoEmpleador from "./calculadoras/costo-empleador";
import cuotaFija from "./calculadoras/cuota-fija";
import depositoAPlazo from "./calculadoras/deposito-a-plazo";
import despidoTrabajadorDeConfianza from "./calculadoras/despido-trabajador-de-confianza";
import feriados from "./calculadoras/feriados";
import horasExtras from "./calculadoras/horas-extras";
import indemnizacionPorAntiguedad from "./calculadoras/indemnizacion-por-antiguedad";
import inflacion from "./calculadoras/inflacion";
import inss from "./calculadoras/inss";
import irAlquiler from "./calculadoras/ir-alquiler";
import irAnual from "./calculadoras/ir-anual";
import irSalarial from "./calculadoras/ir-salarial";
import iva from "./calculadoras/iva";
import jubilacion from "./calculadoras/jubilacion";
import licenciaPorMaternidad from "./calculadoras/licencia-por-maternidad";
import liquidacion from "./calculadoras/liquidacion";
import pensionAlimenticia from "./calculadoras/pension-alimenticia";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import permisosLaborales from "./calculadoras/permisos-laborales";
import prescripcionLaboral from "./calculadoras/prescripcion-laboral";
import renuncia from "./calculadoras/renuncia";
import retencionServiciosProfesionales from "./calculadoras/retencion-servicios-profesionales";
import retencionesIr from "./calculadoras/retenciones-ir";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import salarioPorHora from "./calculadoras/salario-por-hora";
import seguroFacultativo from "./calculadoras/seguro-facultativo";
import septimoDia from "./calculadoras/septimo-dia";
import subsidioPorEnfermedad from "./calculadoras/subsidio-por-enfermedad";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import vacaciones from "./calculadoras/vacaciones";
import ventaDeInmuebles from "./calculadoras/venta-de-inmuebles";
import contenidoAccidenteDeTrabajo from "./contenido/accidente-de-trabajo";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAguinaldoAtrasado from "./contenido/aguinaldo-atrasado";
import contenidoAnticipoIr from "./contenido/anticipo-ir";
import contenidoCanastaBasica from "./contenido/canasta-basica";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoCuotaFija from "./contenido/cuota-fija";
import contenidoDepositoAPlazo from "./contenido/deposito-a-plazo";
import contenidoDespidoTrabajadorDeConfianza from "./contenido/despido-trabajador-de-confianza";
import contenidoFeriados from "./contenido/feriados";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIndemnizacionPorAntiguedad from "./contenido/indemnizacion-por-antiguedad";
import contenidoInflacion from "./contenido/inflacion";
import contenidoInss from "./contenido/inss";
import contenidoIrAlquiler from "./contenido/ir-alquiler";
import contenidoIrAnual from "./contenido/ir-anual";
import contenidoIrSalarial from "./contenido/ir-salarial";
import contenidoIva from "./contenido/iva";
import contenidoJubilacion from "./contenido/jubilacion";
import contenidoLicenciaPorMaternidad from "./contenido/licencia-por-maternidad";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPensionAlimenticia from "./contenido/pension-alimenticia";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoPermisosLaborales from "./contenido/permisos-laborales";
import contenidoPrescripcionLaboral from "./contenido/prescripcion-laboral";
import contenidoRenuncia from "./contenido/renuncia";
import contenidoRetencionServiciosProfesionales from "./contenido/retencion-servicios-profesionales";
import contenidoRetencionesIr from "./contenido/retenciones-ir";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoSeguroFacultativo from "./contenido/seguro-facultativo";
import contenidoSeptimoDia from "./contenido/septimo-dia";
import contenidoSubsidioPorEnfermedad from "./contenido/subsidio-por-enfermedad";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoVacaciones from "./contenido/vacaciones";
import contenidoVentaDeInmuebles from "./contenido/venta-de-inmuebles";
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
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: indemnizacionPorAntiguedad, contenido: contenidoIndemnizacionPorAntiguedad, cliente: () => import("./calculadoras/indemnizacion-por-antiguedad.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: irSalarial, contenido: contenidoIrSalarial, cliente: () => import("./calculadoras/ir-salarial.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtras, contenido: contenidoHorasExtras, cliente: () => import("./calculadoras/horas-extras.cliente") },
    { definicion: tipoDeCambio, contenido: contenidoTipoDeCambio, cliente: () => import("./calculadoras/tipo-de-cambio.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: septimoDia, contenido: contenidoSeptimoDia, cliente: () => import("./calculadoras/septimo-dia.cliente") },
    { definicion: feriados, contenido: contenidoFeriados, cliente: () => import("./calculadoras/feriados.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: aguinaldoAtrasado, contenido: contenidoAguinaldoAtrasado, cliente: () => import("./calculadoras/aguinaldo-atrasado.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: licenciaPorMaternidad, contenido: contenidoLicenciaPorMaternidad, cliente: () => import("./calculadoras/licencia-por-maternidad.cliente") },
    { definicion: subsidioPorEnfermedad, contenido: contenidoSubsidioPorEnfermedad, cliente: () => import("./calculadoras/subsidio-por-enfermedad.cliente") },
    { definicion: accidenteDeTrabajo, contenido: contenidoAccidenteDeTrabajo, cliente: () => import("./calculadoras/accidente-de-trabajo.cliente") },
    { definicion: despidoTrabajadorDeConfianza, contenido: contenidoDespidoTrabajadorDeConfianza, cliente: () => import("./calculadoras/despido-trabajador-de-confianza.cliente") },
    { definicion: prescripcionLaboral, contenido: contenidoPrescripcionLaboral, cliente: () => import("./calculadoras/prescripcion-laboral.cliente") },
    { definicion: permisosLaborales, contenido: contenidoPermisosLaborales, cliente: () => import("./calculadoras/permisos-laborales.cliente") },
    { definicion: inss, contenido: contenidoInss, cliente: () => import("./calculadoras/inss.cliente") },
    { definicion: seguroFacultativo, contenido: contenidoSeguroFacultativo, cliente: () => import("./calculadoras/seguro-facultativo.cliente") },
    { definicion: jubilacion, contenido: contenidoJubilacion, cliente: () => import("./calculadoras/jubilacion.cliente") },
    { definicion: pensionAlimenticia, contenido: contenidoPensionAlimenticia, cliente: () => import("./calculadoras/pension-alimenticia.cliente") },
    { definicion: retencionServiciosProfesionales, contenido: contenidoRetencionServiciosProfesionales, cliente: () => import("./calculadoras/retencion-servicios-profesionales.cliente") },
    { definicion: retencionesIr, contenido: contenidoRetencionesIr, cliente: () => import("./calculadoras/retenciones-ir.cliente") },
    { definicion: cuotaFija, contenido: contenidoCuotaFija, cliente: () => import("./calculadoras/cuota-fija.cliente") },
    { definicion: irAnual, contenido: contenidoIrAnual, cliente: () => import("./calculadoras/ir-anual.cliente") },
    { definicion: anticipoIr, contenido: contenidoAnticipoIr, cliente: () => import("./calculadoras/anticipo-ir.cliente") },
    { definicion: irAlquiler, contenido: contenidoIrAlquiler, cliente: () => import("./calculadoras/ir-alquiler.cliente") },
    { definicion: ventaDeInmuebles, contenido: contenidoVentaDeInmuebles, cliente: () => import("./calculadoras/venta-de-inmuebles.cliente") },
    { definicion: depositoAPlazo, contenido: contenidoDepositoAPlazo, cliente: () => import("./calculadoras/deposito-a-plazo.cliente") },
    { definicion: canastaBasica, contenido: contenidoCanastaBasica, cliente: () => import("./calculadoras/canasta-basica.cliente") },
  ],
  novedades,
  detectores,
});
