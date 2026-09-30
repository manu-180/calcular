"use client";

import { useActionState } from "react";
import { guardarPerfil } from "@/lib/auth/acciones";
import { ESTADO_INICIAL } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, Casilla } from "@/components/cuenta/Campos";

const OPCIONES: { valor: string; texto: string }[] = [
  { valor: "empleado", texto: "Trabajo en relación de dependencia" },
  { valor: "empleador", texto: "Tengo empleados a cargo" },
  { valor: "monotributista", texto: "Soy monotributista" },
  { valor: "contador", texto: "Soy contador o contadora" },
  { valor: "estudio", texto: "Trabajo en un estudio" },
  { valor: "otro", texto: "Otra cosa" },
];

export function FormPerfil({
  nombre,
  perfil,
  novedades,
}: {
  nombre: string | null;
  perfil: string | null;
  novedades: boolean;
}) {
  const [estado, accion] = useActionState(guardarPerfil, ESTADO_INICIAL);
  const v = estado.valores;
  const nombreActual = typeof v?.nombre === "string" ? v.nombre : (nombre ?? "");
  const perfilActual = v && "perfil" in v ? (v.perfil as string | null) : perfil;
  const novedadesActual = typeof v?.novedades === "boolean" ? v.novedades : novedades;

  return (
    <form action={accion} className="space-y-6">
      <Campo
        etiqueta="¿Cómo te llamamos?"
        name="nombre"
        type="text"
        autoComplete="given-name"
        maxLength={80}
        placeholder="Tu nombre"
        defaultValue={nombreActual}
        ayuda="Opcional. Lo usamos sólo para saludarte."
      />
      <fieldset>
        <legend className="text-sm font-medium text-zinc-800">¿Para qué usás CalculAR?</legend>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">Nos ayuda a priorizar las calculadoras que más te sirven.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {OPCIONES.map((o) => (
            <label key={o.valor} className="cursor-pointer">
              <input type="radio" name="perfil" value={o.valor} defaultChecked={perfilActual === o.valor} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border border-zinc-200 bg-white px-4 text-sm text-zinc-700 transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-300 active:scale-[0.98] peer-checked:border-emerald-600/40 peer-checked:bg-emerald-50 peer-checked:font-medium peer-checked:text-emerald-900 peer-focus-visible:shadow-[var(--ca-ring)]">
                {o.texto}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Casilla name="novedades" defaultChecked={novedadesActual}>
        Quiero recibir por mail las novedades de CalculAR.
      </Casilla>
      <div className="flex flex-wrap items-center gap-3">
        <BotonEnviar variante="secundario" pendiente="Guardando…">
          Guardar cambios
        </BotonEnviar>
        {estado.estado === "ok" ? (
          <p role="status" className="animate-[ca-col_0.3s_var(--ease-fluid)_backwards] text-sm font-medium text-emerald-700">
            {estado.mensaje}
          </p>
        ) : null}
      </div>
      {estado.estado === "error" && estado.mensaje ? <Aviso tono="error">{estado.mensaje}</Aviso> : null}
    </form>
  );
}
