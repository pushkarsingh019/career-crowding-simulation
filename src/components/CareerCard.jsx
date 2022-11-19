function CareerCard({name,id, changeChoice, numberOfPeople}){
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
            <code>{id}</code>
            <h3>{name}</h3>
            <p>{numberOfPeople ? `${numberOfPeople} have chosen this` : "No one has chosen this yet"}</p>
            <button onClick={() => choiceHandler(id)}>Choose Career</button>
        </div>
    )
};


export default CareerCard;
