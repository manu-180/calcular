import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de CalculAR: qué datos se recopilan y cómo se usan.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <article className="prose-sm mx-auto max-w-2xl space-y-4 text-zinc-600">
      <h1 className="text-2xl font-bold text-zinc-900">Política de privacidad</h1>
      <p className="text-xs text-zinc-400">Última actualización: 11 de junio de 2026</p>

      <h2 className="text-lg font-semibold text-zinc-900">Qué datos recopilamos</h2>
      <p>
        CalculAR no requiere registro ni solicita datos personales para usar sus calculadoras. Los
        valores que ingresás en las herramientas (por ejemplo, tu facturación) se procesan
        únicamente en tu navegador: no se envían ni se guardan en nuestros servidores.
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Métricas de uso</h2>
      <p>
        Usamos herramientas de analítica web (como Vercel Analytics) que recopilan información
        agregada y anónima sobre las visitas: páginas vistas, país de origen, tipo de dispositivo.
        Estos datos no permiten identificarte y los usamos solo para mejorar el sitio.
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Publicidad y cookies</h2>
      <p>
        En el futuro este sitio puede mostrar anuncios de terceros (por ejemplo, Google AdSense).
        Esos proveedores pueden usar cookies para mostrar anuncios relevantes según visitas
        anteriores a este u otros sitios. Podés desactivar la publicidad personalizada en la{" "}
        <a
          href="https://myadcenter.google.com/"
          rel="nofollow noopener"
          target="_blank"
          className="text-emerald-700 underline"
        >
          configuración de anuncios de Google
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Enlaces externos</h2>
      <p>
        El sitio enlaza a fuentes oficiales (como ARCA) y otros sitios de terceros. No somos
        responsables por las prácticas de privacidad de esos sitios.
      </p>

      <h2 className="text-lg font-semibold text-zinc-900">Contacto</h2>
      <p>
        Por cualquier consulta sobre esta política, escribinos a través de la{" "}
        <a href="/contacto" className="text-emerald-700 underline">
          página de contacto
        </a>
        .
      </p>
    </article>
  );
}
