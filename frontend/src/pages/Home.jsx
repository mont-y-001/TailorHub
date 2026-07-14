import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Scissors,
  Ruler,
  Shirt,
  Heart,
  Baby,
  Sparkles,
  Star,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import homeImg from "../assets/homeimg.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1, duration: 0.4, ease: "easeOut" },
};

const services = [
  {
    icon: Shirt,
    title: "Shirt Stitching",
    desc: "Custom shirts tailored to your exact measurements with premium fabrics.",
  },
  {
    icon: Scissors,
    title: "Pant Alteration",
    desc: "Perfect hemming, tapering, and waist adjustments for the ideal fit.",
  },
  {
    icon: Sparkles,
    title: "Blouse Stitching",
    desc: "Elegant blouses designed to complement your traditional wear.",
  },
  {
    icon: Heart,
    title: "Bridal Wear",
    desc: "Exquisite bridal outfits crafted with attention to every detail.",
  },
  {
    icon: Baby,
    title: "Kids Wear",
    desc: "Comfortable and stylish clothing for children of all ages.",
  },
  {
    icon: Ruler,
    title: "Custom Tailoring",
    desc: "Bespoke clothing made from scratch to your unique specifications.",
  },
];

const categories = [
  { icon: Shirt, label: "Formal Wear", count: "24 Tailors" },
  { icon: Heart, label: "Bridal", count: "18 Tailors" },
  { icon: Baby, label: "Kids", count: "15 Tailors" },
  { icon: Scissors, label: "Alterations", count: "30 Tailors" },
  { icon: Sparkles, label: "Designer", count: "12 Tailors" },
  { icon: Ruler, label: "Bespoke", count: "9 Tailors" },
];

const stats = [
  { number: "500+", label: "Expert Tailors" },
  { number: "5k+", label: "Happy Customers" },
  { number: "10k+", label: "Orders Completed" },
  { number: "4.9★", label: "Average Rating" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Tailors",
    desc: "Every tailor is verified for quality and professionalism.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    desc: "We stand behind the quality of every stitch and seam.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Your orders are delivered exactly when promised.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <Badge variant="info" className="mb-6 bg-white/20 text-white border-0">
                <Star className="w-3.5 h-3.5" />
                Trusted by 5,000+ customers
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find Trusted{" "}
                <span className="text-accent-400">Tailors</span>{" "}
                Near You
              </h1>

              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Book tailoring services, alterations, bridal stitching, custom
                designs, and more. Quality craftsmanship at your doorstep.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/appointment">
                  <Button
                    variant="none"
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary-600 hover:bg-accent-50 hover:text-primary-700 shadow-lg border-0"
                  >
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="none"
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                  >
                    Become a Tailor
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Satisfaction Guaranteed</span>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={homeImg}
                    alt="Premium Tailoring"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lift p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-surface-900">4.9 Rating</p>
                    <p className="text-xs text-surface-500">from 2k+ reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary-500">
                  {stat.number}
                </p>
                <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Browse by Category</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              Find What You Need
            </h2>
            <p className="mt-3 text-surface-500 max-w-lg mx-auto">
              Explore our wide range of tailoring categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            {...stagger}
          >
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={stagger}>
                <Card className="text-center py-8 cursor-pointer" onClick={() => {}}>
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <cat.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-surface-400 mt-1">{cat.count}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              Professional Tailoring Services
            </h2>
            <p className="mt-3 text-surface-500 max-w-lg mx-auto">
              From simple alterations to bespoke creations, we've got you covered
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            {...stagger}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={stagger}>
                <Card className="h-full group">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <service.icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    {service.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Why TailorHUB</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              Why Choose Us?
            </h2>
            <p className="mt-3 text-surface-500 max-w-lg mx-auto">
              We connect quality craftsmanship with modern convenience
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            {...stagger}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={stagger}>
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-surface-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              What Our Customers Say
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            {...stagger}
          >
            {[
              {
                name: "Amit Sharma",
                role: "Customer",
                text: "TailorHUB helped me find an excellent tailor in minutes. Perfect fitting and on-time delivery!",
              },
              {
                name: "Neha Verma",
                role: "Fashion Designer",
                text: "Amazing platform! Very professional tailors and smooth appointment process.",
              },
              {
                name: "Rahul Khan",
                role: "Customer",
                text: "Highly recommended for anyone looking for premium tailoring services.",
              },
            ].map((t) => (
              <motion.div key={t.name} variants={stagger}>
                <Card className="h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent-400 text-accent-400"
                      />
                    ))}
                  </div>
                  <p className="text-surface-600 text-sm leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-surface-400">{t.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 sm:p-12 text-center text-white"
            {...fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Find Your Perfect Tailor?
            </h2>
            <p className="mt-4 text-white/80 max-w-lg mx-auto">
              Start now and experience premium tailoring services at your
              doorstep.
            </p>
            <Link to="/appointment">
              <Button
                variant="none"
                size="lg"
                className="mt-8 bg-white text-primary-600 hover:bg-accent-50 hover:text-primary-700 shadow-lg border-0"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}