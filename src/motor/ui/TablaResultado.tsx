import { useId } from "react";
import { formatearFecha, formatearMoneda, formatearNumero, formatearPorcentaje, formatearValorUnidad } from "../formato";
import type { ColumnaTabla, ContextoSerializado, DefinicionCalculadora, FechaISO, ResultadoBase, TablaResultado as Tabla, ValorResultado } from "../tipos";

const FILAS_VISIBLES = 12;

function esTabla(v: ValorResultado): v is Tabla {
  return typeof v === "object" && v !== null && !Array.isArray(v) && (v as Tabla).tipo === "tabla";
}

function celda(valor: number | string | null, formato: ColumnaTabla["formato"], contexto: ContextoSerializado): string {
  if (valor === null) return "";
  if (formato === "texto") return String(valor);
  if (formato === "fecha") return typeof valor === "string" ? formatearFecha(valor as FechaISO, contexto.locale, "corta") : String(valor);
  if (typeof valor !== "number" || !Number.isFinite(valor)) return String(valor);
  switch (formato) {
    case "moneda":
      return formatearMoneda(valor, contexto.locale, contexto.moneda, undefined, contexto.simbolos?.[contexto.moneda]);
    case "porcentaje":
      return formatearPorcentaje(valor, contexto.locale, 2);
    case "numero":
      return formatearNumero(valor, contexto.locale);
    default:
      return formatearValorUnidad(valor, formato, contexto.locale);
  }
}

// Una tabla HTML de verdad (caption, th con scope) dentro de un marco con scroll propio: en un celular
// una amortización de cinco columnas no entra, y el que se corre es el marco, no la página. El marco
// es enfocable para que el scroll se pueda hacer con el teclado.
function UnaTabla({ titulo, tabla, filasVisibles, contexto }: { titulo: string; tabla: Tabla; filasVisibles: number; contexto: ContextoSerializado }) {
  const id = useId();
  const filas = tabla.filas.slice(0, filasVisibles);
  const alineada = (c: ColumnaTabla) => (c.formato === "texto" ? "inicio" : "fin");
  return (
    <div className="cy-tabla-marco" role="region" aria-labelledby={id} tabIndex={0}>
      <table className="cy-tabla">
        <caption id={id}>{titulo}</caption>
        <thead>
          <tr>
            {tabla.columnas.map((c) => (
              <th key={c.clave} scope="col" data-alinear={alineada(c)}>
                {c.etiqueta}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i}>
              {tabla.columnas.map((c, j) =>
                j === 0 ? (
                  <th key={c.clave} scope="row" data-alinear={alineada(c)}>
                    {celda(fila[j] ?? null, c.formato, contexto)}
                  </th>
                ) : (
                  <td key={c.clave} data-alinear={alineada(c)}>
                    {celda(fila[j] ?? null, c.formato, contexto)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TablasResultado({
  tablas,
  resultado,
  contexto,
}: {
  tablas: DefinicionCalculadora["tablas"];
  resultado: ResultadoBase;
  contexto: ContextoSerializado;
}) {
  const presentes = (tablas ?? []).flatMap((t) => {
    const v = resultado[t.clave];
    return esTabla(v) && v.filas.length ? [{ ...t, tabla: v }] : [];
  });
  if (!presentes.length) return null;
  return (
    <div className="cy-tablas">
      {presentes.map((t) => (
        <UnaTabla key={t.clave} titulo={t.titulo} tabla={t.tabla} filasVisibles={t.filasVisibles ?? FILAS_VISIBLES} contexto={contexto} />
      ))}
    </div>
  );
}
