import React, { useState, useEffect } from "react";
import { BrowserRouter,Switch,Link, Route } from "react-router-dom";
import Loading from "./Loading";
import Tours from "./Tours";
import Footer from "./Footer"
import Donate from "./Donate"
import Discounts from "./Discounts";
import Contacts from "./Contacts";
const url = "https://phase-2-tembea-api.herokuapp.com/tours";
function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>We are  our regret tours didn't match your interest.Try next time.</h2>
          <button className="btn" onClick={() => fetchTours()}>
            reload
          </button>
        </div>
      </main>
    );
  }
  return (

    <div>
      <BrowserRouter>
          <div className="navbar">
            <h2>Tembea <span>Kenya</span> </h2>
             <div>
             <nav>
                <li><Link to="/discounts">Discouts and Offers</Link></li>
                <li><Link to="/donate">Donate</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
              </nav>
             </div>
          </div>
       <Switch>
        <Route path="/discounts">
          <Discounts />
        </Route>
        <Route path="/donate">
          <Donate />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
       </Switch>
      </BrowserRouter>
       <main>
        <Tours tours={tours} removeTour={removeTour} />
        <Footer />
       </main>
    </div>
  );
}

export default App;
