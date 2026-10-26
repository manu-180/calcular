import Link from "next/link";
import type { ReactNode } from "react";
import { BuscadorHero } from "@/components/buscador/BuscadorHero";
import { MAS_USADAS, paginaDeRuta } from "@/data/navegacion";

// Pantalla común del 404 y de los errores de calcular.ar. Sirve en server y client components
// (error.tsx es client): no lee nada del pedido, sólo la navegación estática.

const ATAJOS = MAS_USADAS.map((h) => paginaDeRuta(h)).filter((p) => p !== undefined);

function etiquetaCorta(titulo: string): string {
  const t = titulo.replace(/^Calculadora de /, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function PantallaDeError({
  visor,
  resultado,
  titulo,
  texto,
  acciones,
}: {
  visor: string;
  resultado: string;
  titulo: ReactNode;
  texto: string;
  acciones?: ReactNode;
}) {
  return (
    <section className="relative -mx-4 -mt-8 overflow-hidden px-4 pb-12 pt-10 sm:mx-0 sm:mt-0 sm:rounded-[2rem] sm:border sm:border-zinc-900/[0.06] sm:bg-white/35 sm:px-10 sm:pb-14 sm:pt-14">
      <div aria-hidden className="ca-cuadricula pointer-events-none absolute inset-0 -z-10" />

      <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <h1 className="text-display font-bold text-balance text-zinc-950">{titulo}</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-pretty text-zinc-600 sm:text-[17px]">{texto}</p>
          {acciones ? <div className="mt-7 flex flex-wrap items-center gap-3">{acciones}</div> : null}
        </div>

        <div aria-hidden className="ca-visor-error max-sm:order-first">
          <span className="ca-visor-error-operacion">{visor}</span>
          <span className="ca-visor-error-resultado">{resultado}</span>
        </div>
      </div>

      <div className="mt-12 max-w-2xl border-t border-zinc-900/[0.07] pt-8">
        <p className="mb-3 text-sm font-semibold text-zinc-800">Buscá lo que querías calcular</p>
        <BuscadorHero />
        <p className="mb-2.5 mt-6 text-xs font-medium text-zinc-500">Lo más buscado</p>
        <ul className="flex flex-wrap gap-2">
          {ATAJOS.map((p, i) => (
            <li key={p.href} className={i >= 6 ? "max-sm:hidden" : undefined}>
              <Link href={p.href} className="ca-atajo">
                {etiquetaCorta(p.titulo)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BotonInicio({ principal = true }: { principal?: boolean }) {
  return (
    <Link href="/" className={principal ? "ca-error-boton ca-error-boton-principal" : "ca-error-boton"}>
      Ir al inicio
    </Link>
  );
}

export function NoEncontradaAR() {
  return (
    <PantallaDeError
      visor="calcular.ar / ?"
      resultado="404"
      titulo={
        <>
          Esta cuenta <span className="ca-igual">no da</span>
        </>
      }
      texto="La página que buscás no existe o cambió de dirección. Puede que el enlace tenga un error de tipeo o que la calculadora se haya mudado. Buscala acá abajo o volvé al inicio."
      acciones={<BotonInicio />}
    />
  );
}
