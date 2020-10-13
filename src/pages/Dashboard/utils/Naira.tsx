import React, { useEffect } from 'react';
import { yuan } from '../components/Charts';
/**
 * 减少使用 dangerouslySetInnerHTML
 */

const Naira = ({ children }: { children: React.ReactText }) => {
  let main: HTMLSpanElement | null | undefined;

  useEffect(() => {
    if (main) main.innerHTML = yuan(children);
  }, []);

  return (
    <span
      ref={(ref) => {
        main = ref;
      }}
    />
  );
};
export default Naira;
