import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos: sugerencias, errores o ideas para nuevas calculadoras.",
  alternates: { canonical: "/contacto" },
  robots: { index: false },
};

export default function ContactoPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 text-zinc-600">
      <h1 className="text-2xl font-bold text-zinc-900">Contacto</h1>
      <p>
        ¿Encontraste un error en algún cálculo? ¿Tenés una idea para una nueva calculadora? ¿Algún
        dato quedó desactualizado? Nos interesa saberlo.
      </p>
      <p>
        Escribinos a{" "}
        <a href="mailto:manunv97@gmail.com" className="text-emerald-700 underline">
          manunv97@gmail.com
        </a>{" "}
        y te respondemos a la brevedad.
      </p>
      <p className="text-sm text-zinc-500">
        Si tu consulta es sobre tu situación impositiva particular, te recomendamos hablar con un
        contador matriculado: nosotros hacemos herramientas, no asesoramiento profesional.
      </p>
    </article>
  );
}
