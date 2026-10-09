import { Etiqueta, Placa } from "@/components/cuenta/MarcoAuth";
import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";
import { Seccion } from "@/components/cuenta/Seccion";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe } from "@/lib/cuenta/textos";

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

export function CargandoCuenta({ sitio }: { sitio: SitioCuenta }) {
  const textos = textosDe(sitio);
  const t = textos.cuenta;
  return (
    <Esqueleto aviso={t.cargando} className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header>
        <Etiqueta>{t.etiqueta}</Etiqueta>
        <Barra className="mt-4 h-9 w-56 sm:h-11 sm:w-72" />
        <Barra className="mt-3 h-4 w-48" />
      </header>

      <Seccion id="planillas-cargando" titulo={t.compras} bajada={t.comprasBajada} orden={1} entrada={false}>
        <div className="divide-y divide-zinc-100">
          <FilaPlanilla />
          <FilaPlanilla />
        </div>
      </Seccion>

      <Placa>
        <div className="p-5 sm:p-7">
          <p className="mb-3 text-lg font-semibold tracking-tight text-zinc-900">{textos.calculos.titulo}</p>
          <div className="space-y-2.5">
            <Bloque className="h-[5.5rem] w-full" />
            <Bloque className="h-[5.5rem] w-full" />
          </div>
        </div>
      </Placa>

      <div className="grid gap-6 md:grid-cols-5">
        <Seccion id="perfil-cargando" titulo={t.perfil} className="md:col-span-3" orden={3} entrada={false}>
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
        <Seccion id="seguridad-cargando" titulo={t.seguridad} className="md:col-span-2" orden={4} entrada={false}>
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

function CampoVacio({ conAyuda = false }: { conAyuda?: boolean }) {
  return (
    <div className="space-y-2">
      <Barra className="h-4 w-24" />
      <Bloque className="h-[3.125rem] w-full rounded-xl" />
      {conAyuda ? <Barra className="h-3 w-4/5" /> : null}
    </div>
  );
}

export function CargandoClave({ sitio }: { sitio: SitioCuenta }) {
  const textos = textosDe(sitio);
  return (
    <Esqueleto aviso={textos.cuenta.cargandoCorto} className="mx-auto w-full max-w-[27rem] pb-6 sm:pt-6">
      <header>
        <Etiqueta>{textos.clave.etiqueta}</Etiqueta>
        <Barra className="mt-4 h-8 w-64 sm:h-9" />
        <Barra className="mt-3 h-4 w-full" />
        <Barra className="mt-2 h-4 w-2/3" />
      </header>
      <Placa className="mt-7">
        <div className="space-y-5 p-5 sm:p-7">
          <CampoVacio conAyuda />
          <CampoVacio />
          <Bloque className="h-12 w-full rounded-full" />
        </div>
      </Placa>
      <Barra className="mx-auto mt-6 h-4 w-36" />
    </Esqueleto>
  );
}

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

export function CargandoOpiniones({ sitio }: { sitio: SitioCuenta }) {
  const t = textosDe(sitio).opiniones;
  return (
    <Esqueleto aviso={t.cargando} className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header>
        <Barra className="mb-5 h-4 w-24" />
        <div>
          <Etiqueta>{t.etiqueta}</Etiqueta>
        </div>
        <Barra className="mt-4 h-9 w-72 max-w-full sm:h-11 sm:w-[26rem]" />
        <Barra className="mt-3 h-4 w-full max-w-xl" />
        <Barra className="mt-2 h-4 w-3/4 max-w-md" />
      </header>

      <Seccion id="escribir-cargando" titulo={t.escribir} orden={1} entrada={false}>
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

      <Seccion id="historial-cargando" titulo={t.historial} bajada={t.historialBajada} orden={2} entrada={false}>
        <div className="divide-y divide-zinc-100">
          <FilaOpinion />
          <FilaOpinion />
        </div>
      </Seccion>
    </Esqueleto>
  );
}
