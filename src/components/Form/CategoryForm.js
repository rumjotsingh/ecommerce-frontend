import React from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { AiOutlineSave } from "react-icons/ai";

const CategoryForm = ({ handleSubmit, value, setValue, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="primary"
        icon={<AiOutlineSave size={20} />}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Category"}
      </Button>
    </form>
  );
};

export default CategoryForm;
