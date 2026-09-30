"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RANGOS, type PanelDatos, type Rango } from "@/lib/panel/tipos";

const VIEJO_MS = 60_000;

type Falla = "sesion" | "red";

export function usePanelDatos(inicial: PanelDatos, demo: string | null) {
  const [rango, setRango] = useState<Rango>(inicial.rango);
  const [cache, setCache] = useState<Partial<Record<Rango, PanelDatos>>>({ [inicial.rango]: inicial });
  const [pendientes, setPendientes] = useState<Partial<Record<Rango, boolean>>>({});
  const [fallas, setFallas] = useState<Partial<Record<Rango, Falla>>>({});
  const [sesionVencida, setSesionVencida] = useState(false);
  const enVuelo = useRef(new Map<Rango, Promise<void>>());
  const recibido = useRef<Partial<Record<Rango, number>>>({});
  const rangoActual = useRef(rango);
  const ultimoConDatos = useRef<Rango>(inicial.rango);
  const cacheRef = useRef(cache);

  useEffect(() => {
    recibido.current[inicial.rango] = Date.parse(inicial.generado) || Date.now();
  }, [inicial]);

  const traer = useCallback(
    (r: Rango) => {
      const existente = enVuelo.current.get(r);
      if (existente) return existente;
      setPendientes((p) => ({ ...p, [r]: true }));
      const url = `/dashboard/datos?r=${r}${demo ? `&demo=${demo}` : ""}`;
      const promesa = fetch(url, { cache: "no-store", headers: { accept: "application/json" } })
        .then(async (res) => {
          const tipo = res.headers.get("content-type") ?? "";
          if (res.status === 401 || res.status === 403 || res.redirected || !tipo.includes("json")) {
            setSesionVencida(true);
            return;
          }
          if (!res.ok) throw new Error(String(res.status));
          const datos = (await res.json()) as PanelDatos;
          recibido.current[r] = Date.now();
          setCache((c) => ({ ...c, [r]: datos }));
          setFallas((f) => ({ ...f, [r]: undefined }));
          setSesionVencida(false);
        })
        .catch(() => setFallas((f) => ({ ...f, [r]: "red" })))
        .finally(() => {
          enVuelo.current.delete(r);
          setPendientes((p) => ({ ...p, [r]: false }));
        });
      enVuelo.current.set(r, promesa);
      return promesa;
    },
    [demo],
  );

  useEffect(() => {
    const otros = RANGOS.filter((r) => r !== inicial.rango);
    const precargar = () => otros.forEach((r) => void traer(r));
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(precargar, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(precargar, 300);
    return () => window.clearTimeout(id);
  }, [inicial.rango, traer]);

  useEffect(() => {
    const alVolver = () => {
      if (document.visibilityState !== "visible") return;
      const r = rangoActual.current;
      if (Date.now() - (recibido.current[r] ?? 0) > VIEJO_MS) void traer(r);
    };
    document.addEventListener("visibilitychange", alVolver);
    window.addEventListener("pageshow", alVolver);
    return () => {
      document.removeEventListener("visibilitychange", alVolver);
      window.removeEventListener("pageshow", alVolver);
    };
  }, [traer]);

  const cambiarRango = useCallback(
    (r: Rango) => {
      rangoActual.current = r;
      setRango(r);
      const url = new URL(window.location.href);
      url.searchParams.set("r", r);
      window.history.replaceState(null, "", url);
      const hay = cacheRef.current[r];
      if (!hay || Date.now() - (recibido.current[r] ?? 0) > VIEJO_MS) void traer(r);
    },
    [traer],
  );

  const actualizar = useCallback(() => traer(rangoActual.current), [traer]);

  const propio = cache[rango];
  useEffect(() => {
    cacheRef.current = cache;
    if (cache[rango]) ultimoConDatos.current = rango;
  }, [cache, rango]);
  const datos = propio ?? cache[ultimoConDatos.current] ?? inicial;

  return {
    rango,
    datos,
    esDeOtroRango: !propio,
    cargando: !!pendientes[rango],
    pendientes,
    falla: fallas[rango] ?? null,
    sesionVencida,
    cambiarRango,
    actualizar,
  };
}
