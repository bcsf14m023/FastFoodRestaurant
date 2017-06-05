var count = localStorage.getItem("count");
if (count === null) {
    console.log(count);
    count = 0;
}
$(document).ready(function () {
    $('#navDrop').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).slideDown(500);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
    });
    $('#menuDrop').mouseover(function () {
        $(this).parent().css("background-color", "rgba(200,200,200,.2)");
    });
    $('#menuDrop').mouseleave(function () {
        $(this).parent().css("background-color", "");
    });
    countCheck();
    $('.contact-form').submit(function (e) {
        e.preventDefault();

        var uN = $('#username').val();
        var pW = $('#password').val();
        // (?=.*[A-Z]) - Assert a string has at least one Alphabet
        var regularExpression = /^(?=.*[A-z])[a-zA-Z0-9_]{5,30}$/;
        var regularExpression1 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%.^\-&*])[a-zA-Z0-9!@#.$%\-^&*]{6,30}$/;

        count++;
        localStorage.setItem("count", count);
        if (uN.length == 0) {
            failureModal("Error: No Username", "You didn't enter any username.");
            countCheck();
        }
        else if (pW.length == 0) {
            failureModal("Error: No Passsword", "You didn't enter any password.");
            countCheck();
        }
        else if (!regularExpression.test(uN)) {
            failureModal("Error: Incorret Username", "Only alphabets, digits and underscore is allowed in username.<br/>It should be atleast 5 characters long and must contain atleast one alphabet.");
            countCheck();
        }
        else if (!regularExpression1.test(pW)) {
            failureModal("Error: Incorret Password", "You have entered wrong password");
            countCheck();
        }
        else {
            var $form = $(this);

            $.post($form.attr("action"), $form.serialize(), function (response) {
                console.log(response);
                //alert(response.userID);
                if (response.rv == 1)
                {
                    localStorage.setItem("count", 0);
                    window.location.href = "/Admin/Index";
                }
                else
                {
                    failureModal('Error: Login Failed', response.text);
                    setTimeout(function () { countCheck(); }, 2000);
                }
            });
        }
    });
});

//TO validate username onBlur format
function userName() {
    var uN = $('#username').val();
    var regularExpression = /^(?=.*[A-z])[a-zA-Z0-9_]{5,30}$/;

    if (!regularExpression.test(uN)) {
        $('#username').focus();
        failureModal("Error: Incorret Username", "Only alphabets, digits and underscore is allowed in username.<br/>It should be atleast 5 characters long and must contain atleast one alphabet.");
    }
}

function countCheck() {
    if (count >= 5) {
        failureModal("Error: Too many wrong inputs", "You have entered too many wrong inputs. </br>Now you can't try again for 5 minutes.");

        $('#username').attr('disabled', true);
        $('#password').attr('disabled', true);
        $('#submit_button').attr('disabled', true);

        setTimeout(function () {
            $('#username').attr('disabled', false);
            $('#password').attr('disabled', false);
            $('#submit_button').attr('disabled', true);
            localStorage.setItem("count", 0);
        }, 300000);
    }
}