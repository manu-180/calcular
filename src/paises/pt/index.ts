import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import avisoPrevio from "./calculadoras/aviso-previo";
import calcularIva from "./calculadoras/calcular-iva";
import compensacaoPorDespedimento from "./calculadoras/compensacao-por-despedimento";
import custoTrabalhadorEmpresa from "./calculadoras/custo-trabalhador-empresa";
import diasDeFerias from "./calculadoras/dias-de-ferias";
import horasExtraordinarias from "./calculadoras/horas-extraordinarias";
import reciboVerde from "./calculadoras/recibo-verde";
import retencaoNaFonte from "./calculadoras/retencao-na-fonte";
import salarioLiquido from "./calculadoras/salario-liquido";
import salarioMinimo from "./calculadoras/salario-minimo";
import segurancaSocialIndependentes from "./calculadoras/seguranca-social-independentes";
import simuladorIrs from "./calculadoras/simulador-irs";
import subsidioDeDesemprego from "./calculadoras/subsidio-de-desemprego";
import subsidioDeFerias from "./calculadoras/subsidio-de-ferias";
import subsidioDeNatal from "./calculadoras/subsidio-de-natal";
import taxaSocialUnica from "./calculadoras/taxa-social-unica";
import trabalhoNoturno from "./calculadoras/trabalho-noturno";
import contenidoAvisoPrevio from "./contenido/aviso-previo";
import contenidoCalcularIva from "./contenido/calcular-iva";
import contenidoCompensacaoPorDespedimento from "./contenido/compensacao-por-despedimento";
import contenidoCustoTrabalhadorEmpresa from "./contenido/custo-trabalhador-empresa";
import contenidoDiasDeFerias from "./contenido/dias-de-ferias";
import contenidoHorasExtraordinarias from "./contenido/horas-extraordinarias";
import contenidoReciboVerde from "./contenido/recibo-verde";
import contenidoRetencaoNaFonte from "./contenido/retencao-na-fonte";
import contenidoSalarioLiquido from "./contenido/salario-liquido";
import contenidoSalarioMinimo from "./contenido/salario-minimo";
import contenidoSegurancaSocialIndependentes from "./contenido/seguranca-social-independentes";
import contenidoSimuladorIrs from "./contenido/simulador-irs";
import contenidoSubsidioDeDesemprego from "./contenido/subsidio-de-desemprego";
import contenidoSubsidioDeFerias from "./contenido/subsidio-de-ferias";
import contenidoSubsidioDeNatal from "./contenido/subsidio-de-natal";
import contenidoTaxaSocialUnica from "./contenido/taxa-social-unica";
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
    { definicion: calcularIva, contenido: contenidoCalcularIva, cliente: () => import("./calculadoras/calcular-iva.cliente") },
    { definicion: compensacaoPorDespedimento, contenido: contenidoCompensacaoPorDespedimento, cliente: () => import("./calculadoras/compensacao-por-despedimento.cliente") },
    { definicion: custoTrabalhadorEmpresa, contenido: contenidoCustoTrabalhadorEmpresa, cliente: () => import("./calculadoras/custo-trabalhador-empresa.cliente") },
    { definicion: diasDeFerias, contenido: contenidoDiasDeFerias, cliente: () => import("./calculadoras/dias-de-ferias.cliente") },
    { definicion: horasExtraordinarias, contenido: contenidoHorasExtraordinarias, cliente: () => import("./calculadoras/horas-extraordinarias.cliente") },
    { definicion: reciboVerde, contenido: contenidoReciboVerde, cliente: () => import("./calculadoras/recibo-verde.cliente") },
    { definicion: retencaoNaFonte, contenido: contenidoRetencaoNaFonte, cliente: () => import("./calculadoras/retencao-na-fonte.cliente") },
    { definicion: salarioLiquido, contenido: contenidoSalarioLiquido, cliente: () => import("./calculadoras/salario-liquido.cliente") },
    { definicion: salarioMinimo, contenido: contenidoSalarioMinimo, cliente: () => import("./calculadoras/salario-minimo.cliente") },
    { definicion: segurancaSocialIndependentes, contenido: contenidoSegurancaSocialIndependentes, cliente: () => import("./calculadoras/seguranca-social-independentes.cliente") },
    { definicion: simuladorIrs, contenido: contenidoSimuladorIrs, cliente: () => import("./calculadoras/simulador-irs.cliente") },
    { definicion: subsidioDeDesemprego, contenido: contenidoSubsidioDeDesemprego, cliente: () => import("./calculadoras/subsidio-de-desemprego.cliente") },
    { definicion: subsidioDeFerias, contenido: contenidoSubsidioDeFerias, cliente: () => import("./calculadoras/subsidio-de-ferias.cliente") },
    { definicion: subsidioDeNatal, contenido: contenidoSubsidioDeNatal, cliente: () => import("./calculadoras/subsidio-de-natal.cliente") },
    { definicion: taxaSocialUnica, contenido: contenidoTaxaSocialUnica, cliente: () => import("./calculadoras/taxa-social-unica.cliente") },
    { definicion: trabalhoNoturno, contenido: contenidoTrabalhoNoturno, cliente: () => import("./calculadoras/trabalho-noturno.cliente") },
  ],
  universales: { todas: true },
  novedades,
  detectores,
});
