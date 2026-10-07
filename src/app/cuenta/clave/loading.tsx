import { Etiqueta, Placa } from "@/components/cuenta/MarcoAuth";
import { Barra, Bloque, Esqueleto } from "@/components/cuenta/Esqueleto";

function CampoVacio({ conAyuda = false }: { conAyuda?: boolean }) {
  return (
    <div className="space-y-2">
      <Barra className="h-4 w-24" />
      <Bloque className="h-[3.125rem] w-full rounded-xl" />
      {conAyuda ? <Barra className="h-3 w-4/5" /> : null}
    </div>
  );
}

export default function CargandoClave() {
  return (
    <Esqueleto aviso="Cargando" className="mx-auto w-full max-w-[27rem] pb-6 sm:pt-6">
      <header>
        <Etiqueta>Seguridad</Etiqueta>
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
