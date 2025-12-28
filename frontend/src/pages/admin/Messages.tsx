import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/dashboard/dashboard-layout';
import MessageCard from '@/components/dashboard/admin/message-card';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_at: string | null;
}

type FilterType = 'all' | 'unread' | 'read';

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error('Error', {
        description: 'Failed to load messages',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read_at: read ? new Date().toISOString() : null })
        .eq('id', id);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, read_at: read ? new Date().toISOString() : null }
            : m
        )
      );
    } catch (err) {
      console.error('Error updating message:', err);
      toast.error('Error', {
        description: 'Failed to update message',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted', {
        description: 'The message has been removed.',
      });
    } catch (err) {
      console.error('Error deleting message:', err);
      toast.error('Error', {
        description: 'Failed to delete message',
      });
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && !m.read_at) ||
      (filter === 'read' && m.read_at);

    return matchesSearch && matchesFilter;
  });

  const filterButtons: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Manage contact form submissions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {filterButtons.map((btn) => (
              <Button
                key={btn.value}
                variant={filter === btn.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(btn.value)}
                className={cn(
                  filter === btn.value && 'gradient-bg text-primary-foreground'
                )}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="p-4 bg-secondary rounded-full w-fit mx-auto mb-4">
              <Mail className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">No messages found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filter !== 'all'
                ? 'Try adjusting your search or filter'
                : 'New messages will appear here'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Messages;
