import type { MuestraPlanilla } from "./_muestra";

export function VistaPlanilla({ muestra, leyenda }: { muestra: MuestraPlanilla; leyenda: readonly string[] }) {
  return (
    <figure className="cy-vista">
      <div className="cy-vista-hoja">
        <div className="cy-vista-archivo" aria-hidden="true">
          <span className="cy-vista-puntos">
            <i />
            <i />
            <i />
          </span>
          <span>{muestra.archivo}</span>
        </div>
        <table className="cy-vista-tabla">
          <caption className="cy-solo-lector">{`${muestra.hoja}, ${muestra.archivo}`}</caption>
          <thead aria-hidden="true">
            <tr>
              <th />
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            {muestra.filas.map((f, i) => (
              <tr key={i} data-tono={f.tono}>
                <td className="cy-vista-fila" aria-hidden="true">
                  {f.fila ?? ""}
                </td>
                <th scope="row">{f.etiqueta}</th>
                <td>{f.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cy-vista-pestanas" aria-hidden="true">
          {muestra.pestanas.map((p) => (
            <span key={p} data-activa={p === muestra.hoja || undefined}>
              {p}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="cy-vista-leyenda">
        <span>
          <i data-color="entrada" aria-hidden="true" />
          {leyenda[0]}
        </span>
        <span>
          <i data-color="calculo" aria-hidden="true" />
          {leyenda[1]}
        </span>
      </figcaption>
    </figure>
  );
}
