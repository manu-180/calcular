import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import cestaticket from "./calculadoras/cestaticket";
import dolarBcv from "./calculadoras/dolar-bcv";
import horasExtra from "./calculadoras/horas-extra";
import inflacion from "./calculadoras/inflacion";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import prestacionesSociales from "./calculadoras/prestaciones-sociales";
import salarioMinimo from "./calculadoras/salario-minimo";
import utilidades from "./calculadoras/utilidades";
import vacaciones from "./calculadoras/vacaciones";
import contenidoCestaticket from "./contenido/cestaticket";
import contenidoDolarBcv from "./contenido/dolar-bcv";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPrestacionesSociales from "./contenido/prestaciones-sociales";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoUtilidades from "./contenido/utilidades";
import contenidoVacaciones from "./contenido/vacaciones";
import bonoVacacional from "./calculadoras/bono-vacacional";
import contenidoBonoVacacional from "./contenido/bono-vacacional";
import vacacionesFraccionadas from "./calculadoras/vacaciones-fraccionadas";
import contenidoVacacionesFraccionadas from "./contenido/vacaciones-fraccionadas";
import indemnizacionPorDespido from "./calculadoras/indemnizacion-por-despido";
import contenidoIndemnizacionPorDespido from "./contenido/indemnizacion-por-despido";
import salarioIntegral from "./calculadoras/salario-integral";
import contenidoSalarioIntegral from "./contenido/salario-integral";
import bonoNocturno from "./calculadoras/bono-nocturno";
import contenidoBonoNocturno from "./contenido/bono-nocturno";
import diaFeriadoTrabajado from "./calculadoras/dia-feriado-trabajado";
import contenidoDiaFeriadoTrabajado from "./contenido/dia-feriado-trabajado";
import salarioDiario from "./calculadoras/salario-diario";
import contenidoSalarioDiario from "./contenido/salario-diario";
import preaviso from "./calculadoras/preaviso";
import contenidoPreaviso from "./contenido/preaviso";
import antiguedadLaboral from "./calculadoras/antiguedad-laboral";
import contenidoAntiguedadLaboral from "./contenido/antiguedad-laboral";
import anticipoPrestaciones from "./calculadoras/anticipo-prestaciones";
import contenidoAnticipoPrestaciones from "./contenido/anticipo-prestaciones";
import garantiaPrestaciones from "./calculadoras/garantia-prestaciones";
import contenidoGarantiaPrestaciones from "./contenido/garantia-prestaciones";
import interesesPrestaciones from "./calculadoras/intereses-prestaciones";
import contenidoInteresesPrestaciones from "./contenido/intereses-prestaciones";
import reposoPreYPostnatal from "./calculadoras/reposo-pre-y-postnatal";
import contenidoReposoPreYPostnatal from "./contenido/reposo-pre-y-postnatal";
import permisoDePaternidad from "./calculadoras/permiso-de-paternidad";
import contenidoPermisoDePaternidad from "./contenido/permiso-de-paternidad";
import sueldoEnBolivares from "./calculadoras/sueldo-en-bolivares";
import contenidoSueldoEnBolivares from "./contenido/sueldo-en-bolivares";
import poderAdquisitivo from "./calculadoras/poder-adquisitivo";
import contenidoPoderAdquisitivo from "./contenido/poder-adquisitivo";
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
    { definicion: dolarBcv, contenido: contenidoDolarBcv, cliente: () => import("./calculadoras/dolar-bcv.cliente") },
    { definicion: prestacionesSociales, contenido: contenidoPrestacionesSociales, cliente: () => import("./calculadoras/prestaciones-sociales.cliente") },
    { definicion: liquidacion, contenido: contenidoLiquidacion, cliente: () => import("./calculadoras/liquidacion.cliente") },
    { definicion: utilidades, contenido: contenidoUtilidades, cliente: () => import("./calculadoras/utilidades.cliente") },
    { definicion: vacaciones, contenido: contenidoVacaciones, cliente: () => import("./calculadoras/vacaciones.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: cestaticket, contenido: contenidoCestaticket, cliente: () => import("./calculadoras/cestaticket.cliente") },
    { definicion: bonoVacacional, contenido: contenidoBonoVacacional, cliente: () => import("./calculadoras/bono-vacacional.cliente") },
    { definicion: vacacionesFraccionadas, contenido: contenidoVacacionesFraccionadas, cliente: () => import("./calculadoras/vacaciones-fraccionadas.cliente") },
    { definicion: indemnizacionPorDespido, contenido: contenidoIndemnizacionPorDespido, cliente: () => import("./calculadoras/indemnizacion-por-despido.cliente") },
    { definicion: salarioIntegral, contenido: contenidoSalarioIntegral, cliente: () => import("./calculadoras/salario-integral.cliente") },
    { definicion: bonoNocturno, contenido: contenidoBonoNocturno, cliente: () => import("./calculadoras/bono-nocturno.cliente") },
    { definicion: diaFeriadoTrabajado, contenido: contenidoDiaFeriadoTrabajado, cliente: () => import("./calculadoras/dia-feriado-trabajado.cliente") },
    { definicion: salarioDiario, contenido: contenidoSalarioDiario, cliente: () => import("./calculadoras/salario-diario.cliente") },
    { definicion: preaviso, contenido: contenidoPreaviso, cliente: () => import("./calculadoras/preaviso.cliente") },
    { definicion: antiguedadLaboral, contenido: contenidoAntiguedadLaboral, cliente: () => import("./calculadoras/antiguedad-laboral.cliente") },
    { definicion: anticipoPrestaciones, contenido: contenidoAnticipoPrestaciones, cliente: () => import("./calculadoras/anticipo-prestaciones.cliente") },
    { definicion: garantiaPrestaciones, contenido: contenidoGarantiaPrestaciones, cliente: () => import("./calculadoras/garantia-prestaciones.cliente") },
    { definicion: interesesPrestaciones, contenido: contenidoInteresesPrestaciones, cliente: () => import("./calculadoras/intereses-prestaciones.cliente") },
    { definicion: reposoPreYPostnatal, contenido: contenidoReposoPreYPostnatal, cliente: () => import("./calculadoras/reposo-pre-y-postnatal.cliente") },
    { definicion: permisoDePaternidad, contenido: contenidoPermisoDePaternidad, cliente: () => import("./calculadoras/permiso-de-paternidad.cliente") },
    { definicion: sueldoEnBolivares, contenido: contenidoSueldoEnBolivares, cliente: () => import("./calculadoras/sueldo-en-bolivares.cliente") },
    { definicion: poderAdquisitivo, contenido: contenidoPoderAdquisitivo, cliente: () => import("./calculadoras/poder-adquisitivo.cliente") },
  ],
  novedades,
  detectores,
});
