"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Pagina, SeccionMenu, TabEncabezado } from "@/data/navegacion";
import { SesionLink } from "@/components/SesionLink";
import { MenuCuenta } from "@/components/MenuCuenta";
import { Buscador } from "@/components/buscador/Buscador";
import { useAtajo } from "@/components/buscador/atajo";
import {
  abrirBuscador,
  cargarNavegacion,
  precargarMotor,
  precargarNavegacion,
} from "@/components/buscador/control";
import { IconoLupa } from "@/components/buscador/iconos";
import { registrarVisita } from "@/components/buscador/recientes";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type Nav = Awaited<ReturnType<typeof cargarNavegacion>>;

// El contenido de los menús (~110 links) no viaja en el JS de cada página: se pide recién
// cuando hay intención (hover sobre la barra, toque en el menú) y queda en caché del navegador.
function useNavegacion(activa: boolean): Nav | null {
  const [nav, setNav] = useState<Nav | null>(null);
  useEffect(() => {
    if (!activa || nav) return;
    let vivo = true;
    cargarNavegacion().then(
      (m) => vivo && setNav(m),
      () => {},
    );
    return () => {
      vivo = false;
    };
  }, [activa, nav]);
  return nav;
}

function isActiveMatch(match: string[], pathname: string): boolean {
  return match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

function enRuta(href: string, pathname: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Marca: el mismo signo "=" del favicon/OG (el resultado de un cálculo).
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="CalculAR — inicio"
      className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none"
    >
      <span
        className="grid size-9 place-items-center rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-300 ease-fluid group-hover:-rotate-3 group-active:scale-95"
        style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #059669 100%)" }}
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block h-[3px] w-4 rounded-full bg-white" />
          <span className="block h-[3px] w-4 rounded-full bg-white transition-transform duration-300 ease-fluid group-hover:translate-x-[2px]" />
        </span>
      </span>
      <span className="text-[1.35rem] font-bold leading-none tracking-tight text-zinc-900">
        Calcul<span className="text-emerald-600">AR</span>
      </span>
    </Link>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-emerald-700">
      {children}
    </span>
  );
}

function PanelItem({
  pagina,
  destacado,
  active,
  showDesc,
  onNavigate,
}: {
  pagina: Pagina;
  destacado?: boolean;
  active: boolean;
  showDesc: boolean;
  onNavigate: () => void;
}) {
  const label = pagina.corto ?? pagina.titulo;
  return (
    <Link
      href={pagina.href}
      prefetch={false}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cx(
        "group/i flex items-start gap-2 rounded-lg outline-none transition-colors duration-150",
        showDesc ? "px-3 py-2.5" : "min-h-8 px-2.5 py-1.5",
        destacado && "ring-1 ring-emerald-100",
        active ? "bg-emerald-50" : destacado ? "bg-emerald-50/60 hover:bg-emerald-50" : "hover:bg-zinc-100/80",
      )}
    >
      <div className="min-w-0 flex-1">
        <div
          className={cx(
            "flex items-center gap-2 font-medium",
            showDesc ? "text-sm font-semibold" : "text-[13.5px] leading-snug",
            active || destacado ? "text-emerald-700" : "text-zinc-700",
            !active && !destacado && "group-hover/i:text-zinc-950",
          )}
        >
          <span className={showDesc ? "truncate" : ""}>{label}</span>
          {destacado && <Badge>Excel</Badge>}
        </div>
        {showDesc && pagina.descripcion && (
          <p className="mt-0.5 text-xs leading-snug text-zinc-500">{pagina.descripcion}</p>
        )}
      </div>
      <ArrowRight
        className={cx(
          "shrink-0 -translate-x-1 text-emerald-500 opacity-0 transition-[opacity,translate] duration-200 group-hover/i:translate-x-0 group-hover/i:opacity-100",
          showDesc ? "mt-0.5 size-4" : "mt-[3px] size-3.5",
        )}
      />
    </Link>
  );
}

function SeccionCajon({
  seccion,
  pathname,
  onNavigate,
  orden,
}: {
  seccion: SeccionMenu;
  pathname: string;
  onNavigate: () => void;
  orden: number;
}) {
  const items = [...seccion.paginas, ...seccion.destacados];
  const activa = items.some((p) => enRuta(p.href, pathname));
  return (
    <details open={activa} className="ca-cajon-item group/d" style={{ "--i": orden } as CSSProperties}>
      <summary
        className={cx(
          "flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 text-[15px] font-semibold outline-none transition-colors active:bg-zinc-100 [&::-webkit-details-marker]:hidden",
          activa ? "text-emerald-700" : "text-zinc-800 hover:bg-zinc-50",
        )}
      >
        <span className="min-w-0 truncate">{seccion.titulo}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-xs font-medium tabular-nums text-zinc-400">{seccion.paginas.length}</span>
          <ChevronDown className="size-4 text-zinc-400 transition-transform duration-200 group-open/d:rotate-180" />
        </span>
      </summary>
      <div className="mb-1 pb-2 pl-2">
        {items.map((p) => {
          const itemActive = enRuta(p.href, pathname);
          const destacado = seccion.destacados.includes(p);
          return (
            <Link
              key={p.href}
              href={p.href}
              prefetch={false}
              onClick={onNavigate}
              aria-current={itemActive ? "page" : undefined}
              className={cx(
                "flex min-h-11 items-center gap-2 rounded-xl px-3 py-1.5 text-[14.5px] outline-none transition-colors active:bg-zinc-100",
                itemActive
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : destacado
                    ? "font-medium text-emerald-700 hover:bg-emerald-50/70"
                    : "text-zinc-700 hover:bg-zinc-50",
              )}
            >
              {p.corto ?? p.titulo}
              {destacado && <Badge>Excel</Badge>}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

const MAS_LINKS = [
  { href: "/blog", label: "Guías" },
  { href: "/sobre", label: "Sobre CalculAR" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader({ tabs }: { tabs: TabEncabezado[] }) {
  const pathname = usePathname();
  const atajo = useAtajo();

  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quiereNav, setQuiereNav] = useState(false);

  const nav = useNavegacion(quiereNav || !!openKey || mobileOpen);

  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cajonRef = useRef<HTMLDialogElement>(null);
  const cajonPanelRef = useRef<HTMLDivElement>(null);
  const cerrarCajonRef = useRef<HTMLButtonElement>(null);

  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);

  const activeKey = tabs.find((t) => isActiveMatch(t.match, pathname))?.key ?? null;
  const openTab = tabs.find((t) => t.key === openKey && t.type === "group");
  const columnas = openTab && nav ? nav.columnasDelTab(openTab.key) : null;

  const pedirNav = useCallback(() => {
    setQuiereNav(true);
    precargarNavegacion();
  }, []);

  const finCierre = useRef<ReturnType<typeof setTimeout> | null>(null);

  const terminarCierre = useCallback(() => {
    if (finCierre.current) {
      clearTimeout(finCierre.current);
      finCierre.current = null;
    }
    const d = cajonRef.current;
    if (d?.open) d.close();
  }, []);

  // close() recién cuando termina la transición de salida: un <dialog> cerrado desaparece al instante.
  // El timer es la red de seguridad si el navegador no llega a disparar transitionend.
  const cerrarCajon = useCallback(() => {
    const d = cajonRef.current;
    const panel = cajonPanelRef.current;
    if (!d?.open || finCierre.current) return;
    if (panel) {
      panel.style.transition = "";
      panel.style.translate = "";
    }
    d.dataset.visible = "false";
    finCierre.current = setTimeout(terminarCierre, 360);
  }, [terminarCierre]);

  // El reflow antes de marcar data-visible deja el estado cerrado como punto de partida de la transición.
  const abrirCajon = useCallback(() => {
    const d = cajonRef.current;
    if (!d || d.open) return;
    d.showModal();
    void d.offsetWidth;
    d.dataset.visible = "true";
    cerrarCajonRef.current?.focus();
    setMobileOpen(true);
    pedirNav();
  }, [pedirNav]);

  useEffect(
    () => () => {
      if (finCierre.current) clearTimeout(finCierre.current);
    },
    [],
  );

  useEffect(() => {
    registrarVisita(pathname);
    setOpenKey(null);
    cerrarCajon();
  }, [pathname, cerrarCajon]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Si el cajón queda abierto al pasar a escritorio, el resto de la página quedaría inerte
  // detrás de un diálogo que ya no se ve (el cajón es lg:hidden).
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && terminarCierre();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mobileOpen, terminarCierre]);

  // Barra activa deslizante: descansa bajo el tab de la sección actual y se
  // desliza al tab bajo el cursor. La animación la hace CSS (.ca-underline).
  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const key = hoveredKey ?? activeKey;
    const el = key ? tabRefs.current[key] : null;
    if (!el) {
      setUnderline(null);
      return;
    }
    const cr = row.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const inset = 12;
    setUnderline({ left: er.left - cr.left + inset, width: Math.max(0, er.width - inset * 2) });
  }, [hoveredKey, activeKey]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(row);
    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      void document.fonts.ready.then(() => measure());
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenKey(null);
      setHoveredKey(null);
    }, 140);
  }, [cancelClose]);

  const closeAndFocusTrigger = useCallback(() => {
    const el = openKey ? tabRefs.current[openKey] : null;
    setOpenKey(null);
    setHoveredKey(null);
    el?.focus();
  }, [openKey]);

  // Cerrar el panel al clickear fuera del header completo (el panel vive fuera del <nav>).
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenKey(null);
        setHoveredKey(null);
      }
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndFocusTrigger();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKey, closeAndFocusTrigger]);

  // Tabular fuera del header cierra el panel: si no, queda abierto y tapando
  // contenido mientras el foco ya está en la página.
  useEffect(() => {
    if (!openKey) return;
    const onFocusIn = (e: FocusEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenKey(null);
        setHoveredKey(null);
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [openKey]);

  // Solo el mouse abre por hover: en touch, `pointerenter` dispara junto al tap y
  // el click posterior cerraba el panel que se acababa de abrir.
  const openedByHover = useRef(false);
  const handleTabEnter = useCallback(
    (tab: TabEncabezado, pointerType: string) => {
      if (pointerType !== "mouse") return;
      cancelClose();
      setHoveredKey(tab.key);
      if (tab.type === "group") {
        openedByHover.current = true;
        setOpenKey(tab.key);
      } else {
        setOpenKey(null);
      }
    },
    [cancelClose],
  );

  // Con mouse el panel ya se abrió al pasar por encima; si el click volviera a
  // togglear, cliquear el tab que estás mirando lo cerraría y parecería roto.
  const handleTriggerClick = useCallback((key: string, open: boolean) => {
    if (open && openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    openedByHover.current = false;
    setOpenKey(open ? null : key);
  }, []);

  // El foco se mueve en un efecto y no junto al setState: el panel todavía no está en el DOM
  // en ese momento, y ahora además espera a que lleguen los datos del menú.
  const enfocarPrimero = useRef(false);
  const openAndFocusFirst = useCallback((key: string) => {
    enfocarPrimero.current = true;
    setOpenKey(key);
    setHoveredKey(key);
  }, []);

  useEffect(() => {
    if (!openKey || !columnas || !enfocarPrimero.current) return;
    enfocarPrimero.current = false;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [openKey, columnas]);

  // Deslizar el cajón hacia la derecha lo cierra. Sólo con el dedo: con mouse se usa la cruz.
  // `touch-action: pan-y` deja el scroll vertical al navegador y nos manda el horizontal.
  const arrastre = useRef<{ x: number; y: number; t: number; id: number; activo: boolean; dx: number } | null>(null);
  const alApoyar = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" || arrastre.current) return;
    arrastre.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, activo: false, dx: 0 };
  };
  const alMover = (e: ReactPointerEvent<HTMLDivElement>) => {
    const a = arrastre.current;
    const panel = cajonPanelRef.current;
    if (!a || a.id !== e.pointerId || !panel) return;
    const dx = e.clientX - a.x;
    const dy = e.clientY - a.y;
    if (!a.activo) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (dx <= 0 || Math.abs(dy) > Math.abs(dx)) {
        arrastre.current = null;
        return;
      }
      a.activo = true;
      a.t = performance.now();
      a.x = e.clientX;
      panel.setPointerCapture(e.pointerId);
      panel.style.transition = "none";
      return;
    }
    a.dx = Math.max(0, e.clientX - a.x);
    panel.style.translate = `${a.dx}px 0`;
  };
  const alSoltar = (e: ReactPointerEvent<HTMLDivElement>) => {
    const a = arrastre.current;
    const panel = cajonPanelRef.current;
    if (!a || a.id !== e.pointerId) return;
    arrastre.current = null;
    if (!a.activo || !panel) return;
    const velocidad = a.dx / Math.max(1, performance.now() - a.t);
    if (a.dx > panel.offsetWidth * 0.32 || (velocidad > 0.45 && a.dx > 24)) {
      cerrarCajon();
    } else {
      panel.style.transition = "";
      panel.style.translate = "";
    }
  };

  // Los paneles angostos nacen bajo su pestaña y se frenan en los bordes del contenedor:
  // anclarlos a izquierda/derecha fija los dejaba corridos respecto del tab que los abrió.
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const posicionarPanel = useCallback(() => {
    const wrap = panelWrapRef.current;
    const panel = panelRef.current;
    const trigger = openKey ? tabRefs.current[openKey] : null;
    if (!wrap || !panel || !trigger) return;
    const cs = getComputedStyle(wrap);
    const wr = wrap.getBoundingClientRect();
    const inicio = wr.left + parseFloat(cs.paddingLeft);
    const ancho = wr.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const deseado = trigger.getBoundingClientRect().left - inicio - 12;
    setPanelLeft(Math.round(Math.min(Math.max(0, deseado), Math.max(0, ancho - panel.offsetWidth))));
  }, [openKey]);

  useLayoutEffect(() => {
    if (openKey && columnas) posicionarPanel();
  }, [openKey, columnas, posicionarPanel]);

  useEffect(() => {
    if (!openKey) return;
    window.addEventListener("resize", posicionarPanel);
    return () => window.removeEventListener("resize", posicionarPanel);
  }, [openKey, posicionarPanel]);

  const underlineOpacity =hoveredKey && hoveredKey !== activeKey ? 0.7 : 1;
  const cols = columnas?.length ?? 1;
  const showDesc = cols <= 2;
  const secciones = nav ? nav.seccionesDelMenu() : null;

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div
        className="relative w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderColor: scrolled ? "rgba(24,24,27,0.09)" : "rgba(228,228,231,0.6)",
          boxShadow: scrolled ? "0 10px 30px -22px rgba(0,0,0,0.25), 0 1px 0 0 rgba(0,0,0,0.03)" : "none",
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Logo />

          <nav className="ml-4 hidden lg:block xl:ml-8" aria-label="Principal" onPointerEnter={pedirNav} onFocusCapture={pedirNav}>
            <div ref={rowRef} className="relative flex items-center gap-0.5">
              {tabs.map((tab) => {
                const active = activeKey === tab.key;
                const open = openKey === tab.key;
                const triggerCls = cx(
                  "relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-200",
                  active || open ? "text-emerald-700" : "text-zinc-600 hover:bg-zinc-900/[0.035] hover:text-zinc-900",
                );

                if (tab.type === "link" && tab.href) {
                  return (
                    <div
                      key={tab.key}
                      onPointerEnter={(e) => handleTabEnter(tab, e.pointerType)}
                      onPointerLeave={(e) => {
                        if (e.pointerType === "mouse") scheduleClose();
                      }}
                    >
                      <Link
                        ref={(el) => {
                          tabRefs.current[tab.key] = el;
                        }}
                        href={tab.href}
                        className={triggerCls}
                        aria-current={active ? "page" : undefined}
                        onFocus={() => setHoveredKey(tab.key)}
                        onBlur={() => setHoveredKey(null)}
                      >
                        {tab.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <div
                    key={tab.key}
                    onPointerEnter={(e) => handleTabEnter(tab, e.pointerType)}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") scheduleClose();
                    }}
                  >
                    <button
                      ref={(el) => {
                        tabRefs.current[tab.key] = el;
                      }}
                      type="button"
                      className={triggerCls}
                      aria-expanded={open}
                      aria-controls={`ca-panel-${tab.key}`}
                      onClick={() => handleTriggerClick(tab.key, open)}
                      onFocus={() => setHoveredKey(tab.key)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          openAndFocusFirst(tab.key);
                        }
                      }}
                    >
                      {tab.label}
                      <ChevronDown
                        className={cx("size-3.5 text-zinc-400 transition-transform duration-200", open && "rotate-180 text-emerald-500")}
                      />
                    </button>
                  </div>
                );
              })}

              {underline && underline.width > 0 && (
                <span
                  aria-hidden
                  className="ca-underline pointer-events-none absolute bottom-0.5 left-0 h-[2px] rounded-full bg-emerald-500"
                  style={{ left: underline.left, width: underline.width, opacity: underlineOpacity }}
                />
              )}
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => abrirBuscador()}
              onPointerEnter={precargarMotor}
              onFocus={precargarMotor}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K /"
              aria-label="Buscar una calculadora"
              className="group hidden h-10 items-center gap-2 rounded-full border border-zinc-200/90 bg-white/80 pl-3.5 pr-2 text-sm text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-[border-color,background-color,color,transform] duration-200 ease-fluid hover:border-zinc-300 hover:bg-white hover:text-zinc-800 active:scale-[0.97] lg:inline-flex"
            >
              <IconoLupa className="size-4 transition-transform duration-300 ease-fluid group-hover:-rotate-6" />
              <span className="pr-1">Buscar</span>
              <kbd className="ca-tecla hidden xl:inline-flex">{atajo}</kbd>
            </button>

            <MenuCuenta claseIngresar="hidden h-10 items-center rounded-full px-3.5 text-sm font-medium text-zinc-600 outline-none transition-[background-color,color,transform] duration-200 hover:bg-zinc-900/[0.04] hover:text-zinc-900 active:scale-[0.97] lg:inline-flex" />

            <button
              type="button"
              onClick={() => abrirBuscador()}
              onTouchStart={precargarMotor}
              onPointerDown={precargarMotor}
              aria-haspopup="dialog"
              aria-label="Buscar una calculadora"
              className="grid size-11 place-items-center rounded-full text-zinc-700 outline-none transition-[background-color,transform] duration-200 hover:bg-zinc-900/[0.05] active:scale-95 lg:hidden"
            >
              <IconoLupa className="size-[22px]" />
            </button>

            <button
              type="button"
              onClick={abrirCajon}
              onTouchStart={pedirNav}
              onPointerDown={pedirNav}
              aria-label="Abrir el menú"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              className="-mr-1.5 grid size-11 place-items-center rounded-full text-zinc-700 outline-none transition-[background-color,transform] duration-200 hover:bg-zinc-900/[0.05] active:scale-95 lg:hidden"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mega-panel de escritorio: vive fuera de la barra para ocupar el ancho del contenedor sin
          depender de la posición del tab. El `max-h` + scroll interno garantiza que nunca se corte. */}
      {openTab && columnas && (
        <div className="pointer-events-none absolute inset-x-0 top-full hidden lg:block">
          <div ref={panelWrapRef} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div
              ref={panelRef}
              id={`ca-panel-${openTab.key}`}
              aria-label={openTab.label}
              onPointerEnter={cancelClose}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") scheduleClose();
              }}
              className={cx(
                "ca-dropdown pointer-events-auto mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200/80 bg-white/97 p-3 shadow-[0_28px_70px_-24px_rgba(24,24,27,0.32)] backdrop-blur-xl [scrollbar-width:thin]",
                cols === 1 && "w-[22rem]",
                cols === 2 && "w-[44rem]",
                cols >= 3 && "w-full",
                "max-w-full",
              )}
              style={cols <= 2 ? { marginLeft: panelLeft } : undefined}
            >
              <div
                className={cx(
                  "grid gap-x-3 gap-y-4",
                  cols === 2 && "grid-cols-2",
                  cols === 3 && "grid-cols-3",
                  cols >= 4 && "grid-cols-4",
                )}
              >
                {columnas.map((col, ci) => (
                  <div key={ci} className="ca-col space-y-4" style={{ animationDelay: `${ci * 45}ms` }}>
                    {col.map((sec) => (
                      <div key={sec.id}>
                        {cols > 1 && (
                          <p className="px-2.5 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-zinc-400">
                            {sec.titulo}
                          </p>
                        )}
                        <div className="flex flex-col">
                          {sec.paginas.map((p) => (
                            <PanelItem
                              key={p.href}
                              pagina={p}
                              active={enRuta(p.href, pathname)}
                              showDesc={showDesc}
                              onNavigate={() => setOpenKey(null)}
                            />
                          ))}
                          {sec.destacados.length > 0 && <div className="my-1.5 h-px bg-zinc-100" />}
                          {sec.destacados.map((p) => (
                            <PanelItem
                              key={p.href}
                              pagina={p}
                              destacado
                              active={enRuta(p.href, pathname)}
                              showDesc={showDesc}
                              onNavigate={() => setOpenKey(null)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cajón mobile: <dialog> modal da la trampa de foco, Esc, el fondo inerte y el regreso
          del foco al botón que lo abrió, sin reimplementarlos. Sus links van con prefetch={false}:
          Next igual prefetchea al tocar, y montados de golpe competían con el primer pintado. */}
      <dialog
        ref={cajonRef}
        className="ca-cajon ca-bloquea lg:hidden"
        aria-label="Menú"
        onClose={() => setMobileOpen(false)}
        onCancel={(e) => {
          e.preventDefault();
          cerrarCajon();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) cerrarCajon();
        }}
      >
        <div
          ref={cajonPanelRef}
          className="ca-cajon-panel"
          onPointerDown={alApoyar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
          onTransitionEnd={(e) => {
            if (e.target === e.currentTarget && e.propertyName === "translate" && cajonRef.current?.dataset.visible === "false") {
              terminarCierre();
            }
          }}
        >
          <div className="ca-cajon-item flex shrink-0 items-center justify-between gap-3 px-4 pb-2 pt-3" style={{ "--i": 0 } as CSSProperties}>
            <Logo onClick={cerrarCajon} />
            <button
              ref={cerrarCajonRef}
              type="button"
              onClick={cerrarCajon}
              aria-label="Cerrar el menú"
              className="-mr-1.5 grid size-11 place-items-center rounded-full text-zinc-500 outline-none transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-95"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="ca-cajon-item shrink-0 px-4 pb-3" style={{ "--i": 1 } as CSSProperties}>
            <button
              type="button"
              onClick={() => {
                cerrarCajon();
                abrirBuscador();
              }}
              onTouchStart={precargarMotor}
              className="flex h-12 w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 text-left text-[15px] text-zinc-500 outline-none transition-[background-color,transform] duration-150 active:scale-[0.98] active:bg-zinc-100"
            >
              <IconoLupa className="size-5 text-zinc-400" />
              Buscar una calculadora
            </button>
          </div>

          <nav aria-label="Todas las calculadoras" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3 [scrollbar-width:thin]">
            {secciones ? (
              <div>
                {secciones.map((s, i) => (
                  <SeccionCajon key={s.id} seccion={s} pathname={pathname} onNavigate={cerrarCajon} orden={Math.min(i + 2, 7)} />
                ))}
                <div className="ca-cajon-item mt-2 border-t border-zinc-100 pt-2" style={{ "--i": 7 } as CSSProperties}>
                  {MAS_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      prefetch={false}
                      onClick={cerrarCajon}
                      aria-current={enRuta(l.href, pathname) ? "page" : undefined}
                      className={cx(
                        "flex min-h-11 items-center rounded-xl px-3 text-[14.5px] outline-none transition-colors active:bg-zinc-100",
                        enRuta(l.href, pathname) ? "bg-emerald-50 text-emerald-700" : "text-zinc-600 hover:bg-zinc-50",
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 px-3 pt-2" aria-hidden>
                {[64, 48, 72, 56, 40, 60].map((w, i) => (
                  <div key={i} className="flex h-12 items-center">
                    <span className="h-3.5 rounded-full bg-zinc-100" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
            )}
          </nav>

          <div
            className="ca-cajon-item shrink-0 border-t border-zinc-200/80 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
            style={{ "--i": 7 } as CSSProperties}
          >
            <SesionLink className="flex h-12 w-full items-center justify-center rounded-2xl bg-zinc-900 text-[15px] font-semibold text-white outline-none transition-[background-color,transform] duration-150 active:scale-[0.98] active:bg-zinc-800" />
            <p className="mt-3 text-center text-xs text-zinc-500">Datos de fuentes oficiales · Hecho en Argentina</p>
          </div>
        </div>
      </dialog>

      <Buscador />
    </header>
  );
}
