import { useState } from 'react';
import './index.css';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import type { FeedbackResult } from './actions/feedback';

function App() {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [submission, setSubmission] = useState<FeedbackResult | null>(null);

  const handleSuccess = (result: FeedbackResult) => {
    setSubmission(result);
    // Clear the input fields upon success
    setRating('');
    setComment('');
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#6b7280', fontWeight: 500, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Mini Project: Smart Feedback App
        </h2>
      </header>
      
      <main>
        <FeedbackForm 
          rating={rating}
          comment={comment}
          setRating={setRating}
          setComment={setComment}
          onSuccess={handleSuccess} 
        />
        <FeedbackList 
          lastResult={submission} 
          liveRating={rating}
          liveComment={comment}
        />
      </main>

      <footer style={{ marginTop: '3rem', fontSize: '0.85rem', color: '#9ca3af' }}>
        React Day 4 Assignment
      </footer>
    </div>
  );
}

export default App;
