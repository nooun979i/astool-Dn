const fs = require('fs');
let code = fs.readFileSync('src/pages/EditVehicle.tsx', 'utf8');

code = code.replace(/const existingRule = await db\.rules\.where\(\{ vehicleId: id \}\)\.first\(\);/, `const existingRuleDocs = await getDocs(query(rulesRef, where("vehicleId", "==", id)));
      const existingRule = existingRuleDocs.docs[0]?.data();`);

code = code.replace(/await db\.rules\.update\(existingRule\.id, \{/g, `await updateDoc(doc(rulesRef, existingRule.id), {`);

code = code.replace(/await db\.rules\.add\(\{[\s\S]*?id: crypto\.randomUUID\(\),/g, `const ruleId = crypto.randomUUID();
        await setDoc(doc(rulesRef, ruleId), {
          id: ruleId,`);

fs.writeFileSync('src/pages/EditVehicle.tsx', code);
