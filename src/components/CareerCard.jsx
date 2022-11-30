

function CareerCard({name,id, changeChoice, numberOfPeople, currentChoice}){
    function choiceHandler(id){
        switch (id) {
            case 1:
                changeChoice(1)
                break;
            case 2:
                changeChoice(2);
                break;
            case 3:
                changeChoice(3);
                break;
        case 4:
                changeChoice(4);
                break;
            default:
                break;
        }
    };

    return(
        <div className="career-card">
            {/* <code>{id}</code> */}
            <h2>{name}</h2>
            <p>{numberOfPeople ? `${numberOfPeople} have chosen this` : "0 have chosen this"}</p>
            <button className={currentChoice === id ? "disabled" : "button"} onClick={() => {
                if(currentChoice !== id){
                    choiceHandler(id)
                }
            }}>{currentChoice ? currentChoice === id ? "Chosen" : "Change Career" : "Choose Career"}</button>
        </div>
    )
};


export default CareerCard;
