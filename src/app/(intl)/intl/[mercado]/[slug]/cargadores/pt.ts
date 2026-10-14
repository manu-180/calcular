// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "acerto-de-contas": () => import("@/paises/pt/calculadoras/acerto-de-contas"),
  "atualizar-valor-inflacao": () => import("@/paises/pt/calculadoras/atualizar-valor-inflacao"),
  "aviso-previo": () => import("@/paises/pt/calculadoras/aviso-previo"),
  "calcular-iva": () => import("@/paises/pt/calculadoras/calcular-iva"),
  "compensacao-por-despedimento": () => import("@/paises/pt/calculadoras/compensacao-por-despedimento"),
  "custo-trabalhador-empresa": () => import("@/paises/pt/calculadoras/custo-trabalhador-empresa"),
  "dias-de-ferias": () => import("@/paises/pt/calculadoras/dias-de-ferias"),
  "horas-extraordinarias": () => import("@/paises/pt/calculadoras/horas-extraordinarias"),
  "recibo-verde": () => import("@/paises/pt/calculadoras/recibo-verde"),
  "retencao-na-fonte": () => import("@/paises/pt/calculadoras/retencao-na-fonte"),
  "revisao-prestacao-euribor": () => import("@/paises/pt/calculadoras/revisao-prestacao-euribor"),
  "salario-liquido": () => import("@/paises/pt/calculadoras/salario-liquido"),
  "salario-minimo": () => import("@/paises/pt/calculadoras/salario-minimo"),
  "seguranca-social-independentes": () => import("@/paises/pt/calculadoras/seguranca-social-independentes"),
  "simulador-imt": () => import("@/paises/pt/calculadoras/simulador-imt"),
  "simulador-irs": () => import("@/paises/pt/calculadoras/simulador-irs"),
  "subsidio-de-desemprego": () => import("@/paises/pt/calculadoras/subsidio-de-desemprego"),
  "subsidio-de-ferias": () => import("@/paises/pt/calculadoras/subsidio-de-ferias"),
  "subsidio-de-natal": () => import("@/paises/pt/calculadoras/subsidio-de-natal"),
  "taxa-social-unica": () => import("@/paises/pt/calculadoras/taxa-social-unica"),
  "trabalho-noturno": () => import("@/paises/pt/calculadoras/trabalho-noturno"),
  "valor-ias": () => import("@/paises/pt/calculadoras/valor-ias"),
};
