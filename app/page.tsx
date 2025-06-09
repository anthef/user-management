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
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Platform user management yang powerful dan intuitif. Kelola pengguna, role, permission, dan autentikasi dengan mudah. Dashboard real-time, keamanan tingkat enterprise, dan integrasi yang seamless untuk produktivitas maksimal.
            </motion.p>
          
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
