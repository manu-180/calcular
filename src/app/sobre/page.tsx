import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { AUTOR, ORGANIZACION } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sobre CalculAR: quiénes somos y cómo trabajamos",
  description:
    "CalculAR es un proyecto independiente argentino: calculadoras gratuitas de impuestos, sueldos y finanzas construidas solo con fuentes oficiales, con metodología abierta y fecha de verificación visible.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre CalculAR",
    url: "https://calcular.ar/sobre",
    inLanguage: "es-AR",
    mainEntity: {
      "@type": "WebSite",
      name: "CalculAR",
      url: "https://calcular.ar",
      description:
        "Calculadoras gratuitas para la Argentina: monotributo, aguinaldo, vacaciones, indemnización y plazo fijo, con datos oficiales verificados.",
      author: AUTOR,
      publisher: ORGANIZACION,
    },
  };

  return (
    <article className="mx-auto max-w-2xl space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Sobre CalculAR</h1>
        <p className="text-zinc-600">
          CalculAR existe por una frustración conocida: cada vez que un argentino necesita hacer
          una cuenta importante — cuánto va a pagar de monotributo, cuánto le corresponde de
          aguinaldo o de indemnización, cuánto rinde un plazo fijo — se encuentra con notas
          desactualizadas, números sin fuente y calculadoras que no explican nada.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué hacemos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Construimos <strong>calculadoras gratuitas, claras y sin registro</strong> para las
            cuentas que todos hacemos en la Argentina: impuestos, sueldos, derechos laborales y
            ahorro. Cada herramienta no te da solo un número: te muestra la fórmula, el paso a
            paso y la norma de la que sale cada valor.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo trabajamos: nuestra metodología</h2>
        <div className="space-y-3 text-zinc-600">
          <p>Tres reglas que no negociamos:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Solo fuentes oficiales.</strong> Los datos salen de ARCA, del BCRA, del
              INDEC y del texto vigente de las leyes en Infoleg — nunca de blogs ni de notas de
              prensa. Cuando una ley cambia (como la reforma laboral de la Ley 27.802 de marzo de
              2026), verificamos el texto literal del artículo antes de tocar una fórmula.
            </li>
            <li>
              <strong>Fecha de verificación visible.</strong> Cada calculadora muestra cuándo se
              verificaron sus datos y desde cuándo rigen los valores. Si un dato puede quedar
              viejo (una tasa, una escala), lo decimos y mostramos su fecha.
            </li>
            <li>
              <strong>Resultados explicados.</strong> Mostramos la cuenta completa para que puedas
              repetirla, cuestionarla o llevársela a tu contador. Una calculadora en la que no se
              puede ver la fórmula no merece tu confianza.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué no hacemos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            No damos asesoramiento impositivo, contable, legal ni financiero: nuestros resultados
            son <strong>orientativos</strong> y cada situación personal tiene matices que una
            calculadora no puede capturar. Para decisiones importantes, consultá con un
            profesional matriculado. Tampoco pedimos datos personales: calculás y te vas, sin
            registro y sin guardar lo que ingresás.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quién está detrás</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            CalculAR lo hace <strong>Manuel Navarro</strong>, desarrollador argentino. Yo escribo
            las calculadoras, busco cada dato en el documento oficial que lo fija y pongo la fecha
            en que lo verifiqué. Si un número está mal, el responsable tiene nombre y respondo el
            mail.
          </p>
          <p>
            No soy contador ni abogado, y por eso el sitio funciona como funciona:{" "}
            <strong>cada resultado viene con la cuenta a la vista y la norma de la que sale</strong>,
            para que puedas verificarlo vos o llevárselo a un profesional. Es lo contrario de
            pedirte que confíes.
          </p>
          <p>
            CalculAR es un <strong>proyecto independiente hecho en Argentina</strong>. No pertenece
            a ningún banco, estudio contable ni organismo público, y eso permite decir las cosas
            como son: si un plazo fijo pierde contra la inflación, lo vas a ver en rojo.
          </p>
          <p>
            ¿Encontraste un error o querés proponer una calculadora? Escribime a{" "}
            <a href="mailto:manunv97@gmail.com" className="text-emerald-700 underline">
              manunv97@gmail.com
            </a>{" "}
            o desde la{" "}
            <Link href="/contacto" className="text-emerald-700 underline">
              página de contacto
            </Link>
            . Los errores reportados se corrigen con prioridad: la exactitud es todo el capital de
            este sitio.
          </p>
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Nuestras calculadoras</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <Link href="/monotributo" className="text-emerald-700 underline">
              Monotributo
            </Link>{" "}
            — categoría y cuota 2026, con recategorización.
          </li>
          <li>
            •{" "}
            <Link href="/aguinaldo" className="text-emerald-700 underline">
              Aguinaldo
            </Link>{" "}
            — SAC de junio y diciembre, bruto y en mano.
          </li>
          <li>
            •{" "}
            <Link href="/vacaciones" className="text-emerald-700 underline">
              Vacaciones
            </Link>{" "}
            — días por antigüedad y plus vacacional.
          </li>
          <li>
            •{" "}
            <Link href="/indemnizacion" className="text-emerald-700 underline">
              Indemnización por despido
            </Link>{" "}
            — liquidación completa con el nuevo art. 245.
          </li>
          <li>
            •{" "}
            <Link href="/plazo-fijo" className="text-emerald-700 underline">
              Plazo fijo
            </Link>{" "}
            — interés, TEA, renovaciones y comparación contra la inflación.
          </li>
        </ul>
      </section>
    </article>
  );
}
