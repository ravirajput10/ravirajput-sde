import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/dashboard/admin/protected-route";
import App from "@/App";

const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Auth = lazy(() => import("@/pages/Auth"));
// const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
// const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminMessages = lazy(() => import("@/pages/admin/Messages"));
const AdminBlogs = lazy(() => import("@/pages/admin/Blogs"));
const AdminProjects = lazy(() => import("@/pages/admin/Projects"));
// const AdminTestimonials = lazy(() => import("@/pages/admin/Testimonials"));

const withSuspense = (Component: React.ReactNode) => (
  <Suspense fallback={<div className="min-h-screen bg-background" />}>
    {Component}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <App />, // ✅ ROOT LAYOUT
    children: [
      {
        path: "/",
        element: withSuspense(<Index />),
      },
      {
        path: "/auth",
        element: withSuspense(<Auth />),
      },
      // {
      //   path: "/blog/:slug",
      //   element: withSuspense(<BlogDetail />),
      // },
      // {
      //   path: "/project/:slug",
      //   element: withSuspense(<ProjectDetail />),
      // },

      /* ---------- ADMIN ROUTES ---------- */
      {
        path: "/admin",
        element: (
          <ProtectedRoute requireAdmin>
            {withSuspense(<AdminDashboard />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/messages",
        element: (
          <ProtectedRoute requireAdmin>
            {withSuspense(<AdminMessages />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/blogs",
        element: (
          <ProtectedRoute requireAdmin>
            {withSuspense(<AdminBlogs />)}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <ProtectedRoute requireAdmin>
            {withSuspense(<AdminProjects />)}
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/admin/testimonials",
      //   element: (
      //     <ProtectedRoute requireAdmin>
      //       {withSuspense(<AdminTestimonials />)}
      //     </ProtectedRoute>
      //   ),
      // },

      {
        path: "*",
        element: withSuspense(<NotFound />),
      },
    ],
  },
]);
