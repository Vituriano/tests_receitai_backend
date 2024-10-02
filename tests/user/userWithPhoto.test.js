const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

describe('Users With Photos API', () => {
  it('should fetch users with photos with valid properties or be empty', async () => {
    const { data, error } = await supabase
      .from('users_with_photos')  // Nome da view
      .select('*');

    expect(error).toBeNull(); // Verifica se não houve erro na consulta
    expect(data).toBeDefined(); // Verifica se os dados foram definidos
    
    // Verifica se a quantidade de dados é 0 ou maior que 0
    expect(data.length).toBeGreaterThanOrEqual(0); // Verifica se retornou 0 ou mais usuários

    // Se houver dados, valida os valores retornados
    if (data.length > 0) {
      data.forEach(user => {
        expect(user).toHaveProperty('user_id'); // Verifica se user_id existe
        expect(user).toHaveProperty('display_name'); // Verifica se display_name existe
        expect(user).toHaveProperty('email'); // Verifica se email existe
        expect(user).toHaveProperty('profile_picture'); // Verifica se profile_picture existe
        expect(user).toHaveProperty('created_at'); // Verifica se created_at existe
      });
    }
  });
});
