// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { CargadoresMercado } from "./tipos";

export const MERCADOS: Readonly<Record<string, CargadoresMercado>> = {
  "bo": () => import("./bo"),
  "br": () => import("./br"),
  "ca": () => import("./ca"),
  "cl": () => import("./cl"),
  "co": () => import("./co"),
  "cr": () => import("./cr"),
  "de": () => import("./de"),
  "do": () => import("./do"),
  "ec": () => import("./ec"),
  "es": () => import("./es"),
  "fr": () => import("./fr"),
  "gb": () => import("./gb"),
  "gt": () => import("./gt"),
  "hn": () => import("./hn"),
  "it": () => import("./it"),
  "mx": () => import("./mx"),
  "ni": () => import("./ni"),
  "nl": () => import("./nl"),
  "pa": () => import("./pa"),
  "pe": () => import("./pe"),
  "py": () => import("./py"),
  "sv": () => import("./sv"),
  "us": () => import("./us"),
  "uy": () => import("./uy"),
  "ve": () => import("./ve"),
};
