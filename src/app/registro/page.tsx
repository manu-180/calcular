import type { Metadata } from "next";
import Link from "next/link";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { FormRegistro } from "@/components/cuenta/FormRegistro";
import { checkoutParaRegistro, esUuid } from "@/lib/auth/checkout";
import { destinoSeguro } from "@/lib/auth/destino";

export const metadata: Metadata = {
  title: "Creá tu cuenta",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

const VENTAJAS = ["Tus planillas, siempre actualizadas", "Tus cálculos guardados", "Gratis"];

export default async function RegistroPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const next = destinoSeguro(typeof sp.next === "string" ? sp.next : "", "");
  const compra = esUuid(sp.compra) ? await checkoutParaRegistro(sp.compra) : null;
  const login = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  const bajada = compra?.producto
    ? `Guardá tu ${compra.producto.tituloCorto} en tu cuenta y bajá siempre la última versión, sin buscar el mail.`
    : "Guardá tus planillas y tus cálculos, y encontralos siempre en el mismo lugar.";

  return (
    <MarcoAuth
      etiqueta={compra ? "Tu compra" : "Cuenta gratis"}
      titulo="Creá tu cuenta"
      bajada={
        <>
          {bajada}
          {compra ? null : (
            <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-zinc-500">
              {VENTAJAS.map((v) => (
                <span key={v} className="inline-flex items-center gap-1.5">
                  <svg className="size-3.5 text-emerald-600" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m5 10.5 3.2 3L15 7" />
                  </svg>
                  {v}
                </span>
              ))}
            </span>
          )}
        </>
      }
      pie={
        <>
          ¿Ya tenés cuenta?{" "}
          <Link href={login} className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
            Entrá
          </Link>
        </>
      }
    >
      <FormRegistro
        next={next}
        ayudaEmail={
          compra
            ? compra.pistaEmail
              ? `Usá el mail con el que compraste (${compra.pistaEmail}): así la planilla aparece sola en tu cuenta.`
              : "Usá el mail con el que compraste: así la planilla aparece sola en tu cuenta."
            : undefined
        }
      />
    </MarcoAuth>
  );
}
