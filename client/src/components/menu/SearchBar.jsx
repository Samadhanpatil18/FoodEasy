/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const SearchBar = ({ setMenuData, foodItems }) => {

  const [searchText, setSearchText] = useState("");
  const [prevSearch, setPrevSearch] = useState("");

  useEffect(() => {
    if(searchText == ""){
      setMenuData(foodItems);
    }
  },[searchText])

  // Search function to filter food items based on search text
  function dishSearching () {

    if(prevSearch == searchText || searchText == "") {
      return 0;
    }
    setPrevSearch(searchText);

    setMenuData(() => {
      return foodItems.filter((e) => {
        if (e.title.toLowerCase().includes(searchText.toLowerCase())) return e;
        if (e.category.toLowerCase().includes(searchText.toLowerCase())) return e;
        let isTagMatch = e.tags.filter((ele) => ele.replaceAll('-', ' ').toLowerCase().includes(searchText.toLowerCase()));
        if (isTagMatch.length > 0) return e;
      });
    });
  }

  return (
    <div className="search-container w-full sm:p-5 py-2 grid place-items-center mb-2">
      <div className="search-bar">
        <input
          type="search"
          name="search-text"
          placeholder="Search dish, category, cuisine..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Controlled input
        />
        <button type="button" onClick={dishSearching}>
          <i className="fa-brands fa-searchengin"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
