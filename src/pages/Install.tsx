import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Download, Smartphone, CheckCircle, Share, Plus, Menu, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: Smartphone,
      title: "Works Offline",
      description: "Access problems and practice coding even without internet",
    },
    {
      icon: Download,
      title: "Fast & Lightweight",
      description: "Installs quickly and uses minimal storage space",
    },
    {
      icon: CheckCircle,
      title: "Native Experience",
      description: "Feels just like a real app on your home screen",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Install PyChef - Get the App</title>
        <meta name="description" content="Install PyChef on your device for the best coding experience" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-6">
                <Smartphone className="h-12 w-12 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Install PyChef
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Get the full app experience. Install PyChef on your device for quick access and offline practice.
              </p>
            </motion.div>

            {isInstalled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Already Installed!
                </h2>
                <p className="text-muted-foreground">
                  PyChef is installed on your device. Look for it on your home screen.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full text-center">
                        <CardHeader>
                          <div className="mx-auto p-3 rounded-lg bg-primary/20 w-fit">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Install Instructions */}
                {deferredPrompt ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Button size="lg" onClick={handleInstall} className="gap-2">
                      <Download className="h-5 w-5" />
                      Install PyChef
                    </Button>
                  </motion.div>
                ) : isIOS ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share className="h-5 w-5" />
                        How to Install on iPhone/iPad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tap the Share button</p>
                          <p className="text-sm text-muted-foreground">
                            Look for the share icon <Share className="inline h-4 w-4" /> at the bottom of your browser
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Select "Add to Home Screen"</p>
                          <p className="text-sm text-muted-foreground">
                            Scroll down in the share menu and tap <Plus className="inline h-4 w-4" /> Add to Home Screen
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tap "Add"</p>
                          <p className="text-sm text-muted-foreground">
                            Confirm by tapping Add in the top right corner
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Menu className="h-5 w-5" />
                        How to Install on Android
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Open browser menu</p>
                          <p className="text-sm text-muted-foreground">
                            Tap the three dots <Menu className="inline h-4 w-4" /> in the top right corner
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Select "Install app" or "Add to Home screen"</p>
                          <p className="text-sm text-muted-foreground">
                            Look for the install option in the menu
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Confirm installation</p>
                          <p className="text-sm text-muted-foreground">
                            Tap "Install" to add PyChef to your home screen
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Install;
