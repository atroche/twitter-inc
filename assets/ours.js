$(function(){
    var $start = $('#start'),
        start = $start.get(0),
        $reset = $('#reset'),
        reset = $reset.get(0),
        $counter = $('#follower-count'),
        startVal = $counter.text(),
        currentVal,
        endVal = 250,
        fontSize = $counter.css('font-size');


    this.disabled = true;
    currentVal = startVal;
    var i = setInterval(function ()
    {
        if (currentVal === endVal)
        {
            clearInterval(i);
        }
        else
        {
            currentVal++;
            $counter.text(currentVal);
        }
    }, 100);

    $("#get-started-top").leanModal({closeButton: ".modal_close"});
    $("#get-started-now").leanModal({closeButton: ".modal_close"});
    $('form#email').submit(function(e){
        e.preventDefault();
        var emailInput = $(this).find('input[name=email]');
        var newEmail = emailInput.val();

        var url = "http://api.triviainc.com/users";

        $.ajax({
          type: "POST",
          url: url,
          data: {
            email: newEmail
          },
          success: function(data) {
            console.log("success:");
            console.log(data);
          },
          error: function(xhr){
            console.log('error: ');
            console.log(xhr);
          }
        });

        emailInput.val('');

        $('#lean_overlay').hide();
        $("#get-started-modal").hide();
        $.ambiance({message: "We'll be in touch shortly.",
                    title: "Thanks!",
                    type: "success",
                    permanent: true});
        return false;
    });
    // $('#submit-email').parent().clicksubmit();

});


