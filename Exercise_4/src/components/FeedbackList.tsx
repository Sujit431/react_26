import React from 'react';
import type { FeedbackResult } from '../actions/feedback';

interface FeedbackListProps {
  lastResult: FeedbackResult | null;
  liveRating: string;
  liveComment: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ lastResult, liveRating, liveComment }) => {
  // If we have a final result, show the Success card
  if (lastResult) {
    return (
      <div className="result-card success">
        <h3 style={{ marginTop: 0, color: '#1d4ed8' }}>✓ Submission Successful</h3>
        <div className="result-item">
          <span className="result-label">Final Rating:</span> {lastResult.rating} / 5
        </div>
        <div className="result-item">
          <span className="result-label">Final Comment:</span>
          <blockquote style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#4b5563' }}>
            "{lastResult.comment}"
          </blockquote>
        </div>
        <div className="result-item" style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '1rem' }}>
          Submitted at {lastResult.timestamp}
        </div>
      </div>
    );
  }

  // If the user is currently typing, show the Live Preview card
  if (liveRating || liveComment) {
    return (
      <div className="result-card preview">
        <h3 style={{ marginTop: 0, color: '#64748b', fontSize: '1.1rem' }}>Live Preview</h3>
        <div className="result-item">
          <span className="result-label" style={{ color: '#64748b' }}>Rating:</span> {liveRating || '...'}
        </div>
        <div className="result-item">
          <span className="result-label" style={{ color: '#64748b' }}>Comment:</span>
          <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', wordBreak: 'break-word' }}>
            {liveComment || 'Start typing a comment...'}
          </p>
        </div>
      </div>
    );
  }

  // Otherwise, don't show anything
  return null;
};

export default FeedbackList;
