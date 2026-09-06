const fs = require('fs');
let code = fs.readFileSync('src/lib/pdf.ts', 'utf8');

code = code.replace(/import { db } from "\.\.\/db";/, `import { vehiclesRef } from "../db";
import { getDocs } from "firebase/firestore";`);

code = code.replace(/const vehicles = await db\.vehicles\.toArray\(\);/, `const snapshot = await getDocs(vehiclesRef);
  const vehicles = snapshot.docs.map(d => d.data());`);

fs.writeFileSync('src/lib/pdf.ts', code);
