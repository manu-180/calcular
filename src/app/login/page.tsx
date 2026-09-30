import type { Metadata } from "next";
import Link from "next/link";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { FormLogin } from "@/components/cuenta/FormLogin";
import { destinoSeguro } from "@/lib/auth/destino";

export const metadata: Metadata = {
  title: "Entrá a tu cuenta",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

export default async function LoginPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const next = destinoSeguro(typeof sp.next === "string" ? sp.next : "", "");
  const registro = next ? `/registro?next=${encodeURIComponent(next)}` : "/registro";

  return (
    <MarcoAuth
      etiqueta="Tu cuenta"
      titulo="Entrá a tu cuenta"
      bajada="Tus planillas, siempre en su última versión, y tus cálculos guardados."
      pie={
        <>
          ¿Todavía no tenés cuenta?{" "}
          <Link href={registro} className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
            Creala gratis
          </Link>
        </>
      }
    >
      <FormLogin next={next} />
    </MarcoAuth>
  );
}
