# Pedidos para la PC de países

Arreglos que solo se pueden hacer en `src/paises/<m>/**` o `scripts/paises/<m>/**`. Los anota quien
los encuentra desde el motor; los aplica la PC que mantiene los países y borra la entrada al cargarlo.

## NI: IPC del INIDE vencido desde el 2026-10-25 (2026-10-24)

- **Archivo:** `src/paises/ni/series.json`, serie `ni.ipc`.
- **Qué pasa:** el último punto es `2026-07-01` (326,1628, cuadro 2-1-06 del XLS de julio). Con
  `maxAntiguedadDias: 115`, el 2026-10-25 queda sin valor y `ni/inflacion` deja de publicarse (sale del
  sitemap y de los clústeres de hreflang de inflación).
- **Qué cargar:** agosto y septiembre de 2026 del IPC nacional cuando el INIDE los publique. El
  2026-10-24 no estaban: `https://www.inide.gob.ni/Home/ipc` lista hasta julio y
  `https://www.inide.gob.ni/docs/ipc/ipc_2026/ipc_ago26/` da 404. Mismo patrón de URL que julio
  (`ipc_<mes>26/Cuadros_Estadisticas_IPC_<mes>_2026.xls`), cuadro 2-1-06.
- **A evaluar:** el INIDE publica con unos 2,5 meses de atraso (julio se leyó el 2026-10-08) y 115 días
  desde el día 1 del mes medido dejan unas 3 semanas de margen tras cada publicación. Si el calendario
  del INIDE confirma ese atraso, subir `maxAntiguedadDias` a algo como 130 evita que la página se apague
  cada mes entre publicaciones. Decisión del país, con el calendario oficial a la vista.
