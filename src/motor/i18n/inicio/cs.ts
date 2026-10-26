import { GRAMATICA } from "../gramatica";
import { formaCs, pluralCs } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.cs;

// Checo (ADR 0002, D19): vykání con «vy» en minúscula; el país se declina con GRAMATICA.cs y los
// números con pluralCs (one/few/other).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Jste ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} s platnými oficiálními hodnotami.`,
    ultimoDato: "Poslední načtená hodnota",
    ir: (pais) => `Přejít na kalkulačky ${g.para(pais)}`,
    otro: "Vybrat jinou zemi",
    argentina: "Vaše kalkulačky najdete na calcular.ar, s oficiálními údaji Argentiny.",
    argentinaIr: "Přejít na calcular.ar",
    neutroTitulo: (paises) => `${pluralCs(paises, "země", "země", "zemí")}, každá s vlastními zákony a vlastní měnou`,
    neutroTexto: "Oficiální zdroje kontrolujeme každý den.",
    neutroIr: "Zobrazit země",
  },
  selector: {
    buscar: "Najděte zemi",
    sinResultados: (q) => `Žádná země neodpovídá hledání „${q}“`,
    ubicacion: "Vaše současná poloha",
    mismaCalculadora: "Stejná kalkulačka",
    paises: "Země",
  },
  aviso: { mismaCalculadora: (pais) => `Spočítejte s údaji ${g.de(pais)}` },
  vivo: {
    titulo: "Oficiální údaje, které se aktualizují automaticky",
    vigilado: "Automatický proces každý den kontroluje oficiální zdroje. Změny předpisů se objeví poté, co je ověříme.",
    sinVigilar: "Každá hodnota má oficiální zdroj a datum, kdy jsme ji ověřili.",
    verificado: "Poslední kontrola předpisů",
    automatico: "Poslední automatická hodnota",
    fuentes: "Oficiální zdroje",
    nFuentes: (n) => pluralCs(n, "oficiální dokument", "oficiální dokumenty", "oficiálních dokumentů"),
    verFuentes: "Zobrazit zdroje",
    verNovedades: "Zobrazit novinky",
    hoy: "dnes",
    ayer: "včera",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Údaje porovnané s oficiálním zdrojem ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: aktualizováno ${cuando}, poslední hodnotu zveřejnil úřad ${organismo}.`,
    diario: "Oficiální zdroje automaticky kontrolujeme každý den.",
    actualizado: "Aktualizováno",
  },
  novedades: {
    pildora: "Novinky",
    titulo: (pais) => `Co se změnilo v oficiálních údajích ${g.para(pais)}`,
    acento: "v den změny",
    bajada: "Tady zapisujeme každou novou hodnotu, která se dostane do kalkulaček: co se změnilo, od kdy platí a odkud pochází.",
    ultimoCambio: "Poslední změna",
    revision: "Kontrola zdrojů",
    diaria: "Každý den",
    porNorma: "S každým novým předpisem",
    siguiendo: "Zdroje, které sledujeme",
    masOrganismos: (n) => `a ${n} ${formaCs(n, "další", "další", "dalších")}`,
    proximos: "Zveřejněno, brzy začne platit",
    proximosTexto: "Oficiální hodnoty, které už máme načtené a které začnou platit v příštích dnech.",
    registro: "Záznam změn",
    rss: "Sledovat přes RSS",
    vacio: "Pro tuto zemi jsme zatím žádné změny nezaznamenali.",
    etiqueta: { editorial: "Předpis", dato: "Nová hodnota", proximo: "Brzy", serie: "Automaticky", revision: "Kontrola" },
    rige: (fecha) => `Platí od ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Platí od ${desde} do ${hasta}`,
    antes: (valor, fecha) => `Dříve: ${valor} (${fecha})`,
    revisados: (n) => `S oficiálním zdrojem jsme porovnali ${pluralCs(n, "hodnotu", "hodnoty", "hodnot")}`,
    revisadosTexto: (organismos) => `Platné hodnoty potvrzené ve zdrojích: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Zobrazit hodnotu" : `Zobrazit ${pluralCs(n, "hodnotu", "hodnoty", "hodnot")}`),
    calculadoras: "Používají",
    rango: (min, max, zonas) => `od ${min} do ${max} podle kraje (${pluralCs(zonas, "kraj", "kraje", "krajů")})`,
    tabla: (filas) => `tabulka: ${pluralCs(filas, "pásmo", "pásma", "pásem")}`,
    valores: (n) => `${n} ${formaCs(n, "hodnota", "hodnoty", "hodnot")}`,
    pasosTitulo: "Jak údaje zůstávají aktuální",
    pasos: [
      { titulo: "Úřad zveřejní", texto: "V oficiálním zdroji se objeví předpis, index nebo kurz měny." },
      { titulo: "Kontrola před použitím", texto: "Indexy a kurzy přicházejí automaticky a kontrolujeme jejich meze. Předpisy zadáváme ručně, s oficiálním dokumentem před sebou." },
      { titulo: "Kalkulačky se aktualizují", texto: "Kalkulačky přejdou na novou hodnotu a změna se tady zapíše i se zdrojem." },
    ],
    feedTitulo: (pais) => `Novinky ${g.para(pais)} na CalcularYa`,
    feedSubtitulo: (pais) => `Změny oficiálních údajů, které používají kalkulačky ${g.para(pais)}, s daty účinnosti a zdroji.`,
  },
};

export const cs: Diccionario<TextosInicio> = { base };
