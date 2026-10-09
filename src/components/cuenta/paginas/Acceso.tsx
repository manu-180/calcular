import Link from "next/link";
import { MarcoAuth } from "@/components/cuenta/MarcoAuth";
import { FormLogin } from "@/components/cuenta/FormLogin";
import { FormRegistro } from "@/components/cuenta/FormRegistro";
import { FormRecuperar } from "@/components/cuenta/FormRecuperar";
import { ConfirmarEnlace, EnlaceRoto } from "@/components/cuenta/ConfirmarEnlace";
import { Aviso } from "@/components/cuenta/Campos";
import { checkoutParaRegistro, esUuid } from "@/lib/auth/checkout";
import { destinoSeguro } from "@/lib/auth/destino";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe } from "@/lib/cuenta/textos";
import { GOOGLE_ACTIVO, GOOGLE_INTL_ACTIVO } from "@/lib/funciones";
import { TIPOS_ENLACE, TOKEN_RE, type TipoEnlaceConfirmar } from "@/app/(ar)/auth/confirmar/tipos";

// Login, registro, recuperar y confirmar de los dos sitios. calcular.ar las usa con sitio "ar" y el
// HTML tiene que quedar igual al de antes; calcularya con "intl", dentro de ProveedorSitio.

export type SP = Record<string, string | string[] | undefined>;
const uno = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

const ENLACE = "font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700";

const conGoogle = (sitio: SitioCuenta) => (sitio === "intl" ? GOOGLE_INTL_ACTIVO : GOOGLE_ACTIVO);

// desde: la página de calcularya de la que vino la persona, para anotar de qué país es la cuenta.
// Se valida como cualquier destino y sólo existe en intl.
const desdeDe = (sitio: SitioCuenta, sp: SP, next: string) =>
  sitio === "intl" ? destinoSeguro(uno(sp.desde), "", "intl") || next || undefined : undefined;

export function PaginaLogin({ sitio, sp }: { sitio: SitioCuenta; sp: SP }) {
  const textos = textosDe(sitio);
  const t = textos.login;
  const next = destinoSeguro(uno(sp.next), "", sitio);
  const falla =
    sp.error === "google"
      ? t.errorGoogle
      : sp.error === "limite"
        ? textos.acciones.muchosIntentos
        : sp.error === "google-pendiente"
          ? t.googlePendiente
          : null;
  const registro = next ? `/registro?next=${encodeURIComponent(next)}` : "/registro";

  return (
    <MarcoAuth
      etiqueta={t.etiqueta}
      titulo={t.titulo}
      bajada={t.bajada}
      pie={
        <>
          {t.sinCuenta}{" "}
          <Link href={registro} className={ENLACE}>
            {t.crearla}
          </Link>
        </>
      }
    >
      {falla ? (
        <div className="mb-5">
          <Aviso tono="error">{falla}</Aviso>
        </div>
      ) : null}
      <FormLogin next={next} desde={desdeDe(sitio, sp, next)} conGoogle={conGoogle(sitio)} />
    </MarcoAuth>
  );
}

export async function PaginaRegistro({ sitio, sp }: { sitio: SitioCuenta; sp: SP }) {
  const t = textosDe(sitio).registro;
  const next = destinoSeguro(uno(sp.next), "", sitio);
  const compra = esUuid(sp.compra) ? await checkoutParaRegistro(sp.compra) : null;
  const login = next ? `/login?next=${encodeURIComponent(next)}` : "/login";
  const bajada = compra?.producto ? t.bajadaCompra(compra.producto.tituloCorto) : t.bajada;

  return (
    <MarcoAuth
      etiqueta={compra ? t.etiquetaCompra : t.etiqueta}
      titulo={t.titulo}
      bajada={
        <>
          {bajada}
          {compra ? null : (
            <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-zinc-500">
              {t.ventajas.map((v) => (
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
          {t.yaTenes}{" "}
          <Link href={login} className={ENLACE}>
            {t.entra}
          </Link>
        </>
      }
    >
      <FormRegistro
        next={next}
        desde={desdeDe(sitio, sp, next)}
        conGoogle={conGoogle(sitio)}
        ayudaEmail={compra ? (compra.pistaEmail ? t.ayudaCompraPista(compra.pistaEmail) : t.ayudaCompra) : undefined}
      />
    </MarcoAuth>
  );
}

export function PaginaRecuperar({ sitio }: { sitio: SitioCuenta }) {
  const t = textosDe(sitio).recuperar;
  return (
    <MarcoAuth
      etiqueta={t.etiqueta}
      titulo={t.titulo}
      bajada={t.bajada}
      pie={
        <Link href="/login" className={ENLACE}>
          {t.volver}
        </Link>
      }
    >
      <FormRecuperar />
    </MarcoAuth>
  );
}

export function PaginaConfirmar({ sitio, sp }: { sitio: SitioCuenta; sp: SP }) {
  const t = textosDe(sitio).confirmar;
  const tokenHash = uno(sp.token_hash);
  const tipoCrudo = uno(sp.type);
  const tipo = (TIPOS_ENLACE as readonly string[]).includes(tipoCrudo) ? (tipoCrudo as TipoEnlaceConfirmar) : null;

  if (!tipo || !TOKEN_RE.test(tokenHash)) {
    return (
      <MarcoAuth etiqueta={t.magiclink.etiqueta} titulo={t.incompleto}>
        <EnlaceRoto tipo={tipo} />
      </MarcoAuth>
    );
  }

  const c = t[tipo];
  return (
    <MarcoAuth etiqueta={c.etiqueta} titulo={c.titulo} bajada={c.bajada}>
      <ConfirmarEnlace tokenHash={tokenHash} tipo={tipo} next={destinoSeguro(uno(sp.next), "", sitio)} />
    </MarcoAuth>
  );
}
