import React, { useState, useEffect } from "react";
import { BrowserRouter,Switch,Link, Route } from "react-router-dom";
import Loading from "./Loading";
import Tours from "./Tours";
import Header from "./Header";
const url = "http://localhost:3000/tours";

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
      console.log(error);
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
        <nav>
          <li><Link to="/tours">Our Tours</Link></li>
        </nav>
       <Switch>
        <Route path="/tours">
          <Tours />
        </Route>
       </Switch>
      </BrowserRouter>
       <Header />
       <main>
        <Tours tours={tours} removeTour={removeTour} />
       </main>
    </div>
   
  );
}

export default App;
