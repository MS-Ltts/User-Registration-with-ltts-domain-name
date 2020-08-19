
$(document).ready(function () {
    $('#Signupndiv').hide();
});
//Show Password Script signup 
function showPassword() {
     var x = document.getElementById("adduserpassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// show password script login 
function showPasswordLogin() {

    var x = document.getElementById("showuserpassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
//hide login div and show signp div
function DoSignUP() {
    $('#Signupndiv').show();
    $('#logindiv').hide();

}
// new user registeration 
function DoAddUser() {
    var Name = $('#adduserName').val();
    var Email = $('#adduseremail').val();
    var Address = $('#addusereAddress').val();
    var Password = $('#adduserpassword').val();
    var ContactNO = $('#addusercontact').val();

    //removing extraa whitespaces
    Name = $.trim(Name).replace(/\s(?=\s)/g, '');
    Address = $.trim(Address).replace(/\s(?=\s)/g, '');

    var flag = DoAddUserValidation(Name, Email, Password, Address, ContactNO);
    if (flag == 0) {
        var input = {
            Name: Name,
            Password: Password,
            Email: Email,
            Address: Address,
            ContactNO: ContactNO
        };
        $.ajax({
            type: "POST",
            url: "../Home/DoSignUp",

            dataType: "json",

            data: input,

            success: function (data) {
                if (data.result == true) {
                    $('input[type=text]').val('');
                    $('input[type=checkbox]').prop('checked', false);
                    var tstBox = $("#toast-box").html();
                    toastr["success"](tstBox, 'User  Added Successfully');
                   
                }
                else {
                    var tstBox = $("#toast-box").html();
                    toastr["error"](tstBox, ' Already Exists');
                   
                }
            }
        });
    }
}
// validation for inputs
function DoAddUserValidation(Name, Email, Password, Address, ContactNO) {
    var flag = 0;
    //Name validation
    if (Name == "" || Name == null || Name.length == 0) {
        $('#adduserName').css('border-color', 'red');
        $('#addUserNameValidation').html(' Name cannot be empty <i class="fas fa-exclamation-triangle" style="float: right;"></i>');


        flag = 1;
    } else {
        $('#adduserName').css('border-color', '');
        $('#addUserNameValidation').html("");


    }
    //Email validation
    debugger;
    if ((Email == "" || Email == null || Email.length == 0)) {
        $('#adduseremail').css('border-color', 'red');
        $('#adduserEmailValidation').html('Email cannot be empty <i class="fas fa-exclamation-triangle" style="float: right;"></i>');

        flag = 1;
    }
    else if (validateEmail(Email) == false) {
        $('#adduseremail').css('border-color', 'red');
        $('#adduserEmailValidation').html('Invalid Email <i class="fas fa-exclamation-triangle" style="float: right;"></i>');
        flag = 1;
    }
    else if (isLtts(Email) == false) {
        $('#adduseremail').css('border-color', 'red');
        $('#adduserEmailValidation').html('No Email aprat from ltts  is allowed  <i class="fas fa-exclamation-triangle" style="float: right;"></i>');
        flag = 1;
    }
    
    else {
        $('#adduseremail').css('border-color', '');
        $('#adduserEmailValidation').html("");


    }

    //Password validation
    if (Password != "" && Password != null && Password.length > 0 && Password != "" && Password != null && Password.length > 0) {
        if (checkPassword(Password) == false) {
            $('#adduserpassword').css('border-color', 'red');
            $('#addUserPasswordValidation').html("Password must be including 1 letter and numeric characters greater then  8  digit ");
            flag = 1;
        }
        else if (Password.length < 8) {
            $('#adduserpassword').css('border-color', 'red');
            $('#addUserPasswordValidation').html("Password should be greater then  8 characters");
            flag = 1;
        }
        else {
            $('#adduserpassword').css('border-color', '');
            $('#addUserPasswordValidation').html("");
        }
    }
    else {
        $('#adduserpassword').css('border-color', 'red');
        $('#addUserPasswordValidation').html("Password must be including 1 letter and numeric characters greater then  8  digit ");
        flag = 1;
    }
    //Contact No. validation

    if (ContactNO == "" || ContactNO == null || ContactNO.length == 0) {
        $('#addusercontact').css('border-color', 'red');
        $('#addusercontactValidation').html('Contact Number cannot be empty <i class="fas fa-exclamation-triangle" style="float: right;"></i>');


        flag = 1;
    } else if (ContactNO.length < 9) {
        $('#addusercontact').css('border-color', 'red');
        $('#addusercontactValidation').html('Please Give Valid Contact Number <i class="fas fa-exclamation-triangle" style="float: right;"></i>');
        flag = 1;

    }
    else {
        $('#addusercontact').css('border-color', '');
        $('#addusercontactValidation').html("");


    }

    // address validation
    if (Address == "" || Address == null || Address.length == 0) {
        $('#addusereAddress').css('border-color', 'red');
        $('#addusereAddressValidation').html('Address cannot be empty <i class="fas fa-exclamation-triangle" style="float: right;"></i>');




        flag = 1;
    } else {
        $('#addusereAddress').css('border-color', '');
        $('#addusereAddressValidation').html("");


    }
    return flag;
}

//show login div or hide signup div 
function DoSignIN() {
    $('#Signupndiv').hide();
    $('#logindiv').show();
}

// validate user is valid or not during login 
function DoCheckUser() {
   
    var Email = $('#showuserEmail').val();
    var Password = $('#showuserpassword').val();
    Email = $.trim(Email).replace(/\s(?=\s)/g, '');
    var flag = 0;
    //Email validation
   
    if ((Email == "" || Email == null || Email.length == 0)) {
        $('#showuserEmail').css('border-color', 'red');
        $('#showUserEmailValidation').html('Email cannot be empty <i class="fas fa-exclamation-triangle" style="float: right;"></i>');

        flag = 1;
    }
    
    else if (validateEmail(Email) == false) {
        $('#showuserEmail').css('border-color', 'red');
        $('#showUserEmailValidation').html('Invalid Email <i class="fas fa-exclamation-triangle" style="float: right;"></i>');
        flag = 1;
    }
    else if (isLtts(Email) == false) {
        $('#adduseremail').css('border-color', 'red');
        $('#addCustEmailValidation').html('No Email aprat from ltts  is allowed  <i class="fas fa-exclamation-triangle" style="float: right;"></i>');
        flag = 1;
    }
    else {
        $('#showuserEmail').css('border-color', '');
        $('#showUserEmailValidation').html("");
    }

    //Password validation
    if (Password != "" && Password != null && Password.length > 0 && Password != "" && Password != null && Password.length > 0) {
        if (checkPassword(Password) == false) {
            $('#showuserpassword').css('border-color', 'red');
            $('#showUserPasswordValidation').html("Password must be including 1 letter and numeric characters greater then  8  digit ");
            flag = 1;
        }
        else if (Password.length < 8) {
            $('#showuserpassword').css('border-color', 'red');
            $('#showUserPasswordValidation').html("Password should be greater then  8 characters");
            flag = 1;
        }
        else {
            $('#showuserpassword').css('border-color', '');
            $('#showUserPasswordValidation').html("");
        }
    }
    else {
        $('#showuserpassword').css('border-color', 'red');
        $('#showUserPasswordValidation').html("Password can not be empty ");
        flag = 1;
    }
  
    if (flag == 0) {
        var input = {
            Password: Password,
            Email: Email
        };
       
        $.ajax({
            type: "POST",
            url: "../Home/DoSignIn",
            dataType: "json",
            data: input,
            success: function (data) {
                if (data.result == true) {
                    $('input[type=text]').val('');
                    $('input[type=checkbox]').prop('checked', false);
                   
                    var tstBox = $("#toast-box").html();
                    toastr["success"](tstBox,'Successfull');
                }
                else {

                    var tstBox = $("#toast-box").html();
                    toastr["error"](tstBox,'Try Again !!');
                }
            }
        });
    }
}

// restrict special charater in input 
function avoidSplChars(e) {
    e = e || window.event;
    var bad = /[^\sa-z\d]/i,
        key = String.fromCharCode(e.keyCode || e.which);
    if (e.which !== 0 && e.charCode !== 0 && bad.test(key)) {
        e.returnValue = false;
        if (e.preventDefault) {
            e.preventDefault();
        }
    }
}

// clear error msg
function DataClear(Inputbox, Errorbox) {
    $(Inputbox).css('border-color', '');
    $(Errorbox).html("");
}
//Email validation
function validateEmail(email) {
    debugger;
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//Ltts..com Validation 
function isLtts(mailaddr) {
    debugger;
    var re = /.+@(ltts)\.com$/;
    return re.test(mailaddr);
}
//password validation

function checkPassword(val) {
    var returnResult = false;

    if (val.match(/[^a-zA-Z0-9 ]/g)) {

        var letters = /^[0-9a-zA-Z]+$/;

        if (val.match(/[0-9]/i)) {
            returnResult = true;
        }

        if (val.match(/[a-z]/i)) {
            // alphabet letters found
            returnResult = true;
        }
        else if (val.match(/[A-Z]/i)) {
            // alphabet letters found
            returnResult = false;
        }
    }
    return returnResult;

}
//no. validation
$('#addusercontact').keypress(function (event) {
    var test = event.charCode;
    var PhoneNumber = $('#addusercontact').val();
    if (PhoneNumber.length > 0 && event.charCode == 43 && PhoneNumber.indexOf("+") > -1) {
        event.preventDefault(); //stop character from entering input
    }

    if (event.charCode == 43) {
        //don't do any restriction
    }
    else if (event.charCode == 32) {
        event.preventDefault(); //stop character from entering input
    }
    else if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
        event.preventDefault(); //stop character from entering input
    }
});

toastr.options = {
    closeButton: true,
    timeOut: "5000",
    //progressBar: true,
    tapToDismiss: false,
}