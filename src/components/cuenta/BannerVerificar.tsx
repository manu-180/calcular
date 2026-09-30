"use client";

import { useActionState } from "react";
import { reenviarConfirmacion } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { BotonEnviar } from "@/components/cuenta/Campos";

export function BannerVerificar({ email }: { email: string }) {
  const [estado, accion] = useActionState(reenviarConfirmacion, ESTADO_INICIAL);
  const enviado = estado.estado === "enviado";
  return (
    <div className="animate-[ca-col_0.45s_var(--ease-fluid)_backwards] rounded-[1.5rem] border border-amber-200/80 bg-amber-50/70 p-5 sm:flex sm:items-center sm:gap-5">
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-amber-950">Confirmá tu mail para terminar</p>
        <p className="mt-1 text-sm leading-relaxed text-amber-900/80" role={enviado || estado.mensaje ? "status" : undefined}>
          {enviado
            ? `Listo: te mandamos el enlace a ${email}. Si no llega, mirá en spam.`
            : estado.mensaje ??
              `Así tus compras con ${email} aparecen solas en tu cuenta. Te mandamos un enlace y listo.`}
        </p>
      </div>
      {enviado ? null : (
        <form action={accion} className="mt-4 shrink-0 sm:mt-0">
          <BotonEnviar variante="secundario" pendiente="Mandando…">
            Mandame el enlace
          </BotonEnviar>
        </form>
      )}
    </div>
  );
}
