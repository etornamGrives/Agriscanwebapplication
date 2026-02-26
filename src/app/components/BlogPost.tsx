import { ThumbsUp, ThumbsDown, MessageCircle, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { BlogPost as BlogPostType } from '../utils/mockData';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostProps {
  post: BlogPostType;
  onVote: (postId: string, vote: 'up' | 'down') => void;
  onComment: (postId: string, comment: string) => void;
}

export function BlogPost({ post, onVote, onComment }: BlogPostProps) {
  const { isAuthenticated, user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleVote = (vote: 'up' | 'down') => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    onVote(post.id, vote);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      setTimeout(() => setShowAuthPrompt(false), 3000);
      return;
    }
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const hasVoted = post.userVote;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square bg-secondary">
        <img
          src={post.image}
          alt={post.plantName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              hasVoted === 'up'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{post.upvotes}</span>
          </button>

          <button
            onClick={() => handleVote('down')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              hasVoted === 'down'
                ? 'bg-destructive text-destructive-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            <span>{post.downvotes}</span>
          </button>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                setShowAuthPrompt(true);
                setTimeout(() => setShowAuthPrompt(false), 3000);
                return;
              }
              setShowComments(!showComments);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
        </div>

        {/* Auth Prompt */}
        <AnimatePresence>
          {showAuthPrompt && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary"
            >
              Please <a href="/login" className="underline font-medium">log in</a> to interact with posts
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post Content */}
        <div className="space-y-2 mb-4">
          <div>
            <span className="font-medium text-primary">{post.plantName}</span>
            {' • '}
            <span className="text-destructive">{post.diagnosis}</span>
          </div>
          <p className="text-muted-foreground">{post.content}</p>
          
          {post.remedies.length > 0 && (
            <div className="mt-3 p-4 bg-secondary rounded-lg">
              <h4 className="font-medium mb-2">Recommended Remedies:</h4>
              <ul className="space-y-1">
                {post.remedies.map((remedy, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* Existing Comments */}
              {post.comments.length > 0 && (
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 bg-secondary rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Form */}
              {isAuthenticated && (
                <form onSubmit={handleComment} className="flex gap-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
