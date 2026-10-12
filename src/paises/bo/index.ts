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
  ],
  novedades,
  detectores,
});
