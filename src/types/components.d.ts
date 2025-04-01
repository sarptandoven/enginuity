declare module 'framer-motion' {
  import { ComponentType } from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
  }

  export const motion: {
    div: ComponentType<MotionProps & JSX.IntrinsicElements['div']>;
  };
}

declare module 'react-icons/fa' {
  import { ComponentType, SVGProps } from 'react';

  export const FaCode: ComponentType<SVGProps<SVGSVGElement>>;
  export const FaRobot: ComponentType<SVGProps<SVGSVGElement>>;
  export const FaGraduationCap: ComponentType<SVGProps<SVGSVGElement>>;
  export const FaRocket: ComponentType<SVGProps<SVGSVGElement>>;
}

declare module '@/components/WaitlistForm' {
  export default function WaitlistForm(): JSX.Element;
} 