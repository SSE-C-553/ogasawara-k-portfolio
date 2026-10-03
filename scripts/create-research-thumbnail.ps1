# Non-generative crop of the apparatus panel. The full conference figure stays intact.
Add-Type -AssemblyName System.Drawing
$assetDirectory = Join-Path $PSScriptRoot '../assets'
$sourceImage = [System.Drawing.Image]::FromFile((Join-Path $assetDirectory 'eye-displacement.png'))
$thumbnail = [System.Drawing.Bitmap]::new(640, 400)
$graphics = [System.Drawing.Graphics]::FromImage($thumbnail)
try {
    $graphics.Clear([System.Drawing.Color]::White)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($sourceImage, [System.Drawing.Rectangle]::new(8, 14, 624, 372), 7, 174, 416, 248, [System.Drawing.GraphicsUnit]::Pixel)
    $thumbnail.Save((Join-Path $assetDirectory 'eye-displacement-thumb.png'), [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
    $graphics.Dispose()
    $thumbnail.Dispose()
    $sourceImage.Dispose()
}
