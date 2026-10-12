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

// Como en calcular.ar, el resultado se recalcula con cada cambio y no hay botón. Hasta el primer
// cambio no se calcula nada aunque los valores por defecto alcancen: el código de calcular() llega
// cuando el navegador está ocioso y un resultado que aparece solo, segundos después de cargar, mueve
// la página (CLS). Un campo vacío y obligatorio no muestra error: falta un dato, no hay nada mal.
function useControl(visible: DefinicionVisible, props: PropsCalculadora, inicial: DefinicionCalculadora | null, cargar?: () => Promise<DefinicionCalculadora>): CalculadoraControlada & { precargar: () => void } {
  const textos = useMemo(() => textosMotor(props.contexto.idioma, props.contexto.trato), [props.contexto.idioma, props.contexto.trato]);
  const [crudos, setCrudos] = useState<Crudos>(() => valoresIniciales(visible.campos, props.contexto, props.opcionesDinamicas));
  const [definicion, setDefinicion] = useState<DefinicionCalculadora | null>(inicial);
  const [tocado, setTocado] = useState(false);
  const [fallo, setFallo] = useState(false);
  const pendiente = useRef<Promise<unknown> | null>(null);

  const precargar = useCallback(() => {
    if (definicion || pendiente.current || !cargar) return;
    pendiente.current = cargar().then(setDefinicion, (err) => {
      console.error(`[${visible.id}] no se pudo cargar la calculadora`, err);
      pendiente.current = null;
      setFallo(true);
    });
  }, [definicion, cargar, visible.id]);

  const cambiar = useCallback((idCampo: string, valor: string | boolean) => {
    setCrudos((prev) => ({ ...prev, [idCampo]: valor }));
    setTocado(true);
    setFallo(false);
  }, []);
  const calcular = useCallback(() => setTocado(true), []);

  useEffect(() => {
    if (tocado && !fallo) precargar();
  }, [tocado, fallo, precargar]);

  const estado = useMemo<EstadoCalculo>(() => {
    const bloqueos = props.avisos.filter((a) => a.nivel === "bloquea");
    if (bloqueos.length) return { tipo: "bloqueado", avisos: bloqueos };
    if (!tocado) return { tipo: "inicial" };
    if (fallo) return { tipo: "fallo", mensaje: textos.errores["calculo-fallido"] };
    if (!definicion) return { tipo: "inicial" };
    return ejecutar(definicion, crudos, props, textos);
  }, [props, tocado, fallo, definicion, crudos, textos]);

  const error = useCallback(
    (idCampo: string) => {
      if (estado.tipo !== "errores") return null;
      const e = estado.errores[idCampo];
      if (!e || ("codigo" in e && e.codigo === "requerido")) return null;
      return mensajeDeError(e, textos);
    },
    [estado, textos],
  );
  const opciones = useCallback((campo: Campo) => opcionesDe(campo, props.contexto, props.opcionesDinamicas), [props.contexto, props.opcionesDinamicas]);

  return { campos: visible.campos, crudos, estado, textos, opciones, error, cambiar, calcular, precargar };
}

export function useCalculadora(definicion: DefinicionCalculadora, props: PropsCalculadora): CalculadoraControlada {
  return useControl(definicion, props, definicion);
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
  const control = useControl(definicion, props, null, cargar);
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
