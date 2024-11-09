import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppProvider, AppContext } from "./AppContext";
import ImageDetail from "./ImageDetail";
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <nav className="navbar">
          <Link to="/">NASA WEBAPP</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/image/:id" element={<ImageDetail />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

function Gallery() {
  const { data, loading, error, searchTerm, handleSearchChange, handleSearchSubmit, currentPage, nextPage, prevPage, totalImages } = useContext(AppContext);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search images..."
          className="search-bar"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="card-container">
        {data?.map((item, index) => (
          <Link to={`/image/${index}`} key={index} className="card">
            <div className="card-inner">
              <div className="card-front">
                <img src={item.links[0].href} alt={item.data[0].description || "NASA Image"} />
              </div>
              <div className="card-back">
                <p>{item.data[0].date_created}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(totalImages / 12)}>Next</button>
      </div>
    </>
  );
}

export default App;
