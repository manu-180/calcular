# ASCII-only. Registra la tarea programada "CalcularYa-Mensual": el dia 1 de cada mes a las 06:17 corre
# scripts/cron/mensual.ps1 (precios de horas + foto de rankings -> main). Si la PC estaba apagada, corre
# apenas puede (StartWhenAvailable). Corre como el usuario actual (git, gh y npm del usuario). Re-ejecutable.
$NOMBRE = "CalcularYa-Mensual"
$boot   = Join-Path $env:LOCALAPPDATA "calcularya-cron\mensual.ps1"
New-Item -ItemType Directory -Force (Split-Path $boot) | Out-Null
# Copia fuera del worktree: mensual.ps1 resetea ese worktree en cada corrida.
Copy-Item (Join-Path $PSScriptRoot "mensual.ps1") $boot -Force
# New-ScheduledTaskTrigger no tiene disparo mensual en PS 5.1: se crea con schtasks y se ajusta despues.
$accion = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$boot`""
schtasks /Create /F /TN $NOMBRE /SC MONTHLY /D 1 /ST 06:17 /RL LIMITED /TR $accion | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "schtasks fallo (exit $LASTEXITCODE)"; exit 1 }
$ajustes = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 2) -MultipleInstances IgnoreNew -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 30)
Set-ScheduledTask -TaskName $NOMBRE -Settings $ajustes | Out-Null
Write-Host "Tarea $NOMBRE registrada (dia 1, 06:17, corre apenas pueda si se la perdio) -> $boot"
Write-Host "Probar en seco: powershell -NoProfile -ExecutionPolicy Bypass -File `"$boot`" -Dry"
