displayView = function(){
// the code required to display a view
//var myWelcomeView = document.getElementById("welcomeview").innerHTML;
document.getElementById("welcomeview_body").innerHTML = document.getElementById("profileview").innerHTML;
};//welcomeview
window.onload = function(){
    
    displayView();
//code that is executed as the page is loaded. 
};

//***************Clear borders***************
clearFormBorder = function() {
      document.getElementById("username_id").style.border="";
      document.getElementById("password_id").style.border="";
      document.getElementById("username_signup_id").style.border="";
      document.getElementById("password_signup_id").style.border="";
      document.getElementById("password_repeat_id").style.border="";
      document.getElementById("firstname_id").style.border="";
      document.getElementById("lastname_id").style.border="";
      document.getElementById("gender_id").style.border="";
      document.getElementById("city_id").style.border="";
      document.getElementById("country_id").style.border="";
      document.getElementById("login_fail").innerHTML = "";
      document.getElementById("signup_fail").innerHTML = "";
}
clearAllForms = function() {
    document.getElementById("username_id").value="";
    document.getElementById("password_id").value="";
    document.getElementById("username_signup_id").value="";
    document.getElementById("password_signup_id").value="";
    document.getElementById("password_repeat_id").value="";
    document.getElementById("firstname_id").value="";
    document.getElementById("lastname_id").value="";
    document.getElementById("gender_id").value="male";
    document.getElementById("city_id").value="";
    document.getElementById("country_id").value=""; 
}

ClearSignUpText = function() {
    if (document.getElementById("signup_fail").innerHTML =="Successfully created a new user.") {
    document.getElementById("signup_fail").innerHTML = "";
    }
}

ClearLoginText = function() {
    document.getElementById("login_fail").innerHTML = "";
    document.getElementById("username_id").style.border = "";
    document.getElementById("password_id").style.border = "";
    document.getElementById("password_id").innerHTML = "";
}

//************** RED MESSAGE OF DEATH ********
login_error = function() {
    document.getElementById("login_fail").innerHTML = "Fill in all forms";
}
email_login_error = function() {
    document.getElementById("login_fail").innerHTML = "Not an correct email";
}
email_signup_error = function() {
    document.getElementById("signup_fail").innerHTML = "Not an correct email";
}
signup_error = function() {
    document.getElementById("signup_fail").innerHTML = "Fill in all forms";
    //"Something went wrong";
}
signup_error_password = function() {
    document.getElementById("signup_fail").innerHTML = "Passwords dont match";
}

//************** LOGIN VALIDATION ****************
loginValidateForm = function(){
clearFormBorder();
var error_flag = 0;
var name=document.forms["sign_in_form"]["username"].value;
if (name==null || name=="") {
  document.getElementById("username_id").style.borderColor="#FF0000";
  error_flag = 1;
  login_error();
  }

var atpos=name.indexOf("@");
var dotpos=name.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=name.length)
  {
  document.getElementById("username_id").style.borderColor="#FF0000";
  error_flag = 1;
  email_login_error();
  }

var password=document.forms["sign_in_form"]["password"].value;
if (password==null || password=="") {
  document.getElementById("password_id").style.borderColor="#FF0000";
  login_error();
  error_flag = 1;
  }
  if (error_flag == 0) {
  var results = serverstub.signIn(name, password);
    document.getElementById("login_fail").innerHTML = results.message;
    if (results.message == "Successfully signed in.") {
        sessionStorage.token = results.data;
        document.getElementById("welcomeview_body").innerHTML = document.getElementById("profileview").innerHTML;
        }
    if (results.message == "Wrong username or password.") {
        document.getElementById("username_id").style.borderColor="#FF0000";
        document.getElementById("password_id").style.borderColor="#FF0000";
    }
    clearAllForms();
  }
  return false;
};

// ************ SIGN UP VALIDATION *************
signupValidateForm = function(){

clearFormBorder(); // Remove old red for replacement of new ones
var error_flag = 0;
var username_signup=document.forms["sign_up_form"]["username_signup"].value;
if (username_signup==null || username_signup=="") {
    document.getElementById("username_signup_id").style.borderColor="#FF0000";
    error_flag = 1;
  }
  
var atpos=username_signup.indexOf("@");
var dotpos=username_signup.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=username_signup.length)
  {
  document.getElementById("username_signup_id").style.borderColor="#FF0000";
  error_flag = 1;
  email_signup_error();
  }
  
  
var password_signup=document.forms["sign_up_form"]["password_signup"].value;
if (password_signup==null || password_signup=="") {
  document.getElementById("password_signup_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
  
var password_repeat=document.forms["sign_up_form"]["password_repeat"].value;
  if (password_repeat==null || password_repeat=="") {
  document.getElementById("password_repeat_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
  
  if (password_signup != password_repeat) {
    //password_repeat.val("");
    document.getElementById("password_repeat_id").style.borderColor="#FF0000";
    document.getElementById("password_signup_id").style.borderColor="#FF0000";
    document.getElementById("password_repeat_id").value="";
    document.getElementById("password_signup_id").value="";
    document.getElementById("signup_fail").innerHTML = "Passwords dont match";
    error_flag = 2;
  }
  
var firstname=document.forms["sign_up_form"]["firstname"].value;
if (firstname==null || firstname=="") {
  document.getElementById("firstname_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
 
var lastname=document.forms["sign_up_form"]["lastname"].value; 
  if (lastname==null || lastname=="") {
  document.getElementById("lastname_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
  
var gender=document.forms["sign_up_form"]["gender"].value;
if (gender==null || gender=="") {
  document.getElementById("gender_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
  
var city=document.forms["sign_up_form"]["city"].value;
if (city==null || city=="") {
  document.getElementById("city_id").style.borderColor="#FF0000";
  error_flag = 1;
  }
  
var country=document.forms["sign_up_form"]["country"].value;
if (country==null || country=="") {
  document.getElementById("country_id").style.borderColor="#FF0000";
  error_flag = 1;
  }

if (error_flag == 0) {
var formData = {'email': username_signup, 'password': password_signup, 'firstname': firstname,
    'familyname': lastname, 'gender': gender, 'city': city, 'country': country};
var result = serverstub.signUp(formData);
document.getElementById("signup_fail").innerHTML = result.message;
if (result.message == "User already exists.") {
    document.getElementById("username_signup_id").style.borderColor="#FF0000";
}
else if (result.message == "Successfully created a new user.") {
    clearAllForms();
}
}
if (error_flag == 1) {
    signup_error();
}
return false;
};