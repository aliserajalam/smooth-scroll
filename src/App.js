import React, { useRef, useEffect } from 'react';
import './App.scss';

import useWindowSize from './hooks/useWindowSize';

function App() {
  // Hook returning the window size on change
  const size = useWindowSize();
  // Referencing App and scroll div
  const app = useRef();
  const scrollContainer = useRef();

  // Scroll variable configuration
  const scrollConfigs = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  // Hook that sets the body height to the scroll container's height
  // Reruns whenever the document window changes height
  useEffect(() => {
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  }, [size.height]);

  // Run scrolling once page has loaded
  useEffect(() => {
    requestAnimationFrame(() => scrolling());
  }, []);

  // Scrolling method
  const scrolling = () => {
    scrollConfigs.current = window.scrollY;
    scrollConfigs.previous +=
      (scrollConfigs.current - scrollConfigs.previous) * scrollConfigs.ease;
    scrollConfigs.rounded = Math.round(scrollConfigs.previous * 100) / 100;

    scrollContainer.current.style.transform = `translateY(-${scrollConfigs.rounded}px)`;

    requestAnimationFrame(() => scrolling());
  };

  return (
    <div ref={app} className='App'>
      <div ref={scrollContainer} className='scroll'></div>
    </div>
  );
}

export default App;
