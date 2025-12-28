import { motion } from 'framer-motion';
import { skillCategories, profileInfo } from '@/types/portfolio';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
            Building digital experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer focused on creating impactful solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {profileInfo.about.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-primary/10 rounded-lg border border-primary/20 flex-1">
                <span className="text-3xl font-display font-bold text-primary">
                  {profileInfo.yearsOfExperience}+
                </span>
                <span className="text-sm text-muted-foreground">
                  Years of<br />Experience
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-primary/10 rounded-lg border border-primary/20 flex-1">
                <span className="text-3xl font-display font-bold text-primary">
                  30+
                </span>
                <span className="text-sm text-muted-foreground">
                  Projects<br />Completed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-card rounded-lg p-5 shadow-card border border-border/50"
              >
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full gradient-bg" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="tech-tag"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
