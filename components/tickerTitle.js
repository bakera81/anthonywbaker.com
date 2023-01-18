import styles from './tickerTitle.module.css'

export default function TickerTitle({ children }) {
    return (
        <div className={styles.tickerWrap}>
            <div className={styles.ticker}>
                {children.map((child) => (
                    <div className={styles.tickerItem}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}