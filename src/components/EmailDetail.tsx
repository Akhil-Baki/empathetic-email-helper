import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Email } from '@/types/email';
import { formatDistanceToNow, format } from 'date-fns';
import { Reply, Archive, Trash2, Star, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailDetailProps {
  email: Email;
  onReply: () => void;
  getSentimentColor: (sentiment: string) => string;
  getUrgencyColor: (urgency: string) => string;
}

export const EmailDetail = ({ 
  email, 
  onReply, 
  getSentimentColor, 
  getUrgencyColor 
}: EmailDetailProps) => {
  return (
    <Card className="h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-2 text-foreground">
              {email.subject}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>From: <strong>{email.sender.name}</strong> ({email.sender.email})</span>
              <span>•</span>
              <span>{format(new Date(email.receivedAt), 'MMM d, yyyy \'at\' h:mm a')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={cn("px-3 py-1", getUrgencyColor(email.urgency))}
            >
              {email.urgency}
            </Badge>
            <div className={cn("w-3 h-3 rounded-full", getSentimentColor(email.sentiment))} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button onClick={onReply} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Star
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {email.content}
          </div>
        </div>

        <Separator className="my-6" />

        {/* AI Analysis */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">AI Analysis</h3>
          
          {email.contacts && email.contacts.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Extracted Contacts</h4>
              <div className="flex flex-wrap gap-2">
                {email.contacts.map((contact, index) => (
                  <Badge key={index} variant="outline">{contact}</Badge>
                ))}
              </div>
            </div>
          )}

          {email.requests && email.requests.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Requests</h4>
              <div className="flex flex-wrap gap-2">
                {email.requests.map((request, index) => (
                  <Badge key={index} variant="secondary">{request}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Sentiment</div>
              <div className={cn("font-medium capitalize", 
                email.sentiment === 'positive' ? 'text-positive' : 
                email.sentiment === 'negative' ? 'text-negative' : 'text-neutral'
              )}>
                {email.sentiment}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Category</div>
              <div className="font-medium capitalize text-foreground">{email.category}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium capitalize text-foreground">{email.status}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};