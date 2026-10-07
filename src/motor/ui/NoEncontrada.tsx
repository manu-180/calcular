import { rutaIntl } from "../seo";
import { Bandera } from "./Bandera";
import type { ContextoSitio } from "./contexto";
import { IconoFlecha } from "./Iconos";

export function NoEncontrada({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos.noEncontrada;
  return (
    <div className="cy-pagina cy-no-encontrada">
      <p className="cy-no-encontrada-numero" aria-hidden="true">
        404
      </p>
      <h1 className="cy-titular">{t.titulo}</h1>
      <p className="cy-bajada">{t.texto}</p>
      <a className="cy-boton cy-boton-principal" href={rutaIntl("global")}>
        <span>{t.volver}</span>
        <span className="cy-boton-icono">
          <IconoFlecha />
        </span>
      </a>
      {ctx.paises.length ? (
        <>
          <p className="cy-seccion-titulo">{t.paises}</p>
          <ul className="cy-no-encontrada-paises">
            {ctx.paises.map((m) => (
              <li key={m.codigo}>
                <a href={rutaIntl(m.codigo)}>
                  <Bandera pais={m.pais} ancho={18} />
                  {m.nombre}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
