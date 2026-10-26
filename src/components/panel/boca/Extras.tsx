import type { BocaDatos } from "@/lib/panel/tipos";
import { diaCorto, numero, plural } from "@/lib/panel/formato";
import { Barras } from "../Barras";
import { IcoBrujula, IcoExterno, IcoMano, IcoPersonas } from "../iconos";
import { Bloque, Cifra, Pais, VacioBoca } from "./comun";

const NOMBRE_SOCIO: Record<string, string> = { wise: "Wise", deel: "Deel" };
const NOMBRE_FUENTE: Record<string, string> = { Compartido: "Links compartidos sin código", Email: "Correo" };

function Embebidos({ boca }: { boca: BocaDatos }) {
  const e = boca.embebidos;
  const conSitio = e.sitios.filter((s) => s.host).length;
  return (
    <Bloque titulo="Calculadoras embebidas" significa="Blogs y sitios que pusieron una calculadora de calcularya adentro de su página (embed.js).">
      {e.vistas === 0 ? (
        <VacioBoca titulo="Nadie la insertó todavía" icono={<IcoExterno className="size-4" />}>
          Cuando un sitio ponga una calculadora con embed.js, acá vas a ver cuál, desde qué sitio y cuánto la usan.
        </VacioBoca>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <Cifra etiqueta="Vistas" valor={numero(e.vistas)} nota={plural(e.visitantes, "persona", "personas")} />
            <Cifra etiqueta="Sitios" valor={numero(conSitio)} nota="que la insertaron" />
            <Cifra etiqueta="Usos" valor={numero(e.usos)} nota="calcularon adentro" />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-600">Desde qué sitio</p>
            <Barras
              filas={e.sitios.slice(0, 6).map((s) => ({
                clave: s.host || "_",
                etiqueta: s.host ? <span className="break-all">{s.host}</span> : <span className="text-zinc-600">El navegador no dijo el sitio</span>,
                valor: s.vistas,
                texto: numero(s.vistas),
                nota: `${plural(s.usos, "uso", "usos")} · ${plural(s.visitantes, "persona", "personas")}`,
              }))}
            />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-600">Qué calculadora</p>
            <ul className="divide-y divide-zinc-100 text-sm">
              {e.calculadoras.slice(0, 6).map((c) => (
                <li key={c.path} className="flex items-baseline justify-between gap-3 py-2">
                  <span className="min-w-0 text-zinc-800">{c.titulo}</span>
                  <span className="shrink-0 tabular-nums text-zinc-900">
                    {numero(c.vistas)} <span className="text-xs text-zinc-600">· {plural(c.sitios, "sitio", "sitios")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Bloque>
  );
}

function Sociales({ boca }: { boca: BocaDatos }) {
  const total = boca.sociales.reduce((a, s) => a + s.sesiones, 0);
  return (
    <Bloque
      titulo="Llegadas sin código"
      significa="Gente que entró desde WhatsApp, redes o correo sin pasar por el botón de compartir: copió la dirección a mano o usó un link viejo. También es boca en boca."
    >
      {total === 0 ? (
        <VacioBoca titulo="Nadie llegó así en este período" icono={<IcoBrujula className="size-4" />}>
          Cuando alguien pegue un link del sitio en un chat o una red, aparece acá aunque no haya usado el botón.
        </VacioBoca>
      ) : (
        <Barras
          filas={boca.sociales.map((s) => ({
            clave: s.fuente,
            etiqueta: NOMBRE_FUENTE[s.fuente] ?? s.fuente,
            valor: s.sesiones,
            texto: numero(s.sesiones),
            nota: `${plural(s.personas, "persona", "personas")} · ${numero(s.usaron)} usaron una calculadora`,
          }))}
        />
      )}
    </Bloque>
  );
}

function Afiliados({ boca }: { boca: BocaDatos }) {
  const total = boca.afiliados.reduce((a, x) => a + x.clics, 0);
  return (
    <Bloque titulo="Afiliados" significa="Clics a los socios (Wise, Deel) desde Tu sueldo en el mundo, por socio y por el país que recomendamos.">
      {total === 0 ? (
        <VacioBoca titulo="Los links de socios están apagados" icono={<IcoMano className="size-4" />}>
          Cuando se prendan, acá vas a ver cuántos tocan cada socio y desde qué país. Hasta entonces no hay nada que contar.
        </VacioBoca>
      ) : (
        <ul className="divide-y divide-zinc-100 text-sm">
          {boca.afiliados.map((a) => (
            <li key={`${a.socio}${a.pais}${a.mercado}`} className="flex items-center justify-between gap-3 py-2.5">
              <span className="flex min-w-0 items-center gap-2">
                <span className="font-medium text-zinc-900">{NOMBRE_SOCIO[a.socio] ?? a.socio}</span>
                {a.pais ? <Pais mercado={a.pais.toLowerCase()} /> : null}
              </span>
              <span className="shrink-0 tabular-nums text-zinc-900">
                {numero(a.clics)} <span className="text-xs text-zinc-600">{a.clics === 1 ? "clic" : "clics"} · {plural(a.personas, "persona", "personas")}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Bloque>
  );
}

function Sueldos({ boca }: { boca: BocaDatos }) {
  const s = boca.sueldos;
  const celdas = new Map((s?.celdas ?? []).map((c) => [c.mercado, c]));
  const paises = [...new Set([...(s?.aportes ?? []).map((a) => a.mercado), ...(s?.celdas ?? []).map((c) => c.mercado)])];
  const aporte = (m: string) => s?.aportes.find((a) => a.mercado === m);
  return (
    <Bloque
      titulo="Sueldos reales"
      significa="Sueldos que la gente aporta de forma anónima. Acá sólo se cuentan: los montos nunca salen de la base."
    >
      {!s ? (
        <VacioBoca titulo="Todavía no está en la base" icono={<IcoPersonas className="size-4" />}>
          La publicación de sueldos reales no está aplicada en la base. Cuando lo esté, acá aparecen los aportes por país.
        </VacioBoca>
      ) : paises.length === 0 ? (
        <VacioBoca titulo="Sin aportes en este período" icono={<IcoPersonas className="size-4" />}>
          Cuando alguien aporte su sueldo, acá vas a ver cuántos van por país y cuántas celdas ya se publican.
        </VacioBoca>
      ) : (
        <>
          <table className="w-full text-sm">
            <caption className="sr-only">Aportes de sueldos y celdas publicadas por país</caption>
            <thead>
              <tr className="text-left text-xs text-zinc-600">
                <th scope="col" className="border-b border-zinc-100 pb-2 font-medium">País</th>
                <th scope="col" className="border-b border-zinc-100 pb-2 text-right font-medium">Aportes</th>
                <th scope="col" className="border-b border-zinc-100 pb-2 text-right font-medium">Publicadas</th>
                <th scope="col" className="hidden border-b border-zinc-100 pb-2 text-right font-medium sm:table-cell">Cerca</th>
              </tr>
            </thead>
            <tbody>
              {paises.slice(0, 10).map((m) => {
                const a = aporte(m);
                const c = celdas.get(m);
                return (
                  <tr key={m}>
                    <th scope="row" className="border-b border-zinc-100 py-2 text-left font-normal text-zinc-800">
                      <Pais mercado={m} />
                    </th>
                    <td className="border-b border-zinc-100 py-2 text-right tabular-nums text-zinc-900">
                      {numero(a?.aportes ?? 0)}
                      {a?.pendientes ? <span className="block text-xs text-zinc-600">+{numero(a.pendientes)} por publicar</span> : null}
                    </td>
                    <td className="border-b border-zinc-100 py-2 text-right tabular-nums text-zinc-900">{numero(c?.publicadas ?? 0)}</td>
                    <td className="hidden border-b border-zinc-100 py-2 text-right tabular-nums text-zinc-600 sm:table-cell">{numero(c?.cerca ?? 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            Aportes de los meses del período (se guardan sin día). Una celda es un puesto y una experiencia; se publica con 10 aportes o más
            {s.publicadoEl ? `, y la última publicación fue el ${diaCorto(`${s.publicadoEl}T12:00:00Z`)}` : ""}.
          </p>
        </>
      )}
    </Bloque>
  );
}

export function Extras({ boca, mercado }: { boca: BocaDatos; mercado: string | null }) {
  const soloAr = mercado === "ar";
  return (
    <>
      <div className="grid gap-1.5 lg:grid-cols-2">
        {soloAr ? null : <Embebidos boca={boca} />}
        <Sociales boca={boca} />
        {soloAr ? <Sueldos boca={boca} /> : null}
      </div>
      {soloAr ? null : (
        <div className="grid gap-1.5 lg:grid-cols-2">
          <Afiliados boca={boca} />
          <Sueldos boca={boca} />
        </div>
      )}
    </>
  );
}
