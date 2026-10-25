"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { calcularEscenarios, estadoDelInforme, filaClave, tablasDelInforme, type Escenarios } from "@/lib/pagos/informe-intl";
import type { EscenarioFamilia } from "@/lib/pagos/ofertas-intl";
import { crudosDeEntrada, leerDatosIntl } from "@/lib/prefill/intl-cliente";
import type { DefinicionVisible } from "@/motor/cliente";
import { formatearMoneda, formatearNumero, parsearNumero } from "@/motor/formato";
import { mensajeDeError, opcionesDe, type Crudos, type EstadoCalculo } from "@/motor/formulario";
import { textosMotor } from "@/motor/textos";
import type { Campo, DefinicionCalculadora, PropsCalculadora } from "@/motor/tipos";
import type { ContextoUniversal } from "@/motor/universales/tipos";
import { CARGADORES } from "../../../[slug]/cargadores";

export type TextosInforme = {
  tusDatos: string;
  resultado: string;
  corregir: string;
  actualizar: string;
  imprimir: string;
  imprimirAyuda: string;
  sinResultado: string;
  si: string;
  no: string;
  escenarios: { titulo: string; explica: string } | null;
  nota: {
    titulo: string;
    uso: string;
    pedido: string;
    cierre: string;
    lugar: string;
    destinatario: string;
    firma: string;
    nombre: string;
    documento: string;
    etiquetaEnMinuscula: boolean;
    anchoCompleto: boolean;
  } | null;
};

function textoCrudo(c: Campo, v: string | boolean | undefined, props: PropsCalculadora, textos: Pick<TextosInforme, "si" | "no">): string {
  if (typeof v === "boolean") return v ? textos.si : textos.no;
  if (c.tipo === "opcion" || c.tipo === "region" || c.tipo === "opcion-dato") return opcionesDe(c, props.contexto, props.opcionesDinamicas).find((o) => o.valor === v)?.etiqueta ?? String(v ?? "");
  if (c.tipo === "fecha" && typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    return new Intl.DateTimeFormat(props.contexto.locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${v}T00:00:00Z`));
  }
  if ((c.tipo === "moneda" || c.tipo === "numero" || c.tipo === "entero" || c.tipo === "porcentaje") && typeof v === "string") {
    const n = parsearNumero(v, props.contexto.locale);
    if (n === null) return v;
    if (c.tipo === "moneda") {
      const moneda = c.moneda ?? props.contexto.moneda;
      return formatearMoneda(n, props.contexto.locale, moneda, undefined, props.contexto.simbolos?.[moneda]);
    }
    return c.tipo === "porcentaje" ? `${formatearNumero(n, props.contexto.locale)} %` : formatearNumero(n, props.contexto.locale);
  }
  return String(v ?? "");
}

// La parte del informe que depende de los números: datos, resultado, escenarios y nota. Arranca con
// lo que calculó el servidor (sin esperar nada) y, si la persona corrige un dato, recalcula en el
// navegador con la misma definición que usa la calculadora. Las tablas del resultado van enteras: la
// página gratis muestra las primeras filas y el informe es donde está el resto.
export function InformeVivo({
  mercado,
  slug,
  universal,
  permitidas,
  producto,
  definicion,
  props,
  crudosIniciales,
  conDatos,
  estadoInicial,
  escenariosIniciales,
  escenario,
  textos,
  medio,
}: {
  mercado: string;
  slug: string;
  universal?: { id: string; contexto: ContextoUniversal };
  permitidas: readonly string[];
  producto: string;
  definicion: DefinicionVisible & Pick<DefinicionCalculadora, "tablas">;
  props: PropsCalculadora;
  crudosIniciales: Crudos;
  conDatos: boolean;
  estadoInicial: EstadoCalculo;
  escenariosIniciales: Escenarios | null;
  escenario: EscenarioFamilia | null;
  textos: TextosInforme;
  medio: ReactNode;
}) {
  const [crudos, setCrudos] = useState<Crudos>(crudosIniciales);
  const [usados, setUsados] = useState<Crudos>(crudosIniciales);
  const [estado, setEstado] = useState<EstadoCalculo>(estadoInicial);
  const [escenarios, setEscenarios] = useState<Escenarios | null>(escenariosIniciales);
  const motor = useMemo(() => textosMotor(props.contexto.idioma, props.contexto.trato), [props.contexto.idioma, props.contexto.trato]);

  const recalcular = useCallback(
    (nuevos: Crudos) => {
      const cargador = CARGADORES[mercado]?.[slug];
      if (!universal && !cargador) {
        console.error(`[informe] sin cargador para ${mercado}/${slug}`);
        return;
      }
      const cargar = universal
        ? import("@/motor/universales/cargadores").then(({ cargarUniversal }) => cargarUniversal(universal.id, universal.contexto))
        : cargador!().then((m) => m.default as DefinicionCalculadora);
      cargar
        .then((def) => {
          setUsados(nuevos);
          setEstado(estadoDelInforme(def, nuevos, props, motor));
          setEscenarios(escenario ? calcularEscenarios(def, escenario, nuevos, props, motor) : null);
        })
        .catch((e) => {
          console.error("[informe] no pude cargar la calculadora", e);
          setEstado({ tipo: "fallo", mensaje: motor.errores["calculo-fallido"] });
        });
    },
    [mercado, slug, universal, props, motor, escenario],
  );

  // Sin datos en el servidor (base sin la columna, o compra sin datos): los del navegador, si son de
  // esta misma calculadora.
  useEffect(() => {
    if (conDatos) return;
    const d = leerDatosIntl(producto);
    if (!d) return;
    if (d.calc !== slug) {
      // Lo guardado es de otra calculadora de la misma familia: la página se elige por URL.
      if (permitidas.includes(d.calc)) {
        const u = new URL(location.href);
        u.searchParams.set("calc", d.calc);
        location.replace(u.toString());
      }
      return;
    }
    const nuevos = crudosDeEntrada(definicion.campos, d.entrada, props.contexto.locale, crudosIniciales);
    setCrudos(nuevos);
    recalcular(nuevos);
  }, [conDatos, producto, slug, permitidas, definicion.campos, props.contexto.locale, crudosIniciales, recalcular]);

  const clave = estado.tipo === "ok" ? filaClave(estado.filas) : null;
  const tablas = useMemo(() => (estado.tipo === "ok" ? tablasDelInforme(definicion.tablas, estado.resultado, props.contexto) : []), [estado, definicion.tablas, props.contexto]);
  const errorDe = (id: string) => (estado.tipo === "errores" && estado.errores[id] ? mensajeDeError(estado.errores[id], motor) : null);

  return (
    <>
      <div className="cy-informe-pantalla cy-informe-barra">
        <p>{textos.imprimirAyuda}</p>
        <button type="button" className="cy-boton cy-boton-principal" onClick={() => window.print()} data-evento="imprimir" data-producto={producto}>
          <span>{textos.imprimir}</span>
        </button>
      </div>

      <details className="cy-informe-pantalla cy-informe-editar" open={!conDatos && estado.tipo !== "ok"}>
        <summary>{textos.corregir}</summary>
        <form
          className="cy-calc-form"
          style={{ paddingInline: 0 }}
          onSubmit={(ev) => {
            ev.preventDefault();
            recalcular(crudos);
          }}
        >
          <div className="cy-calc-campos">
            {definicion.campos.map((c) => (
              <CampoInforme key={c.id} campo={c} valor={crudos[c.id]} props={props} error={errorDe(c.id)} cambiar={(v) => setCrudos((x) => ({ ...x, [c.id]: v }))} />
            ))}
          </div>
          <button type="submit" className="cy-boton cy-boton-principal">
            <span>{textos.actualizar}</span>
          </button>
        </form>
      </details>

      <section>
        <h2>{textos.tusDatos}</h2>
        <table className="cy-informe-tabla">
          <tbody>
            {definicion.campos
              .filter((c) => usados[c.id] !== "" && usados[c.id] !== undefined)
              .map((c) => (
                <tr key={c.id}>
                  <td>{c.etiqueta}</td>
                  <td>{textoCrudo(c, usados[c.id], props, textos)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>{textos.resultado}</h2>
        {estado.tipo === "ok" ? (
          <>
            <table className="cy-informe-tabla">
              <tbody>
                {estado.filas.map((f) => (
                  <tr key={f.clave} data-destacada={f.destacada || undefined}>
                    <td>
                      {f.etiqueta}
                      {f.ayuda ? <span className="cy-informe-ayuda">{f.ayuda}</span> : null}
                    </td>
                    <td>{f.texto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {estado.observaciones.length ? (
              <ul className="cy-informe-lista cy-informe-notas">
                {estado.observaciones.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="cy-informe-notas">{estado.tipo === "fallo" ? estado.mensaje : textos.sinResultado}</p>
        )}
      </section>

      {tablas.map((t) => (
        <section key={t.clave}>
          <h2>{t.titulo}</h2>
          <div className="cy-informe-desplazable">
          <table className="cy-informe-tabla cy-informe-tabla-completa">
            <thead>
              <tr>
                {t.columnas.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.filas.map((f, i) => (
                <tr key={i}>
                  {f.map((v, j) => (
                    <td key={t.columnas[j]}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      ))}

      {escenarios && textos.escenarios && estado.tipo === "ok" ? (
        <section>
          <h2>{textos.escenarios.titulo}</h2>
          <p className="cy-informe-notas" style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            {textos.escenarios.explica}
          </p>
          <table className="cy-informe-tabla">
            <thead>
              <tr>
                <th>{escenarios.campo}</th>
                {escenarios.columnas.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escenarios.filas.map((f) => (
                <tr key={f.valor} data-actual={f.actual || undefined}>
                  <td>{f.valor}</td>
                  {f.resultados.map((r, i) => (
                    <td key={escenarios.columnas[i]}>{r}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      {medio}

      {textos.nota && clave ? (
        <section>
          <h2>{textos.nota.titulo}</h2>
          <p className="cy-informe-nota-uso cy-informe-pantalla">{textos.nota.uso}</p>
          <div className="cy-informe-nota">
            <p>
              {textos.nota.lugar}
              {textos.nota.anchoCompleto ? "：" : ": "}
              <span className="cy-informe-raya" />
            </p>
            <p>
              {textos.nota.destinatario}
              {textos.nota.anchoCompleto ? "：" : ": "}
              <span className="cy-informe-raya" />
            </p>
            {textos.nota.anchoCompleto ? (
              <p>
                {textos.nota.pedido}
                <strong>{clave.texto}</strong>（{clave.etiqueta}）。
              </p>
            ) : (
              <p>
                {textos.nota.pedido}{" "}
                {/* bdi: en rtl el monto (cifras latinas, símbolo de moneda) no se mezcla con el paréntesis. */}
                <strong>
                  <bdi>{clave.texto}</bdi>
                </strong>{" "}
                ({textos.nota.etiquetaEnMinuscula ? clave.etiqueta.toLowerCase() : clave.etiqueta}).
              </p>
            )}
            <p>{textos.nota.cierre}</p>
            <div className="cy-informe-firmas">
              <span>{textos.nota.firma}</span>
              <span>{textos.nota.nombre}</span>
              <span>{textos.nota.documento}</span>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function CampoInforme({ campo, valor, props, error, cambiar }: { campo: Campo; valor: string | boolean | undefined; props: PropsCalculadora; error: string | null; cambiar: (v: string | boolean) => void }) {
  const id = `inf-${campo.id}`;
  let control: ReactNode;
  if (campo.tipo === "si-no") {
    control = (
      <label className="cy-casilla">
        <input id={id} type="checkbox" checked={valor === true} onChange={(e) => cambiar(e.target.checked)} />
        <span>{campo.etiqueta}</span>
      </label>
    );
    return <div className="cy-campo">{control}</div>;
  }
  if (campo.tipo === "opcion" || campo.tipo === "region" || campo.tipo === "opcion-dato") {
    control = (
      <div className="cy-entrada cy-entrada-select">
        <select id={id} value={String(valor ?? "")} onChange={(e) => cambiar(e.target.value)}>
          <option value="" disabled>
            {"…"}
          </option>
          {opcionesDe(campo, props.contexto, props.opcionesDinamicas).map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.etiqueta}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    control = (
      <div className="cy-entrada">
        <input
          id={id}
          type={campo.tipo === "fecha" ? "date" : "text"}
          inputMode={campo.tipo === "fecha" ? undefined : campo.tipo === "entero" ? "numeric" : "decimal"}
          autoComplete="off"
          value={String(valor ?? "")}
          onChange={(e) => cambiar(e.target.value)}
        />
      </div>
    );
  }
  return (
    <div className="cy-campo" data-error={error ? true : undefined}>
      <label htmlFor={id} className="cy-campo-etiqueta">
        {campo.etiqueta}
      </label>
      {control}
      {error ? (
        <p className="cy-campo-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
