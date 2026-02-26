import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, AlertTriangle, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { saveScanToHistory, ScanHistory } from '../utils/mockData';

interface ScanResult {
  plantName: string;
  diagnosis: string;
  confidence: number;
  image: string;
}

export function ScanResults() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const savedResults = sessionStorage.getItem('scanResults');
    if (savedResults) {
      setResult(JSON.parse(savedResults));
    } else {
      navigate('/scan');
    }
  }, [navigate]);

  const getRemedies = (diagnosis: string): string[] => {
    const remediesMap: Record<string, string[]> = {
      'Nitrogen Deficiency': [
        'Apply nitrogen-rich fertilizer (10-5-5 NPK ratio)',
        'Add compost or aged manure to soil',
        'Use fish emulsion as a quick nitrogen boost',
        'Ensure proper watering to help nutrient absorption',
        'Consider planting nitrogen-fixing cover crops'
      ],
      'Iron Deficiency': [
        'Apply chelated iron supplement to soil',
        'Lower soil pH if too alkaline (target 6.0-6.5)',
        'Add sulfur to acidify soil gradually',
        'Improve drainage to prevent nutrient lockout',
        'Use foliar spray for quick results'
      ],
      'Phosphorus Deficiency': [
        'Apply phosphorus-rich fertilizer (5-10-5 NPK)',
        'Add bone meal to soil',
        'Test and adjust soil pH to 6.0-7.0',
        'Ensure soil temperature is adequate (above 55°F)',
        'Reduce soil compaction for better root growth'
      ],
      'Potassium Deficiency': [
        'Apply potassium-rich fertilizer (0-0-10 NPK)',
        'Add wood ash to soil (use sparingly)',
        'Use kelp meal as an organic option',
        'Improve soil drainage and aeration',
        'Mulch to maintain consistent soil moisture'
      ]
    };

    return remediesMap[diagnosis] || [
      'Consult with a local agricultural expert',
      'Test your soil for nutrient levels',
      'Ensure proper watering schedule',
      'Monitor plant progress regularly'
    ];
  };

  const handleSaveToHistory = () => {
    if (!result || !user) return;

    const scanHistory: ScanHistory = {
      id: Date.now().toString(),
      plantName: result.plantName,
      diagnosis: result.diagnosis,
      image: result.image,
      remedies: getRemedies(result.diagnosis),
      createdAt: new Date(),
      postedAsBlog: false
    };

    saveScanToHistory(user.id, scanHistory);
    setSaving(true);
    setTimeout(() => {
      navigate('/history');
    }, 1000);
  };

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/scan/results' } });
      return;
    }
    
    // Store result data for post creation
    sessionStorage.setItem('postDraft', JSON.stringify({
      plantName: result?.plantName,
      diagnosis: result?.diagnosis,
      image: result?.image,
      remedies: getRemedies(result?.diagnosis || '')
    }));
    
    navigate('/create-post');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const remedies = getRemedies(result.diagnosis);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate('/scan')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Scan Another Leaf
          </button>

          {/* Results Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            {/* Image */}
            <div className="relative aspect-[16/9] bg-secondary">
              <img
                src={result.image}
                alt="Scanned leaf"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scan Complete</p>
                  <p className="text-2xl">Analysis Results</p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-6">
                <div className="p-6 bg-secondary rounded-xl">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg text-muted-foreground mb-2">Plant Identified</h3>
                      <p className="text-3xl text-primary">{result.plantName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <p className="text-2xl">{result.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg text-muted-foreground mb-2">Diagnosis</h3>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-2xl text-destructive">{result.diagnosis}</p>
                    </div>
                  </div>
                </div>

                {/* Remedies */}
                <div>
                  <h3 className="text-2xl mb-4">Recommended Remedies</h3>
                  <div className="space-y-3">
                    {remedies.map((remedy, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-secondary rounded-lg"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <p className="flex-1 text-muted-foreground">{remedy}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <button
                    onClick={handleCreatePost}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    {isAuthenticated ? 'Share as Blog Post' : 'Login to Share as Blog Post'}
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={handleSaveToHistory}
                      disabled={saving}
                      className="w-full px-6 py-4 bg-secondary text-foreground rounded-xl hover:bg-secondary/70 transition-colors disabled:opacity-50"
                    >
                      {saving ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        'Save to History'
                      )}
                    </button>
                  )}
                </div>

                {!isAuthenticated && (
                  <p className="text-center text-sm text-muted-foreground">
                    <a href="/login" className="text-primary hover:underline">Log in</a>
                    {' '}to save scan history and share posts
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
