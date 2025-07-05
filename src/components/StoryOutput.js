import { useEffect, useRef } from 'react';


const StoryOutput = ({ story, isLoading, error }) => {
  const storyRef = useRef(null);

  useEffect(() => {
    if (story && storyRef.current) {
      storyRef.current.scrollTop = 0;
    }
  }, [story]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
  };

  if (isLoading) {
    return (
      <div className="story-output loading">
        <div className="spinner"></div>
        <p>Gemini is crafting your story...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-output error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="story-output">
      {story ? (
        <>
          <div className="story-tools">
            <button onClick={copyToClipboard}>
              <i className="icon-copy"></i> Copy
            </button>
          </div>
          <div ref={storyRef} className="story-content">
            {story.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </>
      ) : (
        <div className="placeholder">
          <h3>Your Story Awaits</h3>
          <p>Enter a prompt and let Gemini create your masterpiece</p>
        </div>
      )}
    </div>
  );
};

export default StoryOutput;