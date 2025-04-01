'use client';

import { createElement, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { FaCode, FaRobot, FaGraduationCap, FaRocket } from 'react-icons/fa';

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false });
const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), { ssr: false });

type CardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  number?: string;
};

function Card({ icon, title, description, number }: CardProps) {
  return createElement(MotionDiv, {
    whileHover: { scale: 1.05 },
    className: "p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700",
    children: [
      number ? (
        createElement('div', {
          key: 'number',
          className: "text-4xl font-bold text-blue-400 mb-4",
          children: number
        })
      ) : (
        createElement('div', {
          key: 'icon',
          className: "text-blue-400 mb-4",
          children: icon
        })
      ),
      createElement('h3', {
        key: 'title',
        className: "text-xl font-bold mb-2",
        children: title
      }),
      createElement('p', {
        key: 'description',
        className: "text-gray-300",
        children: description
      })
    ]
  });
}

export default function Home() {
  return createElement('main', {
    className: "min-h-screen bg-gradient-to-b from-gray-900 to-black text-white",
    children: [
      // Hero Section
      createElement('section', {
        key: 'hero',
        className: "container mx-auto px-4 py-20",
        children: createElement(MotionDiv, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "text-center",
          children: [
            createElement('h1', {
              key: 'title',
              className: "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600",
              children: "Learn to Code Like a Pro"
            }),
            createElement('p', {
              key: 'subtitle',
              className: "text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto",
              children: "Your AI-powered coding companion that adapts to your goals and creates personalized learning experiences."
            }),
            createElement(WaitlistForm, { key: 'form' })
          ]
        })
      }),

      // Features Section
      createElement('section', {
        key: 'features',
        className: "container mx-auto px-4 py-20",
        children: [
          createElement('h2', {
            key: 'title',
            className: "text-4xl font-bold text-center mb-16",
            children: "Why Choose Enginunity?"
          }),
          createElement('div', {
            key: 'grid',
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
            children: [
              createElement(Card, {
                key: 'feature-1',
                icon: createElement(FaCode, { className: "w-8 h-8" }),
                title: "AI-Powered Learning",
                description: "Personalized coding projects that match your goals and skill level."
              }),
              createElement(Card, {
                key: 'feature-2',
                icon: createElement(FaRobot, { className: "w-8 h-8" }),
                title: "Smart Tutor",
                description: "An AI that understands your learning style and adapts accordingly."
              }),
              createElement(Card, {
                key: 'feature-3',
                icon: createElement(FaGraduationCap, { className: "w-8 h-8" }),
                title: "Project-Based",
                description: "Build real-world projects that matter for your career."
              }),
              createElement(Card, {
                key: 'feature-4',
                icon: createElement(FaRocket, { className: "w-8 h-8" }),
                title: "Career Focused",
                description: "Learn exactly what you need to succeed in your desired role."
              })
            ]
          })
        ]
      }),

      // How It Works Section
      createElement('section', {
        key: 'how-it-works',
        className: "container mx-auto px-4 py-20 bg-gray-800/50",
        children: [
          createElement('h2', {
            key: 'title',
            className: "text-4xl font-bold text-center mb-16",
            children: "How It Works"
          }),
          createElement('div', {
            key: 'grid',
            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
            children: [
              createElement(Card, {
                key: 'step-1',
                number: "1",
                title: "Tell Us Your Goals",
                description: "Share your aspirations, whether you're a beginner or aiming for a specific role."
              }),
              createElement(Card, {
                key: 'step-2',
                number: "2",
                title: "AI Creates Your Path",
                description: "Our AI analyzes your goals and creates a personalized learning journey."
              }),
              createElement(Card, {
                key: 'step-3',
                number: "3",
                title: "Build & Learn",
                description: "Work on real projects while learning the skills you need."
              })
            ]
          })
        ]
      })
    ]
  });
} 