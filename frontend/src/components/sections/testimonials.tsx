// import { motion } from 'framer-motion';
// import { Star, Quote } from 'lucide-react';
// import { useGetTestimonialsQuery } from '@/store/api/portfolioApi';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// const Testimonials = () => {
//   const { data: testimonials, isLoading } = useGetTestimonialsQuery();

//   if (isLoading) {
//     return (
//       <section id="testimonials" className="section-padding">
//         <div className="container-padding max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <span className="text-sm font-medium text-primary uppercase tracking-wider">
//               Testimonials
//             </span>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2">
//               What Clients Say
//             </h2>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="animate-pulse bg-muted rounded-xl h-64" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!testimonials?.length) {
//     return (
//       <section id="testimonials" className="section-padding bg-secondary/30">
//         <div className="container-padding max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <span className="text-sm font-medium text-primary uppercase tracking-wider">
//               Testimonials
//             </span>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
//               What Clients Say
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Client testimonials coming soon...
//             </p>
//           </motion.div>
//         </div>
//       </section>
//     );
//   }

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
//         }`}
//       />
//     ));
//   };

//   return (
//     <section id="testimonials" className="section-padding bg-secondary/30">
//       <div className="container-padding max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-sm font-medium text-primary uppercase tracking-wider">
//             Testimonials
//           </span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
//             What Clients Say
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Feedback from people I've worked with
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group relative bg-card rounded-xl p-6 shadow-card border border-border/50 hover:border-primary/30 transition-all duration-300"
//             >
//               {/* Quote icon */}
//               <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
//               {/* Rating */}
//               <div className="flex gap-0.5 mb-4">
//                 {renderStars(testimonial.rating)}
//               </div>

//               {/* Content */}
//               <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
//                 "{testimonial.content}"
//               </p>

//               {/* Author */}
//               <div className="flex items-center gap-3">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src={testimonial.avatar_url || undefined} alt={testimonial.name} />
//                   <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//                     {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
//                   {(testimonial.role || testimonial.company) && (
//                     <p className="text-sm text-muted-foreground">
//                       {testimonial.role}{testimonial.role && testimonial.company && ' at '}{testimonial.company}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Featured badge */}
//               {testimonial.is_featured && (
//                 <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
//                   Featured
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
