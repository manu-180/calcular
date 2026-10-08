// 404 de las URLs que no coinciden con ninguna ruta. Sin layout en la raíz (cada sitio tiene su
// root layout en su grupo), un app/not-found.tsx queda envuelto en el <html> pelado que Next
// inserta por defecto: sin lang, sin header ni footer, o con un <html> anidado si lo trae él.
// global-not-found reemplaza ese layout, así el 404 de calcular.ar sigue igual que antes del
// ADR 0001 y estático. Lo prende experimental.globalNotFound en next.config.ts.
//
// El cuerpo copia el 404 que traía Next 16.3.7 (HTTPAccessErrorFallback) en vez de importar
// next/dist/client/components/builtin/not-found, que es una ruta interna y puede cambiar o
// desaparecer en cualquier versión. Lo prueba check_rutas_ar.ts (/esta-pagina-no-existe).
import type { CSSProperties } from "react";
import LayoutAR from "./(ar)/layout";

export { metadata, viewport } from "./(ar)/layout";

const CSS =
  "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}";

const estilos: Record<"error" | "desc" | "h1" | "h2", CSSProperties> = {
  error: {
    fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: { display: "inline-block" },
  h1: { display: "inline-block", margin: "0 20px 0 0", padding: "0 23px 0 0", fontSize: 24, fontWeight: 500, verticalAlign: "top", lineHeight: "49px" },
  h2: { fontSize: 14, fontWeight: 400, lineHeight: "49px", margin: 0 },
};

function NoEncontrada() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div style={estilos.error}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
          <h1 className="next-error-h1" style={estilos.h1}>
            404
          </h1>
          <div style={estilos.desc}>
            <h2 style={estilos.h2}>This page could not be found.</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default function GlobalNotFound() {
  return (
    <LayoutAR>
      <NoEncontrada />
    </LayoutAR>
  );
}
