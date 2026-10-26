import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface SatserSkatt {
  trinnskatt: readonly FilaEscala[];
  alminnelig: number;
  personfradrag: number;
  minsteSats: number;
  minsteMaks: number;
  trygdeSats: number;
  trygdeGrense: number;
  trygdeOpptrapping: number;
  fradragTiltakssonen: number;
}

export function minstefradrag(lonn: number, sats: number, maks: number): number {
  return lonn > 0 ? Math.min((lonn * sats) / 100, maks) : 0;
}

// Trygdeavgift beregnes ikke under nedre grense, og den blir aldri mer enn opptrappingssatsen av
// inntekten over grensen.
export function trygdeavgift(grunnlag: number, sats: number, grense: number, opptrapping: number): number {
  if (grunnlag <= grense) return 0;
  return Math.min((grunnlag * sats) / 100, ((grunnlag - grense) * opptrapping) / 100);
}

export function trinnskatt(personinntekt: number, trinn: readonly FilaEscala[]): number {
  return personinntekt > 0 ? aplicarEscalaMarginal(trinn, personinntekt) : 0;
}

export interface InntektSkatt {
  lonn: number;
  kapital: number;
  fradrag: number;
}

export interface Skatt {
  minstefradrag: number;
  alminneligInntekt: number;
  grunnlagAlminnelig: number;
  skattAlminnelig: number;
  trinnskatt: number;
  trygdeavgift: number;
  sum: number;
}

// Skatt for en lønnstaker: 22 % (18,5 % i tiltakssonen) av alminnelig inntekt etter personfradrag,
// trinnskatt og trygdeavgift av lønnen (personinntekten).
export function skattPaInntekt(i: InntektSkatt, s: SatserSkatt, r: (n: number) => number): Skatt {
  const md = r(minstefradrag(i.lonn, s.minsteSats, s.minsteMaks));
  const alminneligInntekt = r(i.lonn - md + i.kapital - i.fradrag - s.fradragTiltakssonen);
  const grunnlagAlminnelig = Math.max(0, alminneligInntekt - s.personfradrag);
  const skattAlminnelig = r((grunnlagAlminnelig * s.alminnelig) / 100);
  const ts = r(trinnskatt(i.lonn, s.trinnskatt));
  const ta = r(trygdeavgift(i.lonn, s.trygdeSats, s.trygdeGrense, s.trygdeOpptrapping));
  return {
    minstefradrag: md,
    alminneligInntekt,
    grunnlagAlminnelig,
    skattAlminnelig,
    trinnskatt: ts,
    trygdeavgift: ta,
    sum: r(skattAlminnelig + ts + ta),
  };
}

// Marginalskatt: hvor mye av de neste 100 kronene i lønn som går til skatt.
export function marginalskatt(i: InntektSkatt, s: SatserSkatt, r: (n: number) => number): number {
  const id = (n: number) => n;
  const a = skattPaInntekt(i, s, id).sum;
  const b = skattPaInntekt({ ...i, lonn: i.lonn + 100 }, s, id).sum;
  return r(b - a);
}
