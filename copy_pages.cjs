const fs = require('fs');
const path = require('path');

const srcLayout = ['header', 'footer', 'drawer', 'modal'];
const srcShared = ['breadcrumbs', 'empty-state', 'hero-section', 'newsletter', 'pagination', 'team-member', 'toast'];
const srcCore = ['button', 'checkbox', 'chip', 'input', 'radio', 'skeleton', 'tabs', 'toggle'];
const srcCards = ['address-card', 'category-card', 'category-tile', 'feature-card', 'info-card', 'order-card', 'product-card', 'recommendation-card', 'review-card'];
const srcEcommerce = ['cart-item', 'filters', 'order-summary', 'product-gallery'];

const pagesToCopy = [
  { file: 'auth-page.tsx', route: 'auth' },
  { file: 'checkout-page.tsx', route: 'checkout' },
  { file: 'loyalty-page.tsx', route: 'loyalty' },
  { file: 'delivery-page.tsx', route: 'delivery' },
  { file: 'payment-page.tsx', route: 'payment' },
  { file: 'returns-page.tsx', route: 'returns' },
  { file: 'privacy-page.tsx', route: 'privacy-policy' },
  { file: 'terms-page.tsx', route: 'terms' },
  { file: 'offer-page.tsx', route: 'offer' },
];

const sourceBase = 'c:\\Users\\ri4y\\Desktop\\Practice\\design-system\\src\\app\\pages';
const destViews = 'c:\\Users\\ri4y\\Desktop\\Practice\\health\\src\\views';
const destApp = 'c:\\Users\\ri4y\\Desktop\\Practice\\health\\src\\app';

pagesToCopy.forEach(({ file, route }) => {
  let content = fs.readFileSync(path.join(sourceBase, file), 'utf8');

  // Fix imports
  content = content.replace(/from '\.\.\/components\/([^']+)'/g, (match, comp) => {
    if (srcLayout.includes(comp)) return `from '../components/layout/${comp}'`;
    if (srcShared.includes(comp)) return `from '../components/shared/${comp}'`;
    if (srcCore.includes(comp)) return `from '../components/core/${comp}'`;
    if (srcCards.includes(comp)) return `from '../components/cards/${comp}'`;
    if (srcEcommerce.includes(comp)) return `from '../components/ecommerce/${comp}'`;
    if (comp === 'figma/ImageWithFallback') return `from '../components/figma/ImageWithFallback'`;
    return `from '../components/${comp}'`;
  });
  
  if ((content.includes('useState') || content.includes('useEffect')) && !content.includes('"use client"')) {
    content = '"use client";\n' + content;
  }
  
  fs.writeFileSync(path.join(destViews, file), content, 'utf8');
  
  const routeDir = path.join(destApp, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  const compName = file.split('.')[0].split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  
  const nextContent = `import { ${compName} } from '../../views/${file.replace('.tsx', '')}';\n\nexport default function Page() {\n  return <${compName} />;\n}\n`;
  fs.writeFileSync(path.join(routeDir, 'page.tsx'), nextContent, 'utf8');
});
console.log("Pages copied and routes created successfully.");
