import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UltimoCambio } from "@/components/novedades/UltimoCambio";
import { AUTOR, ORGANIZACION } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sobre CalculAR: quién hace el sitio y cómo se verifica",
  description:
    "Quién está detrás de CalculAR, cómo se verifica cada dato contra la fuente oficial y con qué metodología se construyen las calculadoras.",
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
        "Calculadoras gratis para la Argentina: monotributo, aguinaldo, vacaciones, indemnización y plazo fijo, con datos oficiales verificados.",
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
          CalculAR nació de una frustración conocida. Cada vez que en la Argentina necesitás hacer
          una cuenta importante (cuánto pagás de monotributo, cuánto te toca de aguinaldo o de
          indemnización, cuánto rinde un plazo fijo), te encontrás con notas viejas, números sin
          fuente y calculadoras que no explican nada.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué hacemos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Hacemos <strong>calculadoras gratis, claras y sin registro</strong> para las cuentas de
            todos los días en la Argentina: impuestos, sueldos, derechos laborales y ahorro. Cada
            herramienta no te da solo un número: te muestra la fórmula, el paso a paso y la norma
            de la que sale cada valor.
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
              INDEC y del texto vigente de las leyes en Infoleg, nunca de blogs ni de notas de
              prensa. Cuando una ley cambia (como la reforma laboral de la Ley 27.802 de marzo de
              2026), leemos el texto exacto del artículo antes de tocar una fórmula.
            </li>
            <li>
              <strong>Fecha de verificación a la vista.</strong> Cada calculadora muestra cuándo se
              revisaron sus datos y desde cuándo rigen los valores. Si un dato puede quedar viejo
              (una tasa, una escala), lo decimos y mostramos su fecha.
            </li>
            <li>
              <strong>Resultados explicados.</strong> Mostramos la cuenta completa para que puedas
              repetirla, discutirla o llevársela a tu contador. Una calculadora que no te deja ver la
              fórmula no merece tu confianza.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se mantiene al día</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Los datos que cambian seguido (jubilaciones, asignaciones, inflación, canastas del INDEC,
            aportes de casas particulares y la UMA de honorarios) <strong>se revisan solos tres veces
            por día</strong> contra la fuente oficial. Cuando aparece uno nuevo, antes de publicarse
            pasa controles: por ejemplo, que el aumento de las jubilaciones coincida con la inflación
            que fija la ley. Si algo no cierra, no se publica y me llega un aviso.
          </p>
          <p>
            Las escalas de los gremios y los cambios en las leyes los cargo yo, con la circular o el
            texto oficial en la mano. Y cada cambio, venga de donde venga, queda anotado con su fecha y
            su fuente en{" "}
            <Link href="/novedades" className="text-emerald-700 underline">
              Novedades
            </Link>
            .
          </p>
          <UltimoCambio />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué no hacemos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            No damos asesoramiento impositivo, contable, legal ni financiero. Nuestros resultados
            son <strong>orientativos</strong>, y cada caso personal tiene detalles que una
            calculadora no puede ver. Para decisiones importantes, consultá con un profesional
            matriculado. Tampoco pedimos datos personales: calculás y te vas, sin registrarte, y lo
            que cargás no sale de tu navegador. La cuenta es opcional, para quien quiera guardar
            cálculos o tener sus planillas a mano.
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
            No soy contador ni abogado, y por eso el sitio funciona así:{" "}
            <strong>cada resultado viene con la cuenta a la vista y la norma de la que sale</strong>,
            para que lo puedas verificar vos o llevárselo a un profesional. Es lo contrario de
            pedirte que confíes.
          </p>
          <p>
            CalculAR es un <strong>proyecto independiente hecho en Argentina</strong>. No es de
            ningún banco, estudio contable ni organismo público, y eso nos deja decir las cosas como
            son: si un plazo fijo pierde contra la inflación, lo vas a ver en rojo.
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
            . Los errores que me avisan se corrigen primero: que los números estén bien es todo lo
            que tiene este sitio.
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
            </Link>
            : categoría y cuota 2026, con recategorización.
          </li>
          <li>
            •{" "}
            <Link href="/aguinaldo" className="text-emerald-700 underline">
              Aguinaldo
            </Link>
            : el de junio y diciembre, en bruto y en mano.
          </li>
          <li>
            •{" "}
            <Link href="/vacaciones" className="text-emerald-700 underline">
              Vacaciones
            </Link>
            : días por antigüedad y plus vacacional.
          </li>
          <li>
            •{" "}
            <Link href="/indemnizacion" className="text-emerald-700 underline">
              Indemnización por despido
            </Link>
            : liquidación completa con el nuevo art. 245.
          </li>
          <li>
            •{" "}
            <Link href="/plazo-fijo" className="text-emerald-700 underline">
              Plazo fijo
            </Link>
            : interés, TEA, renovaciones y comparación con la inflación.
          </li>
        </ul>
      </section>
    </article>
  );
}
