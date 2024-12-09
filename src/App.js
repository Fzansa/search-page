import React, { useEffect, useState } from "react";
import Results from "./components/Results";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const [results, setResults] = useState({});
  const [sources, setSources] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [searchQuery, setSearchQuery] = useState("Real Estate");
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState({ name: 'All Countries' });

  // Function to fetch articles
  const fetchArticles = async (query) => {
    setLoading(true);
    try {
      // Add country filter (optional)
      const countryFilter =
        selectedSource?.name === "All Countries"
          ? ""
          : `&lang=${selectedSource?.code.toLowerCase()}`;  // GNews uses 'country' parameter
      
      // Add date range filter (optional)
      let dateFilter = "";
      if (dateRange.startDate && dateRange.endDate) {
        dateFilter = `&from=${dateRange.startDate}&to=${dateRange.endDate}`;
      }
  
      // Add sorting filter (optional)
      const sortFilter = sortBy ? `&sortBy=${sortBy}` : "";
  
      // GNews API URL structure
      const url = `https://gnews.io/api/v4/search?q=${query}${countryFilter}${dateFilter}${sortFilter}&token=${process.env.REACT_APP_GNEWS_API_KEY}`;
  
      // Explicitly specify the GET method
      const response = await fetch(url, { method: 'GET' });
  
      // Parse the response as JSON
      const data = await response.json();
      // Check if the response was successful
      if (response.ok && data.articles && data.articles.length > 0) {
        setResults({ type: "success", articles: data.articles });
      } else if (data.error) {
        setResults({ type: "error", msg: data.error });
      } else {
        console.log("No articles found.");
        setResults({ type: "error", msg: "No articles found." });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setResults({ type: "error", msg: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  





  useEffect(() => {
    fetchArticles(searchQuery);
  }, [searchQuery, selectedSource, dateRange, sortBy]);


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSourceChange = (source) => {
    setSelectedSource(source);
  };

  const handleDateChange = (date) => {
    setDateRange(date)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} sources={sources} onSourceChange={handleSourceChange} />
      <Results results={results} loading={loading} onDateChange={handleDateChange} handleSortChange={handleSortChange} />
    </div>
  );
};

export default App;
