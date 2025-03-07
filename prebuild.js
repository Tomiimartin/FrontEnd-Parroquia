const fs = require('fs');
const files = ['index.html', 'calendario.html', 'comunidades.html', 'new.html', 'noticias.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('${BACKEND_URL}', JSON.stringify(process.env.BACKEND_URL));
  content = content.replace('${STRAPI_URL}', JSON.stringify(process.env.STRAPI_URL));
  fs.writeFileSync(file, content);
});