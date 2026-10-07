import { Etiqueta } from "@/components/cuenta/MarcoAuth";
import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";
import { Seccion } from "@/components/cuenta/Seccion";

function FilaOpinion() {
  return (
    <div className="space-y-3 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <Bloque className="h-6 w-24 rounded-full" />
        <Barra className="h-3 w-16" />
        <Barra className="ml-auto h-3 w-20" />
      </div>
      <Barra className="h-4 w-full" />
      <Barra className="h-4 w-2/3" />
    </div>
  );
}

export default function CargandoOpiniones() {
  return (
    <Esqueleto aviso="Cargando tus opiniones" className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header>
        <Barra className="mb-5 h-4 w-24" />
        <div>
          <Etiqueta>Opiniones</Etiqueta>
        </div>
        <Barra className="mt-4 h-9 w-72 max-w-full sm:h-11 sm:w-[26rem]" />
        <Barra className="mt-3 h-4 w-full max-w-xl" />
        <Barra className="mt-2 h-4 w-3/4 max-w-md" />
      </header>

      <Seccion id="escribir-cargando" titulo="Contanos" orden={1} entrada={false}>
        <div className="space-y-6">
          <div>
            <Barra className="h-4 w-32" />
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              <Bloque className="h-[5.75rem] sm:h-[6.5rem]" />
              <Bloque className="h-[5.75rem] sm:h-[6.5rem]" />
              <Bloque className="h-[5.75rem] sm:h-[6.5rem]" />
            </div>
          </div>
          <div className="space-y-2">
            <Barra className="h-4 w-24" />
            <Bloque className="h-36 w-full rounded-xl" />
            <Barra className="h-3 w-4/5" />
          </div>
          <Bloque className="h-12 w-full rounded-full sm:max-w-xs" />
        </div>
      </Seccion>

      <Seccion id="historial-cargando" titulo="Lo que nos mandaste" bajada="Acá ves si ya la leímos." orden={2} entrada={false}>
        <div className="divide-y divide-zinc-100">
          <FilaOpinion />
          <FilaOpinion />
        </div>
      </Seccion>
    </Esqueleto>
  );
}
