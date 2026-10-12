"use client";

import { useEffect, useState } from "react";
import { leerDatosIntl, olvidarDatosIntl, recordarDatosIntl } from "@/lib/prefill/intl-cliente";
import type { DatosIntl } from "@/lib/prefill/intl";

export type CampoResumen = { id: string; etiqueta: string; tipo: string; opciones?: Readonly<Record<string, string>> };
export type CalculoResumen = { nombre: string; campos: readonly CampoResumen[] };

// Lo que la persona calculó, a la vista antes de pagar, con la casilla para usarlo o no. Si no
// hay nada guardado (llegó directo a la landing), no se muestra nada y la compra sale sin datos.
export function DatosCompra({
  producto,
  calculos,
  locale,
  titulo,
  usar,
}: {
  producto: string;
  calculos: Readonly<Record<string, CalculoResumen>>;
  locale: string;
  titulo: string;
  usar: string;
}) {
  const [datos, setDatos] = useState<DatosIntl | null>(null);
  const [marcado, setMarcado] = useState(true);
  useEffect(() => {
    const d = leerDatosIntl(producto);
    if (d && Object.prototype.hasOwnProperty.call(calculos, d.calc)) setDatos(d);
  }, [producto, calculos]);
  if (!datos) return null;
  const calculo = calculos[datos.calc];
  const filas = calculo.campos
    .filter((c) => Object.prototype.hasOwnProperty.call(datos.entrada, c.id) && datos.entrada[c.id] !== null)
    .map((c) => {
      const v = datos.entrada[c.id];
      let texto: string;
      if (typeof v === "boolean") texto = v ? "Sí" : "No";
      else if (typeof v === "number") texto = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(v);
      else if (c.tipo === "fecha" && typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`)))
        texto = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${v}T00:00:00Z`));
      else texto = (c.opciones && Object.prototype.hasOwnProperty.call(c.opciones, String(v)) ? c.opciones[String(v)] : null) ?? String(v);
      return { id: c.id, etiqueta: c.etiqueta, texto };
    });
  return (
    <div className="cy-datos-compra">
      <p className="cy-calc-rotulo">
        {titulo}: {calculo.nombre}
      </p>
      <dl>
        {filas.map((f) => (
          <div key={f.id}>
            <dt>{f.etiqueta}</dt>
            <dd>{f.texto}</dd>
          </div>
        ))}
      </dl>
      <label className="cy-casilla">
        <input
          type="checkbox"
          name="usar_datos"
          value="1"
          checked={marcado}
          onChange={(e) => {
            setMarcado(e.target.checked);
            if (e.target.checked) recordarDatosIntl(producto, datos);
            else olvidarDatosIntl(producto);
          }}
        />
        <span>{usar}</span>
      </label>
      {marcado ? <input type="hidden" name="datos" value={JSON.stringify({ calc: datos.calc, entrada: datos.entrada })} /> : null}
    </div>
  );
}
