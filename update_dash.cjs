const fs = require('fs');

let dash = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');
dash = dash.replace(/import \{ exportToExcel, importFromExcel \} from "\.\.\/lib\/excel";/, 'import { exportToExcel } from "../lib/excel";');
dash = dash.replace(/const fileInputRef = useRef<HTMLInputElement>\(null\);/, '');
dash = dash.replace(/const handleFileChange = async[\s\S]*?if \(fileInputRef\.current\) fileInputRef\.current\.value = "";\n  \};\n/, '');
dash = dash.replace(/<input\s*type="file"[\s\S]*?\/>/, '');
dash = dash.replace(/<Button onClick=\{\(\) => fileInputRef\.current\?\.click\(\)\} className="bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl flex items-center gap-2">[\s\S]*?<\/Button>/, '');
dash = dash.replace(/استيراد بيانات أسطولك من ملفات Excel، أو /, '');
fs.writeFileSync('src/pages/Dashboard.tsx', dash);

let veh = fs.readFileSync('src/pages/Vehicles.tsx', 'utf8');
veh = veh.replace(/import \{ exportToExcel, importFromExcel \} from "\.\.\/lib\/excel";/, 'import { exportToExcel } from "../lib/excel";');
veh = veh.replace(/const fileInputRef = useRef<HTMLInputElement>\(null\);/, '');
veh = veh.replace(/const handleImportClick = \(\) => \{\n    fileInputRef\.current\?\.click\(\);\n  \};/, '');
veh = veh.replace(/const handleFileChange = async[\s\S]*?if \(fileInputRef\.current\) fileInputRef\.current\.value = "";\n  \};\n/, '');
veh = veh.replace(/<input\s*type="file"[\s\S]*?\/>/, '');
veh = veh.replace(/<Button variant="outline" onClick=\{handleImportClick\} className="gap-2 hidden md:flex rounded-lg">[\s\S]*?<\/Button>/, '');
fs.writeFileSync('src/pages/Vehicles.tsx', veh);

