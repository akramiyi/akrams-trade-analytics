'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Briefcase, PieChart, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/trading-analytics', label: 'Trading Analytics', icon: BarChart2 },
  { href: '/etf-analytics', label: 'ETF Analytics', icon: Briefcase },
  { href: '/mutual-fund-analytics', label: 'Mutual Fund Analytics', icon: PieChart },
  { href: '/journal', label: 'Journal', icon: BookOpen },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
      <nav>
        <ul>
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href} className="mb-2">
              <Link href={href} className={`flex items-center p-2 rounded-md ${pathname === href ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                  <Icon className="mr-3" />
                  {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {user && (
        <button onClick={handleLogout} className="flex items-center p-2 rounded-md hover:bg-gray-700 w-full mt-4">
          <LogOut className="mr-3" />
          Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
