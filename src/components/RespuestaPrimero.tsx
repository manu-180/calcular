import type { ReactNode } from "react";

// Bloque "respuesta-primero": la respuesta directa a la intención de la página,
// en 50-120 palabras, arriba de todo el contenido largo. Es lo que los motores de
// IA (ChatGPT Search, Perplexity, Gemini, Copilot) extraen y citan, y lo que el
// usuario apurado lee primero. Reglas: autosuficiente (responde sin obligar a
// seguir leyendo), con el número/veredicto concreto en negrita, sin relleno.
export function RespuestaPrimero({
  children,
  actualizado,
}: {
  children: ReactNode;
  actualizado?: string;
}) {
  return (
    <aside
      aria-label="Respuesta rápida"
      className="relative overflow-hidden rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-white p-5 sm:p-6"
    >
      {/* Filete lateral: marca el bloque como "la respuesta" sin gritar con color de fondo */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600"
      />
      <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.09em] text-emerald-700">
        <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
        La respuesta corta
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-zinc-700 [&_a:hover]:decoration-emerald-500 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-300 [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-zinc-900">
        {children}
      </div>
      {actualizado ? (
        <p className="mt-4 border-t border-emerald-200/60 pt-3 text-xs text-emerald-800/70">
          Actualizado: <strong className="font-medium">{actualizado}</strong>
        </p>
      ) : null}
    </aside>
  );
}
