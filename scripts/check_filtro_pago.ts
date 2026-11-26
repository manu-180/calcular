// npx tsx scripts/check_filtro_pago.ts
import { idParaFiltro } from "../src/lib/pagos/filtro";

let fallas = 0;
const check = (n: string, ok: boolean) => { console.log(`${ok ? "✅" : "❌"} ${n}`); if (!ok) fallas++; };
const tira = (f: () => unknown) => { try { f(); return false; } catch { return true; } };

check("id numérico de MP pasa", idParaFiltro("186212028893") === "186212028893");
check("id con prefijo de proveedor pasa", idParaFiltro("stripe:pi_3AbC-9_x") === "stripe:pi_3AbC-9_x");
check("coma rompe el filtro: no pasa", tira(() => idParaFiltro("1,estado.eq.aprobado")));
check("paréntesis no pasa", tira(() => idParaFiltro("1)")));
check("comilla no pasa", tira(() => idParaFiltro('paypal:1"')));
check("vacío no pasa", tira(() => idParaFiltro("")));

if (fallas) { console.error(`\n${fallas} falla(s)`); process.exit(1); }
console.log("\nFiltro de pago OK");
