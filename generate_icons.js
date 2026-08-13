const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size, filename, isMaskable = false) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background - Veritas Graphite
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);

    // Scaling factor
    const s = size / 48;
    const padding = isMaskable ? size * 0.2 : 0;
    const contentSize = size - (padding * 2);
    const contentScale = contentSize / 48;

    ctx.save();
    ctx.translate(padding, padding);
    ctx.scale(contentScale, contentScale);

    // Draw Veritas Logo (based on SVG in index.tsx)
    ctx.strokeStyle = '#3b82f6'; // veritas-electric
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(12, 36);
    ctx.lineTo(24, 8);
    ctx.lineTo(36, 36);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = '#8b5cf6'; // veritas-violet
    ctx.beginPath();
    ctx.moveTo(18, 28);
    ctx.lineTo(30, 28);
    ctx.stroke();

    ctx.fillStyle = '#60a5fa'; // veritas-electric-glow
    ctx.beginPath();
    ctx.arc(24, 38, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`Generated ${filename}`);
}

generateIcon(192, 'public/icons/icon-192x192.png');
generateIcon(512, 'public/icons/icon-512x512.png');
generateIcon(192, 'public/icons/icon-192x192-maskable.png', true);
generateIcon(512, 'public/icons/icon-512x512-maskable.png', true);
generateIcon(180, 'public/icons/apple-touch-icon.png');
