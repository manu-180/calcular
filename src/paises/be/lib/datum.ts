import type { FechaISO } from "@/motor/tipos";

function delen(iso: string): [number, number, number] {
  return [Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), Number(iso.slice(8, 10))];
}

function naarIso(d: Date): FechaISO {
  return d.toISOString().slice(0, 10) as FechaISO;
}

export function plusDagen(iso: string, dagen: number): FechaISO {
  const [j, m, d] = delen(iso);
  return naarIso(new Date(Date.UTC(j, m - 1, d + dagen)));
}

// Een opzegging gaat in op de maandag na de week van de kennisgeving (art. 37/1 van de
// arbeidsovereenkomstenwet). Ook een kennisgeving op maandag start pas de maandag erna.
export function maandagNa(iso: string): FechaISO {
  const [j, m, d] = delen(iso);
  const dag = new Date(Date.UTC(j, m - 1, d)).getUTCDay();
  return plusDagen(iso, ((8 - dag) % 7) || 7);
}

// Volledige maanden tussen twee datums: van 15 maart tot 14 april is nog geen maand.
export function volledigeMaanden(van: string, tot: string): number {
  const [vj, vm, vd] = delen(van);
  const [tj, tm, td] = delen(tot);
  let maanden = (tj - vj) * 12 + (tm - vm);
  if (td < vd) maanden -= 1;
  return Math.max(0, maanden);
}

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
export function datumTekst(iso: string): string {
  const [j, m, d] = delen(iso);
  return `${d} ${MAANDEN[m - 1]} ${j}`;
}

export function maandTekst(iso: string): string {
  const [j, m] = delen(iso);
  return `${MAANDEN[m - 1]} ${j}`;
}
