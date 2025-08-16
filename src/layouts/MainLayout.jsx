import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Home, Users, BookOpen, Calendar, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const SidebarLink = ({ to, icon, children }) => (
  <Link to={to} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
    {icon}
    <span className="ml-3">{children}</span>
  </Link>
);

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white-puro shadow-md">
          <Link to="/dashboard" className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-azul-sereno">CateqApp</span>
          </Link>
          <ul className="space-y-2">
            <li><SidebarLink to="/dashboard" icon={<Home size={20} />}>Dashboard</SidebarLink></li>
            <li><SidebarLink to="/catequistas" icon={<Users size={20} />}>Catequistas</SidebarLink></li>
            <li><SidebarLink to="/turmas" icon={<BookOpen size={20} />}>Turmas</SidebarLink></li>
            {/* Adicione mais links */}
          </ul>
          <div className="absolute bottom-4">
             <button onClick={handleLogout} className="flex items-center p-2 text-base font-normal text-vermelho-paixao rounded-lg hover:bg-gray-100 w-full">
                <LogOut size={20} />
                <span className="ml-3">Sair</span>
             </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
