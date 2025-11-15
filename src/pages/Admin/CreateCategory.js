import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import {
  AiOutlineAppstore,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(API_ENDPOINTS.CATEGORY.CREATE, {
        name,
      });
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
      const { data } = await axios.get(API_ENDPOINTS.CATEGORY.GET_ALL);
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
        API_ENDPOINTS.CATEGORY.UPDATE(selected._id),
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
  const handleDelete = (categoryId, categoryName) => {
    setDeletingCategory({ id: categoryId, name: categoryName });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        API_ENDPOINTS.CATEGORY.DELETE(deletingCategory.id)
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
        setShowDeleteModal(false);
        setDeletingCategory(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingCategory(null);
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <AiOutlineAppstore
                      size={20}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      Manage Categories
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Create and manage product categories
                    </p>
                  </div>
                </div>
              </Card>

              {/* Create Category Form */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">
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
              <Card className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b">
                  All Categories ({categories?.length || 0})
                </h2>
                {categories?.length > 0 ? (
                  <div className="space-y-2 sm:space-y-2.5">
                    {categories.map((c) => (
                      <div
                        key={c._id}
                        className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-full xs:max-w-[60%]">
                          {c.name}
                        </span>
                        <div className="flex gap-1.5 sm:gap-2 w-full xs:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={
                              <AiOutlineEdit
                                size={14}
                                className="sm:w-4 sm:h-4"
                              />
                            }
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                            className="flex-1 xs:flex-initial text-xs sm:text-sm"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={
                              <AiOutlineDelete
                                size={14}
                                className="sm:w-4 sm:h-4"
                              />
                            }
                            onClick={() => handleDelete(c._id, c.name)}
                            className="flex-1 xs:flex-initial text-xs sm:text-sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <AiOutlineAppstore
                      size={40}
                      className="text-gray-300 mx-auto mb-3 sm:mb-4 sm:w-12 sm:h-12"
                    />
                    <p className="text-sm sm:text-base text-gray-600">
                      No categories yet
                    </p>
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

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Category"
        open={showDeleteModal}
        onCancel={cancelDelete}
        footer={null}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineDelete size={32} className="text-red-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this category?
            </h3>
            {deletingCategory && (
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-bold text-gray-900">
                  {deletingCategory.name}
                </span>
              </p>
            )}
            <p className="text-sm text-red-600">
              This action cannot be undone. All products in this category may be
              affected.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={cancelDelete}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={confirmDelete}
              fullWidth
            >
              Delete Category
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
