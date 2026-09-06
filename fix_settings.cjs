const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

code = code.replace(/import { db } from "\.\.\/db";/, `import { vehiclesRef, rulesRef, recordsRef } from "../db";
import { getDocs, deleteDoc } from "firebase/firestore";`);

code = code.replace(/await db\.vehicles\.clear\(\);/, `const vDocs = await getDocs(vehiclesRef); vDocs.forEach(d => deleteDoc(d.ref));`);
code = code.replace(/await db\.records\.clear\(\);/, `const rDocs = await getDocs(recordsRef); rDocs.forEach(d => deleteDoc(d.ref));`);
code = code.replace(/await db\.rules\.clear\(\);/, `const ruDocs = await getDocs(rulesRef); ruDocs.forEach(d => deleteDoc(d.ref));`);

fs.writeFileSync('src/pages/Settings.tsx', code);
