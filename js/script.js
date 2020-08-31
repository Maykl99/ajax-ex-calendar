// i giorni li vado a creare attraverso il mio oggetto moment()
// le festività le creo attraverso le API che mi offre boolean
// quando clicco sul pulsante next e prev devo aggire sull'oggetto moment 
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
    // dichiaro l'oggetto moment e passo un valore specifico
    var mese= 01;
    var oggData=moment(`2018-${mese}-01`);
    // richiamo le due funzione create
    insertDays(oggData);
    insertHolidays(oggData);
    // al click su next partirà una funzione di callback che andrà a verifica la condizione passata
    $('button#next').on('click',function(){
        var mese=01;
        if(oggData.month() == 11){
            //alert('Impossibile continuare')
            $('#messaggio_di_errore').show(400);
            messaggioDiErrore();

        }else{
            mese++;
            oggData.add(1,'months');
            $('.month-list').children().remove();
            $('h1').attr('data-this-date', `2018-${addZero(mese)}-01`)
            insertDays(oggData);
            insertHolidays(oggData);
        }
    });   
    // al click su prev partirà una funzione di callback che andrà a verifica la condizione passata
    $('button#prev').on('click',function(){
        if(oggData.month() == 0){
            //alert('Impossibile continuare')
            $('#messaggio_di_errore').show(400);
            messaggioDiErrore();
        }else{
            oggData.subtract(1, 'months');
            $('.month-list').children().remove();
            insertDays(oggData);
            insertHolidays(oggData);
        }
    });  
});

// lista funzioni 

// chiude finestra di errore
function messaggioDiErrore(){
    $('#messaggio_di_errore').click(function(){
        $(this).hide(300);
    });
};

// aggiunge 0
function addZero(n){
    if(n<10){
        return '0' + n;
    }

    return n;
}

// creo la struttura della pagina passando valori dinamicamente
function insertDays(data){
    $('h1.month').text(data.format('MMMM-YYYY'));
    var anno=data.format('YYYY')
    var mese=data.format('MMMM')


    var giorniDelMese=data.daysInMonth() // mi ritorna i giorni contenuti in un mese
    for(var i=1; i<=giorniDelMese; i++){
        // ciclo e stampo i valori nell'html attraverso Handlebars
        var source = $("#day-template").html();
        var template = Handlebars.compile(source);
        var context = { 
            day: addZero(i), // mi ritorna tutti i giorni del mese
            month: mese,
            completeDate: anno + '-' + data.format('MM') + '-' + addZero(i)
        };
        var html = template(context);

        $('ul.month-list').append(html);
    }
}

// richiamo l'API di boolean
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

