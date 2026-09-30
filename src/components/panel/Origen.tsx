import type { PanelDatos, Reparto } from "@/lib/panel/tipos";
import { deCada100, nombreDispositivo, nombrePais, numero, porcentaje } from "@/lib/panel/formato";
import { Barras, type FilaBarra } from "./Barras";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";

const esResto = (clave: string) => /^otros?$/i.test(clave.trim());

export function filasFuentes(datos: PanelDatos, limite = 7): FilaBarra[] {
  const total = datos.fuentes.reduce((a, f) => a + f.visitantes, 0) || 1;
  return [...datos.fuentes]
    .sort((a, b) => Number(esResto(a.fuente)) - Number(esResto(b.fuente)) || b.visitantes - a.visitantes)
    .slice(0, limite)
    .map((f) => ({
      clave: f.fuente,
      etiqueta: f.fuente,
      valor: f.visitantes,
      pct: (f.visitantes / total) * 100,
      texto: porcentaje(f.visitantes / total, 0),
      nota: `${numero(f.visitantes)} ${f.visitantes === 1 ? "persona" : "personas"} · usan calculadora ${deCada100(
        f.visitantes ? f.usos / f.visitantes : 0,
      )}${f.ventas ? ` · ${f.ventas === 1 ? "1 venta" : `${numero(f.ventas)} ventas`}` : ""}`,
    }));
}

export function filasReparto(reparto: Reparto[], nombre: (clave: string) => string, limite = 5): FilaBarra[] {
  const total = reparto.reduce((a, r) => a + r.n, 0) || 1;
  const orden = [...reparto].sort((a, b) => Number(esResto(a.clave)) - Number(esResto(b.clave)) || b.n - a.n);
  const visibles = orden.slice(0, limite);
  const resto = orden.slice(limite).reduce((a, r) => a + r.n, 0);
  const filas = visibles.map((r) => ({
    clave: r.clave,
    etiqueta: nombre(r.clave),
    valor: r.n,
    pct: (r.n / total) * 100,
    texto: porcentaje(r.n / total, r.n / total < 0.1 ? 1 : 0),
  }));
  if (resto > 0)
    filas.push({
      clave: "_resto",
      etiqueta: "El resto",
      valor: resto,
      pct: (resto / total) * 100,
      texto: porcentaje(resto / total, 1),
    });
  return filas;
}

export function Origen({ datos }: { datos: PanelDatos }) {
  const hayFuentes = datos.fuentes.length > 0;
  return (
    <Seccion id="fuentes" indice={5} titulo="De dónde vienen" bajada="Por dónde llegan, con qué y desde qué país.">
      <Bandeja>
        <div className={`${TARJETA} p-5`}>
          <h3 className="text-sm font-semibold text-zinc-900">Cómo llegaron</h3>
          <div className="mt-3">
            {hayFuentes ? <Barras filas={filasFuentes(datos)} /> : <Vacio>Todavía no hay visitas medidas.</Vacio>}
          </div>
        </div>
        <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
          <div className={`${TARJETA} p-5`}>
            <h3 className="text-sm font-semibold text-zinc-900">Desde qué</h3>
            <div className="mt-3">
              {datos.dispositivos.length ? (
                <Barras filas={filasReparto(datos.dispositivos, nombreDispositivo)} />
              ) : (
                <Vacio>Sin datos todavía.</Vacio>
              )}
            </div>
          </div>
          <div className={`${TARJETA} p-5`}>
            <h3 className="text-sm font-semibold text-zinc-900">Desde dónde</h3>
            <div className="mt-3">
              {datos.paises.length ? (
                <Barras filas={filasReparto(datos.paises, nombrePais, 4)} />
              ) : (
                <Vacio>Sin datos todavía.</Vacio>
              )}
            </div>
          </div>
        </div>
      </Bandeja>
    </Seccion>
  );
}
