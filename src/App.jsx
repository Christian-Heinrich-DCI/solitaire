import { useEffect, useLayoutEffect, useState } from "react";
import Card from "./components/Card.jsx";
import "./App.css";

function App() {
    // HELPER STATES
    const [pageLoad, setPageLoad] = useState(true);

    // GAME TABLE SETUP
    const [tableau, setTableau] = useState([[], [], [], [], [], [], []]); // 7
    const [stock, setStock] = useState([]); // display none
    const [foundation, setFoundation] = useState([[], [], [], []]); // 4
    const [waste, setWaste] = useState([]); // display last 3

    // GAME FUNCTION
    const [activeCard, setActiveCard] = useState({});

    // Setting up game board before rendering
    useLayoutEffect(() => {
        // Helper Function to shuffle cards
        function shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex > 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex],
                ];
            }

            return array;
        }

        // Constructing the deck of all 52 cards
        const cardValues = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
            "A",
        ];
        const cardColors = ["♣", "♦", "♥", "♠"];
        const allCards = [];
        cardColors.forEach((color) => {
            cardValues.forEach((value) => {
                allCards.push({ color, value, faceUp: true });
            });
        });

        shuffle(allCards);

        // fill tableau rows
        const newTableau = [];
        for (let i = 0; i < 7; i++) {
            const newRow = [];
            for (let j = 0; j <= i; j++) {
                newRow.push(allCards.pop()); // remove card from deck
            }
            newTableau.push(newRow);
        }
        setTableau(newTableau);
        console.log(newTableau);

        setStock(allCards); // remaining cards are the "stock"
        setPageLoad(false);
    }, []);

    const revealNextCard = () => {
        // Add currently shown stock card to waste
        const newWaste = [...waste, stock[stock.length - 1]];
        setWaste(newWaste);
        // remove last card from stock
        const newStock = stock.slice(0, -1);
        setStock(newStock);
        console.log("reveal next card...");
    };

    if (pageLoad) return <>LOADING...</>;
    else
        return (
            <>
                {/* Just for Dev */}
                <aside>active card: {JSON.stringify(activeCard)}</aside>

                {/* Game Table */}
                <figure className="game">
                    <section className="stock">
                        {stock.length > 0 ? (
                            <Card
                                card={stock[stock.length - 1]}
                                onClick={revealNextCard}
                                // faceUp={false}
                            />
                        ) : null}
                    </section>
                    <section className="waste">
                        {waste.length > 0 ? (
                            <Card
                                card={waste[waste.length - 1]}
                                // faceUp={false}
                            />
                        ) : null}
                    </section>
                    <section className="foundation">
                        {/* <Card color={allCards[4].color} value={allCards[4].value} />
                <Card color={allCards[5].color} value={allCards[5].value} />
                <Card color={allCards[6].color} value={allCards[6].value} />
                <Card color={allCards[7].color} value={allCards[7].value} /> */}
                    </section>
                    <section className="tableau">
                        {tableau.map((row, rowIndex) => (
                            <figure
                                key={rowIndex}
                                role="group"
                                className={`row${rowIndex + 1}`}
                            >
                                {row.map((card, cardIndex) => (
                                    // <span key={cardIndex}>
                                    //     {JSON.stringify(card)}
                                    // </span>
                                    <Card
                                        key={rowIndex + "-" + cardIndex}
                                        id={rowIndex + "-" + cardIndex}
                                        card={card}
                                        faceUp={cardIndex === row.length - 1}
                                        setActiveCard={setActiveCard}
                                    />
                                ))}
                            </figure>
                        ))}
                    </section>
                    {/* <section className="allCards">
                {allCards.map((card, index) => (
                    
                ))}
            </section> */}
                </figure>
            </>
        );
}

export default App;
