"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ingresarConClave, pedirEnlace } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, CampoClave } from "@/components/cuenta/Campos";
import { Enviado, useFocoEnError } from "@/components/cuenta/Enviado";
import { BotonGoogle } from "@/components/cuenta/BotonGoogle";
import { useTextos } from "@/components/cuenta/SitioCuenta";
import { GOOGLE_ACTIVO } from "@/lib/funciones";

type Modo = "clave" | "enlace";

// desde: de qué página llegó la persona (sólo en calcularya, para saber de qué país es la cuenta).
export function FormLogin({ next, desde, conGoogle = GOOGLE_ACTIVO }: { next?: string; desde?: string; conGoogle?: boolean }) {
  const [modo, setModo] = useState<Modo>("clave");
  const [email, setEmail] = useState("");
  const [vuelta, setVuelta] = useState(0);
  const t = useTextos().login;

  return (
    <div>
      {conGoogle ? <BotonGoogle next={next} desde={desde} conTerminos /> : null}
      <div role="group" aria-label={t.comoEntrar} className="relative mb-6 grid grid-cols-2 rounded-full bg-zinc-100 p-1 text-sm font-medium">
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
            {m === "clave" ? t.conClave : t.conEnlace}
          </button>
        ))}
      </div>
      {modo === "clave" ? (
        <ConClave key={`c${vuelta}`} next={next} desde={desde} email={email} setEmail={setEmail} irAEnlace={() => setModo("enlace")} />
      ) : (
        <ConEnlace key={`e${vuelta}`} next={next} desde={desde} email={email} setEmail={setEmail} onOtro={() => setVuelta((v) => v + 1)} />
      )}
    </div>
  );
}

type Props = { next?: string; desde?: string; email: string; setEmail: (v: string) => void };

function Ocultos({ next, desde }: Pick<Props, "next" | "desde">) {
  return (
    <>
      <input type="hidden" name="next" value={next ?? ""} />
      {desde ? <input type="hidden" name="desde" value={desde} /> : null}
    </>
  );
}

function CampoEmail({ email, setEmail, error }: Pick<Props, "email" | "setEmail"> & { error?: string }) {
  const t = useTextos().login;
  return (
    <Campo
      etiqueta={t.tuMail}
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

function ConClave({ next, desde, email, setEmail, irAEnlace }: Props & { irAEnlace: () => void }) {
  const [estado, accion] = useActionState(ingresarConClave, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const t = useTextos().login;
  const e = estado.errores ?? {};
  return (
    <>
      <form ref={ref} action={accion} className="space-y-5" noValidate>
        {estado.mensaje && !estado.sinConfirmar ? (
          <Aviso tono="error">
            {estado.mensaje}{" "}
            <button type="button" onClick={irAEnlace} className="cursor-pointer font-semibold underline underline-offset-4">
              {t.pedirEnlace}
            </button>
          </Aviso>
        ) : null}
        <Ocultos next={next} desde={desde} />
        <CampoEmail email={email} setEmail={setEmail} error={e.email} />
        <CampoClave
          etiqueta={t.tuClave}
          name="clave"
          autoComplete="current-password"
          required
          autoFocus={!!email}
          error={e.clave}
          extra={
            <Link href="/recuperar" className="text-[13px] font-medium text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
              {t.olvide}
            </Link>
          }
        />
        <BotonEnviar pendiente={t.entrando}>{t.entrar}</BotonEnviar>
      </form>
      {estado.sinConfirmar ? <ReenviarConfirmacion email={email} next={next} mensaje={estado.mensaje} /> : null}
    </>
  );
}

function ReenviarConfirmacion({ email, next, mensaje }: { email: string; next?: string; mensaje?: string }) {
  const [estado, accion] = useActionState(pedirEnlace, ESTADO_INICIAL);
  const t = useTextos().login;
  if (estado.estado === "enviado") {
    return (
      <div className="mt-5">
        <Aviso tono="ok" titulo={t.reenviadoTitulo}>
          {t.reenviadoTexto}
        </Aviso>
      </div>
    );
  }
  return (
    <form action={accion} className="mt-5 space-y-3">
      <Aviso tono="info" titulo={t.faltaConfirmar}>
        {estado.mensaje ?? mensaje}
      </Aviso>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="next" value={next ?? ""} />
      <input type="hidden" name="motivo" value="confirmar" />
      <BotonEnviar variante="secundario" pendiente={t.mandando}>
        {t.reenviar}
      </BotonEnviar>
    </form>
  );
}

function ConEnlace({ next, desde, email, setEmail, onOtro }: Props & { onOtro: () => void }) {
  const [estado, accion] = useActionState(pedirEnlace, ESTADO_INICIAL);
  const ref = useFocoEnError(estado);
  const t = useTextos().login;
  if (estado.estado === "enviado") {
    return (
      <Enviado titulo={t.revisaMail} email={estado.email} onOtro={onOtro}>
        {t.enlaceEnviado}
      </Enviado>
    );
  }
  const e = estado.errores ?? {};
  return (
    <form ref={ref} action={accion} className="space-y-5" noValidate>
      {estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
      <Ocultos next={next} desde={desde} />
      <CampoEmail email={email} setEmail={setEmail} error={e.email} />
      <p className="-mt-2 text-[13px] leading-relaxed text-zinc-500">{t.enlaceAyuda}</p>
      <BotonEnviar pendiente={t.mandandoEnlace}>{t.mandarEnlace}</BotonEnviar>
    </form>
  );
}
