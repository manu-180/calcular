import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";
import { Bandeja, TARJETA } from "@/components/panel/ui";

function TituloSeccion({ ancho }: { ancho: string }) {
  return (
    <div className="mb-3 space-y-2 px-1">
      <Barra className={`h-5 ${ancho}`} />
      <Barra className="h-3.5 w-72 max-w-full" />
    </div>
  );
}

export default function CargandoPanel() {
  return (
    <Esqueleto
      aviso="Cargando el panel"
      className="mx-auto w-full lg:ml-[calc(50%_-_min(35rem,_50vw_-_1.5rem))] lg:w-[min(70rem,_calc(100vw_-_3rem))]"
    >
      <div className="space-y-10 pb-6 sm:space-y-12">
        <header className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
            <div className="min-w-0">
              <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                Panel privado
              </span>
              <p className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-zinc-900 sm:text-4xl">
                Cómo viene calcular.ar
              </p>
              <Barra className="mt-2.5 h-4 w-52" />
            </div>
            <Bloque className="h-10 w-48 rounded-full" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Bloque className="h-12 w-full rounded-full sm:w-[22rem]" />
            <Bloque className="h-10 w-56 rounded-full" />
          </div>
        </header>

        <section>
          <TituloSeccion ancho="w-40" />
          <Bandeja>
            <div className="space-y-1.5">
              <div className={`${TARJETA} h-20`} />
              <div className={`${TARJETA} h-20`} />
            </div>
          </Bandeja>
        </section>

        <section>
          <TituloSeccion ancho="w-32" />
          <Bandeja>
            <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i} className={`${TARJETA} space-y-3 p-4 sm:p-5`}>
                  <Barra className="h-3.5 w-20" />
                  <Barra className="h-8 w-24" />
                  <Bloque className="h-8 w-full rounded-lg" />
                </li>
              ))}
            </ul>
          </Bandeja>
        </section>

        <section>
          <TituloSeccion ancho="w-48" />
          <Bandeja>
            <div className={`${TARJETA} h-64`} />
          </Bandeja>
        </section>
      </div>
    </Esqueleto>
  );
}
