import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import atualizarValorInflacao from "./calculadoras/atualizar-valor-inflacao";
import avisoPrevio from "./calculadoras/aviso-previo";
import calcularIrt from "./calculadoras/calcular-irt";
import calcularIva from "./calculadoras/calcular-iva";
import calcularSisa from "./calculadoras/calcular-sisa";
import cambioKwanza from "./calculadoras/cambio-kwanza";
import compensacaoPorDespedimento from "./calculadoras/compensacao-por-despedimento";
import contribuicaoCambial from "./calculadoras/contribuicao-cambial";
import custoDoTrabalhador from "./calculadoras/custo-do-trabalhador";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import horasExtraordinarias from "./calculadoras/horas-extraordinarias";
import impostoPredial from "./calculadoras/imposto-predial";
import impostoPredialRendas from "./calculadoras/imposto-predial-rendas";
import irtGrupoC from "./calculadoras/irt-grupo-c";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import segurancaSocialInss from "./calculadoras/seguranca-social-inss";
import subsidioDeFerias from "./calculadoras/subsidio-de-ferias";
import subsidioDeNatal from "./calculadoras/subsidio-de-natal";
import trabalhoNocturno from "./calculadoras/trabalho-nocturno";
import contenidoAtualizarValorInflacao from "./contenido/atualizar-valor-inflacao";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
import contenidoCalcularIrt from "./contenido/calcular-irt";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoCalcularSisa from "./contenido/calcular-sisa";
import contenidoCambioKwanza from "./contenido/cambio-kwanza";
import contenidoCompensacaoPorDespedimento from "./contenido/compensacao-por-despedimento";
import contenidoContribuicaoCambial from "./contenido/contribuicao-cambial";
import contenidoCustoDoTrabalhador from "./contenido/custo-do-trabalhador";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoHorasExtraordinarias from "./contenido/horas-extraordinarias";
import contenidoImpostoPredial from "./contenido/imposto-predial";
import contenidoImpostoPredialRendas from "./contenido/imposto-predial-rendas";
import contenidoIrtGrupoC from "./contenido/irt-grupo-c";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSegurancaSocialInss from "./contenido/seguranca-social-inss";
import contenidoSubsidioDeFerias from "./contenido/subsidio-de-ferias";
import contenidoSubsidioDeNatal from "./contenido/subsidio-de-natal";
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
    { definicion: atualizarValorInflacao, contenido: contenidoAtualizarValorInflacao, cliente: () => import("./calculadoras/atualizar-valor-inflacao.cliente") },
    { definicion: avisoPrevio, contenido: contenidoAvisoPrevio, cliente: () => import("./calculadoras/aviso-previo.cliente") },
    { definicion: calcularIrt, contenido: contenidoCalcularIrt, cliente: () => import("./calculadoras/calcular-irt.cliente") },
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: calcularSisa, contenido: contenidoCalcularSisa, cliente: () => import("./calculadoras/calcular-sisa.cliente") },
    { definicion: cambioKwanza, contenido: contenidoCambioKwanza, cliente: () => import("./calculadoras/cambio-kwanza.cliente") },
    { definicion: compensacaoPorDespedimento, contenido: contenidoCompensacaoPorDespedimento, cliente: () => import("./calculadoras/compensacao-por-despedimento.cliente") },
    { definicion: contribuicaoCambial, contenido: contenidoContribuicaoCambial, cliente: () => import("./calculadoras/contribuicao-cambial.cliente") },
    { definicion: custoDoTrabalhador, contenido: contenidoCustoDoTrabalhador, cliente: () => import("./calculadoras/custo-do-trabalhador.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: horasExtraordinarias, contenido: contenidoHorasExtraordinarias, cliente: () => import("./calculadoras/horas-extraordinarias.cliente") },
    { definicion: impostoPredial, contenido: contenidoImpostoPredial, cliente: () => import("./calculadoras/imposto-predial.cliente") },
    { definicion: impostoPredialRendas, contenido: contenidoImpostoPredialRendas, cliente: () => import("./calculadoras/imposto-predial-rendas.cliente") },
    { definicion: irtGrupoC, contenido: contenidoIrtGrupoC, cliente: () => import("./calculadoras/irt-grupo-c.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: segurancaSocialInss, contenido: contenidoSegurancaSocialInss, cliente: () => import("./calculadoras/seguranca-social-inss.cliente") },
    { definicion: subsidioDeFerias, contenido: contenidoSubsidioDeFerias, cliente: () => import("./calculadoras/subsidio-de-ferias.cliente") },
    { definicion: subsidioDeNatal, contenido: contenidoSubsidioDeNatal, cliente: () => import("./calculadoras/subsidio-de-natal.cliente") },
    { definicion: trabalhoNocturno, contenido: contenidoTrabalhoNocturno, cliente: () => import("./calculadoras/trabalho-nocturno.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
