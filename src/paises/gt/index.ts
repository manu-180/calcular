import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import bonificacionIncentivo from "./calculadoras/bonificacion-incentivo";
import bono14 from "./calculadoras/bono-14";
import horasExtra from "./calculadoras/horas-extra";
import indemnizacion from "./calculadoras/indemnizacion";
import isrAsalariados from "./calculadoras/isr-asalariados";
import iva from "./calculadoras/iva";
import salarioMinimo from "./calculadoras/salario-minimo";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoBonificacionIncentivo from "./contenido/bonificacion-incentivo";
import contenidoBono14 from "./contenido/bono-14";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoIndemnizacion from "./contenido/indemnizacion";
import contenidoIsrAsalariados from "./contenido/isr-asalariados";
import contenidoIva from "./contenido/iva";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoTipoDeCambio from "./contenido/tipo-de-cambio";
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
  ],
  novedades,
  detectores,
});
