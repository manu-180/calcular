"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RANGOS, type PanelDatos, type Rango } from "@/lib/panel/tipos";

const VIEJO_MS = 60_000;

type Falla = "sesion" | "red";
type Vista = { rango: Rango; mercado: string | null };

const clave = (v: Vista) => `${v.rango}|${v.mercado ?? ""}`;

export function usePanelDatos(inicial: PanelDatos, demo: string | null) {
  const [vista, setVista] = useState<Vista>({ rango: inicial.rango, mercado: inicial.mercado });
  const [cache, setCache] = useState<Record<string, PanelDatos>>({ [clave(inicial)]: inicial });
  const [pendientes, setPendientes] = useState<Record<string, boolean>>({});
  const [fallas, setFallas] = useState<Record<string, Falla | undefined>>({});
  const [sesionVencida, setSesionVencida] = useState(false);
  const enVuelo = useRef(new Map<string, Promise<void>>());
  const recibido = useRef<Record<string, number>>({});
  const actual = useRef(vista);
  const ultimoConDatos = useRef(clave(inicial));
  const cacheRef = useRef(cache);

  useEffect(() => {
    recibido.current[clave(inicial)] = Date.parse(inicial.generado) || Date.now();
  }, [inicial]);

  const traer = useCallback(
    (v: Vista) => {
      const k = clave(v);
      const existente = enVuelo.current.get(k);
      if (existente) return existente;
      setPendientes((p) => ({ ...p, [k]: true }));
      const q = new URLSearchParams({ r: v.rango });
      if (v.mercado) q.set("m", v.mercado);
      if (demo) q.set("demo", demo);
      const promesa = fetch(`/dashboard/datos?${q}`, { cache: "no-store", headers: { accept: "application/json" } })
        .then(async (res) => {
          const tipo = res.headers.get("content-type") ?? "";
          if (res.status === 401 || res.status === 403 || res.redirected || !tipo.includes("json")) {
            setSesionVencida(true);
            return;
          }
          if (!res.ok) throw new Error(String(res.status));
          const datos = (await res.json()) as PanelDatos;
          recibido.current[k] = Date.now();
          setCache((c) => ({ ...c, [k]: datos }));
          setFallas((f) => ({ ...f, [k]: undefined }));
          setSesionVencida(false);
        })
        .catch(() => setFallas((f) => ({ ...f, [k]: "red" })))
        .finally(() => {
          enVuelo.current.delete(k);
          setPendientes((p) => ({ ...p, [k]: false }));
        });
      enVuelo.current.set(k, promesa);
      return promesa;
    },
    [demo],
  );

  // Los otros rangos del mismo país se precargan en un momento ocioso: cambiar de rango es instantáneo.
  useEffect(() => {
    const otros = RANGOS.filter((r) => r !== vista.rango);
    const precargar = () =>
      otros.forEach((r) => {
        const v = { rango: r, mercado: vista.mercado };
        if (!cacheRef.current[clave(v)]) void traer(v);
      });
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(precargar, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(precargar, 300);
    return () => window.clearTimeout(id);
  }, [vista.rango, vista.mercado, traer]);

  useEffect(() => {
    const alVolver = () => {
      if (document.visibilityState !== "visible") return;
      const v = actual.current;
      if (Date.now() - (recibido.current[clave(v)] ?? 0) > VIEJO_MS) void traer(v);
    };
    document.addEventListener("visibilitychange", alVolver);
    window.addEventListener("pageshow", alVolver);
    return () => {
      document.removeEventListener("visibilitychange", alVolver);
      window.removeEventListener("pageshow", alVolver);
    };
  }, [traer]);

  const ir = useCallback(
    (v: Vista) => {
      actual.current = v;
      setVista(v);
      const url = new URL(window.location.href);
      url.searchParams.set("r", v.rango);
      if (v.mercado) url.searchParams.set("mercado", v.mercado);
      else url.searchParams.delete("mercado");
      window.history.replaceState(null, "", url);
      const k = clave(v);
      if (!cacheRef.current[k] || Date.now() - (recibido.current[k] ?? 0) > VIEJO_MS) void traer(v);
    },
    [traer],
  );

  const cambiarRango = useCallback((r: Rango) => ir({ rango: r, mercado: actual.current.mercado }), [ir]);
  const cambiarMercado = useCallback((m: string | null) => ir({ rango: actual.current.rango, mercado: m }), [ir]);
  const actualizar = useCallback(() => traer(actual.current), [traer]);
  // Al apuntar a un país se pide antes del click: para cuando se elige, ya está.
  const precargarMercado = useCallback(
    (m: string | null) => {
      const v = { rango: actual.current.rango, mercado: m };
      if (!cacheRef.current[clave(v)]) void traer(v);
    },
    [traer],
  );

  const k = clave(vista);
  const propio = cache[k];
  useEffect(() => {
    cacheRef.current = cache;
    if (cache[k]) ultimoConDatos.current = k;
  }, [cache, k]);
  const datos = propio ?? cache[ultimoConDatos.current] ?? inicial;

  const pendientesDelPais: Partial<Record<Rango, boolean>> = {};
  for (const r of RANGOS) pendientesDelPais[r] = !!pendientes[clave({ rango: r, mercado: vista.mercado })];

  return {
    rango: vista.rango,
    mercado: vista.mercado,
    datos,
    esDeOtroRango: !propio,
    cargando: !!pendientes[k],
    pendientes: pendientesDelPais,
    falla: fallas[k] ?? null,
    sesionVencida,
    cambiarRango,
    cambiarMercado,
    precargarMercado,
    actualizar,
  };
}
