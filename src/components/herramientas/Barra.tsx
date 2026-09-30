"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal, flushSync } from "react-dom";
import dynamic from "next/dynamic";
import {
  camposDeHash,
  capturarBase,
  esControlElegible,
  estaHidratado,
  hashDe,
  hayControles,
  hayDatos,
  raizCalculadora,
  raizPagina,
  resumenDe,
  restaurar,
  serializar,
  tituloPagina,
  tituloSugerido,
} from "@/lib/formulario";
import { rastrear } from "@/lib/rastreo";
import { haySesion } from "@/lib/sesion-cliente";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import type { Contexto, Motivo } from "./HerramientasCalculo";
import { borrarPendiente } from "./pendiente";
import { guardarCalculo } from "./api";
import { IconoCheck, IconoCerrar, IconoCompartir, IconoFlecha, IconoGuardar, IconoImprimir } from "./iconos";
import "./herramientas.css";

const HojaGuardar = dynamic(() => import("./Hojas").then((m) => m.HojaGuardar), { ssr: false });
const HojaEnlace = dynamic(() => import("./Hojas").then((m) => m.HojaEnlace), { ssr: false });

type Aviso =
  | { tipo: "compartido" | "parcial" | "fallido" | "roto" | "largo" }
  | { tipo: "pendiente"; estado: "ofrecer" | "guardando" | "listo" | "error"; error?: string; codigo?: string };

type Hoja = null | { tipo: "guardar" } | { tipo: "enlace"; url: string };

type Impresion = { titulo: string; fecha: string; ruta: string };

const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function esperarCalculadora(): Promise<boolean> {
  for (let i = 0; i < 50; i++) {
    const main = raizPagina();
    if (hayControles(main) && estaHidratado(main)) {
      // Deja correr los useEffect de montaje de la calculadora (p. ej. aguinaldo elige el
      // semestre en curso) para no pisar lo restaurado un instante después.
      await esperar(80);
      return true;
    }
    await esperar(100);
  }
  return false;
}

function limpiarHash() {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", pathname + search);
}

function alturaHeader(): number {
  for (const h of document.querySelectorAll<HTMLElement>("header")) {
    const pos = getComputedStyle(h).position;
    if (pos === "sticky" || pos === "fixed") return h.offsetHeight;
  }
  return 0;
}

function sinMovimiento(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// El aviso de arriba es fijo: se deja la calculadora justo debajo para que no tape nada.
function llevarACalculadora(alturaAviso: number) {
  const calc = raizCalculadora(raizPagina());
  if (!calc) return;
  const margen = alturaHeader() + alturaAviso + 20;
  const top = calc.getBoundingClientRect().top;
  if (top >= margen && top < window.innerHeight * 0.45) return;
  window.scrollTo({ top: Math.max(0, top + window.scrollY - margen), behavior: sinMovimiento() ? "auto" : "smooth" });
}

// La barra de compra mobile y el anuncio ancla de AdSense viven pegados abajo: la barra
// de herramientas se para encima de lo que haya, nunca los tapa.
function medirDespeje(): number {
  const alto = window.innerHeight;
  let d = 0;
  const barra = document.querySelector<HTMLElement>(".ca-barra[data-visible='true']");
  if (barra && getComputedStyle(barra).display !== "none") d = Math.max(d, barra.offsetHeight);
  document
    .querySelectorAll<HTMLElement>("ins.adsbygoogle[data-anchor-status='displayed'],ins.adsbygoogle[data-anchor-shown='true']")
    .forEach((ins) => {
      const r = ins.getBoundingClientRect();
      if (r.height > 0 && r.top > alto / 2 && r.top < alto) d = Math.max(d, alto - r.top);
    });
  return Math.round(d);
}

async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function marcarImpresion(): () => void {
  const main = raizPagina();
  const calc = raizCalculadora(main) ?? main;
  if (!calc) return () => {};
  const ruta: Element[] = [];
  for (let n = calc.parentElement; n && n !== document.body; n = n.parentElement) {
    n.setAttribute("data-ca-ruta", "");
    ruta.push(n);
  }
  calc.setAttribute("data-ca-imprimir", "");
  document.documentElement.setAttribute("data-ca-imprimiendo", "");
  return () => {
    for (const n of ruta) n.removeAttribute("data-ca-ruta");
    calc.removeAttribute("data-ca-imprimir");
    document.documentElement.removeAttribute("data-ca-imprimiendo");
  };
}

function datosImpresion(pathname: string): Impresion {
  const main = raizPagina();
  const h1 = main?.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim();
  return {
    titulo: h1 || tituloPagina(main),
    fecha: new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      hourCycle: "h23",
      minute: "2-digit",
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(new Date()),
    ruta: pathname,
  };
}

function campania(pathname: string): string {
  return pathname.split("/").filter(Boolean)[0] || "inicio";
}

export default function Barra({ pathname, motivo, ctx }: { pathname: string; motivo: Motivo; ctx: Contexto }) {
  const [datos, setDatos] = useState(false);
  const [enVista, setEnVista] = useState(true);
  const [escribiendo, setEscribiendo] = useState(false);
  const [hoja, setHoja] = useState<Hoja>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const [despeje, setDespeje] = useState(0);
  const [impresion, setImpresion] = useState<Impresion | null>(null);
  const [tip, setTip] = useState(false);
  const [topAviso, setTopAviso] = useState(0);

  const restaurando = useRef(false);
  const botonGuardar = useRef<HTMLButtonElement>(null);
  const botonCompartir = useRef<HTMLButtonElement>(null);
  const timerCopiado = useRef(0);
  const deshacerImpresion = useRef<(() => void) | null>(null);
  const llevar = useRef(false);
  const refArriba = useRef<HTMLDivElement>(null);

  const campos = useCallback(
    () => serializar(raizPagina(), ctx.base.actual, ctx.registro.lista()),
    [ctx]
  );

  const anunciar = useCallback((texto: string) => {
    setAnuncio("");
    window.setTimeout(() => setAnuncio(texto), 40);
  }, []);

  useEffect(() => {
    let t = 0;
    const medir = () => {
      t = 0;
      if (!restaurando.current) setDatos(hayDatos(campos(), ctx.base.actual));
    };
    const programar = () => {
      if (!t) t = window.setTimeout(medir, 120);
    };
    medir();
    const opc = { capture: true, passive: true } as const;
    document.addEventListener("input", programar, opc);
    document.addEventListener("change", programar, opc);
    document.addEventListener("click", programar, opc);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("input", programar, opc);
      document.removeEventListener("change", programar, opc);
      document.removeEventListener("click", programar, opc);
    };
  }, [campos, ctx]);

  useEffect(() => {
    if (!datos) return;
    const calc = raizCalculadora(raizPagina());
    if (!calc || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), {
      rootMargin: "0px 0px -12% 0px",
    });
    obs.observe(calc);
    return () => obs.disconnect();
  }, [datos]);

  useEffect(() => {
    const tactil = window.matchMedia("(pointer: coarse)");
    let t = 0;
    const esTexto = (el: EventTarget | null) =>
      esControlElegible(el) &&
      !(el instanceof HTMLSelectElement) &&
      !(el instanceof HTMLInputElement && ["checkbox", "radio", "range"].includes(el.type));
    // En el celular el teclado sube y la barra quedaría flotando encima de lo que se tipea;
    // en cualquier pantalla, si el campo con foco queda debajo de la barra, la barra se corre.
    const debajoDeLaBarra = (el: HTMLElement) => {
      const dock = document.querySelector<HTMLElement>(".ca-herr-dock[data-visible='true']");
      if (!dock) return false;
      const r = el.getBoundingClientRect();
      const d = dock.getBoundingClientRect();
      return r.bottom > d.top - 8 && r.top < d.bottom + 8;
    };
    const entra = (e: FocusEvent) => {
      if (!esControlElegible(e.target)) return;
      if ((tactil.matches && esTexto(e.target)) || debajoDeLaBarra(e.target as HTMLElement)) {
        window.clearTimeout(t);
        setEscribiendo(true);
      }
    };
    const sale = (e: FocusEvent) => {
      if (!esControlElegible(e.target)) return;
      window.clearTimeout(t);
      t = window.setTimeout(() => setEscribiendo(false), 160);
    };
    document.addEventListener("focusin", entra, true);
    document.addEventListener("focusout", sale, true);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("focusin", entra, true);
      document.removeEventListener("focusout", sale, true);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      setDespeje(medirDespeje());
    };
    const programar = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    const obsAtributos = new MutationObserver(programar);
    const vigilar = () => {
      obsAtributos.disconnect();
      document.querySelectorAll(".ca-barra, ins.adsbygoogle").forEach((el) =>
        obsAtributos.observe(el, {
          attributes: true,
          attributeFilter: ["data-visible", "style", "data-anchor-status", "data-anchor-shown", "class"],
        })
      );
    };
    const obsBody = new MutationObserver(() => {
      vigilar();
      programar();
    });
    vigilar();
    medir();
    obsBody.observe(document.body, { childList: true });
    window.addEventListener("resize", programar, { passive: true });
    window.addEventListener("scroll", programar, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      obsAtributos.disconnect();
      obsBody.disconnect();
      window.removeEventListener("resize", programar);
      window.removeEventListener("scroll", programar);
    };
  }, []);

  useEffect(() => {
    if (motivo.tipo === "uso") return;
    let vivo = true;
    (async () => {
      const recibidos = motivo.tipo === "compartido" ? camposDeHash(motivo.hash) : motivo.pendiente.campos;
      if (motivo.tipo === "compartido") limpiarHash();
      setTopAviso(alturaHeader() + 10);
      if (!recibidos) {
        setAviso({ tipo: "roto" });
        return;
      }
      restaurando.current = true;
      const lista = await esperarCalculadora();
      const main = raizPagina();
      if (!vivo) return;
      if (!lista || !main) {
        restaurando.current = false;
        if (motivo.tipo === "pendiente") borrarPendiente();
        else setAviso({ tipo: "fallido" });
        return;
      }
      if (!ctx.base.actual) ctx.base.actual = capturarBase(main);
      ctx.registro.limpiar();
      const aplicados = await restaurar(main, recibidos);
      restaurando.current = false;
      if (!vivo) return;
      const total = Object.keys(recibidos.c).length;
      setDatos(hayDatos(serializar(main, ctx.base.actual, ctx.registro.lista()), ctx.base.actual));
      llevar.current = true;
      if (motivo.tipo === "pendiente") {
        setAviso({ tipo: "pendiente", estado: "ofrecer" });
        anunciar("Volvimos a cargar tu cálculo. ¿Lo guardamos en tu cuenta?");
        return;
      }
      const tipo = aplicados >= total ? "compartido" : aplicados === 0 ? "fallido" : "parcial";
      setAviso({ tipo });
      anunciar(
        tipo === "compartido"
          ? "Cargamos los valores que te compartieron."
          : tipo === "parcial"
            ? "Cargamos parte de los valores que te compartieron. Revisá los campos."
            : "No pudimos cargar los valores de este link."
      );
    })();
    return () => {
      vivo = false;
      restaurando.current = false;
    };
  }, [motivo, ctx, anunciar]);

  useEffect(() => {
    if (!aviso || !llevar.current) return;
    llevar.current = false;
    const raf = requestAnimationFrame(() => llevarACalculadora(refArriba.current?.offsetHeight ?? 0));
    return () => cancelAnimationFrame(raf);
  }, [aviso]);

  useEffect(() => {
    if (!aviso) return;
    const vida =
      aviso.tipo === "compartido" ? 9000 : aviso.tipo === "roto" || aviso.tipo === "fallido" || aviso.tipo === "largo" ? 12000 : 0;
    const listo = aviso.tipo === "pendiente" && aviso.estado === "listo" ? 7000 : 0;
    const ms = vida || listo;
    if (!ms) return;
    const t = window.setTimeout(() => setAviso(null), ms);
    return () => window.clearTimeout(t);
  }, [aviso]);

  const prepararImpresion = useCallback(() => {
    if (deshacerImpresion.current) return;
    flushSync(() => setImpresion(datosImpresion(pathname)));
    deshacerImpresion.current = marcarImpresion();
  }, [pathname]);

  useEffect(() => {
    if (!datos) return;
    const despues = () => {
      deshacerImpresion.current?.();
      deshacerImpresion.current = null;
    };
    window.addEventListener("beforeprint", prepararImpresion);
    window.addEventListener("afterprint", despues);
    return () => {
      window.removeEventListener("beforeprint", prepararImpresion);
      window.removeEventListener("afterprint", despues);
      despues();
    };
  }, [datos, prepararImpresion]);

  const dockVisible = datos && (enVista || hoja !== null) && !escribiendo;

  // Con la barra a la vista, Tab y «buscar en la página» dejan lo enfocado por encima de ella.
  useEffect(() => {
    if (!dockVisible) return;
    const html = document.documentElement;
    const antes = html.style.scrollPaddingBottom;
    html.style.scrollPaddingBottom = `${88 + despeje}px`;
    return () => {
      html.style.scrollPaddingBottom = antes;
    };
  }, [dockVisible, despeje]);

  useEffect(() => {
    if (!dockVisible) return;
    let visto = true;
    try {
      visto = localStorage.getItem("ca_herr_tip") === "1";
      if (!visto) localStorage.setItem("ca_herr_tip", "1");
    } catch {}
    if (visto) return;
    const mostrar = window.setTimeout(() => setTip(true), 700);
    const ocultar = window.setTimeout(() => setTip(false), 6200);
    return () => {
      window.clearTimeout(mostrar);
      window.clearTimeout(ocultar);
      setTip(false);
    };
  }, [dockVisible]);

  useEffect(() => () => window.clearTimeout(timerCopiado.current), []);

  const compartir = async () => {
    setTip(false);
    const main = raizPagina();
    const hash = hashDe(campos());
    const nativo = typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches;
    const canal = nativo ? "nativo" : "link";
    const url = `${window.location.origin}${pathname}?utm_source=${canal}&utm_medium=share&utm_campaign=${campania(pathname)}${hash ?? ""}`;
    if (!hash) setAviso({ tipo: "largo" });
    if (nativo) {
      try {
        await navigator.share({
          title: tituloPagina(main),
          text: `Mirá este cálculo de ${tituloPagina(main)} en calcular.ar`,
          url,
        });
        rastrear("compartir", { props: { canal: "nativo" } });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
      }
    }
    rastrear("compartir", { props: { canal: "link" } });
    if (await copiar(url)) {
      setCopiado(true);
      anunciar("Link copiado. Pegalo donde quieras compartir el cálculo.");
      window.clearTimeout(timerCopiado.current);
      timerCopiado.current = window.setTimeout(() => setCopiado(false), 2400);
    } else {
      setHoja({ tipo: "enlace", url });
    }
  };

  const imprimir = () => {
    setTip(false);
    setHoja(null);
    rastrear("imprimir");
    prepararImpresion();
    window.print();
  };

  const abrirGuardar = () => {
    setTip(false);
    setHoja((h) => (h?.tipo === "guardar" ? null : { tipo: "guardar" }));
  };

  const cerrarHoja = useCallback((volverA?: HTMLElement | null) => {
    setHoja(null);
    volverA?.focus();
  }, []);

  const guardarPendiente = async () => {
    if (motivo.tipo !== "pendiente") return;
    const p = motivo.pendiente;
    setAviso({ tipo: "pendiente", estado: "guardando" });
    const r = await guardarCalculo({
      path: pathname,
      titulo: p.titulo || tituloSugerido(raizPagina()),
      campos: p.campos,
      resumen: p.resumen,
    });
    if (r.ok) {
      borrarPendiente();
      rastrear("guardar_calculo", { props: { desde: "pendiente" } });
      setAviso({ tipo: "pendiente", estado: "listo" });
      anunciar("Listo, quedó guardado en tu cuenta.");
    } else {
      if (r.codigo !== "sesion" && r.codigo !== "red") borrarPendiente();
      setAviso({ tipo: "pendiente", estado: "error", error: r.error, codigo: r.codigo });
      anunciar(r.error);
    }
  };

  const empezarDeCero = () => {
    borrarPendiente();
    window.location.replace(pathname);
  };

  const estiloPila = { "--ca-herr-despeje": `${despeje}px` } as CSSProperties;

  const tarjetaAviso = aviso && (
    <AvisoTarjeta
      aviso={aviso}
      pathname={pathname}
      onCerrar={() => {
        if (aviso.tipo === "pendiente" && aviso.estado === "ofrecer") borrarPendiente();
        setAviso(null);
      }}
      onEmpezar={empezarDeCero}
      onGuardarPendiente={guardarPendiente}
    />
  );

  return createPortal(
    <>
      {aviso && aviso.tipo !== "largo" && (
        <div
          ref={refArriba}
          className="ca-herr-arriba"
          data-sin-herramientas=""
          style={{ "--ca-herr-top": `${topAviso}px` } as CSSProperties}
        >
          {tarjetaAviso}
        </div>
      )}
      <div className="ca-herr" data-sin-herramientas="" style={estiloPila}>
        <div className="ca-herr-pila">
          {aviso?.tipo === "largo" && tarjetaAviso}

          {hoja && (
            <>
              {hoja.tipo === "guardar" ? (
                <HojaGuardar
                  pathname={pathname}
                  sesion={haySesion()}
                  tituloInicial={tituloSugerido(raizPagina())}
                  obtener={() => ({ campos: campos(), resumen: resumenDe(raizPagina()) })}
                  onCerrar={(foco) => cerrarHoja(foco ? botonGuardar.current : null)}
                  onGuardado={() => {
                    rastrear("guardar_calculo", { props: { desde: "barra" } });
                    anunciar("Listo, lo guardamos en tu cuenta.");
                  }}
                  excluir={() => [botonGuardar.current]}
                />
              ) : (
                <HojaEnlace
                  url={hoja.url}
                  onCerrar={(foco) => cerrarHoja(foco ? botonCompartir.current : null)}
                  excluir={() => [botonCompartir.current]}
                />
              )}
            </>
          )}

          <p className="ca-herr-tip" data-visible={tip && dockVisible && !hoja} aria-hidden="true">
            Guardalo, compartilo con estos valores o pasalo a PDF.
          </p>

          <div
            role="group"
            aria-label="Herramientas de tu cálculo"
            className="ca-herr-dock"
            data-visible={dockVisible}
            inert={!dockVisible}
          >
            <div className="ca-herr-nucleo">
              <span className="ca-herr-eyebrow" aria-hidden="true">
                Tu cálculo
              </span>
              {CUENTAS_ACTIVAS && (
                <Accion
                  ref={botonGuardar}
                  i={0}
                  primaria
                  icono={<IconoGuardar />}
                  texto="Guardar"
                  aria-label="Guardar este cálculo"
                  aria-haspopup="dialog"
                  aria-expanded={hoja?.tipo === "guardar"}
                  onClick={abrirGuardar}
                />
              )}
              <Accion
                ref={botonCompartir}
                i={1}
                icono={<IconoCompartir />}
                iconoAlt={<IconoCheck />}
                texto="Compartir"
                textoAlt="Copiado"
                alt={copiado}
                aria-label="Compartir este cálculo con los valores cargados"
                onClick={compartir}
              />
              <Accion
                i={2}
                compacta
                icono={<IconoImprimir />}
                texto="Imprimir"
                aria-label="Imprimir o guardar en PDF"
                onClick={imprimir}
              />
            </div>
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {anuncio}
        </p>
      </div>

      {impresion && (
        <>
          <div className="ca-herr-impresion ca-herr-impresion--cabeza" aria-hidden="true">
            <p className="ca-herr-impresion-marca">calcular.ar</p>
            <p className="ca-herr-impresion-titulo">{impresion.titulo}</p>
            <p className="ca-herr-impresion-meta">
              Calculado el {impresion.fecha} · calcular.ar{impresion.ruta}
            </p>
          </div>
          <div className="ca-herr-impresion ca-herr-impresion--pie" aria-hidden="true">
            <p>
              Este cálculo es orientativo: se hizo con los datos oficiales vigentes a la fecha indicada y no
              reemplaza el asesoramiento de un profesional matriculado. Podés volver a hacerlo, con los datos
              al día, en calcular.ar{impresion.ruta}.
            </p>
          </div>
        </>
      )}
    </>,
    document.body
  );
}

type PropsAccion = ComponentPropsWithRef<"button"> & {
  i: number;
  icono: ReactNode;
  iconoAlt?: ReactNode;
  texto: string;
  textoAlt?: string;
  alt?: boolean;
  primaria?: boolean;
  compacta?: boolean;
};

function Accion({ i, icono, iconoAlt, texto, textoAlt, alt = false, primaria, compacta, className, ...props }: PropsAccion) {
  return (
    <button
      type="button"
      className={[
        "ca-herr-accion",
        primaria && "ca-herr-accion--primaria",
        compacta && "ca-herr-accion--compacta",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--i": i } as CSSProperties}
      data-alt={alt}
      {...props}
    >
      <span className="ca-herr-in">
        <span className="ca-herr-apilado ca-herr-icono">
          <span className="ca-herr-uno">{icono}</span>
          {iconoAlt && <span className="ca-herr-dos">{iconoAlt}</span>}
        </span>
        <span className="ca-herr-apilado ca-herr-texto">
          <span className="ca-herr-uno">{texto}</span>
          {textoAlt && <span className="ca-herr-dos">{textoAlt}</span>}
        </span>
      </span>
    </button>
  );
}

function AvisoTarjeta({
  aviso,
  pathname,
  onCerrar,
  onEmpezar,
  onGuardarPendiente,
}: {
  aviso: Aviso;
  pathname: string;
  onCerrar: () => void;
  onEmpezar: () => void;
  onGuardarPendiente: () => void;
}) {
  let cuerpo: ReactNode;
  let acciones: ReactNode = null;
  let tono: "ok" | "guardar" | "alerta" = "alerta";

  switch (aviso.tipo) {
    case "compartido":
      tono = "ok";
      cuerpo = <p className="ca-herr-aviso-titulo">Cargamos los valores que te compartieron.</p>;
      acciones = (
        <button type="button" className="ca-herr-link" onClick={onEmpezar}>
          Empezar de cero
        </button>
      );
      break;
    case "parcial":
      cuerpo = (
        <>
          <p className="ca-herr-aviso-titulo">Cargamos parte de los valores que te compartieron.</p>
          <p className="ca-herr-aviso-texto">Revisá los campos antes de usar el resultado.</p>
        </>
      );
      acciones = (
        <button type="button" className="ca-herr-link" onClick={onEmpezar}>
          Empezar de cero
        </button>
      );
      break;
    case "fallido":
      cuerpo = (
        <>
          <p className="ca-herr-aviso-titulo">No pudimos cargar los valores de este link.</p>
          <p className="ca-herr-aviso-texto">
            Puede que la calculadora haya cambiado desde que lo compartieron. Cargalos a mano y listo.
          </p>
        </>
      );
      break;
    case "roto":
      cuerpo = (
        <>
          <p className="ca-herr-aviso-titulo">Este link llegó incompleto.</p>
          <p className="ca-herr-aviso-texto">
            No pudimos leer los valores. Pedile a quien te lo pasó que lo copie de nuevo.
          </p>
        </>
      );
      break;
    case "largo":
      cuerpo = (
        <>
          <p className="ca-herr-aviso-titulo">Este cálculo no entra en un link.</p>
          <p className="ca-herr-aviso-texto">Compartimos la calculadora sin los valores cargados.</p>
        </>
      );
      break;
    case "pendiente":
      if (aviso.estado === "listo") {
        tono = "ok";
        cuerpo = <p className="ca-herr-aviso-titulo">Listo, quedó guardado en tu cuenta.</p>;
        acciones = (
          <a href="/cuenta" className="ca-herr-link">
            Ver mis cálculos <IconoFlecha className="ca-herr-link-flecha" />
          </a>
        );
      } else if (aviso.estado === "error") {
        cuerpo = (
          <>
            <p className="ca-herr-aviso-titulo">No pudimos guardarlo.</p>
            <p className="ca-herr-aviso-texto">{aviso.error}</p>
          </>
        );
        acciones =
          aviso.codigo === "sesion" ? (
            <a href={`/login?next=${encodeURIComponent(pathname)}`} className="ca-herr-link">
              Ingresar <IconoFlecha className="ca-herr-link-flecha" />
            </a>
          ) : (
            <button type="button" className="ca-herr-link" onClick={onGuardarPendiente}>
              Reintentar
            </button>
          );
      } else {
        tono = "guardar";
        cuerpo = (
          <>
            <p className="ca-herr-aviso-titulo">¿Guardamos el cálculo que estabas haciendo?</p>
            <p className="ca-herr-aviso-texto">Ya lo volvimos a cargar en la calculadora.</p>
          </>
        );
        acciones = (
          <>
            <button
              type="button"
              className="ca-herr-boton"
              onClick={onGuardarPendiente}
              disabled={aviso.estado === "guardando"}
            >
              {aviso.estado === "guardando" ? "Guardando…" : "Guardar"}
            </button>
            <button type="button" className="ca-herr-link" onClick={onCerrar}>
              Ahora no
            </button>
          </>
        );
      }
      break;
  }

  return (
    <div className="ca-herr-aviso">
      <div className="ca-herr-aviso-nucleo">
        <span className="ca-herr-aviso-marca" data-tono={tono} aria-hidden="true">
          {tono === "ok" ? <IconoCheck /> : tono === "guardar" ? <IconoGuardar /> : <span className="ca-herr-aviso-signo">!</span>}
        </span>
        <div className="ca-herr-aviso-cuerpo">
          {cuerpo}
          {acciones && <div className="ca-herr-aviso-acciones">{acciones}</div>}
        </div>
        <button type="button" className="ca-herr-cerrar" aria-label="Cerrar aviso" onClick={onCerrar}>
          <IconoCerrar />
        </button>
      </div>
    </div>
  );
}
