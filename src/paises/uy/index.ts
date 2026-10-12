import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import aguinaldo from "./calculadoras/aguinaldo";
import aportesBps from "./calculadoras/aportes-bps";
import contenidoAguinaldo from "./contenido/aguinaldo";
import contenidoAportesBps from "./contenido/aportes-bps";
import contenidoDespido from "./contenido/despido";
import contenidoDolarBcu from "./contenido/dolar-bcu";
import contenidoHorasExtra from "./contenido/horas-extra";
import contenidoInflacion from "./contenido/inflacion";
import contenidoIrpf from "./contenido/irpf";
import contenidoIva from "./contenido/iva";
import contenidoLiquidacionPorEgreso from "./contenido/liquidacion-por-egreso";
import contenidoMonotributo from "./contenido/monotributo";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSalarioVacacional from "./contenido/salario-vacacional";
import contenidoSueldoLiquido from "./contenido/sueldo-liquido";
import contenidoSueldoNominal from "./contenido/sueldo-nominal";
import contenidoTrabajoDomestico from "./contenido/trabajo-domestico";
import contenidoValorUi from "./contenido/valor-ui";
import despido from "./calculadoras/despido";
import dolarBcu from "./calculadoras/dolar-bcu";
import horasExtra from "./calculadoras/horas-extra";
import inflacion from "./calculadoras/inflacion";
import irpf from "./calculadoras/irpf";
import iva from "./calculadoras/iva";
import liquidacionPorEgreso from "./calculadoras/liquidacion-por-egreso";
import monotributo from "./calculadoras/monotributo";
import salarioMinimo from "./calculadoras/salario-minimo";
import salarioVacacional from "./calculadoras/salario-vacacional";
import sueldoLiquido from "./calculadoras/sueldo-liquido";
import sueldoNominal from "./calculadoras/sueldo-nominal";
import trabajoDomestico from "./calculadoras/trabajo-domestico";
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
    { definicion: sueldoNominal, contenido: contenidoSueldoNominal, cliente: () => import("./calculadoras/sueldo-nominal.cliente") },
    { definicion: aportesBps, contenido: contenidoAportesBps, cliente: () => import("./calculadoras/aportes-bps.cliente") },
    { definicion: horasExtra, contenido: contenidoHorasExtra, cliente: () => import("./calculadoras/horas-extra.cliente") },
    { definicion: valorUi, contenido: contenidoValorUi, cliente: () => import("./calculadoras/valor-ui.cliente") },
    { definicion: iva, contenido: contenidoIva, cliente: () => import("./calculadoras/iva.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: dolarBcu, contenido: contenidoDolarBcu, cliente: () => import("./calculadoras/dolar-bcu.cliente") },
    { definicion: inflacion, contenido: contenidoInflacion, cliente: () => import("./calculadoras/inflacion.cliente") },
    { definicion: trabajoDomestico, contenido: contenidoTrabajoDomestico, cliente: () => import("./calculadoras/trabajo-domestico.cliente") },
    { definicion: monotributo, contenido: contenidoMonotributo, cliente: () => import("./calculadoras/monotributo.cliente") },
  ],
  novedades,
  detectores,
});
