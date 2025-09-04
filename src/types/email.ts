export interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  content: string;
  receivedAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  category: 'support' | 'billing' | 'technical' | 'general';
  status: 'unread' | 'read' | 'replied' | 'archived';
  contacts?: string[];
  requests?: string[];
  aiDraft?: string;
}

export interface EmailStats {
  total: number;
  unread: number;
  replied: number;
  avgResponseTime: string;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  urgencyBreakdown: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
}