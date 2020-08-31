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
    numero= 01;
    var t=moment(`2018-01-01`);
    $('button#next').on('click',function(){
        '0' + numero++;
        t = moment(`2018-${numero}-01`)
    });   
    //incrementaValore(numero);
    var oggData=t;
    insertDays(oggData);
    insertHolidays(oggData);
});

function addZero(n){
    if(n<10){
        return '0' + n;
    }

    return n;
}

function insertDays(data){
    $('h1.month').text(data.format('MMMM-YYYY'));
    var anno=data.format('YYYY')
    var mese=data.format('MMMM')


    var giorniDelMese=data.daysInMonth() 
    for(var i=1; i<=giorniDelMese; i++){
        //console.log(i)
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);
        var context = { 
            day: addZero(i), 
            month: mese,
            completeDate: anno + '-' + data.format('MM') + '-' + addZero(i)
        };
        var html = template(context);

        $('ul.month-list').append(html);
    }
}

function insertHolidays(data){
    $.ajax({
        type: "GET",
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        data: {
            year: data.year(),
            month: data.month()
        },
        success: function (risposta) {
          for(var i=0; i<risposta.response.length; i++){
            var listItem=$('li[data-complete-date=' + risposta.response[i].date + ']')
            listItem.append('-' + risposta.response[i].name);
            listItem.addClass("holiday");
          } 
        },
        error: function(errore){
            alert('errore' + errore)
        }
    });
}

function incrementaValore(n){
    return '0' + n++;
}

// al click 01 diventa 02 aggiungiamo 1 al mese 