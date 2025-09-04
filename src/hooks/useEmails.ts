import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Email } from '@/types/email';
import { useAuth } from './useAuth';

export const useEmails = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchEmails = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('user_id', user.id)
        .order('received_at', { ascending: false });

      if (error) throw error;

      const formattedEmails: Email[] = data.map(email => ({
        id: email.id,
        subject: email.subject,
        sender: {
          name: email.sender_name,
          email: email.sender_email
        },
        content: email.content,
        receivedAt: email.received_at,
        sentiment: email.sentiment as 'positive' | 'neutral' | 'negative',
        urgency: email.urgency as 'low' | 'medium' | 'high' | 'urgent',
        category: email.category as 'support' | 'billing' | 'technical' | 'general',
        status: email.status as 'unread' | 'read' | 'replied' | 'archived',
        contacts: email.contacts || [],
        requests: email.requests || [],
        aiDraft: email.ai_draft
      }));

      setEmails(formattedEmails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async (emailId: string, updates: Partial<Email>) => {
    if (!user) return;

    try {
      const dbUpdates: any = {};
      
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.aiDraft !== undefined) dbUpdates.ai_draft = updates.aiDraft;

      const { error } = await supabase
        .from('emails')
        .update(dbUpdates)
        .eq('id', emailId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setEmails(prev => 
        prev.map(email => 
          email.id === emailId ? { ...email, ...updates } : email
        )
      );
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [user]);

  return {
    emails,
    loading,
    fetchEmails,
    updateEmail
  };
};