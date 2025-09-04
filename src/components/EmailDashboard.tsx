import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { EmailComposer } from './EmailComposer';
import { Analytics } from './Analytics';
import { Email } from '@/types/email';
import { mockEmails, mockStats } from '@/data/mockEmails';
import { Mail, BarChart3, Settings, Search, Filter } from 'lucide-react';

export const EmailDashboard = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('emails');

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSentiment = filterSentiment === 'all' || email.sentiment === filterSentiment;
    const matchesUrgency = filterUrgency === 'all' || email.urgency === filterUrgency;
    
    return matchesSearch && matchesSentiment && matchesUrgency;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-positive';
      case 'negative': return 'bg-negative';
      default: return 'bg-neutral';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-urgent text-urgent-foreground';
      case 'high': return 'bg-high text-high-foreground';
      case 'medium': return 'bg-medium text-medium-foreground';
      default: return 'bg-low text-low-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  EmailAI
                </h1>
              </div>
              <Badge variant="secondary" className="ml-4">
                {mockStats.unread} Unread
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="emails" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Emails</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emails" className="mt-6">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
              {/* Filters & Email List */}
              <div className="col-span-4">
                <Card className="p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Filters</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sentiment</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Urgency</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
                <EmailList
                  emails={filteredEmails}
                  selectedEmail={selectedEmail}
                  onSelectEmail={setSelectedEmail}
                  getSentimentColor={getSentimentColor}
                  getUrgencyColor={getUrgencyColor}
                />
              </div>

              {/* Email Detail & Composer */}
              <div className="col-span-8">
                {selectedEmail ? (
                  <div className="space-y-4">
                    <EmailDetail 
                      email={selectedEmail} 
                      onReply={() => setIsComposerOpen(true)}
                      getSentimentColor={getSentimentColor}
                      getUrgencyColor={getUrgencyColor}
                    />
                    {isComposerOpen && (
                      <EmailComposer
                        email={selectedEmail}
                        onClose={() => setIsComposerOpen(false)}
                        onSend={() => {
                          setIsComposerOpen(false);
                          // Handle send logic
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground">
                        Select an email to view details
                      </h3>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Analytics stats={mockStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};