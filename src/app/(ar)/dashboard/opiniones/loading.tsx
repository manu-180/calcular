import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";

function TarjetaVacia() {
  return (
    <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-inset ring-zinc-900/[0.055]">
      <div className="space-y-3 rounded-[1.375rem] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Bloque className="h-6 w-28 rounded-full" />
          <Barra className="h-3 w-14" />
          <Barra className="ml-auto h-3 w-20" />
        </div>
        <Barra className="h-4 w-full" />
        <Barra className="h-4 w-3/5" />
        <Barra className="h-3 w-44" />
        <div className="flex gap-2 border-t border-zinc-100 pt-4">
          <Bloque className="h-10 w-32 rounded-full" />
          <Bloque className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function CargandoOpinionesAdmin() {
  return (
    <Esqueleto aviso="Cargando las opiniones" className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="space-y-5">
        <Barra className="h-4 w-16" />
        <div>
          <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
            Panel privado
          </span>
          <p className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">Opiniones</p>
          <Barra className="mt-2.5 h-4 w-64" />
        </div>
        <Bloque className="h-11 w-[22rem] max-w-full rounded-full" />
      </header>
      <div className="space-y-3">
        <TarjetaVacia />
        <TarjetaVacia />
      </div>
    </Esqueleto>
  );
}
