import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Email } from '@/types/email';
import { X, Send, Wand2, Copy, RefreshCw } from 'lucide-react';

interface EmailComposerProps {
  email: Email;
  onClose: () => void;
  onSend: (content: string) => void;
}

export const EmailComposer = ({ email, onClose, onSend }: EmailComposerProps) => {
  const [content, setContent] = useState(email.aiDraft || '');
  const [activeTab, setActiveTab] = useState('compose');

  const handleSend = () => {
    onSend(content);
    onClose();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateDraft = () => {
    // Simulate AI draft regeneration
    const alternativeDrafts = [
      "Dear " + email.sender.name + ",\n\nThank you for reaching out. I understand your concern and I'm here to help resolve this matter promptly.\n\nLet me look into this immediately and get back to you within the hour with a solution.\n\nBest regards,\nSupport Team",
      "Hi " + email.sender.name + ",\n\nI appreciate you bringing this to our attention. Your feedback is valuable and helps us improve our service.\n\nI'm escalating this to the appropriate team and will ensure you receive a comprehensive response soon.\n\nThank you for your patience.\n\nBest regards,\nSupport Team"
    ];
    
    const randomDraft = alternativeDrafts[Math.floor(Math.random() * alternativeDrafts.length)];
    setContent(randomDraft);
  };

  return (
    <Card className="h-[400px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-foreground">Reply to {email.sender.name}</h3>
          <Badge variant="outline" className="text-xs">
            Re: {email.subject}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="ai-draft">AI Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="flex-1 p-4 pt-2">
            <div className="h-full flex flex-col">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your reply..."
                className="flex-1 resize-none min-h-[200px]"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={regenerateDraft}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate AI Draft
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(content)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSend} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-draft" className="flex-1 p-4 pt-2">
            <div className="h-full flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <Wand2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">AI-Generated Draft</span>
                <Badge variant="secondary" className="text-xs">
                  {email.sentiment === 'negative' ? 'Empathetic' : 
                   email.sentiment === 'positive' ? 'Appreciative' : 'Professional'}
                </Badge>
              </div>
              
              <div className="flex-1 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed h-full overflow-y-auto">
                  {email.aiDraft}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setContent(email.aiDraft || '')}>
                    <Copy className="w-4 h-4 mr-2" />
                    Use This Draft
                  </Button>
                  <Button variant="outline" size="sm" onClick={regenerateDraft}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                <Button onClick={() => setActiveTab('compose')} variant="outline">
                  Edit Draft
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};