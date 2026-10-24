"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Bandera } from "./Bandera";
import { destinoEquivalente, mapaEquivalentes, paisDelVisitante, recordarPais, type MapaEquivalentes } from "./geo-cliente";
import { IconoChevron, IconoGlobo } from "./Iconos";
import { usePaises } from "./ListaPaises";
import { edicionPara, idiomasDelNavegador, type OpcionPais } from "./paises";
import type { Idioma, Trato } from "../tipos";
import { textosInicio } from "./textos-inicio";

export type { OpcionPais };

interface Props {
  actual: OpcionPais | null;
  idioma: Idioma;
  trato: Trato;
  locale: string;
  textos: { elegir: string; latinoamerica: string; todos: string; hrefTodos: string };
}

const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;
const normal = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/ı/g, "i")
    .trim();

interface Item extends OpcionPais {
  clave: string;
  destino: string;
  mismaCalculadora: boolean;
  ubicacion: boolean;
}

// Selector del header. Cambiar de país desde una calculadora lleva a la del mismo concepto en el
// destino (el mapa viene de /api/geo/equivalentes, pedido al primer hover o foco del botón); sin
// mapa, sin JS o sin equivalente, al inicio del país. Combobox: el foco se queda en el buscador y las
// flechas mueven la opción activa (aria-activedescendant). La lista se pinta recién al abrir: con 190
// países eran cientos de links ocultos en el HTML de cada página.
export function SelectorPais({ actual, idioma, trato, locale, textos }: Props) {
  const opciones = usePaises();
  const ti = textosInicio(idioma, trato, locale).selector;
  const [abierto, setAbierto] = useState(false);
  const [montado, setMontado] = useState(false);
  const [consulta, setConsulta] = useState("");
  // La opción activa va por clave y no por índice: cuando llega el país de la IP se suma arriba la
  // sugerencia y los índices se corren, pero la selección tiene que quedarse donde estaba.
  const [claveActiva, setClaveActiva] = useState<string | null>(null);
  const [mapa, setMapa] = useState<MapaEquivalentes | null>(null);
  const [geo, setGeo] = useState<string | null>(null);
  const [ruta, setRuta] = useState("");
  const raiz = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const buscador = useRef<HTMLInputElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const id = useId();

  const precargar = useCallback(() => {
    void mapaEquivalentes(window.location.pathname).then((m) => m && setMapa(m));
  }, []);

  const items = useMemo<Item[]>(() => {
    const q = normal(consulta);
    const conDestino = (o: OpcionPais, ubicacion: boolean): Item => {
      const d = destinoEquivalente(mapa, ruta, o);
      return { ...o, clave: `${ubicacion ? "u" : "l"}-${o.codigo}`, destino: d.href, mismaCalculadora: d.mismaCalculadora, ubicacion };
    };
    const enGeo = !q && geo ? edicionPara(opciones, geo, idiomasDelNavegador()) : undefined;
    const sugerida = enGeo && enGeo.codigo !== actual?.codigo ? enGeo : undefined;
    const filtradas = opciones.filter((o) => !q || normal(o.nombre).includes(q) || o.codigo === q);
    return [...(sugerida ? [conDestino(sugerida, true)] : []), ...filtradas.map((o) => conDestino(o, false))];
  }, [consulta, geo, mapa, ruta, opciones, actual]);

  const cerrar = useCallback((devolverFoco: boolean) => {
    setAbierto(false);
    setConsulta("");
    if (devolverFoco) boton.current?.focus();
  }, []);

  // Un país elegido desde otro lado del header (el cajón del celular, que lista los mismos links) también
  // es una elección explícita: cualquier click a la portada de un país se guarda para la próxima visita.
  useEffect(() => {
    const porHref = new Map(opciones.map((o) => [o.href, o.codigo]));
    const alClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]");
      const codigo = a ? porHref.get(a.getAttribute("href") ?? "") : undefined;
      if (codigo) recordarPais(codigo);
    };
    document.addEventListener("click", alClick, { capture: true });
    return () => document.removeEventListener("click", alClick, { capture: true });
  }, [opciones]);

  useEffect(() => {
    if (!abierto) return;
    setMontado(true);
    setRuta(window.location.pathname);
    precargar();
    void paisDelVisitante().then(setGeo);
    const alClick = (ev: PointerEvent) => {
      if (raiz.current && !raiz.current.contains(ev.target as Node)) cerrar(false);
    };
    document.addEventListener("pointerdown", alClick);
    buscador.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("pointerdown", alClick);
  }, [abierto, cerrar, precargar]);

  const encontrada = claveActiva === null ? -1 : items.findIndex((x) => x.clave === claveActiva);
  const activo = encontrada >= 0 ? encontrada : consulta ? 0 : Math.max(0, items.findIndex((x) => x.codigo === actual?.codigo && !x.ubicacion));
  const setActivo = (siguiente: number | ((a: number) => number)) => {
    const i = typeof siguiente === "function" ? siguiente(activo) : siguiente;
    setClaveActiva(items[i]?.clave ?? null);
  };

  useEffect(() => {
    // Al abrir o al cambiar la búsqueda: el país actual, o el primer resultado si se está buscando.
    setClaveActiva(null);
  }, [consulta, abierto]);

  useEffect(() => {
    if (!abierto) return;
    lista.current?.querySelector<HTMLElement>(`[data-indice="${activo}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activo, abierto]);

  // Elegir el país en el que ya se está no recarga la página: cierra el panel.
  const ir = (item: Item) => {
    recordarPais(item.codigo);
    if (item.codigo === actual?.codigo) cerrar(true);
    else window.location.assign(item.destino);
  };

  const alTeclear = (ev: KeyboardEvent<HTMLInputElement>) => {
    const n = items.length;
    if (ev.key === "Escape") {
      ev.preventDefault();
      if (consulta) setConsulta("");
      else cerrar(true);
    } else if (ev.key === "ArrowDown" && n) {
      ev.preventDefault();
      setActivo((a) => (a + 1) % n);
    } else if (ev.key === "ArrowUp" && n) {
      ev.preventDefault();
      setActivo((a) => (a - 1 + n) % n);
    } else if (ev.key === "Home" && n && !consulta) {
      ev.preventDefault();
      setActivo(0);
    } else if (ev.key === "End" && n && !consulta) {
      ev.preventDefault();
      setActivo(n - 1);
    } else if (ev.key === "Enter" && items[activo]) {
      ev.preventDefault();
      ir(items[activo]);
    } else if (ev.key === "Tab") {
      cerrar(false);
    }
  };

  const idLista = `${id}-lista`;
  const idOpcion = (i: number) => `${id}-op-${i}`;

  return (
    <div className="cy-ps" ref={raiz} data-abierto={abierto || undefined}>
      <button
        ref={boton}
        type="button"
        className="cy-ps-boton"
        aria-haspopup="dialog"
        aria-expanded={abierto}
        aria-controls={`${id}-panel`}
        aria-label={`${textos.elegir}. ${actual ? actual.nombre : textos.latinoamerica}`}
        onClick={() => (abierto ? cerrar(false) : setAbierto(true))}
        onPointerEnter={precargar}
        onFocus={precargar}
      >
        {actual ? <Bandera pais={actual.pais} ancho={20} prioridad /> : <IconoGlobo className="cy-ps-globo" />}
        <span className="cy-ps-nombre">{actual ? actual.nombre : textos.latinoamerica}</span>
        <IconoChevron className="cy-ps-chevron" />
      </button>
      <div id={`${id}-panel`} className="cy-ps-panel" role="dialog" aria-label={textos.elegir} inert={!abierto}>
        <div className="cy-ps-buscar">
          <svg {...trazo} viewBox="0 0 24 24" width="16" height="16">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            ref={buscador}
            type="search"
            role="combobox"
            aria-expanded={abierto}
            aria-controls={idLista}
            aria-autocomplete="list"
            aria-activedescendant={items[activo] ? idOpcion(activo) : undefined}
            aria-label={ti.buscar}
            placeholder={ti.buscar}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={alTeclear}
          />
        </div>
        <ul ref={lista} id={idLista} className="cy-ps-lista" role="listbox" aria-label={ti.paises}>
          {(montado ? items : []).map((o, i) => {
            const esActual = o.codigo === actual?.codigo;
            const primeraDeLista = i > 0 && items[i - 1].ubicacion && !o.ubicacion;
            return (
              <li
                key={o.clave}
                id={idOpcion(i)}
                role="option"
                aria-selected={i === activo}
                data-indice={i}
                data-separa={primeraDeLista || undefined}
                style={{ "--i": Math.min(i, 12) } as CSSProperties}
                onPointerMove={() => i !== activo && setActivo(i)}
              >
                {o.ubicacion ? <span className="cy-ps-grupo">{ti.ubicacion}</span> : null}
                <a
                  href={o.destino}
                  tabIndex={-1}
                  className="cy-ps-opcion"
                  aria-current={esActual ? "true" : undefined}
                  hrefLang={o.codigo === "ar" ? "es-AR" : undefined}
                  onClick={(ev) => {
                    if (!esActual) return recordarPais(o.codigo);
                    ev.preventDefault();
                    ir(o);
                  }}
                >
                  <Bandera pais={o.pais} ancho={22} />
                  <span className="cy-ps-opcion-nombre">
                    {o.nombre}
                    {o.mismaCalculadora ? <span className="cy-ps-etiqueta">{ti.mismaCalculadora}</span> : null}
                  </span>
                  {esActual ? (
                    <svg {...trazo} viewBox="0 0 24 24" width="16" height="16" className="cy-ps-tilde">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
        {montado && items.length === 0 ? (
          <p className="cy-ps-vacio" role="status">
            {ti.sinResultados(consulta.trim())}
          </p>
        ) : null}
        <a href={textos.hrefTodos} className="cy-ps-todos">
          {textos.todos}
        </a>
      </div>
    </div>
  );
}
