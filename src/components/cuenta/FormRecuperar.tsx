"use client";

import { useActionState, useState } from "react";
import { recuperar } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";

export function FormRecuperar() {
  const [vuelta, setVuelta] = useState(0);
  return <Formulario key={vuelta} onOtro={() => setVuelta((v) => v + 1)} />;
}

function Formulario({ onOtro }: { onOtro: () => void }) {
  const [estado, accion] = useActionState(recuperar, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  if (estado.estado === "enviado") {
    return (
      <Enviado titulo="Revisá tu mail" email={estado.email} onOtro={onOtro}>
        Tocá el enlace del mail y elegí tu clave nueva.
      </Enviado>
    );
  }
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <Campo
        etiqueta="Tu mail"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        required
        autoFocus
        placeholder="nombre@ejemplo.com"
        defaultValue={estado.email ?? ""}
        error={e.email}
        ayuda="El mismo con el que creaste la cuenta."
      />
      <BotonEnviar pendiente="Mandando el enlace…">Mandame el enlace</BotonEnviar>
    </form>
  );
}
