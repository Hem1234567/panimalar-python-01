import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Heart, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ShareSolutionDialogProps {
  problemId: string;
  submissionId: string;
  problemTitle: string;
}

const ShareSolutionDialog = ({ problemId, submissionId, problemTitle }: ShareSolutionDialogProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: `My solution for ${problemTitle}`,
    description: "",
    isPublic: true,
  });

  const handleSubmit = async () => {
    if (!user) return;

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("shared_solutions")
        .insert({
          user_id: user.id,
          problem_id: problemId,
          submission_id: submissionId,
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          is_public: formData.isPublic,
        });

      if (error) throw error;

      toast.success("Solution shared successfully!");
      setIsOpen(false);
      setFormData({
        title: `My solution for ${problemTitle}`,
        description: "",
        isPublic: true,
      });
    } catch (error) {
      console.error("Error sharing solution:", error);
      toast.error("Failed to share solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Solution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Give your solution a title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Explain your approach..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public</Label>
              <p className="text-sm text-muted-foreground">
                {formData.isPublic ? "Anyone can see this solution" : "Only you can see this solution"}
              </p>
            </div>
            <Switch
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Share2 className="h-4 w-4 mr-2" />
            )}
            Share Solution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareSolutionDialog;
