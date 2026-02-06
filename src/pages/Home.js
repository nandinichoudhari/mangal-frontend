import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h2>Authentic Homemade Maharashtrian Food</h2>
          <p>
            Freshly prepared daily with traditional recipes. Perfect for tiffin, 
            faral, and festival specials.
          </p>
          <Link to="/menu" className="cta-btn">
            View Menu & Order
          </Link>
        </div>
        <div className="hero-image" />
      </section>

      <section className="section">
        <h3 className="section-title">Why Choose Us?</h3>
        <div className="grid">
          <div className="card">
            <h4>🏠 Homemade</h4>
            <p>Made fresh in our home kitchen with love.</p>
          </div>
          <div className="card">
            <h4>🍲 Traditional</h4>
            <p>Authentic Maharashtrian recipes passed down generations.</p>
          </div>
          <div className="card">
            <h4>🎉 Festival Specials</h4>
            <p>Ganpati faral, Diwali sweets, and more.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
