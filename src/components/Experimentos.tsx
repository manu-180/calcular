import { activos, cssExperimentos, EXPERIMENTOS, scriptExperimentos } from "@/lib/experimentos";
import { hoyAR } from "@/lib/hoy";

// Va en <head>. Sin experimentos activos no pinta nada: cero bytes en la página.
export function ScriptExperimentos() {
  const lista = activos(hoyAR(), EXPERIMENTOS);
  if (!lista.length) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: scriptExperimentos(lista) }} />
      <style dangerouslySetInnerHTML={{ __html: cssExperimentos(lista) }} />
    </>
  );
}

// Envuelve cada alternativa: <Variante exp="hero-corto" v="a">…</Variante><Variante exp="hero-corto" v="b">…</Variante>.
export function Variante({ exp, v, children }: { exp: string; v: string; children: React.ReactNode }) {
  return (
    <div data-xv={`${exp}:${v}`} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
