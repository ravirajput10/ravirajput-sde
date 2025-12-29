import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
// import { useGetProjectsQuery } from '@/store/api/portfolioApi';
import { useProjects } from "@/hooks/queries/useProjects";

const Projects = () => {
//   const { data: projects, isLoading, error } = useGetProjectsQuery();
const { data: projects, isLoading, isError } = useProjects();

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
    <section id="projects" className="section-padding">
      <div className="container-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border border-border/50">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load projects. Please try again later.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects?.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group bg-card rounded-lg p-6 border border-border/50 card-hover gradient-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.slice(0, 4).map((tech: any) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <span className="text-xs px-2 py-1 text-muted-foreground">
                      +{project.tech_stack.length - 4}
                    </span>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="group/btn -ml-2 text-primary hover:text-primary hover:bg-primary/10" asChild>
                  <Link to={`/project/${project.slug}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
