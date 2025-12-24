-- Achievements table for defining all possible achievements
CREATE TABLE public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  category TEXT NOT NULL DEFAULT 'general',
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User achievements table for tracking which users earned which achievements
CREATE TABLE public.user_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  achievement_id uuid NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Problem hints table for storing progressive hints
CREATE TABLE public.problem_hints (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id uuid NOT NULL REFERENCES public.problems(id) ON DELETE CASCADE,
  hint_order INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  xp_cost INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(problem_id, hint_order)
);

-- User viewed hints to track which hints users have unlocked
CREATE TABLE public.user_hint_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  hint_id uuid NOT NULL REFERENCES public.problem_hints(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hint_id)
);

-- User code templates table
CREATE TABLE public.user_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'python',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hint_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_templates ENABLE ROW LEVEL SECURITY;

-- Achievements policies - anyone can view, admins can manage
CREATE POLICY "Anyone can view achievements"
ON public.achievements FOR SELECT
USING (true);

CREATE POLICY "Admins can manage achievements"
ON public.achievements FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- User achievements policies
CREATE POLICY "Users can view all user achievements"
ON public.user_achievements FOR SELECT
USING (true);

CREATE POLICY "System can insert user achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Problem hints policies
CREATE POLICY "Anyone can view problem hints"
ON public.problem_hints FOR SELECT
USING (true);

CREATE POLICY "Admins can manage hints"
ON public.problem_hints FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- User hint views policies
CREATE POLICY "Users can view their own hint views"
ON public.user_hint_views FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own hint views"
ON public.user_hint_views FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- User templates policies
CREATE POLICY "Users can view their own templates"
ON public.user_templates FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates"
ON public.user_templates FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
ON public.user_templates FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
ON public.user_templates FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updating user_templates updated_at
CREATE TRIGGER update_user_templates_updated_at
BEFORE UPDATE ON public.user_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (key, name, description, icon, category, xp_reward) VALUES
('first_submission', 'First Steps', 'Submit your first solution', 'rocket', 'milestones', 10),
('first_accepted', 'First Blood', 'Get your first accepted solution', 'check-circle', 'milestones', 25),
('solve_5', 'Getting Started', 'Solve 5 problems', 'star', 'progress', 50),
('solve_10', 'Problem Solver', 'Solve 10 problems', 'award', 'progress', 100),
('solve_25', 'Dedicated Coder', 'Solve 25 problems', 'trophy', 'progress', 250),
('solve_50', 'Algorithm Master', 'Solve 50 problems', 'crown', 'progress', 500),
('streak_3', 'Consistent', 'Maintain a 3-day streak', 'flame', 'streaks', 30),
('streak_7', 'Streak Master', 'Maintain a 7-day streak', 'flame', 'streaks', 75),
('streak_30', 'Unstoppable', 'Maintain a 30-day streak', 'flame', 'streaks', 300),
('easy_master', 'Easy Peasy', 'Solve all easy problems', 'zap', 'mastery', 100),
('speed_demon', 'Speed Demon', 'Solve a problem in under 5 minutes', 'timer', 'special', 50),
('night_owl', 'Night Owl', 'Submit a solution after midnight', 'moon', 'special', 25),
('early_bird', 'Early Bird', 'Submit a solution before 6 AM', 'sunrise', 'special', 25);