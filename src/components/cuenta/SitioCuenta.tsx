"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe } from "@/lib/cuenta/textos";

// Por defecto "ar": las páginas de calcular.ar no llevan proveedor y su HTML no cambia.
const Contexto = createContext<SitioCuenta>("ar");

export function ProveedorSitio({ sitio, children }: { sitio: SitioCuenta; children: ReactNode }) {
  return <Contexto value={sitio}>{children}</Contexto>;
}

export const useSitio = () => useContext(Contexto);
export const useTextos = () => textosDe(useContext(Contexto));
