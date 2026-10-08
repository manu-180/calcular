import "server-only";
import { cache } from "react";
import { clienteDelPedido, usuarioActual } from "@/lib/auth/sesion";
import { esRutaCalculo, hashDe, validarCampos } from "@/lib/formulario";
import { tituloDeRuta } from "@/data/navegacion";
import { esMercadoIntl, mercadoMedido } from "@/lib/medicion/mercados";
import type { SitioCuenta } from "@/lib/auth/sitio";
import { textosDe } from "@/lib/cuenta/textos";
import { origenAR, origenIntl } from "@/motor/sitio";
import { ListaCalculos, type CalculoItem } from "@/components/herramientas/ListaCalculos";

type Fila = {
  id: string;
  path: string;
  titulo: string;
  campos: unknown;
  resumen: string | null;
  updated_at: string | null;
  created_at: string | null;
};

// Un cálculo de calcularya empieza con el código del país (/mx/...). La cuenta es la misma en los dos
// sitios, así que cada lista muestra también los del otro, con el enlace absoluto a su dominio.
const deIntl = (path: string) => esMercadoIntl(path.split("/")[1]);

function enlace(path: string, sitio: SitioCuenta): string {
  const intl = deIntl(path);
  if (intl && sitio === "ar") return `${origenIntl() ?? ""}${path}`;
  if (!intl && sitio === "intl") return `${origenAR()}${path}`;
  return path;
}

function pagina(path: string): string {
  const seg = path.split("/")[1];
  if (!deIntl(path)) return tituloDeRuta(path);
  const pais = mercadoMedido(seg)?.nombre ?? seg.toUpperCase();
  return path.split("/").length > 2 ? `${pais} · ${tituloDeRuta(`/${path.split("/").slice(2).join("/")}`)}` : pais;
}

// cache: /cuenta la dispara junto con getUser y este componente reusa esa misma promesa.
export const calculosPropios = cache(async (userId: string, sitio: SitioCuenta = "ar"): Promise<CalculoItem[] | null> => {
  const t = textosDe(sitio);
  const fecha = new Intl.DateTimeFormat(t.formato.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: t.formato.zona,
  });
  try {
    const sb = await clienteDelPedido();
    if (!sb) return null;
    const { data, error } = await sb
      .from("ca_calculos")
      .select("id,path,titulo,campos,resumen,created_at,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(200);
    if (error) return null;
    // Se revalida al leer: las filas se pueden escribir directo por PostgREST con el JWT de
    // la persona, sin pasar por la API, y el href sale de acá.
    return ((data ?? []) as Fila[]).flatMap((f) => {
      const campos = validarCampos(f.campos);
      if (!esRutaCalculo(f.path) || !campos) return [];
      const cuando = f.updated_at || f.created_at;
      return [
        {
          id: f.id,
          titulo: String(f.titulo ?? "").slice(0, 80) || t.calculos.sinNombre,
          resumen: String(f.resumen ?? "").slice(0, 200),
          pagina: pagina(f.path),
          href: enlace(f.path, sitio) + (hashDe(campos) ?? ""),
          fecha: cuando ? fecha.format(new Date(cuando)) : "",
        },
      ];
    });
  } catch {
    return null;
  }
});

export async function MisCalculos({ sitio = "ar" }: { sitio?: SitioCuenta }) {
  const usuario = await usuarioActual().catch(() => null);
  if (!usuario) return null;
  const items = await calculosPropios(usuario.id, sitio);
  const t = textosDe(sitio).calculos;

  return (
    <section id="calculos" aria-labelledby="mis-calculos-titulo" className="scroll-mt-24">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id="mis-calculos-titulo" className="text-lg font-semibold tracking-tight text-zinc-900">
          {t.titulo}
        </h2>
        {items && items.length > 0 && <p className="text-xs text-zinc-500">{t.guardados(items.length)}</p>}
      </div>
      <ListaCalculos inicial={items} />
    </section>
  );
}

export default MisCalculos;
