"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Une clases condicionales sin dependencias (calcular-ar no tiene clsx/cn).
function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

// ── Modelo de navegación ──────────────────────────────────────────────────
// Un grupo se dibuja en COLUMNAS, y cada columna apila secciones con título.
// Es lo que hace que "Sueldo" (53 calculadoras) entre en pantalla: una sola
// lista vertical medía más que cualquier viewport y quedaba cortada sin scroll.
// `match` define qué prefijos de ruta marcan al tab como activo.
type NavLink = {
  href: string;
  label: string;
  desc?: string;
  badge?: string;
  featured?: boolean;
};
type Seccion = { title?: string; items: NavLink[] };
type Tab =
  | {
      type: "group";
      key: string;
      label: string;
      align: "left" | "right";
      match: string[];
      cols: Seccion[][];
    }
  | { type: "link"; key: string; label: string; href: string; match: string[] };

const TABS: Tab[] = [
  {
    type: "group",
    key: "monotributo",
    label: "Monotributo",
    align: "left",
    match: ["/monotributo"],
    cols: [
      [
        {
          items: [
            {
              href: "/monotributo",
              label: "Calculadora",
              desc: "Tu categoría y cuánto pagás por mes",
            },
            {
              href: "/monotributo/categorias",
              label: "Categorías 2026",
              desc: "La tabla oficial completa de ARCA",
            },
            {
              href: "/monotributo/recategorizacion",
              label: "Recategorización",
              desc: "Cuándo es y si te toca cambiar",
            },
            {
              href: "/obra-social-monotributo",
              label: "Obra social",
              desc: "Desde cuándo te cubre y qué te pueden negar",
            },
          ],
        },
      ],
    ],
  },
  {
    type: "group",
    key: "sueldo",
    label: "Sueldo y trabajo",
    align: "left",
    match: [
      "/sueldo-neto",
      "/aguinaldo",
      "/vacaciones",
      "/indemnizacion",
      "/indemnizacion-por-fallecimiento",
      "/indemnizacion-art",
      "/comision-medica",
      "/derechohabientes-art",
      "/aportes-jubilatorios-obligatorios",
      "/empleador-sin-art",
      "/rechazo-art",
      "/pluriempleo-art",
      "/art-empleada-domestica",
      "/actualizacion-creditos-laborales",
      "/propinas",
      "/certificado-de-trabajo",
      "/tiempo-parcial",
      "/reingreso",
      "/horas-extras",
      "/periodo-de-prueba",
      "/descuentos-del-sueldo",
      "/derivar-aportes-a-prepaga",
      "/hasta-cuando-tengo-obra-social",
      "/obra-social-monotributo",
      "/repartidores-de-apps",
      "/rifl",
      "/contratar-persona-con-discapacidad",
      "/prescripcion-deuda-arca",
      "/multas-arca",
      "/despido-de-delegado-gremial",
      "/practicas-desleales-sindicales",
      "/trabajo-de-mujeres",
      "/temeridad-y-malicia",
      "/renuncia",
      "/reserva-del-empleo",
      "/libro-de-sueldos",
      "/despido-plazo-fijo",
      "/ius-variandi",
      "/transferencia-del-establecimiento",
      "/conservacion-de-recibos",
      "/despido-trabajador-rural",
      "/fondo-de-asistencia-laboral",
      "/rimi-inversiones",
      "/servicios-esenciales-huelga",
      "/negociacion-de-buena-fe",
      "/caducidad-de-instancia-laboral",
      "/impuestos-internos",
      "/venta-de-inmuebles",
      "/honorarios-periciales",
      "/convenio-vencido",
      "/actualizacion-de-quebrantos",
      "/indemnizacion-por-clientela",
      "/indemnizacion-periodista",
      "/despido-empleada-domestica",
      "/salario-minimo",
      "/desempleo",
      "/licencia-por-maternidad",
      "/licencia-por-enfermedad",
      "/licencias-especiales",
      "/empleada-domestica",
      "/aportes-empleada-domestica",
      "/deduccion-empleada-domestica",
      "/deduccion-alquiler",
      "/deducciones-generales-ganancias",
      "/ganancias",
      "/cuota-alimentaria",
    ],
    cols: [
      [
        {
          title: "Tu sueldo, mes a mes",
          items: [
            { href: "/sueldo-neto", label: "Sueldo neto" },
            { href: "/aguinaldo", label: "Aguinaldo (SAC)" },
            { href: "/vacaciones", label: "Vacaciones" },
            { href: "/horas-extras", label: "Horas extras" },
            { href: "/salario-minimo", label: "Salario mínimo" },
            { href: "/tiempo-parcial", label: "Media jornada" },
            { href: "/descuentos-del-sueldo", label: "Descuentos y embargo" },
            { href: "/derivar-aportes-a-prepaga", label: "Aportes de obra social" },
            { href: "/hasta-cuando-tengo-obra-social", label: "Obra social al irte" },
            { href: "/obra-social-monotributo", label: "Obra social del monotributo" },
            { href: "/propinas", label: "Propinas" },
            { href: "/libro-de-sueldos", label: "Libro de sueldos" },
            { href: "/conservacion-de-recibos", label: "Guardar recibos" },
          ],
        },
        {
          title: "Licencias y ausencias",
          items: [
            { href: "/licencia-por-maternidad", label: "Licencia por maternidad" },
            { href: "/licencia-por-enfermedad", label: "Licencia por enfermedad" },
            { href: "/licencias-especiales", label: "Licencias especiales" },
            { href: "/reserva-del-empleo", label: "Reserva del empleo" },
            { href: "/trabajo-de-mujeres", label: "Trabajo de mujeres" },
          ],
        },
      ],
      [
        {
          title: "Cuando termina el trabajo",
          items: [
            { href: "/indemnizacion", label: "Indemnización por despido" },
            { href: "/periodo-de-prueba", label: "Período de prueba" },
            { href: "/renuncia", label: "Renuncia" },
            { href: "/desempleo", label: "Prestación por desempleo" },
            { href: "/certificado-de-trabajo", label: "Certificado de trabajo" },
            {
              href: "/actualizacion-creditos-laborales",
              label: "Actualizar lo que te deben",
            },
            { href: "/despido-plazo-fijo", label: "Despido antes del plazo" },
            { href: "/indemnizacion-por-fallecimiento", label: "Muerte del trabajador" },
            { href: "/indemnizacion-art", label: "Accidente de trabajo (ART)" },
            { href: "/comision-medica", label: "Comisión médica (plazos)" },
            { href: "/derechohabientes-art", label: "Quién cobra la muerte laboral" },
            { href: "/aportes-jubilatorios-obligatorios", label: "¿Tenés que aportar?" },
            { href: "/empleador-sin-art", label: "Empleador sin ART al día" },
            { href: "/rechazo-art", label: "Rechazo de la ART" },
            { href: "/pluriempleo-art", label: "Pluriempleo y ART" },
            { href: "/art-empleada-domestica", label: "ART de casas particulares" },
            { href: "/reingreso", label: "Reingreso al mismo empleador" },
            { href: "/despido-trabajador-rural", label: "Despido rural" },
            { href: "/ius-variandi", label: "Ius variandi" },
            { href: "/transferencia-del-establecimiento", label: "Cambio de dueño" },
          ],
        },
      ],
      [
        {
          title: "Regímenes especiales",
          items: [
            { href: "/empleada-domestica", label: "Empleada doméstica" },
            { href: "/aportes-empleada-domestica", label: "Aportes a ARCA (doméstica)" },
            { href: "/despido-empleada-domestica", label: "Despido de empleada doméstica" },
            { href: "/repartidores-de-apps", label: "Repartidores de apps" },
            { href: "/rifl", label: "RIFL (contratar más barato)" },
            {
              href: "/contratar-persona-con-discapacidad",
              label: "Contratar con discapacidad",
            },
            { href: "/fondo-de-asistencia-laboral", label: "Fondo de Asistencia Laboral" },
            { href: "/indemnizacion-por-clientela", label: "Indemnización por clientela" },
            { href: "/indemnizacion-periodista", label: "Indemnización del periodista" },
            { href: "/cuota-alimentaria", label: "Cuota alimentaria" },
          ],
        },
      ],
      [
        {
          title: "Impuestos y deducciones",
          items: [
            { href: "/ganancias", label: "Ganancias 4.ª categoría" },
            {
              href: "/deduccion-empleada-domestica",
              label: "Deducción de empleada doméstica",
            },
            { href: "/deduccion-alquiler", label: "Deducción de alquiler" },
            { href: "/deducciones-generales-ganancias", label: "Prepaga, médicos y seguros" },
            { href: "/prescripcion-deuda-arca", label: "Prescripción de deuda con ARCA" },
            { href: "/multas-arca", label: "Multas de ARCA" },
            { href: "/actualizacion-de-quebrantos", label: "Quebrantos por IPC" },
            { href: "/venta-de-inmuebles", label: "Vender un inmueble" },
            { href: "/impuestos-internos", label: "Impuestos internos" },
            { href: "/rimi-inversiones", label: "RIMI" },
          ],
        },
        {
          title: "Sindical y juicio laboral",
          items: [
            { href: "/despido-de-delegado-gremial", label: "Despido de delegado gremial" },
            { href: "/practicas-desleales-sindicales", label: "Prácticas desleales" },
            { href: "/servicios-esenciales-huelga", label: "Servicios esenciales" },
            { href: "/negociacion-de-buena-fe", label: "Negociar de buena fe" },
            { href: "/convenio-vencido", label: "Convenio vencido" },
            { href: "/caducidad-de-instancia-laboral", label: "Caducidad de instancia" },
            { href: "/temeridad-y-malicia", label: "Temeridad y malicia" },
            { href: "/honorarios-periciales", label: "Honorarios de peritos" },
          ],
        },
      ],
    ],
  },
  {
    type: "group",
    key: "convenios",
    label: "Convenios",
    align: "right",
    match: ["/convenios", "/planillas"],
    cols: [
      [
        {
          items: [
            {
              href: "/convenios",
              label: "Todos los convenios",
              desc: "Escalas verificadas por gremio",
            },
            {
              href: "/convenios/comercio",
              label: "Empleados de Comercio",
              desc: "FAECYS, con los no remunerativos",
            },
            {
              href: "/convenios/uocra",
              label: "UOCRA (construcción)",
              desc: "Por categoría, zona y jornada",
            },
            {
              href: "/convenios/camioneros",
              label: "Camioneros",
              desc: "Escala del sindicato, actualizada",
            },
            {
              href: "/planillas",
              label: "Planilla de sueldos Comercio",
              desc: "Para liquidar, con la escala embebida",
              badge: "Pro",
              featured: true,
            },
          ],
        },
      ],
    ],
  },
  {
    type: "group",
    key: "finanzas",
    label: "Finanzas y ANSES",
    align: "right",
    match: [
      "/inflacion",
      "/plazo-fijo",
      "/canasta-basica",
      "/jubilacion",
      "/asignaciones-familiares",
      "/pension-no-contributiva",
      "/puam",
      "/edad-avanzada",
      "/82-por-ciento-movil",
      "/pension-veteranos-malvinas",
      "/descuento-pami",
    ],
    cols: [
      [
        {
          title: "Plata y precios",
          items: [
            {
              href: "/inflacion",
              label: "Inflación (IPC)",
              desc: "Actualizá montos con el IPC del INDEC",
            },
            {
              href: "/inflacion/alquiler",
              label: "Ajuste de alquiler",
              desc: "El cronograma de aumentos por IPC",
            },
            {
              href: "/plazo-fijo",
              label: "Plazo fijo",
              desc: "Cuánto rinde, con la tasa del BCRA",
            },
            {
              href: "/canasta-basica",
              label: "Canasta básica",
              desc: "La línea de pobreza de tu hogar",
            },
          ],
        },
      ],
      [
        {
          title: "Jubilaciones y pensiones",
          items: [
            {
              href: "/jubilacion",
              label: "Jubilación y bono",
              desc: "Con tu haber real, no con la mínima",
            },
            {
              href: "/asignaciones-familiares",
              label: "Asignaciones familiares",
              desc: "Cuánto cobrás por hijo según tu casa",
            },
            {
              href: "/puam",
              label: "PUAM (adulto mayor)",
              desc: "A los 65 sin 30 años de aportes",
            },
            {
              href: "/edad-avanzada",
              label: "Prestación por edad avanzada",
              desc: "A los 70 con 10 años de aportes",
            },
            {
              href: "/pension-no-contributiva",
              label: "Pensiones no contributivas",
              desc: "Cuánto paga cada una y el tope para trabajar",
            },
            {
              href: "/82-por-ciento-movil",
              label: "82% móvil (art. 125 bis)",
              desc: "La garantía existe: cuánto paga y a quién",
            },
            {
              href: "/pension-veteranos-malvinas",
              label: "Veteranos de Malvinas",
              desc: "Tres haberes mínimos, además de la jubilación",
            },
            {
              href: "/descuento-pami",
              label: "Descuento de PAMI",
              desc: "3% hasta el mínimo y 6% del excedente",
            },
          ],
        },
      ],
    ],
  },
  { type: "link", key: "guias", label: "Guías", href: "/blog", match: ["/blog"] },
];

// Links del drawer que no son calculadoras (van en una sección "Más").
const EXTRA_LINKS: NavLink[] = [
  { href: "/sobre", label: "Sobre CalculAR" },
  { href: "/contacto", label: "Contacto" },
];

function isActiveMatch(match: string[], pathname: string): boolean {
  return match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

function secciones(tab: Extract<Tab, { type: "group" }>): Seccion[] {
  return tab.cols.flat();
}

// ── Íconos (SVG inline, sin librería) ──────────────────────────────────────
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
        className="grid size-9 place-items-center rounded-xl shadow-sm transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95"
        style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #059669 100%)" }}
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block h-[3px] w-4 rounded-full bg-white" />
          <span className="block h-[3px] w-4 rounded-full bg-white" />
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

// ── Item del panel de escritorio ────────────────────────────────────────────
function PanelItem({
  item,
  active,
  showDesc,
  onNavigate,
}: {
  item: NavLink;
  active: boolean;
  showDesc: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cx(
        "group/i flex items-start gap-2 rounded-lg outline-none transition-colors duration-150",
        showDesc ? "px-3 py-2.5" : "min-h-8 px-2.5 py-1.5",
        item.featured && "ring-1 ring-emerald-100",
        active
          ? "bg-emerald-50"
          : item.featured
            ? "bg-emerald-50/60 hover:bg-emerald-50"
            : "hover:bg-zinc-100/80",
      )}
    >
      <div className="min-w-0 flex-1">
        <div
          className={cx(
            "flex items-center gap-2 font-medium",
            showDesc ? "text-sm font-semibold" : "text-[13.5px] leading-snug",
            active || item.featured ? "text-emerald-700" : "text-zinc-700",
            !active && !item.featured && "group-hover/i:text-zinc-950",
          )}
        >
          <span className={showDesc ? "truncate" : ""}>{item.label}</span>
          {item.badge && <Badge>{item.badge}</Badge>}
        </div>
        {showDesc && item.desc && (
          <p className="mt-0.5 text-xs leading-snug text-zinc-500">{item.desc}</p>
        )}
      </div>
      <ArrowRight
        className={cx(
          "shrink-0 -translate-x-1 text-emerald-500 opacity-0 transition-all duration-200 group-hover/i:translate-x-0 group-hover/i:opacity-100",
          showDesc ? "mt-0.5 size-4" : "mt-[3px] size-3.5",
        )}
      />
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);

  const activeKey = TABS.find((t) => isActiveMatch(t.match, pathname))?.key ?? null;
  const openTab = TABS.find((t) => t.key === openKey && t.type === "group") as
    | Extract<Tab, { type: "group" }>
    | undefined;

  // Cerrar todo al navegar (el pathname cambia con cada ruta).
  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  // Glass reactivo al scroll: una vez desplazado, gana borde + sombra.
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

  // Escape cierra drawer o panel; con el panel, el foco vuelve al disparador.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) setMobileOpen(false);
      else if (openKey) closeAndFocusTrigger();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, openKey, closeAndFocusTrigger]);

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

  // Drawer abierto: lock de scroll del body, foco al primer control, restaurar al cerrar.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    const first = drawerRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])");
    first?.focus();
    return () => {
      document.body.style.overflow = prev;
      (opener && document.contains(opener) ? opener : hamburgerRef.current)?.focus();
    };
  }, [mobileOpen]);

  // Solo el mouse abre por hover: en touch, `pointerenter` dispara junto al tap y
  // el click posterior cerraba el panel que se acababa de abrir.
  const openedByHover = useRef(false);
  const handleTabEnter = useCallback(
    (tab: Tab, pointerType: string) => {
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

  // El foco se mueve en un efecto, no en un rAF junto al setState: el panel todavía
  // no está en el DOM cuando corre el frame, y el foco se quedaba en el disparador.
  const enfocarPrimero = useRef(false);
  const openAndFocusFirst = useCallback((key: string) => {
    enfocarPrimero.current = true;
    setOpenKey(key);
    setHoveredKey(key);
  }, []);

  useEffect(() => {
    if (!openKey || !enfocarPrimero.current) return;
    enfocarPrimero.current = false;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [openKey]);

  const underlineOpacity = hoveredKey && hoveredKey !== activeKey ? 0.7 : 1;
  const cols = openTab?.cols.length ?? 1;
  const showDesc = cols <= 2;

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div
        className="w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderColor: scrolled ? "rgba(16,185,129,0.18)" : "rgba(228,228,231,0.6)",
          boxShadow: scrolled
            ? "0 10px 30px -22px rgba(16,185,129,0.35), 0 1px 0 0 rgba(16,185,129,0.05)"
            : "none",
        }}
      >
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <Logo />

          {/* Navegación de escritorio */}
          <nav className="hidden lg:block" aria-label="Principal">
            <div ref={rowRef} className="relative flex items-center gap-0.5">
              {TABS.map((tab) => {
                const active = activeKey === tab.key;
                const open = openKey === tab.key;
                const triggerCls = cx(
                  "relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors duration-200",
                  active || open
                    ? "text-emerald-700"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-900/[0.035]",
                );

                if (tab.type === "link") {
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
                        className={cx(
                          "size-3.5 text-zinc-400 transition-transform duration-200",
                          open && "rotate-180 text-emerald-500",
                        )}
                      />
                    </button>
                  </div>
                );
              })}

              {underline && underline.width > 0 && (
                <span
                  aria-hidden
                  className="ca-underline pointer-events-none absolute bottom-0.5 left-0 h-[2px] rounded-full bg-emerald-500"
                  style={{
                    left: underline.left,
                    width: underline.width,
                    opacity: underlineOpacity,
                    boxShadow: "0 0 10px rgba(16,185,129,0.55)",
                  }}
                />
              )}
            </div>
          </nav>

          {/* Botón hamburguesa (mobile) */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
            className="grid size-11 place-items-center rounded-lg text-zinc-700 outline-none transition-[background-color,transform] duration-200 hover:bg-zinc-900/[0.05] active:scale-95 lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {/* ── Mega-panel de escritorio ──────────────────────────────────────────
          Vive fuera de la barra (no dentro del <nav>) para poder ocupar el ancho
          del contenedor sin depender de la posición del tab que lo abrió. El
          `max-h` + scroll interno es la garantía dura de que nunca se corta. */}
      {openTab && (
        <div
          className="pointer-events-none absolute inset-x-0 top-full hidden lg:block"
          aria-hidden={false}
        >
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
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
                openTab.align === "right" && cols <= 2 && "ml-auto",
              )}
            >
              <div
                className={cx(
                  "grid gap-x-3 gap-y-4",
                  cols === 2 && "grid-cols-2",
                  cols === 3 && "grid-cols-3",
                  cols >= 4 && "grid-cols-4",
                )}
              >
                {openTab.cols.map((col, ci) => (
                  <div
                    key={ci}
                    className="ca-col space-y-4"
                    style={{ animationDelay: `${ci * 45}ms` }}
                  >
                    {col.map((sec, si) => (
                      <div key={sec.title ?? si}>
                        {sec.title && (
                          <p className="px-2.5 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-zinc-400">
                            {sec.title}
                          </p>
                        )}
                        <div className="flex flex-col">
                          {sec.items.map((item, i) => {
                            const itemActive =
                              pathname === item.href || pathname.startsWith(`${item.href}/`);
                            const showDivider = item.featured && !sec.items[i - 1]?.featured;
                            return (
                              <div key={item.href}>
                                {showDivider && <div className="my-1.5 h-px bg-zinc-100" />}
                                <PanelItem
                                  item={item}
                                  active={itemActive}
                                  showDesc={showDesc}
                                  onNavigate={() => setOpenKey(null)}
                                />
                              </div>
                            );
                          })}
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

      {/* ── Drawer mobile ── (siempre montado para animar entrada/salida)
          Sus ~90 <Link> van con prefetch={false}: montados de entrada, Next los prefetchea
          por viewport y en móvil eso eran 27 requests RSC compitiendo con el primer pintado.
          Con false igual prefetchea al hover/touch, así que la navegación sigue instantánea. */}
      <div
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={cx(
          "fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        inert={!mobileOpen}
        className={cx(
          "fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,380px)] flex-col bg-white shadow-[-16px_0_48px_-12px_rgba(24,24,27,0.25)] transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <Logo onClick={() => setMobileOpen(false)} />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
            className="grid size-11 place-items-center rounded-lg text-zinc-500 outline-none transition-[background-color,transform] duration-200 hover:bg-zinc-100 active:scale-95"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {/* Acordeón nativo: 53 calculadoras bajo "Sueldo" no pueden abrir desplegadas.
            <details> da el patrón accesible (teclado + lectores) sin estado ni JS. */}
        <nav
          aria-label="Principal (mobile)"
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:thin]"
        >
          {TABS.map((tab) => {
            const active = activeKey === tab.key;

            if (tab.type === "link") {
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "flex min-h-12 items-center rounded-xl px-3 text-[15px] font-semibold outline-none transition-colors",
                    active ? "bg-emerald-50 text-emerald-700" : "text-zinc-800 hover:bg-zinc-50",
                  )}
                >
                  {tab.label}
                </Link>
              );
            }

            const total = secciones(tab).reduce((n, s) => n + s.items.length, 0);
            return (
              <details key={tab.key} open={active} className="group/d">
                <summary
                  className={cx(
                    "flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-3 text-[15px] font-semibold outline-none transition-colors [&::-webkit-details-marker]:hidden",
                    active ? "text-emerald-700" : "text-zinc-800 hover:bg-zinc-50",
                  )}
                >
                  <span>{tab.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-medium tabular-nums text-zinc-400">{total}</span>
                    <ChevronDown className="size-4 text-zinc-400 transition-transform duration-200 group-open/d:rotate-180" />
                  </span>
                </summary>

                <div className="mb-1 space-y-3 pb-2 pl-2">
                  {secciones(tab).map((sec, si) => (
                    <div key={sec.title ?? si}>
                      {sec.title && (
                        <p className="px-3 pb-0.5 pt-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-zinc-400">
                          {sec.title}
                        </p>
                      )}
                      {sec.items.map((item) => {
                        const itemActive =
                          pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            onClick={() => setMobileOpen(false)}
                            aria-current={itemActive ? "page" : undefined}
                            className={cx(
                              "flex min-h-11 items-center gap-2 rounded-xl px-3 py-1.5 text-[14.5px] outline-none transition-colors",
                              itemActive
                                ? "bg-emerald-50 font-medium text-emerald-700"
                                : item.featured
                                  ? "font-medium text-emerald-700 hover:bg-emerald-50/70"
                                  : "text-zinc-700 hover:bg-zinc-50",
                            )}
                          >
                            {item.label}
                            {item.badge && <Badge>{item.badge}</Badge>}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </details>
            );
          })}

          <div className="mt-2 border-t border-zinc-100 pt-2">
            {EXTRA_LINKS.map((item) => {
              const itemActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  aria-current={itemActive ? "page" : undefined}
                  className={cx(
                    "flex min-h-11 items-center rounded-xl px-3 text-[14.5px] outline-none transition-colors",
                    itemActive ? "bg-emerald-50 text-emerald-700" : "text-zinc-600 hover:bg-zinc-50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-zinc-200 px-5 py-4 text-xs text-zinc-500">
          Datos de fuentes oficiales · Hecho en Argentina
        </div>
      </div>
    </header>
  );
}
