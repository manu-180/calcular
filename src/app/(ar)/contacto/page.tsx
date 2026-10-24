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
        <a href="mailto:soporte@calcular.ar" className="text-emerald-700 underline">
          soporte@calcular.ar
        </a>{" "}
        y te respondemos lo antes posible.
      </p>
      <p>
        Si querés una copia de tus datos o que borremos tu cuenta, escribinos desde el mail de la
        cuenta y lo resolvemos. El detalle está en la{" "}
        <a href="/privacidad#derechos" className="text-emerald-700 underline">
          política de privacidad
        </a>
        .
      </p>
      <p className="text-sm text-zinc-500">
        Si tu consulta es sobre tus impuestos en particular, hablá con un contador matriculado:
        nosotros hacemos herramientas, no damos asesoramiento profesional.
      </p>
    </article>
  );
}
