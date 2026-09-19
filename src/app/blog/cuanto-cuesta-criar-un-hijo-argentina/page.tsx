import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CANASTA_CRIANZA,
  CANASTA_CRIANZA_FUENTE,
  CANASTA_CRIANZA_ULTIMO,
  TRAMOS_CRIANZA,
  type TramoCrianzaId,
} from "@/data/canasta-crianza";
import { IPC_SERIE } from "@/data/ipc-serie";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "1 de agosto de 2026";
const SLUG = "/blog/cuanto-cuesta-criar-un-hijo-argentina";

const $ = (n: number) => formatARS(Math.round(n), 0);
const pct = (n: number) =>
  n.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const veces = (n: number) =>
  n.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// ── Todo lo numérico sale de la serie del INDEC y de la serie del IPC ──────────
// Nada escrito a mano: cuando `gen_canasta_crianza.ts` traiga el mes nuevo, este
// post se actualiza solo (título, tablas, porcentajes y conclusiones incluidos).

const ULT = CANASTA_CRIANZA_ULTIMO;
const PREV = CANASTA_CRIANZA[CANASTA_CRIANZA.length - 2];
const PRIMERO = CANASTA_CRIANZA[0];

const ipcPorPeriodo = new Map(IPC_SERIE.map(([p, v]) => [p, v] as const));
const ipcDe = (p: string) => ipcPorPeriodo.get(p) ?? null;

const anioUlt = Number(ULT.periodo.slice(0, 4));
const mesUlt = ULT.periodo.slice(5, 7);
const periodoHace12 = `${anioUlt - 1}-${mesUlt}`;
const HACE_12 = CANASTA_CRIANZA.find((m) => m.periodo === periodoHace12) ?? PRIMERO;

const nombreTramo = (id: TramoCrianzaId) => TRAMOS_CRIANZA.find((t) => t.id === id)!.nombre;

// Fila por tramo del último mes publicado.
const filasUltimo = TRAMOS_CRIANZA.map((t) => {
  const v = ULT.valores[t.id];
  const v12 = HACE_12.valores[t.id];
  return {
    ...t,
    bienes: v.bienes,
    cuidado: v.cuidado,
    total: v.total,
    pctCuidado: (v.cuidado / v.total) * 100,
    interanual: (v.total / v12.total - 1) * 100,
    mensual: (v.total / PREV.valores[t.id].total - 1) * 100,
  };
});

const MAS_CARO = filasUltimo.reduce((a, b) => (b.total > a.total ? b : a));
const MAS_BARATO = filasUltimo.reduce((a, b) => (b.total < a.total ? b : a));
const BEBE = filasUltimo.find((f) => f.id === "menor-1")!;
const MATERNAL = filasUltimo.find((f) => f.id === "1-a-3")!;
const INICIAL = filasUltimo.find((f) => f.id === "4-a-5")!;
const PRIMARIA = filasUltimo.find((f) => f.id === "6-a-12")!;

// El salto contraintuitivo: de jardín maternal a nivel inicial el total BAJA.
const saltoInicial = {
  bienes: INICIAL.bienes - MATERNAL.bienes,
  cuidado: INICIAL.cuidado - MATERNAL.cuidado,
  total: INICIAL.total - MATERNAL.total,
};

// Evolución: crianza vs IPC, con los dos componentes por separado.
const ipcUlt = ipcDe(ULT.periodo);
const ipcIni = ipcDe(PRIMERO.periodo);
const ipc12 = ipcDe(periodoHace12);
const ipcMultiplicador = ipcUlt && ipcIni ? ipcUlt / ipcIni : null;
const ipcInteranual = ipcUlt && ipc12 ? (ipcUlt / ipc12 - 1) * 100 : null;
const ipcMensual = (() => {
  const anterior = ipcDe(PREV.periodo);
  return ipcUlt && anterior ? (ipcUlt / anterior - 1) * 100 : null;
})();

const compo = (["bienes", "cuidado", "total"] as const).map((clave) => {
  const inicio = PRIMERO.valores[BEBE.id][clave];
  const fin = ULT.valores[BEBE.id][clave];
  const hace12 = HACE_12.valores[BEBE.id][clave];
  return {
    clave,
    multiplicador: fin / inicio,
    interanual: (fin / hace12 - 1) * 100,
  };
});
const compoBienes = compo.find((c) => c.clave === "bienes")!;
const compoCuidado = compo.find((c) => c.clave === "cuidado")!;
const compoTotal = compo.find((c) => c.clave === "total")!;

// Mix de cuidado: cuánto pesaba al inicio de la serie y cuánto ahora.
const pctCuidadoInicio = (PRIMERO.valores[BEBE.id].cuidado / PRIMERO.valores[BEBE.id].total) * 100;

// Tabla anual: el mismo mes de cada año, para ver la evolución sin ruido estacional.
const aniosSerie = Array.from(
  new Set(CANASTA_CRIANZA.map((m) => Number(m.periodo.slice(0, 4)))),
).sort();
const filasAnuales = aniosSerie
  .map((anio) => {
    const mes = CANASTA_CRIANZA.find((m) => m.periodo === `${anio}-${mesUlt}`);
    if (!mes) return null;
    const ipcMes = ipcDe(mes.periodo);
    return {
      anio,
      etiqueta: mes.etiqueta,
      bebe: mes.valores["menor-1"].total,
      primaria: mes.valores["6-a-12"].total,
      ipc: ipcMes,
    };
  })
  .filter((f): f is NonNullable<typeof f> => f !== null);

const primeraFilaAnual = filasAnuales[0];
const filasAnualesConIndice = filasAnuales.map((f) => ({
  ...f,
  bebeIndice: f.bebe / primeraFilaAnual.bebe,
  ipcIndice: f.ipc && primeraFilaAnual.ipc ? f.ipc / primeraFilaAnual.ipc : null,
}));

const mesesSerie = CANASTA_CRIANZA.length;
const crianzaAtrasoVsIpc =
  ipcMultiplicador !== null ? (compoTotal.multiplicador / ipcMultiplicador - 1) * 100 : null;

// Lo que sí sale del bolsillo: el componente de bienes y servicios.
const bolsilloPromedio =
  filasUltimo.reduce((a, f) => a + f.bienes, 0) / filasUltimo.length;

export const metadata: Metadata = {
  title: `Cuánto cuesta criar un hijo en Argentina 2026: el dato oficial del INDEC`,
  description: `Criar un chico costó entre ${$(MAS_BARATO.total)} y ${$(MAS_CARO.total)} por mes en ${ULT.etiqueta}, según la canasta de crianza del INDEC. Qué parte es plata que sale del bolsillo y qué parte es tiempo de cuidado, tramo por tramo, con la serie completa desde 2020.`,
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Cuánto cuesta criar un hijo")}&s=${encodeURIComponent(`Canasta de crianza del INDEC · ${ULT.etiqueta}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto cuesta criar un hijo en Argentina?",
    a: `Según la canasta de crianza del INDEC de ${ULT.etiqueta}, entre ${$(MAS_BARATO.total)} y ${$(MAS_CARO.total)} por mes según la edad: ${$(BEBE.total)} para un menor de 1 año, ${$(MATERNAL.total)} de 1 a 3 años, ${$(INICIAL.total)} de 4 a 5 y ${$(PRIMARIA.total)} de 6 a 12. Ese número incluye dos cosas distintas: los bienes y servicios que se pagan (${$(BEBE.bienes)} en el caso del bebé) y el valor económico del tiempo de cuidado (${$(BEBE.cuidado)}), que no es un gasto en efectivo.`,
  },
  {
    q: "¿Qué es la canasta de crianza del INDEC?",
    a: "Es la valorización mensual de lo que cuesta criar a un chico en el Gran Buenos Aires, publicada por el INDEC desde 2023 con serie desde enero de 2020. Tiene dos componentes: los bienes y servicios necesarios para su desarrollo (deriva de la Canasta Básica Total) y el costo del tiempo de cuidado, valorizado según la metodología de la Dirección Nacional de Economía, Igualdad y Género con UNICEF. Se publica alrededor del día 15 de cada mes con el dato del mes anterior.",
  },
  {
    q: "¿Toda la canasta de crianza es plata que hay que pagar?",
    a: `No, y es el error de lectura más común. En ${ULT.etiqueta}, para un menor de 1 año el ${pct(BEBE.pctCuidado)}% del total (${$(BEBE.cuidado)}) es el valor del tiempo de cuidado: las horas que alguien dedica a criarlo, valorizadas a precio de mercado. Lo que efectivamente sale del bolsillo en bienes y servicios es ${$(BEBE.bienes)}. Si el cuidado se contrata (jardín, niñera), esa parte sí se paga; si la hace un progenitor, se aporta en especie — y el art. 660 del Código Civil y Comercial reconoce que ese trabajo tiene valor económico.`,
  },
  {
    q: `¿Por qué un chico de 4 a 5 años cuesta menos que uno de 1 a 3?`,
    a: `Porque a los 4 años empieza el nivel inicial, que es obligatorio, y eso reemplaza horas de cuidado pago. En ${ULT.etiqueta} el tramo de 4 a 5 gasta ${$(Math.abs(saltoInicial.bienes))} MÁS en bienes y servicios que el de 1 a 3, pero ${$(Math.abs(saltoInicial.cuidado))} MENOS en cuidado: el neto da ${$(Math.abs(saltoInicial.total))} menos por mes. No es que el chico consuma menos, es que la escuela cubre parte del tiempo.`,
  },
  {
    q: "¿La canasta de crianza sube más que la inflación?",
    a:
      crianzaAtrasoVsIpc !== null && ipcMultiplicador !== null
        ? `No. Desde ${PRIMERO.etiqueta} la canasta de un menor de 1 año se multiplicó por ${veces(compoTotal.multiplicador)} y el IPC nacional por ${veces(ipcMultiplicador)}: quedó ${pct(Math.abs(crianzaAtrasoVsIpc))}% por debajo. El motivo está en los componentes: los bienes y servicios se multiplicaron por ${veces(compoBienes.multiplicador)} —bien pegados a la inflación— pero el cuidado apenas por ${veces(compoCuidado.multiplicador)}, porque se valoriza con el salario de las trabajadoras de casas particulares, que corrió más lento.`
        : "La comparación con el IPC se calcula sobre la serie oficial publicada.",
  },
  {
    q: "¿Sirve la canasta de crianza para fijar una cuota alimentaria?",
    a: "Sirve como referencia del costo, no como monto de la cuota. El juez fija el monto caso por caso ponderando las necesidades del hijo y la capacidad económica de cada progenitor (arts. 658, 659 y 666 del CCyC), y computa el trabajo de cuidado como aporte de quien convive con el chico (art. 660). La canasta da un piso objetivo y oficial para discutir con números en vez de intuiciones.",
  },
  {
    q: "¿Los valores valen para todo el país?",
    a: "La canasta se valoriza para el Gran Buenos Aires, igual que la Canasta Básica Total de la que deriva. En regiones con costos de vivienda, transporte o servicios distintos, el número real difiere; el INDEC no publica una apertura regional de esta canasta. Se usa como referencia nacional porque es el único dato oficial mensual disponible.",
  },
  {
    q: `¿De cuándo es el último dato?`,
    a: `De ${ULT.etiqueta}, publicado por el INDEC y consultado el ${CANASTA_CRIANZA_FUENTE.consultadoEl}. La serie que usamos arranca en ${PRIMERO.etiqueta} y tiene ${mesesSerie} meses. Cada vez que el INDEC publica un mes nuevo (~día 15), esta página y la calculadora se actualizan con la planilla oficial: ningún valor se copia a mano.`,
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Cuánto cuesta criar un hijo en Argentina 2026: el dato oficial del INDEC",
        descripcion:
          "La canasta de crianza del INDEC por tramo de edad, separada en bienes y servicios (lo que se paga) y tiempo de cuidado (lo que se aporta), con la serie completa desde 2020 comparada contra el IPC.",
        url: SLUG,
        modificado: CANASTA_CRIANZA_FUENTE.consultadoEl,
        publicado: "2026-08-01",
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos del INDEC verificados al {CANASTA_CRIANZA_FUENTE.consultadoEl}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cuánto cuesta criar un hijo en Argentina: el dato oficial del INDEC ({ULT.etiqueta})
        </h1>
        <p className="text-zinc-600">
          Todos los meses el INDEC publica cuánto cuesta criar un chico y los titulares repiten el
          número más alto. Pero ese número mezcla dos cosas muy distintas —la plata que sale del
          bolsillo y el valor del tiempo de cuidado— y sin separarlas se lee mal, sobre todo si lo
          estás usando para pensar una cuota alimentaria. Acá está abierto, tramo por tramo, con la
          serie completa de {mesesSerie} meses.
        </p>
      </header>

      <RespuestaPrimero actualizado={ULT.etiqueta}>
        <p>
          En {ULT.etiqueta}, criar un chico costó entre{" "}
          <strong>{$(MAS_BARATO.total)}</strong> y <strong>{$(MAS_CARO.total)}</strong> por mes
          según la edad: {$(BEBE.total)} para un menor de 1 año, {$(MATERNAL.total)} de 1 a 3,{" "}
          {$(INICIAL.total)} de 4 a 5 y {$(PRIMARIA.total)} de 6 a 12. Ahora el detalle que casi
          nunca se aclara:{" "}
          <strong>
            en el caso del bebé, el {pct(BEBE.pctCuidado)}% de ese total no es dinero que se paga
          </strong>
          , es el valor del tiempo de cuidado. Lo que realmente sale del bolsillo en bienes y
          servicios son {$(BEBE.bienes)} por mes. Y contra lo que sugieren los titulares, la
          canasta viene subiendo <strong>por debajo de la inflación</strong>: desde{" "}
          {PRIMERO.etiqueta} se multiplicó por {veces(compoTotal.multiplicador)} contra{" "}
          {ipcMultiplicador !== null ? veces(ipcMultiplicador) : "—"} del IPC.
        </p>
      </RespuestaPrimero>

      <p className="text-zinc-600">
        Si llegaste buscando un monto de referencia para una cuota alimentaria, el reparto entre
        progenitores según los ingresos de cada uno lo hace la{" "}
        <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
          calculadora de cuota alimentaria
        </Link>
        , que usa exactamente esta canasta. Acá explicamos de dónde sale cada peso.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cuatro números de {ULT.etiqueta}, abiertos
        </h2>
        <p className="text-zinc-600">
          El INDEC publica la canasta por tramo de edad —los tramos siguen los niveles de
          escolarización— y en cada uno separa <strong>bienes y servicios</strong> (alimentos,
          vestimenta, salud, educación, transporte, higiene) del <strong>cuidado</strong> (las horas
          que hay que dedicarle, valorizadas a precio de mercado).
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="border-b border-zinc-200 px-4 py-2.5 text-left text-xs text-zinc-500">
                Canasta de crianza · {ULT.etiqueta} · valores mensuales por chico (GBA)
              </caption>
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Tramo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bienes y servicios</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Cuidado</th>
                  <th className="px-4 py-2.5 text-right font-semibold">% cuidado</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Interanual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filasUltimo.map((f) => (
                  <tr key={f.id}>
                    <td className="px-4 py-2">
                      <span className="font-medium text-zinc-800">{f.nombre}</span>
                      <span className="block text-xs text-zinc-500">{f.escolaridad}</span>
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(f.bienes)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(f.cuidado)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-500">
                      {pct(f.pctCuidado)}%
                    </td>
                    <td className="px-4 py-2 text-right font-semibold tabular-nums text-zinc-900">
                      {$(f.total)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-emerald-700">
                      +{pct(f.interanual)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Variación del último mes: {filasUltimo.map((f) => `${f.nombre} +${pct(f.mensual)}%`).join(" · ")}
          {ipcMensual !== null ? ` · IPC del mismo mes +${pct(ipcMensual)}%` : ""}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Dos tercios del número no salen de tu bolsillo
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Es la lectura que más se equivoca. Cuando un título dice «criar un bebé cuesta{" "}
            {$(BEBE.total)} por mes», está sumando {$(BEBE.bienes)} de bienes y servicios más{" "}
            {$(BEBE.cuidado)} de <em>tiempo</em>. El segundo componente responde a una pregunta
            distinta: cuánto costaría pagarle a alguien por las horas de cuidado que ese chico
            necesita, valorizadas según la metodología que el INDEC desarrolló con UNICEF.
          </p>
          <p>
            Eso no lo hace un invento contable: es la parte más real de la crianza y durante
            décadas no figuró en ninguna estadística. Pero cambia por completo cómo se usa el
            número:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              <strong>Si el cuidado se contrata</strong> (jardín maternal, niñera, colonia), esa
              parte sí es plata que sale todos los meses y el total es el total.
            </li>
            <li>
              <strong>Si el cuidado lo hace un progenitor</strong>, no hay egreso de caja: hay
              horas. El Código Civil y Comercial lo reconoce en el art. 660 —las tareas cotidianas
              de quien tiene el cuidado del hijo tienen valor económico y cuentan como aporte a su
              manutención—, y por eso una cuota alimentaria no se fija por el total de la canasta
              contra un solo progenitor.
            </li>
          </ul>
          <p>
            El promedio de lo que efectivamente se gasta en bienes y servicios, entre los cuatro
            tramos, es <strong>{$(bolsilloPromedio)} por mes y por chico</strong>. Es el número que
            conviene tener a mano para armar un presupuesto familiar; el total, para dimensionar
            todo lo que implica criar.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué un chico de 4 años «cuesta» menos que uno de 2
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            En la tabla salta a la vista: el tramo de {MATERNAL.nombre.toLowerCase()} da{" "}
            {$(MATERNAL.total)} y el de {INICIAL.nombre.toLowerCase()} da {$(INICIAL.total)},{" "}
            {$(Math.abs(saltoInicial.total))} menos. Parece un error, pero es el efecto de la
            escuela: a los 4 años empieza el nivel inicial obligatorio y reemplaza horas de cuidado
            que antes había que cubrir.
          </p>
          <p>
            Abierto en componentes, el movimiento es doble y en sentidos opuestos: los bienes y
            servicios <strong>suben {$(Math.abs(saltoInicial.bienes))}</strong> (más ropa, más
            comida, útiles, cuota escolar) mientras el cuidado{" "}
            <strong>baja {$(Math.abs(saltoInicial.cuidado))}</strong>. El segundo efecto es casi
            tres veces el primero y por eso el total cae. Después, en el tramo de{" "}
            {PRIMARIA.nombre.toLowerCase()}, el total vuelve a ser el más alto de los cuatro (
            {$(PRIMARIA.total)}): la jornada escolar no crece pero el consumo sí.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Contra la inflación: la crianza viene corriendo de atrás
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Todos los meses sale una nota diciendo que la canasta de crianza «volvió a subir». Es
            cierto y también es trivial: en Argentina sube casi todo. La pregunta útil es si sube{" "}
            <em>más o menos</em> que el resto de los precios. Comparando la serie del INDEC contra
            el{" "}
            <Link href="/inflacion" className="text-emerald-700 underline">
              IPC nacional
            </Link>{" "}
            desde {PRIMERO.etiqueta}, la respuesta es clara.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="border-b border-zinc-200 px-4 py-2.5 text-left text-xs text-zinc-500">
                {ULT.etiqueta.split(" ")[0]} de cada año · totales mensuales e índice base{" "}
                {primeraFilaAnual.etiqueta} = 1
              </caption>
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Menor de 1 año</th>
                  <th className="px-4 py-2.5 text-right font-semibold">De 6 a 12</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Índice crianza</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Índice IPC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filasAnualesConIndice.map((f) => (
                  <tr key={f.anio}>
                    <td className="px-4 py-2 font-medium text-zinc-800">{f.etiqueta}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">{$(f.bebe)}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(f.primaria)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-900">
                      {veces(f.bebeIndice)}×
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-500">
                      {f.ipcIndice !== null ? `${veces(f.ipcIndice)}×` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-3 text-zinc-600">
          <p>
            Desde {PRIMERO.etiqueta}, criar un bebé se multiplicó por{" "}
            <strong>{veces(compoTotal.multiplicador)}</strong> mientras el nivel general de precios
            se multiplicó por{" "}
            <strong>{ipcMultiplicador !== null ? veces(ipcMultiplicador) : "—"}</strong>. En el
            último año la brecha se repite: la canasta del bebé subió{" "}
            {pct(BEBE.interanual)}% contra{" "}
            {ipcInteranual !== null ? `${pct(ipcInteranual)}%` : "—"} del IPC.
          </p>
          <p>
            La explicación está en los dos componentes, y es más interesante que el promedio. Los
            bienes y servicios se multiplicaron por{" "}
            <strong>{veces(compoBienes.multiplicador)}</strong> (+{pct(compoBienes.interanual)}% en
            el último año): van pegados a la canasta básica, o sea a la inflación de alimentos. El
            cuidado, en cambio, apenas por <strong>{veces(compoCuidado.multiplicador)}</strong> (+
            {pct(compoCuidado.interanual)}% interanual), porque se valoriza con el salario del
            personal de casas particulares, que quedó rezagado.
          </p>
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Consecuencia práctica:</strong> el peso del cuidado dentro del total cayó del{" "}
            {pct(pctCuidadoInicio)}% en {PRIMERO.etiqueta} al {pct(BEBE.pctCuidado)}% en{" "}
            {ULT.etiqueta}. Dicho de otro modo, la canasta «sube menos que la inflación» sobre todo
            porque <em>se abarató el trabajo de cuidar</em>, no porque criar sea más accesible: la
            parte que se paga en efectivo corrió incluso arriba del IPC en el último año.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué significa esto para una cuota alimentaria
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La canasta es el punto de partida más objetivo que hay para discutir una cuota, porque
            es un dato oficial, mensual y actualizado. Pero <strong>no es la cuota</strong>: el
            monto lo fija un juez caso por caso (art. 721 del CCyC) ponderando las necesidades
            concretas del chico y la capacidad económica real de cada progenitor.
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            <li>
              Los dos progenitores deben la manutención (arts. 658 y 659), y el reparto se hace{" "}
              <strong>según los ingresos de cada uno</strong> (art. 666), no mitad y mitad.
            </li>
            <li>
              El trabajo de cuidado de quien convive con el chico{" "}
              <strong>ya es un aporte económico</strong> (art. 660): por eso la separación entre
              bienes y cuidado de esta canasta no es un tecnicismo, es exactamente la distinción
              que hace la ley.
            </li>
            <li>
              La obligación llega hasta los 21 años, y hasta los 25 si el hijo estudia y eso le
              impide mantenerse (art. 663).
            </li>
          </ul>
          <p>
            Con esos tres criterios, un número fundado sale en un minuto:{" "}
            <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
              calculadora de cuota alimentaria
            </Link>{" "}
            — cargás las edades de los hijos y los ingresos de cada progenitor y devuelve el
            reparto proporcional sobre esta misma canasta, con el detalle de la cuenta a la vista.
          </p>
          <p className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            <strong>Esto es información, no asesoramiento legal.</strong> Los valores son una
            referencia estadística del costo de crianza en el GBA. Cada situación familiar tiene
            particularidades (obra social, cuota escolar, vivienda, salud, régimen de cuidado
            compartido) que cambian el resultado, y la decisión final es del juez. Para un caso
            concreto, consultá con un abogado de familia.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se compara con un sueldo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La forma más honesta de dimensionar estos números es contra lo que entra en casa. Con
            la{" "}
            <Link href="/sueldo-neto" className="text-emerald-700 underline">
              calculadora de sueldo neto
            </Link>{" "}
            podés ver cuánto queda en mano de tu bruto y comparar: si el gasto de bolsillo por un
            chico es {$(bolsilloPromedio)} promedio y el total con cuidado llega a{" "}
            {$(MAS_CARO.total)}, se entiende por qué en la mayoría de los hogares con hijos
            trabajan los dos adultos y por qué el acceso a jardín es una variable económica, no
            solo pedagógica.
          </p>
          <p>
            Y si estás mirando cómo evolucionan tus ingresos contra estos costos, la{" "}
            <Link href="/inflacion" className="text-emerald-700 underline">
              calculadora de inflación
            </Link>{" "}
            actualiza cualquier monto entre dos meses con el IPC oficial: sirve para ver si un
            aumento de sueldo le ganó o le perdió a la crianza.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">De dónde salen estos números</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            De la serie oficial del INDEC «Canasta de crianza, por tramo de edad», descargada de la
            planilla que publica el organismo y consultada el {CANASTA_CRIANZA_FUENTE.consultadoEl}.
            La serie tiene {mesesSerie} meses ({PRIMERO.etiqueta} a {ULT.etiqueta}) y ningún valor
            de esta página está escrito a mano: todas las tablas, porcentajes y comparaciones se
            calculan sobre esa serie y sobre la serie del IPC nacional cada vez que se compila el
            sitio. Cuando el INDEC publica un mes nuevo, la página cambia sola.
          </p>
          <ul className="ml-5 list-disc space-y-1.5 text-sm">
            <li>
              <a
                href={CANASTA_CRIANZA_FUENTE.informe}
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                INDEC — Canasta de crianza (informes y metodología)
              </a>
            </li>
            <li>
              <a
                href={CANASTA_CRIANZA_FUENTE.url}
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                INDEC — Serie mensual por tramo de edad (planilla oficial)
              </a>
            </li>
            <li>
              <a
                href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm"
                className="text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código Civil y Comercial — arts. 658 a 670 (deber alimentario) en Infoleg
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
        <p className="text-sm text-zinc-700">
          <strong>El número que te falta, calculado:</strong>{" "}
          <Link href="/cuota-alimentaria" className="text-emerald-700 underline">
            cuota alimentaria
          </Link>{" "}
          ·{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            sueldo neto
          </Link>{" "}
          ·{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            inflación
          </Link>
          . Todas con datos oficiales y la cuenta a la vista.
        </p>
      </footer>
    </article>
  );
}
