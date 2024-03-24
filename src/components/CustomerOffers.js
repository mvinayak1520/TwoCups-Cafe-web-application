import React, { useState, useEffect } from 'react';
import { getDatabase, ref as databaseRef, onValue } from 'firebase/database';
import { FaStar } from 'react-icons/fa';
import { animated, useSpring } from 'react-spring';

const AnimatedCard = animated.div;

function CustomerOffers() {

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const [offers, setOffers] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    // Load offers from Firebase Realtime Database
    const offersRef = databaseRef(db, 'CafeApplication/products');
    onValue(offersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const offersArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        setOffers(offersArray);
      } else {
        setOffers([]);
      }
    });
  }, [db]);

  return (
    <>
      <div className="container mt-5" style={{ marginBottom: '30%' }}>
      <div className="row">
        {offers.map((offer) => (
          <AnimatedCard key={offer.id} style={fadeIn} className="col-md-4 mb-3">
            <div className="card card-offer mb-4">
              <img src={offer.imageUrl} height={300} className="card-img-top" alt={offer.title} />
              <div className="card-body">
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.description}</p>
                <div className="rating">
                  {[...Array(offer.rating)].map((_, index) => (
                    <FaStar key={index} className="star" />
                  ))}
                </div>
                <p className="card-text text-success">Discount: {offer.offer}%</p>
              </div>
            </div>
            <hr></hr>
          </AnimatedCard>
        ))}
      </div>
    </div>
    </>
  );
}


export default CustomerOffers
