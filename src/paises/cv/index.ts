import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import avisoPrevio from "./calculadoras/aviso-previo";
import calcularIrps from "./calculadoras/calcular-irps";
import calcularIva from "./calculadoras/calcular-iva";
import contribuicoesInps from "./calculadoras/contribuicoes-inps";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import euroEscudo from "./calculadoras/euro-escudo";
import horasExtraordinarias from "./calculadoras/horas-extraordinarias";
import indemnizacaoPorDespedimento from "./calculadoras/indemnizacao-por-despedimento";
import liquidacaoFinal from "./calculadoras/liquidacao-final";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import trabalhoEmFeriado from "./calculadoras/trabalho-em-feriado";
import trabalhoNoturno from "./calculadoras/trabalho-noturno";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
import contenidoCalcularIrps from "./contenido/calcular-irps";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoContribuicoesInps from "./contenido/contribuicoes-inps";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoEuroEscudo from "./contenido/euro-escudo";
import contenidoHorasExtraordinarias from "./contenido/horas-extraordinarias";
import contenidoIndemnizacaoPorDespedimento from "./contenido/indemnizacao-por-despedimento";
import contenidoLiquidacaoFinal from "./contenido/liquidacao-final";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoTrabalhoEmFeriado from "./contenido/trabalho-em-feriado";
import contenidoTrabalhoNoturno from "./contenido/trabalho-noturno";
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
    { definicion: avisoPrevio, contenido: contenidoAvisoPrevio, cliente: () => import("./calculadoras/aviso-previo.cliente") },
    { definicion: calcularIrps, contenido: contenidoCalcularIrps, cliente: () => import("./calculadoras/calcular-irps.cliente") },
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: contribuicoesInps, contenido: contenidoContribuicoesInps, cliente: () => import("./calculadoras/contribuicoes-inps.cliente") },
    { definicion: custoDoTrabalhador, contenido: contenidoCustoDoTrabalhador, cliente: () => import("./calculadoras/custo-do-trabalhador.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: euroEscudo, contenido: contenidoEuroEscudo, cliente: () => import("./calculadoras/euro-escudo.cliente") },
    { definicion: horasExtraordinarias, contenido: contenidoHorasExtraordinarias, cliente: () => import("./calculadoras/horas-extraordinarias.cliente") },
    { definicion: indemnizacaoPorDespedimento, contenido: contenidoIndemnizacaoPorDespedimento, cliente: () => import("./calculadoras/indemnizacao-por-despedimento.cliente") },
    { definicion: liquidacaoFinal, contenido: contenidoLiquidacaoFinal, cliente: () => import("./calculadoras/liquidacao-final.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: trabalhoEmFeriado, contenido: contenidoTrabalhoEmFeriado, cliente: () => import("./calculadoras/trabalho-em-feriado.cliente") },
    { definicion: trabalhoNoturno, contenido: contenidoTrabalhoNoturno, cliente: () => import("./calculadoras/trabalho-noturno.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
