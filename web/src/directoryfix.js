const fs = require('fs');
const path = require('path');

const directory = 'src'; // Change to your source directory

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Example: Replace incorrect imports (you can customize this logic)
  content = content.replace(
    /from '\.\.\/components/g,
    "from '../src/components"
  );

  fs.writeFileSync(filePath, content);
}

// Recursively traverse the directory
function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      fixImports(fullPath);
    }
  });
}

traverseDirectory(directory);
