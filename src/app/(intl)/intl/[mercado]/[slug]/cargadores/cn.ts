// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
import type { Cargador } from "./tipos";

export const CARGADORES: Readonly<Record<string, Cargador>> = {
  "chanjia": () => import("@/paises/cn/calculadoras/chanjia"),
  "geshui-jisuanqi": () => import("@/paises/cn/calculadoras/geshui-jisuanqi"),
  "gongzi-geshui-yukou": () => import("@/paises/cn/calculadoras/gongzi-geshui-yukou"),
  "guangzhou-zuidi-gongzi": () => import("@/paises/cn/calculadoras/guangzhou-zuidi-gongzi"),
  "jiabanfei": () => import("@/paises/cn/calculadoras/jiabanfei"),
  "jingji-buchangjin": () => import("@/paises/cn/calculadoras/jingji-buchangjin"),
  "jingying-suode-geshui": () => import("@/paises/cn/calculadoras/jingying-suode-geshui"),
  "laowu-baochou-geshui": () => import("@/paises/cn/calculadoras/laowu-baochou-geshui"),
  "nianxiujia": () => import("@/paises/cn/calculadoras/nianxiujia"),
  "nianzhongjiang-geshui": () => import("@/paises/cn/calculadoras/nianzhongjiang-geshui"),
  "renminbi-huilv": () => import("@/paises/cn/calculadoras/renminbi-huilv"),
  "shiyongqi-gongzi": () => import("@/paises/cn/calculadoras/shiyongqi-gongzi"),
  "shuihou-gongzi": () => import("@/paises/cn/calculadoras/shuihou-gongzi"),
  "weiqian-hetong-shuangbei-gongzi": () => import("@/paises/cn/calculadoras/weiqian-hetong-shuangbei-gongzi"),
  "yinhuashui": () => import("@/paises/cn/calculadoras/yinhuashui"),
  "zengzhishui": () => import("@/paises/cn/calculadoras/zengzhishui"),
  "zhuanxiang-fujia-kouchu": () => import("@/paises/cn/calculadoras/zhuanxiang-fujia-kouchu"),
};
