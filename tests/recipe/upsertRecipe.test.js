const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

describe('Upsert Recipe RPC', () => {
  it('should return recipe ID when adding a new recipe', async () => {
    const _categories = ['category1', 'category2']; // Exemplo de categorias
    const _delete_recipe = false; // Não exclui
    const _description = 'Delicious recipe description'; // Exemplo de descrição
    const _difficulty = 'Easy'; // Exemplo de dificuldade
    const _name = 'Test Recipe'; // Exemplo de nome
    const _preparation = 'Prepare the ingredients and mix well.'; // Exemplo de preparação
    const _preparation_time = '30 minutes'; // Exemplo de tempo de preparo
    const _recipe_id = null; // ID da receita, pode ser nulo para um novo registro
    const _recipe_picture = 'http://example.com/recipe.jpg'; // URL da imagem da receita
    const _user_id = 'bad32d0f-2306-49f0-aee7-63f689149004'; // ID do usuário

    const { data, error } = await supabase
      .rpc('upsert_recipe', {
        _categories,
        _delete_recipe,
        _description,
        _difficulty,
        _name,
        _preparation,
        _preparation_time,
        _recipe_id,
        _recipe_picture,
        _user_id,
      });

    expect(error).toBeNull(); // Verifica se não houve erro na chamada da função
    expect(data).toBeDefined(); // Verifica se os dados foram definidos
    expect(data).not.toBeNull(); // Verifica se retorna o id
  });

  it('should return nothing when editing an existing recipe', async () => {
    const _categories = ['category1', 'category2']; // Exemplo de categorias
    const _delete_recipe = false; // Não exclui
    const _description = 'Updated recipe description'; // Exemplo de descrição atualizada
    const _difficulty = 'Medium'; // Exemplo de dificuldade atualizada
    const _name = 'Updated Recipe'; // Exemplo de nome atualizado
    const _preparation = 'Updated preparation steps.'; // Exemplo de preparação atualizada
    const _preparation_time = '45 minutes'; // Exemplo de tempo de preparo atualizado
    const _recipe_id = '1'; // ID da receita existente
    const _recipe_picture = 'http://example.com/updated_recipe.jpg'; // URL da imagem da receita
    const _user_id = 'e52bbed7-5989-41b2-871d-68dfaf12e6fb'; // ID do usuário

    const { data, error } = await supabase
      .rpc('upsert_recipe', {
        _categories,
        _delete_recipe,
        _description,
        _difficulty,
        _name,
        _preparation,
        _preparation_time,
        _recipe_id,
        _recipe_picture,
        _user_id,
      });

    expect(error).toBeNull(); // Verifica se não houve erro na chamada da função
  });

  it('should delete recipe and return null when delete_recipe is true', async () => {
    const _delete_recipe = true; // Exclui a receita
    const _recipe_id = '1'; // ID da receita a ser excluída
    const _user_id = 'e52bbed7-5989-41b2-871d-68dfaf12e6fb'; // ID do usuário

    const { data, error } = await supabase
      .rpc('upsert_recipe', {
        _delete_recipe,
        _recipe_id,
        _user_id,
        _categories: null, // Não é necessário
        _description: null, // Não é necessário
        _difficulty: null, // Não é necessário
        _name: null, // Não é necessário
        _preparation: null, // Não é necessário
        _preparation_time: null, // Não é necessário
        _recipe_picture: null, // Não é necessário
      });

    expect(error).toBeNull(); // Verifica se não houve erro na chamada da função
    expect(data).toBeNull(); // Verifica se o retorno é null após a exclusão
  });
});
