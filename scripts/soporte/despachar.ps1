# ASCII-only a proposito: PS 5.1 sin BOM rompe el parseo con acentos.
# Lo corre la tarea programada "CalculAR-Soporte" cada 5 min. Sincroniza el buzon y, solo si hay
# hilos pendientes, lanza claude con scripts/soporte/AGENTE.md en un worktree propio (HEAD suelto
# en origin/main). Sin pendientes no gasta un token.

param([int]$TimeoutMin = 90)

$ErrorActionPreference = "Continue"
$REPO  = "C:\MisProyectos\Armagedon\libre_albedrio\calcular-ar"
$WT    = "C:\MisProyectos\Armagedon\calcular-soporte-agente"
$BASE  = Join-Path $env:LOCALAPPDATA "calcular-soporte"
$LOGS  = Join-Path $BASE "logs"
$FLAG  = Join-Path $BASE "corriendo.flag"
New-Item -ItemType Directory -Force $LOGS | Out-Null
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$WLOG  = Join-Path $LOGS "despachar.log"
function L($m) { Add-Content -Path $WLOG -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m) -Encoding UTF8 }

# Fallas seguidas del agente. Lo lee ~/.claude/scripts/pulso-tareas.ps1, que avisa en Kairo:
# sin esto un agente caido no se nota (nadie mira estos logs).
$FALLAS = Join-Path $BASE "fallas-seguidas.txt"
function Anotar-Falla($motivo) {
    $n = 0
    if (Test-Path $FALLAS) { $n = [int]((Get-Content $FALLAS -TotalCount 1) -replace '\D', '') }
    $m = ("$motivo" -replace '\s+', ' ')
    if ($m.Length -gt 300) { $m = $m.Substring(0, 300) }
    Set-Content -Path $FALLAS -Value @(($n + 1), (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $m) -Encoding ASCII
}

if (Test-Path $FLAG) {
    $viejoPid = Get-Content $FLAG -ErrorAction SilentlyContinue
    if ($viejoPid -and (Get-Process -Id $viejoPid -ErrorAction SilentlyContinue)) { exit 0 }
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
Set-Content -Path $FLAG -Value $PID -Encoding ASCII

try {
    if (-not (Test-Path $WT)) {
        git -C $REPO fetch -q origin main
        git -C $REPO worktree add -q --detach $WT origin/main
        L "worktree creado en $WT"
    }
    Set-Location $WT
    # El worktree es exclusivo del agente: si un tick anterior quedo a mitad, se descarta.
    git fetch -q origin main
    git checkout -q --detach -f origin/main
    git clean -fdq
    # La tarea corre una copia fuera del worktree; se refresca sola con lo que haya en main.
    Copy-Item (Join-Path $WT "scripts\soporte\despachar.ps1") (Join-Path $BASE "despachar.ps1") -Force -ErrorAction SilentlyContinue
    $lock = (Get-FileHash package-lock.json).Hash
    $lockMarca = Join-Path $BASE "lock.hash"
    if (-not (Test-Path node_modules) -or ((Get-Content $lockMarca -ErrorAction SilentlyContinue) -ne $lock)) {
        L "npm ci"
        npm ci --no-audit --no-fund --loglevel=error | Out-Null
        Set-Content -Path $lockMarca -Value $lock -Encoding ASCII
    }

    # PowerShell se come un -- suelto: envkit recibiria "run npx" y fallaria con su ayuda.
    envkit run '--' npx tsx scripts/soporte/soporte.ts sincronizar 2>&1 | Out-Null
    $pend = (envkit run '--' npx tsx scripts/soporte/soporte.ts pendientes 2>$null) -join "`n"
    if ($LASTEXITCODE -ne 0) { L "pendientes fallo: $pend"; exit 1 }
    if ($pend.Trim() -eq "[]") { exit 0 }

    $CANDIDATOS = @("$env:USERPROFILE\.local\bin\claude.exe", "$env:APPDATA\npm\claude.cmd") | Where-Object { Test-Path $_ }
    $CLAUDE = $null; $VER = $null
    foreach ($c in $CANDIDATOS) {
        $s = & $c --version 2>$null
        if ("$s" -match '(\d+)\.(\d+)\.(\d+)') {
            $v = [version]("{0}.{1}.{2}" -f $Matches[1], $Matches[2], $Matches[3])
            if ($null -eq $VER -or $v -gt $VER) { $VER = $v; $CLAUDE = $c }
        }
    }
    if (-not $CLAUDE) { L "claude no encontrado"; exit 1 }

    Remove-Item Env:\CLAUDECODE -ErrorAction SilentlyContinue
    Remove-Item Env:\CLAUDE_CODE_ENTRYPOINT -ErrorAction SilentlyContinue
    # El agente contesta mails de clientes: es un producto que llama a Claude por cuenta de
    # terceros, asi que va por API key y no por el login de suscripcion del CLI (terminos de
    # Anthropic, ver ~/.claude/docs/cuentas-claude.md). Ademas ese login vence: el 14/11/2026
    # caduco el refresh token y el agente fallo 232 veces seguidas sin que nadie se entere.
    # Principal y respaldo salen de envkit (namespace calcular-ar); si la principal no tiene
    # saldo o esta revocada, se reintenta con la de respaldo.
    Remove-Item Env:\CLAUDE_CODE_OAUTH_TOKEN -ErrorAction SilentlyContinue
    $LLAVES = @()
    foreach ($n in @('ANTHROPIC_API_KEY', 'ANTHROPIC_API_KEY_RESPALDO')) {
        $v = envkit run --only $n '--' node -e "process.stdout.write(process.env.$n||'')" 2>$null
        if ($LASTEXITCODE -eq 0 -and "$v".Trim()) { $LLAVES += , @($n, "$v".Trim()) }
    }
    if ($LLAVES.Count -eq 0) { L "sin ANTHROPIC_API_KEY en envkit (calcular-ar): no se lanza"; Anotar-Falla "sin API key en envkit"; exit 1 }

    $ok = $false
    $motivo = ""
    $intento = 0
    foreach ($par in $LLAVES) {
        $intento++
        $LOG = Join-Path $LOGS "agente-$stamp-$intento.log"
        $env:ANTHROPIC_API_KEY = $par[1]
        L "pendientes -> lanzando claude $VER con $($par[0]) (log $LOG)"
        $proc = Start-Process -FilePath $CLAUDE `
            -ArgumentList '--dangerously-skip-permissions', '--model', 'opus', '-p' `
            -RedirectStandardInput (Join-Path $WT "scripts\soporte\AGENTE.md") `
            -RedirectStandardOutput $LOG -RedirectStandardError "$LOG.err" `
            -WorkingDirectory $WT -NoNewWindow -PassThru
        try { $null = $proc.Handle } catch { }
        if (-not $proc.WaitForExit($TimeoutMin * 60 * 1000)) {
            L "timeout de $TimeoutMin min, se corta pid $($proc.Id)"
            Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
            $motivo = "timeout de $TimeoutMin min"
            break
        }
        L "claude termino exit=$($proc.ExitCode)"
        if ($proc.ExitCode -eq 0) { $ok = $true; break }
        $cola = (Get-Content $LOG -Tail 5 -ErrorAction SilentlyContinue) -join " "
        $motivo = "exit=$($proc.ExitCode) $cola"
        # Solo se salta de llave si el problema es de la llave; un error del agente no se repite.
        if ($cola -notmatch 'credit balance|Invalid API key|authentication|Failed to authenticate|OAuth|401|403') { break }
        L "la llave $($par[0]) no sirve, se prueba la siguiente"
    }
    Remove-Item Env:\ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
    if ($ok) { Remove-Item $FALLAS -Force -ErrorAction SilentlyContinue } else { Anotar-Falla $motivo }
    Get-ChildItem $LOGS -Filter "agente-*" | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } | Remove-Item -Force -ErrorAction SilentlyContinue
} catch {
    L "ERROR: $_"
} finally {
    Remove-Item $FLAG -Force -ErrorAction SilentlyContinue
}
