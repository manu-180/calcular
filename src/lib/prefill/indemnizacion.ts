import type { Prefill } from "./tipos";

export type Datos = never;

export const prefill: Prefill<Datos> = {
  validar: () => null,
};
