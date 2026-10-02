"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ingresarConClave, pedirEnlace } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, CampoClave } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";
import { BotonGoogle } from "@/components/cuenta/BotonGoogle";
import { GOOGLE_ACTIVO } from "@/lib/funciones";

type Modo = "clave" | "enlace";

export function FormLogin({ next }: { next?: string }) {
  const [modo, setModo] = useState<Modo>("clave");
  const [email, setEmail] = useState("");
  const [vuelta, setVuelta] = useState(0);

  return (
    <div>
      {GOOGLE_ACTIVO ? <BotonGoogle next={next} conTerminos /> : null}
      <div role="group" aria-label="Cómo querés entrar" className="relative mb-6 grid grid-cols-2 rounded-full bg-zinc-100 p-1 text-sm font-medium">
        <span
          aria-hidden
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_10px_-6px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[var(--ease-snappy)] ${modo === "enlace" ? "translate-x-full" : ""}`}
        />
        {(["clave", "enlace"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={modo === m}
            onClick={() => setModo(m)}
            className={`relative z-10 h-10 cursor-pointer rounded-full px-3 transition-colors duration-200 ${modo === m ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            {m === "clave" ? "Con mi clave" : "Con un enlace"}
          </button>
        ))}
      </div>
      {modo === "clave" ? (
        <ConClave key={`c${vuelta}`} next={next} email={email} setEmail={setEmail} irAEnlace={() => setModo("enlace")} />
      ) : (
        <ConEnlace key={`e${vuelta}`} next={next} email={email} setEmail={setEmail} onOtro={() => setVuelta((v) => v + 1)} />
      )}
    </div>
  );
}

type Props = { next?: string; email: string; setEmail: (v: string) => void };

function CampoEmail({ email, setEmail, error }: Pick<Props, "email" | "setEmail"> & { error?: string }) {
  return (
    <Campo
      etiqueta="Tu mail"
      name="email"
      type="email"
      inputMode="email"
      autoComplete="username"
      autoCapitalize="none"
      spellCheck={false}
      required
      autoFocus={!email}
      placeholder="nombre@ejemplo.com"
      value={email}
      onChange={(ev) => setEmail(ev.target.value)}
      error={error}
    />
  );
}

function ConClave({ next, email, setEmail, irAEnlace }: Props & { irAEnlace: () => void }) {
  const [estado, accion] = useActionState(ingresarConClave, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const e = estado.errores ?? {};
  return (
    <>
      <form ref={ref} action={accion} className="space-y-5" noValidate>
        {estado.mensaje && !estado.sinConfirmar ? (
          <Aviso tono="error">
            {estado.mensaje}{" "}
            <button type="button" onClick={irAEnlace} className="cursor-pointer font-semibold underline underline-offset-4">
              Mandame un enlace
            </button>
          </Aviso>
        ) : null}
        <input type="hidden" name="next" value={next ?? ""} />
        <CampoEmail email={email} setEmail={setEmail} error={e.email} />
        <CampoClave
          etiqueta="Tu clave"
          name="clave"
          autoComplete="current-password"
          required
          autoFocus={!!email}
          error={e.clave}
          extra={
            <Link href="/recuperar" className="text-[13px] font-medium text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
              ¿Te olvidaste la clave?
            </Link>
          }
        />
        <BotonEnviar pendiente="Entrando…">Entrar</BotonEnviar>
      </form>
      {estado.sinConfirmar ? <ReenviarConfirmacion email={email} next={next} mensaje={estado.mensaje} /> : null}
    </>
  );
}

function ReenviarConfirmacion({ email, next, mensaje }: { email: string; next?: string; mensaje?: string }) {
  const [estado, accion] = useActionState(pedirEnlace, ESTADO_INICIAL);
  if (estado.estado === "enviado") {
    return (
      <div className="mt-5">
        <Aviso tono="ok" titulo="Listo, te lo mandamos de nuevo">
          Tocá el enlace del mail para confirmar tu cuenta. Si no llega, mirá en spam.
        </Aviso>
      </div>
    );
  }
  return (
    <form action={accion} className="mt-5 space-y-3">
      <Aviso tono="info" titulo="Falta confirmar tu mail">
        {estado.mensaje ?? mensaje}
      </Aviso>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="hidden" name="motivo" value="confirmar" />
      <BotonEnviar variante="secundario" pendiente="Mandando…">
        Mandame el enlace de nuevo
      </BotonEnviar>
    </form>
  );
}

function ConEnlace({ next, email, setEmail, onOtro }: Props & { onOtro: () => void }) {
  const [estado, accion] = useActionState(pedirEnlace, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  if (estado.estado === "enviado") {
    return (
      <Enviado titulo="Revisá tu mail" email={estado.email} onOtro={onOtro}>
        Tocá el enlace del mail y entrás directo, sin clave.
      </Enviado>
    );
  }
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <input type="hidden" name="next" value={next ?? ""} />
      <CampoEmail email={email} setEmail={setEmail} error={e.email} />
      <p className="-mt-2 text-[13px] leading-relaxed text-zinc-500">
        Te mandamos un enlace al mail: lo tocás y entrás, sin escribir la clave.
      </p>
      <BotonEnviar pendiente="Mandando el enlace…">Mandame el enlace</BotonEnviar>
    </form>
  );
}
