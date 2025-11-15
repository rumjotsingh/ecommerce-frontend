import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiPackage, BiShield } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import Rating from "../components/UI/Rating";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import ProductCard from "../components/Product/ProductCard";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-s84l.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    // Check if product has stock
    if (product.quantity === 0) {
      toast.error("Product is out of stock", {
        duration: 2000,
      });
      return;
    }

    // Check if requested quantity exceeds available stock
    if (quantity > product.quantity) {
      toast.error(`Only ${product.quantity} items available in stock`, {
        duration: 2000,
      });
      return;
    }

    // Add product with selected quantity to cart
    const productWithQuantity = { ...product, orderQuantity: quantity };
    setCart([...cart, productWithQuantity]);
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, productWithQuantity])
    );
    toast.success(`${quantity} item(s) added to cart`, {
      duration: 2000,
      style: {
        background: "#0EA5A4",
        color: "#fff",
      },
    });
  };

  // Mock images array - In real scenario, you'd have multiple product images
  const productImages = [
    `https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${product._id}`,
  ];

  return (
    <Layout title={`${product?.name} - Product Details`}>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Product Section */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary-500"
                            : "border-gray-200 hover:border-primary-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="flex items-center gap-3">
                  <Badge variant="primary">{product?.category?.name}</Badge>
                  {product.quantity < 10 && product.quantity > 0 && (
                    <Badge variant="warning">
                      Only {product.quantity} left
                    </Badge>
                  )}
                  {product.quantity === 0 && (
                    <Badge variant="danger">Out of Stock</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <Rating rating={4.5} size="lg" showCount count={125} />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold text-primary-500">
                    ${product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                  {product.originalPrice && (
                    <Badge variant="success" size="lg">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => {
                        if (quantity >= product.quantity) {
                          toast.error(
                            `Only ${product.quantity} items available`,
                            {
                              duration: 2000,
                            }
                          );
                        } else {
                          setQuantity(quantity + 1);
                        }
                      }}
                      disabled={quantity >= product.quantity}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  {product.quantity > 0 && (
                    <p className="text-xs text-gray-500">
                      {product.quantity} items available
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    icon={<AiOutlineShoppingCart size={24} />}
                    disabled={product.quantity === 0}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <AiOutlineHeart size={24} />
                  </Button>
                  <Button variant="outline" size="lg">
                    <AiOutlineShareAlt size={24} />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FaShippingFast className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Free Delivery
                      </div>
                      <div className="text-xs text-gray-600">
                        On orders $50+
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                      <BiShield className="text-secondary-500" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Secure Payment
                      </div>
                      <div className="text-xs text-gray-600">
                        100% protected
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <BiPackage className="text-green-500" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Easy Returns
                      </div>
                      <div className="text-xs text-gray-600">30-day policy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Similar Products
              </h2>
            </div>

            {relatedProducts.length < 1 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-gray-600">No similar products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts?.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
