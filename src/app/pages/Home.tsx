import { Link } from 'react-router';
import { Scan, TrendingUp, Users, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Scan,
      title: 'AI-Powered Scanning',
      description: 'Instantly diagnose plant deficiencies with our advanced leaf scanning technology'
    },
    {
      icon: TrendingUp,
      title: 'Expert Remedies',
      description: 'Get actionable solutions and treatment plans tailored to your plants'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share findings, learn from others, and grow together'
    }
  ];

  const benefits = [
    'Accurate plant health diagnosis in seconds',
    'Comprehensive remedy recommendations',
    'Track your scan history and progress',
    'Join a community of passionate farmers'
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-white to-secondary/30">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1758614032436-e06e9a506bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZ3JlZW4lMjBwbGFudCUyMGxlYXZlcyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MjA5NjQwMnww&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Plant Health Analysis</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Diagnose Plant Health
              <br />
              <span className="text-primary">In Seconds</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Scan leaves, get instant diagnosis, and discover expert remedies. Join thousands of farmers improving their crop health with AgriScan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scan"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Scan className="w-5 h-5" />
                Scan a Leaf
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground rounded-xl hover:bg-secondary transition-colors border border-border"
              >
                Explore Community
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Everything You Need for
              <span className="text-primary"> Healthy Crops</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you maintain optimal plant health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-secondary to-white border border-border hover:border-primary/20 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-secondary/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl mb-6">
                Simple, Fast,
                <span className="text-primary"> Effective</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get professional-grade plant diagnostics in three easy steps
              </p>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Scan the Leaf', desc: 'Take a photo or upload an image of the affected plant' },
                  { step: '02', title: 'Get Diagnosis', desc: 'Our AI analyzes and identifies nutrient deficiencies' },
                  { step: '03', title: 'Apply Solutions', desc: 'Follow expert remedies to restore plant health' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/scan"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try It Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1582794496242-8165eed32971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBpbnNwZWN0aW5nJTIwY3JvcHMlMjBmaWVsZHxlbnwxfHx8fDE3NzIwOTY0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Farmer inspecting crops"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1761839257144-297ce252742e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDg2MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern agriculture"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl mb-6">
                Why Choose
                <span className="text-primary"> AgriScan</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join the future of smart farming with cutting-edge technology
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Start diagnosing plant health issues today and join our growing community
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scan"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
              >
                <Scan className="w-5 h-5" />
                Start Scanning
              </Link>
              
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white rounded-xl border-2 border-white hover:bg-white/10 transition-colors"
                >
                  Join Community
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
