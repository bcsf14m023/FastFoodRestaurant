function changePassword(old,newP,confirm){
    //Code to change password
    
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%.^\-&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#.$%\-^&*]{6,30}$/;
    // (?=.*[0-9]) or (?=.*[/d/]) - Assert a string has at least one number;
    // (?=.*[A-Z]) - Assert a string has at least one UpperCase;
    // (?=.*[a-z]) - Assert a string has at least one LowerCase;
    // (?=.*[!@#$%^&*]) - Assert a string has at least one special character.
    
    if(old == ""){
        failureModal("Error: Incomplete input","Please enter all required fields for completion of this action.<br/><center><span><b><em>Old passowrd missing</b></em></span></center>");
    }
    else if(newP == ""){
        failureModal("Error: Incomplete input","Please enter all required fields for completion of this action.<br/><center><span><b><em>New passowrd missing</b></em></span></center>");
    }
    else if(confirm == ""){
        failureModal("Error: Incomplete input","Please enter all required fields for completion of this action.<br/><center><span><b><em>Confirm passowrd missing</b></em></span></center>");
    }
    else if(newP.length < 7 || confirm.length < 7){
        failureModal("Error: Too Short Password","Please enter long passwords for better protection.<br/><center><span><b><em>At-least 7 characters long</b></em></span></center>");
    }
    else if(newP.length > 30 || confirm.length > 30){
        failureModal("Error: Too Long Password","Please enter suitable passwords for better protection.<br/><center><span><b><em>At-most 30 characters long</b></em></span></center>");
    }
    else if (!regularExpression.test(old)) {
        failureModal("Error: Incorret Old Password Format", "<b>Old password doesn\'t match criteria.</b><br/><br/><em><b>Criteria:</b><br/>--Atleast 7-characters and at-most 30-characters long.<br/>--Alphabets and digits are allowed."
            + "<br/>--Atleast 1 UpperCase alphabet.<br/>--Atleast 1 lowerCase alphabet.<br/>--Atleast 1 Digit .<br/>--Atleast 1 special character.<br/>--Other allowed chracters are:  </em> <span style='letter-spacing:2px'>[!@#$-%^&*.]</span>");
    }
    else if (!regularExpression.test(newP)) {
        failureModal("Error: Incorret New Password","<b>New Password doesn\'t match criteria.</b><br/><br/><em><b>Criteria:</b><br/>--Atleast 7-characters and at-most 30-characters long.<br/>--Alphabets and digits are allowed."
            +"<br/>--Atleast 1 UpperCase alphabet.<br/>--Atleast 1 lowerCase alphabet.<br/>--Atleast 1 Digit .<br/>--Atleast 1 special character.<br/>--Other allowed chracters are:  </em> <span style='letter-spacing:2px'>[!@#$-%^&*.]</span>");
    }
    else if(old == newP){
        failureModal("Error: Same Password","You have entered same New Password and Old Password . <br/>To change password, new password must be different then old.");
    }
    else if(confirm != newP){
        failureModal("Error: Password Mismatch","New Password and Confirm new Password doesn\'t match.<br/> Try again...");
    }
    else{
        $('#changePasswordForm').trigger('submit');
        //Now change password in DB from serverSide
    }
}

$(document).ready(function () {
    $('#changePasswd').click(function(){
        confirmModal("Update Password Confirmation","Are you sure you want to update password?");
    });
    
    //To show confirmDialog on Enter
    $('#changePassword').each(function() {
        $('#confirmPassword').keypress(function(e) {
            // Enter pressed?
            if(e.which == 13) {
                $('#changePasswd').click();
            }
        });
    });
    
    $('form[name="changePassword"]').submit(function(e){
        e.preventDefault();
        var $form = $(this);
        $.post($form.attr("action"), $form.serialize(), function (response) {
            console.log(response);
            if (response.rv == 1) {
                successModal("Task Successful","Your Password is changed successfully.");
                //To clear form fields
                $('#changePassword').modal('hide');
                $('#oldPassword').val("");
                $('#newPassword').val("");
                $('#confirmPassword').val("");
            }
            else if (response.rv == 2){
                failureModal('Incorrect Password',response.text);                
            }
            else if (response.rv == 0) {   // Session Expired
                failureModal('Error', response.text);
                setTimeout(function () {
                    window.location.href = '/Home/NoLogin';
                }, 1000);
            }
            else {
                failureModal('Incorrect Password', response.text);
            }
        });  
    });
});