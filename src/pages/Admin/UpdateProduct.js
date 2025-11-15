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
                    <BiPackage size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Update Product
                    </h1>
                    <p className="text-gray-600">Edit product information</p>
                  </div>
                </div>
              </Card>

              {/* Update Form */}
              <Card>
                <form onSubmit={handleUpdate} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="w-full"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Photo
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          className="h-full w-full object-contain rounded-xl"
                        />
                      ) : id ? (
                        <img
                          src={API_ENDPOINTS.PRODUCT.GET_PHOTO(id)}
                          alt="product_photo"
                          className="h-full w-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <AiOutlineCloudUpload
                            size={48}
                            className="text-gray-400 mb-3"
                          />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={description}
                      placeholder="Enter product description"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Quantity"
                      type="number"
                      value={quantity}
                      placeholder="Enter quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping *
                      </label>
                      <Select
                        placeholder="Select shipping"
                        size="large"
                        className="w-full"
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
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={<AiOutlineSave size={20} />}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "UPDATE PRODUCT"}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      size="lg"
                      icon={<AiOutlineDelete size={20} />}
                      onClick={handleDelete}
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
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineDelete size={32} className="text-red-600" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this product?
            </h3>
            {name && (
              <p className="text-gray-600">
                Product: <span className="font-bold text-gray-900">{name}</span>
              </p>
            )}
            <p className="text-sm text-red-600">
              This action cannot be undone. The product will be permanently
              removed from your store.
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
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default UpdateProduct;
