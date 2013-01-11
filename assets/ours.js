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

    $("a.get-started").leanModal({closeButton: ".modal_close"});
    $('form#email').submit(function(){
        var emailInput = $(this).find('input[name=email]');
        var newEmail = emailInput.val();
        var key = 'TriviaIncEmails';
        remoteStorage.getItem(key, function(emails){
            var emails = emails.split(',');
            emails.push(newEmail);
            remoteStorage.setItem(key, emails);
        });

        emailInput.val('');
        return false;
    });

});


