"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { estimarGananciasAnual } from "@/lib/ganancias";
import { RUTA_HORAS_AR } from "@/lib/horas-ar/catalogo";
import { duracion, duracionLarga, codigoHoras, fraseCompartir, leerCodigoHoras, mayuscula, minutosCompartidos, minutosDe, valorHora } from "@/lib/horas-ar/formato";
import { guardarTraspasoAR } from "@/lib/mundo/traspaso-ar";
import { PAGAS_AR } from "@/lib/mundo/pagas-ar";
import { brutoANeto, netoABruto } from "@/lib/sueldo";
import { usarCompartir } from "@/motor/compartir";
import { AlCelu } from "@/motor/compartir/AlCelu";
import { CompartirConPuntos } from "@/motor/compartir/CompartirConPuntos";
import type { TextosRedes } from "@/motor/i18n/redes";
import { CLAVE_TRASPASO, RUTA_MUNDO_AR } from "@/motor/mundo/rutas";
import type { DatosHorasAR, ItemPublicado } from "@/lib/horas-ar/datos";
import { Ilustracion } from "./Ilustracion";
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
  const texto = porHora ? "Cada cuadro es una hora" : unidades > ANIO ? "Más de un año de trabajo. Cada cuadro es una semana de 40 horas" : "Cada cuadro es una semana de 40 horas de trabajo";
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
  // La tarjeta que llega desde el QR de la compu (?ig=asado.150): el celular la muestra igual, sin el
  // sueldo, para mandarla a Instagram con un toque. Se suelta apenas la persona cambia algo.
  const [heredado, setHeredado] = useState<{ id: string; minutos: number } | null>(null);
  const [alCelu, setAlCelu] = useState(false);
  const botonIg = useRef<HTMLButtonElement>(null);
  const idSueldo = useId();
  const idAyuda = useId();

  useEffect(() => {
    const t = traspaso();
    if (!t) return;
    setModo(t.modo);
    setTexto(numero.format(t.monto));
    setTraido(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const desdeQr = leerCodigoHoras(params.get("ig"));
    if (!params.has("ig")) return;
    params.delete("ig");
    const resto = params.toString();
    window.history.replaceState(window.history.state, "", window.location.pathname + (resto ? `?${resto}` : "") + window.location.hash);
    if (!desdeQr || !datos.items.some((i) => i.id === desdeQr.id)) return;
    setHeredado({ id: desdeQr.id, minutos: desdeQr.minutos });
    setElegido(desdeQr.id);
    requestAnimationFrame(() => botonIg.current?.scrollIntoView({ block: "end", behavior: "smooth" }));
  }, [datos.items]);

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

  const item: ItemPublicado | undefined = datos.items.find((i) => i.id === elegido) ?? datos.items[0];
  const delQr = heredado && !monto && item?.id === heredado.id ? heredado : null;
  const minutos = delQr ? delQr.minutos : item && porHora ? minutosDe(item.monto, porHora) : null;
  const propios = Boolean((propia || delQr) && minutos);
  const amigoItem = amigo ? datos.items.find((i) => i.id === amigo.id) : undefined;

  const ordenados = useMemo(() => [...datos.items].sort((a, b) => a.monto - b.monto), [datos.items]);

  // La pantalla muestra los minutos exactos; lo que sale (link, tarjeta, texto) va redondeado a la escala.
  const compartidos = delQr ? delQr.minutos : propios && minutos ? minutosCompartidos(minutos) : null;
  const codigo = item && compartidos ? codigoHoras(item.id, compartidos) : item?.id;
  // Relativa: la vista previa y la descarga salen del mismo sitio que sirve la página (también en una preview).
  const imagen = `${RUTA_HORAS_AR}/og?c=${codigo ?? ""}`;
  const url = item && compartidos ? `${base}/${codigoHoras(item.id, compartidos)}` : base;
  const opciones = useMemo(
    () => ({ origen: "horas" as const, url, titulo: "¿Cuántas horas de trabajo te cuesta?", texto: item ? fraseCompartir(item.nombre, compartidos) : "", imagen: `${imagen}&formato=historia`, historia: `${imagen}&formato=historia` }),
    [url, item, compartidos, imagen],
  );

  const jornada = minutos ? minutos / 60 / horasDia : 0;
  const posicion = item ? ordenados.findIndex((i) => i.id === item.id) : -1;
  const mover = (paso: number) => {
    if (posicion < 0) return;
    setElegido(ordenados[(posicion + paso + ordenados.length) % ordenados.length].id);
  };
  const { compartirEn, compartirInstagram, bajarHistoria, estado } = usarCompartir(opciones);
  const celu = `${base}?ig=${codigo ?? ""}`;
  const instagram = async () => {
    if ((await compartirInstagram("calcular-horas-historia.png")) === "celu") setAlCelu(true);
  };
  // Afuera: los mismos minutos de acá llevados a cada país por el poder de compra de su salario mínimo.
  // Con un ítem que tiene precio oficial en cada tienda (Spotify), sale de ese precio; si no, se estima.
  const minutosMinimo = item && datos.minimo ? minutosDe(item.monto, datos.minimo.porHora) : null;
  const afueraOficial = Boolean(item && datos.afuera?.paises.every((p) => p.oficial[item.id]));
  const afuera = useMemo(() => {
    if (!datos.afuera || !item || !minutos) return [];
    const { minimoPpa, paises } = datos.afuera;
    return paises
      .map((p) => {
        const oficial = p.oficial[item.id];
        const m = afueraOficial && oficial && minutosMinimo ? oficial * 60 * (minutos / minutosMinimo) : (minutos * minimoPpa) / p.minimoPpa;
        return { iso: p.iso, nombre: p.nombre, minutos: m };
      })
      .sort((a, b) => a.minutos - b.minutos);
  }, [datos.afuera, item, minutos, minutosMinimo, afueraOficial]);
  const aviso = estado === "copiado" ? redes.copiado : estado === "historia" ? redes.enInstagram : estado === "descargado" ? redes.descargado : estado === "error" ? redes.error : "";

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
              </>
            ) : delQr ? (
              "Es la tarjeta que armaste en la compu. Poné tu sueldo para recalcularla."
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
              <div className="ca-hs-cosa">
                <span className="ca-hs-cosa-marco" key={item.id}>
                  <Ilustracion id={item.id} prioridad />
                </span>
                <p className="ca-hs-antes">
                  {mayuscula(item.nombre)} {propios ? "te cuesta" : "cuesta, con el salario mínimo,"}
                </p>
                <div className="ca-hs-flechas" role="group" aria-label="Cambiar de cosa">
                  <button type="button" aria-label="Cosa anterior" onClick={() => mover(-1)}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M10 3.5 5.5 8l4.5 4.5" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Cosa siguiente" onClick={() => mover(1)}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M6 3.5 10.5 8 6 12.5" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="ca-hs-cifra" key={`${item.id}-${minutos}`}>
                <Duracion minutos={minutos} clase="ca-hs-cifra-texto" />
              </p>
              <p className="ca-hs-despues">
                de trabajo
                {jornada >= 1 ? ` · ${decimal.format(jornada)} ${jornada < 1.05 ? "día" : "días"} de trabajo` : ` · el ${numero.format(Math.max(1, jornada * 100))} % de tu día de trabajo`}
              </p>
              <Fichaje minutos={minutos} />
              <CompartirConPuntos
                clave={codigo ?? item.id}
                aviso={aviso}
                destacado={delQr ? "instagram" : undefined}
                refInstagram={botonIg}
                acciones={{ instagram, whatsapp: () => compartirEn("whatsapp"), facebook: () => compartirEn("facebook"), x: () => compartirEn("x") }}
              />
              <AlCelu abierto={alCelu} cerrar={() => setAlCelu(false)} destino={celu} pagina t={redes} bajar={() => void bajarHistoria("calcular-horas-historia.png")} />
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

      {datos.afuera && item && minutos ? (
        <section className="ca-hs-afuera" aria-labelledby="ca-hs-afuera-titulo">
          <div className="ca-hs-cabeza-seccion">
            <h2 id="ca-hs-afuera-titulo" className="ca-hs-h2">
              ¿Y {item.nombre} afuera?
            </h2>
            <p className="ca-hs-bajada">{propios ? "Si ganaras lo mismo que vos pero en otro país, te costaría:" : "Con el salario mínimo de cada país, cuesta:"}</p>
          </div>
          <ul className="ca-hs-afuera-lista">
            <li data-propio="">
              <img src="/banderas/ar.svg" width={24} height={16} alt="" loading="lazy" decoding="async" />
              <span>{propios ? "Argentina, vos" : "Argentina"}</span>
              <Duracion minutos={minutos} clase="ca-hs-afuera-horas" />
            </li>
            {afuera.map((p) => (
              <li key={p.iso}>
                <img src={`/banderas/${p.iso.toLowerCase()}.svg`} width={24} height={16} alt="" loading="lazy" decoding="async" />
                <span>{p.nombre}</span>
                <Duracion minutos={p.minutos} clase="ca-hs-afuera-horas" />
              </li>
            ))}
          </ul>
          <p className="ca-hs-afuera-nota">
            {afueraOficial
              ? `Con el precio oficial de ${item.corto} en cada país${propios ? ", y un sueldo que en cada país vale lo mismo que el tuyo acá frente al salario mínimo" : ""}.`
              : `Estimado: llevamos el precio de acá a cada país con el poder de compra del Banco Mundial${propios ? ", y un sueldo que en cada país vale lo mismo que el tuyo acá frente al salario mínimo" : ""}.`}
          </p>
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
