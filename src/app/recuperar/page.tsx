import type { Metadata } from "next";
import Link from "next/link";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { FormRecuperar } from "@/components/cuenta/FormRecuperar";

export const metadata: Metadata = {
  title: "Recuperá tu clave",
  robots: { index: false, follow: false },
};

export default function RecuperarPage() {
  return (
    <MarcoAuth
      etiqueta="Tu cuenta"
      titulo="¿Te olvidaste la clave?"
      bajada="Le pasa a cualquiera. Escribí tu mail y te mandamos un enlace para elegir una nueva."
      pie={
        <Link href="/login" className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
          Volver a entrar
        </Link>
      }
    >
      <FormRecuperar />
    </MarcoAuth>
  );
}
