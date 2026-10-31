import { useEffect } from 'react';
import { initializeSmoothScroll } from '../smoothScroll.js';

export default function useSmoothScroll() {
  useEffect(() => initializeSmoothScroll(), []);
}
