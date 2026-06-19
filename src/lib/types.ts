export interface Registration {
  id: string;
  team_name: string;
  p1_name: string;
  p1_surname: string;
  p2_name: string;
  p2_surname: string;
  email: string;
  level: string;
  phone: string;
  payment: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  image_url?: string;
}

export interface TournamentState {
  is_drawn: boolean;
  bracket: any;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  giornata: string;
  created_at: string;
}
