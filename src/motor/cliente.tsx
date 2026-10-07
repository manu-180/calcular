"use client";

import { useCallback, useId, useMemo, useState, type ComponentType, type FormEvent } from "react";
import { ejecutar, mensajeDeError, opcionesDe, valoresIniciales, type Crudos, type EstadoCalculo } from "./formulario";
import { textosMotor, type TextosMotor } from "./textos";
import type { Campo, DefinicionCalculadora, OpcionDinamica, PropsCalculadora, Requisitos, ResultadoBase } from "./tipos";

export interface CalculadoraControlada {
  campos: readonly Campo[];
  crudos: Crudos;
  estado: EstadoCalculo;
  textos: TextosMotor;
  opciones: (campo: Campo) => readonly OpcionDinamica[];
  error: (idCampo: string) => string | null;
  cambiar: (idCampo: string, valor: string | boolean) => void;
  calcular: () => void;
}

export function useCalculadora(definicion: DefinicionCalculadora, props: PropsCalculadora): CalculadoraControlada {
  const textos = useMemo(() => textosMotor(props.contexto.idioma, props.contexto.trato), [props.contexto.idioma, props.contexto.trato]);
  const [crudos, setCrudos] = useState<Crudos>(() => valoresIniciales(definicion.campos, props.contexto, props.opcionesDinamicas));
  const [estado, setEstado] = useState<EstadoCalculo>(() =>
    props.avisos.some((a) => a.nivel === "bloquea") ? { tipo: "bloqueado", avisos: props.avisos.filter((a) => a.nivel === "bloquea") } : { tipo: "inicial" },
  );

  const cambiar = useCallback((idCampo: string, valor: string | boolean) => setCrudos((prev) => ({ ...prev, [idCampo]: valor })), []);
  const calcular = useCallback(() => setEstado(ejecutar(definicion, crudos, props, textos)), [definicion, crudos, props, textos]);
  const error = useCallback(
    (idCampo: string) => (estado.tipo === "errores" && estado.errores[idCampo] ? mensajeDeError(estado.errores[idCampo], textos) : null),
    [estado, textos],
  );
  const opciones = useCallback((campo: Campo) => opcionesDe(campo, props.contexto, props.opcionesDinamicas), [props.contexto, props.opcionesDinamicas]);

  return { campos: definicion.campos, crudos, estado, textos, opciones, error, cambiar, calcular };
}

function CampoBasico({ campo, control, idBase }: { campo: Campo; control: CalculadoraControlada; idBase: string }) {
  const id = `${idBase}-${campo.id}`;
  const error = control.error(campo.id);
  const describe = [campo.ayuda ? `${id}-ayuda` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const valor = control.crudos[campo.id];
  const comunes = { id, name: campo.id, "aria-invalid": error ? true : undefined, "aria-describedby": describe };

  let entrada;
  if (campo.tipo === "si-no") {
    entrada = <input {...comunes} type="checkbox" checked={valor === true} onChange={(ev) => control.cambiar(campo.id, ev.target.checked)} />;
  } else if (campo.tipo === "opcion" || campo.tipo === "region" || campo.tipo === "opcion-dato") {
    entrada = (
      <select {...comunes} value={String(valor ?? "")} required={campo.requerido !== false} onChange={(ev) => control.cambiar(campo.id, ev.target.value)}>
        <option value="" disabled>
          {"…"}
        </option>
        {control.opciones(campo).map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.etiqueta}
          </option>
        ))}
      </select>
    );
  } else if (campo.tipo === "fecha") {
    entrada = <input {...comunes} type="date" value={String(valor ?? "")} min={campo.min} max={campo.max} onChange={(ev) => control.cambiar(campo.id, ev.target.value)} />;
  } else {
    entrada = (
      <input
        {...comunes}
        type="text"
        inputMode={campo.tipo === "entero" ? "numeric" : "decimal"}
        autoComplete="off"
        value={String(valor ?? "")}
        onChange={(ev) => control.cambiar(campo.id, ev.target.value)}
      />
    );
  }

  return (
    <div data-campo={campo.id}>
      <label htmlFor={id}>{campo.etiqueta}</label>
      {entrada}
      {campo.ayuda ? <p id={`${id}-ayuda`}>{campo.ayuda}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ResultadoBasico({ control }: { control: CalculadoraControlada }) {
  const { estado, textos } = control;
  if (estado.tipo === "bloqueado") {
    return (
      <div>
        <p>{textos.sinResultado}</p>
        {estado.avisos.map((a) => (
          <p key={a.id}>{a.texto}</p>
        ))}
      </div>
    );
  }
  if (estado.tipo === "fallo") return <p role="alert">{estado.mensaje}</p>;
  if (estado.tipo !== "ok") return null;
  return (
    <>
      <table>
        <caption>{textos.resultado}</caption>
        <tbody>
          {estado.filas.map((f) => (
            <tr key={f.clave} data-destacada={f.destacada || undefined}>
              <th scope="row">{f.etiqueta}</th>
              <td>{f.texto}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {estado.observaciones.length ? (
        <ul>
          {estado.observaciones.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function CalculadoraBasica({ definicion, ...props }: PropsCalculadora & { definicion: DefinicionCalculadora }) {
  const control = useCalculadora(definicion, props);
  const idBase = useId();
  const enviar = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    control.calcular();
  };
  return (
    <div data-calculadora={definicion.id}>
      {props.avisos
        .filter((a) => a.nivel !== "bloquea")
        .map((a) => (
          <p key={a.id} data-aviso={a.nivel}>
            {a.texto}
          </p>
        ))}
      <form onSubmit={enviar} noValidate>
        {control.campos.map((c) => (
          <CampoBasico key={c.id} campo={c} control={control} idBase={idBase} />
        ))}
        <button type="submit">{control.textos.calcular}</button>
      </form>
      <div aria-live="polite">
        <ResultadoBasico control={control} />
      </div>
    </div>
  );
}

export function crearCalculadoraCliente<C extends readonly Campo[], Q extends Requisitos, R extends ResultadoBase>(
  definicion: DefinicionCalculadora<C, Q, R>,
): ComponentType<PropsCalculadora> {
  const def = definicion as unknown as DefinicionCalculadora;
  function Calculadora(props: PropsCalculadora) {
    return <CalculadoraBasica definicion={def} {...props} />;
  }
  Calculadora.displayName = `Calculadora(${definicion.id})`;
  return Calculadora;
}
