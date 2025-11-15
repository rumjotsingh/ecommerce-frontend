import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import {
  AiOutlineAppstore,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`, {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    } finally {
      setLoading(false);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-s84l.onrender.com/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`, {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success("Category is deleted", {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <AiOutlineAppstore size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Manage Categories
                    </h1>
                    <p className="text-gray-600">
                      Create and manage product categories
                    </p>
                  </div>
                </div>
              </Card>

              {/* Create Category Form */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                  Create New Category
                </h2>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  loading={loading}
                />
              </Card>

              {/* Categories List */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                  All Categories ({categories?.length || 0})
                </h2>
                {categories?.length > 0 ? (
                  <div className="space-y-2">
                    {categories.map((c) => (
                      <div
                        key={c._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-900">
                          {c.name}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<AiOutlineEdit size={16} />}
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={<AiOutlineDelete size={16} />}
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete "${c.name}"?`
                                )
                              ) {
                                handleDelete(c._id);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AiOutlineAppstore
                      size={48}
                      className="text-gray-300 mx-auto mb-4"
                    />
                    <p className="text-gray-600">No categories yet</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
