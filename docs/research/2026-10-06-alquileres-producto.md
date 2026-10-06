# Planilla de alquileres 2026 — research de producto

Consultado el 6 de octubre de 2026. Regla: dato legal sólo con fuente oficial; lo que salió de fuentes
secundarias está marcado como tal y no se usa como afirmación legal en el producto.

## 1. Régimen vigente (alquiler de vivienda)

| Tema | Qué dice | Fuente | Tipo |
|---|---|---|---|
| Ley 27.551 | Derogada por el DNU 70/2023, art. 249 (B.O. 21/12/2023). | [Infoleg, DNU 70/2023](https://servicios.infoleg.gob.ar/infolegInternet/anexos/395000-399999/395521/norma.htm) — texto literal verificado el 12/6/2026 (ver `src/data/inflacion.ts`) | Oficial |
| Índice de ajuste | Art. 1199 CCyC (texto según art. 257 del DNU): «Las partes podrán pactar el ajuste del valor de los alquileres. Será válido el uso de cualquier índice pactado por las partes, público o privado, expresado en la misma moneda en la que se pactaron los alquileres.» | Ídem + [CCyC en Infoleg](https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm) | Oficial |
| Periodicidad | No hay periodicidad legal: se pacta. En la práctica 3, 4 y 6 meses (12 en los contratos viejos). | Práctica de mercado: [La Nación, 4/5/2026](https://www.lanacion.com.ar/propiedades/casas-y-departamentos/alquileres-como-calcular-los-aumentos-por-inflacion-en-mayo-2026-segun-los-distintos-indices-nid04052026/) | Secundaria |
| Plazo | Art. 1198 CCyC según DNU 70/2023: el que pacten las partes; si no pactan, 2 años para vivienda y 3 para otros destinos. | [Cuadro comparativo Colegio de Martilleros (camoron.org.ar)](https://camoron.org.ar/wp-content/uploads/2024/01/CUADRO-COMPARATIVO-CONTRATO-DE-LOCACION.pdf); el texto completo de Infoleg no se pudo leer entero con el fetcher | Secundaria — **no se afirma en el producto**; la planilla pide la duración como dato del contrato |
| Registro en ARCA (RELI) | Eliminada la obligación de registrar contratos (RG 5545/2024, 12/8/2024). Sólo lo registra quien quiere usar beneficios fiscales (p. ej. deducción del alquiler en Ganancias). | [AFIP/ARCA, novedad 4234](https://servicioscf.afip.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=4234) | Oficial |
| Recibo | CCyC art. 896 (el recibo es el instrumento en que el acreedor reconoce haber recibido la prestación) y art. 897 (el deudor tiene derecho a obtener la constancia de liberación). | Numeración y texto vía [codigocivilonline](https://codigocivilonline.com.ar/etiquetas/articulo-899/) | Secundaria — en el producto se dice sólo «darle recibo de cada pago», sin citar artículo |
| Contratos firmados jul-2020 a dic-2023 | Siguen en general con su esquema original (ICL anual) hasta terminar (art. 7 CCyC). | Ya verificado en `src/data/inflacion.ts` | Oficial |

## 2. Índices que se usan

- **IPC (INDEC)**: el más usado en contratos nuevos (La Nación, 5/2026). Está en el repo
  (`src/data/ipc-serie.ts`), con fuente oficial (API de series de tiempo de datos.gob.ar) y se
  regenera solo (workflow datos-vivos → `scripts/gen_ipc_serie.ts` → deploy). **Va embebido.**
- **ICL (BCRA)**: el BCRA lo sigue publicando a diario en 2026 (Comunicaciones «B», p. ej.
  [B 13159](https://www.bcra.gob.ar/Pdfs/comytexord/B13159.pdf)). **No está en el repo** → la
  planilla lo admite como «otro índice» con el % de cada ajuste cargado a mano.
- **Casa Propia**: coeficiente oficial usado en algunos contratos (semestral). **No está en el repo**
  → mismo tratamiento que el ICL.

Convención de meses: dos formas conviven. (a) los N meses completos anteriores al mes del ajuste
(la de la calculadora de calcular.ar); (b) los últimos N meses *publicados* al momento del ajuste,
que corren un mes atrás porque el INDEC publica a mitad del mes siguiente (es la que usa La Nación
en su ejemplo de mayo 2026: dic-mar para un ajuste cuatrimestral de mayo). La planilla ofrece las
dos, con (a) por defecto para coincidir con la calculadora.

## 3. Qué necesita un propietario chico (1-5 unidades)

1. Saber **cuándo** toca el próximo aumento y **cuánto** da, sin rehacer la cuenta cada vez.
2. **Avisarle al inquilino** con la cuenta y la fuente, para que no haya discusión.
3. **Recibo** de cada pago (con expensas/servicios si los cobra junto).
4. Historial del contrato: cuánto cobró en cada período.
5. Cero mantenimiento: que el índice venga cargado y que la versión nueva llegue sola.

## 4. Competencia (qué hay gratis y qué se vende)

| Quién | Qué | Precio | Hueco |
|---|---|---|---|
| Calculadoras online (Roomix, Mercado Libre, medios, calcular.ar) | Un cálculo por vez, IPC/ICL | Gratis | No guardan contratos, no hacen recibo ni aviso |
| [Planilla de EconoBlog](https://www.econoblog.com.ar/?p=95938) | Excel de ajuste por ICL, Ley 27.551 | Gratis | Desactualizada (2021, ley derogada), sin IPC, sin recibo |
| [YoFacturo Alquileres](https://yo-facturo.com/alquileres/) | Facturación recurrente, cuenta corriente, recordatorios por WhatsApp | $50.000 a $150.000 por mes | Pensado para administradoras; el ajuste IPC/ICL lo carga el usuario a mano |
| Inmobiliarias | Administración completa | Comisión mensual (típicamente un % del alquiler) | Caro para quien tiene 1-3 unidades |

Posicionamiento: entre la calculadora gratis (un cálculo suelto) y el software mensual para
administradoras. Pago único de $9.900, el índice oficial ya cargado, y lo que el dueño chico hace
todos los meses (saber el número, avisar, dar recibo) en un solo archivo.

## 5. Decisiones que salen de acá

- Sólo IPC embebido. ICL y Casa Propia como «Otro índice (% a mano)», sin prometer datos que el
  repo no mantiene.
- Duración del contrato como dato (no se asume plazo legal).
- La captura de mail promete lo que el sistema ya manda: el resumen de cada lunes con el último IPC
  (`/api/cron/newsletter`). No se prometen avisos personalizados por contrato.
