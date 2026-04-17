export interface FeedbackResult {
  rating: number;
  comment: string;
  timestamp: string;
}

export const submitFeedback = async (rating: number, comment: string): Promise<FeedbackResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    rating,
    comment,
    timestamp: new Date().toLocaleTimeString(),
  };
};
