// import { motion } from 'framer-motion';
// import { Briefcase, Calendar } from 'lucide-react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useGetExperiencesQuery } from '@/store/api/portfolioApi';

// const Experience = () => {
//   const { data: experiences, isLoading, error } = useGetExperiencesQuery();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 },
//   };

//   return (
//     <section id="experience" className="section-padding bg-secondary/30">
//       <div className="container-padding max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-sm font-medium text-primary uppercase tracking-wider">
//             Career
//           </span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
//             Work Experience
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             My professional journey and the companies I've worked with
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="space-y-6">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="bg-card rounded-lg p-6 border border-border/50">
//                 <Skeleton className="h-6 w-1/4 mb-2" />
//                 <Skeleton className="h-5 w-1/3 mb-4" />
//                 <Skeleton className="h-4 w-1/5 mb-4" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-4 w-5/6" />
//                   <Skeleton className="h-4 w-4/5" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">Failed to load experience. Please try again later.</p>
//           </div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="relative"
//           >
//             {/* Timeline line */}
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

//             <div className="space-y-8">
//               {experiences?.map((exp, index) => (
//                 <motion.div
//                   key={exp.id}
//                   variants={itemVariants}
//                   className="relative md:pl-20"
//                 >
//                   {/* Timeline dot */}
//                   <div className="absolute left-6 top-6 w-5 h-5 rounded-full gradient-bg border-4 border-background hidden md:block" />

//                   <div className="bg-card rounded-lg p-6 border border-border/50 shadow-card card-hover">
//                     <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
//                       <div>
//                         <h3 className="font-display font-semibold text-xl text-foreground">
//                           {exp.role}
//                         </h3>
//                         <p className="text-primary font-medium flex items-center gap-2">
//                           <Briefcase className="w-4 h-4" />
//                           {exp.company}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
//                         <Calendar className="w-4 h-4" />
//                         {exp.start_date} - {exp.end_date || 'Present'}
//                       </div>
//                     </div>

//                     {exp.responsibilities.length > 0 && (
//                       <div className="mb-4">
//                         <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
//                           Responsibilities
//                         </h4>
//                         <ul className="space-y-2">
//                           {exp.responsibilities.map((resp, i) => (
//                             <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
//                               <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
//                               {resp}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {exp.achievements.length > 0 && (
//                       <div>
//                         <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
//                           Key Achievements
//                         </h4>
//                         <ul className="space-y-2">
//                           {exp.achievements.map((achievement, i) => (
//                             <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
//                               <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
//                               {achievement}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Experience;
