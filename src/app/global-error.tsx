"use client";

// Sólo se ve si falla el root layout: ahí no hay CSS del sitio ni header, por eso va todo inline.
const CSS = `
body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#fafaf9;color:#18181b;
font-family:system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:24px;box-sizing:border-box}
.c{max-width:28rem}
.v{display:inline-flex;flex-direction:column;align-items:flex-end;padding:14px 20px;border-radius:20px;
background:#18181b;color:#6ee7b7;font-size:40px;font-weight:700;letter-spacing:-.04em;transform:rotate(-1.5deg)}
.v small{font-size:12px;font-weight:400;letter-spacing:.02em;color:#a1a1aa}
h1{font-size:32px;line-height:1.1;letter-spacing:-.03em;margin:28px 0 12px}
p{color:#52525b;line-height:1.6;margin:0 0 24px}
.a{display:flex;flex-wrap:wrap;gap:12px}
button,a{display:inline-flex;align-items:center;min-height:46px;padding:0 20px;border-radius:999px;
font:600 15px/1 inherit;cursor:pointer;text-decoration:none}
button{border:0;background:#18181b;color:#fff}
a{border:1px solid rgba(24,24,27,.12);background:#fff;color:#27272a}
`;

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <head>
        <title>Algo falló | CalculAR</title>
        <meta name="robots" content="noindex" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <main className="c">
          <div className="v" aria-hidden="true">
            <small>error inesperado</small>E
          </div>
          <h1>Algo falló de nuestro lado</h1>
          <p>No es nada que hayas hecho vos. Probá de nuevo en unos segundos.</p>
          <div className="a">
            <button type="button" onClick={reset}>
              Probar de nuevo
            </button>
            <a href="/">Ir al inicio</a>
          </div>
        </main>
      </body>
    </html>
  );
}
