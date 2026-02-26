import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export function Scan() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setScanning(true);
    
    // Mock scanning process
    setTimeout(() => {
      // Store scan data and navigate to results
      const mockResults = {
        plantName: ['Tomato Plant', 'Rose Bush', 'Pepper Plant', 'Corn Plant'][Math.floor(Math.random() * 4)],
        diagnosis: ['Nitrogen Deficiency', 'Iron Deficiency', 'Phosphorus Deficiency', 'Potassium Deficiency'][Math.floor(Math.random() * 4)],
        confidence: 92 + Math.floor(Math.random() * 7),
        image: image!
      };
      
      sessionStorage.setItem('scanResults', JSON.stringify(mockResults));
      navigate('/scan/results');
    }, 3000);
  };

  const clearImage = () => {
    setImage(null);
    setScanning(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl mb-4">
              Scan a
              <span className="text-primary"> Plant Leaf</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload a photo or take a picture to diagnose plant health issues
            </p>
          </div>

          {!image ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Upload Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="p-12 bg-white border-2 border-dashed border-border rounded-2xl hover:border-primary/50 hover:bg-secondary/30 transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Upload Image</h3>
                    <p className="text-muted-foreground">
                      Choose a photo from your device
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </motion.button>

              {/* Camera Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => cameraInputRef.current?.click()}
                className="p-12 bg-white border-2 border-dashed border-border rounded-2xl hover:border-primary/50 hover:bg-secondary/30 transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Camera className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Take Photo</h3>
                    <p className="text-muted-foreground">
                      Use your camera to capture
                    </p>
                  </div>
                </div>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={image}
                  alt="Plant leaf"
                  className="w-full h-auto max-h-[500px] object-contain bg-secondary"
                />
                {!scanning && (
                  <button
                    onClick={clearImage}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                {scanning && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                      <p className="text-white text-lg">Analyzing leaf...</p>
                      <p className="text-white/70 text-sm mt-2">This may take a few seconds</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!scanning && (
                <div className="p-6">
                  <div className="flex gap-4">
                    <button
                      onClick={clearImage}
                      className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/70 transition-colors"
                    >
                      Choose Different Image
                    </button>
                    <button
                      onClick={handleScan}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Scan Leaf
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tips */}
          {!image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 p-6 bg-white rounded-2xl border border-border"
            >
              <h3 className="text-xl mb-4">Tips for Best Results</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ensure good lighting - natural light works best</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Focus on leaves showing clear symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Keep the leaf centered in the frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Avoid blurry or out-of-focus images</span>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
