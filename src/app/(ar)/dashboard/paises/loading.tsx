import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";
import { Bandeja, TARJETA } from "@/components/panel/ui";

export default function CargandoPaises() {
  return (
    <Esqueleto
      aviso="Cargando tus países"
      className="mx-auto w-full lg:ml-[calc(50%_-_min(35rem,_50vw_-_1.5rem))] lg:w-[min(70rem,_calc(100vw_-_3rem))]"
    >
      <div className="space-y-10 pb-6 sm:space-y-12">
        <header className="space-y-5">
          <Bloque className="h-9 w-36 rounded-full" />
          <div className="min-w-0">
            <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
              Panel privado
            </span>
            <p className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">Tus países</p>
            <Barra className="mt-2.5 h-4 w-80 max-w-full" />
          </div>
          <Bloque className="h-12 w-full rounded-full sm:w-[22rem]" />
        </header>
        <Bandeja>
          <ul className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} className={`${TARJETA} space-y-3 p-4 sm:p-5`}>
                <Barra className="h-3.5 w-24" />
                <Barra className="h-8 w-20" />
                <Barra className="h-3 w-full" />
              </li>
            ))}
          </ul>
        </Bandeja>
        <Bandeja>
          <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className={`${TARJETA} space-y-4 p-5`}>
                <Barra className="h-5 w-32" />
                <Barra className="h-8 w-20" />
                <Bloque className="h-16 w-full rounded-lg" />
              </li>
            ))}
          </ul>
        </Bandeja>
      </div>
    </Esqueleto>
  );
}
