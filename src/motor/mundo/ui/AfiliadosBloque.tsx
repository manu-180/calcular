"use client";

import { useId } from "react";
import { rastrear } from "../../compartir/medir";
import { textosAfiliados, type SocioAfiliado } from "../../i18n/afiliados";
import { idiomaDeLocale } from "../../i18n/resolver";
import type { EnlaceAfiliado } from "./Afiliados";
import "./estilos-afiliados.css";

const NOMBRES: Record<SocioAfiliado, string> = { wise: "Wise", deel: "Deel" };

// «afiliado_clic» todavía no está en TIPOS_EVENTO (src/lib/rastreo.ts) ni en el CHECK de ca_eventos:
// hasta que se sume, /api/e descarta este evento y deja pasar el resto del lote.
const EVENTO = "afiliado_clic" as Parameters<typeof rastrear>[0];

export default function AfiliadosBloque({ locale, enlaces, mejor }: { locale: string; enlaces: readonly EnlaceAfiliado[]; mejor: string }) {
  const t = textosAfiliados(idiomaDeLocale(locale) ?? "es", locale);
  const id = useId();
  return (
    <aside className="cy-afiliados" aria-labelledby={id}>
      <div className="cy-afiliados-cabeza">
        <p id={id} className="cy-afiliados-titulo">
          {t.titulo}
        </p>
        <span className="cy-afiliados-etiqueta">{t.etiqueta}</span>
      </div>
      <ul className="cy-afiliados-lista">
        {enlaces.map((e) => (
          <li key={e.socio}>
            <a
              className="cy-afiliados-enlace"
              href={e.url}
              rel="sponsored noopener"
              target="_blank"
              onClick={() => rastrear(EVENTO, { props: { socio: e.socio, pais: mejor } })}
            >
              <span className="cy-afiliados-nombre">{NOMBRES[e.socio]}</span>
              <span className="cy-afiliados-texto">{t.socios[e.socio]}</span>
              <svg className="cy-afiliados-icono" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M6 3.5H3.5v9h9V10M9 3.5h3.5V7M12.5 3.5 7 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="cy-mundo-lector">({t.nuevaPestana})</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="cy-afiliados-nota">{t.nota}</p>
    </aside>
  );
}
