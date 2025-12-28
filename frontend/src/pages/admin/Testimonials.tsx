// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Plus, Edit, Trash2, Star, StarOff } from 'lucide-react';
// import { toast } from 'sonner';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import {
//   useGetTestimonialsQuery,
//   useCreateTestimonialMutation,
//   useUpdateTestimonialMutation,
//   useDeleteTestimonialMutation,
//   Testimonial,
// } from '@/store/api/portfolioApi';
// import DashboardLayout from '@/components/dashboard/dashboard-layout';

// const testimonialSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   role: z.string().optional(),
//   company: z.string().optional(),
//   avatar_url: z.string().url().optional().or(z.literal('')),
//   content: z.string().min(10, 'Content must be at least 10 characters'),
//   rating: z.number().min(1).max(5),
//   is_featured: z.boolean(),
//   display_order: z.number(),
// });

// type TestimonialFormData = z.infer<typeof testimonialSchema>;

// const AdminTestimonials = () => {
//   const { data: testimonials, isLoading } = useGetTestimonialsQuery();
//   const [createTestimonial, { isLoading: isCreating }] = useCreateTestimonialMutation();
//   const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation();
//   const [deleteTestimonial, { isLoading: isDeleting }] = useDeleteTestimonialMutation();

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const form = useForm<TestimonialFormData>({
//     resolver: zodResolver(testimonialSchema),
//     defaultValues: {
//       name: '',
//       role: '',
//       company: '',
//       avatar_url: '',
//       content: '',
//       rating: 5,
//       is_featured: false,
//       display_order: 0,
//     },
//   });

//   const openCreateDialog = () => {
//     setEditingTestimonial(null);
//     form.reset({
//       name: '',
//       role: '',
//       company: '',
//       avatar_url: '',
//       content: '',
//       rating: 5,
//       is_featured: false,
//       display_order: testimonials?.length || 0,
//     });
//     setIsDialogOpen(true);
//   };

//   const openEditDialog = (testimonial: Testimonial) => {
//     setEditingTestimonial(testimonial);
//     form.reset({
//       name: testimonial.name,
//       role: testimonial.role || '',
//       company: testimonial.company || '',
//       avatar_url: testimonial.avatar_url || '',
//       content: testimonial.content,
//       rating: testimonial.rating,
//       is_featured: testimonial.is_featured,
//       display_order: testimonial.display_order,
//     });
//     setIsDialogOpen(true);
//   };

//   const onSubmit = async (data: TestimonialFormData) => {
//     try {
//       const payload = {
//         name: data.name,
//         content: data.content,
//         rating: data.rating,
//         is_featured: data.is_featured,
//         display_order: data.display_order,
//         avatar_url: data.avatar_url || null,
//         role: data.role || null,
//         company: data.company || null,
//       };

//       if (editingTestimonial) {
//         await updateTestimonial({ id: editingTestimonial.id, ...payload }).unwrap();
//         toast.success('Testimonial updated successfully', {
//           description: 'The testimonial has been updated.',
//         });
//       } else {
//         await createTestimonial(payload).unwrap();
//         toast.success('Testimonial created successfully', {
//           description: 'A new testimonial has been added.',
//         });
//       }
//       setIsDialogOpen(false);
//     } catch (error) {
//       toast.error('Failed to save testimonial', {
//         description: 'Could not save the testimonial. Please try again.',
//       });
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await deleteTestimonial(deleteId).unwrap();
//       toast.success('Testimonial deleted successfully', {
//         description: 'The testimonial has been deleted.',
//       });
//       setDeleteId(null);
//     } catch (error) {
//       toast.error('Failed to delete testimonial', {
//         description: 'Could not delete the testimonial. Please try again.',
//       });
//     }
//   };

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
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Testimonials</h1>
//             <p className="text-muted-foreground">Manage client testimonials and reviews</p>
//           </div>
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={openCreateDialog}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Testimonial
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
//                 </DialogTitle>
//               </DialogHeader>
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Name *</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="role"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Role</FormLabel>
//                           <FormControl>
//                             <Input placeholder="CEO" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="company"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Company</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Acme Inc" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <FormField
//                     control={form.control}
//                     name="avatar_url"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Avatar URL</FormLabel>
//                         <FormControl>
//                           <Input placeholder="https://..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="content"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Testimonial *</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="What did the client say about your work?"
//                             rows={4}
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="rating"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Rating</FormLabel>
//                         <FormControl>
//                           <div className="flex gap-1">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <button
//                                 key={star}
//                                 type="button"
//                                 onClick={() => field.onChange(star)}
//                                 className="focus:outline-none"
//                               >
//                                 <Star
//                                   className={`w-6 h-6 transition-colors ${
//                                     star <= field.value
//                                       ? 'fill-yellow-400 text-yellow-400'
//                                       : 'text-muted-foreground/30 hover:text-yellow-400/50'
//                                   }`}
//                                 />
//                               </button>
//                             ))}
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="display_order"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Display Order</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               {...field}
//                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="is_featured"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-col justify-end">
//                           <FormLabel>Featured</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center gap-2 h-10">
//                               <Switch
//                                 checked={field.value}
//                                 onCheckedChange={field.onChange}
//                               />
//                               <span className="text-sm text-muted-foreground">
//                                 {field.value ? 'Yes' : 'No'}
//                               </span>
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="flex justify-end gap-2 pt-4">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => setIsDialogOpen(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button type="submit" disabled={isCreating || isUpdating}>
//                       {editingTestimonial ? 'Update' : 'Create'}
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {isLoading ? (
//           <div className="grid md:grid-cols-2 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="animate-pulse bg-muted rounded-lg h-48" />
//             ))}
//           </div>
//         ) : testimonials?.length === 0 ? (
//           <div className="text-center py-12 text-muted-foreground">
//             No testimonials yet. Add your first testimonial!
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-4">
//             {testimonials?.map((testimonial) => (
//               <div
//                 key={testimonial.id}
//                 className="bg-card rounded-lg p-5 border border-border/50 space-y-3"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
//                       {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold flex items-center gap-2">
//                         {testimonial.name}
//                         {testimonial.is_featured && (
//                           <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
//                             Featured
//                           </span>
//                         )}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         {testimonial.role}{testimonial.role && testimonial.company && ' at '}{testimonial.company}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-1">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => openEditDialog(testimonial)}
//                     >
//                       <Edit className="w-4 h-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setDeleteId(testimonial.id)}
//                     >
//                       <Trash2 className="w-4 h-4 text-destructive" />
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="flex gap-0.5">{renderStars(testimonial.rating)}</div>
//                 <p className="text-sm text-muted-foreground line-clamp-3">
//                   "{testimonial.content}"
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
//               <AlertDialogDescription>
//                 Are you sure you want to delete this testimonial? This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AdminTestimonials;
