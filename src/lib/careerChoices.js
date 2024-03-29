const careerChoices = [
    ["Industrial Designer", "Fashion Designer", "Interior Designer", "Graphic Designer"],
    ["Footballer", "Backetball Player", "Tennis Player", "Cricketer"],
    ["Business manager", "Project manager", "Operations manager", "Human resources manager"],
    ["Web Engineer", "Machine learning Engineer", "IOS Engineer", "Andriod Engineer"],
    ["Dermatologist", "Dentist", "Oncologist", "Ophthalmologist"],
    ["Print Journalist", "Broadcast Journalist", "Online Journalist", "Data Journalist"],
    ["Engineering Professor", "History Professor", "Psychology Professor", "Management Professor"],
    ["Clinical psychologist", "performance psychologist", "Industrial Psychologist", "Child Psychologist"],
    ["Educational Youtuber", "Gaming YouTuber", "Skincare YouTuber", "Travel Volgger"],
    ["Fiction Writer", "Non Fiction Writer", "Poet", "Technical Writer"]
]

function getCareerChoices(roundNumber){
    let id;

    if(roundNumber < careerChoices.length){
        id = roundNumber;
    }
    else{
        id = Math.floor(Math.random() * 10)
    }

    const choices = [
        {
            id : 1,
            name : careerChoices[id][0]
        },
        {
            id : 2,
            name : careerChoices[id][1]
        },
        {
            id : 3,
            name : careerChoices[id][2]
        },
        {
            id : 4,
            name : careerChoices[id][3]
        }
    ];

    return choices
};

export function getCareerLabels(roundNumber){
    return careerChoices[roundNumber]
}

export default getCareerChoices