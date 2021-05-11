import { useEffect } from 'react';

export const useInfinteScroll = ({ root = null, target, onIntersect, threshold = 0, rootMargin = '0px' }: any) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    console.log('target', target);

    if (!target) {
      return;
    }

    observer.observe(target);

    return () => {
      console.log('return');
      observer.unobserve(target);
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};
