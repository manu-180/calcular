"use client";

import { useEffect, useState } from "react";
import { leerDatosIntl } from "@/lib/prefill/intl-cliente";
import { IconoFlecha } from "@/motor/ui/Iconos";

// La descarga recién pagada: si en este navegador quedaron los números de la calculadora, viajan en
// el POST y la planilla sale con ellos aunque la base no los tenga. El servidor los vuelve a validar.
export function BotonDescarga({ accion, producto, texto }: { accion: string; producto: string; texto: string }) {
  const [datos, setDatos] = useState<string | null>(null);
  useEffect(() => {
    const d = leerDatosIntl(producto);
    if (d) setDatos(JSON.stringify({ calc: d.calc, entrada: d.entrada }));
  }, [producto]);
  return (
    <form method="post" action={accion}>
      {datos ? <input type="hidden" name="datos" value={datos} /> : null}
      <button type="submit" className="cy-boton cy-boton-principal" data-evento="descarga" data-producto={producto}>
        <span>{texto}</span>
        <span className="cy-boton-icono">
          <IconoFlecha />
        </span>
      </button>
    </form>
  );
}
