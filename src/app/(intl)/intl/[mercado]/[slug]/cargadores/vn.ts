// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "luong-toi-thieu-vung": () => import("@/paises/vn/calculadoras/luong-toi-thieu-vung"),
  "thoi-han-bao-truoc-nghi-viec": () => import("@/paises/vn/calculadoras/thoi-han-bao-truoc-nghi-viec"),
  "tinh-bao-hiem-that-nghiep": () => import("@/paises/vn/calculadoras/tinh-bao-hiem-that-nghiep"),
  "tinh-bao-hiem-xa-hoi": () => import("@/paises/vn/calculadoras/tinh-bao-hiem-xa-hoi"),
  "tinh-bhxh-mot-lan": () => import("@/paises/vn/calculadoras/tinh-bhxh-mot-lan"),
  "tinh-chi-phi-luong-doanh-nghiep": () => import("@/paises/vn/calculadoras/tinh-chi-phi-luong-doanh-nghiep"),
  "tinh-giam-tru-gia-canh": () => import("@/paises/vn/calculadoras/tinh-giam-tru-gia-canh"),
  "tinh-lam-phat": () => import("@/paises/vn/calculadoras/tinh-lam-phat"),
  "tinh-le-phi-truoc-ba": () => import("@/paises/vn/calculadoras/tinh-le-phi-truoc-ba"),
  "tinh-luong-gross-net": () => import("@/paises/vn/calculadoras/tinh-luong-gross-net"),
  "tinh-luong-huu": () => import("@/paises/vn/calculadoras/tinh-luong-huu"),
  "tinh-luong-net-sang-gross": () => import("@/paises/vn/calculadoras/tinh-luong-net-sang-gross"),
  "tinh-phep-nam": () => import("@/paises/vn/calculadoras/tinh-phep-nam"),
  "tinh-thue-cho-thue-nha": () => import("@/paises/vn/calculadoras/tinh-thue-cho-thue-nha"),
  "tinh-thue-gtgt": () => import("@/paises/vn/calculadoras/tinh-thue-gtgt"),
  "tinh-thue-ho-kinh-doanh": () => import("@/paises/vn/calculadoras/tinh-thue-ho-kinh-doanh"),
  "tinh-thue-tncn": () => import("@/paises/vn/calculadoras/tinh-thue-tncn"),
  "tinh-tien-lam-them-gio": () => import("@/paises/vn/calculadoras/tinh-tien-lam-them-gio"),
  "tinh-tien-thai-san": () => import("@/paises/vn/calculadoras/tinh-tien-thai-san"),
  "tinh-tro-cap-mat-viec": () => import("@/paises/vn/calculadoras/tinh-tro-cap-mat-viec"),
  "tinh-tro-cap-thoi-viec": () => import("@/paises/vn/calculadoras/tinh-tro-cap-thoi-viec"),
  "ty-gia-usd-vnd": () => import("@/paises/vn/calculadoras/ty-gia-usd-vnd"),
};
