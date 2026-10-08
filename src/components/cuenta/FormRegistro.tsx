"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registrar } from "@/lib/auth/acciones";
import { ESTADO_INICIAL, MIN_CLAVE } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, CampoClave, Casilla } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";
import { BotonGoogle } from "@/components/cuenta/BotonGoogle";
import { useTextos } from "@/components/cuenta/SitioCuenta";
import { GOOGLE_ACTIVO } from "@/lib/funciones";

type Props = { next?: string; desde?: string; ayudaEmail?: string; conGoogle?: boolean };

export function FormRegistro(props: Props) {
  const [vuelta, setVuelta] = useState(0);
  return <Formulario key={vuelta} {...props} onOtro={() => setVuelta((v) => v + 1)} />;
}

function Formulario({ next, desde, ayudaEmail, conGoogle = GOOGLE_ACTIVO, onOtro }: Props & { onOtro: () => void }) {
  const [estado, accion] = useActionState(registrar, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const textos = useTextos();
  const t = textos.registro;

  if (estado.estado === "enviado") {
    return (
      <Enviado titulo={textos.login.revisaMail} email={estado.email} onOtro={onOtro}>
        {t.enviado}
      </Enviado>
    );
  }

  const e = estado.errores ?? {};
  return (
    <>
      {conGoogle ? <BotonGoogle next={next} desde={desde} conTerminos /> : null}
      <form ref={ref} action={accion} className="space-y-5" noValidate>
        {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
        <input type="hidden" name="next" value={next ?? ""} />
        {desde ? <input type="hidden" name="desde" value={desde} /> : null}
        <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" defaultValue="" />
        <Campo
          etiqueta={textos.login.tuMail}
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
          etiqueta={t.elegiClave}
          name="clave"
          autoComplete="new-password"
          required
          minLength={MIN_CLAVE}
          error={e.clave}
          ayuda={t.ayudaClave(MIN_CLAVE)}
        />
        <Casilla name="terminos" error={e.terminos} defaultChecked={estado.estado === "error" && !e.terminos}>
          {t.acepto}{" "}
          <Link href="/terminos" target="_blank" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
            {textos.google.terminos}
          </Link>{" "}
          {textos.google.yLa}{" "}
          <Link href="/privacidad" target="_blank" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
            {textos.google.privacidad}
          </Link>
          .
        </Casilla>
        <BotonEnviar pendiente={t.creando}>{t.crear}</BotonEnviar>
      </form>
    </>
  );
}
