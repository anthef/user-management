"use client";

import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-test";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <BackgroundGradient
            animate={true}
            className="opacity-20"
            containerClassName="absolute inset-0"
          />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium">
                👥 Solusi User Management Terdepan
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Kelola User dengan{" "}
              <AnimatedGradientText>Sistem Management Modern</AnimatedGradientText>
            </motion.h1>            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Platform user management yang powerful dan intuitif. Kelola pengguna, role, permission, dan autentikasi dengan mudah. Dashboard real-time, keamanan tingkat enterprise, dan integrasi yang seamless untuk produktivitas maksimal.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <a 
                href="/login" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </a>
              <a 
                href="/register" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Register
              </a>
              <a 
                href="/admin" 
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Admin Dashboard
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-2xl mx-auto p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                🔧 Setup Required for Admin Access
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
                To access admin features, run the <code className="px-1 py-0.5 bg-yellow-100 dark:bg-yellow-800 rounded">migration.sql</code> file in your database.
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-xs">
                Default admin credentials: admin@test.com / admin123
              </p>
            </motion.div>
          
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
