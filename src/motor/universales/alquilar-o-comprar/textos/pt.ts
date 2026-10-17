import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const base: TextosUi<UiAlquilarOComprar> = {
  slug: "alugar-ou-comprar",
  ui: () => ({
    precio: "Valor do imóvel",
    entrada: "Entrada (% do valor)",
    gastosCompra: "Custos de compra (% do valor)",
    gastosCompraAyuda: "Escritura, registro, impostos de transmissão, corretagem e avaliação.",
    tasa: "Taxa do financiamento (% ao ano)",
    aniosHipoteca: "Prazo do financiamento em anos",
    alquiler: "Aluguel mensal de um imóvel parecido",
    aumentoAlquiler: "Reajuste anual do aluguel (%)",
    gastosPropietario: "Gastos do proprietário por ano (% do valor)",
    gastosPropietarioAyuda: "Manutenção, impostos do imóvel e seguro. O comum é de 1% a 2%.",
    revalorizacion: "Valorização do imóvel por ano (%)",
    rendimiento: "Rendimento de um investimento alternativo (% ao ano)",
    rendimientoAyuda: "O que você ganharia investindo a entrada em vez de comprar.",
    horizonte: "Anos para comparar",
    veredicto: "Resultado",
    patrimonioComprar: "Patrimônio no final se comprar",
    patrimonioAlquilar: "Patrimônio no final se alugar",
    diferencia: "Diferença",
    anioDesde: "Ano em que comprar passa a compensar",
    pagadoAlquilando: "Total pago de aluguel",
    pagadoComprando: "Total de parcelas e gastos do proprietário",
    tabla: "Comparação ano a ano",
    colAnio: "Ano",
    colComprar: "Comprando",
    colAlquilar: "Alugando",
    colDiferencia: "Diferença",
    errorPrecio: "Coloque o valor do imóvel.",
    errorAlquiler: "Coloque quanto custaria alugar um imóvel parecido.",
    convieneComprar: (anios, diferencia) => `Comprar compensa mais: depois de ${anios} anos você teria ${diferencia} a mais.`,
    convieneAlquilar: (anios, diferencia) => `Alugar compensa mais: depois de ${anios} anos você teria ${diferencia} a mais.`,
    empate: (anios) => `Depois de ${anios} anos as duas opções dão o mesmo resultado.`,
    observacionDesde: (anio) => `Comprar passa à frente de alugar no ano ${anio} e continua na frente.`,
    observacionMetodo:
      "A conta compara o patrimônio que você teria em cada caso. Se alugar, a entrada e o que sobrar a cada mês ficam investidos. Os custos de uma venda futura não são descontados.",
  }),
};

const portugal = (): Partial<UiAlquilarOComprar> => ({
  gastosCompraAyuda: "Escritura, registo, IMT, imposto do selo, comissão da imobiliária e avaliação.",
  tasa: "Taxa de juro do crédito habitação (% ao ano)",
  aniosHipoteca: "Prazo do crédito em anos",
  alquiler: "Renda mensal de uma casa parecida",
  aumentoAlquiler: "Atualização anual da renda (%)",
  gastosPropietarioAyuda: "Manutenção, IMI, condomínio e seguro. O habitual é de 1% a 2%.",
  rendimientoAyuda: "O que ganharia se investisse a entrada em vez de comprar.",
  patrimonioComprar: "Património no final se comprar",
  patrimonioAlquilar: "Património no final se arrendar",
  pagadoAlquilando: "Total pago em renda",
  pagadoComprando: "Total de prestações e gastos do proprietário",
  colComprar: "Se comprar",
  colAlquilar: "Se arrendar",
  errorPrecio: "Indique o valor do imóvel.",
  errorAlquiler: "Indique quanto custaria arrendar uma casa parecida.",
  convieneComprar: (anios, diferencia) => `Comprar compensa mais: ao fim de ${anios} anos teria mais ${diferencia}.`,
  convieneAlquilar: (anios, diferencia) => `Arrendar compensa mais: ao fim de ${anios} anos teria mais ${diferencia}.`,
  empate: (anios) => `Ao fim de ${anios} anos as duas opções dão o mesmo resultado.`,
  observacionDesde: (anio) => `Comprar passa à frente de arrendar no ano ${anio} e não volta a ficar para trás.`,
  observacionMetodo:
    "A conta compara o património que teria em cada caso. Se arrendar, a entrada e o que sobrar todos os meses ficam investidos. Os custos de uma venda futura não são descontados.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
