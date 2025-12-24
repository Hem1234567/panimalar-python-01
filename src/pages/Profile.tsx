import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { User, Zap, Trophy, Target } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Profile = () => {
  const user = { name: "John Developer", email: "john@example.com", xp: 1250, level: 5, solved: 23, accuracy: 78 };

  return (
    <>
      <Helmet>
        <title>Profile - PyChef</title>
        <meta name="description" content="View your PyChef profile and stats." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated={true} />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Zap, label: "XP", value: user.xp },
                  { icon: Trophy, label: "Level", value: user.level },
                  { icon: Target, label: "Solved", value: user.solved },
                  { icon: Target, label: "Accuracy", value: `${user.accuracy}%` },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-secondary text-center">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
