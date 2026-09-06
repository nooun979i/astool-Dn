const fs = require('fs');

let dash = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

if (!dash.includes('QRCodeSVG')) {
    dash = dash.replace(/import \{ Car, /, 'import { QRCodeSVG } from "qrcode.react";\nimport { useState } from "react";\nimport { Car, QrCode, X, ');
    dash = dash.replace(/export function Dashboard\(\) \{/, 'export function Dashboard() {\n  const [showQR, setShowQR] = useState(false);\n  const qrUrl = window.location.origin + "/submit-vehicle";');
    
    // Add button next to "تحميل بيانات تجريبية" or somewhere in header
    // Let's add it near "إدارة وتصدير البيانات"
    dash = dash.replace(/<Button onClick=\{handleExportExcel\}/, '<Button onClick={() => setShowQR(true)} className="bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-xl flex items-center gap-2"><QrCode className="w-4 h-4" /> باركود الإضافة</Button>\n            <Button onClick={handleExportExcel}');
    
    // Add modal at the end
    const modalCode = `
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-2">باركود إضافة سيارة</h3>
            <p className="text-sm text-gray-500 mb-6">امسح الباركود بهاتفك لإضافة سيارة جديدة مباشرة للنظام دون الحاجة لتسجيل الدخول.</p>
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-center mb-4">
              <QRCodeSVG value={qrUrl} size={200} />
            </div>
            <a href={qrUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-medium hover:underline break-all">
              {qrUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
`;
    dash = dash.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/, `</div>\n      </div>\n${modalCode}`);
    fs.writeFileSync('src/pages/Dashboard.tsx', dash);
}

