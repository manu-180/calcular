// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "atualizar-valor-inflacao": () => import("@/paises/ao/calculadoras/atualizar-valor-inflacao"),
  "aviso-previo": () => import("@/paises/ao/calculadoras/aviso-previo"),
  "calcular-irt": () => import("@/paises/ao/calculadoras/calcular-irt"),
  "calcular-iva": () => import("@/paises/ao/calculadoras/calcular-iva"),
  "calcular-sisa": () => import("@/paises/ao/calculadoras/calcular-sisa"),
  "cambio-kwanza": () => import("@/paises/ao/calculadoras/cambio-kwanza"),
  "compensacao-por-despedimento": () => import("@/paises/ao/calculadoras/compensacao-por-despedimento"),
  "contribuicao-cambial": () => import("@/paises/ao/calculadoras/contribuicao-cambial"),
  "custo-do-trabalhador": () => import("@/paises/ao/calculadoras/custo-do-trabalhador"),
  "dias-de-ferias": () => import("@/paises/ao/calculadoras/dias-de-ferias"),
  "horas-extraordinarias": () => import("@/paises/ao/calculadoras/horas-extraordinarias"),
  "imposto-predial": () => import("@/paises/ao/calculadoras/imposto-predial"),
  "imposto-predial-rendas": () => import("@/paises/ao/calculadoras/imposto-predial-rendas"),
  "irt-grupo-c": () => import("@/paises/ao/calculadoras/irt-grupo-c"),
  "salario-liquido": () => import("@/paises/ao/calculadoras/salario-liquido"),
  "salario-minimo": () => import("@/paises/ao/calculadoras/salario-minimo"),
  "seguranca-social-inss": () => import("@/paises/ao/calculadoras/seguranca-social-inss"),
  "subsidio-de-ferias": () => import("@/paises/ao/calculadoras/subsidio-de-ferias"),
  "subsidio-de-natal": () => import("@/paises/ao/calculadoras/subsidio-de-natal"),
  "trabalho-nocturno": () => import("@/paises/ao/calculadoras/trabalho-nocturno"),
};
