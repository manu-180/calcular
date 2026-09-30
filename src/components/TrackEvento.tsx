"use client";

import { useEffect } from "react";
import { esTipoEvento, rastrear } from "@/lib/rastreo";

type Props = {
  evento: string;
  propiedades?: Record<string, string | number | boolean>;
};

// Los nombres que no son un `TipoEvento` (los viejos de Vercel Analytics) no se mandan: la compra,
// por ejemplo, ya la asienta el webhook en ca_compras con el pago verificado.
export function TrackEvento({ evento, propiedades }: Props) {
  useEffect(() => {
    if (!esTipoEvento(evento)) return;
    const { producto, ...resto } = propiedades ?? {};
    rastrear(evento, { producto: typeof producto === "string" ? producto : undefined, props: resto });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
