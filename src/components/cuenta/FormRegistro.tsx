"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registrar } from "@/lib/auth/acciones";
import { ESTADO_INICIAL, MIN_CLAVE } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, CampoClave, Casilla } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";

export function FormRegistro({ next, ayudaEmail }: { next?: string; ayudaEmail?: string }) {
  const [vuelta, setVuelta] = useState(0);
  return <Formulario key={vuelta} next={next} ayudaEmail={ayudaEmail} onOtro={() => setVuelta((v) => v + 1)} />;
}

function Formulario({
  next,
  ayudaEmail,
  onOtro,
}: {
  next?: string;
  ayudaEmail?: string;
  onOtro: () => void;
}) {
  const [estado, accion] = useActionState(registrar, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);

  if (estado.estado === "enviado") {
    return (
      <Enviado titulo="Revisá tu mail" email={estado.email} onOtro={onOtro}>
        Tocá el enlace del mail para confirmar tu cuenta y entrar.
      </Enviado>
    );
  }

  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" defaultValue="" />
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
        ayuda={ayudaEmail}
      />
      <CampoClave
        etiqueta="Elegí una clave"
        name="clave"
        autoComplete="new-password"
        required
        minLength={MIN_CLAVE}
        error={e.clave}
        ayuda={`Al menos ${MIN_CLAVE} caracteres. Una frase corta es más fácil de recordar.`}
      />
      <Casilla name="terminos" error={e.terminos} defaultChecked={estado.estado === "error" && !e.terminos}>
        Acepto los{" "}
        <Link href="/terminos" target="_blank" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
          términos
        </Link>{" "}
        y la{" "}
        <Link href="/privacidad" target="_blank" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
          política de privacidad
        </Link>
        .
      </Casilla>
      <BotonEnviar pendiente="Creando tu cuenta…">Crear mi cuenta</BotonEnviar>
    </form>
  );
}
