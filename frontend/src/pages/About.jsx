import { motion } from "framer-motion";
import { Scissors, Target, Eye, Heart, Shield, Zap } from "lucide-react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";

const team = [
  {
    name: "Mohit Yadav",
    role: "Founder & CEO",
    img: "/team/Mohit-Yadav/mohit-yadav.jpeg",
  },
  {
    name: "Nitin Saini",
    role: "Co-Founder",
    img: "/team/Nitin-Saini/portfolio-1.JPG",
  },
  {
    name: "Mansha Sharma",
    role: "Lead Designer",
    img: "/team/Mansha-Sharma/ManshaSharma.jpeg",
  },
  {
    name: "Prashant",
    role: "Tech Lead",
    img: "/team/Prashant/prashant.jpg",
  },
  {
    name: "Radwa",
    role: "Operations Manager",
    img: "/team/Radwa/radwaphoto.jpeg",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const values = [
  { icon: Shield, title: "Trust", desc: "We build trust through transparency and reliable service." },
  { icon: Heart, title: "Quality", desc: "Every stitch meets our high standards of craftsmanship." },
  { icon: Eye, title: "Transparency", desc: "Clear pricing, honest timelines, no hidden fees." },
  { icon: Zap, title: "Innovation", desc: "Modern technology meets traditional tailoring expertise." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="info" className="mb-4 bg-white/20 text-white border-0">
              About Us
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              About TailorHUB
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              A modern digital platform connecting customers with skilled local
              tailors, making tailoring services accessible and hassle-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <Badge variant="info" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold text-surface-900 mb-4">
                From a Simple Problem to a Powerful Solution
              </h2>
              <p className="text-surface-600 leading-relaxed mb-4">
                TailorHUB was born from a real-life challenge faced by one of our
                team members, <span className="font-semibold text-surface-900">Nitin Saini</span>.
                After relocating from Gurgaon to Ghaziabad, he struggled to find a
                reliable local tailor for daily stitching and alterations.
              </p>
              <p className="text-surface-600 leading-relaxed mb-4">
                Finding a skilled tailor involved visiting multiple shops, asking
                locals for recommendations, and still facing inconsistent quality
                and delays. This experience highlighted a common problem faced by
                many people when they move to a new city or locality.
              </p>
              <p className="text-surface-600 leading-relaxed">
                After sharing this problem with the team, we realized the need for
                a centralized platform where customers could easily discover
                trusted tailors, view their services, and book appointments
                without hassle. This led to the creation of{" "}
                <span className="font-semibold text-surface-900">TailorHUB</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl p-8 sm:p-12 flex items-center justify-center"
            >
              <div className="text-center">
                <Scissors className="w-20 h-20 text-primary-300 mx-auto mb-4" />
                <p className="text-2xl font-bold text-primary-600">TailorHUB</p>
                <p className="text-primary-400">Where Craftsmanship Meets Convenience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div {...fadeUp}>
              <Card className="h-full">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 mb-3">
                  Our Mission
                </h2>
                <p className="text-surface-600 leading-relaxed">
                  To simplify tailoring services by providing a reliable platform
                  that connects customers with verified and experienced tailors.
                  We ensure quality, transparency, and convenience for every user.
                </p>
              </Card>
            </motion.div>

            <motion.div {...fadeUp}>
              <Card className="h-full">
                <div className="w-14 h-14 bg-accent-50 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-accent-500" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 mb-3">
                  Our Vision
                </h2>
                <p className="text-surface-600 leading-relaxed">
                  To become the leading platform for tailoring services across
                  cities, empowering local tailors with digital tools while
                  delivering exceptional experiences to customers.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={{
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card className="text-center h-full">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <v.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-surface-500">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <Badge variant="info" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              Meet the People Behind TailorHUB
            </h2>
            <p className="mt-3 text-surface-500 max-w-2xl mx-auto">
              A passionate team dedicated to revolutionizing the tailoring industry
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={{
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <Card className="text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-primary-50">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium mt-1">
                    {member.role}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              TailorHUB — Where Craftsmanship Meets Convenience
            </h2>
            <p className="mt-4 text-surface-500 max-w-2xl mx-auto">
              We are committed to transforming the tailoring experience by making
              it simpler, faster, and more reliable for everyone.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}