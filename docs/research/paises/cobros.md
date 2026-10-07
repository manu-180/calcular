# Cobros a toda Latinoamérica: con qué cobrar planillas e informes de US$ 3 a 30

Investigación del 7 de octubre de 2026. Contexto: Manuel es persona humana en Argentina (monotributista), hoy cobra con Mercado Pago Argentina (Checkout Pro, en pesos) y quiere vender a todos los países donde sea posible.

Convenciones: cada dato lleva su fuente y la fecha en que se verificó (todas: 2026-10-07 salvo que diga otra cosa). **NO VERIFICADO** = no se encontró confirmación en una fuente oficial. Las fuentes secundarias (blogs, prensa) están marcadas como tales.

---

## 1. Lo que hay que saber antes de leer el resto

| Hecho | Consecuencia |
|---|---|
| Una cuenta de Mercado Pago Argentina cobra en pesos y con medios argentinos. No hay evidencia oficial de que un comprador de otro país pueda pagar con su billetera MP local ni con OXXO, PSE, Yape o Pix. | MP Argentina sirve para Argentina. Para el resto de LATAM hace falta otra cosa. |
| El programa "Cross Border" de MP existe, pero es para cobrar *en* México (u otro país) y retirar USD a un banco de afuera, con cuenta armada a mano por el equipo comercial. | No es autoservicio. Es una conversación comercial, no un alta. |
| Abrir cuentas MP vendedoras en MX, CL, CO, PE, UY, BR pide identidad fiscal local (fuentes secundarias). | Para un argentino sin empresa afuera, en la práctica no es viable. |
| Hay plataformas que aceptan vendedores argentinos y pagan en pesos a un banco argentino: Gumroad, Lemon Squeezy, Polar, dLocal Go. | Se puede vender a toda LATAM sin abrir nada afuera. |
| Con productos de US$ 3 a 5, la parte fija de la comisión (US$ 0,50 a 0,80) se come entre 15% y 40% del precio. | Precio mínimo sugerido fuera de Argentina: US$ 5. Ideal: US$ 7 o más, o paquetes. |

---

## 2. Pregunta 1: ¿MP Argentina le puede cobrar a alguien de otro país?

| Punto | Qué se encontró | Fuente | Estado |
|---|---|---|---|
| Medios que ofrece Checkout Pro / Link de pago en AR | Saldo MP, crédito (Visa, Mastercard, Amex, Diners, Naranja, Cabal, Argencard, CMR), débito y prepaga (Visa, Mastercard, Maestro, Cabal), Cuotas sin Tarjeta, efectivo en Rapipago y Pago Fácil. No menciona tarjetas extranjeras ni billeteras de otros países. | [Ayuda MP AR, art. 221](https://www.mercadolibre.com.ar/ayuda/221) | Verificado |
| Medios disponibles en Checkout Pro AR (developers) | "Tarjeta de crédito o débito, Rapipago, Pago Fácil, Cuenta Mercado Pago y Cuotas sin Tarjeta". Nada sobre pagadores de otros países. | [MP developers AR, Checkout Pro overview](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/overview) | Verificado |
| ¿Acepta tarjetas emitidas en el exterior? | La cuenta oficial de MP respondió en X (nov. 2019) que se puede recibir pagos del exterior "siempre y cuando" sean con tarjetas de crédito habilitadas para pagos internacionales. No hay página de ayuda o developers vigente que lo confirme. | [@MercadoPago en X, 2019](https://x.com/MercadoPago/status/1199691580732518401) | **NO VERIFICADO** en documentación vigente |
| Recargo por tarjeta extranjera | Un resultado de búsqueda habló de +3% para tarjetas extranjeras; no se pudo ver la tabla oficial de costos (exige login). | mercadopago.com.ar/costs-section (login) | **NO VERIFICADO** |
| ¿Un comprador puede pagar con su cuenta MP de México, Chile, etc.? | Ninguna fuente oficial lo menciona. Fuentes secundarias dicen que no se puede recibir transferencias entre cuentas MP de distintos países. | Secundaria: [jonatanalmeira.com](https://www.jonatanalmeira.com/?p=65154), [tiempofinanciero.com.ar](https://tiempofinanciero.com.ar/recibir-dinero-exterior-mercado-pago/) | **NO VERIFICADO** (todo indica que no) |
| Moneda que ve el comprador | La preferencia de Checkout Pro AR se arma en ARS. Si una tarjeta extranjera pasa, el comprador ve pesos y su banco convierte (y le cobra su recargo por compra internacional). Es inferencia por cómo funcionan las tarjetas, no un dato de MP. | Inferencia | **NO VERIFICADO** |
| Liquidación de divisas por cobros con tarjetas del exterior | Desde el 4/11/2022, los adquirentes de tarjetas emitidas por no residentes quedan exceptuados de liquidar por el MLC (Com. "A" 7629 y 7630). | Secundaria: [abogados.com.ar](https://abogados.com.ar/consumos-con-tarjetas-emitidas-en-el-exterior-y-nuevas-modificaciones-al-regimen-de-importaciones-de-bienes/31588) | NO VERIFICADO en BCRA (la web del BCRA cambió y el texto ordenado no está en la URL de siempre) |
| Programa Cross Border | Cobrar local y retirar en otro país. Solo USD. La cuenta "debe ser creada por nuestro equipo". Se pide por mail a `crm_regionales@mercadopago.com` con razón social, licencia comercial (W9 o equivalente), datos bancarios con SWIFT. El pagador paga en moneda local. | [MP developers MX, Cross Border](https://www.mercadopago.com.mx/developers/es/docs/resources/localization/crossborder-integration) | Verificado. Si aceptan a un monotributista: **NO VERIFICADO** |

**Conclusión 1.** MP Argentina sirve, con certeza, para compradores argentinos. Para un uruguayo o un mexicano, lo único que *quizás* funcione es pagar con tarjeta internacional en pesos. No está documentado, puede rebotar por antifraude y no hay medios locales. Hay que probarlo con una venta real de $1 desde una tarjeta extranjera antes de contar con eso.

---

## 3. Pregunta 2: ¿Cuenta MP vendedora en cada país?

No se pudo abrir ninguna página oficial de ayuda ni de términos de MP (devuelven 403 o piden login). Lo que sigue sale de fuentes secundarias y queda como **NO VERIFICADO**.

| País | Qué pide (secundario) | ¿Viable para un argentino sin empresa ni residencia allá? |
|---|---|---|
| México | CURP para personas; RFC y régimen SAT para vendedores. Hay reclamos de extranjeros a los que les piden CURP igual. ([tuquejasuma](https://tuquejasuma.com/mercado-libre/reclamos/mercado-libre-pide-curp-a-extranjeros)) | No |
| Chile | RUT o cédula chilena, foto del documento y selfie. ([monedario.cl](https://monedario.cl/posts/finanzas-para-migrantes-chile/)) | No |
| Colombia | Cédula de ciudadanía o de extranjería; NIT para cuenta empresa. ([numeroservicioalcliente](https://www.numeroservicioalcliente.com/mercado-pago/)) | No |
| Perú | Sin dato. | **NO VERIFICADO** |
| Uruguay | Sin dato. | **NO VERIFICADO** |
| Brasil | Sin dato oficial. Habitualmente CPF. | **NO VERIFICADO** |

Todas piden un documento de identidad local. La única vía oficial para cobrar "como local" sin estar ahí es Cross Border (sección 2), que es para empresas y pasa por el equipo comercial.

Dato útil: Payhip se conecta a una cuenta MP de AR, BR, CL, CO, MX, PE o UY, pero la moneda de la tienda tiene que coincidir con la de la cuenta MP ([Payhip ayuda](https://help.payhip.com/article/343-connecting-your-mercado-pago-account)). No resuelve nada: sigue siendo una cuenta argentina cobrando en ARS.

---

## 4. Pregunta 3: alternativas que pagan en Argentina

### 4.1 Merchant of record (la plataforma vende en su nombre y se hace cargo del IVA del comprador)

| Plataforma | ¿Acepta vendedor argentino? | Medios del comprador | Comisión | Cómo cobra Manuel | Impuestos del comprador | Alta |
|---|---|---|---|---|---|---|
| **Lemon Squeezy** | Sí. Argentina está en la lista de pagos a banco ([docs](https://docs.lemonsqueezy.com/help/getting-started/supported-countries)) | Tarjetas, PayPal, Apple Pay, Google Pay, Alipay, WeChat Pay, Cash App, ACH. Sin Pix, OXXO ni PSE ([docs](https://docs.lemonsqueezy.com/help/checkout/payment-methods)) | 5% + US$ 0,50; +1,5% fuera de EE. UU.; +1,5% PayPal; +1% por pago a banco fuera de EE. UU. ([docs fees](https://docs.lemonsqueezy.com/help/getting-started/fees)) | Banco a mitad de mercado en la moneda elegida, o PayPal en USD. Retención 13 días, pagos los días 1 y 15, mínimo US$ 50 ([docs](https://docs.lemonsqueezy.com/help/getting-started/getting-paid)) | Los liquida Lemon (MoR) | Rápida (sin plazo oficial publicado) |
| **Gumroad** | Sí. Argentina: pago a banco en ARS, mínimo ARS 4.600, hay que vivir en el país ([ayuda](https://gumroad.com/help/article/13-getting-paid)) | Tarjetas, PayPal y métodos locales según país del comprador (ejemplo citado: UPI en India). Cuáles en LATAM: **NO VERIFICADO** | 10% + US$ 0,50 + procesamiento 2,9% + US$ 0,30. Ventas por su marketplace: 30% ([ayuda fees](https://gumroad.com/help/article/66-gumroads-fees)) | ARS a cuenta bancaria argentina, los martes | MoR desde el 1/1/2025 ([pricing](https://gumroad.com/pricing)) | Minutos |
| **Polar** | Sí. Argentina en la lista de pagos vía Stripe Connect Express; la cuenta bancaria tiene que ser del mismo país y en moneda local ([países](https://polar.sh/docs/merchant-of-record/supported-countries), [cuentas](https://polar.sh/docs/finance/accounts)) | Tarjetas vía Stripe. Medios locales LATAM: **NO VERIFICADO** | Plan Starter 5% + US$ 0,50; +1,5% tarjeta internacional. Pagos: US$ 2/mes por cuenta activa + 0,25% + US$ 0,25 por pago + 0,25% a 1% cross-border. Contracargo US$ 15 ([pricing](https://polar.sh/resources/pricing)) | Moneda local a banco argentino | MoR | Rápida (sin plazo oficial) |
| **Paddle** | Argentina no está en la lista de países no soportados ([ayuda](https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle)) | Tarjetas, PayPal, Apple Pay, Google Pay, Pix y otros locales fuera de LATAM ([docs](https://developer.paddle.com/concepts/payment-methods/overview)) | 5% + US$ 0,50; productos de menos de US$ 10: precio a pedido ([pricing](https://www.paddle.com/pricing)) | Medio y moneda del pago al vendedor: **NO VERIFICADO** | MoR | Revisión de dominio: automática o 5 a 7 días hábiles; pide T&C, reembolsos y privacidad visibles ([ayuda](https://www.paddle.com/help/start/account-verification/what-is-domain-verification)) |
| **Hotmart** | **NO VERIFICADO** en fuente oficial (se usa mucho en LATAM) | **NO VERIFICADO** por país | 9,9% + EUR 1,00 por venta hasta EUR 9.900/mes ([precios](https://hotmart.com/es/precios)) | **NO VERIFICADO** | **NO VERIFICADO** | **NO VERIFICADO** |
| **Kiwify** | **NO VERIFICADO** (entidad Kiwify US, Inc., Miami) | **NO VERIFICADO** | 9,99% + US$ 0,80 ([kiwify.com](https://kiwify.com/)) | Retiros "dentro de hasta 15 días" | **NO VERIFICADO** | **NO VERIFICADO** |

Dos alertas:

- **Lemon Squeezy está en transición.** Stripe lo compró y su actualización de enero 2026 apunta a migrar a sus usuarios a Stripe Managed Payments ([blog](https://www.lemonsqueezy.com/blog/2026-update)). Stripe Managed Payments **no acepta negocios en Argentina** (solo CA, US, buena parte de Europa, AU, HK, JP, SG) ([Stripe docs](https://docs.stripe.com/payments/managed-payments/eligibility)). Para países no soportados, Lemon sugiere armar una LLC con Atlas. No hay fecha de cierre anunciada, pero apostar a Lemon a largo plazo es apostar contra esa migración.
- **Paddle está pensado para software.** Prohíbe vender "donde no hay software o servicio genuino" ([política](https://paddle.com/help/start/intro-to-paddle/what-am-i-not-allowed-to-sell-on-paddle)). Una planilla Excel puede pasar o no según quien revise. Si se elige Paddle, presentarlo como herramienta, no como contenido.

### 4.2 Procesadores (no son MoR: los impuestos del comprador quedan del lado de Manuel)

| Opción | ¿Acepta vendedor argentino? | Medios locales | Comisión | Cómo cobra Manuel | Alta |
|---|---|---|---|---|---|
| **dLocal Go** | Sí: el negocio tiene que estar registrado en AR, BO, BR, CL, CO, CR, EC, US, GT, MX, PE, PY, UY u otros ([ayuda](https://helpcenter.dlocalgo.com/en/articles/7240022-where-does-my-company-have-to-be-registered-if-i-want-to-open-a-dlocal-go-account)). Si alcanza con persona humana con CUIT: **NO VERIFICADO** (pide documento, comprobante de domicilio, constancia bancaria y "cumplimiento fiscal" ([ayuda](https://helpcenter.dlocalgo.com/en/articles/9567053-what-documents-do-i-need-to-submit-to-set-up-my-account))) | MX: tarjeta, SPEI, OXXO. CO: tarjeta, PSE, Efecty. PE: tarjeta, PagoEfectivo, transferencia. CL: tarjeta, Webpay, Servipag, Sencillito. BR: tarjeta, Boleto, Pix. UY: tarjeta, Redpagos. AR: tarjeta, Pago Fácil, Rapipago, transferencia. Sin Yape. | Tarifario PDF de nov. 2022 (el que enlaza hoy la ayuda): MX tarjeta 2,49% + US$ 0,20, OXXO 2,99% + 0,20; CO 1,99% + 0,20; PE tarjeta 2,99%, efectivo 2,99% + 0,99; CL 2,99%; BR Pix 0,99%; UY tarjeta 4,99%. Más impuesto local sobre la comisión (AR 21%). Reembolso US$ 1, contracargo US$ 5 ([PDF](https://9068770.fs1.hubspotusercontent-na1.net/hubfs/9068770/dLocal_Go_Payins_Multiple_Countries_November_2022.pdf)). Spread cambiario si se cobra en moneda local: existe, % **NO VERIFICADO** ([ayuda](https://helpcenter.dlocalgo.com/en/articles/7169372-what-is-the-exchange-rate-and-how-dlocal-go-apply-it)) | En la moneda del país donde está radicado el negocio, o sea ARS. Tarjeta disponible a los 7 días, transferencia/Pix/efectivo a los 3. Sin costo de retiro sobre US$ 10 ([dlocalgo.com](https://dlocalgo.com/es/pagos-internacionales)) | Online, sin plazo publicado. Mínimo por venta US$ 1 ([ayuda](https://helpcenter.dlocalgo.com/en/articles/7240013-what-is-the-minimum-transaction-amount-i-can-sell)) |
| **PayPal (cuenta AR)** | Sí | Ninguno local. Saldo PayPal y tarjetas | Recibir pagos internacionales con cuenta AR: 5,40% + US$ 0,30. Conversión de moneda: 3,50%. Retiro a banco argentino: ARS 75 por retiro en ARS ([tarifas PayPal AR, actualizadas 28/09/2026](https://www.paypal.com/ar/business/paypal-business-fees)) | ARS a banco argentino (la tabla de AR solo muestra retiro en ARS) | Minutos |
| **Stripe vía LLC en EE. UU. (Atlas)** | Atlas es para fundadores de cualquier país | Los de Stripe | Atlas: US$ 500 una vez + US$ 100/año de agente registrado ([stripe.com/atlas](https://stripe.com/atlas)). Con la LLC en EE. UU. se habilita también Stripe Managed Payments (EE. UU. es elegible). Costos contables anuales de la LLC: **NO VERIFICADO** | Banco de EE. UU. de la LLC | Atlas dice "dentro de dos días hábiles" para constituir; sumar banco y Stripe |
| **dLocal (enterprise)** | Pensado para empresas grandes | Todos | A negociar | A negociar | **NO VERIFICADO**; descartado para este tamaño |

---

## 5. Cuánto queda de una venta de US$ 10 (y de una de US$ 3)

Cálculo propio con las tarifas de arriba. Tarjeta extranjera, sin impuestos del comprador.

| Opción | Costo en venta de US$ 10 | % | Costo en venta de US$ 3 | % |
|---|---|---|---|---|
| dLocal Go, tarjeta MX (2,49% + 0,20 + 21% de IVA AR sobre la comisión) | ~US$ 0,54 | ~5% (+ spread no verificado) | ~US$ 0,33 | ~11% |
| Paddle (5% + 0,50) | US$ 1,00 | 10% (menos de US$ 10: precio a pedido) | US$ 0,65 | ~22% |
| PayPal AR (5,40% + 0,30 + 3,5% de conversión al retirar) | ~US$ 1,16 | ~12% | ~US$ 0,57 | ~19% |
| Lemon Squeezy (6,5% + 0,50 + 1% de pago a banco) | ~US$ 1,24 | ~12% | ~US$ 0,72 | ~24% |
| Polar Starter (6,5% + 0,50 + ~1,25% + 0,25 de pago, sin contar US$ 2/mes) | ~US$ 1,50 | ~15% | ~US$ 0,98 | ~33% |
| Gumroad (12,9% + 0,80) | US$ 2,09 | ~21% | US$ 1,19 | ~40% |
| Hotmart (9,9% + EUR 1) | ~US$ 2,1 | ~21% | ~US$ 1,4 | ~45% |

Lectura: los MoR cuestan el doble que dLocal Go, pero se hacen cargo del IVA del país del comprador y de los contracargos. Por debajo de US$ 5, cualquier opción con fijo de US$ 0,50 se vuelve cara.

---

## 6. Pregunta 4: lo fiscal en Argentina (orientativo, confirmar con un contador)

| Tema | Qué dice la fuente | Fuente | Estado |
|---|---|---|---|
| Quién factura electrónicamente | Monotributistas deben emitir factura electrónica; los exportadores deben hacerlo obligatoriamente por la RG 2758/2010. | [ARCA, sujetos alcanzados](https://www.afip.gob.ar/fe/emision-autorizacion/sujetos.asp) | Verificado |
| Factura de exportación de servicios (tipo E) | Las facturas de exportación de servicios deben indicar la fecha de pago; el campo es obligatorio en "Comprobantes en línea" y en webservices. | [ARCA, exportación de servicios](https://www.afip.gob.ar/fe/emision-autorizacion/exportacion-servicios.asp) | Verificado |
| A quién se le factura con un MoR | Con Lemon, Gumroad, Polar o Paddle, el que le compra a Manuel es la plataforma (empresa extranjera), no el consumidor final. Lo usual sería una factura E a la plataforma por lo que liquida. | Criterio, no fuente | **NO VERIFICADO**, consultar |
| A quién se le factura con dLocal Go o PayPal | Manuel le vende directo al consumidor extranjero: factura E por cada venta (o el criterio que defina el contador). Además, varios países cobran IVA a servicios digitales de proveedores del exterior (ej. México, Chile, Colombia); con un procesador, esa obligación queda del lado de Manuel. | Criterio, no fuente | **NO VERIFICADO** |
| Tope del monotributo | Las exportaciones suman a la facturación que define la categoría. | Criterio general | **NO VERIFICADO** en ARCA para este caso |
| Liquidación de divisas por exportación de servicios | El BCRA eliminó en septiembre de 2025 el tope anual de US$ 36.000 para personas humanas que exportan servicios: pueden cobrar en dólares en cuentas locales sin obligación de vender. | Secundaria: [La Voz de San Justo, 19/09/2025](https://www.lavozdesanjusto.com.ar/eliminan-el-cepo-para-freelancers-que-cobran-en-dolares-de-empresas-extranjeras) | **NO VERIFICADO** en BCRA (número de Comunicación no confirmado) |
| Cobros con tarjetas extranjeras en MP AR | Exceptuados de liquidar por el MLC (Com. "A" 7629/7630, nov. 2022). | Secundaria (ver sección 2) | **NO VERIFICADO** en BCRA |

En la práctica: Gumroad, Polar y dLocal Go pagan en pesos a un banco argentino, así que la conversión ya viene hecha. Lemon y PayPal permiten cobrar en USD (Lemon a PayPal, PayPal según cuenta); si se cobran dólares, ver con el contador cómo declararlos.

---

## 7. Pregunta 5: recomendación

### Arranque de mínima fricción (esta semana)

**Mercado Pago para Argentina + un MoR para el resto del mundo.** El MoR resuelve tarjetas de cualquier país, el IVA de cada país y los contracargos, paga en Argentina y se da de alta en minutos.

Entre los MoR, el orden recomendado:

1. **Lemon Squeezy** si el objetivo es el costo más bajo hoy (~12% en US$ 10). Riesgo: migración forzada a Stripe Managed Payments, que no acepta Argentina. Mitigación: tener el plan B integrado detrás de la misma interfaz.
2. **Gumroad** si el objetivo es lo más simple y estable: paga en pesos al banco, alta en minutos, MoR. Cuesta casi el doble (~21% en US$ 10).
3. **Polar** como alternativa activa y con API moderna, con costo parecido a Lemon más un fijo mensual de pago.

Paddle queda atrás para planillas por la duda sobre "software genuino" y por el precio a pedido debajo de US$ 10.

### Etapa 2 (cuando haya ventas fuera de Argentina)

**dLocal Go para MX, CO, PE, CL, BR y UY**, con OXXO, SPEI, PSE, Efecty, PagoEfectivo, Webpay, Pix y Redpagos, que son los medios que usa la gente que no tiene tarjeta internacional. Es la opción más barata (~5% en tarjeta MX) y paga en pesos al banco argentino. A cambio, no es MoR: el IVA de cada país y la facturación quedan del lado de Manuel. Antes de activarlo, confirmar dos cosas: que acepten a una persona humana monotributista y el tarifario vigente (el PDF público es de 2022).

### Tabla por país

| País | Medio recomendado hoy | Comisión aprox. (venta US$ 10) | Esfuerzo de alta | Etapa 2 |
|---|---|---|---|---|
| Argentina | Mercado Pago Checkout Pro (actual) | 1,49% a 6,49% + IVA según plazo de acreditación (secundario: [El Cronista](https://www.cronista.com/finanzas-mercados/mercado-pago-estos-son-los-costos-y-recargos-por-usar-las-funciones-de-la-billetera-virtual/), no verificado en MP) | Ya está | Igual |
| México | MoR (Lemon o Gumroad), tarjeta o PayPal | 12% a 21% | Minutos | dLocal Go: OXXO, SPEI, tarjeta (~5% a 6%) |
| Colombia | MoR | 12% a 21% | Minutos | dLocal Go: PSE, Efecty, tarjeta (~5%) |
| Perú | MoR | 12% a 21% | Minutos | dLocal Go: PagoEfectivo, tarjeta (~4% a 15%; sin Yape) |
| Chile | MoR | 12% a 21% | Minutos | dLocal Go: Webpay, tarjeta (~4%) |
| Uruguay | MoR | 12% a 21% | Minutos | dLocal Go: Redpagos, tarjeta (~4% a 6%) |
| Brasil | MoR (Paddle tiene Pix, pero ver la duda de "software") | 10% a 21% | Minutos a días | dLocal Go: Pix (~1,2%), Boleto |
| Resto de LATAM y del mundo | MoR | 12% a 21% | Minutos | Igual |
| Venezuela, Cuba y sancionados | Ninguno (excluidos por Paddle y Stripe) | | | |

### Qué hacer en código (para la sesión que lo implemente)

- Una sola capa de cobro con dos proveedores: MP si el país detectado es AR, MoR en otro caso. Hoy el código asume ARS.
- Mostrar el precio en USD fuera de Argentina; el MoR lo localiza.
- Entrega del archivo por webhook del proveedor (Lemon, Gumroad y Polar mandan eventos de compra), no por la página de retorno.
- Precio mínimo fuera de Argentina: US$ 5. Los productos de US$ 3 conviene venderlos en paquete.
- Probar una venta real de $1 en MP AR con una tarjeta extranjera. Si pasa, sirve de respaldo para Uruguay y Chile.

---

## 8. Lo que quedó NO VERIFICADO

1. Si MP Argentina acepta hoy tarjetas emitidas en el exterior, con qué recargo y con qué tasa de aprobación. La única evidencia oficial es un tuit de MP de 2019.
2. Si un comprador puede pagar con su cuenta MP de otro país a una cuenta argentina. Todo indica que no.
3. Requisitos oficiales para abrir cuenta MP vendedora en MX, CL, CO, PE, UY y BR. Las páginas de MP devuelven 403 o piden login; lo que hay es secundario.
4. Si el programa Cross Border de MP acepta a un monotributista sin empresa.
5. Tarifario vigente de dLocal Go (el público es de nov. 2022), su spread cambiario y si acepta personas humanas.
6. Medios locales en LATAM de Gumroad, Polar y Hotmart; condiciones de Hotmart y Kiwify para vendedores argentinos.
7. Cómo y en qué moneda paga Paddle a un vendedor argentino.
8. Fecha y alcance de la migración de Lemon Squeezy a Stripe Managed Payments.
9. Número de Comunicación del BCRA de septiembre 2025 (tope de US$ 36.000) y vigencia de la "A" 7629/7630. La web del BCRA cambió y el texto ordenado de Exterior y Cambios no estaba en su URL histórica.
10. El tratamiento fiscal concreto (factura E a la plataforma o al consumidor, tope del monotributo, IVA digital en cada país). Es orientativo y hay que confirmarlo con un contador.
