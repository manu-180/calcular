import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import aguinaldoAtrasado from "./calculadoras/aguinaldo-atrasado";
import costoEmpleador from "./calculadoras/costo-empleador";
import feriados from "./calculadoras/feriados";
import horasExtras from "./calculadoras/horas-extras";
import indemnizacionPorAntiguedad from "./calculadoras/indemnizacion-por-antiguedad";
import inflacion from "./calculadoras/inflacion";
import irSalarial from "./calculadoras/ir-salarial";
import iva from "./calculadoras/iva";
import liquidacion from "./calculadoras/liquidacion";
import periodoDePrueba from "./calculadoras/periodo-de-prueba";
import renuncia from "./calculadoras/renuncia";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioNeto from "./calculadoras/salario-neto";
import salarioPorHora from "./calculadoras/salario-por-hora";
import septimoDia from "./calculadoras/septimo-dia";
import tipoDeCambio from "./calculadoras/tipo-de-cambio";
import vacaciones from "./calculadoras/vacaciones";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAguinaldoAtrasado from "./contenido/aguinaldo-atrasado";
import contenidoCostoEmpleador from "./contenido/costo-empleador";
import contenidoFeriados from "./contenido/feriados";
import contenidoHorasExtras from "./contenido/horas-extras";
import contenidoIndemnizacionPorAntiguedad from "./contenido/indemnizacion-por-antiguedad";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIrSalarial from "./contenido/ir-salarial";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacion from "./contenido/liquidacion";
import contenidoPeriodoDePrueba from "./contenido/periodo-de-prueba";
import contenidoRenuncia from "./contenido/renuncia";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioNeto from "./contenido/salario-neto";
import contenidoSalarioPorHora from "./contenido/salario-por-hora";
import contenidoSeptimoDia from "./contenido/septimo-dia";
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
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: costoEmpleador, contenido: contenidoCostoEmpleador, cliente: () => import("./calculadoras/costo-empleador.cliente") },
    { definicion: periodoDePrueba, contenido: contenidoPeriodoDePrueba, cliente: () => import("./calculadoras/periodo-de-prueba.cliente") },
    { definicion: renuncia, contenido: contenidoRenuncia, cliente: () => import("./calculadoras/renuncia.cliente") },
    { definicion: septimoDia, contenido: contenidoSeptimoDia, cliente: () => import("./calculadoras/septimo-dia.cliente") },
    { definicion: feriados, contenido: contenidoFeriados, cliente: () => import("./calculadoras/feriados.cliente") },
    { definicion: salarioPorHora, contenido: contenidoSalarioPorHora, cliente: () => import("./calculadoras/salario-por-hora.cliente") },
    { definicion: aguinaldoAtrasado, contenido: contenidoAguinaldoAtrasado, cliente: () => import("./calculadoras/aguinaldo-atrasado.cliente") },
  ],
  novedades,
  detectores,
});
