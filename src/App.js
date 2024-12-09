import React, { useEffect, useState } from "react";
import Results from "./components/Results";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const [results, setResults] = useState({});
  const [sources, setSources] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
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
      const countryFilter = selectedSource?.name === "All Countries" ? "" : `&language=${selectedSource?.code}`;
      let dateFilter = '';
      if (dateRange.startDate && dateRange.endDate) {
        dateFilter = `&from=${dateRange.startDate}&to=${dateRange.endDate}`;
      }
      const sortFilter = `&sortBy=${sortBy}`;

      const url = `https://newsapi.org/v2/everything?q=${searchQuery}${countryFilter}${dateFilter}${sortFilter}&apiKey=${process.env.REACT_APP_API_KEY}`;

      // const url = `https://newsapi.org/v2/everything?q=${searchQuery}${countryFilter}${dateFilter}&apiKey=${process.env.REACT_APP_API_KEY}`;




      const response = await fetch(url);
      const data = await response.json();
      if (data?.articles && data?.articles?.length > 0) {
        setResults({ type: 'success', articles: data?.articles });
      } else if (data?.code === 'rateLimited') {
        setResults({ type: 'error', msg: data?.message })
      } else {
        console.log("No articles found.");
        setResults([]); // Clear results if no articles
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
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
