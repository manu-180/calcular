import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import bonoDeAntiguedad from "./calculadoras/bono-de-antiguedad";
import dolarOficial from "./calculadoras/dolar-oficial";
import finiquito from "./calculadoras/finiquito";
import horasExtras from "./calculadoras/horas-extras";
import indemnizacion from "./calculadoras/indemnizacion";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import quinquenio from "./calculadoras/quinquenio";
import rcIva from "./calculadoras/rc-iva";
import regimenSimplificado from "./calculadoras/regimen-simplificado";
import salarioMinimo from "./calculadoras/salario-minimo";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import ufv from "./calculadoras/ufv";
import vacaciones from "./calculadoras/vacaciones";
import desahucio from "./calculadoras/desahucio";
import feriadoTrabajado from "./calculadoras/feriado-trabajado";
import domingoTrabajado from "./calculadoras/domingo-trabajado";
import recargoNocturno from "./calculadoras/recargo-nocturno";
import subsidioDeFrontera from "./calculadoras/subsidio-de-frontera";
import sueldoPorHora from "./calculadoras/sueldo-por-hora";
import primaAnual from "./calculadoras/prima-anual";
import licenciaDeMaternidad from "./calculadoras/licencia-de-maternidad";
import subsidioPrenatalYLactancia from "./calculadoras/subsidio-prenatal-y-lactancia";
import antiguedadLaboral from "./calculadoras/antiguedad-laboral";
import finiquitoAtrasado from "./calculadoras/finiquito-atrasado";
import aportesALaGestora from "./calculadoras/aportes-a-la-gestora";
import costoEmpleador from "./calculadoras/costo-empleador";
import retenciones from "./calculadoras/retenciones";
import rcIvaIndependientes from "./calculadoras/rc-iva-independientes";
import iue from "./calculadoras/iue";
import impuestoALaHerencia from "./calculadoras/impuesto-a-la-herencia";
import impuestoALaTransferencia from "./calculadoras/impuesto-a-la-transferencia";
import deudaTributaria from "./calculadoras/deuda-tributaria";
import jubilacion from "./calculadoras/jubilacion";
import licenciasLaborales from "./calculadoras/licencias-laborales";
import actualizacionUfv from "./calculadoras/actualizacion-ufv";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoBonoDeAntiguedad from "./contenido/bono-de-antiguedad";
import contenidoDolarOficial from "./contenido/dolar-oficial";
import contenidoFiniquito from "./contenido/finiquito";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoQuinquenio from "./contenido/quinquenio";
import contenidoRcIva from "./contenido/rc-iva";
import contenidoRegimenSimplificado from "./contenido/regimen-simplificado";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoUfv from "./contenido/ufv";
import contenidoVacaciones from "./contenido/vacaciones";
import contenidoDesahucio from "./contenido/desahucio";
import contenidoFeriadoTrabajado from "./contenido/feriado-trabajado";
import contenidoDomingoTrabajado from "./contenido/domingo-trabajado";
import contenidoRecargoNocturno from "./contenido/recargo-nocturno";
import contenidoSubsidioDeFrontera from "./contenido/subsidio-de-frontera";
import contenidoSueldoPorHora from "./contenido/sueldo-por-hora";
import contenidoPrimaAnual from "./contenido/prima-anual";
import contenidoLicenciaDeMaternidad from "./contenido/licencia-de-maternidad";
import contenidoSubsidioPrenatalYLactancia from "./contenido/subsidio-prenatal-y-lactancia";
import contenidoAntiguedadLaboral from "./contenido/antiguedad-laboral";
import contenidoFiniquitoAtrasado from "./contenido/finiquito-atrasado";
import contenidoAportesALaGestora from "./contenido/aportes-a-la-gestora";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoRetenciones from "./contenido/retenciones";
import contenidoRcIvaIndependientes from "./contenido/rc-iva-independientes";
import contenidoIue from "./contenido/iue";
import contenidoImpuestoALaHerencia from "./contenido/impuesto-a-la-herencia";
import contenidoImpuestoALaTransferencia from "./contenido/impuesto-a-la-transferencia";
import contenidoDeudaTributaria from "./contenido/deuda-tributaria";
import contenidoJubilacion from "./contenido/jubilacion";
import contenidoLicenciasLaborales from "./contenido/licencias-laborales";
import contenidoActualizacionUfv from "./contenido/actualizacion-ufv";
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
  universales: "todas",
  calculadoras: [
    { definicion: dolarOficial, contenido: contenidoDolarOficial, cliente: () => import("./calculadoras/dolar-oficial.cliente") },
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: finiquito, contenido: contenidoFiniquito, cliente: () => import("./calculadoras/finiquito.cliente") },
    { definicion: sueldoLiquido, contenido: contenidoSueldoLiquido, cliente: () => import("./calculadoras/sueldo-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: rcIva, contenido: contenidoRcIva, cliente: () => import("./calculadoras/rc-iva.cliente") },
    { definicion: bonoDeAntiguedad, contenido: contenidoBonoDeAntiguedad, cliente: () => import("./calculadoras/bono-de-antiguedad.cliente") },
    { definicion: quinquenio, contenido: contenidoQuinquenio, cliente: () => import("./calculadoras/quinquenio.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion.cliente") },
    { definicion: ufv, contenido: contenidoUfv, cliente: () => import("./calculadoras/ufv.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: horasExtras, contenido: contenidoHorasExtras, cliente: () => import("./calculadoras/horas-extras.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: regimenSimplificado, contenido: contenidoRegimenSimplificado, cliente: () => import("./calculadoras/regimen-simplificado.cliente") },
    { definicion: desahucio, contenido: contenidoDesahucio, cliente: () => import("./calculadoras/desahucio.cliente") },
    { definicion: feriadoTrabajado, contenido: contenidoFeriadoTrabajado, cliente: () => import("./calculadoras/feriado-trabajado.cliente") },
    { definicion: domingoTrabajado, contenido: contenidoDomingoTrabajado, cliente: () => import("./calculadoras/domingo-trabajado.cliente") },
    { definicion: recargoNocturno, contenido: contenidoRecargoNocturno, cliente: () => import("./calculadoras/recargo-nocturno.cliente") },
    { definicion: subsidioDeFrontera, contenido: contenidoSubsidioDeFrontera, cliente: () => import("./calculadoras/subsidio-de-frontera.cliente") },
    { definicion: sueldoPorHora, contenido: contenidoSueldoPorHora, cliente: () => import("./calculadoras/sueldo-por-hora.cliente") },
    { definicion: primaAnual, contenido: contenidoPrimaAnual, cliente: () => import("./calculadoras/prima-anual.cliente") },
    { definicion: licenciaDeMaternidad, contenido: contenidoLicenciaDeMaternidad, cliente: () => import("./calculadoras/licencia-de-maternidad.cliente") },
    { definicion: subsidioPrenatalYLactancia, contenido: contenidoSubsidioPrenatalYLactancia, cliente: () => import("./calculadoras/subsidio-prenatal-y-lactancia.cliente") },
    { definicion: antiguedadLaboral, contenido: contenidoAntiguedadLaboral, cliente: () => import("./calculadoras/antiguedad-laboral.cliente") },
    { definicion: finiquitoAtrasado, contenido: contenidoFiniquitoAtrasado, cliente: () => import("./calculadoras/finiquito-atrasado.cliente") },
    { definicion: aportesALaGestora, contenido: contenidoAportesALaGestora, cliente: () => import("./calculadoras/aportes-a-la-gestora.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: retenciones, contenido: contenidoRetenciones, cliente: () => import("./calculadoras/retenciones.cliente") },
    { definicion: rcIvaIndependientes, contenido: contenidoRcIvaIndependientes, cliente: () => import("./calculadoras/rc-iva-independientes.cliente") },
    { definicion: iue, contenido: contenidoIue, cliente: () => import("./calculadoras/iue.cliente") },
    { definicion: impuestoALaHerencia, contenido: contenidoImpuestoALaHerencia, cliente: () => import("./calculadoras/impuesto-a-la-herencia.cliente") },
    { definicion: impuestoALaTransferencia, contenido: contenidoImpuestoALaTransferencia, cliente: () => import("./calculadoras/impuesto-a-la-transferencia.cliente") },
    { definicion: deudaTributaria, contenido: contenidoDeudaTributaria, cliente: () => import("./calculadoras/deuda-tributaria.cliente") },
    { definicion: jubilacion, contenido: contenidoJubilacion, cliente: () => import("./calculadoras/jubilacion.cliente") },
    { definicion: licenciasLaborales, contenido: contenidoLicenciasLaborales, cliente: () => import("./calculadoras/licencias-laborales.cliente") },
    { definicion: actualizacionUfv, contenido: contenidoActualizacionUfv, cliente: () => import("./calculadoras/actualizacion-ufv.cliente") },
  ],
  novedades,
  detectores,
});
