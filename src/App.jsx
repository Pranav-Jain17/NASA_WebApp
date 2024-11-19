import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppProvider, AppContext } from "./AppContext";
import ImageDetail from "./ImageDetail";
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
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

      <nav className="navbar">
        <img src="./src/assets/NASA_logo.png" width="60px" height="60px"></img>
        <p className="title">NASA WEBAPP</p>

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
      </nav>

      <div className="card-container">
        {data?.map((item, index) => (
          <Link to={`/image/${index}`} key={index} className="card">
            <div className="card-inner">
              <div className="card-front">
                <img src={item.links[0].href} alt={item.data[0].description || "NASA Image"} />
              </div>
              <div className="card-back">
                <p>{item.data[0].description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button className="prev_btn" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button className="next_btn" onClick={nextPage} disabled={currentPage === Math.ceil(totalImages / 12)}>Next</button>
      </div>
    </>
  );
}

export default App;
