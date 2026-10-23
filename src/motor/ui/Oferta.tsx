"use client";

import { useContext, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { rastrear } from "@/lib/rastreo";
import {
  avisoRespaldo,
  bajadaOferta,
  leyendaDeCobro,
  precioUSD,
  type CopyTarjeta,
  type OfertaPublica,
  type OfertasCalculadora,
  type OfertasMercado,
  type TextosAviso,
  type TextosTarjeta,
} from "@/lib/pagos/ofertas-intl";
import { olvidarDatosIntl, recordarDatosIntl } from "@/lib/prefill/intl-cliente";
import type { DatosIntl } from "@/lib/prefill/intl";
import type { CalculadoraControlada } from "../cliente";
import { ContextoEmbed } from "../embed/proveedor";
import { parsearEntrada, type FilaFormateada } from "../formulario";
import type { ContextoSerializado, OpcionDinamica } from "../tipos";
import { IconoFlecha } from "./Iconos";
import "./estilos-oferta.css";

// La oferta paga dentro del resultado de cada calculadora de calcularya.com. Qué se ofrece lo decide
// el servidor por concepto (src/lib/pagos/ofertas-servidor.ts) y llega en un JSON por país que se
// pide apenas carga la página, en un momento ocioso: cuando la persona aprieta Calcular la oferta ya
// está y aparece junto con su número, sin esperar nada. El texto se arma acá con ese número, que es
// lo que hace sentir que el producto es suyo. Los textos llegan en ese mismo JSON, ya en el idioma y
// el trato del país: el navegador nunca carga los diccionarios de venta.

const cache = new Map<string, Promise<OfertasMercado | null>>();

function ofertasDe(mercado: string): Promise<OfertasMercado | null> {
  let p = cache.get(mercado);
  if (!p) {
    p = fetch(`/api/pagos/ofertas/${encodeURIComponent(mercado)}`)
      .then((r) => (r.ok ? (r.json() as Promise<OfertasMercado>) : null))
      .catch((e) => {
        console.warn("[oferta] no pude leer las ofertas", mercado, e instanceof Error ? e.message : e);
        cache.delete(mercado);
        return null;
      });
    cache.set(mercado, p);
  }
  return p;
}

function filaClave(filas: readonly FilaFormateada[]): FilaFormateada | null {
  const destacadas = filas.filter((f) => f.destacada);
  return destacadas.at(-1) ?? filas.at(-1) ?? null;
}

function rutaCompra(mercado: string, o: OfertaPublica): string {
  return `/${mercado}/${o.tipo === "informe" ? "informes" : "planillas"}/comprar?p=${o.slug}`;
}

function rutaLanding(mercado: string, o: OfertaPublica): string {
  return `/${mercado}/${o.tipo === "informe" ? "informes" : "planillas"}/${o.slug}`;
}

type PropsOferta = { calculadora: string; control: CalculadoraControlada; contexto: ContextoSerializado };

// Separada en dos para que el embed (src/motor/embed) no pida las ofertas ni monte nada: un hook no
// puede salir antes de tiempo, así que el corte va en este envoltorio y no adentro de OfertaViva.
export function OfertaResultado(props: PropsOferta) {
  return useContext(ContextoEmbed) ? null : <OfertaViva {...props} />;
}

function OfertaViva({ calculadora, control, contexto }: PropsOferta) {
  const [ofertas, setOfertas] = useState<OfertasMercado | null>(null);
  const mercado = contexto.mercado;

  useEffect(() => {
    let vivo = true;
    const pedir = () => void ofertasDe(mercado).then((o) => vivo && setOfertas(o));
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(pedir, { timeout: 2000 });
      return () => {
        vivo = false;
        window.cancelIdleCallback(id);
      };
    }
    const t = setTimeout(pedir, 600);
    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, [mercado]);

  // El cálculo es en vivo: estado y crudos cambian en el mismo render, así que se leen juntos (una
  // ref actualizada en un efecto los dejaba un cambio atrás y ese número viajaba al producto).
  const { estado, crudos, campos, opciones } = control;
  const caso = useMemo(() => {
    if (estado.tipo !== "ok") return null;
    const dinamicas: Record<string, readonly OpcionDinamica[]> = {};
    for (const c of campos) if (c.tipo === "opcion-dato") dinamicas[c.id] = opciones(c);
    const p = parsearEntrada(campos, crudos, contexto, dinamicas);
    const datos = p.ok ? p.entrada : null;
    const si = ofertas?.textos?.si ?? "";
    const no = ofertas?.textos?.no ?? "";
    const textos = campos.map((c) => {
      const v = crudos[c.id];
      const etiqueta = typeof v === "boolean" ? (v ? si : no) : (opciones(c).find((o) => o.valor === v)?.etiqueta ?? String(v ?? ""));
      return { etiqueta: c.etiqueta, valor: etiqueta };
    });
    return { filas: estado.filas, entrada: datos, textos };
  }, [estado, crudos, campos, opciones, contexto, ofertas]);

  const deEsta = ofertas?.porCalculadora[calculadora];
  const textos = ofertas?.textos;
  const copy = ofertas?.copy?.[deEsta?.ofertas[0]?.familia ?? ""];
  if (!caso || !deEsta || !deEsta.ofertas.length || !textos || !copy) return null;
  return (
    <Tarjeta
      key={deEsta.ofertas[0].producto}
      de={deEsta}
      activa={ofertas!.activa}
      referencia={ofertas!.referencia}
      caso={caso}
      contexto={contexto}
      textos={textos}
      copy={copy}
    />
  );
}

function Tarjeta({
  de,
  activa,
  referencia,
  caso,
  contexto,
  textos,
  copy,
}: {
  de: OfertasCalculadora;
  activa: boolean;
  referencia: OfertasMercado["referencia"];
  caso: { filas: readonly FilaFormateada[]; entrada: DatosIntl["entrada"] | null; textos: { etiqueta: string; valor: string }[] };
  contexto: ContextoSerializado;
  textos: TextosTarjeta;
  copy: CopyTarjeta;
}) {
  const m = contexto.mercado;
  const locale = contexto.locale;
  const [principal, ...otras] = de.ofertas;
  const secundaria = otras[0];
  const clave = filaClave(caso.filas);
  const idTitulo = useId();
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let reloj: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(reloj);
        if (!e.isIntersecting) return;
        reloj = setTimeout(() => {
          rastrear("vista_oferta", { producto: principal.producto, props: { ubicacion: "calculadora", calc: de.calc } });
          io.disconnect();
        }, 1000);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      clearTimeout(reloj);
      io.disconnect();
    };
  }, [principal.producto, de.calc]);

  const bajada = clave ? bajadaOferta({ tipo: principal.tipo, etiqueta: clave.etiqueta, cifra: clave.texto, hoja: principal.hoja, textos }) : null;

  const guardar = (o: OfertaPublica) => {
    if (caso.entrada) recordarDatosIntl(o.producto, { calc: de.calc, entrada: caso.entrada });
    else olvidarDatosIntl(o.producto);
  };

  return (
    <section ref={raiz} className="cy-oferta" data-oferta={principal.producto} data-tipo={principal.tipo} aria-labelledby={idTitulo}>
      <div className="cy-oferta-placa">
        <div className="cy-oferta-muestra" aria-hidden="true">
          {principal.tipo === "informe" ? (
            <MuestraInforme titulo={copy.nombre} filas={caso.filas} />
          ) : (
            <MuestraPlanilla hoja={principal.hoja ?? ""} textos={caso.textos} clave={clave} tablas={textos.tablasOficiales} />
          )}
        </div>
        <div className="cy-oferta-cuerpo">
          <p className="cy-oferta-ceja">
            <span className="cy-oferta-ceja-punto" />
            {principal.tipo === "informe" ? textos.cejaInforme : textos.cejaPlanilla}
          </p>
          <h3 id={idTitulo} className="cy-oferta-titulo">
            {copy.gancho}
          </h3>
          {bajada ? <p className="cy-oferta-bajada">{bajada}</p> : null}
          <ul className="cy-oferta-incluye">
            {copy.incluye.map((p, i) => (
              <li key={p.titulo} style={{ "--i": i } as CSSProperties}>
                <span className="cy-oferta-tilde" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="currentColor">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>
                  <strong>{p.titulo}</strong> {p.texto}
                </span>
              </li>
            ))}
          </ul>
          <div className="cy-oferta-pie">
            <p className="cy-oferta-precio">
              <strong>{precioUSD(principal.precioCentavos, locale)}</strong>
              <span>{textos.pagoUnico}</span>
            </p>
            <p className="cy-oferta-cambio">{leyendaDeCobro(principal.precioCentavos, referencia, textos)}</p>
            {activa ? (
              <>
                <a
                  className="cy-boton cy-boton-principal cy-oferta-cta"
                  href={rutaCompra(m, principal)}
                  rel="nofollow"
                  data-evento="cta_compra"
                  data-producto={principal.producto}
                  data-ubicacion="calculadora"
                  onClick={() => guardar(principal)}
                >
                  <span>{principal.tipo === "informe" ? textos.comprarInforme : textos.comprarPlanilla}</span>
                  <span className="cy-boton-icono">
                    <IconoFlecha />
                  </span>
                </a>
                <p className="cy-oferta-confianza">{textos.confianza}</p>
              </>
            ) : (
              <AvisoPronto producto={principal.producto} textos={textos.aviso} />
            )}
            <a
              className="cy-oferta-detalle"
              href={rutaLanding(m, principal)}
              data-evento="cta_compra"
              data-producto={principal.producto}
              data-ubicacion="calculadora-landing"
              onClick={() => guardar(principal)}
            >
              {textos.verDetalle}
            </a>
          </div>
        </div>
      </div>
      {secundaria ? (
        <p className="cy-oferta-tambien">
          {textos.tambien}{" "}
          <a
            href={rutaLanding(m, secundaria)}
            data-evento="cta_compra"
            data-producto={secundaria.producto}
            data-ubicacion="calculadora-secundaria"
            onClick={() => guardar(secundaria)}
          >
            {secundaria.tituloCorto.charAt(0).toUpperCase() + secundaria.tituloCorto.slice(1)}, {precioUSD(secundaria.precioCentavos, locale)}
          </a>
        </p>
      ) : null}
    </section>
  );
}

export function MuestraInforme({ titulo, filas }: { titulo: string; filas: readonly FilaFormateada[] }) {
  const vistas = filas.slice(-4);
  return (
    <div className="cy-muestra-hoja cy-muestra-informe">
      <div className="cy-muestra-membrete">
        <span>
          Calcular<b>Ya</b>
        </span>
        <span className="cy-muestra-pdf">PDF</span>
      </div>
      <p className="cy-muestra-titulo">{titulo}</p>
      <dl className="cy-muestra-filas">
        {vistas.map((f) => (
          <div key={f.clave} data-destacada={f.destacada || undefined}>
            <dt>{f.etiqueta}</dt>
            <dd>{f.texto}</dd>
          </div>
        ))}
      </dl>
      <div className="cy-muestra-lineas">
        <span />
        <span />
        <span />
      </div>
      <div className="cy-muestra-firma">
        <span />
        <span />
      </div>
    </div>
  );
}

export function MuestraPlanilla({ hoja, textos, clave, tablas }: { hoja: string; textos: { etiqueta: string; valor: string }[]; clave: FilaFormateada | null; tablas: string }) {
  const filas = textos.filter((x) => x.valor !== "").slice(0, 4);
  return (
    <div className="cy-muestra-hoja cy-muestra-planilla">
      <div className="cy-muestra-columnas">
        <span />
        <span>A</span>
        <span>B</span>
      </div>
      {filas.map((x, i) => (
        <div key={x.etiqueta} className="cy-muestra-celdas">
          <span>{i + 4}</span>
          <span>{x.etiqueta}</span>
          <span className="cy-muestra-amarilla">{x.valor}</span>
        </div>
      ))}
      {clave ? (
        <div className="cy-muestra-celdas cy-muestra-total">
          <span>{filas.length + 5}</span>
          <span>{clave.etiqueta}</span>
          <span>{clave.texto}</span>
        </div>
      ) : null}
      <div className="cy-muestra-pestanas">
        <span data-activa>{hoja}</span>
        <span>{tablas}</span>
      </div>
    </div>
  );
}

// Con los textos del país, o solo con el trato (la página de compra): ahí sale el aviso en español,
// el idioma de todos los países con venta hasta que esa página pase los textos.
export function AvisoPronto({ producto, textos, trato }: { producto: string; textos?: TextosAviso; trato?: ContextoSerializado["trato"] }) {
  const tx = textos ?? avisoRespaldo(trato ?? "tu");
  const id = useId();
  const [estado, setEstado] = useState<"quieto" | "enviando" | "listo" | "error">("quieto");
  const enviar = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const email = String(new FormData(ev.currentTarget).get("email") ?? "");
    setEstado("enviando");
    try {
      const r = await fetch("/api/pagos/aviso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, producto }) });
      setEstado(r.ok ? "listo" : "error");
      if (r.ok) rastrear("suscripcion", { producto, props: { origen: "pronto" } });
    } catch {
      setEstado("error");
    }
  };
  if (estado === "listo") {
    return (
      <p className="cy-oferta-aviso-listo" role="status">
        {tx.listo}
      </p>
    );
  }
  return (
    <form className="cy-oferta-aviso" onSubmit={enviar}>
      <p className="cy-oferta-pronto">{tx.pronto}</p>
      <label htmlFor={id} className="cy-oferta-aviso-etiqueta">
        {tx.titulo}
      </label>
      <div className="cy-oferta-aviso-fila">
        <div className="cy-entrada">
          <input id={id} name="email" type="email" required autoComplete="email" inputMode="email" maxLength={254} placeholder={tx.correo} />
        </div>
        <button type="submit" className="cy-boton cy-boton-principal" disabled={estado === "enviando"}>
          <span>{tx.boton}</span>
        </button>
      </div>
      <p className="cy-oferta-confianza" role={estado === "error" ? "alert" : undefined}>
        {estado === "error" ? tx.error : tx.ayuda}
      </p>
    </form>
  );
}
