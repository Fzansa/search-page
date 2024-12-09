import React from "react";
import ShimmerCard from "./ShimmerCard";
import FilterComponent from "./FilterComponent";
import DateRangePicker from "./DateRangePicker";

const formatDate = (isoDate) => {
  if (!isoDate) return "Unknown date";
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    weekday: "short", // e.g., "Fri"
    year: "numeric", // e.g., "2024"
    month: "short", // e.g., "Dec"
    day: "numeric", // e.g., "6"
    hour: "numeric", // e.g., "7 PM"
    minute: "2-digit", // e.g., ":04"
  });
};

const Results = ({ results, loading, onDateChange, handleSortChange }) => {
  return (
    <div className="container mx-auto  py-4 px-6">
      <section className="py-6 sm:py-12  text-gray-800">
        <div className="container py-6 mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold py-2">Search & Filter Page</h2>
            <p className="font-serif text-sm text-gray-400">
            Simple, user-friendly search page with filters
            </p>
            <div className="md:flex gap-12">
              <div className="sort-filter my-4 md:my-0">
                <label htmlFor="sort" className="pr-3">Sort By:</label>
                <select
                  id="sort"
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
                >
                  <option value="publishedAt">Published Date</option>
                  <option value="popularity">Popularity</option>
                  <option value="relevancy">Relevance</option>
                </select>
              </div>
              <DateRangePicker onDateChange={onDateChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <ShimmerCard />
            ) : results?.type === "error" ? (
              <p>{results?.msg}</p>
            ) : results?.articles?.length === undefined ? (
              <p>Articles not found</p>
            ) : (
              results?.articles?.map((item) => {
                if (item?.urlToImage) {
                  return (
                    <article
                      className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-sm border-lprimary"
                      key={item?.id || item?.url}
                    >
                      <a
                        rel="noopener noreferrer"
                        href={item?.url || "#"}
                        aria-label={item?.title || "Article"}
                      >
                        <img
                          alt={item?.title || "Article Image"}
                          className="object-cover w-full h-52 bg-gray-500"
                          src={item?.urlToImage}
                        />
                      </a>
                      <div className="flex flex-col flex-1 p-6">
                        <a
                          href={item?.url || "javascript:void(0)"}
                          className="text-xs tracking-wider uppercase hover:underline text-violet-400"
                        >
                          {item?.source?.name || "Unknown Source"}
                        </a>
                        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                          {item?.title || "No Title Available"}
                        </h3>
                        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                          <span>
                            {item?.publishedAt
                              ? formatDate(item?.publishedAt)
                              : "Unknown Date"}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                }
                return null; // Skip rendering if no image is available
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
