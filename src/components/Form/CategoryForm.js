import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="Enter category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CategoryForm;
