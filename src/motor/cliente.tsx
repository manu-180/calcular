"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ejecutar, mensajeDeError, opcionesDe, valoresIniciales, type Crudos, type EstadoCalculo } from "./formulario";
import { textosMotor, type TextosMotor } from "./textos";
import { PielCalculadora } from "./ui/PielCalculadora";
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

// La parte visible de una calculadora (campos y filas): datos planos que el servidor puede mandar
// como props. La función calcular() no cruza esa frontera y llega aparte.
export type DefinicionVisible = Pick<DefinicionCalculadora, "id" | "campos" | "resultado">;

type Fuente = () => DefinicionCalculadora | Promise<DefinicionCalculadora>;

function useControl(visible: DefinicionVisible, props: PropsCalculadora, fuente: Fuente): CalculadoraControlada & { precargar: () => void } {
  const textos = useMemo(() => textosMotor(props.contexto.idioma, props.contexto.trato), [props.contexto.idioma, props.contexto.trato]);
  const [crudos, setCrudos] = useState<Crudos>(() => valoresIniciales(visible.campos, props.contexto, props.opcionesDinamicas));
  const [estado, setEstado] = useState<EstadoCalculo>(() =>
    props.avisos.some((a) => a.nivel === "bloquea") ? { tipo: "bloqueado", avisos: props.avisos.filter((a) => a.nivel === "bloquea") } : { tipo: "inicial" },
  );
  const pendiente = useRef<Promise<DefinicionCalculadora> | null>(null);
  const resolver = useCallback((): DefinicionCalculadora | Promise<DefinicionCalculadora> => {
    if (pendiente.current) return pendiente.current;
    const r = fuente();
    if (r instanceof Promise) {
      pendiente.current = r;
      r.catch(() => (pendiente.current = null));
    }
    return r;
  }, [fuente]);

  const cambiar = useCallback((idCampo: string, valor: string | boolean) => setCrudos((prev) => ({ ...prev, [idCampo]: valor })), []);
  const calcular = useCallback(() => {
    const def = resolver();
    if (!(def instanceof Promise)) return setEstado(ejecutar(def, crudos, props, textos));
    def.then(
      (d) => setEstado(ejecutar(d, crudos, props, textos)),
      (err) => {
        console.error(`[${visible.id}] no se pudo cargar la calculadora`, err);
        setEstado({ tipo: "fallo", mensaje: textos.errores["calculo-fallido"] });
      },
    );
  }, [resolver, crudos, props, textos, visible.id]);
  const precargar = useCallback(() => void Promise.resolve(resolver()).catch(() => {}), [resolver]);
  const error = useCallback(
    (idCampo: string) => (estado.tipo === "errores" && estado.errores[idCampo] ? mensajeDeError(estado.errores[idCampo], textos) : null),
    [estado, textos],
  );
  const opciones = useCallback((campo: Campo) => opcionesDe(campo, props.contexto, props.opcionesDinamicas), [props.contexto, props.opcionesDinamicas]);

  return { campos: visible.campos, crudos, estado, textos, opciones, error, cambiar, calcular, precargar };
}

export function useCalculadora(definicion: DefinicionCalculadora, props: PropsCalculadora): CalculadoraControlada {
  const fuente = useCallback(() => definicion, [definicion]);
  return useControl(definicion, props, fuente);
}

export function CalculadoraBasica({ definicion, ...props }: PropsCalculadora & { definicion: DefinicionCalculadora }) {
  const control = useCalculadora(definicion, props);
  return <PielCalculadora id={definicion.id} control={control} contexto={props.contexto} avisos={props.avisos} />;
}

// Para el sitio intl: el formulario se pinta en el servidor con la parte visible y el código de
// calcular() baja aparte, en un chunk propio, cuando el navegador está ocioso (o al primer
// Calcular si todavía no llegó). Un Server Component que importa un Client Component con import()
// no parte el bundle en Next 16: por eso la carga diferida vive del lado del cliente.
export function CalculadoraDiferida({ definicion, cargar, ...props }: PropsCalculadora & { definicion: DefinicionVisible; cargar: () => Promise<DefinicionCalculadora> }) {
  const control = useControl(definicion, props, cargar);
  const { precargar } = control;
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(precargar, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(precargar, 800);
    return () => clearTimeout(t);
  }, [precargar]);
  return <PielCalculadora id={definicion.id} control={control} contexto={props.contexto} avisos={props.avisos} />;
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
