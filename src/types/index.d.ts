/// <reference types="react" />

declare module 'framer-motion' {
  import { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
  }

  export const motion: {
    div: ComponentType<MotionProps & JSX.IntrinsicElements['div']>;
    form: ComponentType<MotionProps & JSX.IntrinsicElements['form']>;
    p: ComponentType<MotionProps & JSX.IntrinsicElements['p']>;
  };
}

declare module 'react-icons/fa' {
  import { FC, SVGProps } from 'react';
  export const FaCode: FC<SVGProps<SVGSVGElement>>;
  export const FaRobot: FC<SVGProps<SVGSVGElement>>;
  export const FaGraduationCap: FC<SVGProps<SVGSVGElement>>;
  export const FaRocket: FC<SVGProps<SVGSVGElement>>;
} 