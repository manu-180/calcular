// Obračun zarade: doprinosi se plaćaju na zaradu ograničenu najnižom i najvišom mesečnom osnovicom
// (Zakon o doprinosima, čl. 36 i 41), a porez na zaradu umanjenu za neoporezivi iznos (ZPDG, čl. 15a).

export interface Parametri {
  porez: number;
  neoporezivi: number;
  najnizaOsnovica: number;
  najvisaOsnovica: number;
  pioZaposleni: number;
  pioPoslodavac: number;
  zdravstvo: number;
  nezaposlenost: number;
}

export interface Obracun {
  bruto: number;
  osnovicaDoprinosa: number;
  pio: number;
  zdravstvo: number;
  nezaposlenost: number;
  doprinosi: number;
  poreskaOsnovica: number;
  porez: number;
  neto: number;
  pioPoslodavac: number;
  zdravstvoPoslodavac: number;
  doprinosiPoslodavca: number;
  trosakPoslodavca: number;
}

// Neoporezivi iznos je srazmeran radnom vremenu (čl. 15a st. 3), a najniža osnovica se primenjuje i
// pri nepunom radnom vremenu kod jednog poslodavca (Zakon o doprinosima, čl. 40).
export function obracunaj(bruto: number, p: Parametri, radnoVreme: number, redondear: (n: number) => number): Obracun {
  const osnovicaDoprinosa = Math.min(Math.max(bruto, p.najnizaOsnovica), p.najvisaOsnovica);
  const pio = redondear((osnovicaDoprinosa * p.pioZaposleni) / 100);
  const zdravstvo = redondear((osnovicaDoprinosa * p.zdravstvo) / 100);
  const nezaposlenost = redondear((osnovicaDoprinosa * p.nezaposlenost) / 100);
  const doprinosi = redondear(pio + zdravstvo + nezaposlenost);
  const poreskaOsnovica = Math.max(0, redondear(bruto - (p.neoporezivi * radnoVreme) / 100));
  const porez = redondear((poreskaOsnovica * p.porez) / 100);
  const pioPoslodavac = redondear((osnovicaDoprinosa * p.pioPoslodavac) / 100);
  const zdravstvoPoslodavac = redondear((osnovicaDoprinosa * p.zdravstvo) / 100);
  const doprinosiPoslodavca = redondear(pioPoslodavac + zdravstvoPoslodavac);
  return {
    bruto,
    osnovicaDoprinosa,
    pio,
    zdravstvo,
    nezaposlenost,
    doprinosi,
    poreskaOsnovica,
    porez,
    neto: redondear(bruto - doprinosi - porez),
    pioPoslodavac,
    zdravstvoPoslodavac,
    doprinosiPoslodavca,
    trosakPoslodavca: redondear(bruto + doprinosiPoslodavca),
  };
}

// Najmanja bruto zarada (na paru) iz koje ostaje bar traženi neto. Neto ne opada kad bruto raste.
export function brutoIzNeta(cilj: number, p: Parametri, radnoVreme: number, redondear: (n: number) => number): Obracun {
  let dole = 0;
  let gore = Math.max(100000, Math.ceil(cilj * 300));
  while (obracunaj(gore / 100, p, radnoVreme, redondear).neto < cilj) gore *= 2;
  while (gore - dole > 1) {
    const sredina = Math.floor((dole + gore) / 2);
    if (obracunaj(sredina / 100, p, radnoVreme, redondear).neto >= cilj) gore = sredina;
    else dole = sredina;
  }
  return obracunaj(gore / 100, p, radnoVreme, redondear);
}

export const REQUIERE_ZARADA = {
  "rs.porez-na-zarade": "numero",
  "rs.neoporezivi-iznos": "numero",
  "rs.najniza-osnovica": "numero",
  "rs.najvisa-osnovica": "numero",
  "rs.pio-zaposleni": "numero",
  "rs.pio-poslodavac": "numero",
  "rs.zdravstvo": "numero",
  "rs.nezaposlenost": "numero",
} as const;

export function parametri(v: Readonly<Record<keyof typeof REQUIERE_ZARADA, number>>): Parametri {
  return {
    porez: v["rs.porez-na-zarade"],
    neoporezivi: v["rs.neoporezivi-iznos"],
    najnizaOsnovica: v["rs.najniza-osnovica"],
    najvisaOsnovica: v["rs.najvisa-osnovica"],
    pioZaposleni: v["rs.pio-zaposleni"],
    pioPoslodavac: v["rs.pio-poslodavac"],
    zdravstvo: v["rs.zdravstvo"],
    nezaposlenost: v["rs.nezaposlenost"],
  };
}
