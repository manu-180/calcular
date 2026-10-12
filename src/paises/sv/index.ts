import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import costoEmpleador from "./calculadoras/costo-empleador";
import declaracionDeRenta from "./calculadoras/declaracion-de-renta";
import descansoSemanal from "./calculadoras/descanso-semanal";
import descuentosIsssAfp from "./calculadoras/descuentos-isss-afp";
import despidoContratoAPlazo from "./calculadoras/despido-contrato-a-plazo";
import diaDeAsueto from "./calculadoras/dia-de-asueto";
import embargoDeSalario from "./calculadoras/embargo-de-salario";
import horasExtra from "./calculadoras/horas-extra";
import incapacidad from "./calculadoras/incapacidad";
import indemnizacion from "./calculadoras/indemnizacion";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import licenciaPorMaternidad from "./calculadoras/licencia-por-maternidad";
import liquidacion from "./calculadoras/liquidacion";
import nocturnidad from "./calculadoras/nocturnidad";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import preavisoDeRenuncia from "./calculadoras/preaviso-de-renuncia";
import prestacionPorMuerte from "./calculadoras/prestacion-por-muerte";
import quincena25 from "./calculadoras/quincena-25";
import renunciaVoluntaria from "./calculadoras/renuncia-voluntaria";
import retencionDeRenta from "./calculadoras/retencion-de-renta";
import retencionServiciosProfesionales from "./calculadoras/retencion-servicios-profesionales";
import salarioDeAprendiz from "./calculadoras/salario-de-aprendiz";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioPorHora from "./calculadoras/salario-por-hora";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoDeclaracionDeRenta from "./contenido/declaracion-de-renta";
import contenidoDescansoSemanal from "./contenido/descanso-semanal";
import contenidoDescuentosIsssAfp from "./contenido/descuentos-isss-afp";
import contenidoDespidoContratoAPlazo from "./contenido/despido-contrato-a-plazo";
import contenidoDiaDeAsueto from "./contenido/dia-de-asueto";
import contenidoEmbargoDeSalario from "./contenido/embargo-de-salario";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIncapacidad from "./contenido/incapacidad";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLicenciaPorMaternidad from "./contenido/licencia-por-maternidad";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoNocturnidad from "./contenido/nocturnidad";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoPreavisoDeRenuncia from "./contenido/preaviso-de-renuncia";
import contenidoPrestacionPorMuerte from "./contenido/prestacion-por-muerte";
import contenidoQuincena25 from "./contenido/quincena-25";
import contenidoRenunciaVoluntaria from "./contenido/renuncia-voluntaria";
import contenidoRetencionDeRenta from "./contenido/retencion-de-renta";
import contenidoRetencionServiciosProfesionales from "./contenido/retencion-servicios-profesionales";
import contenidoSalarioDeAprendiz from "./contenido/salario-de-aprendiz";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
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
    { definicion: aguinaldo, contenido: contenidoAguinaldo, cliente: () => import("./calculadoras/aguinaldo.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: retencionDeRenta, contenido: contenidoRetencionDeRenta, cliente: () => import("./calculadoras/retencion-de-renta.cliente") },
    { definicion: indemnizacion, contenido: contenidoIndemnizacion, cliente: () => import("./calculadoras/indemnizacion.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: quincena25, contenido: contenidoQuincena25, cliente: () => import("./calculadoras/quincena-25.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: renunciaVoluntaria, contenido: contenidoRenunciaVoluntaria, cliente: () => import("./calculadoras/renuncia-voluntaria.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: descuentosIsssAfp, contenido: contenidoDescuentosIsssAfp, cliente: () => import("./calculadoras/descuentos-isss-afp.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: declaracionDeRenta, contenido: contenidoDeclaracionDeRenta, cliente: () => import("./calculadoras/declaracion-de-renta.cliente") },
    { definicion: retencionServiciosProfesionales, contenido: contenidoRetencionServiciosProfesionales, cliente: () => import("./calculadoras/retencion-servicios-profesionales.cliente") },
    { definicion: incapacidad, contenido: contenidoIncapacidad, cliente: () => import("./calculadoras/incapacidad.cliente") },
    { definicion: licenciaPorMaternidad, contenido: contenidoLicenciaPorMaternidad, cliente: () => import("./calculadoras/licencia-por-maternidad.cliente") },
    { definicion: diaDeAsueto, contenido: contenidoDiaDeAsueto, cliente: () => import("./calculadoras/dia-de-asueto.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: embargoDeSalario, contenido: contenidoEmbargoDeSalario, cliente: () => import("./calculadoras/embargo-de-salario.cliente") },
    { definicion: descansoSemanal, contenido: contenidoDescansoSemanal, cliente: () => import("./calculadoras/descanso-semanal.cliente") },
    { definicion: nocturnidad, contenido: contenidoNocturnidad, cliente: () => import("./calculadoras/nocturnidad.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: preavisoDeRenuncia, contenido: contenidoPreavisoDeRenuncia, cliente: () => import("./calculadoras/preaviso-de-renuncia.cliente") },
    { definicion: despidoContratoAPlazo, contenido: contenidoDespidoContratoAPlazo, cliente: () => import("./calculadoras/despido-contrato-a-plazo.cliente") },
    { definicion: salarioDeAprendiz, contenido: contenidoSalarioDeAprendiz, cliente: () => import("./calculadoras/salario-de-aprendiz.cliente") },
    { definicion: prestacionPorMuerte, contenido: contenidoPrestacionPorMuerte, cliente: () => import("./calculadoras/prestacion-por-muerte.cliente") },
  ],
  novedades,
  detectores,
});
