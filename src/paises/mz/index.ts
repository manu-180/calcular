import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import avisoPrevio from "./calculadoras/aviso-previo";
import calcularIrps from "./calculadoras/calcular-irps";
import calcularIspc from "./calculadoras/calcular-ispc";
import calcularIva from "./calculadoras/calcular-iva";
import contribuicaoInss from "./calculadoras/contribuicao-inss";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import horasExtraordinarias from "./calculadoras/horas-extraordinarias";
import indemnizacaoPorDespedimento from "./calculadoras/indemnizacao-por-despedimento";
import licencaDeMaternidade from "./calculadoras/licenca-de-maternidade";
import limiteDeDescontos from "./calculadoras/limite-de-descontos";
import periodoProbatorio from "./calculadoras/periodo-probatorio";
import rescisaoComJustaCausa from "./calculadoras/rescisao-com-justa-causa";
import salarioLiquido from "./calculadoras/salario-liquido";
import trabalhoEmFeriado from "./calculadoras/trabalho-em-feriado";
import trabalhoNocturno from "./calculadoras/trabalho-nocturno";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
import contenidoCalcularIrps from "./contenido/calcular-irps";
import contenidoCalcularIspc from "./contenido/calcular-ispc";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoContribuicaoInss from "./contenido/contribuicao-inss";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoHorasExtraordinarias from "./contenido/horas-extraordinarias";
import contenidoIndemnizacaoPorDespedimento from "./contenido/indemnizacao-por-despedimento";
import contenidoLicencaDeMaternidade from "./contenido/licenca-de-maternidade";
import contenidoLimiteDeDescontos from "./contenido/limite-de-descontos";
import contenidoPeriodoProbatorio from "./contenido/periodo-probatorio";
import contenidoRescisaoComJustaCausa from "./contenido/rescisao-com-justa-causa";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoTrabalhoEmFeriado from "./contenido/trabalho-em-feriado";
import contenidoTrabalhoNocturno from "./contenido/trabalho-nocturno";
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
    { definicion: calcularIspc, contenido: contenidoCalcularIspc, cliente: () => import("./calculadoras/calcular-ispc.cliente") },
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: contribuicaoInss, contenido: contenidoContribuicaoInss, cliente: () => import("./calculadoras/contribuicao-inss.cliente") },
    { definicion: custoDoTrabalhador, contenido: contenidoCustoDoTrabalhador, cliente: () => import("./calculadoras/custo-do-trabalhador.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: horasExtraordinarias, contenido: contenidoHorasExtraordinarias, cliente: () => import("./calculadoras/horas-extraordinarias.cliente") },
    { definicion: indemnizacaoPorDespedimento, contenido: contenidoIndemnizacaoPorDespedimento, cliente: () => import("./calculadoras/indemnizacao-por-despedimento.cliente") },
    { definicion: licencaDeMaternidade, contenido: contenidoLicencaDeMaternidade, cliente: () => import("./calculadoras/licenca-de-maternidade.cliente") },
    { definicion: limiteDeDescontos, contenido: contenidoLimiteDeDescontos, cliente: () => import("./calculadoras/limite-de-descontos.cliente") },
    { definicion: periodoProbatorio, contenido: contenidoPeriodoProbatorio, cliente: () => import("./calculadoras/periodo-probatorio.cliente") },
    { definicion: rescisaoComJustaCausa, contenido: contenidoRescisaoComJustaCausa, cliente: () => import("./calculadoras/rescisao-com-justa-causa.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: trabalhoEmFeriado, contenido: contenidoTrabalhoEmFeriado, cliente: () => import("./calculadoras/trabalho-em-feriado.cliente") },
    { definicion: trabalhoNocturno, contenido: contenidoTrabalhoNocturno, cliente: () => import("./calculadoras/trabalho-nocturno.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
