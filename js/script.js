// i giorni li vado a creare attraverso il mio oggetto moment()
// le festività le creo attraverso le API che mi offre boolean
// quando clicco sul pulsante next devo aggire sull'oggetto moment
// se il mese va oltre l'undicesimo partirà un messaggio di errore e se scende sotto lo zero
//https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
/* {
    "success": true,
    "response": [
        {
            "name": "Capodanno",
            "date": "2018-01-01"
        },
        {
            "name": "Epifania",
            "date": "2018-01-06"
        }
    ]
} */
$(document).ready(function(){
    // data di partenza
    // creiamo un oggetto moment su questa data
    var oggData=moment("2018-01-01");
    $('h1.month').text(oggData.format('MMMM-YYYY'));
    var anno=oggData.format('YYYY')
    var mese=oggData.format('MMMM')


    var giorniDelMese=oggData.daysInMonth() 
    for(var i=1; i<=giorniDelMese; i++){
        console.log(i)
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);
        var context = { 
            day: addZero(i), 
            month: mese,
            completeDate: anno + mese + addZero(i)
        };
        var html = template(context);

        $('ul.month-list').append(html);
    }

});

function addZero(n){
    if(n<10){
        return '0' + n;
    }

    return n;
}

