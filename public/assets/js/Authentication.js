/*-------------------
  CHOICE FUNCTIONS
---------------------*/

/* Called when user clicks SignIn button */
function select_SignIn() {
  document.getElementById('signIn').classList.toggle('sign_mode_active');
  document.getElementById('signUp').classList.remove('sign_mode_active');
  document.getElementById('signIn_form').classList.remove('form_inactive');
  document.getElementById('signUp_form').classList.toggle('form_inactive');
}

/* Called when user clicks SignUp button */
function select_SignUp() {
  document.getElementById('signIn').classList.remove('sign_mode_active');
  document.getElementById('signUp').classList.toggle('sign_mode_active');
  document.getElementById('signIn_form').classList.toggle('form_inactive');
  document.getElementById('signUp_form').classList.remove('form_inactive');
}

/* Called when user clicks the eye icon in the password input box */
function showHidePassword(element, input_id) {
  if(element.classList.contains('fa-eye-slash')){ 
    element.classList.remove('fa-eye-slash');
    element.classList.toggle('fa-eye');
    document.getElementById(input_id).setAttribute('type', 'text');
  }else {
    element.classList.remove('fa-eye');
    element.classList.toggle('fa-eye-slash');
    document.getElementById(input_id).setAttribute('type', 'password');
  }
}




/*---------------------------
  AUTHENTICATION FUNCTIONS
----------------------------*/

/* Called when user try to signIn */
function signIn() {
  var uName = document.getElementById('signIn_username').value;
  var password = document.getElementById('signIn_password').value;
  
  $.ajax({
    url: '/login',
    type: 'POST',
    data: {
      username: uName,
      password: password
    },

    dataType: 'json',
    success: (data) => { 
      if(data){
          sessionStorage.setItem('logged', 'true');
          sessionStorage.setItem('username', uName);
          window.location.reload();

      } 
    }
  });
}
  
/* Called when user try to signUp */
function signUp() {
  var name = document.getElementById('signUp_name').value;
  var surname = document.getElementById('signUp_surname').value;
  var uName = document.getElementById('signUp_username').value;
  var email = document.getElementById('signUp_email').value;
  var password = document.getElementById('signUp_password').value;
  var confPassword = document.getElementById('signUp_conf_password').value;
  
  alert('registration not yet implemented');
  //DO BACK END SIGN UP
  
  //sessionStorage.setItem('logged', 'true');
  //sessionStorage.setItem('username', uName);
  //window.location.reload();
}