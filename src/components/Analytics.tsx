import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmailStats } from '@/types/email';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Timer
} from 'lucide-react';

interface AnalyticsProps {
  stats: EmailStats;
}

export const Analytics = ({ stats }: AnalyticsProps) => {
  const sentimentData = [
    { name: 'Positive', value: stats.sentimentBreakdown.positive, color: 'hsl(var(--positive))' },
    { name: 'Neutral', value: stats.sentimentBreakdown.neutral, color: 'hsl(var(--neutral))' },
    { name: 'Negative', value: stats.sentimentBreakdown.negative, color: 'hsl(var(--negative))' }
  ];

  const urgencyData = [
    { name: 'Low', value: stats.urgencyBreakdown.low, color: 'hsl(var(--low))' },
    { name: 'Medium', value: stats.urgencyBreakdown.medium, color: 'hsl(var(--medium))' },
    { name: 'High', value: stats.urgencyBreakdown.high, color: 'hsl(var(--high))' },
    { name: 'Urgent', value: stats.urgencyBreakdown.urgent, color: 'hsl(var(--urgent))' }
  ];

  const performanceData = [
    { name: 'Mon', emails: 28, responses: 25 },
    { name: 'Tue', emails: 35, responses: 32 },
    { name: 'Wed', emails: 22, responses: 20 },
    { name: 'Thu', emails: 31, responses: 29 },
    { name: 'Fri', emails: 24, responses: 22 },
    { name: 'Sat', emails: 15, responses: 12 },
    { name: 'Sun', emails: 18, responses: 16 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Emails</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold text-foreground">{stats.unread}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Replied</p>
              <p className="text-2xl font-bold text-foreground">{stats.replied}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
              <p className="text-2xl font-bold text-foreground">{stats.avgResponseTime}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Sentiment Analysis</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {sentimentData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Urgency Distribution */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Timer className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Urgency Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={urgencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {urgencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="emails" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Emails Received"
              />
              <Bar 
                dataKey="responses" 
                fill="hsl(var(--accent))" 
                radius={[4, 4, 0, 0]}
                name="Responses Sent"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Emails Received</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Responses Sent</span>
          </div>
        </div>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Response Rate</p>
              <p className="text-xl font-bold text-foreground">
                {Math.round((stats.replied / stats.total) * 100)}%
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success">
            +5% from last week
          </Badge>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Contacts</p>
              <p className="text-xl font-bold text-foreground">89</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            +12 new this week
          </Badge>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Urgent Emails</p>
              <p className="text-xl font-bold text-foreground">{stats.urgencyBreakdown.urgent}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-warning/10 text-warning">
            -3 from yesterday
          </Badge>
        </Card>
      </div>
    </div>
  );
};