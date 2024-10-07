const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

describe('get_user_recipe_ratings function', () => {
  it('should return recipe ratings for a user with existing ratings', async () => {
    const _user_id = 'bad32d0f-2306-49f0-aee7-63f689149004'; // ID do usuário
    
    const { data, error } = await supabase
      .rpc('get_user_recipe_ratings', { _user_id });

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0); // Verifica se há avaliações retornadas

    // Verifica se os campos de retorno estão corretos
    data.forEach((rating) => {
      expect(rating).toHaveProperty('rating_id');
      expect(rating).toHaveProperty('recipe_id');
      expect(rating).toHaveProperty('rating');
      expect(rating).toHaveProperty('review');
      expect(rating).toHaveProperty('recipe_name');
      expect(rating).toHaveProperty('recipe_picture');
      expect(rating).toHaveProperty('reviewer_name');
      expect(rating).toHaveProperty('reviewer_profile_picture');
      expect(rating).toHaveProperty('rating_date');
    });
  });
});
