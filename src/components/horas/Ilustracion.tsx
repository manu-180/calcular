// Fotos de public/horas/<id>.webp (la tarjeta para compartir usa el .png del mismo nombre). Las claves son
// los id del catálogo (src/lib/horas-ar/catalogo.ts): un ítem nuevo necesita su par webp + png.
const CON_FOTO = new Set(["asado", "yerba", "pan", "leche", "huevos", "dulce", "cerveza", "cafe", "nafta", "tanque", "spotify", "canasta", "gaseosa", "vino", "hamburguesas", "queso", "panales"]);

export function Ilustracion({ id, className, prioridad }: { id: string; className?: string; prioridad?: boolean }) {
  if (!CON_FOTO.has(id)) return null;
  return (
    <img
      className={className ? `ca-hs-ilus ${className}` : "ca-hs-ilus"}
      src={`/horas/${id}.webp`}
      alt=""
      width={400}
      height={400}
      loading={prioridad ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
