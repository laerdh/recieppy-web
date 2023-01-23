import { CardViewType } from "./CardView"
import styles from './CardView.module.css'

class CardViewUtil {
    public static cardClass(cardViewType: CardViewType): string {
        switch (cardViewType) {
            case CardViewType.Default:
                return `${styles.baseCard} ${styles.defaultCard}`
            case CardViewType.Promo:
                return `${styles.baseCard} ${styles.promoCard}`
            case CardViewType.Small:
                return `${styles.baseCard} ${styles.smallCard}`

        }
    }

    public static overlayStyle(cardViewType: CardViewType): React.CSSProperties {
        if (cardViewType === CardViewType.Small) {
            return { flex: '1 1 100%', padding: 8 }
        }
        return { flex: '1 1 initial', padding: 16 }
    }
}

export default CardViewUtil