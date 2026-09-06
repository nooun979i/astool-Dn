const fs = require('fs');
let code = fs.readFileSync('src/pages/AddVehicle.tsx', 'utf8');

code = code.replace(/import { db } from "\.\.\/db";/, `import { vehiclesRef, rulesRef, recordsRef } from "../db";
import { doc, setDoc, getDocs, query, where } from "firebase/firestore";`);

code = code.replace(/const existing = await db\.vehicles[\s\S]*?\.first\(\);/, `const existingQuery = query(vehiclesRef, where('licensePlate', '==', formData.licensePlate));
      const existingDocs = await getDocs(existingQuery);
      const existing = !existingDocs.empty;`);

code = code.replace(/await db\.vehicles\.add\(\{/g, `await setDoc(doc(vehiclesRef, vehicleId), {`);
code = code.replace(/await db\.rules\.add\(\{[\s\S]*?id: crypto\.randomUUID\(\),/g, `const ruleId = crypto.randomUUID();
      await setDoc(doc(rulesRef, ruleId), {
        id: ruleId,`);
code = code.replace(/await db\.records\.add\(\{[\s\S]*?id: crypto\.randomUUID\(\),/g, `const recId = crypto.randomUUID();
        await setDoc(doc(recordsRef, recId), {
          id: recId,`);

fs.writeFileSync('src/pages/AddVehicle.tsx', code);
