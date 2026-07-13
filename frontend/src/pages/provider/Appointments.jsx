import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ProviderLayout from "../../layouts/ProviderLayout";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function ProviderAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/appointments/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let result = appointments;

    if (statusFilter !== "all") {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (search) {
      result = result.filter((a) =>
        a.customerName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [statusFilter, search, appointments]);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, status: newStatus } : apt
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      confirmed: "info",
      completed: "success",
      cancelled: "danger",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <ProviderLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" {...fadeUp}>
          <h1 className="text-3xl font-bold text-surface-900">Appointments</h1>
          <p className="text-surface-500 mt-1">
            Manage your customer bookings
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-6"
          {...fadeUp}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
          </div>

          <div className="flex gap-2">
            {["all", "pending", "confirmed", "completed", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? "bg-primary-500 text-white shadow-soft"
                      : "bg-white text-surface-600 border border-surface-200 hover:border-primary-300"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </motion.div>

        {/* Appointments List */}
        <motion.div {...fadeUp}>
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-surface-500">Loading appointments...</p>
            </div>
          ) : filtered.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-500 font-medium text-lg">
                  No appointments found
                </p>
                <p className="text-surface-400 text-sm mt-1">
                  Appointments will appear here when customers book
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filtered.map((apt) => (
                <Card key={apt._id} className="hover:shadow-lift transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Customer Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-surface-900">
                          {apt.customerName || "Customer"}
                        </h3>
                        <p className="text-sm text-surface-500">
                          {apt.service?.title || "Service"}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-surface-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {apt.date
                            ? new Date(apt.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-surface-600">
                        <Clock className="w-4 h-4" />
                        <span>{apt.timeSlot || "N/A"}</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      {getStatusBadge(apt.status)}

                      {apt.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateStatus(apt._id, "confirmed")}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => updateStatus(apt._id, "cancelled")}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {apt.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(apt._id, "completed")}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </ProviderLayout>
  );
}