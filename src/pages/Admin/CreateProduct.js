import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(API_ENDPOINTS.PRODUCT.CREATE, productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashborad/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
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
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                      Create Product
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Add a new product to your store
                    </p>
                  </div>
                </div>
              </Card>

              {/* Create Form */}
              <Card className="p-4 sm:p-6">
                <form
                  onSubmit={handleCreate}
                  className="space-y-4 sm:space-y-6"
                >
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
                      Product Photo *
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-gray-300 border-dashed rounded-lg sm:rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          className="h-full w-full object-contain rounded-lg sm:rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6">
                          <AiOutlineCloudUpload
                            size={40}
                            className="text-gray-400 mb-2 sm:mb-3 sm:w-12 sm:h-12"
                          />
                          <p className="mb-1.5 sm:mb-2 text-xs sm:text-sm text-gray-500">
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
                        required
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping *
                      </label>
                      <Select
                        placeholder="Select shipping"
                        size="large"
                        className="w-full"
                        onChange={(value) => setShipping(value)}
                        required
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2 sm:pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon={
                        <AiOutlinePlus size={18} className="sm:w-5 sm:h-5" />
                      }
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      CREATE PRODUCT
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
