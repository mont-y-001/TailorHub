import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Plus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ProviderLayout from "../../layouts/ProviderLayout";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function ProviderServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/services/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editingService
        ? `${process.env.REACT_APP_API_URL}/api/services/${editingService._id}`
        : `${process.env.REACT_APP_API_URL}/api/services`;

      const res = await fetch(url, {
        method: editingService ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchServices();
        closeModal();
      }
    } catch (err) {
      console.error("Failed to save service", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    const token = localStorage.getItem("token");
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/services/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setForm({
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        image: service.image || "",
      });
      setImagePreview(service.image || "");
    } else {
      setEditingService(null);
      setForm({ title: "", description: "", price: "", image: "" });
      setImagePreview("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setForm({ title: "", description: "", price: "", image: "" });
    setImagePreview("");
  };

  return (
    <ProviderLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8 flex items-center justify-between" {...fadeUp}>
          <div>
            <h1 className="text-3xl font-bold text-surface-900">My Services</h1>
            <p className="text-surface-500 mt-1">
              Manage your service offerings
            </p>
          </div>
          <Button onClick={() => openModal()}>
            <Plus className="w-5 h-5" />
            Add Service
          </Button>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-surface-500">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Scissors className="w-16 h-16 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500 font-medium text-lg">
                No services yet
              </p>
              <p className="text-surface-400 text-sm mt-1">
                Add your first service to start receiving bookings
              </p>
              <Button className="mt-4" onClick={() => openModal()}>
                <Plus className="w-5 h-5" />
                Add Your First Service
              </Button>
            </div>
          </Card>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                variants={{
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card className="h-full group">
                  {service.image && (
                    <div className="relative mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-surface-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-surface-500 mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary-500">
                      ₹{service.price}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(service)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lift p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-surface-900">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-surface-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Service Title"
                  placeholder="e.g., Shirt Stitching"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-semibold text-surface-800 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe your service..."
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none"
                  />
                </div>

                <Input
                  label="Price (₹)"
                  type="number"
                  placeholder="e.g., 500"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-semibold text-surface-800 mb-1.5">
                    Image URL (optional)
                  </label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={(e) => {
                      setForm({ ...form, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                  />
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeModal}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingService ? "Update" : "Add"} Service
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </ProviderLayout>
  );
}