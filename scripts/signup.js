$(document).ready(function ()
{
    $('#logout').click(function () {
        confirmModal("Logout Confirmation", "Are you sure you want to LOGOUT?");
    });

    $('#no').click(function () {
        $('#confirmDialog').modal('hide');
    });

    $('.contact-form').submit(function (e) {
        e.preventDefault();

        var uN = $('#username').val();
        var pW = $('#password').val();
        var pW2 = $('#confirmPassword').val();
        // (?=.*[A-Z]) - Assert a string has at least one Alphabet
        var regularExpression = /^(?=.*[A-z])[a-zA-Z0-9_]{5,30}$/;
        var regularExpression1 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%.^\-&*])[a-zA-Z0-9!@#.$%\-^&*]{6,30}$/;

        if (uN.length == 0) {
            failureModal("Error: No Username", "You didn't enter any username.");
        }
        else if (pW.length == 0) {
            failureModal("Error: No Passsword", "You didn't enter any password.");
        }
        else if (pW2.length == 0) {
            failureModal("Error: No Confirm Passsword", "Confirm password field is empty.");
        }
        else if (!regularExpression.test(uN)) {
            failureModal("Error: Incorret Username", "Only alphabets, digits and underscore is allowed in username.<br/>It should be atleast 5 characters long and must contain atleast one alphabet.");
        }
        else if (!regularExpression1.test(pW)) {
            failureModal("Error: Incorret Password", "<b>Password doesn\'t match criteria.</b><br/><br/><em><b>Criteria:</b><br/>--Atleast 7-characters and at-most 30-characters long.<br/>--Alphabets and digits are allowed."
                + "<br/>--Atleast 1 UpperCase alphabet.<br/>--Atleast 1 lowerCase alphabet.<br/>--Atleast 1 Digit .<br/>--Atleast 1 special character.<br/>--Other allowed chracters are:  </em> <span style='letter-spacing:2px'>[!@#$-%^&*.]</span>");
        }
        else if (!regularExpression1.test(pW2)) {
            failureModal("Error: Incorret Confirm Password", "<b>Confirm Password doesn\'t match criteria.</b><br/><br/><em><b>Criteria:</b><br/>--Atleast 7-characters and at-most 30-characters long.<br/>--Alphabets and digits are allowed."
                + "<br/>--Atleast 1 UpperCase alphabet.<br/>--Atleast 1 lowerCase alphabet.<br/>--Atleast 1 Digit .<br/>--Atleast 1 special character.<br/>--Other allowed chracters are:  </em> <span style='letter-spacing:2px'>[!@#$-%^&*.]</span>");
        }
        else if (pW2 != pW) {
            failureModal("Error: Password Mismatch", "Password and Confirm Password doesn\'t match.<br/> Try again...");
        }
        else
        {
            var $form = $(this);

            $.post($form.attr("action"), $form.serialize(), function (response) {
                console.log(response);
                if (response.rv == 1)
                {
                    successModal('Task Successful', response.text);
                }
                else if (response.rv == 0) {   // Session Expired
                    failureModal('Error', response.text);
                    setTimeout(function () {
                        window.location.href = '/Home/NoLogin';
                    }, 1000);
                }
                else
                {
                    failureModal('Error', response.text);                    
                }
            });
        }
    });

    $('#yes').click(function () {
        $('#confirmDialog').modal('hide');
        var chPT = 'Update Password Confirmation';
        var logout = 'Logout Confirmation';

        // alert($('#confirmTitle').text());

        if ($('#confirmTitle').text() === logout) {
            //Temp for logging out
            $.get("Logout", function (response) {
                if (response.rv == 1) {
                    successModal("Task successful", "Now you are logged out.<br/>Redirecting....");
                    window.location.href = '/Home/Index';
                }
                else if (response.rv == 0) {   // Session Expired
                    failureModal('Error', response.text);
                    setTimeout(function () {
                        window.location.href = '/Home/NoLogin';
                    }, 1000);
                }
            });
        }
        else if ($('#confirmTitle').text() === chPT) {
            var old = $('#oldPassword').val();
            var newP = $('#newPassword').val();
            var confirm = $('#confirmPassword').val();
            changePassword(old, newP, confirm);
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