"use client";

import { useActionState } from "react";
import { cambiarClave } from "@/lib/auth/acciones";
import { ESTADO_INICIAL, MIN_CLAVE } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, CampoClave } from "@/components/cuenta/Campos";
import { useFocoEnError } from "@/components/cuenta/Enviado";

export function FormClave() {
  const [estado, accion] = useActionState(cambiarClave, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <CampoClave
        etiqueta="Clave nueva"
        name="clave"
        autoComplete="new-password"
        required
        minLength={MIN_CLAVE}
        autoFocus
        error={e.clave}
        ayuda={`Al menos ${MIN_CLAVE} caracteres. Una frase corta es más fácil de recordar.`}
      />
      <CampoClave etiqueta="Repetila" name="clave2" autoComplete="new-password" required error={e.clave2} />
      <BotonEnviar pendiente="Guardando…">Guardar la clave nueva</BotonEnviar>
    </form>
  );
}
