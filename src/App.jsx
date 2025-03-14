import { useState } from 'react';
import './App.css';

function App() {
  // State to store the list of recipes
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Spaghetti Bolognese', ingredients: 'Pasta, Meat, Tomato Sauce' },
    { id: 2, title: 'Chicken Salad', ingredients: 'Chicken, Lettuce, Tomatoes, Dressing' },
    { id: 3, title: 'Pancakes', ingredients: 'Flour, Eggs, Milk, Butter' },
  ]);

  // State to store the new recipe form input values
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newRecipe.title && newRecipe.ingredients) {
      setRecipes([
        ...recipes,
        { id: recipes.length + 1, title: newRecipe.title, ingredients: newRecipe.ingredients }
      ]);
      setNewRecipe({ title: '', ingredients: '' }); // Reset form
    }
  };

  // Handle deleting a recipe
  const handleDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // Handle editing a recipe
  const handleEdit = (id) => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    setNewRecipe({
      title: recipeToEdit.title,
      ingredients: recipeToEdit.ingredients
    });
    handleDelete(id);  // Remove the current recipe from the list for editing
  };

  return (
    <div>
      <header>
        <h1>Recipe Planner 🍽️</h1>
      </header>

      <main>
        <p>Welcome! Start adding and managing your favorite recipes.</p>

        {/* Recipe Form */}
        <section>
          <h2>Add or Edit a Recipe</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="title">Recipe Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newRecipe.title}
                onChange={handleInputChange}
                placeholder="Enter recipe title"
                required
              />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients:</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={newRecipe.ingredients}
                onChange={handleInputChange}
                placeholder="Enter ingredients"
                required
              />
            </div>
            <button type="submit">{newRecipe.title ? 'Edit Recipe' : 'Add Recipe'}</button>
          </form>
        </section>

        {/* Recipe List */}
        <section>
          <h2>Recipe List</h2>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>Ingredients: {recipe.ingredients}</p>
                <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2024 Recipe Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
