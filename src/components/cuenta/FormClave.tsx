"use client";

import { useActionState } from "react";
import { cambiarClave } from "@/lib/auth/acciones";
import { ESTADO_INICIAL, MIN_CLAVE } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, CampoClave } from "@/components/cuenta/Campos";
import { useFocoEnError } from "@/components/cuenta/Enviado";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function FormClave() {
  const [estado, accion] = useActionState(cambiarClave, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const textos = useTextos();
  const t = textos.clave;
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <CampoClave
        etiqueta={t.nueva}
        name="clave"
        autoComplete="new-password"
        required
        minLength={MIN_CLAVE}
        autoFocus
        error={e.clave}
        ayuda={textos.registro.ayudaClave(MIN_CLAVE)}
      />
      <CampoClave etiqueta={t.repetila} name="clave2" autoComplete="new-password" required error={e.clave2} />
      <BotonEnviar pendiente={t.guardando}>{t.guardar}</BotonEnviar>
    </form>
  );
}
