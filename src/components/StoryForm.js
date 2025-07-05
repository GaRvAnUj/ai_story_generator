import { useState } from 'react';


const StoryForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    genre: 'fantasy',
    length: 'medium'
  });

  const genres = [
    'fantasy', 'science fiction', 'mystery',
    'adventure', 'horror', 'romance', 'historical'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.prompt.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="story-form">
      <div className="form-group">
        <label>Your Story Idea</label>
        <textarea
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          placeholder="A young astronaut discovers a secret civilization on Mars..."
          rows="3"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Genre</label>
          <select 
            name="genre" 
            value={formData.genre} 
            onChange={handleChange}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Length</label>
          <div className="length-options">
            {['short', 'medium', 'long'].map(option => (
              <label key={option} className={formData.length === option ? 'active' : ''}>
                <input
                  type="radio"
                  name="length"
                  value={option}
                  checked={formData.length === option}
                  onChange={handleChange}
                  hidden
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span> Generating...
          </>
        ) : (
          'Create Story'
        )}
      </button>
    </form>
  );
};

export default StoryForm;