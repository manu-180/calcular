// Contrato entre quien abre el buscador (header, home, cajón) y el <Buscador /> montado una sola
// vez en el header. Es un evento síncrono a propósito: en iOS el teclado sólo aparece si el
// focus() ocurre dentro del mismo gesto del usuario, y un await en el medio lo rompe.

export const EVENTO_BUSCAR = "ca:buscar";

export type DetalleBuscar = { q?: string; instantaneo?: boolean };

export function abrirBuscador(detalle: DetalleBuscar = {}): void {
  window.dispatchEvent(new CustomEvent<DetalleBuscar>(EVENTO_BUSCAR, { detail: detalle }));
}

type Motor = typeof import("./motor");
let promesaMotor: Promise<Motor> | null = null;

export function cargarMotor(): Promise<Motor> {
  promesaMotor ??= import("./motor").catch((e) => {
    promesaMotor = null;
    throw e;
  });
  return promesaMotor;
}

export function precargarMotor(): void {
  void cargarMotor().catch(() => {});
}

type Nav = typeof import("@/data/navegacion");
let promesaNav: Promise<Nav> | null = null;

export function cargarNavegacion(): Promise<Nav> {
  promesaNav ??= import("@/data/navegacion").catch((e) => {
    promesaNav = null;
    throw e;
  });
  return promesaNav;
}

export function precargarNavegacion(): void {
  void cargarNavegacion().catch(() => {});
}
