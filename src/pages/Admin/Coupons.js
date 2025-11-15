import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  fetchAllCoupons,
  deleteCoupon,
  updateCoupon,
  toggleCoupon,
} from "../../redux/slices/couponSlice";
import toast from "react-hot-toast";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";
import Badge from "../../components/UI/Badge";
import Modal from "../../components/UI/Modal";
import {
  AiOutlineTag,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import moment from "moment";

const Coupons = () => {
  const dispatch = useDispatch();
  const { coupons, loading } = useSelector((state) => state.coupon);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCoupon, setDeletingCoupon] = useState(null);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    maxDiscount: "",
    expiryDate: "",
    usageLimit: "",
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }

    if (!formData.discountValue || formData.discountValue <= 0) {
      toast.error("Discount value must be greater than 0");
      return;
    }

    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    try {
      if (editingCoupon) {
        await dispatch(
          updateCoupon({
            couponId: editingCoupon._id,
            couponData: formData,
          })
        ).unwrap();
        toast.success("Coupon updated successfully");
      } else {
        await dispatch(createCoupon(formData)).unwrap();
        toast.success("Coupon created successfully");
      }
      resetForm();
      setShowModal(false);
    } catch (error) {
      toast.error(error || "Failed to save coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase || "",
      maxDiscount: coupon.maxDiscount || "",
      expiryDate: coupon.expiryDate
        ? moment(coupon.expiryDate).format("YYYY-MM-DD")
        : "",
      usageLimit: coupon.usageLimit || "",
      isActive: coupon.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (couponId, couponCode) => {
    setDeletingCoupon({ id: couponId, code: couponCode });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteCoupon(deletingCoupon.id)).unwrap();
      toast.success("Coupon deleted successfully");
      setShowDeleteModal(false);
      setDeletingCoupon(null);
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingCoupon(null);
  };

  const handleToggle = async (couponId) => {
    try {
      await dispatch(toggleCoupon(couponId)).unwrap();
      toast.success("Coupon status updated");
    } catch (error) {
      toast.error("Failed to update coupon status");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      maxDiscount: "",
      expiryDate: "",
      usageLimit: "",
      isActive: true,
    });
    setEditingCoupon(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <Layout title="Manage Coupons">
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Header */}
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <AiOutlineTag size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                        Manage Coupons
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        {coupons?.length || 0} total coupons
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    icon={<AiOutlinePlus size={18} className="sm:w-5 sm:h-5" />}
                    className="w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                  >
                    Create Coupon
                  </Button>
                </div>
              </Card>

              {/* Coupons List */}
              {loading ? (
                <div className="grid gap-3 sm:gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4 sm:p-6">
                      <div className="animate-pulse space-y-3 sm:space-y-4">
                        <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : coupons?.length > 0 ? (
                <div className="grid gap-3 sm:gap-4">
                  {coupons.map((coupon) => (
                    <Card key={coupon._id} hover className="p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        {/* Coupon Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 min-w-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                              <AiOutlineTag
                                size={24}
                                className="text-primary-500 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1 flex-wrap">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-mono truncate">
                                  {coupon.code}
                                </h3>
                                <Badge
                                  variant={
                                    coupon.isActive ? "success" : "danger"
                                  }
                                >
                                  {coupon.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {coupon.discountType === "percentage"
                                  ? `${coupon.discountValue}% off`
                                  : `$${coupon.discountValue} off`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleToggle(coupon._id)}
                              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors"
                              title={
                                coupon.isActive ? "Deactivate" : "Activate"
                              }
                              aria-label={coupon.isActive ? "Deactivate" : "Activate"}
                            >
                              {coupon.isActive ? (
                                <AiOutlineEye size={18} className="sm:w-5 sm:h-5" />
                              ) : (
                                <AiOutlineEyeInvisible size={18} className="sm:w-5 sm:h-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(coupon)}
                              className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-md sm:rounded-lg transition-colors"
                              aria-label="Edit"
                            >
                              <AiOutlineEdit size={18} className="sm:w-5 sm:h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(coupon._id, coupon.code)
                              }
                              className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-md sm:rounded-lg transition-colors"
                              aria-label="Delete"
                            >
                              <AiOutlineDelete size={18} className="sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Coupon Details */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
                          <div>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              Discount Type
                            </p>
                            <p className="font-semibold text-gray-900 capitalize text-xs sm:text-sm truncate">
                              {coupon.discountType}
                            </p>
                          </div>
                          {coupon.minPurchase && (
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Min Purchase
                              </p>
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                ${coupon.minPurchase}
                              </p>
                            </div>
                          )}
                          {coupon.maxDiscount && (
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Max Discount
                              </p>
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                ${coupon.maxDiscount}
                              </p>
                            </div>
                          )}
                          {coupon.expiryDate && (
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Expiry Date
                              </p>
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                {moment(coupon.expiryDate).format(
                                  "MMM DD, YYYY"
                                )}
                              </p>
                            </div>
                          )}
                          {coupon.usageLimit && (
                            <div>
                              <p className="text-[10px] sm:text-xs text-gray-500">
                                Usage Limit
                              </p>
                              <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                {coupon.usedCount || 0} / {coupon.usageLimit}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 sm:p-8">
                  <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
                      <AiOutlineTag size={28} className="text-gray-400 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
                      No Coupons Yet
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4">
                      Create your first coupon to start offering discounts
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(true)}
                      icon={<AiOutlinePlus size={18} className="sm:w-5 sm:h-5" />}
                      className="text-sm sm:text-base"
                    >
                      Create Coupon
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingCoupon ? "Edit Coupon" : "Create New Coupon"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Coupon Code */}
          <Input
            label="Coupon Code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="SUMMER2024"
            required
            className="uppercase"
          />

          {/* Discount Type */}
          <Select
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleInputChange}
            required
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </Select>

          {/* Discount Value */}
          <Input
            label="Discount Value"
            name="discountValue"
            type="number"
            value={formData.discountValue}
            onChange={handleInputChange}
            placeholder={formData.discountType === "percentage" ? "10" : "50"}
            required
            min="0"
            step="0.01"
          />

          {/* Min Purchase */}
          <Input
            label="Minimum Purchase (Optional)"
            name="minPurchase"
            type="number"
            value={formData.minPurchase}
            onChange={handleInputChange}
            placeholder="100"
            min="0"
            step="0.01"
          />

          {/* Max Discount */}
          {formData.discountType === "percentage" && (
            <Input
              label="Maximum Discount (Optional)"
              name="maxDiscount"
              type="number"
              value={formData.maxDiscount}
              onChange={handleInputChange}
              placeholder="50"
              min="0"
              step="0.01"
            />
          )}

          {/* Expiry Date */}
          <Input
            label="Expiry Date (Optional)"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            min={moment().format("YYYY-MM-DD")}
          />

          {/* Usage Limit */}
          <Input
            label="Usage Limit (Optional)"
            name="usageLimit"
            type="number"
            value={formData.usageLimit}
            onChange={handleInputChange}
            placeholder="100"
            min="0"
          />

          {/* Is Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Active (Users can use this coupon)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        title="Delete Coupon"
      >
        <div className="space-y-6">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AiOutlineDelete size={32} className="text-red-600" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Are you sure you want to delete this coupon?
            </h3>
            {deletingCoupon && (
              <p className="text-gray-600">
                Coupon code:{" "}
                <span className="font-mono font-bold text-gray-900">
                  {deletingCoupon.code}
                </span>
              </p>
            )}
            <p className="text-sm text-red-600">
              This action cannot be undone. The coupon will be permanently
              removed.
            </p>
          </div>

          {/* Actions */}
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
              Delete Coupon
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Coupons;
