import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, onValue } from 'firebase/database';
import Loader from './Loader';

const FeedbackViewer = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Load feedback from Firebase Realtime Database
    const db = getDatabase();
    const feedbacksRef = databaseRef(db, 'CafeApplication/feedbacks');

    onValue(feedbacksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbacksArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        setFeedbackList(feedbacksArray);
      } else {
        setFeedbackList([]);
      }
    });
  }, []);

  return (
    <>
    <Loader></Loader>
    <div class="alert alert-secondary" role="alert">
    Feedback Viewer
</div>
    <div className="container mt-5" style={{marginBottom:"30%"}}>
      
      {feedbackList.length === 0 ? (
        <p className="text-center">No feedback available.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Rating</th>
              <th scope="col">Feedback</th>
              <th scope="col">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.map((feedback) => (
              <tr key={feedback.id}>
               
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.feedback}</td>
                <td>{new Date(feedback.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  
  );
};

export default FeedbackViewer;
