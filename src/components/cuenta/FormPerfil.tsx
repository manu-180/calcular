"use client";

import { useActionState, useOptimistic } from "react";
import { guardarPerfil } from "@/lib/auth/acciones";
import { ESTADO_INICIAL, type EstadoForm } from "@/lib/auth/estado";
import { Aviso, BotonEnviar, Campo, Casilla } from "@/components/cuenta/Campos";
import { useTextos } from "@/components/cuenta/SitioCuenta";

export function FormPerfil({
  nombre,
  perfil,
  novedades,
}: {
  nombre: string | null;
  perfil: string | null;
  novedades: boolean;
}) {
  const textos = useTextos();
  const t = textos.perfil;
  const [real, accion] = useActionState(guardarPerfil, ESTADO_INICIAL);
  // Se da por guardado al tocar el botón; si el servidor dice que no, el estado real (con el error
  // y los valores que mandó) reemplaza al adelantado cuando termina la acción.
  const [estado, adelantar] = useOptimistic(
    real,
    (_: EstadoForm, valores: NonNullable<EstadoForm["valores"]>): EstadoForm => ({
      estado: "ok",
      mensaje: textos.acciones.perfilOk,
      valores,
    }),
  );
  const v = estado.valores;
  const nombreActual = typeof v?.nombre === "string" ? v.nombre : (nombre ?? "");
  const perfilActual = v && "perfil" in v ? (v.perfil as string | null) : perfil;
  const novedadesActual = typeof v?.novedades === "boolean" ? v.novedades : novedades;

  function enviar(fd: FormData) {
    const elegido = fd.get("perfil");
    adelantar({
      nombre: String(fd.get("nombre") ?? "").trim(),
      perfil: typeof elegido === "string" && elegido ? elegido : null,
      novedades: fd.get("novedades") === "si",
    });
    accion(fd);
  }

  return (
    <form action={enviar} className="space-y-6">
      <Campo
        etiqueta={t.nombre}
        name="nombre"
        type="text"
        autoComplete="given-name"
        maxLength={80}
        placeholder={t.nombrePista}
        defaultValue={nombreActual}
        ayuda={t.nombreAyuda}
      />
      <fieldset>
        <legend className="text-sm font-medium text-zinc-800">{t.paraQue}</legend>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{t.paraQueAyuda}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.opciones.map((o) => (
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
        {t.novedades}
      </Casilla>
      <div className="flex flex-wrap items-center gap-3">
        <BotonEnviar variante="secundario" pendiente={t.guardando} optimista>
          {t.guardar}
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
