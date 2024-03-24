import React, { useState } from 'react';
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';

const GiveFeedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !feedback || rating === 0) {
      setErrorMessage('All fields are required.');
      return;
    }

    const newFeedback = {
      name,
      email,
      feedback,
      rating,
      timestamp: new Date().toISOString(),
    };


    const db = getDatabase();
    
    try {
      // Push the feedback to the 'feedbacks' node
      await push(databaseRef(db, 'CafeApplication/feedbacks'), newFeedback);

      // Reset form fields and error message
      setName('');
      setEmail('');
      setFeedback('');
      setRating(0);
      setErrorMessage('');
      toast.success('Feedback submitted successfully!', {
    position: 'top-right',
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

    } catch (error) {
        toast.error('Error submitting feedback. Please try again.', {
    position: 'top-right',
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
      console.error('Error submitting feedback:', error.message);
      setErrorMessage('Error submitting feedback. Please try again.');
    }
  };

  return (
    <>
    <div class="alert alert-secondary" role="alert">
    Give Feedback
</div>
    <div className="container mt-5 shadow-sm p-3 mb-5 bg-white rounded" >
      
      <form onSubmit={handleSubmit} style={{marginBottom:"30%"}}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            className="form-control"
            id="feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            className="form-control"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="0">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
    </>
  );
};

export default GiveFeedback;
