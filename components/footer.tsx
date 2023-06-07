import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© Cooper Miller</p>
            <a href="https://github.com/kcoopermiller/kcoopermiller.github.io" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </footer>
    );
};
