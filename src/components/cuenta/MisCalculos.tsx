import "server-only";
import { usuarioActual } from "@/lib/auth/sesion";
import { clienteServidor } from "@/lib/supabase/servidor";
import { esRutaCalculo, hashDe, validarCampos } from "@/lib/formulario";
import { tituloDeRuta } from "@/data/navegacion";
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

const FECHA = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Argentina/Buenos_Aires",
});

async function cargar(userId: string): Promise<CalculoItem[] | null> {
  try {
    const sb = await clienteServidor();
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
      const fecha = f.updated_at || f.created_at;
      return [
        {
          id: f.id,
          titulo: String(f.titulo ?? "").slice(0, 80) || "Cálculo sin nombre",
          resumen: String(f.resumen ?? "").slice(0, 200),
          pagina: tituloDeRuta(f.path),
          href: f.path + (hashDe(campos) ?? ""),
          fecha: fecha ? FECHA.format(new Date(fecha)) : "",
        },
      ];
    });
  } catch {
    return null;
  }
}

export async function MisCalculos() {
  const usuario = await usuarioActual().catch(() => null);
  if (!usuario) return null;
  const items = await cargar(usuario.id);

  return (
    <section id="calculos" aria-labelledby="mis-calculos-titulo" className="scroll-mt-24">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id="mis-calculos-titulo" className="text-lg font-semibold tracking-tight text-zinc-900">
          Mis cálculos
        </h2>
        {items && items.length > 0 && (
          <p className="text-xs text-zinc-500">
            {items.length} de 200 guardados
          </p>
        )}
      </div>
      <ListaCalculos inicial={items} />
    </section>
  );
}

export default MisCalculos;
