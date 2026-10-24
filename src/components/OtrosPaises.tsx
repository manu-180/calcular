import { CONCEPTOS } from "@/motor/conceptos";
import { urlIntl } from "@/motor/seo";
import type { CodigoMercado } from "@/motor/tipos";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

type ConceptoAR = {
  [K in keyof typeof CONCEPTOS]: (typeof CONCEPTOS)[K] extends { rutaAR: string } ? K : never;
}[keyof typeof CONCEPTOS];

const ETIQUETA: Record<ConceptoAR, string> = {
  "sueldo-neto": "Sueldo neto",
  "bono-semestral": "Aguinaldo",
  "liquidacion-final": "Liquidación final",
  vacaciones: "Vacaciones",
  "horas-extra": "Horas extra",
  "salario-minimo": "Salario mínimo",
  "trabajo-domestico": "Trabajo en casas particulares",
  "impuesto-renta": "Impuesto a la renta",
  "regimen-simplificado": "Régimen simplificado",
  inflacion: "Inflación",
  "plazo-fijo": "Plazo fijo",
  "pension-alimentos": "Cuota alimentaria",
  jubilacion: "Jubilación",
};

const A_LA_VISTA = 8;

// Orden de los que se ven sin abrir: adonde más se va a vivir o trabajar desde la Argentina.
const PRIMERO = ["UY", "CL", "ES", "MX", "BR", "PY", "US", "IT", "PE", "BO", "CO"];

let regiones: Intl.DisplayNames | undefined;
function nombrePais(iso: string, codigo: string): string {
  regiones ??= new Intl.DisplayNames(["es-AR", "es"], { type: "region" });
  return regiones.of(iso) ?? codigo.toUpperCase();
}

type Destino = { codigo: CodigoMercado; pais: string; nombre: string; href: string; hispano: boolean };

// Siempre "produccion": el link sale de calcular.ar y tiene que existir en calcularya aunque este
// build sea un preview. Una edición en otro idioma (ca-fr) solo entra si el país no tiene la principal.
function destinos(concepto: ConceptoAR): Destino[] {
  const porPais = new Map<string, Destino>();
  for (const e of registro.equivalentes(concepto, (m) => hoyEn(m), "produccion")) {
    const mercado = registro.pais(e.mercado)?.mercado;
    if (!mercado?.pais) continue;
    const previo = porPais.get(mercado.pais);
    if (previo && mercado.codigo.includes("-")) continue;
    porPais.set(mercado.pais, {
      codigo: mercado.codigo,
      pais: mercado.pais,
      nombre: nombrePais(mercado.pais, mercado.codigo),
      href: urlIntl(mercado.codigo, e.slug),
      hispano: mercado.idioma === "es",
    });
  }
  const orden = new Intl.Collator("es");
  const rango = (d: Destino) => {
    const i = PRIMERO.indexOf(d.pais);
    return i >= 0 ? i : d.hispano ? PRIMERO.length : PRIMERO.length + 1;
  };
  return [...porPais.values()].sort((a, b) => rango(a) - rango(b) || orden.compare(a.nombre, b.nombre));
}

export function OtrosPaises({ concepto }: { concepto: ConceptoAR }) {
  const lista = destinos(concepto);
  if (!lista.length) return null;
  const etiqueta = ETIQUETA[concepto];
  const vista = lista.slice(0, A_LA_VISTA);
  const resto = lista.slice(A_LA_VISTA);
  const enlace = (d: Destino) => (
    <li key={d.pais}>
      <a href={d.href} className="text-emerald-700 underline decoration-emerald-700/30 underline-offset-2 hover:decoration-current">
        {etiqueta} en {d.nombre}
      </a>
    </li>
  );

  return (
    <section aria-labelledby={`otros-paises-${concepto}`} className="space-y-3 border-t border-zinc-200 pt-6">
      <h2 id={`otros-paises-${concepto}`} className="text-base font-semibold text-zinc-900">
        ¿Vivís o trabajás en otro país?
      </h2>
      <p className="text-sm text-zinc-600 [text-wrap:pretty]">
        La misma cuenta, con la ley y los datos oficiales de cada país, está en{" "}
        <a href={urlIntl("global")} className="font-medium text-zinc-800 underline decoration-zinc-400 underline-offset-2 hover:decoration-current">
          CalcularYa
        </a>
        , el sitio hermano de CalculAR{lista.length === 1 ? ":" : `, para ${lista.length} países:`}
      </p>
      <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">{vista.map(enlace)}</ul>
      {resto.length > 0 && (
        <details className="group text-sm">
          <summary className="cursor-pointer font-medium text-zinc-700 hover:text-zinc-900">
            Ver {resto.length === 1 ? "un país más" : `${resto.length} países más`}
          </summary>
          <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">{resto.map(enlace)}</ul>
        </details>
      )}
    </section>
  );
}
