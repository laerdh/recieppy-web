import { CardViewType } from "./CardView"

class CardViewUtil {
    public static cardClass(cardViewType: CardViewType): string {
        const cardContainerClass = 'card-container'

        switch (cardViewType) {
            case CardViewType.Default:
                return `${cardContainerClass} default-card`
            case CardViewType.Promo:
                return `${cardContainerClass} promo-card`
        }
    }
}

export default CardViewUtil