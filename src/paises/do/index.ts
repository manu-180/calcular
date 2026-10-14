import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aportesTss from "./calculadoras/aportes-tss";
import bonificacion from "./calculadoras/bonificacion";
import horasExtra from "./calculadoras/horas-extra";
import isrAsalariados from "./calculadoras/isr-asalariados";
import itbis from "./calculadoras/itbis";
import prestacionesLaborales from "./calculadoras/prestaciones-laborales";
import regaliaPascual from "./calculadoras/regalia-pascual";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import tasaDelDolar from "./calculadoras/tasa-del-dolar";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAportesTss from "./contenido/aportes-tss";
import contenidoBonificacion from "./contenido/bonificacion";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIsrAsalariados from "./contenido/isr-asalariados";
import contenidoItbis from "./contenido/itbis";
import contenidoPrestacionesLaborales from "./contenido/prestaciones-laborales";
import contenidoRegaliaPascual from "./contenido/regalia-pascual";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoTasaDelDolar from "./contenido/tasa-del-dolar";
import contenidoVacaciones from "./contenido/vacaciones";
import inflacion from "./calculadoras/inflacion";
import contenidoInflacion from "./contenido/inflacion";
import rst from "./calculadoras/rst";
import contenidoRst from "./contenido/rst";
import cesantia from "./calculadoras/cesantia";
import contenidoCesantia from "./contenido/cesantia";
import preaviso from "./calculadoras/preaviso";
import contenidoPreaviso from "./contenido/preaviso";
import despidoInjustificado from "./calculadoras/despido-injustificado";
import contenidoDespidoInjustificado from "./contenido/despido-injustificado";
import renuncia from "./calculadoras/renuncia";
import contenidoRenuncia from "./contenido/renuncia";
import asistenciaEconomica from "./calculadoras/asistencia-economica";
import contenidoAsistenciaEconomica from "./contenido/asistencia-economica";
import salarioDiario from "./calculadoras/salario-diario";
import contenidoSalarioDiario from "./contenido/salario-diario";
import recargoNocturno from "./calculadoras/recargo-nocturno";
import contenidoRecargoNocturno from "./contenido/recargo-nocturno";
import diaFeriado from "./calculadoras/dia-feriado";
import contenidoDiaFeriado from "./contenido/dia-feriado";
import licenciasLaborales from "./calculadoras/licencias-laborales";
import contenidoLicenciasLaborales from "./contenido/licencias-laborales";
import licenciaMaternidad from "./calculadoras/licencia-maternidad";
import contenidoLicenciaMaternidad from "./contenido/licencia-maternidad";
import subsidioLactancia from "./calculadoras/subsidio-lactancia";
import contenidoSubsidioLactancia from "./contenido/subsidio-lactancia";
import subsidioEnfermedad from "./calculadoras/subsidio-enfermedad";
import contenidoSubsidioEnfermedad from "./contenido/subsidio-enfermedad";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import costoEmpleador from "./calculadoras/costo-empleador";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import gastosEducativos from "./calculadoras/gastos-educativos";
import contenidoGastosEducativos from "./contenido/gastos-educativos";
import isrPersonaFisica from "./calculadoras/isr-persona-fisica";
import contenidoIsrPersonaFisica from "./contenido/isr-persona-fisica";
import retencionHonorarios from "./calculadoras/retencion-honorarios";
import contenidoRetencionHonorarios from "./contenido/retencion-honorarios";
import retencionAlquileres from "./calculadoras/retencion-alquileres";
import contenidoRetencionAlquileres from "./contenido/retencion-alquileres";
import impuestoTransferencias from "./calculadoras/impuesto-transferencias";
import contenidoImpuestoTransferencias from "./contenido/impuesto-transferencias";
import impuestoPremios from "./calculadoras/impuesto-premios";
import contenidoImpuestoPremios from "./contenido/impuesto-premios";
import certificadoFinanciero from "./calculadoras/certificado-financiero";
import contenidoCertificadoFinanciero from "./contenido/certificado-financiero";
import ipi from "./calculadoras/ipi";
import contenidoIpi from "./contenido/ipi";
import propinaLegal from "./calculadoras/propina-legal";
import contenidoPropinaLegal from "./contenido/propina-legal";
import gananciaCapitalInmueble from "./calculadoras/ganancia-capital-inmueble";
import contenidoGananciaCapitalInmueble from "./contenido/ganancia-capital-inmueble";
import dividendos from "./calculadoras/dividendos";
import contenidoDividendos from "./contenido/dividendos";
import prestamo from "./calculadoras/prestamo";
import contenidoPrestamo from "./contenido/prestamo";
import recargosDgii from "./calculadoras/recargos-dgii";
import contenidoRecargosDgii from "./contenido/recargos-dgii";
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
    { definicion: regaliaPascual, contenido: contenidoRegaliaPascual, cliente: () => import("./calculadoras/regalia-pascual.cliente") },
    { definicion: prestacionesLaborales, contenido: contenidoPrestacionesLaborales, cliente: () => import("./calculadoras/prestaciones-laborales.cliente") },
    { definicion: salarioNeto, contenido: contenidoSalarioNeto, cliente: () => import("./calculadoras/salario-neto.cliente") },
    { definicion: isrAsalariados, contenido: contenidoIsrAsalariados, cliente: () => import("./calculadoras/isr-asalariados.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: bonificacion, contenido: contenidoBonificacion, cliente: () => import("./calculadoras/bonificacion.cliente") },
    { definicion: itbis, contenido: contenidoItbis, cliente: () => import("./calculadoras/itbis.cliente") },
    { definicion: tasaDelDolar, contenido: contenidoTasaDelDolar, cliente: () => import("./calculadoras/tasa-del-dolar.cliente") },
    { definicion: aportesTss, contenido: contenidoAportesTss, cliente: () => import("./calculadoras/aportes-tss.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: rst, contenido: contenidoRst, cliente: () => import("./calculadoras/rst.cliente") },
    { definicion: cesantia, contenido: contenidoCesantia, cliente: () => import("./calculadoras/cesantia.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: despidoInjustificado, contenido: contenidoDespidoInjustificado, cliente: () => import("./calculadoras/despido-injustificado.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: asistenciaEconomica, contenido: contenidoAsistenciaEconomica, cliente: () => import("./calculadoras/asistencia-economica.cliente") },
    { definicion: salarioDiario, contenido: contenidoSalarioDiario, cliente: () => import("./calculadoras/salario-diario.cliente") },
    { definicion: recargoNocturno, contenido: contenidoRecargoNocturno, cliente: () => import("./calculadoras/recargo-nocturno.cliente") },
    { definicion: diaFeriado, contenido: contenidoDiaFeriado, cliente: () => import("./calculadoras/dia-feriado.cliente") },
    { definicion: licenciasLaborales, contenido: contenidoLicenciasLaborales, cliente: () => import("./calculadoras/licencias-laborales.cliente") },
    { definicion: licenciaMaternidad, contenido: contenidoLicenciaMaternidad, cliente: () => import("./calculadoras/licencia-maternidad.cliente") },
    { definicion: subsidioLactancia, contenido: contenidoSubsidioLactancia, cliente: () => import("./calculadoras/subsidio-lactancia.cliente") },
    { definicion: subsidioEnfermedad, contenido: contenidoSubsidioEnfermedad, cliente: () => import("./calculadoras/subsidio-enfermedad.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: gastosEducativos, contenido: contenidoGastosEducativos, cliente: () => import("./calculadoras/gastos-educativos.cliente") },
    { definicion: isrPersonaFisica, contenido: contenidoIsrPersonaFisica, cliente: () => import("./calculadoras/isr-persona-fisica.cliente") },
    { definicion: retencionHonorarios, contenido: contenidoRetencionHonorarios, cliente: () => import("./calculadoras/retencion-honorarios.cliente") },
    { definicion: retencionAlquileres, contenido: contenidoRetencionAlquileres, cliente: () => import("./calculadoras/retencion-alquileres.cliente") },
    { definicion: impuestoTransferencias, contenido: contenidoImpuestoTransferencias, cliente: () => import("./calculadoras/impuesto-transferencias.cliente") },
    { definicion: impuestoPremios, contenido: contenidoImpuestoPremios, cliente: () => import("./calculadoras/impuesto-premios.cliente") },
    { definicion: certificadoFinanciero, contenido: contenidoCertificadoFinanciero, cliente: () => import("./calculadoras/certificado-financiero.cliente") },
    { definicion: ipi, contenido: contenidoIpi, cliente: () => import("./calculadoras/ipi.cliente") },
    { definicion: propinaLegal, contenido: contenidoPropinaLegal, cliente: () => import("./calculadoras/propina-legal.cliente") },
    { definicion: gananciaCapitalInmueble, contenido: contenidoGananciaCapitalInmueble, cliente: () => import("./calculadoras/ganancia-capital-inmueble.cliente") },
    { definicion: dividendos, contenido: contenidoDividendos, cliente: () => import("./calculadoras/dividendos.cliente") },
    { definicion: prestamo, contenido: contenidoPrestamo, cliente: () => import("./calculadoras/prestamo.cliente") },
    { definicion: recargosDgii, contenido: contenidoRecargosDgii, cliente: () => import("./calculadoras/recargos-dgii.cliente") },
  ],
  novedades,
  detectores,
});
