// Un archivo por país en public/banderas (country-flag-icons, MIT, 3x2): con 190 países dibujarlas en
// línea sumaba kilobytes de SVG en cada lista del HTML. Como <img> cacheada pesa unos 90 bytes por
// aparición, y lazy salvo la del encabezado. Sin emoji de bandera: Windows no los dibuja.
// Solo países: un idioma, "Worldwide" o el mercado de prueba zz nunca llevan bandera (ADR 0001, D6).
export function tieneBandera(pais: string): boolean {
  return /^[A-Z]{2}$/.test(pais) && pais !== "ZZ";
}

export function Bandera({ pais, ancho = 24, className, prioridad = false }: { pais: string; ancho?: number; className?: string; prioridad?: boolean }) {
  if (!tieneBandera(pais)) return null;
  return (
    <img
      className={className ? `cy-bandera ${className}` : "cy-bandera"}
      src={`/banderas/${pais.toLowerCase()}.svg`}
      width={ancho}
      height={Math.round((ancho * 2) / 3)}
      alt=""
      loading={prioridad ? undefined : "lazy"}
      decoding="async"
    />
  );
}
