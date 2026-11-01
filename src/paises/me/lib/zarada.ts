import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Obračun zarade u Crnoj Gori: oporezivi dohodak je bruto zarada (Zakon o porezu na dohodak, čl. 15),
// doprinosi se ne odbijaju od osnovice poreza, a prirez se računa na obračunati porez (Uputstvo, čl. 6).

export interface Parametri {
  skala: readonly FilaEscala[];
  pio: number;
  pioPoslodavac: number;
  nezaposlenost: number;
  nezaposlenostPoslodavac: number;
  fondRada: number;
}

export interface Obracun {
  bruto: number;
  pio: number;
  nezaposlenost: number;
  doprinosi: number;
  porez: number;
  prirez: number;
  neto: number;
  nezaposlenostPoslodavac: number;
  fondRada: number;
  namaPoslodavca: number;
  trosakPoslodavca: number;
}

export function obracunaj(bruto: number, p: Parametri, stopaPrireza: number, redondear: (n: number) => number): Obracun {
  const pio = redondear((bruto * p.pio) / 100);
  const nezaposlenost = redondear((bruto * p.nezaposlenost) / 100);
  const doprinosi = redondear(pio + nezaposlenost);
  const porez = redondear(aplicarEscalaMarginal(p.skala, bruto));
  const prirez = redondear((porez * stopaPrireza) / 100);
  const nezaposlenostPoslodavac = redondear((bruto * p.nezaposlenostPoslodavac) / 100);
  const fondRada = redondear((bruto * p.fondRada) / 100);
  const namaPoslodavca = redondear(redondear((bruto * p.pioPoslodavac) / 100) + nezaposlenostPoslodavac + fondRada);
  return {
    bruto,
    pio,
    nezaposlenost,
    doprinosi,
    porez,
    prirez,
    neto: redondear(bruto - doprinosi - porez - prirez),
    nezaposlenostPoslodavac,
    fondRada,
    namaPoslodavca,
    trosakPoslodavca: redondear(bruto + namaPoslodavca),
  };
}

// Najmanja bruto zarada (na cent) iz koje ostaje bar traženi neto. Neto ne opada kad bruto raste.
export function brutoIzNeta(cilj: number, p: Parametri, stopaPrireza: number, redondear: (n: number) => number): Obracun {
  let dole = 0;
  let gore = Math.max(100000, Math.ceil(cilj * 300));
  while (obracunaj(gore / 100, p, stopaPrireza, redondear).neto < cilj) gore *= 2;
  while (gore - dole > 1) {
    const sredina = Math.floor((dole + gore) / 2);
    if (obracunaj(sredina / 100, p, stopaPrireza, redondear).neto >= cilj) gore = sredina;
    else dole = sredina;
  }
  return obracunaj(gore / 100, p, stopaPrireza, redondear);
}

export const REQUIERE_ZARADA = {
  "me.porez-zarada": "escala",
  "me.pio-zaposleni": "numero",
  "me.pio-poslodavac": "numero",
  "me.nezaposlenost-zaposleni": "numero",
  "me.nezaposlenost-poslodavac": "numero",
  "me.fond-rada": "numero",
} as const;

interface ValoresZarade {
  "me.porez-zarada": readonly FilaEscala[];
  "me.pio-zaposleni": number;
  "me.pio-poslodavac": number;
  "me.nezaposlenost-zaposleni": number;
  "me.nezaposlenost-poslodavac": number;
  "me.fond-rada": number;
}

export function parametri(v: Readonly<ValoresZarade>): Parametri {
  return {
    skala: v["me.porez-zarada"],
    pio: v["me.pio-zaposleni"],
    pioPoslodavac: v["me.pio-poslodavac"],
    nezaposlenost: v["me.nezaposlenost-zaposleni"],
    nezaposlenostPoslodavac: v["me.nezaposlenost-poslodavac"],
    fondRada: v["me.fond-rada"],
  };
}

// Stopu prireza propisuje opština (Uputstvo, čl. 6). Polje je isto u svim obračunima.
export const CAMPO_PRIREZ = {
  id: "prirez",
  tipo: "numero",
  etiqueta: "Stopa prireza vaše opštine, u procentima",
  ayuda: "Prirez propisuje opština i računa se na porez. Unesite stopu svoje opštine: 13 je samo početna vrijednost, a 0 znači obračun bez prireza.",
  min: 0,
  max: 30,
  porDefecto: 13,
} as const;
