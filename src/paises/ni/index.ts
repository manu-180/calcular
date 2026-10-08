import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import horasExtras from "./calculadoras/horas-extras";
import indemnizacionPorAntiguedad from "./calculadoras/indemnizacion-por-antiguedad";
import irSalarial from "./calculadoras/ir-salarial";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIndemnizacionPorAntiguedad from "./contenido/indemnizacion-por-antiguedad";
import contenidoIrSalarial from "./contenido/ir-salarial";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
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
  ],
  novedades,
  detectores,
});
