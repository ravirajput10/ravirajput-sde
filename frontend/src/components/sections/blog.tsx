// import { Link } from 'react-router';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, ArrowRight } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useGetBlogsQuery } from '@/store/api/portfolioApi';
// import { format } from 'date-fns';

// const Blog = () => {
//   const { data: blogs, isLoading, error } = useGetBlogsQuery();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   if (error) {
//     return (
//       <section id="blog" className="py-20 lg:py-32 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <p className="text-center text-destructive">Failed to load blog posts</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="blog" className="section-padding bg-muted/30">
//       <div className="container-padding max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <Badge variant="secondary" className="mb-4">
//             Blog
//           </Badge>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//             Technical <span className="gradient-text">Articles</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Sharing insights, tutorials, and best practices from my experience
//             building modern web applications
//           </p>
//         </motion.div>

//         {isLoading ? (
//           <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//             {[...Array(4)].map((_, i) => (
//               <Card key={i} className="overflow-hidden">
//                 <CardHeader className="pb-4">
//                   <Skeleton className="h-6 w-3/4 mb-2" />
//                   <Skeleton className="h-4 w-1/2" />
//                 </CardHeader>
//                 <CardContent>
//                   <Skeleton className="h-20 w-full" />
//                 </CardContent>
//                 <CardFooter>
//                   <Skeleton className="h-6 w-24" />
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
//           >
//             {blogs?.map((blog) => (
//               <motion.div key={blog.id} variants={itemVariants}>
//                 <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
//                   {blog.cover_image && (
//                     <div className="h-48 overflow-hidden">
//                       <img
//                         src={blog.cover_image}
//                         alt={blog.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   )}
//                   <CardHeader className="pb-3">
//                     <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         {format(new Date(blog.published_at), 'MMM dd, yyyy')}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         {blog.read_time} min read
//                       </span>
//                     </div>
//                     <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
//                       {blog.title}
//                     </h3>
//                   </CardHeader>
//                   <CardContent className="pb-4">
//                     <p className="text-muted-foreground line-clamp-3">
//                       {blog.excerpt}
//                     </p>
//                   </CardContent>
//                   <CardFooter className="flex flex-col items-start gap-4">
//                     <div className="flex flex-wrap gap-2">
//                       {blog.tags.map((tag) => (
//                         <Badge
//                           key={tag}
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="group/btn -ml-2 text-primary hover:text-primary hover:bg-primary/10"
//                       asChild
//                     >
//                       <Link to={`/blog/${blog.slug}`}>
//                         Read Article
//                         <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
//                       </Link>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Blog;
