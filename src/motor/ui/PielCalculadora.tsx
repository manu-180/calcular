import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import type { CalculadoraControlada } from "../cliente";
import { textosCalculadora } from "../i18n/calculadora";
import type { AvisoResuelto, Campo, ContextoSerializado, Moneda } from "../tipos";
import { IconoAlerta, IconoExterno, IconoFlecha, IconoInfo } from "./Iconos";

// Con pocas opciones un control segmentado se lee de un vistazo y se elige de un toque; con más,
// un select ocupa menos y no rompe la grilla en el teléfono.
const MAX_SEGMENTADO = 3;
// Una etiqueta larga en un segmento se parte en tres renglones; ahí las opciones van apiladas.
const MAX_LARGO_SEGMENTO = 14;

function simboloDe(contexto: ContextoSerializado, moneda: Moneda): string {
  const propio = contexto.simbolos?.[moneda];
  if (propio) return propio;
  const partes = new Intl.NumberFormat(contexto.locale, { style: "currency", currency: moneda }).formatToParts(0);
  return partes.find((p) => p.type === "currency")?.value ?? moneda;
}

export function AvisoCalculadora({ aviso, etiqueta, fuente }: { aviso: AvisoResuelto; etiqueta: string; fuente: string }) {
  return (
    <aside className="cy-aviso" data-nivel={aviso.nivel}>
      <span className="cy-aviso-icono">{aviso.nivel === "info" ? <IconoInfo /> : <IconoAlerta />}</span>
      <div>
        <p className="cy-aviso-titulo">{aviso.titulo ?? etiqueta}</p>
        <p>{aviso.texto}</p>
        {aviso.fuente.url.startsWith("https://") ? (
          <a className="cy-aviso-fuente" href={aviso.fuente.url} rel="noopener" target="_blank">
            {fuente}: {aviso.fuente.organismo}
            <IconoExterno />
          </a>
        ) : null}
      </div>
    </aside>
  );
}

function CampoPiel({ campo, control, idBase, contexto }: { campo: Campo; control: CalculadoraControlada; idBase: string; contexto: ContextoSerializado }) {
  const id = `${idBase}-${campo.id}`;
  const error = control.error(campo.id);
  const describe = [campo.ayuda ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const valor = control.crudos[campo.id];
  const comunes = { id, name: campo.id, "aria-invalid": error ? true : undefined, "aria-describedby": describe };
  const pie = (
    <>
      {campo.ayuda ? (
        <p id={`${id}-ayuda`} className="cy-campo-ayuda">
          {campo.ayuda}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="cy-campo-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );

  if (campo.tipo === "si-no") {
    return (
      <div className="cy-campo cy-campo-interruptor" data-campo={campo.id} data-error={error ? true : undefined}>
        <label htmlFor={id} className="cy-interruptor">
          <span className="cy-campo-etiqueta">{campo.etiqueta}</span>
          <input {...comunes} type="checkbox" role="switch" checked={valor === true} onChange={(ev) => control.cambiar(campo.id, ev.target.checked)} />
          <span className="cy-interruptor-pista" aria-hidden="true" />
        </label>
        {pie}
      </div>
    );
  }

  if (campo.tipo === "opcion" || campo.tipo === "region" || campo.tipo === "opcion-dato") {
    const opciones = control.opciones(campo);
    if (opciones.length > 1 && opciones.length <= MAX_SEGMENTADO) {
      return (
        <fieldset className="cy-campo" data-campo={campo.id} data-error={error ? true : undefined} aria-describedby={describe}>
          <legend className="cy-campo-etiqueta">{campo.etiqueta}</legend>
          <div className="cy-segmentado" data-apilado={opciones.some((o) => o.etiqueta.length > MAX_LARGO_SEGMENTO) || undefined} style={{ "--n": opciones.length } as CSSProperties}>
            {opciones.map((o) => (
              <label key={o.valor} className="cy-segmento">
                <input type="radio" name={id} value={o.valor} checked={valor === o.valor} onChange={() => control.cambiar(campo.id, o.valor)} />
                <span>{o.etiqueta}</span>
              </label>
            ))}
          </div>
          {pie}
        </fieldset>
      );
    }
    return (
      <div className="cy-campo" data-campo={campo.id} data-error={error ? true : undefined}>
        <label htmlFor={id} className="cy-campo-etiqueta">
          {campo.etiqueta}
        </label>
        <div className="cy-entrada cy-entrada-select">
          <select {...comunes} value={String(valor ?? "")} required={campo.requerido !== false} onChange={(ev) => control.cambiar(campo.id, ev.target.value)}>
            <option value="" disabled>
              {"…"}
            </option>
            {opciones.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.etiqueta}
              </option>
            ))}
          </select>
        </div>
        {pie}
      </div>
    );
  }

  const prefijo = campo.tipo === "moneda" ? simboloDe(contexto, campo.moneda ?? contexto.moneda) : null;
  const sufijo = campo.tipo === "porcentaje" ? "%" : null;
  return (
    <div className="cy-campo" data-campo={campo.id} data-error={error ? true : undefined}>
      <label htmlFor={id} className="cy-campo-etiqueta">
        {campo.etiqueta}
      </label>
      <div className="cy-entrada">
        {prefijo ? (
          <span className="cy-entrada-afijo" aria-hidden="true">
            {prefijo}
          </span>
        ) : null}
        {campo.tipo === "fecha" ? (
          <input {...comunes} type="date" value={String(valor ?? "")} min={campo.min} max={campo.max} onChange={(ev) => control.cambiar(campo.id, ev.target.value)} />
        ) : (
          <input
            {...comunes}
            type="text"
            inputMode={campo.tipo === "entero" ? "numeric" : "decimal"}
            autoComplete="off"
            value={String(valor ?? "")}
            onChange={(ev) => control.cambiar(campo.id, ev.target.value)}
          />
        )}
        {sufijo ? (
          <span className="cy-entrada-afijo" aria-hidden="true">
            {sufijo}
          </span>
        ) : null}
      </div>
      {pie}
    </div>
  );
}

export function PielCalculadora({
  id,
  control,
  contexto,
  avisos,
}: {
  id: string;
  control: CalculadoraControlada;
  contexto: ContextoSerializado;
  avisos: readonly AvisoResuelto[];
}) {
  const idBase = useId();
  const t = useMemo(() => textosCalculadora(contexto.idioma, contexto.trato), [contexto.idioma, contexto.trato]);
  const panel = useRef<HTMLDivElement>(null);
  const [vuelta, setVuelta] = useState(0);
  const { estado } = control;

  const enviar = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    control.calcular();
  };

  // Cada resultado nuevo cuenta una vuelta: la key reinicia la animación de las filas. El cálculo
  // puede llegar un instante después del clic (si el código de la calculadora todavía bajaba).
  useEffect(() => {
    if (estado.tipo === "ok") setVuelta((v) => v + 1);
  }, [estado]);

  // En el teléfono el resultado queda debajo del formulario: se lo acerca, sin saltar si ya se ve.
  useEffect(() => {
    if (vuelta === 0 || !panel.current) return;
    const r = panel.current.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.75) {
      const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.current.scrollIntoView({ block: "nearest", behavior: quieto ? "auto" : "smooth" });
    }
  }, [vuelta]);

  return (
    <div className="cy-calc" data-calculadora={id}>
      {avisos
        .filter((a) => a.nivel !== "bloquea")
        .map((a) => (
          <AvisoCalculadora key={a.id} aviso={a} etiqueta={t.avisos[a.nivel]} fuente={t.fuenteDelAviso} />
        ))}
      <div className="cy-bisel">
        <div className="cy-bisel-nucleo cy-calc-cuerpo">
          <form className="cy-calc-form" onSubmit={enviar} noValidate>
            <p className="cy-calc-rotulo">{t.datos}</p>
            <div className="cy-calc-campos">
              {control.campos.map((c) => (
                <CampoPiel key={c.id} campo={c} control={control} idBase={idBase} contexto={contexto} />
              ))}
            </div>
            <button type="submit" className="cy-boton cy-boton-principal" disabled={estado.tipo === "bloqueado"}>
              <span>{control.textos.calcular}</span>
              <span className="cy-boton-icono">
                <IconoFlecha />
              </span>
            </button>
          </form>
          <div className="cy-calc-resultado" ref={panel} aria-live="polite" data-estado={estado.tipo}>
            <p className="cy-calc-rotulo">{t.resultado}</p>
            {estado.tipo === "ok" ? (
              <div key={vuelta} className="cy-resultado">
                <dl className="cy-resultado-filas">
                  {estado.filas.map((f, i) => (
                    <div key={f.clave} className="cy-resultado-fila" data-destacada={f.destacada || undefined} style={{ "--i": i } as CSSProperties}>
                      <dt>{f.etiqueta}</dt>
                      <dd>{f.texto}</dd>
                      {f.ayuda ? <p className="cy-resultado-ayuda">{f.ayuda}</p> : null}
                    </div>
                  ))}
                </dl>
                {estado.observaciones.length ? (
                  <ul className="cy-resultado-notas">
                    {estado.observaciones.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : estado.tipo === "bloqueado" ? (
              <div className="cy-resultado-bloqueado">
                <p className="cy-resultado-vacio">{t.sinResultado}</p>
                {estado.avisos.map((a) => (
                  <AvisoCalculadora key={a.id} aviso={a} etiqueta={t.avisos.bloquea} fuente={t.fuenteDelAviso} />
                ))}
              </div>
            ) : estado.tipo === "fallo" ? (
              <p className="cy-campo-error" role="alert">
                {estado.mensaje}
              </p>
            ) : (
              <p className="cy-resultado-vacio">{t.vacio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
