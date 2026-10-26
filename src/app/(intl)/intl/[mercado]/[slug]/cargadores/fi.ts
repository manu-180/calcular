// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "alv-laskuri": () => import("@/paises/fi/calculadoras/alv-laskuri"),
  "inflaatiolaskuri": () => import("@/paises/fi/calculadoras/inflaatiolaskuri"),
  "irtisanomisaika": () => import("@/paises/fi/calculadoras/irtisanomisaika"),
  "kilometrikorvaus": () => import("@/paises/fi/calculadoras/kilometrikorvaus"),
  "kotitalousvahennys-laskuri": () => import("@/paises/fi/calculadoras/kotitalousvahennys-laskuri"),
  "kunnallisverolaskuri": () => import("@/paises/fi/calculadoras/kunnallisverolaskuri"),
  "lahjaverolaskuri": () => import("@/paises/fi/calculadoras/lahjaverolaskuri"),
  "lapsilisa": () => import("@/paises/fi/calculadoras/lapsilisa"),
  "lomakorvauslaskuri": () => import("@/paises/fi/calculadoras/lomakorvauslaskuri"),
  "lomapalkkalaskuri": () => import("@/paises/fi/calculadoras/lomapalkkalaskuri"),
  "lomarahalaskuri": () => import("@/paises/fi/calculadoras/lomarahalaskuri"),
  "osakesaastotili-verotus": () => import("@/paises/fi/calculadoras/osakesaastotili-verotus"),
  "paaomatulovero": () => import("@/paises/fi/calculadoras/paaomatulovero"),
  "palkkalaskuri": () => import("@/paises/fi/calculadoras/palkkalaskuri"),
  "perintoverolaskuri": () => import("@/paises/fi/calculadoras/perintoverolaskuri"),
  "sairauspaivaraha-laskuri": () => import("@/paises/fi/calculadoras/sairauspaivaraha-laskuri"),
  "tyonantajan-sivukulut": () => import("@/paises/fi/calculadoras/tyonantajan-sivukulut"),
  "vanhempainpaivaraha-laskuri": () => import("@/paises/fi/calculadoras/vanhempainpaivaraha-laskuri"),
  "varainsiirtovero-laskuri": () => import("@/paises/fi/calculadoras/varainsiirtovero-laskuri"),
  "veroprosenttilaskuri": () => import("@/paises/fi/calculadoras/veroprosenttilaskuri"),
  "viivastyskorkolaskuri": () => import("@/paises/fi/calculadoras/viivastyskorkolaskuri"),
  "yle-vero": () => import("@/paises/fi/calculadoras/yle-vero"),
  "ylityokorvaus": () => import("@/paises/fi/calculadoras/ylityokorvaus"),
};
