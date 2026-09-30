import Link from "next/link";
import { esPeriodoIndexable } from "@/lib/archivo-mensual";

type Item = { periodo: string; href: string; etiqueta: string };

const chip =
  "inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700";

// Los meses dentro de la ventana indexable van a la vista; la cola queda plegada por año. No es
// cosmético: el hub le mostraba al lector 33 chips idénticos y le ofrecía a Google 33 páginas que
// comparten el 83% del texto. La jerarquía visible es ahora la misma que declara el sitemap.
export function ArchivoMensualLinks({ items }: { items: Item[] }) {
  const periodos = items.map((i) => i.periodo);
  const recientes = items.filter((i) => esPeriodoIndexable(i.periodo, periodos));
  const anteriores = items.filter((i) => !esPeriodoIndexable(i.periodo, periodos));

  const porAnio = new Map<string, Item[]>();
  for (const i of anteriores) {
    const anio = i.periodo.slice(0, 4);
    porAnio.set(anio, [...(porAnio.get(anio) ?? []), i]);
  }

  return (
    <div className="space-y-4">
      <ul className="flex flex-wrap gap-2">
        {recientes.map((i) => (
          <li key={i.periodo}>
            <Link href={i.href} className={chip}>
              {i.etiqueta}
            </Link>
          </li>
        ))}
      </ul>

      {anteriores.length > 0 && (
        <details className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <summary className="cursor-pointer text-sm font-semibold text-zinc-700">
            Meses anteriores ({anteriores.length})
          </summary>
          <div className="mt-3 space-y-3">
            {[...porAnio.entries()]
              .sort((a, b) => b[0].localeCompare(a[0]))
              .map(([anio, meses]) => (
                <div key={anio} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {anio}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {meses.map((i) => (
                      <li key={i.periodo}>
                        <Link href={i.href} className={chip}>
                          {i.etiqueta}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </details>
      )}
    </div>
  );
}
