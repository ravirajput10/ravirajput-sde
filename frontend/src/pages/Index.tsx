import { lazy, Suspense } from 'react';

import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

const Projects = lazy(() => import('@/components/sections/projects'));
// const Experience = lazy(() => import('@/components/sections/experience'));
// const Testimonials = lazy(() => import('@/components/sections/testimonials'));
const Blog = lazy(() => import('@/components/sections/blog'));
// const Contact = lazy(() => import('@/components/sections/contact'));

const SectionFallback = () => (
  <div className="py-20 flex justify-center">
    <div className="animate-pulse h-64 w-full max-w-4xl bg-muted rounded-lg" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          {/* <Experience /> */}
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          {/* <Testimonials /> */}
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          {/* <Contact /> */}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
