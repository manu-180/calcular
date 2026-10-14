import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosPt: TextosUi<UiPresupuesto> = {
  slug: "regra-50-30-20",
  ui: () => ({
    ingreso: "Renda líquida mensal",
    ingresoAyuda: "O que cai na sua conta por mês, já com impostos e descontos tirados.",
    pctNecesidades: "Necessidades (%)",
    pctNecesidadesAyuda: "Moradia, mercado, contas da casa, transporte, saúde e parcelas mínimas de dívidas.",
    pctGustos: "Desejos (%)",
    pctGustosAyuda: "Comer fora, compras que não são essenciais, assinaturas, viagens.",
    pctAhorro: "Poupança (%)",
    pctAhorroAyuda: "Reserva de emergência, metas, aposentadoria e pagamentos extras de dívidas.",
    necesidades: "Para necessidades",
    gustos: "Para desejos",
    ahorro: "Para poupar",
    ahorroAnual: "Poupança em um ano",
    errorIngreso: "Coloque a sua renda mensal.",
    errorSuma: (suma) => `As três porcentagens somam ${suma}%. Elas precisam somar 100%.`,
    observacionAhorroBajo: "Poupar menos de 10% deixa pouca margem para imprevistos. Se puder, corte alguns desejos.",
  }),
};
