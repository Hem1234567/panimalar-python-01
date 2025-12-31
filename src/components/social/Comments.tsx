import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Trash2, Reply, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  profile?: {
    name: string;
  };
}

interface CommentsProps {
  problemId: string;
}

const Comments = ({ problemId }: CommentsProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    
    const { data: commentsData } = await supabase
      .from("problem_comments")
      .select("*")
      .eq("problem_id", problemId)
      .order("created_at", { ascending: true });

    if (commentsData) {
      // Fetch profiles for all unique user IDs
      const userIds = [...new Set(commentsData.map(c => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      
      const commentsWithProfiles = commentsData.map(c => ({
        ...c,
        profile: profileMap.get(c.user_id),
      }));

      setComments(commentsWithProfiles);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, problemId]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("problem_comments")
        .insert({
          user_id: user.id,
          problem_id: problemId,
          content: newComment.trim(),
          parent_id: replyingTo,
        });

      if (error) throw error;

      setNewComment("");
      setReplyingTo(null);
      await fetchComments();
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from("problem_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      await fetchComments();
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  // Group comments by parent
  const rootComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Discussion</span>
          {comments.length > 0 && (
            <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discussion ({comments.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col h-[calc(100vh-180px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {rootComments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No comments yet</p>
                    <p className="text-sm">Be the first to start the discussion!</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {rootComments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <CommentItem
                          comment={comment}
                          user={user}
                          onReply={() => setReplyingTo(comment.id)}
                          onDelete={() => handleDelete(comment.id)}
                        />
                        {/* Replies */}
                        <div className="ml-8 space-y-2">
                          {getReplies(comment.id).map((reply) => (
                            <CommentItem
                              key={reply.id}
                              comment={reply}
                              user={user}
                              isReply
                              onDelete={() => handleDelete(reply.id)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </ScrollArea>
          )}

          {/* Comment input */}
          <div className="pt-4 border-t border-border mt-4">
            {replyingTo && (
              <div className="flex items-center justify-between mb-2 px-2 py-1 bg-secondary/50 rounded text-sm">
                <span className="text-muted-foreground">Replying to comment...</span>
                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={user ? "Write a comment..." : "Log in to comment"}
                disabled={!user || isSubmitting}
                className="min-h-[80px] resize-none"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!user || isSubmitting || !newComment.trim()}
              className="w-full mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Post Comment
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface CommentItemProps {
  comment: Comment;
  user: any;
  isReply?: boolean;
  onReply?: () => void;
  onDelete: () => void;
}

const CommentItem = ({ comment, user, isReply, onReply, onDelete }: CommentItemProps) => {
  return (
    <div className={`p-3 rounded-lg bg-card border border-border ${isReply ? "bg-secondary/30" : ""}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/20 text-primary text-xs">
            {comment.profile?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-foreground">
              {comment.profile?.name || "Unknown User"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="flex gap-2 mt-2">
            {!isReply && onReply && (
              <Button variant="ghost" size="sm" onClick={onReply} className="h-7 text-xs">
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            {user?.id === comment.user_id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-7 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
