"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { estimarGananciasAnual } from "@/lib/ganancias";
import { RUTA_HORAS_AR } from "@/lib/horas-ar/catalogo";
import { duracion, duracionLarga, codigoHoras, fraseCompartir, mayuscula, minutosCompartidos, minutosDe, valorHora } from "@/lib/horas-ar/formato";
import { guardarTraspasoAR } from "@/lib/mundo/traspaso-ar";
import { PAGAS_AR } from "@/lib/mundo/pagas-ar";
import { brutoANeto, netoABruto } from "@/lib/sueldo";
import { Redes } from "@/motor/compartir/Redes";
import type { TextosRedes } from "@/motor/i18n/redes";
import { CLAVE_TRASPASO, RUTA_MUNDO_AR } from "@/motor/mundo/rutas";
import type { DatosHorasAR, ItemPublicado } from "@/lib/horas-ar/datos";
import { CLAVE_SUELDO_HORAS } from "./traspaso";

type Modo = "neto" | "bruto";

export interface PropsHorasAR {
  datos: DatosHorasAR;
  // URL absoluta de la página: las tarjetas son `${base}/og?c=…` y los links `${base}/<código>`.
  base: string;
  redes: TextosRedes;
  amigo: { id: string; minutos: number } | null;
  inicial: string;
}

const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const numero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

function leerPesos(texto: string): number | null {
  const limpio = texto.replace(/[^\d,]/g, "").replace(",", ".");
  if (!/\d/.test(limpio)) return null;
  const n = Number(limpio);
  return Number.isFinite(n) && n > 0 ? n : null;
}

// Lo que dejó /sueldo-neto al tocar el puente (sessionStorage, nunca la URL). Si no, el bruto que guardó
// para «Tu sueldo en el mundo».
function traspaso(): { modo: Modo; monto: number } | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(CLAVE_SUELDO_HORAS) ?? "null") as { neto?: unknown } | null;
    if (s && typeof s.neto === "number" && s.neto > 0) return { modo: "neto", monto: Math.round(s.neto) };
    const m = JSON.parse(sessionStorage.getItem(CLAVE_TRASPASO) ?? "null") as { mercado?: unknown; brutoAnual?: unknown } | null;
    if (m && m.mercado === "ar" && typeof m.brutoAnual === "number" && m.brutoAnual > 0) return { modo: "bruto", monto: Math.round(m.brutoAnual / PAGAS_AR) };
  } catch {}
  return null;
}

function Duracion({ minutos, clase }: { minutos: number; clase: string }) {
  const d = duracion(minutos);
  return (
    <span className={clase} aria-label={duracionLarga(minutos)}>
      {d.partes.map((p, i) => (
        <span key={i} aria-hidden="true">
          <span className="ca-hs-n">{p.n}</span>
          <span className="ca-hs-u">{p.u}</span>
        </span>
      ))}
    </span>
  );
}

const SEMANA = 40;
const ANIO = 52;

// Una tarjeta de fichaje: hasta 40 horas, cada cuadro es una hora de una semana de 40; más, cada cuadro
// es una semana de 40 horas de un año. El último cuadro se llena en proporción.
function Fichaje({ minutos }: { minutos: number }) {
  const horas = minutos / 60;
  const porHora = horas <= SEMANA;
  const total = porHora ? SEMANA : ANIO;
  const unidades = porHora ? horas : horas / SEMANA;
  const texto = porHora ? "Cada cuadro es una hora de una semana de 40 horas" : unidades > ANIO ? "Más de un año de trabajo. Cada cuadro es una semana de 40 horas" : "Cada cuadro es una semana de 40 horas de trabajo";
  return (
    <figure className="ca-hs-fichaje" data-escala={porHora ? "horas" : "semanas"}>
      <div className="ca-hs-celdas" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const lleno = Math.max(0, Math.min(1, unidades - i));
          return <i key={i} style={{ "--l": lleno, "--i": i } as CSSProperties} data-lleno={lleno >= 1 ? "" : undefined} />;
        })}
      </div>
      <figcaption>{texto}</figcaption>
    </figure>
  );
}

function Paso({ etiqueta, valor, min, max, cambiar, unidad }: { etiqueta: string; valor: number; min: number; max: number; cambiar: (n: number) => void; unidad: (n: number) => string }) {
  const id = useId();
  return (
    <div className="ca-hs-paso">
      <span id={id} className="ca-hs-etiqueta">
        {etiqueta}
      </span>
      <div className="ca-hs-paso-control" role="group" aria-labelledby={id}>
        <button type="button" aria-label={`Menos ${etiqueta.toLowerCase()}`} disabled={valor <= min} onClick={() => cambiar(valor - 1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8h9" />
          </svg>
        </button>
        <output aria-live="polite">{unidad(valor)}</output>
        <button type="button" aria-label={`Más ${etiqueta.toLowerCase()}`} disabled={valor >= max} onClick={() => cambiar(valor + 1)}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3.5 8h9M8 3.5v9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function HorasAR({ datos, base, redes, amigo, inicial }: PropsHorasAR) {
  const [texto, setTexto] = useState("");
  const [modo, setModo] = useState<Modo>("neto");
  const [dias, setDias] = useState(5);
  const [horasDia, setHorasDia] = useState(8);
  const [elegido, setElegido] = useState(inicial);
  const [traido, setTraido] = useState(false);
  const idSueldo = useId();
  const idAyuda = useId();

  useEffect(() => {
    const t = traspaso();
    if (!t) return;
    setModo(t.modo);
    setTexto(numero.format(t.monto));
    setTraido(true);
  }, []);

  const monto = leerPesos(texto);
  const invalido = texto.trim() !== "" && monto === null;
  // Neto mensual: en bruto, con los aportes de ley y la Ganancias estimada de una persona sin cargas.
  const neto = useMemo(() => {
    if (!monto) return null;
    if (modo === "neto") return monto;
    const gan = estimarGananciasAnual({ brutoMensual: monto });
    return brutoANeto(monto, { ganancias: gan.retencionMensual }).neto;
  }, [monto, modo]);
  const propia = neto ? valorHora(neto, dias, horasDia) : null;
  const porHora = propia ?? datos.minimo?.porHora ?? null;
  // Para comparar con los mínimos de otros países hace falta el bruto (los mínimos son brutos).
  const brutoHora = monto ? valorHora(modo === "bruto" ? monto : netoABruto(monto), dias, horasDia) : null;
  const ratio = brutoHora && datos.minimo ? brutoHora / datos.minimo.porHora : 1;

  const item: ItemPublicado | undefined = datos.items.find((i) => i.id === elegido) ?? datos.items[0];
  const minutos = item && porHora ? minutosDe(item.monto, porHora) : null;
  const propios = Boolean(propia && minutos);
  const amigoItem = amigo ? datos.items.find((i) => i.id === amigo.id) : undefined;

  const ordenados = useMemo(() => [...datos.items].sort((a, b) => a.monto - b.monto), [datos.items]);

  // La pantalla muestra los minutos exactos; lo que sale (link, tarjeta, texto) va redondeado a la escala.
  const compartidos = propios && minutos ? minutosCompartidos(minutos) : null;
  const codigo = item && compartidos ? codigoHoras(item.id, compartidos) : item?.id;
  // Relativa: la vista previa y la descarga salen del mismo sitio que sirve la página (también en una preview).
  const imagen = `${RUTA_HORAS_AR}/og?c=${codigo ?? ""}`;
  const url = item && compartidos ? `${base}/${codigoHoras(item.id, compartidos)}` : base;
  const opciones = useMemo(
    () => ({ origen: "horas" as const, url, titulo: "¿Cuántas horas de trabajo te cuesta?", texto: item ? fraseCompartir(item.nombre, compartidos) : "", imagen: `${imagen}&formato=historia`, historia: `${imagen}&formato=historia` }),
    [url, item, compartidos, imagen],
  );

  const jornada = minutos ? minutos / 60 / horasDia : 0;

  return (
    <div className="ca-hs-app">
      <section id="calculadora" className="ca-hs-panel" aria-label="Calculadora de horas de trabajo">
        <span className="ca-hs-brillo" aria-hidden="true" />
        <form className="ca-hs-form" onSubmit={(e) => e.preventDefault()}>
          <div className="ca-hs-sueldo">
            <label htmlFor={idSueldo} className="ca-hs-etiqueta">
              ¿Cuánto cobrás por mes?
            </label>
            <div className="ca-hs-entrada" data-invalido={invalido || undefined}>
              <span aria-hidden="true">$</span>
              <input
                id={idSueldo}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                placeholder="1.200.000"
                value={texto}
                aria-describedby={idAyuda}
                aria-invalid={invalido || undefined}
                onChange={(e) => {
                  const digitos = e.target.value.replace(/\D/g, "").slice(0, 12);
                  setTexto(digitos ? numero.format(Number(digitos)) : e.target.value.replace(/\d/g, ""));
                  setTraido(false);
                }}
              />
            </div>
            <div className="ca-hs-modo" role="radiogroup" aria-label="El sueldo que pusiste es">
              {(["neto", "bruto"] as const).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={modo === m} onClick={() => setModo(m)}>
                  {m === "neto" ? "En mano" : "Bruto, del recibo"}
                </button>
              ))}
            </div>
            <p id={idAyuda} className="ca-hs-ayuda" data-invalido={invalido || undefined}>
              {invalido ? "Escribí solo números, sin centavos." : traido ? "Lo trajimos de tu cálculo de sueldo neto." : modo === "bruto" ? "Le restamos los aportes y una Ganancias estimada para una persona sin cargas de familia." : "Lo que te depositan, después de los descuentos."}
            </p>
          </div>
          <div className="ca-hs-jornada">
            <Paso etiqueta="Días por semana" valor={dias} min={1} max={7} cambiar={setDias} unidad={(n) => `${n} ${n === 1 ? "día" : "días"}`} />
            <Paso etiqueta="Horas por día" valor={horasDia} min={1} max={16} cambiar={setHorasDia} unidad={(n) => `${n} ${n === 1 ? "hora" : "horas"}`} />
          </div>
          <p className="ca-hs-hora" aria-live="polite">
            {propia ? (
              <>
                Tu hora de trabajo vale <strong>{pesos.format(propia)}</strong>
                <small>
                  {numero.format(neto!)} ÷ ({dias} × {horasDia} h × 4,33 semanas)
                </small>
              </>
            ) : datos.minimo ? (
              <>
                Mientras tanto, usamos el salario mínimo: <strong>{pesos.format(datos.minimo.porHora)}</strong> la hora
              </>
            ) : (
              "Poné tu sueldo para ver cuánto vale tu hora."
            )}
          </p>
        </form>

        <div className="ca-hs-heroe" aria-live="polite">
          {item && minutos ? (
            <>
              <p className="ca-hs-antes">
                {mayuscula(item.nombre)} {propios ? "te cuesta" : "cuesta, con el salario mínimo,"}
              </p>
              <p className="ca-hs-cifra" key={`${item.id}-${minutos}`}>
                <Duracion minutos={minutos} clase="ca-hs-cifra-texto" />
              </p>
              <p className="ca-hs-despues">
                de trabajo
                {jornada >= 1 ? ` · ${decimal.format(jornada)} ${jornada < 1.05 ? "día" : "días"} de trabajo` : ` · el ${numero.format(Math.max(1, jornada * 100))} % de tu día de trabajo`}
              </p>
              <Fichaje minutos={minutos} />
              {amigo && amigoItem?.id === item.id && propios ? (
                <p className="ca-hs-duelo">
                  {minutos < amigo.minutos ? "A vos te cuesta menos." : minutos > amigo.minutos ? "A vos te cuesta más." : "Les cuesta lo mismo."} Tu amigo: cerca de {duracion(amigo.minutos).texto}. Vos: {duracion(minutos).texto}.
                </p>
              ) : null}
            </>
          ) : (
            <p className="ca-hs-antes">Poné tu sueldo para ver cuántas horas de trabajo te cuesta cada cosa.</p>
          )}
        </div>
      </section>

      <section className="ca-hs-grilla-seccion" aria-labelledby="ca-hs-grilla-titulo">
        <div className="ca-hs-cabeza-seccion">
          <h2 id="ca-hs-grilla-titulo" className="ca-hs-h2">
            {propios ? "Lo que te cuesta cada cosa en horas de tu trabajo" : "Lo que cuesta cada cosa con el salario mínimo"}
          </h2>
          <p className="ca-hs-bajada">Tocá una para ponerla arriba y armar tu tarjeta. Los precios son oficiales y cada uno dice de cuándo es.</p>
        </div>
        <ul className="ca-hs-grilla">
          {ordenados.map((i) => {
            const min = porHora ? minutosDe(i.monto, porHora) : null;
            return (
              <li key={i.id}>
                <button type="button" className="ca-hs-tarjeta" aria-pressed={i.id === item?.id} onClick={() => setElegido(i.id)}>
                  <span className="ca-hs-tarjeta-nombre">{i.corto}</span>
                  <span className="ca-hs-tarjeta-detalle">
                    {i.cantidad} · {pesos.format(i.monto)}
                  </span>
                  {min ? <Duracion minutos={min} clase="ca-hs-tarjeta-horas" /> : null}
                  <span className="ca-hs-tarjeta-fuente">
                    {i.fuente.organismo}, {i.fecha}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {item ? (
        <section className="ca-hs-compartir" aria-labelledby="ca-hs-compartir-titulo">
          <div className="ca-hs-cabeza-seccion">
            <h2 id="ca-hs-compartir-titulo" className="ca-hs-h2">
              {propios ? "Tu tarjeta, lista para subir" : "Compartila y que cada uno calcule la suya"}
            </h2>
            <p className="ca-hs-bajada">
              {propios ? `Muestra lo que te cuesta ${item.nombre} en horas. Ni tu sueldo ni lo que vale tu hora aparecen en la imagen ni en el link.` : "Cuando pongas tu sueldo, la tarjeta muestra tus horas. Nunca tu sueldo."}
            </p>
          </div>
          <Redes t={redes} opciones={opciones} cuadrado={`${imagen}&formato=cuadrado`} archivo="calcular-horas" alt={compartidos ? fraseCompartir(item.nombre, compartidos) : `¿Cuántas horas de trabajo te cuesta ${item.nombre}?`} />
        </section>
      ) : null}

      {datos.afuera ? (
        <section className="ca-hs-afuera" aria-labelledby="ca-hs-afuera-titulo">
          <div className="ca-hs-cabeza-seccion">
            <h2 id="ca-hs-afuera-titulo" className="ca-hs-h2">
              ¿Y {datos.afuera.producto} afuera?
            </h2>
            <p className="ca-hs-bajada">
              Apple no lo vende en la Argentina. {brutoHora && datos.minimo ? `Si en cada país ganaras ${decimal.format(ratio)} ${ratio >= 0.95 && ratio < 1.05 ? "vez" : "veces"} su salario mínimo, como acá, te costaría:` : "Con el salario mínimo de cada país, en la tienda oficial de Apple, cuesta:"}
            </p>
          </div>
          <ul className="ca-hs-afuera-lista">
            {[...datos.afuera.paises]
              .sort((a, b) => a.horasMinimo - b.horasMinimo)
              .map((p) => (
                <li key={p.iso}>
                  <img src={`/banderas/${p.iso.toLowerCase()}.svg`} width={24} height={16} alt="" loading="lazy" decoding="async" />
                  <span>{p.nombre}</span>
                  <Duracion minutos={(p.horasMinimo * 60) / ratio} clase="ca-hs-afuera-horas" />
                </li>
              ))}
          </ul>
          <p className="ca-hs-afuera-pie">
            ¿Y cuánto te quedaría en mano en otro país?{" "}
            <Link
              href={RUTA_MUNDO_AR}
              onClick={() => {
                if (monto) guardarTraspasoAR(modo === "bruto" ? monto : netoABruto(monto));
              }}
            >
              Comparalo con tu sueldo
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" />
              </svg>
            </Link>
          </p>
        </section>
      ) : null}
    </div>
  );
}
