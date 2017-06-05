$(document).keydown(function(event){
        if(event.keyCode==27 || event.keyCode==13){
                 $('#failureDialog').modal('hide');
                 $('#successDialog').modal('hide');
        }
        else if(event.keyCode==27)
                $('#myModal').modal('hide');
                //OR if above doesn't work then use this one
                //$('#myModal').css('display','none');
});

function successModal(title, body) {
        // Display error message to the user in a modal
        $('#successDialog').find('h4').text(title);
        $('#successDialog').find('.modal-body').find('p').html(body);
        $('#successDialog').modal({keyboard: true, show:true});
        $([document, window]).unbind('.dialog-overlay');
        document.activeElement.blur();
        $('#successDialog').focus();
}

function failureModal(title, body) {
        $('#failureDialog').find('h4').text(title);
        $('#failureDialog').find('.modal-body').find('p').html(body);
        $('#failureDialog').modal({keyboard: true, show:true});
        $([document, window]).unbind('.dialog-overlay');
        document.activeElement.blur();
        $('#failureDialog').focus();
}

function confirmModal(title, body) {
        $('#confirmDialog').find('h4').text(title);
        $('#confirmDialog').find('.modal-body').find('p').html(body);
        $('#confirmDialog').modal({keyboard: false, show:true, backdrop:"static"});
        document.activeElement.blur();
        $('#confirmDialog').focus();
}
