$(document).ready(function(){
    $('#result').hide();
    $('#jsonDiv').hide();
    $('#form').submit(function(event){
        event.preventDefault();
        console.log(window.location.href+'api/new/'+$('input[name="url"]').val());
        $.getJSON(window.location.href+'api/new/'+$('input[name="url"]').val(),function(data){
            $('#shortUrl').text(data.shortUrl);
            $('#result').show();
            $('#jsonText').text(JSON.stringify(data));
            $('#jsonDiv').show();
        });
    })
});