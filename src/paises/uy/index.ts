import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import accidenteDeTrabajo from "./calculadoras/accidente-de-trabajo";
import aguinaldo from "./calculadoras/aguinaldo";
import ajusteAlquiler from "./calculadoras/ajuste-alquiler";
import aportesBps from "./calculadoras/aportes-bps";
import asignacionFamiliar from "./calculadoras/asignacion-familiar";
import contenidoAccidenteDeTrabajo from "./contenido/accidente-de-trabajo";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAjusteAlquiler from "./contenido/ajuste-alquiler";
import contenidoAportesBps from "./contenido/aportes-bps";
import contenidoAsignacionFamiliar from "./contenido/asignacion-familiar";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoDespido from "./contenido/despido";
import contenidoDespidoEspecial from "./contenido/despido-especial";
import contenidoDevolucionIrpf from "./contenido/devolucion-irpf";
import contenidoDiasDeLicencia from "./contenido/dias-de-licencia";
import contenidoDolarBcu from "./contenido/dolar-bcu";
import contenidoEdadDeJubilacion from "./contenido/edad-de-jubilacion";
import contenidoFeriadosPagos from "./contenido/feriados-pagos";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIass from "./contenido/iass";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIrpf from "./contenido/irpf";
import contenidoIrpfAlquileres from "./contenido/irpf-alquileres";
import contenidoIva from "./contenido/iva";
import contenidoJubilacion from "./contenido/jubilacion";
import contenidoLicenciaMaternal from "./contenido/licencia-maternal";
import contenidoLicenciasEspeciales from "./contenido/licencias-especiales";
import contenidoLiquidacionPorEgreso from "./contenido/liquidacion-por-egreso";
import contenidoLiteralE from "./contenido/literal-e";
import contenidoMonotributo from "./contenido/monotributo";
import contenidoMonotributoSocial from "./contenido/monotributo-social";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioVacacional from "./contenido/salario-vacacional";
import contenidoSeguroDeParo from "./contenido/seguro-de-paro";
import contenidoSubsidioPorEnfermedad from "./contenido/subsidio-por-enfermedad";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoSueldoNominal from "./contenido/sueldo-nominal";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoTrabajoNocturno from "./contenido/trabajo-nocturno";
import contenidoValorUi from "./contenido/valor-ui";
import costoEmpleador from "./calculadoras/costo-empleador";
import despido from "./calculadoras/despido";
import despidoEspecial from "./calculadoras/despido-especial";
import devolucionIrpf from "./calculadoras/devolucion-irpf";
import diasDeLicencia from "./calculadoras/dias-de-licencia";
import dolarBcu from "./calculadoras/dolar-bcu";
import edadDeJubilacion from "./calculadoras/edad-de-jubilacion";
import feriadosPagos from "./calculadoras/feriados-pagos";
import horasExtra from "./calculadoras/horas-extra";
import iass from "./calculadoras/iass";
import inflacion from "./calculadoras/inflacion";
import irpf from "./calculadoras/irpf";
import irpfAlquileres from "./calculadoras/irpf-alquileres";
import iva from "./calculadoras/iva";
import jubilacion from "./calculadoras/jubilacion";
import licenciaMaternal from "./calculadoras/licencia-maternal";
import licenciasEspeciales from "./calculadoras/licencias-especiales";
import liquidacionPorEgreso from "./calculadoras/liquidacion-por-egreso";
import literalE from "./calculadoras/literal-e";
import monotributo from "./calculadoras/monotributo";
import monotributoSocial from "./calculadoras/monotributo-social";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioVacacional from "./calculadoras/salario-vacacional";
import seguroDeParo from "./calculadoras/seguro-de-paro";
import subsidioPorEnfermedad from "./calculadoras/subsidio-por-enfermedad";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import sueldoNominal from "./calculadoras/sueldo-nominal";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
import trabajoNocturno from "./calculadoras/trabajo-nocturno";
import valorUi from "./calculadoras/valor-ui";
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
    { definicion: sueldoLiquido, contenido: contenidoSueldoLiquido, cliente: () => import("./calculadoras/sueldo-liquido.cliente") },
    { definicion: liquidacionPorEgreso, contenido: contenidoLiquidacionPorEgreso, cliente: () => import("./calculadoras/liquidacion-por-egreso.cliente") },
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: despido, contenido: contenidoDespido, cliente: () => import("./calculadoras/despido.cliente") },
    { definicion: irpf, contenido: contenidoIrpf, cliente: () => import("./calculadoras/irpf.cliente") },
    { definicion: salarioVacacional, contenido: contenidoSalarioVacacional, cliente: () => import("./calculadoras/salario-vacacional.cliente") },
    { definicion: seguroDeParo, contenido: contenidoSeguroDeParo, cliente: () => import("./calculadoras/seguro-de-paro.cliente") },
    { definicion: jubilacion, contenido: contenidoJubilacion, cliente: () => import("./calculadoras/jubilacion.cliente") },
    { definicion: diasDeLicencia, contenido: contenidoDiasDeLicencia, cliente: () => import("./calculadoras/dias-de-licencia.cliente") },
    { definicion: sueldoNominal, contenido: contenidoSueldoNominal, cliente: () => import("./calculadoras/sueldo-nominal.cliente") },
    { definicion: aportesBps, contenido: contenidoAportesBps, cliente: () => import("./calculadoras/aportes-bps.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: valorUi, contenido: contenidoValorUi, cliente: () => import("./calculadoras/valor-ui.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: dolarBcu, contenido: contenidoDolarBcu, cliente: () => import("./calculadoras/dolar-bcu.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: ajusteAlquiler, contenido: contenidoAjusteAlquiler, cliente: () => import("./calculadoras/ajuste-alquiler.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: monotributo, contenido: contenidoMonotributo, cliente: () => import("./calculadoras/monotributo.cliente") },
    { definicion: accidenteDeTrabajo, contenido: contenidoAccidenteDeTrabajo, cliente: () => import("./calculadoras/accidente-de-trabajo.cliente") },
    { definicion: asignacionFamiliar, contenido: contenidoAsignacionFamiliar, cliente: () => import("./calculadoras/asignacion-familiar.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: despidoEspecial, contenido: contenidoDespidoEspecial, cliente: () => import("./calculadoras/despido-especial.cliente") },
    { definicion: devolucionIrpf, contenido: contenidoDevolucionIrpf, cliente: () => import("./calculadoras/devolucion-irpf.cliente") },
    { definicion: edadDeJubilacion, contenido: contenidoEdadDeJubilacion, cliente: () => import("./calculadoras/edad-de-jubilacion.cliente") },
    { definicion: feriadosPagos, contenido: contenidoFeriadosPagos, cliente: () => import("./calculadoras/feriados-pagos.cliente") },
    { definicion: iass, contenido: contenidoIass, cliente: () => import("./calculadoras/iass.cliente") },
    { definicion: irpfAlquileres, contenido: contenidoIrpfAlquileres, cliente: () => import("./calculadoras/irpf-alquileres.cliente") },
    { definicion: licenciaMaternal, contenido: contenidoLicenciaMaternal, cliente: () => import("./calculadoras/licencia-maternal.cliente") },
    { definicion: licenciasEspeciales, contenido: contenidoLicenciasEspeciales, cliente: () => import("./calculadoras/licencias-especiales.cliente") },
    { definicion: literalE, contenido: contenidoLiteralE, cliente: () => import("./calculadoras/literal-e.cliente") },
    { definicion: monotributoSocial, contenido: contenidoMonotributoSocial, cliente: () => import("./calculadoras/monotributo-social.cliente") },
    { definicion: subsidioPorEnfermedad, contenido: contenidoSubsidioPorEnfermedad, cliente: () => import("./calculadoras/subsidio-por-enfermedad.cliente") },
    { definicion: trabajoNocturno, contenido: contenidoTrabajoNocturno, cliente: () => import("./calculadoras/trabajo-nocturno.cliente") },
  ],
  novedades,
  detectores,
});
