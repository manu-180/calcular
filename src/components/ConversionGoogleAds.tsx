"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type Props = {
  /** send_to de la conversión: "AW-XXXXXXXX/Label". */
  sendTo: string;
  /** Valor de la conversión en la moneda de la cuenta (ARS). */
  value: number;
  /** ID estable de la transacción (hash del payment_id) para que Google deduplique en refrescos. */
  transactionId: string;
  currency?: string;
};

/**
 * Reporta una conversión a Google Ads una sola vez al montar.
 * Se monta SÓLO cuando el pago está aprobado (página /planillas/gracias), así
 * que su sola presencia ya significa "venta confirmada". El transaction_id
 * evita el doble conteo si el comprador recarga la página de gracias.
 */
export function ConversionGoogleAds({ sendTo, value, transactionId, currency = "ARS" }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Si el shim de gtag todavía no se inyectó (next/script lo hace en un efecto posterior), se
    // encola igual en el dataLayer: gtag.js lo procesa al cargar. Antes esto salía mudo y la
    // compra no llegaba a Google Ads.
    const gtag =
      typeof window.gtag === "function"
        ? window.gtag
        : (...args: unknown[]) => {
            (window.dataLayer = window.dataLayer || []).push(args);
          };
    gtag("event", "conversion", {
      send_to: sendTo,
      value,
      currency,
      transaction_id: transactionId,
    });
    // dispara una sola vez al montar — no depende de cambios de props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
