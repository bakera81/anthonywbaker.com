import styles from './tickerTitle.module.css'

//https://codepen.io/lewismcarey/pen/GJZVoG
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