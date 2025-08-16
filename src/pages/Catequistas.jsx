import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthProvider';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

export default function Catequistas() {
  const { user } = useAuth();
  const [catequistas, setCatequistas] = useState([]);

  useEffect(() => {
    async function fetchCatequistas() {
      const { data, error } = await supabase.from('catequistas').select('*');
      if (!error) setCatequistas(data);
    }
    fetchCatequistas();
  }, []);
  
  const isAdmin = user?.role === 'Admin';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cinza-grafite">Gestão de Catequistas</h1>
        {isAdmin && (
          <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white-puro bg-azul-sereno rounded-lg shadow-md hover:bg-blue-600">
            <UserPlus size={20} />
            Novo Catequista
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto bg-white-puro rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Contato</th>
              <th scope="col" className="px-6 py-3">Email</th>
              {isAdmin && <th scope="col" className="px-6 py-3 text-right">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {catequistas.map((c) => (
              <tr key={c.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                <td className="px-6 py-4">{c.contact}</td>
                <td className="px-6 py-4">{c.email}</td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right flex justify-end gap-4">
                    <button className="text-azul-sereno hover:text-blue-700"><Edit size={18} /></button>
                    <button className="text-vermelho-paixao hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
