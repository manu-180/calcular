"use client";

import { useEffect } from "react";
import { BotonInicio, PantallaDeError } from "@/components/PantallaDeError";

export default function ErrorAR({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[error]", error.digest ?? "", error);
  }, [error]);

  return (
    <PantallaDeError
      visor="error inesperado"
      resultado="E"
      titulo={
        <>
          Algo falló <span className="ca-igual">de nuestro lado</span>
        </>
      }
      texto="No es nada que hayas hecho vos. Probá de nuevo en unos segundos; si sigue pasando, avisanos desde Contacto y lo arreglamos."
      acciones={
        <>
          <button type="button" onClick={reset} className="ca-error-boton ca-error-boton-principal">
            Probar de nuevo
          </button>
          <BotonInicio principal={false} />
        </>
      }
    />
  );
}
