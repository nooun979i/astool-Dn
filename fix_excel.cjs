const fs = require('fs');
let code = fs.readFileSync('src/lib/excel.ts', 'utf8');

code = code.replace(/import { db } from "\.\.\/db";/, `import { vehiclesRef, rulesRef } from "../db";
import { getDocs, setDoc, doc, query, where } from "firebase/firestore";`);

code = code.replace(/const vehicles = await db\.vehicles\.toArray\(\);/, `const snapshot = await getDocs(vehiclesRef);
  const vehicles = snapshot.docs.map(d => d.data());`);

code = code.replace(/const exists = await db\.vehicles\.where\('licensePlate'\)\.equals\(plate\)\.first\(\);/, `const existingQuery = query(vehiclesRef, where('licensePlate', '==', plate));
          const existingDocs = await getDocs(existingQuery);
          const exists = !existingDocs.empty;`);

code = code.replace(/await db\.vehicles\.add\(\{/g, `await setDoc(doc(vehiclesRef, vehicleId), {`);
code = code.replace(/await db\.rules\.add\(\{[\s\S]*?id: crypto\.randomUUID\(\),/g, `const ruleId = crypto.randomUUID();
          await setDoc(doc(rulesRef, ruleId), {
            id: ruleId,`);

fs.writeFileSync('src/lib/excel.ts', code);
