$(function(){

    var apiUrl = "http://twitterinc.herokuapp.com";

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

    var focusOnEmailInput = function(){
      $('input[name=email]').focus();
    };

    $("#get-started-now").click(focusOnEmailInput);
    $("#get-started-top").click(focusOnEmailInput);

    $('form#email').submit(function(e){
        e.preventDefault();
        var emailInput = $(this).find('input[name=email]');
        var newEmail = emailInput.val();

        var url = apiUrl + "/users";

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

        $('#get-started-modal').html($('#next-modal').html());

        return false;
    });

    // For clicking the next button:
    $('#submit-email').click(function(){
      $('form#email').submit();
    });


    if (window.location.hash === "#success") {
      $.ambiance({message: "Check your email for further details.",
                  title: "Thanks!",
                  type: "success",
                  permanent: true});

      $.post(apiUrl + "/success");
    }

});


