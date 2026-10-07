import type { ReactNode } from "react";
import { Placa } from "@/components/cuenta/MarcoAuth";

export function Seccion({
  id,
  titulo,
  bajada,
  children,
  className = "",
  orden,
  entrada = true,
}: {
  id: string;
  titulo: string;
  bajada?: string;
  children: ReactNode;
  className?: string;
  orden: number;
  entrada?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`scroll-mt-24 ${entrada ? "animate-[ca-col_0.55s_var(--ease-fluid)_backwards]" : ""} ${className}`}
      style={entrada ? { animationDelay: `${orden * 60}ms` } : undefined}
    >
      <Placa>
        <div className="p-5 sm:p-7">
          <h2 id={`${id}-titulo`} className="text-lg font-semibold tracking-tight text-zinc-900">
            {titulo}
          </h2>
          {bajada ? <p className="mt-1 text-sm text-zinc-500">{bajada}</p> : null}
          <div className="mt-5">{children}</div>
        </div>
      </Placa>
    </section>
  );
}
