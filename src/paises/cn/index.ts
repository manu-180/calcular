import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import shuihouGongzi from "./calculadoras/shuihou-gongzi";
import contenidoShuihouGongzi from "./contenido/shuihou-gongzi";
import geshuiJisuanqi from "./calculadoras/geshui-jisuanqi";
import contenidoGeshuiJisuanqi from "./contenido/geshui-jisuanqi";
import gongziGeshuiYukou from "./calculadoras/gongzi-geshui-yukou";
import contenidoGongziGeshuiYukou from "./contenido/gongzi-geshui-yukou";
import nianzhongjiangGeshui from "./calculadoras/nianzhongjiang-geshui";
import contenidoNianzhongjiangGeshui from "./contenido/nianzhongjiang-geshui";
import laowuBaochouGeshui from "./calculadoras/laowu-baochou-geshui";
import contenidoLaowuBaochouGeshui from "./contenido/laowu-baochou-geshui";
import zhuanxiangFujiaKouchu from "./calculadoras/zhuanxiang-fujia-kouchu";
import contenidoZhuanxiangFujiaKouchu from "./contenido/zhuanxiang-fujia-kouchu";
import jingyingSuodeGeshui from "./calculadoras/jingying-suode-geshui";
import contenidoJingyingSuodeGeshui from "./contenido/jingying-suode-geshui";
import jingjiBuchangjin from "./calculadoras/jingji-buchangjin";
import contenidoJingjiBuchangjin from "./contenido/jingji-buchangjin";
import jiabanfei from "./calculadoras/jiabanfei";
import contenidoJiabanfei from "./contenido/jiabanfei";
import nianxiujia from "./calculadoras/nianxiujia";
import contenidoNianxiujia from "./contenido/nianxiujia";
import chanjia from "./calculadoras/chanjia";
import contenidoChanjia from "./contenido/chanjia";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  calculadoras: [
    { definicion: shuihouGongzi, contenido: contenidoShuihouGongzi, cliente: () => import("./calculadoras/shuihou-gongzi.cliente") },
    { definicion: geshuiJisuanqi, contenido: contenidoGeshuiJisuanqi, cliente: () => import("./calculadoras/geshui-jisuanqi.cliente") },
    { definicion: gongziGeshuiYukou, contenido: contenidoGongziGeshuiYukou, cliente: () => import("./calculadoras/gongzi-geshui-yukou.cliente") },
    { definicion: nianzhongjiangGeshui, contenido: contenidoNianzhongjiangGeshui, cliente: () => import("./calculadoras/nianzhongjiang-geshui.cliente") },
    { definicion: laowuBaochouGeshui, contenido: contenidoLaowuBaochouGeshui, cliente: () => import("./calculadoras/laowu-baochou-geshui.cliente") },
    { definicion: zhuanxiangFujiaKouchu, contenido: contenidoZhuanxiangFujiaKouchu, cliente: () => import("./calculadoras/zhuanxiang-fujia-kouchu.cliente") },
    { definicion: jingyingSuodeGeshui, contenido: contenidoJingyingSuodeGeshui, cliente: () => import("./calculadoras/jingying-suode-geshui.cliente") },
    { definicion: jingjiBuchangjin, contenido: contenidoJingjiBuchangjin, cliente: () => import("./calculadoras/jingji-buchangjin.cliente") },
    { definicion: jiabanfei, contenido: contenidoJiabanfei, cliente: () => import("./calculadoras/jiabanfei.cliente") },
    { definicion: nianxiujia, contenido: contenidoNianxiujia, cliente: () => import("./calculadoras/nianxiujia.cliente") },
    { definicion: chanjia, contenido: contenidoChanjia, cliente: () => import("./calculadoras/chanjia.cliente") },
  ],
  novedades,
  detectores,
  universales: "todas",
});
