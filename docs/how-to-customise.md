To customise this simulation for your own needs you need to
- Get data for the 10 rounds.
- upload the data.

## How to get the required data.

Assuming you have decided on a domain, now your job is to find data for the 10 rounds.

For context, here is how the current data is structured

```
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

```

### What makes good data

there are a few things to notice here

First, you would notice that all four set of choices are just variations of one idea. To take an example, *educational youtuber, gaming youtuber, skincare youtuber and travel vollger* are all youtubers, just of a different kind.

**Why this?**
I have designed the choices for two reasons
- To eliminate bias
- To deal with varying market cap.

Everyone already has their own preferences, if you are designing a simulation for fashion and give the four choices as four different types of dressing, everyone will be inclined to choose what they prefer.

So to elimiate this bais, you can give four variations of the same choice, thus reducing the bias. 

Also every choice has a market cap. In terms of careers, overall there is more opportunity in the tech industry than poterry bussiness. So in real life, even if more people choose tech, they would still have equal changes of being successfull. In terms of movies, there are just some genres more people like. So giving four variations of one choice will help elimimate this bias.

### How to add the data.
In the current app the choices are saved in the following path `/src/lib/careerChoices.js` . To add the data, all you need to do is write the choices in the same format in the given code example above. You can either make a new file or just make a new variable in the existing file.

To learn more about the syntax, you can read this -> [Arrays in Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## How to upload the data
Currently there is not streamlines process of uploading the data but you can either run this project locally and raise a pull request.

Or if you don't know how to run this project locally you can just write the data and mail it to me at *pushkars423@gmail.com*

In the v3 of the app, you would be able to do this right in the app and also let other people play your simulation.

## Raise an issue

If you have mailed me the new data and I have not responded or you are facing issues anywhere in the process, raise an issue on github and I will make the necessary changes.

