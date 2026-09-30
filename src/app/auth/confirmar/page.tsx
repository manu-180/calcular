import type { Metadata } from "next";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { ConfirmarEnlace, EnlaceRoto } from "@/components/cuenta/ConfirmarEnlace";
import { destinoSeguro } from "@/lib/auth/destino";
import { TIPOS_ENLACE, TOKEN_RE, type TipoEnlaceConfirmar } from "@/app/auth/confirmar/tipos";

export const metadata: Metadata = {
  title: "Confirmá tu acceso",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const TEXTOS: Record<TipoEnlaceConfirmar, { etiqueta: string; titulo: string; bajada: string }> = {
  signup: {
    etiqueta: "Último paso",
    titulo: "Confirmá tu cuenta",
    bajada: "Tocá el botón para confirmar tu mail y entrar a tu cuenta.",
  },
  magiclink: {
    etiqueta: "Tu cuenta",
    titulo: "Entrá a tu cuenta",
    bajada: "Tocá el botón y entrás directo, sin clave.",
  },
  recovery: {
    etiqueta: "Clave nueva",
    titulo: "Elegí una clave nueva",
    bajada: "Primero confirmamos que sos vos. Después elegís la clave.",
  },
};

type SP = Record<string, string | string[] | undefined>;
const uno = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

export default async function ConfirmarPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const tokenHash = uno(sp.token_hash);
  const tipoCrudo = uno(sp.type);
  const tipo = (TIPOS_ENLACE as readonly string[]).includes(tipoCrudo) ? (tipoCrudo as TipoEnlaceConfirmar) : null;

  if (!tipo || !TOKEN_RE.test(tokenHash)) {
    return (
      <MarcoAuth etiqueta="Tu cuenta" titulo="Este enlace no está completo">
        <EnlaceRoto tipo={tipo} />
      </MarcoAuth>
    );
  }

  const t = TEXTOS[tipo];
  return (
    <MarcoAuth etiqueta={t.etiqueta} titulo={t.titulo} bajada={t.bajada}>
      <ConfirmarEnlace tokenHash={tokenHash} tipo={tipo} next={destinoSeguro(uno(sp.next), "")} />
    </MarcoAuth>
  );
}
