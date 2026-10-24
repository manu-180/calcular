import type { ContextoSitio } from "../../ui/contexto";
import { IconoFlecha } from "../../ui/Iconos";
import { calendarioPublicado, rutaCalendario } from "../rutas";
import { presentarEvento, textosDe } from "./presentar";
import "./estilos-calendario.css";

// Tarjeta de la home de cada edición que lleva al calendario, con la próxima fecha real (la del
// registro). Sin calendario publicable no aparece; un error acá no puede tumbar la home.
export function DestacadoCalendario({ ctx }: { ctx: ContextoSitio }) {
  try {
    const c = calendarioPublicado(ctx.registro, ctx.mercado, ctx.modo);
    const proxima = c?.eventos.find((e) => e.fecha >= c.fecha);
    if (!c || !proxima) return null;
    const t = textosDe(ctx.mercado);
    const e = presentarEvento(ctx, proxima, t);
    return (
      <a className="cy-cal-destacado" href={rutaCalendario(ctx.mercado)}>
        <span className="cy-cal-destacado-fecha" aria-hidden="true">
          <b>{e.dia}</b>
          <span>{e.mesCorto}</span>
        </span>
        <span className="cy-cal-destacado-texto">
          <span className="cy-cal-destacado-ceja">{t.destacado.ceja}</span>
          <span className="cy-cal-destacado-titulo">{t.destacado.titulo}</span>
          <span className="cy-cal-destacado-proxima">{t.destacado.proxima(e.titulo, e.fechaLarga)}</span>
        </span>
        <span className="cy-cal-destacado-ir">
          {t.destacado.ir}
          <span className="cy-boton-icono">
            <IconoFlecha />
          </span>
        </span>
      </a>
    );
  } catch (err) {
    console.error("[calendario] destacado", err);
    return null;
  }
}
