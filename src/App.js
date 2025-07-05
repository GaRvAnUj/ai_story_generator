import { useState } from 'react';
import Header from './components/Header';
import StoryForm from './components/StoryForm';
import StoryOutput from './components/StoryOutput';
import './App.css';

function App() {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateStory = async (formData) => {
    setIsLoading(true);
    setError(null);
    setStory('');

    try {
      const response = await fetch('http://localhost:5000/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story');
      }

      setStory(data.story);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <StoryForm onSubmit={generateStory} isLoading={isLoading} />
        <StoryOutput story={story} isLoading={isLoading} error={error} />
      </main>
      <footer>
        <p>Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;