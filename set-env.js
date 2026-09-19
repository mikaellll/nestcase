const fs = require('fs');
const cp = require('child_process');

let d;
try {
  let content = fs.readFileSync('.auth-keys.json', 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  d = JSON.parse(content);
} catch(e) {
  let content = fs.readFileSync('.auth-keys.json', 'utf-16le');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  d = JSON.parse(content);
}

const jwt = d.JWT_PRIVATE_KEY;
const jwks = d.JWKS;

console.log("Setting JWT_PRIVATE_KEY...");
cp.execSync(`npx convex env set "JWT_PRIVATE_KEY=${jwt}"`, {stdio: 'inherit'});

console.log("Setting JWKS...");
cp.execSync(`npx convex env set "JWKS=${jwks}"`, {stdio: 'inherit'});

console.log("Setting SITE_URL...");
cp.execSync(`npx convex env set SITE_URL=http://localhost:3000`, {stdio: 'inherit'});
