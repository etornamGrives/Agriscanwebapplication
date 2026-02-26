import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Leaf, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { BlogPost } from '../components/BlogPost';
import { useAuth } from '../contexts/AuthContext';
import { getBlogPosts, updateBlogPost, BlogPost as BlogPostType, Comment } from '../utils/mockData';

export function Blog() {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const loadedPosts = getBlogPosts();
    setPosts(loadedPosts);
  };

  const handleVote = (postId: string, vote: 'up' | 'down') => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;

        const currentVote = post.userVote;
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newUserVote: 'up' | 'down' | null = vote;

        // Remove previous vote if exists
        if (currentVote === 'up') {
          newUpvotes--;
        } else if (currentVote === 'down') {
          newDownvotes--;
        }

        // Add new vote or toggle off
        if (currentVote === vote) {
          newUserVote = null;
        } else {
          if (vote === 'up') {
            newUpvotes++;
          } else {
            newDownvotes++;
          }
        }

        const updatedPost = {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };

        updateBlogPost(postId, updatedPost);
        return updatedPost;
      })
    );
  };

  const handleComment = (postId: string, commentText: string) => {
    if (!user) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || ''
      },
      content: commentText,
      createdAt: new Date()
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;

        const updatedPost = {
          ...post,
          comments: [...post.comments, newComment]
        };

        updateBlogPost(postId, updatedPost);
        return updatedPost;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      {/* Header */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Community Insights</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl mb-4">
              Agricultural
              <span className="text-primary"> Community</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Share your discoveries, learn from others, and grow together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Create Post Button (for authenticated users) */}
      {isAuthenticated && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          <Link
            to="/create-post"
            className="flex items-center justify-center gap-2 w-full p-4 bg-white border border-border rounded-2xl hover:border-primary/20 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Share your plant diagnosis...
            </span>
          </Link>
        </div>
      )}

      {/* Posts Feed */}
      <section className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl mb-2">No posts yet</h3>
                <p className="text-muted-foreground">
                  {isAuthenticated
                    ? 'Be the first to share your plant diagnosis!'
                    : 'Log in to start sharing your discoveries'}
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <BlogPost
                  key={post.id}
                  post={post}
                  onVote={handleVote}
                  onComment={handleComment}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
