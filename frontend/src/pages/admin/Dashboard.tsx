import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Mail, MailOpen, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/dashboard/dashboard-layout';

interface Stats {
  total: number;
  unread: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('id, read_at');

        if (error) throw error;

        const total = data?.length || 0;
        const unread = data?.filter((m) => !m.read_at).length || 0;
        setStats({ total, unread });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Messages',
      value: stats.total,
      icon: Mail,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Unread Messages',
      value: stats.unread,
      icon: MailOpen,
      color: 'bg-accent/10 text-accent',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your contact form submissions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {isLoading ? '...' : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              to="/admin/messages"
              className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">View All Messages</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.unread > 0
                      ? `You have ${stats.unread} unread message${stats.unread > 1 ? 's' : ''}`
                      : 'All messages are read'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
