"use client";

import { useActionState, useState } from "react";
import { recuperar } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function FormRecuperar() {
  const [vuelta, setVuelta] = useState(0);
  return <Formulario key={vuelta} onOtro={() => setVuelta((v) => v + 1)} />;
}

function Formulario({ onOtro }: { onOtro: () => void }) {
  const [estado, accion] = useActionState(recuperar, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const { login, recuperar: t } = useTextos();
  if (estado.estado === "enviado") {
    return (
      <Enviado titulo={login.revisaMail} email={estado.email} onOtro={onOtro}>
        {t.enviado}
      </Enviado>
    );
  }
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <Campo
        etiqueta={login.tuMail}
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
        ayuda={t.ayudaMail}
      />
      <BotonEnviar pendiente={login.mandandoEnlace}>{login.mandarEnlace}</BotonEnviar>
    </form>
  );
}
