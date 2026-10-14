"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { desdeCompacto, type OpcionPais, type PaisCompacto } from "./paises";

const Contexto = createContext<readonly OpcionPais[]>([]);

// La lista de países entra una vez por página (el layout la pone arriba de todo) y la leen el
// selector, el cajón del celular y el aviso de país. Antes cada uno la recibía por props y cada
// copia viajaba en el payload RSC; con 190 países eran decenas de KB por página.
export function ProveedorPaises({ paises, children }: { paises: readonly PaisCompacto[]; children: ReactNode }) {
  const opciones = useMemo(() => paises.map(desdeCompacto), [paises]);
  return <Contexto.Provider value={opciones}>{children}</Contexto.Provider>;
}

export function usePaises(): readonly OpcionPais[] {
  return useContext(Contexto);
}
