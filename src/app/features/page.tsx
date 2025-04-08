'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaRobot, 
  FaCode, 
  FaUserGroup, 
  FaRocket, 
  FaChartLine, 
  FaLaptopCode,
  FaShieldHalved,
  FaGraduationCap,
  FaMobileScreen
} from 'react-icons/fa6';
import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

interface DetailedFeatureProps {
  children: ReactNode;
  title: string;
  description: string;
  image: ReactNode;
  index: number;
  isReversed?: boolean;
}

interface FeaturePointProps {
  icon: ReactNode;
  children: ReactNode;
}

const FeatureCard = ({ title, description, icon, index }: FeatureProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-lg bg-blue-900/30 flex items-center justify-center text-2xl text-blue-400 mb-6 group-hover:scale-110 transform transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const DetailedFeature = ({ children, title, description, image, index, isReversed = false }: DetailedFeatureProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 py-16`}
    >
      <div className="lg:w-1/2">
        <h3 className="text-3xl font-bold mb-6">{title}</h3>
        <p className="text-xl text-gray-300 mb-6">{description}</p>
        <div className="space-y-4">
          {children}
        </div>
      </div>
      <div className="lg:w-1/2">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-1">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {/* Placeholder for actual feature screenshot/demo */}
            <div className="h-80 bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
              <span className="text-5xl text-blue-500/80">{image}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturePoint = ({ icon, children }: FeaturePointProps) => (
  <div className="flex items-start">
    <div className="mr-4 text-blue-400">{icon}</div>
    <p className="text-gray-300">{children}</p>
  </div>
);

export default function FeaturesPage() {
  const mainFeatures: FeatureProps[] = [
    {
      title: "AI-Powered Learning",
      description: "Our platform uses advanced AI to analyze your skill level, learning style, and goals to create a personalized curriculum.",
      icon: <FaRobot />,
      index: 0
    },
    {
      title: "Project-Based Curriculum",
      description: "Learn by building real projects, not by watching endless tutorials or solving contrived problems.",
      icon: <FaLaptopCode />,
      index: 1
    },
    {
      title: "Expert Mentorship",
      description: "Get guidance from experienced developers who review your code and provide personalized feedback.",
      icon: <FaUserGroup />,
      index: 2
    },
    {
      title: "Accelerated Learning",
      description: "Our methods help you learn up to 3x faster than traditional approaches by focusing on application rather than theory.",
      icon: <FaRocket />,
      index: 3
    },
    {
      title: "Comprehensive Analytics",
      description: "Track your progress with detailed analytics and insights that help you understand your strengths and areas for improvement.",
      icon: <FaChartLine />,
      index: 4
    },
    {
      title: "Mobile Accessibility",
      description: "Learn on the go with our mobile-optimized platform that syncs your progress across all your devices.",
      icon: <FaMobileScreen />,
      index: 5
    },
    {
      title: "Industry-Relevant Skills",
      description: "Our curriculum is designed with input from industry experts to ensure you're learning the most in-demand skills.",
      icon: <FaGraduationCap />,
      index: 6
    },
    {
      title: "Secure Platform",
      description: "Your data and code are protected with enterprise-grade security to ensure privacy and intellectual property protection.",
      icon: <FaShieldHalved />,
      index: 7
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Features That Power Your Learning
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies to provide
              an unparalleled educational experience.
            </p>
          </motion.div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {mainFeatures.map((feature) => (
            <FeatureCard
              key={feature.index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={feature.index}
            />
          ))}
        </div>

        {/* Detailed Feature Sections */}
        <DetailedFeature
          title="Personalized Learning Experience"
          description="Our AI-powered platform adapts to your unique learning style and pace."
          image={<FaRobot />}
          index={0}
        >
          <FeaturePoint icon={<FaRocket />}>
            Initial assessment identifies your strengths, weaknesses, and learning style
          </FeaturePoint>
          <FeaturePoint icon={<FaRocket />}>
            Curriculum dynamically adjusts based on your performance and feedback
          </FeaturePoint>
          <FeaturePoint icon={<FaRocket />}>
            AI identifies knowledge gaps and automatically provides additional exercises
          </FeaturePoint>
          <FeaturePoint icon={<FaRocket />}>
            Learning path optimization ensures you're always working on the most relevant skills
          </FeaturePoint>
        </DetailedFeature>

        <DetailedFeature
          title="Real-World Projects"
          description="Build your portfolio with projects that solve actual problems."
          image={<FaCode />}
          index={1}
          isReversed={true}
        >
          <FeaturePoint icon={<FaLaptopCode />}>
            Industry-relevant projects designed by experienced professionals
          </FeaturePoint>
          <FeaturePoint icon={<FaLaptopCode />}>
            Projects increase in complexity as you progress, building on previous knowledge
          </FeaturePoint>
          <FeaturePoint icon={<FaLaptopCode />}>
            Collaborate with other learners on larger team projects
          </FeaturePoint>
          <FeaturePoint icon={<FaLaptopCode />}>
            Showcase your completed projects in a professional portfolio
          </FeaturePoint>
        </DetailedFeature>

        <DetailedFeature
          title="Expert Mentorship and Community"
          description="Learn directly from industry professionals and peers."
          image={<FaUserGroup />}
          index={2}
        >
          <FeaturePoint icon={<FaUserGroup />}>
            Get personalized feedback from experienced developers on your code
          </FeaturePoint>
          <FeaturePoint icon={<FaUserGroup />}>
            Regular one-on-one mentorship sessions to discuss progress and goals
          </FeaturePoint>
          <FeaturePoint icon={<FaUserGroup />}>
            Active community forum for peer support and collaboration
          </FeaturePoint>
          <FeaturePoint icon={<FaUserGroup />}>
            Networking opportunities with industry partners and alumni
          </FeaturePoint>
        </DetailedFeature>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-12 text-center mt-24">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience It Yourself?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already transforming their careers through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Try Live Demo
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-gray-800 rounded-xl text-white font-medium hover:bg-gray-700 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 