import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { clienteDelPedido, perfilPropio, sujetoSinValidar, usuarioActual } from "@/lib/auth/sesion";
import { esAdminEmail } from "@/lib/auth/admin";
import { Etiqueta, Placa } from "@/components/cuenta/MarcoAuth";
import { Aviso } from "@/components/cuenta/Campos";
import { BannerVerificar } from "@/components/cuenta/BannerVerificar";
import { FormPerfil } from "@/components/cuenta/FormPerfil";
import { MisPlanillas, type CompraFila } from "@/components/cuenta/MisPlanillas";
import { MisCalculos, calculosPropios } from "@/components/cuenta/MisCalculos";
import { Seccion } from "@/components/cuenta/Seccion";
import { IrAlAncla } from "@/components/cuenta/IrAlAncla";

export const metadata: Metadata = {
  title: "Mi cuenta",
  robots: { index: false, follow: false },
};

type SP = Record<string, string | string[] | undefined>;

const AVISOS: Record<string, { tono: "ok" | "info"; texto: string }> = {
  "clave-nueva": { tono: "ok", texto: "Listo: tu clave nueva ya funciona." },
  "sin-permiso": { tono: "info", texto: "Esa sección es sólo para quienes administran CalculAR." },
};

async function leerCompras(): Promise<{ compras: CompraFila[]; error: boolean }> {
  const supabase = await clienteDelPedido();
  if (!supabase) return { compras: [], error: true };
  const { data, error } = await supabase
    .from("ca_compras")
    .select("id, producto, estado, pagado_at")
    .order("pagado_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[cuenta] ca_compras:", error.code, error.message);
    return { compras: [], error: true };
  }
  return { compras: (data ?? []) as CompraFila[], error: false };
}

export default async function CuentaPage({ searchParams }: { searchParams: Promise<SP> }) {
  // Todo sale junto con getUser: un viaje a Supabase de espera en vez de cinco en fila. Lo leído
  // con el JWT se descarta si getUser no confirma la sesión (ver sujetoSinValidar).
  const sub = await sujetoSinValidar();
  const [usuario, sp, { compras, error }] = await Promise.all([
    usuarioActual(),
    searchParams,
    leerCompras(),
    sub ? calculosPropios(sub) : null,
  ]);
  if (!usuario) redirect("/login?next=%2Fcuenta");
  const perfil = await perfilPropio(usuario.id);
  const aviso = typeof sp.aviso === "string" ? AVISOS[sp.aviso] : undefined;
  const saludo = perfil?.nombre ? `Hola, ${perfil.nombre}` : "Tu cuenta";
  const admin = usuario.verificado && esAdminEmail(usuario.email);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pb-8 sm:pt-4">
      <header className="animate-[ca-col_0.5s_var(--ease-fluid)_backwards]">
        <Etiqueta>Mi cuenta</Etiqueta>
        <h1 className="mt-4 break-words text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.4rem]">
          {saludo}
        </h1>
        <p className="mt-2 break-all text-[15px] text-zinc-500">{usuario.email}</p>
        {admin ? (
          <Link href="/dashboard" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700">
            Ir al panel →
          </Link>
        ) : null}
      </header>

      {aviso ? <Aviso tono={aviso.tono}>{aviso.texto}</Aviso> : null}
      {usuario.verificado ? null : <BannerVerificar email={usuario.email} />}

      <Seccion id="planillas" titulo="Mis compras" bajada="Las planillas siempre en su última versión, con las escalas al día." orden={1}>
        <MisPlanillas compras={compras} error={error} verificado={usuario.verificado} />
      </Seccion>

      {/* MisCalculos (frente G) trae su propio <section> y título: acá sólo se le pone la placa. */}
      <div className="animate-[ca-col_0.55s_var(--ease-fluid)_backwards]" style={{ animationDelay: "120ms" }}>
        <Placa>
          <div className="p-5 sm:p-7">
            <MisCalculos />
          </div>
        </Placa>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Seccion id="perfil" titulo="Tu perfil" className="md:col-span-3" orden={3}>
          <FormPerfil nombre={perfil?.nombre ?? null} perfil={perfil?.perfil ?? null} novedades={perfil?.novedades ?? false} />
        </Seccion>
        <Seccion id="seguridad" titulo="Seguridad" className="md:col-span-2" orden={4}>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-zinc-600">
              Entrás con <span className="break-all font-medium text-zinc-900">{usuario.email}</span>.
            </p>
            <Link
              href="/cuenta/clave"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[border-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:border-zinc-400 hover:shadow-[0_6px_14px_-8px_rgba(0,0,0,0.2)] active:translate-y-0"
            >
              Cambiar la clave
            </Link>
            <form action="/auth/salir" method="post" className="border-t border-zinc-100 pt-4">
              <button
                type="submit"
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-full px-5 text-sm font-semibold text-red-700 transition-colors duration-200 hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </Seccion>
      </div>
      <IrAlAncla />
    </div>
  );
}
