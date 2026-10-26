"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type Ref } from "react";
import { ICONOS } from "./iconos";
import { nivelDe, PUNTOS_POR_CANAL, sumarPuntos, usarPuntos, yaSumo, type CanalPuntos } from "./puntos";
import "./estilos-puntos.css";

// Los botones rápidos de compartir con la barra de nivel. Al tocar uno, primero se llena la barra y
// después se abre la red: la demora tiene que quedar bien por debajo de la ventana de activación del toque
// (iOS Safari corta navigator.share y window.open cerca de 1 s después del gesto), por eso 600 ms.
const DEMORA_MS = 600;
const ANIMACION_MS = 700;
const FIESTA_MS = 2600;

const CANALES: readonly { canal: CanalPuntos; nombre: string }[] = [
  { canal: "instagram", nombre: "Instagram" },
  { canal: "whatsapp", nombre: "WhatsApp" },
  { canal: "facebook", nombre: "Facebook" },
  { canal: "x", nombre: "X" },
];

const numero = new Intl.NumberFormat("es-AR");
const sinSuscripcion = () => () => {};
const suave = (t: number) => 1 - Math.pow(1 - t, 3);

function quieto(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface PropsCompartirConPuntos {
  // Identifica la tarjeta que se comparte: cada canal suma una sola vez por clave.
  clave: string;
  acciones: Readonly<Record<CanalPuntos, () => unknown>>;
  aviso?: string;
  destacado?: CanalPuntos;
  refInstagram?: Ref<HTMLButtonElement>;
}

export function CompartirConPuntos({ clave, acciones, aviso, destacado, refInstagram }: PropsCompartirConPuntos) {
  const guardados = usarPuntos();
  // En el servidor no hay localStorage: los tildes de «ya sumó» aparecen recién en el cliente.
  const enCliente = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [animado, setAnimado] = useState<number | null>(null);
  const [cargando, setCargando] = useState<CanalPuntos | null>(null);
  const [chip, setChip] = useState<{ canal: CanalPuntos; suma: number; id: number } | null>(null);
  const [fiesta, setFiesta] = useState<{ n: number; nombre: string; id: number } | null>(null);
  const [repetido, setRepetido] = useState(false);
  const cuadro = useRef(0);
  const relojes = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      cancelAnimationFrame(cuadro.current);
      relojes.current.forEach(clearTimeout);
    },
    [],
  );

  const puntos = animado ?? guardados;
  const { nivel, siguiente, progreso } = nivelDe(puntos);

  const despues = (ms: number, f: () => void) => {
    relojes.current.push(setTimeout(f, ms));
  };

  const tocar = (canal: CanalPuntos) => {
    if (cargando) return;
    const antes = guardados;
    const suma = sumarPuntos(canal, clave);
    if (!suma || quieto()) {
      setRepetido(!suma);
      if (suma) {
        const n = nivelDe(antes + suma).nivel;
        if (n.n > nivelDe(antes).nivel.n) setFiesta({ n: n.n, nombre: n.nombre, id: Date.now() });
      }
      void acciones[canal]();
      return;
    }
    setRepetido(false);
    setCargando(canal);
    setChip({ canal, suma, id: Date.now() });
    const meta = antes + suma;
    const nivelAntes = nivelDe(antes).nivel.n;
    const inicio = performance.now();
    let festejado = false;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / ANIMACION_MS);
      const v = antes + (meta - antes) * suave(t);
      setAnimado(v);
      const n = nivelDe(v).nivel;
      if (!festejado && n.n > nivelAntes) {
        festejado = true;
        setFiesta({ n: n.n, nombre: n.nombre, id: Date.now() });
      }
      if (t < 1) cuadro.current = requestAnimationFrame(paso);
      else setAnimado(null);
    };
    cuadro.current = requestAnimationFrame(paso);
    despues(DEMORA_MS, () => {
      setCargando(null);
      void acciones[canal]();
    });
    despues(1100, () => setChip(null));
  };

  useEffect(() => {
    if (!fiesta) return;
    const r = setTimeout(() => setFiesta(null), FIESTA_MS);
    return () => clearTimeout(r);
  }, [fiesta]);

  const faltan = siguiente ? Math.ceil(siguiente.desde - puntos) : 0;
  const estado = repetido ? "Esta tarjeta ya sumó por esa red. Cambiá de cosa y volvé a sumar." : (aviso ?? "");

  return (
    <div className="ca-pt" data-cargando={cargando ? "" : undefined} data-fiesta={fiesta ? "" : undefined}>
      <div className="ca-pt-cabeza">
        <span className="ca-pt-medalla" data-nivel={nivel.n} key={`m-${nivel.n}`} aria-hidden="true">
          {nivel.n}
          {fiesta ? (
            <span className="ca-pt-chispas" key={fiesta.id}>
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} style={{ "--a": `${i * 30}deg`, "--d": `${(i % 3) * 40}ms` } as CSSProperties} />
              ))}
            </span>
          ) : null}
        </span>
        <div className="ca-pt-titulos">
          <p className="ca-pt-nivel">Nivel {nivel.n}</p>
          <p className="ca-pt-nombre" key={`n-${nivel.n}`}>
            {nivel.nombre}
          </p>
        </div>
        <p className="ca-pt-cuenta">
          <span className="ca-pt-cuenta-n">{numero.format(Math.round(puntos))}</span>
          <span className="ca-pt-cuenta-u">pts</span>
        </p>
      </div>

      <div
        className="ca-pt-barra"
        role="progressbar"
        aria-label={`Nivel ${nivel.n}, ${nivel.nombre}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progreso * 100)}
      >
        <span className="ca-pt-relleno" style={{ transform: `scaleX(${Math.max(0.015, progreso)})` }} />
        <span className="ca-pt-brillo" aria-hidden="true" />
      </div>

      <p className="ca-pt-meta" aria-live="polite">
        {fiesta ? (
          <strong className="ca-pt-subiste" key={fiesta.id}>
            ¡Subiste a nivel {fiesta.n}: {fiesta.nombre}!
          </strong>
        ) : siguiente ? (
          guardados === 0 ? (
            <>Compartí y sumá puntos para subir de nivel</>
          ) : (
            <>
              Te faltan <strong>{numero.format(faltan)} pts</strong> para {siguiente.nombre}
            </>
          )
        ) : (
          "Llegaste al nivel más alto. Sos leyenda."
        )}
      </p>

      <div className="ca-pt-botones" role="group" aria-label="Compartir">
        {CANALES.map(({ canal, nombre }) => {
          const hecho = enCliente && yaSumo(canal, clave);
          return (
            <button
              key={canal}
              ref={canal === "instagram" ? refInstagram : undefined}
              type="button"
              className={`ca-pt-boton ca-pt-${canal}`}
              data-cargando={cargando === canal ? "" : undefined}
              data-destacado={destacado === canal ? "" : undefined}
              aria-label={canal === "x" ? "Compartir en X" : undefined}
              onClick={() => tocar(canal)}
            >
              <span className="ca-pt-boton-carga" aria-hidden="true" />
              {ICONOS[canal]}
              <span className="ca-pt-boton-nombre">{nombre}</span>
              <span className="ca-pt-boton-pts" data-hecho={hecho ? "" : undefined}>
                {hecho ? (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                ) : (
                  `+${PUNTOS_POR_CANAL[canal]}`
                )}
              </span>
              {chip?.canal === canal ? (
                <span className="ca-pt-flota" key={chip.id} aria-hidden="true">
                  +{chip.suma}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="ca-pt-aviso" role="status" aria-live="polite">
        {estado}
      </p>
    </div>
  );
}
