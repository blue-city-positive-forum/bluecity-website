import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '/about.jpeg';

const useInView = () => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
};

export const About: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-city-secondary/20 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-city-accent/10 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft-lg">
              <img
                src={aboutImg}
                alt="Rajasthani Culture"
                className="w-full h-[500px] object-cover"
              />
              {/* Decorative Border */}
              <div className="absolute inset-0 border-8 border-blue-city-primary/20 rounded-2xl"></div>
            </div>
            {/* Decorative Pattern */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-city-accent/30 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-sm font-semibold text-blue-city-accent uppercase tracking-wider mb-2">
                About Us
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-blue-city-text">
                A Community That Feels Like{' '}
                <span className="text-gradient">Home</span>
              </h3>
            </div>

            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-blue-city-primary">Blue City Parivar</strong> is more than just a community—it's a 
                family that brings together the vibrant spirit of Jodhpur to the heart of Ahmedabad.
              </p>
              <p>
                We are a close-knit group of families from Jodhpur who have made Ahmedabad our home, 
                yet we cherish our roots, culture, and traditions. Through regular gatherings, festivals, 
                and celebrations, we create a space where our heritage thrives.
              </p>
              <p>
                Whether it's celebrating Diwali, Holi, or organizing cultural events, we come together 
                to support each other, share our stories, and pass on our rich traditions to the next generation.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { icon: '🎉', title: 'Regular Events', desc: 'Monthly gatherings & festivals' },
                { icon: '👨‍👩‍👧‍👦', title: 'Family Oriented', desc: 'All ages welcome' },
                { icon: '🏛️', title: 'Cultural Heritage', desc: 'Preserving traditions' },
                { icon: '🤝', title: 'Strong Network', desc: 'Support & friendship' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                  className="text-center p-4 bg-blue-city-background rounded-xl"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="font-semibold text-blue-city-text">{feature.title}</div>
                  <div className="text-sm text-gray-600">{feature.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};




