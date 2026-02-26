import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { saveBlogPost, BlogPost as BlogPostType } from '../utils/mockData';
import { toast } from 'sonner';

export function CreatePost() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    plantName: '',
    diagnosis: '',
    content: '',
    image: '',
    remedies: ['']
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if there's draft data from scan results
    const draftData = sessionStorage.getItem('postDraft');
    if (draftData) {
      const draft = JSON.parse(draftData);
      setFormData({
        plantName: draft.plantName || '',
        diagnosis: draft.diagnosis || '',
        content: '',
        image: draft.image || '',
        remedies: draft.remedies || ['']
      });
      sessionStorage.removeItem('postDraft');
    }
  }, [isAuthenticated, navigate]);

  const handleRemedyChange = (index: number, value: string) => {
    const newRemedies = [...formData.remedies];
    newRemedies[index] = value;
    setFormData({ ...formData, remedies: newRemedies });
  };

  const addRemedy = () => {
    setFormData({ ...formData, remedies: [...formData.remedies, ''] });
  };

  const removeRemedy = (index: number) => {
    const newRemedies = formData.remedies.filter((_, i) => i !== index);
    setFormData({ ...formData, remedies: newRemedies });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const newPost: BlogPostType = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || ''
      },
      plantName: formData.plantName,
      diagnosis: formData.diagnosis,
      image: formData.image,
      content: formData.content,
      remedies: formData.remedies.filter(r => r.trim() !== ''),
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date()
    };

    saveBlogPost(newPost);
    toast.success('Post published successfully!');

    setTimeout(() => {
      navigate('/blog');
    }, 1000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="bg-white rounded-2xl p-8 border border-border">
            <h1 className="text-3xl mb-2">Create Blog Post</h1>
            <p className="text-muted-foreground mb-8">
              Share your plant diagnosis with the community
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Preview */}
              {formData.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={formData.image}
                    alt="Post"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="plantName" className="block mb-2">
                    Plant Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="plantName"
                    value={formData.plantName}
                    onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Tomato Plant"
                  />
                </div>

                <div>
                  <label htmlFor="diagnosis" className="block mb-2">
                    Diagnosis <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Nitrogen Deficiency"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block mb-2">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Describe what you observed, symptoms, and your experience..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label>Remedies</label>
                  <button
                    type="button"
                    onClick={addRemedy}
                    className="text-sm text-primary hover:underline"
                  >
                    + Add Remedy
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.remedies.map((remedy, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={remedy}
                        onChange={(e) => handleRemedyChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={`Remedy ${index + 1}`}
                      />
                      {formData.remedies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRemedy(index)}
                          className="px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Publish Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}