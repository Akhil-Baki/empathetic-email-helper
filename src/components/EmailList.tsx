import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Email } from '@/types/email';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
  getSentimentColor: (sentiment: string) => string;
  getUrgencyColor: (urgency: string) => string;
}

export const EmailList = ({ 
  emails, 
  selectedEmail, 
  onSelectEmail, 
  getSentimentColor, 
  getUrgencyColor 
}: EmailListProps) => {
  return (
    <div className="space-y-2 h-[600px] overflow-y-auto">
      {emails.map((email) => (
        <Card
          key={email.id}
          className={cn(
            "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
            selectedEmail?.id === email.id 
              ? "ring-2 ring-primary bg-primary/5 border-l-primary" 
              : "hover:bg-muted/50 border-l-transparent",
            email.status === 'unread' && "bg-card font-medium"
          )}
          onClick={() => onSelectEmail(email)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-sm truncate text-foreground">
                  {email.sender.name}
                </h3>
                <div className={cn("w-2 h-2 rounded-full", getSentimentColor(email.sentiment))} />
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {email.sender.email}
              </p>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              <Badge 
                variant="secondary" 
                className={cn("text-xs px-2 py-0", getUrgencyColor(email.urgency))}
              >
                {email.urgency}
              </Badge>
            </div>
          </div>
          
          <h4 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
            {email.subject}
          </h4>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {email.content}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {email.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(email.receivedAt), { addSuffix: true })}
            </span>
          </div>

          {email.status === 'unread' && (
            <div className="absolute right-2 top-2 w-2 h-2 bg-primary rounded-full" />
          )}
        </Card>
      ))}
      
      {emails.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No emails match your current filters
        </div>
      )}
    </div>
  );
};