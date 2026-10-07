"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { haySesion } from "@/lib/sesion-cliente";

function suscribir(avisar: () => void) {
  window.addEventListener("focus", avisar);
  document.addEventListener("visibilitychange", avisar);
  return () => {
    window.removeEventListener("focus", avisar);
    document.removeEventListener("visibilitychange", avisar);
  };
}

const ITEMS: { href: string; texto: string; icono: ReactNode }[] = [
  {
    href: "/cuenta",
    texto: "Mi cuenta",
    icono: <path d="M10 10a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM4 16.5c.9-2.6 3.2-4 6-4s5.1 1.4 6 4" />,
  },
  {
    href: "/cuenta#planillas",
    texto: "Mis planillas",
    icono: <path d="M4.5 3.5h7l4 4v9h-11v-13ZM11.5 3.5v4h4M7.5 11h5M7.5 13.75h5" />,
  },
  {
    href: "/cuenta#calculos",
    texto: "Mis cálculos",
    icono: <path d="M5 3.5h10v13H5v-13ZM7.5 6.5h5M7.5 10h1M11.5 10h1M7.5 13h1M11.5 13h1" />,
  },
  {
    href: "/cuenta#seguridad",
    texto: "Clave y seguridad",
    icono: <path d="M10 2.75 4.5 5v4.5c0 3.5 2.4 6.2 5.5 7.75 3.1-1.55 5.5-4.25 5.5-7.75V5L10 2.75ZM7.75 10l1.6 1.6 3-3.2" />,
  },
];

function Icono({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

function moverFoco(e: KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
  e.preventDefault();
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[role=menuitem]"));
  const i = items.indexOf(document.activeElement as HTMLElement);
  const n = items.length;
  const sig = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n;
  items[sig]?.focus();
}

// Igual que SesionLink: el servidor pinta «Ingresar» (las páginas públicas son estáticas) y el
// cliente corrige al hidratar leyendo la cookie-pista.
export function MenuCuenta({ claseIngresar }: { claseIngresar: string }) {
  const pathname = usePathname();
  const conSesion = useSyncExternalStore(suscribir, haySesion, () => false);
  const [abierto, setAbierto] = useState(false);
  const [montado, setMontado] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const idMenu = useId();

  useEffect(() => setAbierto(false), [pathname]);

  // Sigue montado 150 ms después de cerrar para que la salida se vea.
  useEffect(() => {
    if (abierto) {
      setMontado(true);
      return;
    }
    const t = setTimeout(() => setMontado(false), 150);
    return () => clearTimeout(t);
  }, [abierto]);

  // Por debajo de lg el menú cuelga del borde de la grilla del header, no del avatar (con el avatar
  // a ~100 px del borde, un menú de 15 rem se salía por la izquierda en 360 px o menos). La
  // animación nace igual en el avatar: se mide con offsetLeft, que ignora el transform en curso.
  const visible = abierto || montado;
  useLayoutEffect(() => {
    const m = menu.current;
    const b = boton.current;
    const padre = m?.offsetParent;
    if (!m || !b || !padre) return;
    const origen = b.getBoundingClientRect().left + b.offsetWidth / 2 - (padre.getBoundingClientRect().left + padre.clientLeft + m.offsetLeft);
    m.style.transformOrigin = `${Math.round(origen)}px 0`;
  }, [visible]);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(false);
      boton.current?.focus();
    };
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  if (!CUENTAS_ACTIVAS) return null;

  if (!conSesion) {
    // <a> y no <Link>: navegación completa, así los anuncios de la página pública no siguen vivos en /login.
    return (
      <a href="/login" className={claseIngresar} data-sesion="no">
        Ingresar
      </a>
    );
  }

  return (
    <div ref={raiz} className="lg:relative" data-sesion="si">
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-controls={abierto ? idMenu : undefined}
        aria-label="Tu cuenta"
        className={`grid size-11 place-items-center rounded-full outline-none transition-[background-color,transform] duration-200 ease-fluid active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500/60 lg:size-10 ${abierto ? "bg-zinc-900/[0.06]" : "hover:bg-zinc-900/[0.04]"}`}
      >
        <span className="grid size-8 place-items-center rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.2)]">
          <Icono className="size-[17px]">
            <path d="M10 9.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.75 16.25c.85-2.4 2.95-3.75 5.25-3.75s4.4 1.35 5.25 3.75" />
          </Icono>
        </span>
      </button>

      {visible ? (
        <div
          ref={menu}
          id={idMenu}
          role="menu"
          aria-label="Tu cuenta"
          data-estado={abierto ? "abierto" : "cerrando"}
          inert={!abierto}
          onKeyDown={moverFoco}
          className="ca-menu-cuenta absolute right-4 top-[calc(100%+0.5rem)] z-50 w-[min(15rem,calc(100vw-2rem))] rounded-[1.25rem] bg-zinc-900/[0.035] p-1 ring-1 ring-zinc-900/[0.07] sm:right-6 lg:right-0"
        >
          <div className="ca-menu-cuenta-lista rounded-2xl bg-white p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.05),0_18px_40px_-16px_rgba(0,0,0,0.22)]">
            {ITEMS.map((it, i) => (
              <a
                key={it.href}
                href={it.href}
                role="menuitem"
                autoFocus={i === 0}
                style={{ "--i": i } as CSSProperties}
                className="flex h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium text-zinc-700 outline-none transition-colors duration-150 hover:bg-zinc-100/80 hover:text-zinc-950 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
              >
                <Icono className="size-[18px] text-zinc-400">{it.icono}</Icono>
                {it.texto}
              </a>
            ))}
            <div className="mx-2 my-1.5 h-px bg-zinc-100" style={{ "--i": ITEMS.length } as CSSProperties} />
            {/* POST, como en /cuenta: /auth/salir no acepta GET para que ningún sitio te saque con un <img>. */}
            <form action="/auth/salir" method="post" style={{ "--i": ITEMS.length } as CSSProperties}>
              <button
                type="submit"
                role="menuitem"
                className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-[14px] font-medium text-zinc-700 outline-none transition-colors duration-150 hover:bg-red-50 hover:text-red-700 focus-visible:bg-red-50 focus-visible:text-red-700"
              >
                <Icono className="size-[18px] opacity-70">
                  <path d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8M12.5 13.5 16 10l-3.5-3.5M16 10H8" />
                </Icono>
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
