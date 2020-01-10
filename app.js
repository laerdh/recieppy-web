var express = require('express');
var app = express();

var mealResponse = [
    {
        date: new Date(2019, 11, 10),
        meal: {
            id: 1,
            title: 'Grillede koteletter med tomat og mozzarella',
            description: 'Koteletter er enkelt å hanskes med, og anses av mange som perfekt for grillings. Her har vi gjort en italiensk vri og toppet kotelettene med mozzarella og småtomater vendt i pesto. Super grillmat!'
        }
    },
    {
        date: new Date(2019, 11, 11),
        meal: {
            id: 2,
            title: 'Asiatisk biffsalat',
            description: 'Salat til middag?  Da er denne deilige biffsalaten med bokhvetenudler og friske grønnsaker midt i blinken.'
        }
    },
    {
        date: new Date(2019, 11, 12),
        meal: {
            id: 3,
            title: 'Tacopai',
            description: 'La to favoritter, taco og pai, smelte sammen i den nydelige kombinasjon tacopai! Nydelig som selvstendig rett, og super som et alternativ for de yngste på en festbuffet.'
        }
    }
];

app.get('/meals/week/:week', (req, res) => {
    console.log('Requesting meals for week ' + req.params.week);
    setTimeout(() => {
        res.json(mealResponse)
    }, 1000)
})

app.listen(3001);