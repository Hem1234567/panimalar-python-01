import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Zap, Trophy, Target, Loader2, Edit2, Save } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchSolvedCount();
    }
  }, [user]);

  const fetchSolvedCount = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("submissions")
      .select("problem_id")
      .eq("user_id", user.id)
      .eq("status", "Accepted");

    if (data) {
      const uniqueSolved = new Set(data.map((s) => s.problem_id));
      setSolvedCount(uniqueSolved.size);
    }
  };

  const handleSave = async () => {
    if (!user || !newName.trim()) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({ name: newName.trim() })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated");
      refreshProfile();
      setIsEditing(false);
    }

    setIsSaving(false);
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile - PyChef</title>
        <meta name="description" content="View your PyChef profile and stats." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button size="sm" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setNewName(profile.name);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.name}
                      </h1>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Zap, label: "XP", value: profile.xp },
                  { icon: Trophy, label: "Level", value: profile.level },
                  { icon: Target, label: "Solved", value: solvedCount },
                  { icon: Target, label: "Streak", value: profile.streak },
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
