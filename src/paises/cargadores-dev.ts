// Solo `next dev` (lo importa src/app/(intl)/intl/[mercado]/[slug]/cargadores/dev.ts): todas las
// definiciones y textos de edición de los países, para calcular en mercados que no tienen mapa
// generado. Vive acá y no junto a los cargadores porque el glob se resuelve relativo al archivo y los
// corchetes de [mercado] y [slug] se leen como clases de caracteres: el glob no encontraba nada.
export const MODULOS_DEV = import.meta.glob(["./*/calculadoras/*.ts", "./*/textos/*.ts", "!**/*.casos.ts"]) as Readonly<
  Record<string, () => Promise<{ default: unknown }>>
>;
