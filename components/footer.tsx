import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>© Cooper Miller</p>
            <a className={styles.footerLink} href="https://github.com/kcoopermiller/kcoopermiller.github.io" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </footer>
    );
};
