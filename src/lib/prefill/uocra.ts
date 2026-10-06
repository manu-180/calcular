import type { Prefill } from "./tipos";

export type Datos = Record<string, never>;

export const prefill: Prefill<Datos> = {
  validar: () => null,
};
