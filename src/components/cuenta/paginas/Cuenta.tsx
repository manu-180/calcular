import Link from "next/link";
import { redirect } from "next/navigation";
import { clienteDelPedido, perfilPropio, sujetoSinValidar, usuarioActual } from "@/lib/auth/sesion";
import { esAdminEmail } from "@/lib/auth/admin";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe } from "@/lib/cuenta/textos";
import { rutaDeOrigen, type Opinion } from "@/lib/opiniones";
import { tituloDeRuta } from "@/data/navegacion";
import { mercadoMedido } from "@/lib/medicion/mercados";
import { Etiqueta, MarcoAuth, Placa } from "@/components/cuenta/MarcoAuth";
import { Aviso } from "@/components/cuenta/Campos";
import { BannerVerificar } from "@/components/cuenta/BannerVerificar";
import { FormPerfil } from "@/components/cuenta/FormPerfil";
import { FormClave } from "@/components/cuenta/FormClave";
import { MisPlanillas, type CompraFila } from "@/components/cuenta/MisPlanillas";
import { MisCalculos, calculosPropios } from "@/components/cuenta/MisCalculos";
import { Seccion } from "@/components/cuenta/Seccion";
import { IrAlAncla } from "@/components/cuenta/IrAlAncla";
import { Opiniones } from "@/components/opiniones/Opiniones";
import type { SP } from "@/components/cuenta/paginas/Acceso";

// /cuenta, /cuenta/clave y /cuenta/opiniones de los dos sitios (ver Acceso.tsx).

const ENLACE = "font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700";

async function leerCompras(sitio: SitioCuenta): Promise<{ compras: CompraFila[]; error: boolean }> {
  const supabase = await clienteDelPedido();
  if (!supabase) return { compras: [], error: true };
  // calcularya lista también compras de otros proveedores y monedas: por eso pide moneda y monto.
  const { data, error } = await supabase
    .from("ca_compras")
    .select(sitio === "intl" ? "id, producto, estado, pagado_at, moneda, monto" : "id, producto, estado, pagado_at")
    .order("pagado_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[cuenta] ca_compras:", error.code, error.message);
    return { compras: [], error: true };
  }
  return { compras: (data ?? []) as unknown as CompraFila[], error: false };
}

export async function PaginaCuenta({ sitio, searchParams }: { sitio: SitioCuenta; searchParams: Promise<SP> }) {
  const textos = textosDe(sitio);
  const t = textos.cuenta;
  const avisos: Record<string, { tono: "ok" | "info"; texto: string }> = {
    "clave-nueva": { tono: "ok", texto: t.claveNueva },
    "sin-permiso": { tono: "info", texto: t.sinPermiso },
  };
  // Todo sale junto con getUser: un viaje a Supabase de espera en vez de cinco en fila. Lo leído
  // con el JWT se descarta si getUser no confirma la sesión (ver sujetoSinValidar).
  const sub = await sujetoSinValidar();
  const [usuario, sp, { compras, error }] = await Promise.all([
    usuarioActual(),
    searchParams,
    leerCompras(sitio),
    sub ? calculosPropios(sub, sitio) : null,
  ]);
  if (!usuario) redirect("/login?next=%2Fcuenta");
  const perfil = await perfilPropio(usuario.id);
  const aviso = typeof sp.aviso === "string" ? avisos[sp.aviso] : undefined;
  const saludo = perfil?.nombre ? t.hola(perfil.nombre) : t.tuCuenta;
  // El panel vive sólo en calcular.ar, y la sesión de calcularya no viaja hasta allá.
  const admin = sitio === "ar" && usuario.verificado && esAdminEmail(usuario.email);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards]">
        <Etiqueta>{t.etiqueta}</Etiqueta>
        <h1 className="mt-4 break-words text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.4rem]">
          {saludo}
        </h1>
        <p className="mt-2 break-all text-[15px] text-zinc-500">{usuario.email}</p>
        {admin ? (
          <Link href="/dashboard" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
            {t.irAlPanel}
          </Link>
        ) : null}
      </header>

      {aviso ? <Aviso tono={aviso.tono}>{aviso.texto}</Aviso> : null}
      {usuario.verificado ? null : <BannerVerificar email={usuario.email} />}

      <Seccion id="planillas" titulo={t.compras} bajada={t.comprasBajada} orden={1}>
        <MisPlanillas compras={compras} error={error} verificado={usuario.verificado} sitio={sitio} />
      </Seccion>

      {/* MisCalculos (frente G) trae su propio <section> y título: acá sólo se le pone la placa. */}
      <div className="animate-[ca-col_0.55s_var(--ease-fluid)_backwards]" style={{ animationDelay: "120ms" }}>
        <Placa>
          <div className="p-5 sm:p-7">
            <MisCalculos sitio={sitio} />
          </div>
        </Placa>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Seccion id="perfil" titulo={t.perfil} className="md:col-span-3" orden={3}>
          <FormPerfil nombre={perfil?.nombre ?? null} perfil={perfil?.perfil ?? null} novedades={perfil?.novedades ?? false} />
        </Seccion>
        <Seccion id="seguridad" titulo={t.seguridad} className="md:col-span-2" orden={4}>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-zinc-600">
              {t.entrasCon} <span className="break-all font-medium text-zinc-900">{usuario.email}</span>.
            </p>
            <Link
              href="/cuenta/clave"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[border-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-400 hover:shadow-[0_6px_14px_-8px_rgba(0,0,0,0.2)] active:translate-y-0"
            >
              {t.cambiarClave}
            </Link>
            <form action="/auth/salir" method="post" className="border-t border-zinc-100 pt-4">
              <button
                type="submit"
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full px-5 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-50"
              >
                {t.salir}
              </button>
            </form>
          </div>
        </Seccion>
      </div>
      <Link
        href="/cuenta/opiniones"
        className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm transition-[border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-300"
      >
        <span>
          <span className="font-semibold text-zinc-900">{t.mejorarias}</span>
          <span className="mt-0.5 block text-zinc-500">{t.mejorariasBajada}</span>
        </span>
        <span aria-hidden className="text-zinc-400 transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
      <IrAlAncla />
    </div>
  );
}

export async function PaginaClave({ sitio, searchParams }: { sitio: SitioCuenta; searchParams: Promise<SP> }) {
  const t = textosDe(sitio).clave;
  const usuario = await usuarioActual();
  if (!usuario) redirect("/login?next=%2Fcuenta%2Fclave");
  const desde = (await searchParams).desde;
  const desdeRecuperar = desde === "recuperar" || desde === "confirmar";

  return (
    <MarcoAuth
      etiqueta={desdeRecuperar ? t.etiquetaCasi : t.etiqueta}
      titulo={desde === "confirmar" ? t.tituloConfirmar : t.titulo}
      bajada={desde === "confirmar" ? t.bajadaConfirmar : desdeRecuperar ? t.bajadaRecuperar : t.bajada}
      pie={
        <Link href="/cuenta" className={ENLACE}>
          {desdeRecuperar ? t.ahoraNo : t.volver}
        </Link>
      }
    >
      <FormClave />
    </MarcoAuth>
  );
}

async function historial(): Promise<{ opiniones: Opinion[]; error: boolean }> {
  const supabase = await clienteDelPedido();
  if (!supabase) return { opiniones: [], error: true };
  const { data, error } = await supabase
    .from("ca_opiniones")
    .select("id, tipo, mensaje, desde, estado, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[opiniones] no pude leer el historial:", error.code, error.message);
    return { opiniones: [], error: true };
  }
  return { opiniones: (data ?? []) as Opinion[], error: false };
}

// En calcularya la página de origen empieza con el país (/mx/aguinaldo): se nombra por el país.
function tituloDesde(desde: string, sitio: SitioCuenta): string {
  if (sitio === "ar") return tituloDeRuta(desde);
  const [, seg = "", ...resto] = desde.split("/");
  const pais = mercadoMedido(seg)?.nombre;
  if (!pais || seg === "ar") return tituloDeRuta(desde);
  return resto.length ? `${pais} · ${tituloDeRuta(`/${resto.join("/")}`)}` : pais;
}

export async function PaginaOpiniones({ sitio, searchParams }: { sitio: SitioCuenta; searchParams: Promise<SP> }) {
  const t = textosDe(sitio).opiniones;
  // El historial sale junto con getUser (mismo JWT, RLS filtra por auth.uid()): un viaje de
  // espera en vez de dos. Si getUser no confirma la sesión, lo leído no se muestra.
  const [usuario, sp, { opiniones, error }] = await Promise.all([usuarioActual(), searchParams, historial()]);
  const desde = rutaDeOrigen(sp.desde);
  if (!usuario) redirect(`/login?next=${encodeURIComponent(`/cuenta/opiniones${desde ? `?desde=${desde}` : ""}`)}`);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards]">
        <Link
          href="/cuenta"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 10H5M9 5.5 4.5 10 9 14.5" />
          </svg>
          {t.volver}
        </Link>
        <div>
          <Etiqueta>{t.etiqueta}</Etiqueta>
        </div>
        <h1 className="mt-4 text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.4rem]">{t.titulo}</h1>
        <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-zinc-600">{t.bajada}</p>
      </header>

      <Opiniones
        historial={opiniones}
        errorHistorial={error}
        desde={desde}
        tituloDesde={desde ? tituloDesde(desde, sitio) : null}
        ahora={Date.now()}
      />
    </div>
  );
}
