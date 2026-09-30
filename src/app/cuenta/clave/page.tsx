import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/auth/sesion";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { FormClave } from "@/components/cuenta/FormClave";

export const metadata: Metadata = {
  title: "Elegí una clave nueva",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

export default async function ClavePage({ searchParams }: { searchParams: Promise<SP> }) {
  const usuario = await usuarioActual();
  if (!usuario) redirect("/login?next=%2Fcuenta%2Fclave");
  const desde = (await searchParams).desde;
  const desdeRecuperar = desde === "recuperar" || desde === "confirmar";

  return (
    <MarcoAuth
      etiqueta={desdeRecuperar ? "Ya casi" : "Seguridad"}
      titulo={desde === "confirmar" ? "Elegí tu clave" : "Elegí una clave nueva"}
      bajada={
        desde === "confirmar"
          ? "Tu mail quedó confirmado. Por seguridad, elegí acá la clave con la que vas a entrar, aunque ya hayas escrito una al crear la cuenta."
          : desdeRecuperar
            ? "Listo, ya confirmamos que sos vos. Elegí la clave con la que vas a entrar de ahora en más."
            : "La vas a usar para entrar con tu mail. La anterior deja de funcionar."
      }
      pie={
        <Link href="/cuenta" className="font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
          {desdeRecuperar ? "Ahora no, ir a mi cuenta" : "Volver a mi cuenta"}
        </Link>
      }
    >
      <FormClave />
    </MarcoAuth>
  );
}
