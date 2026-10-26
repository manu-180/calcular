import { GRAMATICA, mayusculaHu } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.hu;

// Húngaro (ADR 0002, D21): tegezés; el país con GRAMATICA.hu y los números en singular detrás de la
// cifra («5 ország»). Las fechas y las cifras van tras dos puntos, nunca con un sufijo pegado.
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Ország: ${g.nombre(pais)}`,
    resumen: (calculadoras) => `${calculadoras}, érvényes hivatalos értékekkel.`,
    ultimoDato: "Legutóbb betöltött adat",
    ir: (pais) => `Kalkulátorok ${g.para(pais)}`,
    otro: "Másik ország választása",
    argentina: "A kalkulátoraidat a calcular.ar oldalon találod, Argentína hivatalos adataival.",
    argentinaIr: "Tovább a calcular.ar oldalra",
    neutroTitulo: (paises) => `${paises} ország, mindegyik a saját törvényeivel és pénznemével`,
    neutroTexto: "A hivatalos forrásokat minden nap ellenőrizzük.",
    neutroIr: "Országok megtekintése",
  },
  selector: {
    buscar: "Keress országot",
    sinResultados: (q) => `Egyik ország sem felel meg ennek: „${q}”`,
    ubicacion: "A jelenlegi helyed",
    mismaCalculadora: "Ugyanez a kalkulátor",
    paises: "Országok",
  },
  aviso: { mismaCalculadora: (pais) => `Számolj ${g.de(pais)} adataival` },
  vivo: {
    titulo: "Hivatalos adatok, amelyek maguktól frissülnek",
    vigilado: "Egy automatikus folyamat minden nap ellenőrzi a hivatalos forrásokat. A jogszabályváltozások azután jelennek meg, hogy ellenőriztük őket.",
    sinVigilar: "Minden értéknek van hivatalos forrása, és mellette az ellenőrzés dátuma.",
    verificado: "A jogszabályok utolsó ellenőrzése",
    automatico: "Utolsó automatikus adat",
    fuentes: "Hivatalos források",
    nFuentes: (n) => `${n} hivatalos dokumentum`,
    verFuentes: "Források megtekintése",
    verNovedades: "Újdonságok megtekintése",
    hoy: "ma",
    ayer: "tegnap",
    elDia: (fecha) => `${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, frissítve: ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Az adatokat a hivatalos forrással vetettük össze. Dátum: ${fecha}`,
    serie: (serie, cuando, organismo) => `${serie}: frissítve: ${cuando}. Az utolsó értéket közzétette: ${organismo}.`,
    diario: "A hivatalos forrásokat minden nap automatikusan ellenőrizzük.",
    actualizado: "Frissítve",
  },
  novedades: {
    pildora: "Újdonságok",
    titulo: (pais) => `Mi változott ${g.de(pais)} hivatalos adataiban`,
    acento: "a változás napján",
    bajada: "Itt jegyzünk fel minden új értéket, amely bekerül a kalkulátorokba: mi változott, mikortól érvényes, és honnan származik.",
    ultimoCambio: "Utolsó változás",
    revision: "Források ellenőrzése",
    diaria: "Minden nap",
    porNorma: "Minden új jogszabállyal",
    siguiendo: "Az általunk figyelt források",
    masOrganismos: (n) => `és további ${n}`,
    proximos: "Közzétéve, hamarosan hatályos",
    proximosTexto: "Hivatalos értékek, amelyeket már betöltöttünk, és a következő napokban lépnek hatályba.",
    registro: "Változásnapló",
    rss: "Követés RSS-ben",
    vacio: "Ehhez az országhoz még nem rögzítettünk változást.",
    etiqueta: { editorial: "Jogszabály", dato: "Új érték", proximo: "Hamarosan", serie: "Automatikus", revision: "Ellenőrzés" },
    rige: (fecha) => `Hatályos: ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Hatályos: ${desde} és ${hasta} között`,
    antes: (valor, fecha) => `Korábban: ${valor} (${fecha})`,
    revisados: (n) => `A hivatalos forrással összevetett értékek száma: ${n}`,
    revisadosTexto: (organismos) => `Az érvényes értékeket ezek a források erősítették meg: ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Érték megtekintése" : `Értékek megtekintése (${n})`),
    calculadoras: "Használja",
    rango: (min, max, zonas) => `${min} és ${max} között, megyénként (${zonas} megye)`,
    tabla: (filas) => `táblázat: ${filas} sáv`,
    valores: (n) => `${n} érték`,
    pasosTitulo: "Így maradnak naprakészek az adatok",
    pasos: [
      { titulo: "A hivatal közzéteszi", texto: "A hivatalos forrásban megjelenik egy jogszabály, egy mutató vagy egy árfolyam." },
      { titulo: "Ellenőrzés használat előtt", texto: "A mutatók és az árfolyamok automatikusan érkeznek, és ellenőrizzük a határaikat. A jogszabályokat kézzel visszük be, a hivatalos dokumentummal magunk előtt." },
      { titulo: "A kalkulátorok frissülnek", texto: "A kalkulátorok átállnak az új értékre, a változás pedig itt is megjelenik a forrással együtt." },
    ],
    feedTitulo: (pais) => `${mayusculaHu(g.de(pais))} újdonságai a CalcularYa oldalon`,
    feedSubtitulo: (pais) => `A kalkulátorok által használt hivatalos adatok változásai ${g.para(pais)}, hatálybalépési dátumokkal és forrásokkal.`,
  },
};

export const hu: Diccionario<TextosInicio> = { base };
