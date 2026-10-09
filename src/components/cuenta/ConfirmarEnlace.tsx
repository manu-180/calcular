"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { confirmarEnlace } from "@/app/(ar)/auth/confirmar/acciones";
import type { TipoEnlaceConfirmar } from "@/app/(ar)/auth/confirmar/tipos";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar } from "@/components/cuenta/Campos";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function ConfirmarEnlace({ tokenHash, tipo, next }: { tokenHash: string; tipo: TipoEnlaceConfirmar; next: string }) {
  const [estado, accion] = useActionState(confirmarEnlace, ESTADO_INICIAL);
  const t = useTextos().confirmar;

  // El token ya viaja en el formulario: se saca de la barra para que ningún script de terceros
  // del layout (anuncios, métricas) lo lea de location.href ni quede en el historial.
  useEffect(() => {
    window.history.replaceState(window.history.state, "", "/auth/confirmar");
  }, []);

  if (estado.estado === "error") return <EnlaceRoto motivo={estado.mensaje} tipo={tipo} />;

  return (
    <form action={accion} className="space-y-4">
      <input type="hidden" name="token_hash" value={tokenHash} />
      <input type="hidden" name="type" value={tipo} />
      <input type="hidden" name="next" value={next} />
      <BotonEnviar pendiente={t.boton[tipo].pendiente}>{t.boton[tipo].texto}</BotonEnviar>
      <p className="text-center text-[13px] leading-relaxed text-zinc-500">{t.porQue}</p>
    </form>
  );
}

export function EnlaceRoto({ motivo, tipo }: { motivo?: string; tipo: TipoEnlaceConfirmar | null }) {
  const t = useTextos().confirmar;
  const pedirOtro = tipo === "recovery" ? "/recuperar" : "/login";
  const texto = motivo === "limite" ? t.limite : motivo === "vencido" ? t.vencido : motivo === "falla" ? t.falla : t.invalido;
  return (
    <div className="space-y-5">
      <Aviso tono="info" titulo={motivo === "vencido" ? t.tituloVencido : motivo === "falla" ? t.tituloFalla : t.tituloInvalido}>
        {texto}
      </Aviso>
      <Link
        href={pedirOtro}
        className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.28)] active:translate-y-0"
      >
        {t.pedirOtro}
      </Link>
    </div>
  );
}
