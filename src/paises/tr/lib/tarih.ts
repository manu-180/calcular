import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import datos from "../datos.json";

export interface Sure {
  yil: number;
  ay: number;
  gun: number;
  toplamAy: number;
}

function parcala(f: string): [number, number, number] {
  const [y, m, d] = f.split("-").map(Number);
  return [y, m, d];
}

function aydakiGun(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

// Takvime göre yıl, ay ve gün farkı (başlangıç günü sayılır, bitiş günü sayılmaz).
export function sureHesapla(baslangic: FechaISO, bitis: FechaISO): Sure {
  if (bitis < baslangic) throw new ErrorEntrada("Çıkış tarihi işe giriş tarihinden önce olamaz.", "cikis");
  const [y1, m1, d1] = parcala(baslangic);
  const [y2, m2, d2] = parcala(bitis);
  let yil = y2 - y1;
  let ay = m2 - m1;
  let gun = d2 - d1;
  if (gun < 0) {
    ay -= 1;
    const oncekiAy = m2 === 1 ? 12 : m2 - 1;
    const oncekiYil = m2 === 1 ? y2 - 1 : y2;
    gun += aydakiGun(oncekiYil, oncekiAy);
  }
  if (ay < 0) {
    yil -= 1;
    ay += 12;
  }
  return { yil, ay, gun, toplamAy: yil * 12 + ay };
}

export function sureMetni(s: Sure): string {
  const parcalar = [];
  if (s.yil) parcalar.push(`${s.yil} yıl`);
  if (s.ay) parcalar.push(`${s.ay} ay`);
  if (s.gun || parcalar.length === 0) parcalar.push(`${s.gun} gün`);
  return parcalar.join(" ");
}

interface TramoNumero {
  estado: string;
  desde: string;
  hasta?: string;
  valor: unknown;
}

// Kıdem tazminatı tavanı fesih tarihindeki dönemin tavanıdır. Registro hesaplamaya bugünün değerini
// verir; geçmiş bir dönem için datos.json'daki doğrulanmış dilime bakılır.
export function kidemTavaniTarihte(tarih: FechaISO, bugunku: number, bugun: FechaISO): number {
  const dato = datos.datos.find((d) => d.id === "tr.kidem-tavan");
  const tramos = (dato?.tramos ?? []) as TramoNumero[];
  const uygun = tramos.find((t) => t.estado === "verificado" && t.desde <= tarih && (!t.hasta || tarih <= t.hasta));
  if (uygun && typeof uygun.valor === "number") return uygun.valor;
  const bugunTramo = tramos.find((t) => t.desde <= bugun && (!t.hasta || bugun <= t.hasta));
  if (bugunTramo && bugunTramo.desde <= tarih && (!bugunTramo.hasta || tarih <= bugunTramo.hasta)) return bugunku;
  const ilk = tramos.filter((t) => t.estado === "verificado").map((t) => t.desde).sort()[0];
  if (ilk && tarih < ilk) throw new ErrorEntrada("Bu hesaplama 1 Temmuz 2025 ve sonrasındaki çıkış tarihleri için tavan bilgisi içerir.", "cikis");
  throw new ErrorEntrada("Çıkış tarihinizin bulunduğu dönem için kıdem tazminatı tavanı henüz açıklanmadı.", "cikis");
}
