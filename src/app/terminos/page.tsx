import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Términos y condiciones de uso de CalculAR.",
  alternates: { canonical: "/terminos" },
  robots: { index: false },
};

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 text-zinc-600">
      <h1 className="text-2xl font-bold text-zinc-900">Términos de uso</h1>
      <p className="text-xs text-zinc-400">Última actualización: 11 de junio de 2026</p>

      <h2 className="text-lg font-semibold text-zinc-900">Carácter orientativo</h2>
      <p>
        Las calculadoras y los contenidos de CalculAR tienen fines exclusivamente informativos y
        orientativos. Los resultados se basan en los valores oficiales publicados por los
        organismos correspondientes (como ARCA) al momento indicado en cada herramienta, pero
        pueden no contemplar situaciones particulares de cada persona.
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">No es asesoramiento profesional</h2>
      <p>
        Nada de lo publicado en este sitio constituye asesoramiento impositivo, contable, legal ni
        financiero. Antes de tomar decisiones con impacto económico, consultá con un profesional
        matriculado (contador o abogado, según corresponda).
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Limitación de responsabilidad</h2>
      <p>
        Trabajamos para mantener los datos actualizados y verificados contra fuentes oficiales, y
        cada herramienta indica la fecha de vigencia de sus valores. Aun así, no garantizamos la
        ausencia de errores ni nos responsabilizamos por decisiones tomadas en base a los
        resultados de las calculadoras.
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Uso permitido</h2>
      <p>
        Podés usar las herramientas libremente y compartir enlaces al sitio. No está permitido
        reproducir el contenido de forma masiva ni presentarlo como propio.
      </p>
    </article>
  );
}
