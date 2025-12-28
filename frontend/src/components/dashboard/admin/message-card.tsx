import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen, Trash2, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read_at: string | null;
}

interface MessageCardProps {
  message: Message;
  onMarkRead: (id: string, read: boolean) => void;
  onDelete: (id: string) => void;
}

const MessageCard = ({ message, onMarkRead, onDelete }: MessageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isRead = !!message.read_at;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'bg-card border rounded-xl p-4 transition-all',
        isRead ? 'border-border' : 'border-primary/50 bg-primary/5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={cn(
              'p-2 rounded-lg shrink-0',
              isRead ? 'bg-secondary' : 'bg-primary/10'
            )}
          >
            {isRead ? (
              <MailOpen className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Mail className="w-4 h-4 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={cn('font-semibold', !isRead && 'text-primary')}>
                {message.name}
              </h3>
              {!isRead && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            <a
              href={`mailto:${message.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              {message.email}
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkRead(message.id, !isRead)}
            title={isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {isRead ? (
              <Mail className="w-4 h-4" />
            ) : (
              <MailOpen className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(message.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <p
          className={cn(
            'text-sm text-foreground/80 whitespace-pre-wrap',
            !isExpanded && 'line-clamp-2'
          )}
        >
          {message.message}
        </p>
        {message.message.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:underline mt-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MessageCard;
