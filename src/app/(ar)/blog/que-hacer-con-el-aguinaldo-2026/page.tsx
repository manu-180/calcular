import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema } from "@/lib/schema";
import { TNA_FALLBACK, INFLACION_DEFAULT } from "@/data/plazofijo";

export const metadata: Metadata = {
  title: "Qué hacer con el aguinaldo 2026: opciones con números",
  description:
    "Pagar deudas caras, plazo fijo tradicional o UVA, dólares o adelantar compras: qué conviene hoy con la tasa del BCRA y el IPC sobre la mesa.",
  alternates: { canonical: "/blog/que-hacer-con-el-aguinaldo-2026" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Qué hacer con el aguinaldo 2026")}&s=${encodeURIComponent("Las opciones con la cuenta a la vista: tasa BCRA e IPC sobre la mesa")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "12 de junio de 2026";

export default function Post() {
  const tem = TNA_FALLBACK.valor / 12; // aproximación de tasa mensual para 30 días
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Qué hacer con el aguinaldo 2026: opciones con números",
        descripcion:
          "Pagar deudas caras, plazo fijo tradicional o UVA, dólares o adelantar compras: qué conviene hoy con la tasa del BCRA y el IPC sobre la mesa.",
        url: "/blog/que-hacer-con-el-aguinaldo-2026",
        publicado: "2026-06-12",
        modificado: "2026-06-20",
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos verificados al {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Qué hacer con el aguinaldo 2026: las opciones, con la cuenta a la vista
        </h1>
        <p className="text-zinc-600">
          Hasta el 18 de diciembre tienen tiempo de depositarte la segunda cuota del aguinaldo.
          Estas son las opciones de siempre, ordenadas por lo que dicen los números y no por lo que
          te quieren vender. Los números: tasa de plazo fijo{" "}
          {TNA_FALLBACK.valor.toLocaleString("es-AR")}% TNA
          (BCRA, {TNA_FALLBACK.fechaISO.split("-").reverse().join("/")}) e inflación de{" "}
          {INFLACION_DEFAULT.mensualPct.toLocaleString("es-AR")}% mensual (INDEC,{" "}
          {INFLACION_DEFAULT.periodo}).
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          Ordenado por lo que dicen los números: <strong>1) si tenés deudas de tarjeta o préstamo,
          pagarlas primero</strong> rinde más que cualquier inversión conservadora.{" "}
          <strong>2) Plazo fijo tradicional</strong> ({TNA_FALLBACK.valor.toLocaleString("es-AR")}%
          TNA del BCRA) corre apenas por debajo de la inflación de{" "}
          {INFLACION_DEFAULT.mensualPct.toLocaleString("es-AR")}% mensual: sirve para que la plata no
          se derrita, no para ganarle a los precios. <strong>3) Plazo fijo UVA</strong> empata al IPC
          pero te inmoviliza 90 días. <strong>4) Dólares</strong> son cobertura, no rendimiento. Hacé
          tu número con la <Link href="/plazo-fijo">calculadora de plazo fijo</Link>. Esto es
          informativo, no asesoramiento financiero.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          1. Si tenés deudas caras, no hay debate
        </h2>
        <p className="text-zinc-600">
          Financiar el resumen de la tarjeta o tomar un préstamo personal cuesta, según el banco,
          varias veces lo que rinde cualquier inversión conservadora. Pagar una deuda que te cobra
          5%, 8% o más por mes es un &laquo;rendimiento&raquo; seguro que ningún plazo fijo te da.
          Primero apagá ese incendio; lo demás viene después.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          2. Plazo fijo tradicional: la cuenta honesta
        </h2>
        <p className="text-zinc-600">
          Con la TNA de referencia del BCRA ({TNA_FALLBACK.valor.toLocaleString("es-AR")}%), un
          plazo fijo a 30 días rinde aproximadamente{" "}
          {(tem).toLocaleString("es-AR", { maximumFractionDigits: 2 })}% en el mes. La última
          inflación mensual publicada fue {INFLACION_DEFAULT.mensualPct.toLocaleString("es-AR")}%
          ({INFLACION_DEFAULT.periodo}). Es decir:{" "}
          <strong>
            hoy el plazo fijo tradicional corre apenas por debajo de la última inflación mensual
          </strong>
          . Sirve para que la plata no se derrita mientras decidís, no para ganarle a los
          precios. La{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            calculadora de plazo fijo
          </Link>{" "}
          trae la tasa del día, calcula renovaciones y te compara el resultado con la inflación que
          vos esperes. Si querés seguir varios plazos fijos a la vez, está la{" "}
          <Link href="/planillas/plazo-fijo" className="text-emerald-700 underline">
            planilla de plazos fijos
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          3. Plazo fijo UVA: empata a la inflación, pero a 90 días
        </h2>
        <p className="text-zinc-600">
          El plazo fijo UVA ajusta tu plata por inflación (CER) y suma una tasa extra que fija cada
          banco. La regla vigente (Comunicación &laquo;A&raquo; 8246 del BCRA): mínimo{" "}
          <strong>90 días</strong>, con opción de cancelarlo antes desde el día 30, pero si lo
          cancelás, perdés el ajuste. Si podés dejar el aguinaldo quieto tres meses, es la opción en
          pesos que, por cómo está armada, no pierde contra el IPC. La misma{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            calculadora
          </Link>{" "}
          compara tradicional vs. UVA con tu monto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">4. Dólares: cobertura, no rendimiento</h2>
        <p className="text-zinc-600">
          Comprar dólares es un seguro contra sorpresas con el tipo de cambio, no una inversión que
          rinde: el billete guardado no paga interés y, en meses tranquilos, pierde contra la
          inflación en pesos. Acá la decisión no es de números sino de tranquilidad: qué parte de
          tu colchón querés en cada moneda. Si comprás, hacelo por canales oficiales y compará
          cotizaciones.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          5. ¿Adelantar consumo? Solo con descuento real
        </h2>
        <p className="text-zinc-600">
          Con la inflación en torno al 2% mensual, &laquo;comprar antes de que aumente&raquo; ya
          no es el negocio que era con el 10% mensual de hace dos años. Adelantar un consumo
          tiene sentido si conseguís un descuento concreto por pago contado, o si es algo que
          ibas a comprar igual y encontrás buen precio. Para comparar cuotas contra contado,
          actualizá los montos con la{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            calculadora de inflación
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          6. El colchón de emergencia, si todavía no existe
        </h2>
        <p className="text-zinc-600">
          La regla de siempre: tener entre 3 y 6 meses de gastos en algo que puedas sacar rápido y
          sea seguro. Si no lo tenés, el aguinaldo es el momento ideal para empezarlo, en una cuenta
          remunerada, un fondo money market o plazos fijos cortos que vas renovando. No es
          emocionante, pero te deja dormir tranquilo.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="text-base font-bold text-emerald-900">Antes de decidir, hacé tu número</h2>
        <p className="text-sm text-emerald-900">
          ¿No sabés cuánto vas a cobrar? Calculalo primero:{" "}
          <Link href="/aguinaldo" className="font-semibold underline">
            calculadora de aguinaldo
          </Link>{" "}
          (bruto y en mano, proporcional incluido). Después corré tu monto real por la{" "}
          <Link href="/plazo-fijo" className="font-semibold underline">
            calculadora de plazo fijo
          </Link>{" "}
          y comparalo contra la{" "}
          <Link href="/inflacion" className="font-semibold underline">
            inflación
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-zinc-400">
        Este artículo es informativo y general: no es asesoramiento financiero ni una
        recomendación de inversión. Los datos tienen fuente oficial (BCRA, INDEC) y fecha a la
        vista. Revisalos antes de decidir, porque cambian todos los meses.
      </p>
    </article>
  );
}
