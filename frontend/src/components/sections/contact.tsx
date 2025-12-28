// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Send, Mail, MapPin, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from "sonner";
// import { useSubmitContactMutation } from '@/store/api/portfolioApi';
// import { z } from 'zod';
// import { profileInfo } from '@/types/portfolio';
// import { supabase } from '@/integrations/supabase/client';

// const contactSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters').max(100),
//   email: z.string().email('Please enter a valid email address').max(255),
//   message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
// });

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [submitContact, { isLoading }] = useSubmitContactMutation();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     const result = contactSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {};
//       result.error.issues.forEach((error) => {
//         if (error.path[0]) {
//           fieldErrors[error.path[0] as string] = error.message;
//         }
//       });
//       setErrors(fieldErrors);
//       return;
//     }

//     try {
//       await submitContact(formData).unwrap();
      
//       // Send email notification (non-blocking)
//       supabase.functions.invoke('send-contact-notification', {
//         body: formData,
//       }).then(({ error }) => {
//         if (error) {
//           console.error('Email notification error:', error);
//         }
//       });

//       toast.success('Message sent!', {
//         description: "Thank you for reaching out. I'll get back to you soon.",
//       });
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       toast.error('Error', {
//         description: 'Failed to send message. Please try again later.',
//       });
//     }
//   };

//   return (
//     <section id="contact" className="section-padding">
//       <div className="container-padding max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-sm font-medium text-primary uppercase tracking-wider">
//             Get in Touch
//           </span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-2 mb-4">
//             Let's Work Together
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Have a project in mind? I'd love to hear about it.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact info */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="space-y-8"
//           >
//             <div>
//               <h3 className="text-2xl font-display font-semibold mb-4">
//                 Let's discuss your next project
//               </h3>
//               <p className="text-muted-foreground">
//                 I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
//                 <div className="p-3 bg-primary/10 rounded-lg">
//                   <Mail className="w-5 h-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <a
//                     href={`mailto:${profileInfo.social.email}`}
//                     className="font-medium hover:text-primary transition-colors"
//                   >
//                     {profileInfo.social.email}
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
//                 <div className="p-3 bg-primary/10 rounded-lg">
//                   <MapPin className="w-5 h-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Location</p>
//                   <p className="font-medium">San Francisco, CA</p>
//                 </div>
//               </div>
//             </div>

//             {/* Decorative element */}
//             <div className="hidden lg:block relative">
//               <div className="absolute inset-0 gradient-bg opacity-10 rounded-2xl blur-2xl" />
//               <div className="relative bg-card border border-border/50 rounded-2xl p-8 text-center">
//                 <p className="text-3xl font-display font-bold gradient-text mb-2">
//                   {profileInfo.yearsOfExperience}+ Years
//                 </p>
//                 <p className="text-muted-foreground">
//                   of building exceptional digital products
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-2">
//                   Name
//                 </label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="Your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={errors.name ? 'border-destructive' : ''}
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-destructive mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-2">
//                   Email
//                 </label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={errors.email ? 'border-destructive' : ''}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-destructive mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium mb-2">
//                   Message
//                 </label>
//                 <Textarea
//                   id="message"
//                   name="message"
//                   placeholder="Tell me about your project..."
//                   rows={5}
//                   value={formData.message}
//                   onChange={handleChange}
//                   className={errors.message ? 'border-destructive' : ''}
//                 />
//                 {errors.message && (
//                   <p className="text-sm text-destructive mt-1">{errors.message}</p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 size="lg"
//                 className="w-full gradient-bg text-primary-foreground font-semibold"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-4 h-4 mr-2" />
//                     Send Message
//                   </>
//                 )}
//               </Button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
