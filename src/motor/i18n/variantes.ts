// Variantes regionales de un idioma: qué parches por locale se aplican y en qué orden.
//
// El portugués tiene dos normas: la de Brasil (la base de los diccionarios, «tela», «fato») y la
// europea («ecrã», «facto», «registo», sin «você»), que siguen Portugal y los países lusófonos de
// África y Asia (Angola, Mozambique, Cabo Verde, Guinea-Bisáu, Santo Tomé y Príncipe y Timor
// Oriental). Los parches de la norma europea están escritos con la clave "pt-PT"; un locale portugués
// que no sea pt-BR los toma también. Lo que en esos parches es propio de Portugal (IRS, IMI,
// Segurança Social) se pisa después con la clave PT_LUSOFONIA, en palabras que valen en cualquier
// país lusófono, y al final va el parche del locale exacto si lo hay.

export const PT_EUROPEU = "pt-PT";
export const PT_LUSOFONIA = "pt-lusofonia";

export function esPortuguesEuropeo(locale: string | undefined): boolean {
  return !!locale && locale.startsWith("pt-") && locale !== "pt-BR";
}

// Claves de parche regional de un locale, de la más general a la más específica.
export function variantesDeLocale(locale: string | undefined): readonly string[] {
  if (!locale) return [];
  if (locale === PT_EUROPEU) return [PT_EUROPEU];
  if (esPortuguesEuropeo(locale)) return [PT_EUROPEU, PT_LUSOFONIA, locale];
  return [locale];
}
