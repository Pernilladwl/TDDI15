window.onload = function(){
    
    displayView();
    if(sessionStorage.token != undefined) {	
    	var tab = sessionStorage.getItem("activeTab");
    	if(tab == "tab1") {
    		show_Content_tab1();
    	}
    	if(tab == "tab2") {
    		show_Content_tab2();
    	}
    	if(tab == "tab3") {
    		show_Content_tab3();
    	}
    }
//code that is executed as the page is loaded. 
};

displayView = function(){
// the code required to display a view
//var myWelcomeView = document.getElementById("welcomeview").innerHTML;
	document.getElementById("welcomeview_body").innerHTML = document.getElementById("welcomeview").innerHTML;
};//welcomeview


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

clear_wall_form = function() {
 		document.getElementById("wall_message").value="";

}

clear_AccountForms = function() {
	if(document.getElementById("psw_fail").innerHTML =="Password changed.") {
		document.getElementById("psw_old").value="";
		document.getElementById("psw_new").value="";
	}
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
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=name.length) {
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
			get_own_info();
	    }
	    if (results.message == "Wrong username or password.") {
	        document.getElementById("username_id").style.borderColor="#FF0000";
	        document.getElementById("password_id").style.borderColor="#FF0000";
	        clearAllForms();
	    }
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
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=username_signup.length) {
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
		if (result.message == "User already exists.") {
			document.getElementById("signup_fail").style.color="#FF0000";
		    document.getElementById("username_signup_id").style.borderColor="#FF0000";
		}
		else if (result.message == "Successfully created a new user.") {
		    clearAllForms();
		}
		document.getElementById("signup_fail").innerHTML = result.message;
	}
	if (error_flag == 1) {
	    signup_error();
	}
	return false;
};

psw_changeValidateForm = function() {
	var error_flag = 0;
	
	var old_password=document.forms["account_form"]["psw_old"].value;
	if (old_password==null || old_password=="") {
	  document.getElementById("psw_old").style.borderColor="#FF0000";
	  error_flag = 1;
	}

	var new_password=document.forms["account_form"]["psw_new"].value;
	if (new_password==null || new_password=="") {
	  document.getElementById("psw_new").style.borderColor="#FF0000";
	  error_flag = 1;
	}

	var new_password2=document.forms["account_form"]["psw_new2"].value;
	if (new_password2==null || new_password2=="") {
	  document.getElementById("psw_new2").style.borderColor="#FF0000";
	  error_flag = 1;
	}

	if (new_password != new_password2) {
	    document.getElementById("psw_new").style.borderColor="#FF0000";
	    document.getElementById("psw_new2").style.borderColor="#FF0000";
	    document.getElementById("psw_new").value="";
	    document.getElementById("psw_new2").value="";
	    document.getElementById("psw_fail").innerHTML = "Passwords dont match";
	    error_flag = 2;
	}

	if(error_flag == 0) {
		var result = serverstub.changePassword(sessionStorage.token, old_password, new_password);
		document.getElementById("psw_fail").innerHTML = result.message;
		clear_AccountForms();
		if(!result.success) {
			document.getElementById("psw_old").value="";
		}
	}

	if(error_flag == 1) {
		document.getElementById("psw_fail").innerHTML = "Fill in all forms";
	}
	return false;
};

browse_validateForm = function() {
	var search_email = document.forms["browse_form"]["browse_email"].value;
	var atpos=search_email.indexOf("@");
	var dotpos=search_email.lastIndexOf(".");
	if (search_email==null || search_email=="" || atpos<1 || dotpos<atpos+2 || dotpos+2>=search_email.length) {
	  document.getElementById("browse_email_id").style.borderColor="#FF0000"; 
	  document.getElementById("browse_fail").innerHTML = "Not a valid email";
	}
	else {
		serverstub.getUserDataByEmail(sessionStorage.token, search_email);
	}
	return false;
}


// SIGNED IN JS.s 

//SHOW TAB CONTENT FUNCTION
var selected = "a-tab1"; 
var selected_content = "tab-content-home";

function show_Content_tab1() {
	showContent("a-tab1", "tab-content-home");
	sessionStorage.setItem("activeTab", "tab1");
	get_own_info();
	return false; 
}

function show_Content_tab2() {
	showContent("a-tab2", "tab-content-browse");
	sessionStorage.setItem("activeTab", "tab2");
	return false;
}

function show_Content_tab3() {
	showContent("a-tab3", "tab-content-account");
	sessionStorage.setItem("activeTab", "tab3");
	return false;
}

function showContent(tab_number, content){
/*   document.getElementById(selected_content).style.background-color="#FFFCC"; */
   document.getElementById(selected_content).style.display="none";
   document.getElementById(selected).className="tabs"
   
/*   document.getElementById(content).style.background-color="#FFFFF";*/
   document.getElementById(content).style.display="block";
   document.getElementById(tab_number).className="selected" 
   
   selected = tab_number; 
   selected_content = content;
  
   return false;
}

function get_own_info(){
	var user_info = serverstub.getUserDataByToken(sessionStorage.token).data;
/*	var user_data = {'email': user_info.email, 'firstname': user_info.firstname,'familyname': user_info.familyname,
					'gender': user_info.gender, 'city': user_info.city, 'country': user_info.country};*/
	document.getElementById("home_email").innerHTML = user_info.email;				
	document.getElementById("home_finame").innerHTML = user_info.firstname;				
	document.getElementById("home_faname").innerHTML = user_info.familyname;				
	document.getElementById("home_gender").innerHTML = user_info.gender;				
	document.getElementById("home_city").innerHTML = user_info.city;				
	document.getElementById("home_country").innerHTML = user_info.country;				
	return; //user_data;
}

function post_own_message(){
	var mail = serverstub.tokenToEmail(sessionStorage.token);
//	document.getElementById("wall_message").select();
	var send = serverstub.postMessage(sessionStorage.token, document.getElementById("wall_message").select(), mail);
	if(send.success){
		clear_wall_form();
	}
return false;
}

function load_messeges(){

var message = serverstub.getUserMessagesByToken(sessionStore.token);

}

logOut = function() {
	var result = serverstub.signOut(sessionStorage.token);
   	var tab = sessionStorage.getItem("activeTab");
	if(tab == "tab1") {
		document.getElementById("p_logout-home").innerHTML = result.message;
		if(result.success) {
			document.getElementById("p_logout-home").style.color = "#33FF33";
		}
		else {
			document.getElementById("p_logout-home").style.color = "#FF0000";
		}
	}
	if(tab == "tab2") {
		document.getElementById("p_logout-browse").innerHTML = result.message;
		if(result.success) {
			document.getElementById("p_logout-browse").style.color = "#33FF33";
		}
		else {
			document.getElementById("p_logout-browse").style.color = "#FF0000";
		}
	}
	if(tab == "tab3") {
		document.getElementById("p_logout-account").innerHTML = result.message;
		if(result.success) {
			document.getElementById("p_logout-account").style.color = "#33FF33";
		}
		else {
			document.getElementById("p_logout-account").style.color = "#FF0000";
		}
	}
}
