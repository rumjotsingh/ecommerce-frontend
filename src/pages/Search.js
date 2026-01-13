import React from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search";
import ProductCard from "../components/Product/ProductCard";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <h1 className="text-lg font-medium text-gray-900">
              Search Results
            </h1>
            <p className="text-sm text-gray-500">
              {values?.results?.length < 1
                ? "No products found"
                : `Found ${values?.results?.length} ${
                    values?.results?.length === 1 ? "product" : "products"
                  }`}
            </p>
          </div>

          {/* Results */}
          {values?.results?.length > 0 ? (
            <div className="bg-white rounded shadow-sm p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {values?.results.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded shadow-sm p-12 text-center">
              <AiOutlineSearch
                size={48}
                className="text-gray-300 mx-auto mb-3"
              />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Products Found
              </h3>
              <p className="text-sm text-gray-500">
                Try different search terms
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
