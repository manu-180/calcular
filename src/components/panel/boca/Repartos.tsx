import type { BocaDatos, FilaBoca, Sitio } from "@/lib/panel/tipos";
import { numero, plural } from "@/lib/panel/formato";
import { Barras, type FilaBarra } from "../Barras";
import { IcoBrujula } from "../iconos";
import { Bloque, NOMBRE_SITIO, Pais, VacioBoca, canal, origen } from "./comun";

const unDecimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

function nota(f: { llegadas: number; nuevas: number; compartidos: number }) {
  if (f.llegadas === 0) return f.compartidos ? "todavía no trajo a nadie" : "sin compartidos";
  const rinde = f.compartidos ? ` · ${unDecimal.format(f.llegadas / f.compartidos)} por compartido` : "";
  return `${plural(f.llegadas, "llegada", "llegadas")} (${numero(f.nuevas)} nuevas)${rinde}`;
}

function filas(lista: FilaBoca[], nombre: (c: string) => string): FilaBarra[] {
  return [...lista]
    .sort((a, b) => Number(a.clave === "otro") - Number(b.clave === "otro") || b.compartidos - a.compartidos || b.llegadas - a.llegadas)
    .map((f) => ({ clave: f.clave, etiqueta: nombre(f.clave), valor: f.compartidos, texto: numero(f.compartidos), nota: nota(f) }));
}

export function Repartos({ boca, mercado }: { boca: BocaDatos; mercado: string | null }) {
  const vacio = <VacioBoca titulo="Nadie compartió todavía" icono={<IcoBrujula className="size-4" />}>Cuando alguien comparta, acá aparece por dónde lo hizo.</VacioBoca>;
  const porSitio = (["ar", "intl"] as Sitio[]).map((s) => {
    const ms = boca.mercados.filter((m) => m.sitio === s);
    return {
      sitio: s,
      compartidos: ms.reduce((a, m) => a + m.compartidos, 0),
      llegadas: ms.reduce((a, m) => a + m.llegadas, 0),
      nuevas: ms.reduce((a, m) => a + m.nuevas, 0),
    };
  });
  const totalSitios = porSitio.reduce((a, s) => a + s.compartidos + s.llegadas, 0);
  const paises = boca.mercados.slice(0, 8);

  return (
    <>
      <div className="grid gap-1.5 lg:grid-cols-2">
        <Bloque titulo="Por dónde lo compartieron" significa="El largo de la barra son los compartidos; abajo, cuánta gente trajo cada canal.">
          {boca.canales.length ? <Barras filas={filas(boca.canales, canal)} /> : vacio}
        </Bloque>
        <Bloque titulo="Qué compartieron" significa="Desde qué parte del sitio salió el link: una calculadora, el ranking, los sueldos reales…">
          {boca.origenes.length ? <Barras filas={filas(boca.origenes, origen)} /> : vacio}
        </Bloque>
      </div>
      <div className={`grid gap-1.5 ${mercado ? "" : "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"}`}>
        <Bloque titulo="Por país" significa="El país de la página que se compartió. La llegada se anota en el país del link, no en el de quien entra.">
          {paises.length ? (
            <Barras
              filas={paises.map((m) => ({
                clave: `${m.mercado}-${m.sitio}`,
                etiqueta: <Pais mercado={m.mercado} />,
                valor: m.compartidos,
                texto: numero(m.compartidos),
                nota: nota(m),
              }))}
            />
          ) : (
            vacio
          )}
        </Bloque>
        {mercado ? null : (
          <Bloque titulo="Por sitio" significa="calcular.ar es Argentina; calcularya.com, el resto del mundo.">
            {totalSitios ? (
              <ul className="grid grid-cols-2 gap-3">
                {porSitio.map((s) => (
                  <li key={s.sitio} className="rounded-2xl bg-zinc-50/80 p-4 ring-1 ring-inset ring-zinc-900/[0.05]">
                    <p className="text-xs font-medium text-zinc-600">{NOMBRE_SITIO[s.sitio]}</p>
                    <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] tabular-nums text-zinc-900">{numero(s.compartidos)}</p>
                    <p className="text-xs text-zinc-600">compartidos</p>
                    <p className="mt-2 text-sm tabular-nums text-zinc-800">
                      {numero(s.llegadas)} <span className="text-zinc-600">{s.llegadas === 1 ? "llegada" : "llegadas"}</span>
                    </p>
                    <p className="text-xs tabular-nums text-zinc-600">{numero(s.nuevas)} nuevas</p>
                  </li>
                ))}
              </ul>
            ) : (
              vacio
            )}
          </Bloque>
        )}
      </div>
    </>
  );
}
