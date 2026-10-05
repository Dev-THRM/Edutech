const fs = require('fs');
const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const base64Data = body.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync('C:/THRM-Edutech/logo_transparent.png', base64Data, 'base64');
      console.log('SUCCESS: logo_transparent.png saved successfully!');
      res.end('OK');
      setTimeout(() => process.exit(0), 500);
    });
  } else if (req.url === '/logo.webp') {
    res.writeHead(200, { 'Content-Type': 'image/webp' });
    res.end(fs.readFileSync('C:/THRM-Edutech/logo.webp'));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
      <canvas id="canvas"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Turn all white and light gray background pixels 100% transparent
            if (r > 215 && g > 215 && b > 215) {
              data[i + 3] = 0;
            } else if (r > 185 && g > 185 && b > 185) {
              const alpha = Math.max(0, 255 - ((r + g + b) / 3 - 185) * 8);
              data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
            }
          }

          ctx.putImageData(imgData, 0, 0);

          fetch('/', {
            method: 'POST',
            body: canvas.toDataURL('image/png')
          });
        };
        img.src = '/logo.webp';
      </script>
      </body>
      </html>
    `);
  }
});

server.listen(9876, () => {
  console.log('Server running on http://localhost:9876');
  exec('start http://localhost:9876');
});
