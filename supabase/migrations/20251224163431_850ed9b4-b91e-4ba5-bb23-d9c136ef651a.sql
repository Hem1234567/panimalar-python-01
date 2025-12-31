-- Problem difficulty votes table
CREATE TABLE public.difficulty_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  perceived_difficulty TEXT NOT NULL CHECK (perceived_difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- User follows table
CREATE TABLE public.follows (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid NOT NULL,
  following_id uuid NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Shared solutions table
CREATE TABLE public.shared_solutions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  submission_id uuid NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Solution likes table
CREATE TABLE public.solution_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  solution_id uuid NOT NULL REFERENCES public.shared_solutions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, solution_id)
);

-- Problem comments table
CREATE TABLE public.problem_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.problem_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Daily challenges table
CREATE TABLE public.daily_challenges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL UNIQUE,
  bonus_xp INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User daily challenge completions
CREATE TABLE public.daily_challenge_completions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS on all tables
ALTER TABLE public.difficulty_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenge_completions ENABLE ROW LEVEL SECURITY;

-- Difficulty votes policies
CREATE POLICY "Anyone can view difficulty votes"
ON public.difficulty_votes FOR SELECT USING (true);

CREATE POLICY "Users can insert their own votes"
ON public.difficulty_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
ON public.difficulty_votes FOR UPDATE
USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Anyone can view follows"
ON public.follows FOR SELECT USING (true);

CREATE POLICY "Users can follow others"
ON public.follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
ON public.follows FOR DELETE
USING (auth.uid() = follower_id);

-- Shared solutions policies
CREATE POLICY "Anyone can view public solutions"
ON public.shared_solutions FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create solutions"
ON public.shared_solutions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their solutions"
ON public.shared_solutions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their solutions"
ON public.shared_solutions FOR DELETE
USING (auth.uid() = user_id);

-- Solution likes policies
CREATE POLICY "Anyone can view likes"
ON public.solution_likes FOR SELECT USING (true);

CREATE POLICY "Users can like solutions"
ON public.solution_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike solutions"
ON public.solution_likes FOR DELETE
USING (auth.uid() = user_id);

-- Problem comments policies
CREATE POLICY "Anyone can view comments"
ON public.problem_comments FOR SELECT USING (true);

CREATE POLICY "Users can create comments"
ON public.problem_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their comments"
ON public.problem_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their comments"
ON public.problem_comments FOR DELETE
USING (auth.uid() = user_id);

-- Daily challenges policies
CREATE POLICY "Anyone can view daily challenges"
ON public.daily_challenges FOR SELECT USING (true);

CREATE POLICY "Admins can manage daily challenges"
ON public.daily_challenges FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Daily challenge completions policies
CREATE POLICY "Anyone can view completions"
ON public.daily_challenge_completions FOR SELECT USING (true);

CREATE POLICY "Users can insert their completions"
ON public.daily_challenge_completions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_shared_solutions_updated_at
BEFORE UPDATE ON public.shared_solutions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_problem_comments_updated_at
BEFORE UPDATE ON public.problem_comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update solution likes count
CREATE OR REPLACE FUNCTION public.update_solution_likes_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.shared_solutions 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.solution_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.shared_solutions 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.solution_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER on_solution_like_change
AFTER INSERT OR DELETE ON public.solution_likes
FOR EACH ROW EXECUTE FUNCTION public.update_solution_likes_count();