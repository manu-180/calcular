# universales ar: las 41 calculadoras universales en árabe

Rama `claude/mundo-trad-ar`, basada en la rama local `claude/mundo-motor-ar` (sin mergear todavía). **Depende de ese PR**: hay que mergear primero el motor ar (núcleo, RTL, venta y ADR D10) y después esta rama. No se mergeó main aparte (el motor ya trae origin/main).

## Qué incluye

- `textos/ar.ts` (`textosAr`) y `contenido/ar.ts` (`contenidoAr`) para las 41 universales, y el cableado de sus `index.ts` (`gen_idiomas_universales`).
- Registro de D10: árabe estándar moderno de banco y gobierno, segunda persona masculina genérica (أدخل، احسب، اختر), impersonal donde se puede. La familia de embarazo (fecha-de-parto, ovulacion) le habla en femenino a la persona gestante.
- Slugs: el slug en inglés del catálogo (columna `en`), igual que ja, ko y zh, como decidió D10.
- Textos neutrales entre países árabes: vocabulario estándar de banca (قرض، قسط شهري، التمويل العقاري، الدفعة الأولى، فائدة مركبة، ضريبة القيمة المضافة), sin organismos ni leyes de un solo país. La jubilación remite a «جهة التأمينات الاجتماعية أو التقاعد في دولتك» sin nombrarla; en hipoteca hay una pregunta sobre el financiamiento islámico (معدل الربح).
- Cifras occidentales, puntuación árabe (، ؛ ؟), comillas «», sin tatweel de adorno, sin exclamaciones ni rayas. Plurales con `pluralAr` y `FormasAr` (dual en genitivo detrás de خلال/بعد: شهرين، سنتين). Números de los ejemplos calculados con `montoEjemplo` y las fórmulas de cada definición.
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, con la oración de que no reemplaza la consulta médica.
- `src/motor/universales/comun/arabe.ts` (nuevo, fuera del núcleo): `textosArabes` y `contenidoArabe`. En ar-EG, ar-SA, ar-AE y ar-MA el símbolo de la moneda termina en punto («ج.م.‏») y una oración que terminaba en un monto quedaba con dos puntos; el envoltorio deja que el punto del símbolo cierre la oración, también en las observaciones que reciben montos ya formateados.
- `dias-entre-fechas/textos/ar.ts` exporta `duracionAr` (partes unidas con «و»), que reutiliza edad. Los días hábiles se cuentan de lunes a viernes como en la definición; la nota aclara que en muchos países árabes el fin de semana es viernes y sábado y que no se descuentan feriados.

## Commits

- `2fc58947` prestamo, tasa-efectiva, hipoteca, alquilar-o-comprar, interes-compuesto, interes-simple, meta-de-ahorro, ahorro-retiro, tarjeta-de-credito, presupuesto
- `576a2924` fondo-de-emergencia, costo-de-un-auto, rendimiento-inversion, margen-de-ganancia, punto-de-equilibrio, tarifa-freelance, conversor-sueldo, aumento-de-sueldo, horas-trabajadas, iva
- `2180d4c2` imc, calorias, fecha-de-parto, ovulacion, ritmo-de-carrera, combustible, consumo-electrico, pintura, metros-cuadrados, ceramicos, hormigon
- `39b6a885` porcentaje, variacion-porcentual, regla-de-tres, descuento, propina, dividir-gastos, promedio, edad, dias-entre-fechas, sumar-dias
- `b7aad46f` sin doble punto tras un monto (comun/arabe)

## Checks

- `npx tsc --noEmit -p .`: sin errores.
- `npx tsx scripts/check_universales.ts`: 41 universales, 4664 casos probados ✓ (los mercados ar de prueba eg, sa, ma-ar y el nombre largo ya estaban en el motor; no hizo falta sumar ninguno).
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día ✓.
- `npx tsx scripts/check_eol.ts`: 8261 archivos en LF ✓.
- `npx tsx scripts/check_textos_paises.ts zz-ar`: 34 textos, 0 avisos.
- `npx tsx scripts/check_i18n.ts`: 19644 textos en 11 idiomas ✓.
- `npx tsx scripts/check_fronteras.ts`: 7593 archivos sin cruces ✓.
- `npx tsx scripts/check_ofertas_intl.ts`: 15 fallas, todas de `cl/sueldo-liquido` y `cl/finiquito` (planilla con datos contra calculadora por el valor de la UF), ajenas a este frente.
- Revisión extra fuera del repo: las 41 en eg, sa, ma-ar y un mercado imperial (ae) con las reglas de `reglas_idioma.ts`, largos de title y description y doble punto: 0 problemas (check_universales no prueba un mercado ar imperial).

## Pendientes y riesgos

- Mergear después de `claude/mundo-motor-ar`.
- Los textos imperiales en árabe (millas, galones, libras) solo se revisaron con el script extra; ningún mercado árabe es imperial hoy.
- Las fallas de Chile en check_ofertas_intl son previas y de otro frente.

## Merge del motor ar al día (24/10, tarde)

`1ce5b827` mergea `claude/mundo-motor-ar` en `7d9ed77b` (motor puesto al día con main 7d190a68:
calendario, horas, rankings, sueldos reales y afiliados en árabe, rtl de las hojas nuevas, zz-ar en
`ar-001`, coma árabe en las uniones armadas por código). Sin conflictos. `88bc6692` regenera
`src/motor/universales/cargadores.ts` (no traía la entrada `ar` de ninguna universal y check_motor
fallaba).

- `gen_idiomas_universales`: 0 index reescritos; `--check` al día
- `npx tsc --noEmit -p .`: OK
- `check_universales`: 41 universales, 4664 casos ✓
- `check_motor`: 2333 pruebas OK (después de regenerar cargadores)
- `check_i18n`: 30405 textos OK · `check_textos_paises zz-ar`: 33 textos, 0 avisos
- `check_ofertas_intl`: 15 FALLAS, todas de cl (UF), ajenas
- `check_eol`: 8500 archivos en LF · `check_fronteras`: 7661 archivos OK
- La regla nueva de `reglas_idioma` (coma latina delante de una letra árabe) no encuentra nada en las
  universales en árabe.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
