import styles from './footer.module.css';
import { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© Cooper Miller</p>
            <a href="https://github.com/kcoopermiller/kcoopermiller.github.io" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            <ScrollToTop />
        </footer>
    );
};

function ScrollToTop () {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      if (window.pageYOffset > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
  
    return (
      isVisible && 
        <div onClick={scrollToTop} className={styles.scrollToTop}>
            <FaArrowCircleUp />
        </div>
    );
}