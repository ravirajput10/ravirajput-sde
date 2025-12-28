// import { useParams, Link } from 'react-router';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, ArrowLeft } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useGetBlogBySlugQuery } from '@/store/api/portfolioApi';
// import { format } from 'date-fns';
// import Navbar from '@/components/common/navbar';
// import Footer from '@/components/common/footer';


// const BlogDetail = () => {
//   const { slug } = useParams<{ slug: string }>();
//   const { data: blog, isLoading, error } = useGetBlogBySlugQuery(slug || '');

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="container mx-auto px-4 py-20">
//           <div className="max-w-3xl mx-auto">
//             <Skeleton className="h-8 w-32 mb-8" />
//             <Skeleton className="h-12 w-3/4 mb-4" />
//             <Skeleton className="h-6 w-1/2 mb-8" />
//             <Skeleton className="h-64 w-full mb-8" />
//             <Skeleton className="h-4 w-full mb-2" />
//             <Skeleton className="h-4 w-full mb-2" />
//             <Skeleton className="h-4 w-3/4" />
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <main className="container mx-auto px-4 py-20">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
//             <p className="text-muted-foreground mb-8">
//               The article you're looking for doesn't exist or has been removed.
//             </p>
//             <Button asChild>
//               <Link to="/#blog">
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Articles
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
//           className="max-w-3xl mx-auto"
//         >
//           <Button variant="ghost" asChild className="mb-8 -ml-4">
//             <Link to="/#blog">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Articles
//             </Link>
//           </Button>

//           <header className="mb-8">
//             <div className="flex flex-wrap gap-2 mb-4">
//               {blog.tags.map((tag) => (
//                 <Badge key={tag} variant="secondary">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//               {blog.title}
//             </h1>

//             <div className="flex items-center gap-4 text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock className="w-4 h-4" />
//                 {blog.read_time} min read
//               </span>
//             </div>
//           </header>

//           {blog.cover_image && (
//             <div className="mb-8 rounded-lg overflow-hidden">
//               <img
//                 src={blog.cover_image}
//                 alt={blog.title}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           )}

//           <div className="prose prose-lg dark:prose-invert max-w-none">
//             <p className="text-lg text-muted-foreground mb-8 font-medium">
//               {blog.excerpt}
//             </p>

//             {blog.content ? (
//               <div className="whitespace-pre-wrap text-foreground leading-relaxed">
//                 {blog.content}
//               </div>
//             ) : (
//               <p className="text-muted-foreground italic">
//                 Full article content coming soon...
//               </p>
//             )}
//           </div>
//         </motion.article>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default BlogDetail;
