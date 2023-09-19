import "./Card.css";

export default function Card({
    card,
    faceUp = true,
    setActiveCard,
    onClick,
    id,
}) {
    const { color, value } = card;
    let classList = "card";
    if (!faceUp) classList += " hidden";
    else if (color === "♦" || color === "♥") classList += " red";

    return (
        <figure
            className={classList}
            role="group"
            onClick={() => {
                onClick ? onClick() : setActiveCard(id);
            }}
        >
            <span>{faceUp ? color : " "}</span>
            <span>{faceUp ? color : " "}</span>
            <span>{faceUp ? value : " "}</span>
            <span>{faceUp ? color : " "}</span>
            <span>{faceUp ? color : " "}</span>
        </figure>
    );
}
