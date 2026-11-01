// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "aviso-previo": () => import("@/paises/cv/calculadoras/aviso-previo"),
  "calcular-irps": () => import("@/paises/cv/calculadoras/calcular-irps"),
  "calcular-iva": () => import("@/paises/cv/calculadoras/calcular-iva"),
  "contribuicoes-inps": () => import("@/paises/cv/calculadoras/contribuicoes-inps"),
  "custo-do-trabalhador": () => import("@/paises/cv/calculadoras/custo-do-trabalhador"),
  "dias-de-ferias": () => import("@/paises/cv/calculadoras/dias-de-ferias"),
  "euro-escudo": () => import("@/paises/cv/calculadoras/euro-escudo"),
  "horas-extraordinarias": () => import("@/paises/cv/calculadoras/horas-extraordinarias"),
  "indemnizacao-por-despedimento": () => import("@/paises/cv/calculadoras/indemnizacao-por-despedimento"),
  "liquidacao-final": () => import("@/paises/cv/calculadoras/liquidacao-final"),
  "salario-liquido": () => import("@/paises/cv/calculadoras/salario-liquido"),
  "salario-minimo": () => import("@/paises/cv/calculadoras/salario-minimo"),
  "trabalho-em-feriado": () => import("@/paises/cv/calculadoras/trabalho-em-feriado"),
  "trabalho-noturno": () => import("@/paises/cv/calculadoras/trabalho-noturno"),
};
