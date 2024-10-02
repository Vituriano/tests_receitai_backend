const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

describe('Recipe Feed API', () => {
  it('should fetch recipe feed with valid properties', async () => {
    const { data, error } = await supabase
      .from('recipe_feed')  // Nome da view
      .select('*');

    expect(error).toBeNull(); // Verifica se não houve erro na consulta
    expect(data).toBeDefined(); // Verifica se os dados foram definidos
    expect(data.length).toBeGreaterThan(0); // Verifica se retornou alguma receita

    // Validação dos valores retornados
    data.forEach(recipe => {
      expect(recipe).toHaveProperty('recipe_id'); // Verifica se recipe_id existe
      expect(recipe).toHaveProperty('title'); // Verifica se title existe
      expect(recipe).toHaveProperty('picture'); // Verifica se picture existe
      expect(recipe).toHaveProperty('published_date'); // Verifica se published_date existe
      expect(recipe).toHaveProperty('rating'); // Verifica se rating existe
      expect(recipe).toHaveProperty('published_by'); // Verifica se published_by existe
      expect(recipe).toHaveProperty('published_by_profile_picture'); // Verifica se published_by_profile_picture existe
      expect(recipe).toHaveProperty('preparation_time'); // Verifica se preparation_time existe
      expect(recipe).toHaveProperty('difficulty'); // Verifica se difficulty existe
      expect(recipe).toHaveProperty('ingredient_types'); // Verifica se ingredient_types existe
      expect(recipe).toHaveProperty('categories'); // Verifica se categories existe
    });
  });
});
