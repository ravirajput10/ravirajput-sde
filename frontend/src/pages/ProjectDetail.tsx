// import { useParams, Link } from 'react-router';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useGetProjectBySlugQuery } from '@/store/api/portfolioApi';
// import Navbar from '@/components/common/navbar';
// import Footer from '@/components/common/footer';


// const ProjectDetail = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const { data: project, isLoading, error } = useGetProjectBySlugQuery(slug || '');

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="container mx-auto px-4 py-20">
//           <div className="max-w-4xl mx-auto">
//             <Skeleton className="h-8 w-32 mb-8" />
//             <Skeleton className="h-12 w-3/4 mb-4" />
//             <Skeleton className="h-6 w-1/2 mb-8" />
//             <Skeleton className="h-80 w-full mb-8" />
//             <Skeleton className="h-4 w-full mb-2" />
//             <Skeleton className="h-4 w-full mb-2" />
//             <Skeleton className="h-4 w-3/4" />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !project) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="container mx-auto px-4 py-20">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
//             <p className="text-muted-foreground mb-8">
//               The project you're looking for doesn't exist or has been removed.
//             </p>
//             <Button asChild>
//               <Link to="/#projects">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Projects
//               </Link>
//             </Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="container mx-auto px-4 py-20">
//         <motion.article
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-4xl mx-auto"
//         >
//           <Button variant="ghost" asChild className="mb-8 -ml-4">
//             <Link to="/#projects">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Projects
//             </Link>
//           </Button>

//           <header className="mb-8">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//               {project.title}
//             </h1>

//             <div className="flex flex-wrap gap-2 mb-6">
//               {project.tech_stack.map((tech) => (
//                 <Badge key={tech} variant="secondary">
//                   {tech}
//                 </Badge>
//               ))}
//             </div>

//             <div className="flex gap-4">
//               {project.github_url && (
//                 <Button variant="outline" asChild>
//                   <a
//                     href={project.github_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Github className="mr-2 h-4 w-4" />
//                     View Code
//                   </a>
//                 </Button>
//               )}
//               {project.live_url && (
//                 <Button asChild>
//                   <a
//                     href={project.live_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <ExternalLink className="mr-2 h-4 w-4" />
//                     Live Demo
//                   </a>
//                 </Button>
//               )}
//             </div>
//           </header>

//           {project.image_url && (
//             <div className="mb-8 rounded-lg overflow-hidden border border-border">
//               <img
//                 src={project.image_url}
//                 alt={project.title}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           )}

//           <div className="prose prose-lg dark:prose-invert max-w-none">
//             <h2 className="text-xl font-semibold mb-4">About this Project</h2>
//             <p className="text-foreground leading-relaxed whitespace-pre-wrap">
//               {project.description}
//             </p>
//           </div>

//           <section className="mt-12 pt-8 border-t border-border">
//             <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {project.tech_stack.map((tech) => (
//                 <div
//                   key={tech}
//                   className="px-4 py-3 bg-muted/50 rounded-lg text-center font-medium"
//                 >
//                   {tech}
//                 </div>
//               ))}
//             </div>
//           </section>
//         </motion.article>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ProjectDetail;
