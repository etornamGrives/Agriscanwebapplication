import { Leaf, Target, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower farmers worldwide with accessible technology that improves crop health and increases yields'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Sustainability, innovation, and community-driven growth are at the core of everything we do'
    },
    {
      icon: Users,
      title: 'Our Community',
      description: 'Over 10,000 farmers sharing knowledge and helping each other grow better crops'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">About AgriScan</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl mb-6">
              Revolutionizing Agriculture
              <span className="text-primary"> Through Technology</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              We're on a mission to make plant health diagnostics accessible to every farmer, 
              combining AI technology with agricultural expertise to build a healthier future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  AgriScan was born from a simple observation: farmers needed better tools 
                  to diagnose plant health issues quickly and accurately. Traditional methods 
                  were time-consuming and often required expensive consultations.
                </p>
                <p>
                  In 2024, a team of agricultural scientists and AI engineers came together 
                  with a vision - to create an accessible, AI-powered solution that could 
                  identify plant nutrient deficiencies in seconds.
                </p>
                <p>
                  Today, AgriScan serves thousands of farmers worldwide, helping them make 
                  informed decisions about plant care and improving crop yields through 
                  early detection and treatment.
                </p>
              </div>
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
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=800&fit=crop"
                  alt="Agriculture"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">What Drives Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do and how we serve our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Farmers' },
              { number: '50K+', label: 'Scans Completed' },
              { number: '95%', label: 'Accuracy Rate' },
              { number: '24/7', label: 'Availability' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
