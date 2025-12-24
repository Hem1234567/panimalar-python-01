import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Shield,
  BookOpen,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Problem {
  id: string;
  title: string;
  statement: string;
  difficulty: string;
  tags: string[];
  input_format: string;
  output_format: string;
  constraints: string;
  samples: { input: string; output: string; explanation?: string }[];
  testcases: { input: string; output: string }[];
  time_limit: number;
}

interface Profile {
  id: string;
  user_id: string;
  name: string;
  xp: number;
  level: number;
}

const emptyProblem: Omit<Problem, "id"> = {
  title: "",
  statement: "",
  difficulty: "Easy",
  tags: [],
  input_format: "",
  output_format: "",
  constraints: "",
  samples: [{ input: "", output: "", explanation: "" }],
  testcases: [{ input: "", output: "" }],
  time_limit: 2,
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  
  const [problems, setProblems] = useState<Problem[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [formData, setFormData] = useState<Omit<Problem, "id">>(emptyProblem);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch problems
    const { data: problemsData } = await supabase
      .from("problems")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (problemsData) {
      setProblems(problemsData as unknown as Problem[]);
    }
    
    // Fetch users
    const { data: usersData } = await supabase
      .from("profiles")
      .select("*")
      .order("xp", { ascending: false });
    
    if (usersData) {
      setUsers(usersData as Profile[]);
    }
    
    setIsLoading(false);
  };

  const handleOpenDialog = (problem?: Problem) => {
    if (problem) {
      setEditingProblem(problem);
      setFormData({
        title: problem.title,
        statement: problem.statement,
        difficulty: problem.difficulty,
        tags: problem.tags,
        input_format: problem.input_format || "",
        output_format: problem.output_format || "",
        constraints: problem.constraints || "",
        samples: problem.samples || [{ input: "", output: "", explanation: "" }],
        testcases: problem.testcases || [{ input: "", output: "" }],
        time_limit: problem.time_limit,
      });
      setTagsInput(problem.tags.join(", "));
    } else {
      setEditingProblem(null);
      setFormData(emptyProblem);
      setTagsInput("");
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.statement) {
      toast.error("Title and statement are required");
      return;
    }
    
    setIsSaving(true);
    
    const problemData = {
      ...formData,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    
    if (editingProblem) {
      const { error } = await supabase
        .from("problems")
        .update(problemData)
        .eq("id", editingProblem.id);
      
      if (error) {
        toast.error("Failed to update problem");
      } else {
        toast.success("Problem updated successfully");
        setIsDialogOpen(false);
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from("problems")
        .insert(problemData);
      
      if (error) {
        toast.error("Failed to create problem");
      } else {
        toast.success("Problem created successfully");
        setIsDialogOpen(false);
        fetchData();
      }
    }
    
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this problem?")) return;
    
    const { error } = await supabase
      .from("problems")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast.error("Failed to delete problem");
    } else {
      toast.success("Problem deleted successfully");
      fetchData();
    }
  };

  const addSample = () => {
    setFormData({
      ...formData,
      samples: [...formData.samples, { input: "", output: "", explanation: "" }],
    });
  };

  const addTestcase = () => {
    setFormData({
      ...formData,
      testcases: [...formData.testcases, { input: "", output: "" }],
    });
  };

  const updateSample = (index: number, field: string, value: string) => {
    const newSamples = [...formData.samples];
    newSamples[index] = { ...newSamples[index], [field]: value };
    setFormData({ ...formData, samples: newSamples });
  };

  const updateTestcase = (index: number, field: string, value: string) => {
    const newTestcases = [...formData.testcases];
    newTestcases[index] = { ...newTestcases[index], [field]: value };
    setFormData({ ...formData, testcases: newTestcases });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - PyChef</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">
                    Admin Panel
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Manage problems, users, and submissions
                </p>
              </div>
            </motion.div>

            <Tabs defaultValue="problems" className="space-y-6">
              <TabsList className="bg-secondary">
                <TabsTrigger value="problems" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Problems ({problems.length})
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users ({users.length})
                </TabsTrigger>
              </TabsList>

              {/* Problems Tab */}
              <TabsContent value="problems">
                <div className="flex justify-end mb-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="hero" onClick={() => handleOpenDialog()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Problem
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProblem ? "Edit Problem" : "Create Problem"}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                              }
                              placeholder="Two Sum"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Difficulty</Label>
                            <Select
                              value={formData.difficulty}
                              onValueChange={(value) =>
                                setFormData({ ...formData, difficulty: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Tags (comma-separated)</Label>
                          <Input
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            placeholder="Array, Hash Table, Dynamic Programming"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Problem Statement</Label>
                          <Textarea
                            value={formData.statement}
                            onChange={(e) =>
                              setFormData({ ...formData, statement: e.target.value })
                            }
                            placeholder="Given an array of integers..."
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Input Format</Label>
                            <Textarea
                              value={formData.input_format}
                              onChange={(e) =>
                                setFormData({ ...formData, input_format: e.target.value })
                              }
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Output Format</Label>
                            <Textarea
                              value={formData.output_format}
                              onChange={(e) =>
                                setFormData({ ...formData, output_format: e.target.value })
                              }
                              rows={2}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Constraints</Label>
                          <Textarea
                            value={formData.constraints}
                            onChange={(e) =>
                              setFormData({ ...formData, constraints: e.target.value })
                            }
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Sample Test Cases</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addSample}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {formData.samples.map((sample, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 p-3 bg-secondary rounded-lg">
                              <div>
                                <Label className="text-xs">Input</Label>
                                <Textarea
                                  value={sample.input}
                                  onChange={(e) => updateSample(index, "input", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Output</Label>
                                <Textarea
                                  value={sample.output}
                                  onChange={(e) => updateSample(index, "output", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Explanation</Label>
                                <Textarea
                                  value={sample.explanation || ""}
                                  onChange={(e) => updateSample(index, "explanation", e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Hidden Test Cases</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addTestcase}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {formData.testcases.map((testcase, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2 p-3 bg-secondary rounded-lg">
                              <div>
                                <Label className="text-xs">Input</Label>
                                <Textarea
                                  value={testcase.input}
                                  onChange={(e) => updateTestcase(index, "input", e.target.value)}
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Expected Output</Label>
                                <Textarea
                                  value={testcase.output}
                                  onChange={(e) => updateTestcase(index, "output", e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            variant="hero"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Problem
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Difficulty</div>
                    <div className="col-span-3">Tags</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 items-center"
                    >
                      <div className="col-span-5 font-medium text-foreground">
                        {problem.title}
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`text-sm font-medium ${
                            problem.difficulty === "Easy"
                              ? "difficulty-easy"
                              : problem.difficulty === "Medium"
                              ? "difficulty-medium"
                              : "difficulty-hard"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">
                        {problem.tags.slice(0, 2).join(", ")}
                      </div>
                      <div className="col-span-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(problem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(problem.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2">XP</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-4">User ID</div>
                  </div>
                  {users.map((profile) => (
                    <div
                      key={profile.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 items-center"
                    >
                      <div className="col-span-4 font-medium text-foreground">
                        {profile.name}
                      </div>
                      <div className="col-span-2 text-primary font-semibold">
                        {profile.xp.toLocaleString()}
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {profile.level}
                      </div>
                      <div className="col-span-4 text-xs text-muted-foreground font-mono">
                        {profile.user_id}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;
