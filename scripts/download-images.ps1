<#
.SYNOPSIS
  Descarrega imagens a partir de uma lista de URLs num ficheiro de texto.

.DESCRIPTION
  Lê um ficheiro .txt com uma URL de imagem por linha e descarrega cada uma
  para a pasta de destino indicada, mantendo o nome original do ficheiro.
  Linhas vazias ou que comecem por "#" são ignoradas.

.USAGE
  1. Reúne as URLs das imagens (ex: no browser, clique direito na imagem
     -> "Copiar endereço da imagem", ou via Inspecionar Elemento).
  2. Cola cada URL numa linha do ficheiro urls.txt (ver exemplo abaixo).
  3. Corre o script:
       .\download-images.ps1 -UrlsFile ".\urls.txt" -OutputDir "..\assets\img"

.EXAMPLE URLS FILE (urls.txt)
  # Logos
  https://www.rnb.pt/images/logo.svg
  https://www.rnb.pt/images/logo-white.svg

  # Hero
  https://www.rnb.pt/images/hero-antena.jpg
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$UrlsFile,

  [Parameter(Mandatory = $true)]
  [string]$OutputDir
)

if (-not (Test-Path $UrlsFile)) {
  Write-Host "Ficheiro de URLs não encontrado: $UrlsFile" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
  Write-Host "Pasta de destino criada: $OutputDir"
}

$lines = Get-Content -Path $UrlsFile | Where-Object {
  $_.Trim() -ne "" -and -not $_.Trim().StartsWith("#")
}

if ($lines.Count -eq 0) {
  Write-Host "Nenhuma URL válida encontrada em $UrlsFile" -ForegroundColor Yellow
  exit 0
}

$success = 0
$failed = 0

foreach ($url in $lines) {
  $url = $url.Trim()
  try {
    $fileName = [System.IO.Path]::GetFileName((New-Object System.Uri($url)).LocalPath)
    if ([string]::IsNullOrWhiteSpace($fileName)) {
      $fileName = "imagem-$(Get-Random).jpg"
    }

    $destPath = Join-Path $OutputDir $fileName

    Write-Host "A descarregar: $fileName ..." -NoNewline
    Invoke-WebRequest -Uri $url -OutFile $destPath -UseBasicParsing -TimeoutSec 30
    Write-Host " OK" -ForegroundColor Green
    $success++
  }
  catch {
    Write-Host " FALHOU" -ForegroundColor Red
    Write-Host "  Erro: $($_.Exception.Message)" -ForegroundColor DarkYellow
    $failed++
  }
}

Write-Host ""
Write-Host "==================================="
Write-Host "Concluído: $success descarregada(s), $failed falhada(s)"
Write-Host "Destino: $OutputDir"
Write-Host "==================================="
