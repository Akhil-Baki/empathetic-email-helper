import { Email, EmailStats } from '@/types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'URGENT: Website completely down, losing customers!',
    sender: { name: 'Sarah Johnson', email: 'sarah.j@techcorp.com' },
    content: 'Hi there, our entire website has been down for over 2 hours now. We\'re losing customers and revenue by the minute. This is absolutely critical and needs immediate attention. Can someone please help us ASAP?',
    receivedAt: '2024-01-15T14:30:00Z',
    sentiment: 'negative',
    urgency: 'urgent',
    category: 'technical',
    status: 'unread',
    contacts: ['Sarah Johnson', 'Tech Corp'],
    requests: ['Website restoration', 'Technical support'],
    aiDraft: 'Dear Sarah,\n\nI understand how critical this situation is and I sincerely apologize for the downtime you\'re experiencing. Let me immediately escalate this to our technical team.\n\nI\'ve already alerted our senior engineers and they are investigating the issue with highest priority. I\'ll keep you updated every 15 minutes until resolution.\n\nThank you for your patience during this critical time.\n\nBest regards,\nSupport Team'
  },
  {
    id: '2',
    subject: 'Thank you for the excellent service!',
    sender: { name: 'Mike Chen', email: 'mike@startuplife.io' },
    content: 'I just wanted to reach out and thank you for the amazing support you provided last week. The team went above and beyond to help us resolve our integration issues. Truly outstanding service!',
    receivedAt: '2024-01-15T12:15:00Z',
    sentiment: 'positive',
    urgency: 'low',
    category: 'support',
    status: 'read',
    contacts: ['Mike Chen', 'StartupLife'],
    requests: ['Feedback acknowledgment'],
    aiDraft: 'Dear Mike,\n\nThank you so much for taking the time to share this wonderful feedback! It absolutely made our day.\n\nI\'ll be sure to pass along your kind words to the team members who assisted you. We take great pride in providing exceptional support, and knowing that we exceeded your expectations is incredibly rewarding.\n\nPlease don\'t hesitate to reach out if you need any assistance in the future.\n\nWarm regards,\nSupport Team'
  },
  {
    id: '3',
    subject: 'Billing discrepancy in latest invoice',
    sender: { name: 'Jennifer Martinez', email: 'j.martinez@globalfinance.com' },
    content: 'Hello, I noticed there seems to be a discrepancy in our latest invoice (#INV-2024-0156). We were charged for the Enterprise plan but we should be on the Professional plan. Could you please review and correct this?',
    receivedAt: '2024-01-15T11:45:00Z',
    sentiment: 'neutral',
    urgency: 'medium',
    category: 'billing',
    status: 'unread',
    contacts: ['Jennifer Martinez', 'Global Finance'],
    requests: ['Invoice correction', 'Plan verification'],
    aiDraft: 'Dear Jennifer,\n\nThank you for bringing this billing discrepancy to our attention. I apologize for any confusion this may have caused.\n\nI\'ve reviewed your account and can see that you should indeed be on the Professional plan. I\'m immediately processing a correction to invoice #INV-2024-0156 and will issue a credit for the difference.\n\nYou should receive the corrected invoice within 24 hours. Is there anything else I can help clarify regarding your billing?\n\nBest regards,\nSupport Team'
  },
  {
    id: '4',
    subject: 'Feature request: Dark mode support',
    sender: { name: 'Alex Thompson', email: 'alex.t@designstudio.net' },
    content: 'Hi team! Love the platform so far. Would it be possible to add dark mode support? Many of our designers work late hours and would really appreciate this feature. Keep up the great work!',
    receivedAt: '2024-01-15T10:20:00Z',
    sentiment: 'positive',
    urgency: 'low',
    category: 'general',
    status: 'read',
    contacts: ['Alex Thompson', 'Design Studio'],
    requests: ['Dark mode feature', 'Product enhancement'],
    aiDraft: 'Hi Alex,\n\nThank you for the positive feedback and for sharing this feature request!\n\nDark mode support is actually something we\'ve been considering, and your input helps us prioritize our development roadmap. I\'ll make sure to add your request to our feature backlog and share it with our product team.\n\nWhile I can\'t provide a specific timeline, we do listen closely to user feedback when planning new features. I\'ll keep you updated on any progress!\n\nThanks again for being such an engaged user.\n\nBest regards,\nSupport Team'
  },
  {
    id: '5',
    subject: 'Data export not working - need help urgently',
    sender: { name: 'Robert Kim', email: 'rkim@dataanalytics.co' },
    content: 'We\'re trying to export our monthly analytics data but the export function keeps failing. We have a board meeting tomorrow and need this data. Can someone help us resolve this quickly?',
    receivedAt: '2024-01-15T09:10:00Z',
    sentiment: 'negative',
    urgency: 'high',
    category: 'technical',
    status: 'replied',
    contacts: ['Robert Kim', 'Data Analytics Co'],
    requests: ['Data export fix', 'Technical troubleshooting'],
    aiDraft: 'Dear Robert,\n\nI understand the urgency of your situation with the board meeting tomorrow, and I\'m here to help you resolve this export issue immediately.\n\nI\'ve escalated this to our technical team who are investigating the export functionality. In the meantime, I\'d like to try a few troubleshooting steps with you:\n\n1. Clear your browser cache\n2. Try using an incognito window\n3. If possible, try a different browser\n\nIf none of these work, I can manually generate the export for you within the next hour. Would that work for your timeline?\n\nI\'ll stay available until we get this resolved for you.\n\nBest regards,\nSupport Team'
  }
];

export const mockStats: EmailStats = {
  total: 147,
  unread: 23,
  replied: 98,
  avgResponseTime: '2.3 hours',
  sentimentBreakdown: {
    positive: 45,
    neutral: 62,
    negative: 40
  },
  urgencyBreakdown: {
    low: 56,
    medium: 48,
    high: 28,
    urgent: 15
  }
};