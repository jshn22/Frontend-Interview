import 'react';

declare module 'react' {
  interface CSSProperties {
    WebkitLineClamp?: number;
    WebkitBoxOrient?: 'vertical' | 'horizontal';
  }
}
