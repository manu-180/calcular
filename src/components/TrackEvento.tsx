"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

type Props = {
  evento: string;
  propiedades?: Record<string, string | number | boolean>;
};

export function TrackEvento({ evento, propiedades }: Props) {
  useEffect(() => {
    track(evento, propiedades);
    // se dispara una sola vez al montar — no necesita deps de los valores
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
