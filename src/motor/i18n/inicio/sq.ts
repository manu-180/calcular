import { GRAMATICA } from "../gramatica";
import { pluralSq } from "../plural";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.sq;

// Albanés (ADR 0002, D31): «ju» en minúscula con la 2.ª del plural; el país con GRAMATICA.sq y los
// números con pluralSq («1 burim», «3 burime»).
const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `Ndodheni ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} me vlerat zyrtare në fuqi.`,
    ultimoDato: "Vlera e fundit e ngarkuar",
    ir: (pais) => `Shkoni te kalkulatorët ${g.para(pais)}`,
    otro: "Zgjidhni një vend tjetër",
    argentina: "Kalkulatorët tuaj janë në calcular.ar, me të dhënat zyrtare të Argjentinës.",
    argentinaIr: "Shkoni te calcular.ar",
    neutroTitulo: (paises) => `${pluralSq(paises, "vend", "vende")}, secili me ligjet dhe monedhën e vet`,
    neutroTexto: "I verifikojmë burimet zyrtare çdo ditë.",
    neutroIr: "Shikoni vendet",
  },
  selector: {
    buscar: "Kërkoni një vend",
    sinResultados: (q) => `Asnjë vend nuk përputhet me “${q}”`,
    ubicacion: "Vendndodhja aktuale",
    mismaCalculadora: "I njëjti kalkulator",
    paises: "Vendet",
  },
  aviso: { mismaCalculadora: (pais) => `Llogaritni me të dhënat ${g.para(pais)}` },
  vivo: {
    titulo: "Të dhëna zyrtare, të përditësuara automatikisht",
    vigilado: "Një proces automatik i kontrollon burimet zyrtare çdo ditë. Ndryshimet e rregullave hyjnë në kalkulatorë pasi t'i verifikojmë.",
    sinVigilar: "Çdo vlerë ka burimin e vet zyrtar dhe datën kur e verifikuam.",
    verificado: "Verifikimi i fundit i rregullave",
    automatico: "Vlera e fundit automatike",
    fuentes: "Burimet zyrtare",
    nFuentes: (n) => pluralSq(n, "dokument zyrtar", "dokumente zyrtare"),
    verFuentes: "Shikoni burimet",
    verNovedades: "Shikoni të rejat",
    hoy: "sot",
    ayer: "dje",
    elDia: (fecha) => `më ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}, ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `Të dhëna të verifikuara në burimin zyrtar më ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: përditësuar ${cuando}, me vlerën e fundit të publikuar nga ${organismo}.`,
    diario: "I verifikojmë automatikisht burimet zyrtare, çdo ditë.",
    actualizado: "Përditësuar",
  },
  novedades: {
    pildora: "Të rejat",
    titulo: (pais) => `Çfarë ndryshoi në të dhënat zyrtare ${g.para(pais)}`,
    acento: "që në ditën e ndryshimit",
    bajada: "Çdo vlerë e re që hyn në kalkulatorë shfaqet këtu: çfarë ndryshoi, që kur zbatohet dhe nga vjen.",
    ultimoCambio: "Ndryshimi i fundit",
    revision: "Verifikimi i burimeve",
    diaria: "Çdo ditë",
    porNorma: "Me çdo rregull të ri",
    siguiendo: "Burimet që ndjekim",
    masOrganismos: (n) => `dhe ${pluralSq(n, "burim tjetër", "burime të tjera")}`,
    proximos: "Të publikuara, hyjnë në fuqi së shpejti",
    proximosTexto: "Vlera zyrtare tashmë të ngarkuara, që zbatohen në ditët në vijim.",
    registro: "Historiku i ndryshimeve",
    rss: "Ndiqni me RSS",
    vacio: "Ende nuk ka ndryshime të regjistruara për këtë vend.",
    etiqueta: { editorial: "Rregull", dato: "Vlerë e re", proximo: "Së shpejti", serie: "Automatike", revision: "Verifikim" },
    rige: (fecha) => `Në fuqi nga ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `Në fuqi nga ${desde} deri më ${hasta}`,
    antes: (valor, fecha) => `Më parë: ${valor} (${fecha})`,
    revisados: (n) =>
      Number(n) === 1 ? "Verifikuam një vlerë në burimin zyrtar" : `Verifikuam ${pluralSq(n, "vlerë", "vlera")} në burimin zyrtar`,
    revisadosTexto: (organismos) => `Vlerat në fuqi u konfirmuan me ${organismos}.`,
    verDatos: (n) => (Number(n) === 1 ? "Shikoni vlerën" : `Shikoni ${pluralSq(n, "vlerë", "vlerat")}`),
    calculadoras: "Përdoret në",
    rango: (min, max, zonas) => `nga ${min} deri në ${max}, sipas zonës (${pluralSq(zonas, "zonë", "zona")})`,
    tabla: (filas) => `tabelë me ${pluralSq(filas, "shkallë", "shkallë")}`,
    valores: (n) => pluralSq(n, "vlerë", "vlera"),
    pasosTitulo: "Si mbahen të përditësuara të dhënat",
    pasos: [
      { titulo: "Një institucion publikon", texto: "Në burimin zyrtar shfaqet një rregull, një tregues ose një kurs këmbimi." },
      {
        titulo: "Verifikim para përdorimit",
        texto: "Treguesit dhe kurset e këmbimit vijnë automatikisht, me kontroll të kufijve. Rregullat ngarkohen me dokumentin zyrtar përpara.",
      },
      { titulo: "Kalkulatorët përditësohen", texto: "Kalkulatorët kalojnë te vlera e re dhe ndryshimi shfaqet këtu bashkë me burimin e tij." },
    ],
    feedTitulo: (pais) => `Të rejat ${g.para(pais)} në CalcularYa`,
    feedSubtitulo: (pais) => `Ndryshimet e të dhënave zyrtare që përdorin kalkulatorët ${g.para(pais)}, me datat e hyrjes në fuqi dhe burimet.`,
  },
};

export const sq: Diccionario<TextosInicio> = { base };
