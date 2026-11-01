// Poistné se redondea hacia abajo (tablas de Sociálna poisťovňa, zákon 580/2004 § 16), la daň al céntimo
// más cercano (zákon 595/2003 § 47), las dávky hacia arriba de a 10 céntimos (lo confirman las sumas de
// Sociálna poisťovňa: 55,114565 × 30 da 1 653,50) y la náhrada príjmu al céntimo hacia arriba (462/2003 § 10).
export const nadol = (x: number): number => Math.floor(x * 100 + 1e-7) / 100;
export const nahor = (x: number): number => Math.ceil(x * 100 - 1e-7) / 100;
export const nahor10 = (x: number): number => Math.ceil(x * 10 - 1e-7) / 10;
export const nahor4 = (x: number): number => Math.ceil(x * 10000 - 1e-6) / 10000;
export const najblizsie = (x: number): number => Math.round((x + 1e-9) * 100) / 100;
