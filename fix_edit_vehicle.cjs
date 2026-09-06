const fs = require('fs');
let code = fs.readFileSync('src/pages/EditVehicle.tsx', 'utf8');

code = code.replace(/import { db } from "\.\.\/db";/, `import { vehiclesRef, rulesRef } from "../db";
import { getDoc, getDocs, doc, query, where, updateDoc } from "firebase/firestore";`);

code = code.replace(/const vehicle = await db\.vehicles\.get\(id\);/, `const vehicleSnap = await getDoc(doc(vehiclesRef, id));
      const vehicle = vehicleSnap.data();`);
      
code = code.replace(/const rule = await db\.rules\.where\(\{ vehicleId: id \}\)\.first\(\);/, `const ruleDocs = await getDocs(query(rulesRef, where("vehicleId", "==", id)));
      const rule = ruleDocs.docs[0]?.data();`);

code = code.replace(/const existing = await db\.vehicles[\s\S]*?\.first\(\);/, `const existingQuery = query(vehiclesRef, where('licensePlate', '==', formData.licensePlate));
      const existingDocs = await getDocs(existingQuery);
      const existing = existingDocs.docs.find(d => d.data().id !== id);`);

code = code.replace(/await db\.vehicles\.update\(id, \{/g, `await updateDoc(doc(vehiclesRef, id), {`);
code = code.replace(/await db\.rules\.where\(\{ vehicleId: id \}\)\.modify\(\{/g, `const rulesToUpdate = await getDocs(query(rulesRef, where("vehicleId", "==", id)));
      if (!rulesToUpdate.empty) {
        await updateDoc(rulesToUpdate.docs[0].ref, {`);
code = code.replace(/\}\);/, `});
      }`);

fs.writeFileSync('src/pages/EditVehicle.tsx', code);
