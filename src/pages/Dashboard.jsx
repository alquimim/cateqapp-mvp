import { useAuth } from '../contexts/AuthProvider';

// Crie componentes separados para cada Dashboard se a lógica for muito complexa
function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cinza-grafite">Dashboard do Coordenador</h1>
      <p className="mt-2 text-gray-600">Visão geral da paróquia. Aqui estarão os gráficos e estatísticas.</p>
      {/* Cards para: Total de Catequistas, Total de Alunos, Próximos Eventos, Aniversariantes */}
    </div>
  );
}

function CatequistaDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cinza-grafite">Meu Dashboard</h1>
      <p className="mt-2 text-gray-600">Suas turmas e próximos encontros.</p>
      {/* Cards para: Minhas Turmas, Próximo Encontro, Aniversariantes da minha turma */}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <div>Carregando...</div>;

  return user.role === 'Admin' ? <AdminDashboard /> : <CatequistaDashboard />;
}
