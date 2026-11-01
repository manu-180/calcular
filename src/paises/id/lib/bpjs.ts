import { porcentaje } from "@/motor/calculo";

export const REQUIERE_BPJS = {
  "id.jht-pekerja": "numero",
  "id.jht-pemberi-kerja": "numero",
  "id.jp-pekerja": "numero",
  "id.jp-pemberi-kerja": "numero",
  "id.jkm": "numero",
  "id.jkk": "mapa",
  "id.bpjs-kes-pekerja": "numero",
  "id.bpjs-kes-pemberi-kerja": "numero",
  "id.bpjs-kes-batas-upah": "numero",
} as const;

export interface ValoresBpjs {
  "id.jht-pekerja": number;
  "id.jht-pemberi-kerja": number;
  "id.jp-pekerja": number;
  "id.jp-pemberi-kerja": number;
  "id.jkm": number;
  "id.jkk": Readonly<Record<string, number>>;
  "id.bpjs-kes-pekerja": number;
  "id.bpjs-kes-pemberi-kerja": number;
  "id.bpjs-kes-batas-upah": number;
}

export interface OpsiBpjs {
  upah: number;
  risiko: string;
  jp: boolean;
  // Batas upah JP que la persona lee en su aviso de BPJS Ketenagakerjaan; null = sin tope.
  batasJp: number | null;
  kesehatan: boolean;
}

export interface IuranBpjs {
  jhtPekerja: number;
  jhtPemberi: number;
  jpPekerja: number;
  jpPemberi: number;
  jkk: number;
  jkm: number;
  kesPekerja: number;
  kesPemberi: number;
  dasarJp: number;
  dasarKes: number;
}

export function iuranBpjs(o: OpsiBpjs, v: ValoresBpjs, redondear: (n: number) => number): IuranBpjs {
  const tasaJkk = v["id.jkk"][o.risiko] ?? v["id.jkk"]["sangat-rendah"];
  const dasarJp = o.jp ? (o.batasJp !== null && o.batasJp > 0 ? Math.min(o.upah, o.batasJp) : o.upah) : 0;
  const dasarKes = o.kesehatan ? Math.min(o.upah, v["id.bpjs-kes-batas-upah"]) : 0;
  return {
    jhtPekerja: redondear(porcentaje(o.upah, v["id.jht-pekerja"])),
    jhtPemberi: redondear(porcentaje(o.upah, v["id.jht-pemberi-kerja"])),
    jpPekerja: redondear(porcentaje(dasarJp, v["id.jp-pekerja"])),
    jpPemberi: redondear(porcentaje(dasarJp, v["id.jp-pemberi-kerja"])),
    jkk: redondear(porcentaje(o.upah, tasaJkk)),
    jkm: redondear(porcentaje(o.upah, v["id.jkm"])),
    kesPekerja: redondear(porcentaje(dasarKes, v["id.bpjs-kes-pekerja"])),
    kesPemberi: redondear(porcentaje(dasarKes, v["id.bpjs-kes-pemberi-kerja"])),
    dasarJp,
    dasarKes,
  };
}
