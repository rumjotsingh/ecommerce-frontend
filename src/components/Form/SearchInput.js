import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) return;
    try {
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.SEARCH(values.keyword)
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="w-full py-2 px-4 pr-10 text-sm bg-white border-0 rounded outline-none"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 text-primary-500 hover:text-primary-600"
        >
          <AiOutlineSearch size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
