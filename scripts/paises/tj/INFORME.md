# Tayikistán (`tj`): informe del agente

- Rama: `claude/pais-tj` (mergeada con `origin/main` el 2026-10-31).
- Mercado: `tj`, ruso (`ru-TJ`), TJS, `Asia/Dushanbe`, `estado: "interno"`, escala 10. `src/paises/index.ts` no se commitea.
- Total: **51 calculadoras** = 11 locales (7 publicables, 4 en borrador) + 40 universales (`universales: "todas"`).

## Fuentes: qué abrió y qué no (reintento del 2026-10-31)

| Sitio | Resultado | Uso |
|---|---|---|
| andoz.tj | **Abre** (antes no). Cadena TLS incompleta: curl con el almacén de Windows valida; Node sin `--use-system-ca` falla | Código Tributario vigente (`docs/kodex/TaxKodex.pdf`, enmiendas al 17.06.2026, 319 pág.), ley de presupuesto 2026, Código de Trabajo 2016 |
| president.tj | **Abre.** Es una SPA: el texto llega de su API pública de lectura (`controlpanel.president.tj/api/event/show`), sin login | Comentario oficial al Decreto № 1132 y Mensaje de 2024 |
| mmih.adlia.tj (Ministerio de Justicia, base ADLIA) | **Abre**, pero el texto completo pide login. No se entró: solo el índice y el fragmento inicial públicos | Lista de leyes que enmiendan el Código de Trabajo |
| ncz.tj | Caído (sin respuesta). **Copia en web.archive.org del 09.10.2025** de la página del Código de Trabajo | Código de Trabajo en ruso, con enmiendas 2022 y 2024 |
| mehnat.tj, mmk.tj | Caídos. Hay copias en archive (06/2026 y 10/2026), sin nada que hiciera falta | No se usan |
| adlia.tj, www.adlia.tj | Caídos. Copia de archive de 2023, vieja | No se usa |
| nbt.tj, stat.tj, mfa.tj, qonunguzori.tj | Abren. qonunguzori.tj es una revista jurídica, no un registro | nbt.tj para cursos; los demás no se usan |
| majlisioli.tj, portali-huquqi.tj, gov.tj, sugurta.tj | Sin respuesta | No se usan |
| khovar.tj | 410 desde curl (agencia estatal) | No se usa |
| mf.tj | Dominio estacionado, no es oficial | No se usa |

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| kurs-valyut | tipo-de-cambio | sí | nbt.tj, con detectores |
| kalkulyator-zarplaty | sueldo-neto (declara `mundo`) | sí | CT arts. 183, 191, 332; presupuesto art. 24 |
| podokhodnyy-nalog | impuesto-renta | sí | CT arts. 183, 191, 332; presupuesto art. 24 |
| sotsialnyy-nalog | aportes-seguridad-social | sí | CT arts. 332, 334 |
| nalogi-rabotodatelya | costo-empleador | sí | CT art. 332 |
| kalkulyator-nds | iva | sí | CT arts. 264, 397(4) |
| minimalnaya-zarplata | salario-minimo | sí | Decreto № 1132, comentario oficial |
| otpusknye | vacaciones | no, borrador (riesgo 1) | CTr arts. 93, 112 |
| sverkhurochnye | horas-extra | no, borrador (riesgo 1) | CTr arts. 67, 79, 154 |
| vykhodnoe-posobie | indemnizacion-despido | no, borrador (riesgos 1 y 2) | CTr arts. 51, 169 |
| srok-preduprezhdeniya | preaviso | no, borrador (riesgo 1) | CTr arts. 41, 45 |

CT = Código Tributario. CTr = Código de Trabajo. No se llegó a 15-25 locales: este encargo fue reintentar fuentes y publicar lo que las tuviera.

## Datos

**Verificados: 9 datos, 11 tramos** (más 5 series de nbt.tj). `verificadoEl` 2026-10-31 con `nota` en cada fuente que lo necesita.

**No verificados: 7 datos, 7 tramos, todos del Código de Trabajo** (`tj.otpusk-dney`, `tj.nedelya-chasov`, `tj.sverkhurochnye-mnozhitel`, `tj.sverkhurochnye-chasov-v-god`, `tj.vykhodnoe-mesyatsev`, `tj.preduprezhdenie`, `tj.preduprezhdenie-rabotnika`). Motivo: redacción hasta 2024 leída en copia de archive; las leyes № 2234, № 2261 y № 2312 de 2026 no se leyeron completas.

Lo que cambió al leer la fuente primaria (el borrador anterior venía de resúmenes):

- **Deducción personal: no estaba en ninguna fuente.** Son 2 indicadores de cálculo (CT art. 191.1), 10 para categorías con beneficio (191.2), y el indicador 2026 son 78 TJS (presupuesto art. 24): 156 TJS por mes.
- **Fórmula de renta corregida.** La base resta también el impuesto social del empleado (CT art. 191.6). El borrador no lo restaba.
- **IVA:** 14 % hasta el 31.12.2026 y 13 % desde 2027 están en el art. 397(4); el art. 264 dice 15 %, y prevalece la norma transitoria. Se agregan las reducidas de 7 % y 5 % (264.1.2).
- **«Государственные» pasa a «бюджетные учреждения»:** la ley dice бюджетные, no estatales. Las claves internas no cambian.
- **Preaviso:** se quitó «7 días por período de prueba». El art. 28(8) habla de otra cosa (avisar por escrito cerca del final de la prueba) y el resumen de WageIndicator lo daba por plazo. Los plazos de 2 y 1 meses se calculan en meses calendario, no como 60 y 30 días.
- **Indemnización:** las etiquetas ahora citan el artículo (51 y 169), porque el borrador no sabía a qué caso iba cada monto.

Vistos y no usados: IPC (stat.tj solo anual) y tasa de refinanciación.

## Riesgos que tiene que mirar el coordinador

1. **Código de Trabajo sin confirmar en su última redacción.** Lo leído es la copia de ncz.tj del 09.10.2025 (hasta la enmienda de 2024), cotejada en parte con el PDF de 2016 de andoz.tj; el tope de 120 horas se leyó en el texto tayiko de 2016. Después hubo tres leyes: № 2234 (16.02.2026), № 2261 (17.06.2026) y № 2312 (21.10.2026). ADLIA solo muestra su inicio sin login: lo visible trata de discriminación, pago «sin efectivo» y redacción sobre calificación, sin tocar estas cifras, **pero no se leyó el texto completo**. Decisión del coordinador: lo prudente. Las 4 calculadoras quedan en borrador, con sus datos `no-verificado`, sin `.casos.ts` y con el contenido mínimo sin cifras. El contenido completo y los casos están en el commit `6ed3d1d9`, para recuperarlos cuando se lean esas leyes.
2. **Arts. 51 y 169 se superponen en la reducción de personal** (3 sueldos contra 1 sueldo más conservar el promedio en los meses 2 y 3). El Código no dice cómo se relacionan; la calculadora y el texto muestran ambos sin elegir.
3. **Salario mínimo:** se leyó el comentario oficial en president.tj, no el texto del decreto. El tramo de 1000 TJS sale del Mensaje de 2024 y no de su decreto.
4. **Supuestos de fórmula, declarados en el texto:** horas del mes = 40 × 52 / 12; proporción del mínimo en un mes incompleto; el salario medio diario de vacaciones lo ingresa el usuario.
5. **El Código Tributario se leyó en tayiko** y es traducción propia. El art. 264.1.2 (sin derecho a crédito) se entendió aplicado a todo el grupo del 5 %.
6. **Fechas `desde` de las normas laborales:** 2026-01-01 es el inicio de lo verificado, no la entrada en vigor.

## Detectores

- 5 de tipo de cambio (`api-xml`, RSS de nbt.tj). Prueba real hoy: USD 9,2086, EUR 10,3118, RUB 0,1144, CNY 1,3844, KZT 0,02029, con fecha 2026-11-02.
- 1 de norma nuevo, `tj.trudovoy-kodeks`: avisa si ADLIA lista una ley de enmienda con número mayor a 2312. Prueba real: `[]`.
- **Sin detector del Código Tributario.** Se escribió uno sobre andoz.tj y se retiró: en Node falla por la cadena TLS incompleta del sitio (con `--use-system-ca` da `[]`), y no se desactiva la validación TLS. Pedido al coordinador: si el corredor usa `--use-system-ca`, se puede sumar. Mientras tanto, `tj.nds` y `tj.pokazatel` tienen `proximaRevision` 2027-01-01.

## Checks (con `tj` registrado localmente)

- `tsc --noEmit`: sin errores.
- `check_paises tj`: OK, 16 datos, 11 tramos verificados y 7 pendientes, 5 series, 51 calculadoras. 1 aviso: `kurs-valyut` deja de ser publicable antes del 2026-12-01 si los detectores no corren.
- `check_paises_casos tj`: 34 casos en 7 archivos, OK.
- `check_textos_paises tj`: OK, 0 avisos.
- `check_seo_pais tj`: OK, 0 avisos.
- `check_ofertas_intl tj`: OK.
- `check_fronteras`, `check_eol`, `check_motor` (4827 pruebas): OK.
- `check_mundo`: 1 falla en `be`, país que esta rama no toca; `tj` no aparece.
- **No se miró en `next dev`:** haría falta un `npm ci` real en el worktree.

## Pendientes

1. Leer el texto completo de las leyes № 2234, № 2261 y № 2312 (ADLIA con acceso, o ncz.tj cuando vuelva) y cerrar el riesgo 1: pasar los 7 datos a `verificado` y recuperar de `6ed3d1d9` el contenido y los casos de las 4 calculadoras.
2. Hacer la calculadora de inflación si aparece la serie mensual de IPC en stat.tj.
3. Sumar más locales hacia 15-25 (régimen simplificado, patente, feriados). Las fuentes ya están.
