import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Términos y condiciones de uso de CalculAR: calculadoras, cuentas y compras de planillas.",
  alternates: { canonical: "/terminos" },
  robots: { index: false },
};

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-900">{titulo}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-pretty text-zinc-600">{children}</div>
    </section>
  );
}

const enlace = "font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-500";

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-3">
        <h1 className="text-titular font-bold text-zinc-900">Términos de uso</h1>
        <p className="text-xs text-zinc-500">Última actualización: 30 de septiembre de 2026</p>
      </header>

      <Seccion titulo="Carácter orientativo">
        <p>
          Las calculadoras y los contenidos de CalculAR tienen fines exclusivamente informativos y
          orientativos. Los resultados se basan en los valores oficiales publicados por los organismos
          correspondientes (como ARCA) al momento indicado en cada herramienta, pero pueden no contemplar
          situaciones particulares de cada persona.
        </p>
      </Seccion>

      <Seccion titulo="No es asesoramiento profesional">
        <p>
          Nada de lo publicado en este sitio constituye asesoramiento impositivo, contable, legal ni
          financiero. Antes de tomar decisiones con impacto económico, consultá con un profesional
          matriculado (contador o abogado, según corresponda).
        </p>
      </Seccion>

      <Seccion titulo="Limitación de responsabilidad">
        <p>
          Trabajamos para mantener los datos actualizados y verificados contra fuentes oficiales, y cada
          herramienta indica la fecha de vigencia de sus valores. Aun así, no garantizamos la ausencia de
          errores ni nos responsabilizamos por decisiones tomadas en base a los resultados de las
          calculadoras.
        </p>
      </Seccion>

      <Seccion titulo="Tu cuenta">
        <p>
          Crear una cuenta es opcional. Es personal: cuidá tu contraseña y no la compartas. Podemos
          suspender una cuenta que se use para abusar del sitio o de otras personas. Si querés que la
          borremos, escribinos y lo hacemos; el detalle de qué se borra está en la{" "}
          <Link href="/privacidad#derechos" className={enlace}>
            política de privacidad
          </Link>
          .
        </p>
      </Seccion>

      <Seccion titulo="Compras de planillas">
        <p>
          Las planillas se pagan una sola vez, a través de MercadoPago, y se entregan por mail al que
          indicaste al comprar (y en tu cuenta, si tenés una con ese mail confirmado). Incluyen las
          actualizaciones del año que figura en su nombre. Si no te sirve, tenés 7 días desde la compra
          para pedirnos la devolución escribiéndonos.
        </p>
      </Seccion>

      <Seccion titulo="Uso permitido">
        <p>
          Podés usar las herramientas libremente y compartir enlaces al sitio. No está permitido
          reproducir el contenido de forma masiva ni presentarlo como propio.
        </p>
      </Seccion>

      <Seccion titulo="Contacto">
        <p>
          Por cualquier consulta sobre estos términos, escribinos desde la{" "}
          <Link href="/contacto" className={enlace}>
            página de contacto
          </Link>
          .
        </p>
      </Seccion>
    </article>
  );
}
