import { useId, useMemo, type CSSProperties, type FormEvent } from "react";
import type { CalculadoraControlada } from "../cliente";
import { textosCalculadora } from "../i18n/calculadora";
import type { AvisoResuelto, Campo, ContextoSerializado, DefinicionCalculadora, Moneda } from "../tipos";
import { IconoExterno } from "./Iconos";
import { OfertaResultado } from "./Oferta";
import { TablasResultado } from "./TablaResultado";

// La piel copia la de las calculadoras de calcular.ar (src/components/Calculadora*.tsx): tarjeta con
// borde esmeralda, campos de a dos, foco verde y el resultado en una caja gris que se recalcula con
// cada cambio. Si allá cambia el patrón, se cambia acá.

// Con pocas opciones van botones lado a lado, como los semestres de /aguinaldo; con más, un select.
const MAX_SEGMENTADO = 3;
// Una etiqueta larga en un botón se parte en tres renglones; ahí las opciones van apiladas.
const MAX_LARGO_SEGMENTO = 14;

function simboloDe(contexto: ContextoSerializado, moneda: Moneda): string {
  const propio = contexto.simbolos?.[moneda];
  if (propio) return propio;
  const partes = new Intl.NumberFormat(contexto.locale, { style: "currency", currency: moneda }).formatToParts(0);
  return partes.find((p) => p.type === "currency")?.value ?? moneda;
}

export function AvisoCalculadora({ aviso, etiqueta, fuente }: { aviso: AvisoResuelto; etiqueta: string; fuente: string }) {
  return (
    <aside className="cy-nota" data-nivel={aviso.nivel}>
      <p className="cy-nota-titulo">{aviso.titulo ?? etiqueta}</p>
      <p>{aviso.texto}</p>
      {aviso.fuente.url.startsWith("https://") ? (
        <a className="cy-nota-fuente" href={aviso.fuente.url} rel="noopener" target="_blank">
          {fuente}: {aviso.fuente.organismo}
          <IconoExterno />
        </a>
      ) : null}
    </aside>
  );
}

function esSegmentado(campo: Campo, control: CalculadoraControlada): boolean {
  if (campo.tipo !== "opcion" && campo.tipo !== "region" && campo.tipo !== "opcion-dato") return false;
  const n = control.opciones(campo).length;
  return n > 1 && n <= MAX_SEGMENTADO;
}

function CampoPiel({ campo, control, idBase, contexto, ancho }: { campo: Campo; control: CalculadoraControlada; idBase: string; contexto: ContextoSerializado; ancho: boolean }) {
  const id = `${idBase}-${campo.id}`;
  const error = control.error(campo.id);
  const describe = [campo.ayuda ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const valor = control.crudos[campo.id];
  const comunes = { id, name: campo.id, "aria-invalid": error ? true : undefined, "aria-describedby": describe };
  const marca = { "data-campo": campo.id, "data-error": error ? true : undefined, "data-ancho": ancho || undefined };
  const ayuda = campo.ayuda ? (
    <p id={`${id}-ayuda`} className="cy-campo-ayuda">
      {campo.ayuda}
    </p>
  ) : null;
  const mensaje = error ? (
    <p id={`${id}-error`} className="cy-campo-error" role="alert">
      {error}
    </p>
  ) : null;

  if (campo.tipo === "si-no") {
    return (
      <div className="cy-campo" {...marca}>
        <label htmlFor={id} className="cy-casilla">
          <input {...comunes} type="checkbox" checked={valor === true} onChange={(ev) => control.cambiar(campo.id, ev.target.checked)} />
          <span>
            {campo.etiqueta}
            {campo.ayuda ? (
              <span id={`${id}-ayuda`} className="cy-casilla-ayuda">
                {campo.ayuda}
              </span>
            ) : null}
          </span>
        </label>
        {mensaje}
      </div>
    );
  }

  if (campo.tipo === "opcion" || campo.tipo === "region" || campo.tipo === "opcion-dato") {
    const opciones = control.opciones(campo);
    if (esSegmentado(campo, control)) {
      return (
        <fieldset className="cy-campo" {...marca} aria-describedby={describe}>
          <legend className="cy-campo-etiqueta">{campo.etiqueta}</legend>
          {ayuda}
          <div className="cy-segmentado" data-apilado={opciones.some((o) => o.etiqueta.length > MAX_LARGO_SEGMENTO) || undefined} style={{ "--n": opciones.length } as CSSProperties}>
            {opciones.map((o) => (
              <label key={o.valor} className="cy-segmento">
                <input type="radio" name={id} value={o.valor} checked={valor === o.valor} onChange={() => control.cambiar(campo.id, o.valor)} />
                <span>{o.etiqueta}</span>
              </label>
            ))}
          </div>
          {mensaje}
        </fieldset>
      );
    }
    return (
      <div className="cy-campo" {...marca}>
        <label htmlFor={id} className="cy-campo-etiqueta">
          {campo.etiqueta}
        </label>
        {ayuda}
        <select {...comunes} className="cy-select" value={String(valor ?? "")} required={campo.requerido !== false} onChange={(ev) => control.cambiar(campo.id, ev.target.value)}>
          <option value="" disabled>
            {"…"}
          </option>
          {opciones.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.etiqueta}
            </option>
          ))}
        </select>
        {mensaje}
      </div>
    );
  }

  const prefijo = campo.tipo === "moneda" ? simboloDe(contexto, campo.moneda ?? contexto.moneda) : null;
  const sufijo = campo.tipo === "porcentaje" ? "%" : null;
  return (
    <div className="cy-campo" {...marca}>
      <label htmlFor={id} className="cy-campo-etiqueta">
        {campo.etiqueta}
      </label>
      {ayuda}
      <div className="cy-entrada" data-moneda={prefijo ? true : undefined}>
        {prefijo ? (
          <span className="cy-entrada-afijo" aria-hidden="true">
            {prefijo}
          </span>
        ) : null}
        {campo.tipo === "fecha" ? (
          <input {...comunes} type="date" value={String(valor ?? "")} min={campo.min} max={campo.max} onChange={(ev) => control.cambiar(campo.id, ev.target.value)} />
        ) : campo.tipo === "hora" ? (
          <input {...comunes} type="time" value={String(valor ?? "")} min={campo.min} max={campo.max} onChange={(ev) => control.cambiar(campo.id, ev.target.value)} />
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
      {mensaje}
    </div>
  );
}

export function PielCalculadora({
  id,
  control,
  contexto,
  avisos,
  tablas,
}: {
  id: string;
  control: CalculadoraControlada;
  contexto: ContextoSerializado;
  avisos: readonly AvisoResuelto[];
  tablas?: DefinicionCalculadora["tablas"];
}) {
  const idBase = useId();
  const t = useMemo(() => textosCalculadora(contexto.idioma, contexto.trato, contexto.locale), [contexto.idioma, contexto.trato, contexto.locale]);
  const { estado, campos } = control;
  const notas = avisos.filter((a) => a.nivel !== "bloquea");

  // Enter en un campo no recarga la página: el resultado ya está al día.
  const enviar = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    control.calcular();
  };

  // Como en /horas-extras: el primer campo de plata va a lo ancho y los demás de a dos. Casillas y
  // botones de opción también van a lo ancho, porque su texto no entra en media columna. Un campo
  // que quedaría solo en su fila (le sigue uno ancho, o es el último) se estira para no dejar hueco.
  const anchos = useMemo(() => {
    const propios = campos.map((c, i) => c.tipo === "si-no" || esSegmentado(c, control) || (i === 0 && c.tipo === "moneda"));
    let columna = 0;
    return propios.map((ancho, i) => {
      if (ancho) {
        columna = 0;
        return true;
      }
      const solo = columna === 0 && (i === propios.length - 1 || propios[i + 1]);
      columna = solo ? 0 : 1 - columna;
      return solo;
    });
  }, [campos, control]);

  const filas = estado.tipo === "ok" ? estado.filas : [];
  const principal = filas.find((f) => f.destacada);
  const resto = filas.filter((f) => f !== principal);

  return (
    <div className="cy-calc" data-calculadora={id}>
      <form onSubmit={enviar} noValidate>
        <div className="cy-calc-campos">
          {campos.map((c, i) => (
            <CampoPiel key={c.id} campo={c} control={control} idBase={idBase} contexto={contexto} ancho={anchos[i]} />
          ))}
        </div>
      </form>
      <div className="cy-calc-resultado" aria-live="polite" data-estado={estado.tipo}>
        {estado.tipo === "ok" ? (
          <div className="cy-resultado">
            {principal ? (
              <>
                <p className="cy-resultado-rotulo">{principal.etiqueta}</p>
                <p className="cy-resultado-cifra">{principal.texto}</p>
                {principal.ayuda ? <p className="cy-resultado-bajada">{principal.ayuda}</p> : null}
              </>
            ) : null}
            {resto.length ? (
              <dl className="cy-resultado-filas">
                {resto.map((f) => (
                  <div key={f.clave} className="cy-resultado-fila" data-destacada={f.destacada || undefined}>
                    <dt>
                      <span>{f.etiqueta}</span>
                      {f.ayuda ? <span className="cy-resultado-ayuda">{f.ayuda}</span> : null}
                    </dt>
                    <dd>{f.texto}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {estado.observaciones.length ? (
              <ul className="cy-resultado-notas">
                {estado.observaciones.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : estado.tipo === "bloqueado" ? (
          <div className="cy-resultado">
            <p className="cy-resultado-rotulo">{t.sinResultado}</p>
            {estado.avisos.map((a) => (
              <AvisoCalculadora key={a.id} aviso={a} etiqueta={t.avisos.bloquea} fuente={t.fuenteDelAviso} />
            ))}
          </div>
        ) : estado.tipo === "fallo" ? (
          <p className="cy-nota" data-nivel="bloquea" role="alert">
            {estado.mensaje}
          </p>
        ) : null}
      </div>
      {/* Fuera de la región aria-live: con cada tecla se leería la tabla entera. */}
      {estado.tipo === "ok" && tablas?.length ? <TablasResultado tablas={tablas} resultado={estado.resultado} contexto={contexto} /> : null}
      {notas.length ? (
        <div className="cy-calc-notas">
          {notas.map((a) => (
            <AvisoCalculadora key={a.id} aviso={a} etiqueta={t.avisos[a.nivel]} fuente={t.fuenteDelAviso} />
          ))}
        </div>
      ) : null}
      <OfertaResultado calculadora={id} control={control} contexto={contexto} />
    </div>
  );
}
