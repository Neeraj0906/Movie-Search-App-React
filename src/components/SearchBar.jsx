import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);  // Pass the search term to the parent component
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4" style={{marginLeft:"69px",padding:"10px",marginBottom:"10px",opacity: 1,marginTop:"1px"}}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          style={{padding:"8px",width:"250px",borderRadius:"10px",fontSize:"25px",marginTop:"250px",border:"transparent",color:"black",background:"white",marginLeft:"-70px",marginBottom:"-10px"}}
          type="text"
          className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a movie...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          style={{padding:"8px",marginLeft:"3px",width:"90px",backgroundColor:"blue",color:"black",fontSize:"20px"}}
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
