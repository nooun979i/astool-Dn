const fs = require('fs');
let settings = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

settings = settings.replace(/import \{ Button \} from "\.\.\/components\/ui\/button";/, 'import { Button } from "../components/ui/button";\nimport { useCollectionData } from "react-firebase-hooks/firestore";\nimport { collection, setDoc, doc } from "firebase/firestore";\nimport { auth } from "../firebase";\nimport { signOut } from "firebase/auth";\nimport { Users, Plus, LogOut } from "lucide-react";');

settings = settings.replace(/const \[companyName, setCompanyName\] = useState\(localStorage\.getItem\('companyName'\) \|\| 'أسطول الشركة'\);/, `const [companyName, setCompanyName] = useState(localStorage.getItem('companyName') || 'أسطول الشركة');
  const [newSubEmail, setNewSubEmail] = useState("");
  const allowedUsersRef = collection(db, "allowedUsers");
  const [allowedUsers] = useCollectionData(allowedUsersRef);

  const handleAddSubordinate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail) return;
    try {
      await setDoc(doc(db, "allowedUsers", newSubEmail.toLowerCase()), {
        email: newSubEmail.toLowerCase(),
        role: "subordinate",
        createdAt: Date.now()
      });
      setNewSubEmail("");
      alert("تمت دعوة المستخدم بنجاح. يمكنه الآن التسجيل في النظام.");
    } catch(err) {
      alert("حدث خطأ أثناء إضافة المستخدم.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
`);

settings = settings.replace(/<Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50">\n\s*<Shield className="w-4 h-4" \/>\n\s*الأمان والخصوصية\n\s*<\/Button>/, `<Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Shield className="w-4 h-4" />
            الأمان والخصوصية
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Users className="w-4 h-4" />
            المستخدمين (التابعين)
          </Button>
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 mt-8">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>`);

const usersCard = `
          <Card className="border-0 shadow-sm mt-6 border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle>المستخدمين والتابعين</CardTitle>
              <CardDescription>إضافة مستخدمين آخرين لمساعدتك في إدارة الأسطول</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddSubordinate} className="flex gap-3 items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="subEmail">البريد الإلكتروني للتابع</Label>
                  <Input 
                    id="subEmail" 
                    type="email" 
                    placeholder="user@example.com" 
                    dir="ltr"
                    value={newSubEmail}
                    onChange={e => setNewSubEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-10">
                  <Plus className="w-4 h-4" />
                  إضافة
                </Button>
              </form>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">البريد الإلكتروني</th>
                      <th className="px-4 py-3 font-medium">الدور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {allowedUsers?.map(u => (
                      <tr key={u.email} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-gray-900" dir="ltr">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={\`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium \${u.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}\`}>
                            {u.role === 'admin' ? 'مدير' : 'تابع'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!allowedUsers || allowedUsers.length === 0) && (
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                          لا يوجد مستخدمين مضافين
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
`;

settings = settings.replace(/<Card className="border-0 shadow-sm">\n\s*<CardHeader>\n\s*<CardTitle>إدارة البيانات<\/CardTitle>/, usersCard + '\n          <Card className="border-0 shadow-sm">\n            <CardHeader>\n              <CardTitle>إدارة البيانات</CardTitle>');

// Remove Excel import from Settings Data Management
settings = settings.replace(/<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">[\s\S]*?<\/div>\s*<div className="pt-4 border-t border-gray-100 mt-4">/, '<div className="pt-4 border-t border-gray-100 mt-4">');

fs.writeFileSync('src/pages/Settings.tsx', settings);

