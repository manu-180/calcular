import { Etiqueta, Placa } from "@/components/cuenta/MarcoAuth";
import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";
import { Seccion } from "@/components/cuenta/Seccion";

function FilaPlanilla() {
  return (
    <div className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
      <Bloque className="size-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2.5 pt-1">
        <Barra className="h-4 w-44" />
        <Barra className="h-3 w-28" />
        <Barra className="h-3 w-56 max-w-full" />
      </div>
    </div>
  );
}

export default function CargandoCuenta() {
  return (
    <Esqueleto aviso="Cargando tu cuenta" className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header>
        <Etiqueta>Mi cuenta</Etiqueta>
        <Barra className="mt-4 h-9 w-56 sm:h-11 sm:w-72" />
        <Barra className="mt-3 h-4 w-48" />
      </header>

      <Seccion id="planillas-cargando" titulo="Mis compras" bajada="Las planillas siempre en su última versión, con las escalas al día." orden={1} entrada={false}>
        <div className="divide-y divide-zinc-100">
          <FilaPlanilla />
          <FilaPlanilla />
        </div>
      </Seccion>

      <Placa>
        <div className="p-5 sm:p-7">
          <p className="mb-3 text-lg font-semibold tracking-tight text-zinc-900">Mis cálculos</p>
          <div className="space-y-2.5">
            <Bloque className="h-[5.5rem] w-full" />
            <Bloque className="h-[5.5rem] w-full" />
          </div>
        </div>
      </Placa>

      <div className="grid gap-6 md:grid-cols-5">
        <Seccion id="perfil-cargando" titulo="Tu perfil" className="md:col-span-3" orden={3} entrada={false}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Barra className="h-4 w-36" />
              <Bloque className="h-[3.125rem] w-full rounded-xl" />
            </div>
            <div className="space-y-3">
              <Barra className="h-4 w-48" />
              <div className="flex flex-wrap gap-2">
                <Bloque className="h-11 w-52 rounded-full" />
                <Bloque className="h-11 w-44 rounded-full" />
                <Bloque className="h-11 w-40 rounded-full" />
              </div>
            </div>
            <Bloque className="h-11 w-40 rounded-full" />
          </div>
        </Seccion>
        <Seccion id="seguridad-cargando" titulo="Seguridad" className="md:col-span-2" orden={4} entrada={false}>
          <div className="flex flex-col gap-4">
            <Barra className="h-4 w-full" />
            <Bloque className="h-11 w-full rounded-full" />
            <div className="border-t border-zinc-100 pt-4">
              <Bloque className="h-11 w-full rounded-full" />
            </div>
          </div>
        </Seccion>
      </div>
    </Esqueleto>
  );
}
