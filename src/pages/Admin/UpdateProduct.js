import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import {
  AiOutlineSave,
  AiOutlineDelete,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.GET_SINGLE(params.slug)
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.CATEGORY.GET_ALL);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        API_ENDPOINTS.PRODUCT.UPDATE(id),
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully", {
          duration: 2000,
          style: {
            background: "#0EA5A4",
            color: "#fff",
          },
        });
        navigate("/dashborad/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //delete a product
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(API_ENDPOINTS.PRODUCT.DELETE(id));
      toast.success("Product Deleted Successfully", {
        duration: 2000,
        style: {
          background: "#0EA5A4",
          color: "#fff",
        },
      });
      navigate("/dashborad/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
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
                    <BiPackage size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      Update Product
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Edit product information
                    </p>
                  </div>
                </div>
              </Card>

              {/* Update Form */}
              <Card className="p-4 sm:p-6">
                <form
                  onSubmit={handleUpdate}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="w-full text-sm sm:text-base"
                      onChange={(value) => setCategory(value)}
                      value={category}
                      required
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Product Photo
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-gray-300 border-dashed rounded-lg sm:rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          className="h-full w-full object-contain rounded-lg sm:rounded-xl p-2"
                        />
                      ) : id ? (
                        <img
                          src={API_ENDPOINTS.PRODUCT.GET_PHOTO(id)}
                          alt="product_photo"
                          className="h-full w-full object-contain rounded-lg sm:rounded-xl p-2"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6 px-4">
                          <AiOutlineCloudUpload
                            size={40}
                            className="text-gray-400 mb-2 sm:mb-3 sm:w-12 sm:h-12"
                          />
                          <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-500 text-center">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            PNG, JPG or JPEG
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Input
                      label="Product Name"
                      type="text"
                      value={name}
                      placeholder="Enter product name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <Input
                      label="Price"
                      type="number"
                      value={price}
                      placeholder="Enter price"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={description}
                      placeholder="Enter product description"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Input
                      label="Quantity"
                      type="number"
                      value={quantity}
                      placeholder="Enter quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Shipping *
                      </label>
                      <Select
                        placeholder="Select shipping"
                        size="large"
                        className="w-full text-sm sm:text-base"
                        onChange={(value) => setShipping(value)}
                        value={shipping ? "1" : "0"}
                        required
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={
                        <AiOutlineSave size={18} className="sm:w-5 sm:h-5" />
                      }
                      disabled={loading}
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      {loading ? "Updating..." : "UPDATE PRODUCT"}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="lg"
                      icon={
                        <AiOutlineDelete size={18} className="sm:w-5 sm:h-5" />
                      }
                      onClick={handleDelete}
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      DELETE PRODUCT
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        title="Delete Product"
      >
        <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
          <div className="flex justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineDelete
                size={28}
                className="text-red-600 sm:w-8 sm:h-8"
              />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Are you sure you want to delete this product?
            </h3>
            {name && (
              <p className="text-sm sm:text-base text-gray-600 break-words px-2">
                Product: <span className="font-bold text-gray-900">{name}</span>
              </p>
            )}
            <p className="text-xs sm:text-sm text-red-600 px-2">
              This action cannot be undone. The product will be permanently
              removed from your store.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={cancelDelete}
              fullWidth
              className="text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={confirmDelete}
              fullWidth
              className="text-sm sm:text-base"
            >
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default UpdateProduct;
