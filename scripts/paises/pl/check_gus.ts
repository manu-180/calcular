// Enlace al CSV del IPC de GUS con los dos nombres de archivo que usó: «miesiecznewskaznikicen...» y,
// desde noviembre de 2026, «miesieczne_wskazniki_cen_...». Sin red. Uso: npx tsx scripts/paises/pl/check_gus.ts
import assert from "node:assert/strict";
import { enlaceCsvGus } from "../../../src/paises/pl/fuentes";

const P = "/download/gfx/portalinformacyjny/pl/defaultstronaopisowa/4741/1/1/";
assert.equal(
  enlaceCsvGus(`<a href="${P}miesieczne_wskazniki_cen_towarow_i_uslug_konsumpcyjnych_od_1982_roku__102026_2.xlsx">x</a><a href="${P}miesieczne_wskazniki_cen_towarow_i_uslug_konsumpcyjnych_od_1982_roku__102026_2.csv">c</a>`),
  `https://stat.gov.pl${P}miesieczne_wskazniki_cen_towarow_i_uslug_konsumpcyjnych_od_1982_roku__102026_2.csv`,
);
assert.equal(enlaceCsvGus(`<a href="${P}miesiecznewskaznikicen_092026.csv">c</a>`), `https://stat.gov.pl${P}miesiecznewskaznikicen_092026.csv`);
assert.equal(enlaceCsvGus(`<a href="${P}inny_plik.csv">c</a>`), null);
console.log("ok: pl gus");
