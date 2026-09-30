import type { Campos } from "@/lib/formulario";

export type Resultado = { ok: true } | { ok: false; codigo: string; error: string };

export async function guardarCalculo(datos: {
  path: string;
  titulo: string;
  campos: Campos;
  resumen: string;
}): Promise<Resultado> {
  try {
    const res = await fetch("/api/cuenta/calculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(datos),
    });
    const j = (await res.json().catch(() => null)) as { ok?: boolean; codigo?: string; error?: string } | null;
    if (res.ok && j?.ok) return { ok: true };
    return {
      ok: false,
      codigo: j?.codigo ?? (res.status === 401 ? "sesion" : "error"),
      error: j?.error ?? "No pudimos guardarlo. Probá de nuevo en un rato.",
    };
  } catch {
    return { ok: false, codigo: "red", error: "Parece que no hay conexión. Revisá internet y probá de nuevo." };
  }
}
