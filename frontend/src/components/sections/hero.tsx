import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileInfo } from '@/types/portfolio';
import profilePhoto from '@/assets/profile-photo.jpg';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 container-padding max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">{profileInfo.name}</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {profileInfo.title}
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {profileInfo.summary}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8 py-6 text-lg border-2"
                onClick={scrollToContact}
              >
                Contact Me
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href={profileInfo.resumeUrl} download>
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={profileInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profileInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profileInfo.social.email}`}
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right side - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full gradient-bg blur-xl opacity-40 scale-110" />
              <motion.img
                src={profilePhoto}
                alt={profileInfo.name}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-background shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
