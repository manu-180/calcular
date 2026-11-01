// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "atualizar-valor-inflacao": () => import("@/paises/mz/calculadoras/atualizar-valor-inflacao"),
  "aviso-previo": () => import("@/paises/mz/calculadoras/aviso-previo"),
  "calcular-irps": () => import("@/paises/mz/calculadoras/calcular-irps"),
  "calcular-ispc": () => import("@/paises/mz/calculadoras/calcular-ispc"),
  "calcular-iva": () => import("@/paises/mz/calculadoras/calcular-iva"),
  "calcular-sisa": () => import("@/paises/mz/calculadoras/calcular-sisa"),
  "cambio-metical": () => import("@/paises/mz/calculadoras/cambio-metical"),
  "contribuicao-inss": () => import("@/paises/mz/calculadoras/contribuicao-inss"),
  "custo-do-trabalhador": () => import("@/paises/mz/calculadoras/custo-do-trabalhador"),
  "dias-de-ferias": () => import("@/paises/mz/calculadoras/dias-de-ferias"),
  "horas-extraordinarias": () => import("@/paises/mz/calculadoras/horas-extraordinarias"),
  "imposto-mais-valias": () => import("@/paises/mz/calculadoras/imposto-mais-valias"),
  "indemnizacao-por-despedimento": () => import("@/paises/mz/calculadoras/indemnizacao-por-despedimento"),
  "licenca-de-maternidade": () => import("@/paises/mz/calculadoras/licenca-de-maternidade"),
  "limite-de-descontos": () => import("@/paises/mz/calculadoras/limite-de-descontos"),
  "periodo-probatorio": () => import("@/paises/mz/calculadoras/periodo-probatorio"),
  "rescisao-com-justa-causa": () => import("@/paises/mz/calculadoras/rescisao-com-justa-causa"),
  "salario-liquido": () => import("@/paises/mz/calculadoras/salario-liquido"),
  "salario-minimo": () => import("@/paises/mz/calculadoras/salario-minimo"),
  "trabalho-em-feriado": () => import("@/paises/mz/calculadoras/trabalho-em-feriado"),
  "trabalho-nocturno": () => import("@/paises/mz/calculadoras/trabalho-nocturno"),
};
