const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

describe('User Signup and Login', () => {
  let userEmail = 'basi@example.com';
  let userPassword = 'TestUser123!';
  let userId;

  it('should successfully sign up a new user', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });

    // Verifica se não houve erro ao criar o usuário
    expect(error).toBeNull();
    expect(data.user).toBeTruthy(); // Verifica se o objeto de usuário foi retornado
    userId = data.user.id; // Armazena o ID do usuário criado
  });

  it('should successfully log in the created user', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    // Verifica se o login foi bem-sucedido
    expect(error).toBeNull();
    expect(data.session).toBeTruthy(); // Verifica se a sessão foi criada
    expect(data.session.access_token).toBeDefined(); // Verifica se o token de acesso foi gerado
  });

  afterAll(async () => {
    // Limpa o banco de dados excluindo o usuário criado no teste
    const { error } = await supabase
      .from('profile')
      .delete()
      .eq('id', userId); // Deleta o perfil correspondente ao usuário criado

    if (error) throw error;
  });
});
