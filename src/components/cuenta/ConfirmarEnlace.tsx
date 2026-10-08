"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { confirmarEnlace } from "@/app/(ar)/auth/confirmar/acciones";
import type { TipoEnlaceConfirmar } from "@/app/(ar)/auth/confirmar/tipos";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar } from "@/components/cuenta/Campos";

const BOTON: Record<TipoEnlaceConfirmar, { texto: string; pendiente: string }> = {
  signup: { texto: "Confirmar y entrar", pendiente: "Confirmando…" },
  magiclink: { texto: "Entrar a mi cuenta", pendiente: "Entrando…" },
  recovery: { texto: "Seguir", pendiente: "Un segundo…" },
};

export function ConfirmarEnlace({ tokenHash, tipo, next }: { tokenHash: string; tipo: TipoEnlaceConfirmar; next: string }) {
  const [estado, accion] = useActionState(confirmarEnlace, ESTADO_INICIAL);

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
      <BotonEnviar pendiente={BOTON[tipo].pendiente}>{BOTON[tipo].texto}</BotonEnviar>
      <p className="text-center text-[13px] leading-relaxed text-zinc-500">
        Te pedimos este toque para que ningún programa de tu correo use el enlace antes que vos.
      </p>
    </form>
  );
}

export function EnlaceRoto({ motivo, tipo }: { motivo?: string; tipo: TipoEnlaceConfirmar | null }) {
  const pedirOtro = tipo === "recovery" ? "/recuperar" : "/login";
  const texto =
    motivo === "limite"
      ? "Hubo muchos intentos seguidos. Esperá unos minutos y volvé a tocar el enlace."
      : motivo === "vencido"
        ? "Por seguridad, cada enlace sirve una sola vez y vence al rato. Pedí uno nuevo y entrás enseguida."
        : motivo === "falla"
          ? "Tuvimos un problema de nuestro lado y no pudimos terminar. Pedí un enlace nuevo en unos minutos."
          : "Puede que ya lo hayas usado, que haya vencido o que se haya cortado al copiarlo. Pedí uno nuevo y entrás enseguida.";
  return (
    <div className="space-y-5">
      <Aviso tono="info" titulo={motivo === "vencido" ? "Este enlace ya no sirve" : motivo === "falla" ? "No pudimos terminar" : "Este enlace no funciona"}>
        {texto}
      </Aviso>
      <Link
        href={pedirOtro}
        className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-6 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.28)] active:translate-y-0"
      >
        Pedí un enlace nuevo
      </Link>
    </div>
  );
}
