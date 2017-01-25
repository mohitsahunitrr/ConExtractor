/**
 * Created by Shubham Aggarwal on 12-11-2016.
 */

var effect = [
    "bounce",
    "pulse",
    "rubberBand",
    "shake",
    "headShake",
    "swing",
    "tada"
];

$(document).ready(function () {

    $('#heading').hover(function () {
        $(this).removeClass();
        var index = Math.floor((Math.random() * 10) + 1);
        $(this).addClass('animated ' + effect[index-1]);
    }, function () {
        $(this).removeClass();
    });

    $("#id_divform").submit(function (event) {

        event.preventDefault();

        $('#extract').prop('disabled', true);
        $('#reset').prop('disabled', true);

        var htmlcode = $('#id_textarea').val();

        if (htmlcode == "") {
            $('#error-message').val("You Cannot Submit Empty Div Element !");
            $('.modal').modal();
            $('#error-modal').modal('open');
            return;
        }

        var data = {
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            "textarea": htmlcode
        };

        $.ajax({
            type: "POST",
            url: '/',
            data: data,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $('#success-message').val(" Volia ! You have " + response["count"] + " Contacts . Check your downloads");
                $('.modal').modal();
                $('#success-modal').modal('open');
                var file = new File([response["contacts"]], "Contact-List.txt", {type: "text/plain;charset=utf-8"});
                saveAs(file);
            },
            error: function () {
                $('#error-message').val("Server not Responding !");
                $('.modal').modal();
                $('#error-modal').modal('open');
            }
        });

        $('#reset').prop('disabled', false);
        $('#extract').prop('disabled', false);
    });

    $("#reset").on("click", function () {
        $('#div-element').val("");
    });
});