const fs = require('fs');
const path = require('path');

// Read all ministry data files
const ministriesDir = './ministries';
const ministryFiles = fs.readdirSync(ministriesDir)
  .filter(file => file.endsWith('.json') && file !== '_summary.json');

console.log(`Converting ${ministryFiles.length} ministry JSON files to TypeScript modules`);

// Create a data directory for the TypeScript modules
const dataDir = '../src/data/ministries';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Convert each JSON file to a TypeScript module
ministryFiles.forEach(file => {
  const slug = file.replace('.json', '');
  const ministryData = JSON.parse(fs.readFileSync(path.join(ministriesDir, file), 'utf8'));
  
  console.log(`Converting ${file} to TypeScript module`);

  const moduleContent = `// Auto-generated from ${file}
export const ministryData = ${JSON.stringify(ministryData, null, 2)} as const;

export default ministryData;
`;

  // Write the TypeScript module file
  const modulePath = path.join(dataDir, `${slug}.ts`);
  
  try {
    fs.writeFileSync(modulePath, moduleContent);
    console.log(`✅ Created ${modulePath}`);
  } catch (error) {
    console.error(`❌ Error writing ${modulePath}:`, error.message);
  }
});

console.log('\n🎉 TypeScript module conversion complete!'); 