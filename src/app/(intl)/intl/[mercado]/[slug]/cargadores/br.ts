// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "abono-salarial-pis": () => import("@/paises/br/calculadoras/abono-salarial-pis"),
  "adicional-de-insalubridade": () => import("@/paises/br/calculadoras/adicional-de-insalubridade"),
  "adicional-de-periculosidade": () => import("@/paises/br/calculadoras/adicional-de-periculosidade"),
  "adicional-noturno": () => import("@/paises/br/calculadoras/adicional-noturno"),
  "aviso-previo": () => import("@/paises/br/calculadoras/aviso-previo"),
  "calculo-de-ferias": () => import("@/paises/br/calculadoras/calculo-de-ferias"),
  "calculo-fgts": () => import("@/paises/br/calculadoras/calculo-fgts"),
  "calculo-inss": () => import("@/paises/br/calculadoras/calculo-inss"),
  "calculo-irrf": () => import("@/paises/br/calculadoras/calculo-irrf"),
  "calculo-rescisao": () => import("@/paises/br/calculadoras/calculo-rescisao"),
  "correcao-pelo-ipca": () => import("@/paises/br/calculadoras/correcao-pelo-ipca"),
  "das-mei": () => import("@/paises/br/calculadoras/das-mei"),
  "decimo-terceiro": () => import("@/paises/br/calculadoras/decimo-terceiro"),
  "desconto-vale-transporte": () => import("@/paises/br/calculadoras/desconto-vale-transporte"),
  "dolar-ptax": () => import("@/paises/br/calculadoras/dolar-ptax"),
  "hora-extra": () => import("@/paises/br/calculadoras/hora-extra"),
  "inss-autonomo": () => import("@/paises/br/calculadoras/inss-autonomo"),
  "rendimento-da-poupanca": () => import("@/paises/br/calculadoras/rendimento-da-poupanca"),
  "salario-liquido": () => import("@/paises/br/calculadoras/salario-liquido"),
  "salario-minimo": () => import("@/paises/br/calculadoras/salario-minimo"),
  "saque-aniversario-fgts": () => import("@/paises/br/calculadoras/saque-aniversario-fgts"),
  "seguro-desemprego": () => import("@/paises/br/calculadoras/seguro-desemprego"),
  "simulador-imposto-de-renda": () => import("@/paises/br/calculadoras/simulador-imposto-de-renda"),
};
