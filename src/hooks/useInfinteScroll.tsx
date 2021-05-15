import { useEffect } from 'react';

// hook으로 개발될 경우 diff 하는 값을 동적으로 추가 개발
export const useInfinteScroll = ({ root = null, target, onIntersect, threshold = 0.5, rootMargin = '0px' }: any) => {
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
