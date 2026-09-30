"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { IcoAlerta, IcoRefrescar } from "./iconos";
import { Bandeja, TARJETA } from "./ui";

export default function PanelError({ detalle }: { detalle: string }) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  return (
    <div className="mx-auto max-w-xl py-10">
      <Bandeja>
        <div role="alert" className={`${TARJETA} px-6 py-8 text-center sm:px-10`}>
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-700/15">
            <IcoAlerta className="size-5" />
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900">No pude traer los números</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
            Probá de nuevo en un minuto. Si sigue igual, copiá el detalle técnico de abajo y pasámelo.
          </p>
          <button
            type="button"
            disabled={pendiente}
            onClick={() => iniciar(() => router.refresh())}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.16),0_8px_20px_-8px_rgba(0,0,0,0.3)] transition-[transform,background-color] duration-200 ease-fluid hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-70"
          >
            <IcoRefrescar className={`size-4 ${pendiente ? "animate-spin" : ""}`} />
            {pendiente ? "Probando…" : "Probar de nuevo"}
          </button>
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-center text-xs font-medium text-zinc-500 hover:text-zinc-700">
              Detalle técnico
            </summary>
            <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-zinc-50 p-3 font-mono text-xs text-zinc-700 ring-1 ring-inset ring-zinc-900/[0.06]">
              {detalle}
            </pre>
          </details>
        </div>
      </Bandeja>
    </div>
  );
}
