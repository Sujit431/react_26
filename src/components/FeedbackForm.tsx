import React, { useState } from 'react';
import { submitFeedback } from '../actions/feedback';
import type { FeedbackResult } from '../actions/feedback';

interface FeedbackFormProps {
  rating: string;
  comment: string;
  setRating: (val: string) => void;
  setComment: (val: string) => void;
  onSuccess: (result: FeedbackResult) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ rating, comment, setRating, setComment, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment) return;

    setIsSubmitting(true);
    try {
      const result = await submitFeedback(Number(rating), comment);
      onSuccess(result);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5)</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            placeholder="Tell us what you think..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
