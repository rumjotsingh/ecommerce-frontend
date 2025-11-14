import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ShoppingCart, Star, Truck, RotateCcw, Shield, Heart } from "lucide-react";

const ModernProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  // Get product
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

  // Get similar products
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

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={`${product.name} - Product Details`}>
      <div className="container mx-auto px-4 py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <Card className="overflow-hidden mb-4">
              <img
                src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover"
              />
            </Card>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((index) => (
                <Card
                  key={index}
                  className={`cursor-pointer overflow-hidden transition-all ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${product._id}`}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product?.category?.name}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600">(128 reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              <span className="text-xl text-gray-500 line-through">
                ${Math.round(product.price * 1.3)}
              </span>
              <Badge variant="secondary">23% OFF</Badge>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-primary mb-2" size={24} />
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="text-primary mb-2" size={24} />
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="text-primary mb-2" size={24} />
                <span className="text-xs text-gray-600">Secure Payment</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart size={20} />
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Product Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Category:</div>
                  <div className="font-medium">{product?.category?.name}</div>
                  <div className="text-gray-600">Availability:</div>
                  <div className="font-medium text-green-600">In Stock</div>
                  <div className="text-gray-600">SKU:</div>
                  <div className="font-medium">{product._id?.slice(0, 8).toUpperCase()}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">John Doe</span>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                          Great product! Exactly as described. Fast shipping and excellent quality.
                          Highly recommend!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts?.map((p) => (
                <Card
                  key={p._id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://ecommerce-backend-s84l.onrender.com/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">${p.price}</span>
                      <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}>
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ModernProductDetails;
