import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.child-allowance",
  mercado: "jp",
  concepto: "propio",
  slug: "child-allowance",
  estado: "publicado",
  requiere: { "jp.child-allowance": "mapa" },
  campos: [
    { id: "menores3", tipo: "entero", etiqueta: "3歳未満の子の人数", min: 0, max: 10, porDefecto: 1 },
    { id: "hasta18", tipo: "entero", etiqueta: "3歳以上で高校生年代までの子の人数", min: 0, max: 10, porDefecto: 1 },
    { id: "mayores", tipo: "entero", etiqueta: "高校生年代の後、22歳の年度末までで親が経済的負担をしている子の人数", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.menores3 + entrada.hasta18 === 0) throw new ErrorEntrada("手当の対象になる子の人数を入力してください。", "menores3");
    const m = v["jp.child-allowance"];
    let orden = entrada.mayores;
    let mensual = 0;
    let terceros = 0;
    const sumar = (cantidad: number, base: number) => {
      for (let i = 0; i < cantidad; i++) {
        orden++;
        if (orden >= 3) {
          mensual += m.third;
          terceros++;
        } else mensual += base;
      }
    };
    sumar(entrada.hasta18, m["from-3"]);
    sumar(entrada.menores3, m["under-3"]);
    return { mensual, anual: mensual * 12, porPago: mensual * 2, terceros };
  },
  resultado: [
    { clave: "mensual", etiqueta: "児童手当（月額）", formato: "moneda", destacada: true },
    { clave: "porPago", etiqueta: "1回の支給額（2か月分）", formato: "moneda" },
    { clave: "anual", etiqueta: "1年分", formato: "moneda" },
    { clave: "terceros", etiqueta: "第3子以降として数える子", formato: "numero" },
  ],
});
