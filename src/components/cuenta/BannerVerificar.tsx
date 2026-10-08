"use client";

import { useActionState } from "react";
import { reenviarConfirmacion } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { BotonEnviar } from "@/components/cuenta/Campos";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function BannerVerificar({ email }: { email: string }) {
  const [estado, accion] = useActionState(reenviarConfirmacion, ESTADO_INICIAL);
  const t = useTextos().verificar;
  const enviado = estado.estado === "enviado";
  return (
    <div className="animate-[ca-col_0.45s_var(--ease-fluid)_backwards] rounded-[1.5rem] border border-amber-200/80 bg-amber-50/70 p-5 sm:flex sm:items-center sm:gap-5">
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-amber-950">{t.titulo}</p>
        <p className="mt-1 text-sm leading-relaxed text-amber-900/80" role={enviado || estado.mensaje ? "status" : undefined}>
          {enviado ? t.enviado(email) : (estado.mensaje ?? t.pedido(email))}
        </p>
      </div>
      {enviado ? null : (
        <form action={accion} className="mt-4 shrink-0 sm:mt-0">
          <BotonEnviar variante="secundario" pendiente={t.mandando}>
            {t.boton}
          </BotonEnviar>
        </form>
      )}
    </div>
  );
}
