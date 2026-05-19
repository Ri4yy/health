const fs = require('fs');
const path = require('path');

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (
        (content.includes('useState') || 
         content.includes('useEffect') || 
         content.includes('useStore') || 
         content.includes('useRouter')) 
         && !content.includes('"use client"')
         && !content.includes("'use client'")
      ) {
         fs.writeFileSync(fullPath, '"use client";\n' + content, 'utf8');
         console.log('Fixed:', fullPath);
      }
    }
  }
}
walk('./src');
