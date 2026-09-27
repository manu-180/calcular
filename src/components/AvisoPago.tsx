"use client";

import { useEffect, useState } from "react";

// MercadoPago devuelve a la landing con ?pago=fallido (rechazo) y el checkout propio con
// ?pago=error (MP no respondió). Hasta hoy la landing ignoraba el parámetro: el comprador
// volvía a la misma página sin ninguna explicación y sin saber si le habían cobrado.
// Se lee en el cliente para que la landing siga siendo estática.
export function AvisoPago() {
  const [estado, setEstado] = useState<string | null>(null);
  useEffect(() => {
    setEstado(new URLSearchParams(location.search).get("pago"));
  }, []);

  if (estado !== "fallido" && estado !== "error") return null;
  return (
    <div role="status" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      {estado === "fallido" ? (
        <>
          <p className="font-semibold">El pago no se completó y no se te cobró nada.</p>
          <p className="mt-1">
            Suele pasar cuando el banco no autoriza la operación. Podés intentarlo de nuevo con otra tarjeta, con
            débito o con dinero en cuenta de MercadoPago.
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold">No pudimos abrir MercadoPago.</p>
          <p className="mt-1">
            Fue un problema de conexión de nuestro lado, no de tu tarjeta. Probá de nuevo en un minuto; si sigue,{" "}
            <a href="/contacto" className="font-semibold underline">
              escribinos
            </a>{" "}
            y te la mandamos por otra vía.
          </p>
        </>
      )}
    </div>
  );
}
