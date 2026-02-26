// Mock data utilities for the application

export interface BlogPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  plantName: string;
  diagnosis: string;
  image: string;
  content: string;
  remedies: string[];
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  createdAt: Date;
  userVote?: 'up' | 'down' | null;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
}

export interface ScanHistory {
  id: string;
  plantName: string;
  diagnosis: string;
  image: string;
  remedies: string[];
  createdAt: Date;
  postedAsBlog: boolean;
}

// Initialize mock data
export function initializeMockData() {
  if (!localStorage.getItem('blogPosts')) {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        author: {
          id: 'mock1',
          name: 'Sarah Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
        },
        plantName: 'Tomato Plant',
        diagnosis: 'Nitrogen Deficiency',
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=800&fit=crop',
        content: 'Noticed my tomato plants showing yellowing of lower leaves. After scanning, diagnosed with nitrogen deficiency. The leaves were pale green to yellow, starting from the bottom.',
        remedies: [
          'Apply nitrogen-rich fertilizer (10-5-5 NPK ratio)',
          'Add compost or aged manure to soil',
          'Use fish emulsion as a quick nitrogen boost',
          'Ensure proper watering to help nutrient absorption'
        ],
        upvotes: 24,
        downvotes: 2,
        comments: [
          {
            id: 'c1',
            author: {
              id: 'mock2',
              name: 'John Farmer',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
            },
            content: 'Had the same issue last season! Fish emulsion worked wonders for me.',
            createdAt: new Date('2026-02-24T10:30:00')
          }
        ],
        createdAt: new Date('2026-02-24T08:15:00')
      },
      {
        id: '2',
        author: {
          id: 'mock3',
          name: 'Mike Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
        },
        plantName: 'Rose Bush',
        diagnosis: 'Iron Deficiency (Chlorosis)',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=800&fit=crop',
        content: 'My rose bushes were showing yellowing between the veins while veins stayed green. Classic iron deficiency symptoms!',
        remedies: [
          'Apply chelated iron supplement',
          'Lower soil pH if too alkaline (target 6.0-6.5)',
          'Add sulfur to acidify soil',
          'Improve drainage to prevent nutrient lockout'
        ],
        upvotes: 18,
        downvotes: 1,
        comments: [],
        createdAt: new Date('2026-02-23T14:20:00')
      },
      {
        id: '3',
        author: {
          id: 'mock4',
          name: 'Emma Green',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
        },
        plantName: 'Corn Plant',
        diagnosis: 'Phosphorus Deficiency',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=800&fit=crop',
        content: 'Noticed purple discoloration on corn leaves and stunted growth. Scan revealed phosphorus deficiency.',
        remedies: [
          'Apply phosphorus-rich fertilizer (5-10-5 NPK)',
          'Add bone meal to soil',
          'Test and adjust soil pH to 6.0-7.0',
          'Ensure soil temperature is adequate (above 55°F)'
        ],
        upvotes: 15,
        downvotes: 0,
        comments: [
          {
            id: 'c2',
            author: {
              id: 'mock1',
              name: 'Sarah Chen',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
            },
            content: 'Great post! I always forget to check soil temperature.',
            createdAt: new Date('2026-02-25T09:45:00')
          },
          {
            id: 'c3',
            author: {
              id: 'mock5',
              name: 'David Park',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
            },
            content: 'Bone meal is excellent for this. Worked for my peppers too!',
            createdAt: new Date('2026-02-25T11:20:00')
          }
        ],
        createdAt: new Date('2026-02-22T16:45:00')
      }
    ];
    localStorage.setItem('blogPosts', JSON.stringify(mockPosts));
  }
}

export function getBlogPosts(): BlogPost[] {
  const posts = localStorage.getItem('blogPosts');
  if (!posts) return [];
  return JSON.parse(posts).map((post: any) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    comments: post.comments.map((comment: any) => ({
      ...comment,
      createdAt: new Date(comment.createdAt)
    }))
  }));
}

export function saveBlogPost(post: BlogPost) {
  const posts = getBlogPosts();
  posts.unshift(post);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

export function updateBlogPost(postId: string, updates: Partial<BlogPost>) {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }
}

export function getScanHistory(userId: string): ScanHistory[] {
  const history = localStorage.getItem(`scanHistory_${userId}`);
  if (!history) return [];
  return JSON.parse(history).map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt)
  }));
}

export function saveScanToHistory(userId: string, scan: ScanHistory) {
  const history = getScanHistory(userId);
  history.unshift(scan);
  localStorage.setItem(`scanHistory_${userId}`, JSON.stringify(history));
}
