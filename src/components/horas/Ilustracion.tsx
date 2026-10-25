import type { ReactNode } from "react";

// Trazo en currentColor y el relleno de acento en --hs-acento: el mismo dibujo sirve en el panel oscuro
// y en las tarjetas claras. Las claves son los id del catálogo (src/lib/horas-ar/catalogo.ts).
const DIBUJOS: Record<string, ReactNode> = {
  asado: (
    <>
      <path className="a" d="M7.5 18.5c3-2.5 6-2.5 9-1 3-2 6.5-2 9.5-.5 3-1.8 7-1.8 9.5.2 2 1.5 3 3.4 3 5.6v7.2c0 2.2-1.8 4-4 4H11.5a4 4 0 0 1-4-4Z" />
      <path className="s" d="M9.5 21c2.6-1.8 5.4-1.8 7.6-.6 2.8-1.6 6-1.6 8.6-.4 2.8-1.4 6.4-1.4 8.8.4" />
      <circle cx="15.5" cy="27" r="3" className="h" />
      <circle cx="24.5" cy="27" r="3" className="h" />
      <circle cx="33.5" cy="27" r="3" className="h" />
      <path d="M6 39.5h36M10.5 39.5 8.5 43M37.5 39.5l2 3.5" />
    </>
  ),
  yerba: (
    <>
      <path className="a" d="M14 20h20c1 9-2 18-10 18s-11-9-10-18Z" />
      <path className="h" d="M16 20c2-3 5-4 8-3 3-2 6-1 8 3Z" />
      <path d="M12.5 20h23M27 21l6-13.5 3 1.2M19.5 38.5h9" />
    </>
  ),
  pan: (
    <>
      <path className="a" d="M9 31c-1.6-3 .4-6 4.4-8.2l16.8-9.6c4-2.2 7.8-2.2 9 .6 1.4 3-.6 6-4.6 8.2l-16.8 9.6c-4 2.2-7.6 2.2-8.8-.6Z" />
      <path d="M15.5 25.5l3 3M21.5 22l3 3M27.5 18.5l3 3M33.5 15l2.4 2.4" />
    </>
  ),
  leche: (
    <>
      <path className="a" d="M15 18h18v20a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2Z" />
      <path d="M15 18l4-7h10l4 7M19 11V8h10v3M15 25h18" />
      <path className="h" d="M24 28c-2 3-3 4-3 5.5a3 3 0 0 0 6 0c0-1.5-1-2.5-3-5.5Z" />
    </>
  ),
  huevos: (
    <>
      <path d="M17 13c-4.5 0-7 8-7 13a7 7 0 0 0 14 0c0-5-2.5-13-7-13Z" />
      <path className="h" d="M31 17c-4 0-6.5 7-6.5 11a6.5 6.5 0 0 0 13 0c0-4-2.5-11-6.5-11Z" />
      <path className="s" d="M13.8 22c.5-2 1.4-3.6 2.4-4.4" />
    </>
  ),
  dulce: (
    <>
      <path d="M16 9.5h16a1 1 0 0 1 1 1V15H15v-4.5a1 1 0 0 1 1-1Z" />
      <path className="a" d="M15 15h18a2 2 0 0 1 2 2v19a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V17a2 2 0 0 1 2-2Z" />
      <path className="h" d="M13 23h22v9H13Z" />
      <path d="M20 15v3a1.5 1.5 0 0 0 3 0v-1" />
    </>
  ),
  cerveza: (
    <>
      <path className="h" d="M16.2 20h15.6l-1.5 17.4a1.5 1.5 0 0 1-1.5 1.4h-9.6a1.5 1.5 0 0 1-1.5-1.4Z" />
      <path d="M15 15h18l-2 23a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2Z" />
      <path className="a" d="M13.5 16c-.4-3 2.6-5.4 5.4-4.3 1.4-2.4 4.8-3 6.8-1 2.4-1.8 6.4-.8 6.6 2.4 2.2.2 3.2 2.4 2 4.4H14.4c-.5-.4-.8-.9-.9-1.5Z" />
      <circle cx="22" cy="28" r=".9" className="p" />
      <circle cx="26" cy="32" r=".9" className="p" />
      <circle cx="24.5" cy="24" r=".9" className="p" />
    </>
  ),
  cafe: (
    <>
      <path className="a" d="M12 20h20v8a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8Z" />
      <path d="M32 22h2a4 4 0 0 1 0 8h-2.8M9.5 39.5h25" />
      <path className="h" d="M12 20h20v3H12Z" />
      <path className="s" d="M18 8.5c-2 2 2 4 0 7M24.5 7.5c-2 2 2 4 0 7" />
    </>
  ),
  nafta: (
    <>
      <path className="h" d="M24 7.5c-6 9-10 14-10 20a10 10 0 0 0 20 0c0-6-4-11-10-20Z" />
      <path className="s" d="M19 29a5 5 0 0 0 5 5" />
    </>
  ),
  tanque: (
    <>
      <path className="a" d="M12 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v30H12Z" />
      <path className="h" d="M16 12.5h8v6.5h-8Z" />
      <path d="M8.5 40h23M28 16h4l4 4v13a2.5 2.5 0 0 1-5 0v-6h-3M36 20v-4.5" />
    </>
  ),
  spotify: (
    <>
      <path d="M11 30v-5a13 13 0 0 1 26 0v5" />
      <path className="h" d="M9 29a2 2 0 0 1 2-2h3v11h-3a2 2 0 0 1-2-2Z" />
      <path className="h" d="M39 29a2 2 0 0 0-2-2h-3v11h3a2 2 0 0 0 2-2Z" />
      <path className="s" d="M20 21.5c2.6-1 5.4-1 8 0" />
    </>
  ),
  canasta: (
    <>
      <path d="M16.5 20l6-10M31.5 20l-6-10" />
      <path className="a" d="M11 24h26l-3 14a2 2 0 0 1-2 1.6H16a2 2 0 0 1-2-1.6Z" />
      <path className="h" d="M9 19.5h30a1 1 0 0 1 1 1V24H8v-3.5a1 1 0 0 1 1-1Z" />
      <path d="M19 28.5v6.5M24 28.5v6.5M29 28.5v6.5" />
    </>
  ),
};

export function Ilustracion({ id, className }: { id: string; className?: string }) {
  const dibujo = DIBUJOS[id];
  if (!dibujo) return null;
  return (
    <svg className={className ? `ca-hs-ilus ${className}` : "ca-hs-ilus"} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {dibujo}
    </svg>
  );
}
