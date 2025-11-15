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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <AiOutlineTag size={24} className="text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Manage Coupons
                      </h1>
                      <p className="text-gray-600">
                        {coupons?.length || 0} total coupons
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    icon={<AiOutlinePlus size={20} />}
                  >
                    Create Coupon
                  </Button>
                </div>
              </Card>

              {/* Coupons List */}
              {loading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : coupons?.length > 0 ? (
                <div className="grid gap-4">
                  {coupons.map((coupon) => (
                    <Card key={coupon._id} hover>
                      <div className="space-y-4">
                        {/* Coupon Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                              <AiOutlineTag
                                size={32}
                                className="text-primary-500"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-bold text-gray-900 font-mono">
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
                              <p className="text-sm text-gray-600">
                                {coupon.discountType === "percentage"
                                  ? `${coupon.discountValue}% off`
                                  : `$${coupon.discountValue} off`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggle(coupon._id)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title={
                                coupon.isActive ? "Deactivate" : "Activate"
                              }
                            >
                              {coupon.isActive ? (
                                <AiOutlineEye size={20} />
                              ) : (
                                <AiOutlineEyeInvisible size={20} />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(coupon)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <AiOutlineEdit size={20} />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(coupon._id, coupon.code)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <AiOutlineDelete size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Coupon Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-xs text-gray-500">
                              Discount Type
                            </p>
                            <p className="font-semibold text-gray-900 capitalize">
                              {coupon.discountType}
                            </p>
                          </div>
                          {coupon.minPurchase && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Min Purchase
                              </p>
                              <p className="font-semibold text-gray-900">
                                ${coupon.minPurchase}
                              </p>
                            </div>
                          )}
                          {coupon.maxDiscount && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Max Discount
                              </p>
                              <p className="font-semibold text-gray-900">
                                ${coupon.maxDiscount}
                              </p>
                            </div>
                          )}
                          {coupon.expiryDate && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Expiry Date
                              </p>
                              <p className="font-semibold text-gray-900">
                                {moment(coupon.expiryDate).format(
                                  "MMM DD, YYYY"
                                )}
                              </p>
                            </div>
                          )}
                          {coupon.usageLimit && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Usage Limit
                              </p>
                              <p className="font-semibold text-gray-900">
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
                <Card>
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <AiOutlineTag size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Coupons Yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Create your first coupon to start offering discounts
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(true)}
                      icon={<AiOutlinePlus size={20} />}
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
