const handleContact = () => {
    var x = document.getElementById('contact').value;
    if ((x.length !== 10) && (x !== '')) {
        document.getElementById('contactmsg').style.color = 'red';
        if (x.match(/^[0-9]+$/))
          document.getElementById('contactmsg').innerHTML = 'Contact No should be of 10 digits';
        else 
        document.getElementById('contactmsg').innerHTML = 'Invalid Contact No';
        document.getElementById('submit').disabled = true;
    }
    else {
      if (x.match(/^[0-9]+$/)) {
        document.getElementById('contactmsg').innerHTML = '';
        document.getElementById('submit').disabled = false;
      }
      else {
        document.getElementById('contactmsg').style.color = 'red';
        document.getElementById('contactmsg').innerHTML = 'Invalid Contact No';
        document.getElementById('submit').disabled = true;
      }
    }
};

const handleName = () => {
    var x = document.getElementById('name').value;
    if (/[^a-z A-Z]/.test(x)) {
        document.getElementById('namemsg').style.color = 'red';
        document.getElementById('namemsg').innerHTML = 'Name should only contain letters';
        document.getElementById('submit').disabled = true;
    }
    else {
        if (x.length < 3 || x.length > 20 ) {
          document.getElementById('namemsg').style.color = 'red';
          document.getElementById('namemsg').innerHTML = 'Name ranges from 3 to 20 characters';
          document.getElementById('submit').disabled = true;
        }
        else {
          document.getElementById('namemsg').innerHTML = '';
          document.getElementById('submit').disabled = false;
        }
    }
};

const handleEmail = () => {
    var x = document.getElementById('email').value;
    console.log(x);
    if (x.indexOf("@") <= -1 && (x !== '')) {
        document.getElementById('emailmsg').style.color = 'red';
        document.getElementById('emailmsg').innerHTML = 'invalid email';
       
        document.getElementById('submit').disabled = true;
    }
    else {
        if (x.length < 3 || x.length > 320 ) {
          document.getElementById('emailmsg').style.color = 'red';
          document.getElementById('emailmsg').innerHTML = 'Email length ranges from 3 to 320 characters';
          document.getElementById('submit').disabled = true;
        }
        else {
          document.getElementById('emailmsg').innerHTML = '';
          document.getElementById('submit').disabled = false;
        }
    }
};

const checkPassword = () => {
    if (document.getElementById('password').value ===
      document.getElementById('confirm_password').value) {
        if (document.getElementById('password').value.length) {
        document.getElementById('msg').style.color = 'green';
        document.getElementById('msg').innerHTML = 'matching<br>';
        }
        else {
        document.getElementById('msg').innerHTML = '';
        }
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('msg').style.color = 'red';
      document.getElementById('msg').innerHTML = 'not matching<br>';
      document.getElementById('submit').disabled = true;
    }
  };

  

  const checkform = () => {
    var paswd=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!document.getElementById('password').value.match(paswd)) {
      document.getElementById('passmsg').style.color = 'red';
      document.getElementById('passmsg').innerHTML = 'Password should contain 8 to 15 characters with at least one uppercase, one lowercase, one numeric and one special case character';
      document.getElementById('submit').disabled = true;
    }
    else {
      document.getElementById('passmsg').innerHTML = '';
      document.getElementById('submit').disabled = false;
    }
    if (document.getElementById('password').value ===
      document.getElementById('confirm_password').value) {
        if (document.getElementById('password').value.length) {
        document.getElementById('msg').style.color = 'green';
        document.getElementById('msg').innerHTML = 'matching<br>';
        }
        else {
        document.getElementById('msg').innerHTML = '';
        }
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('msg').style.color = 'red';
      document.getElementById('msg').innerHTML = 'not matching<br>';
      document.getElementById('submit').disabled = true;
    }
  };

export {
    handleContact,
    handleName,
    handleEmail,
    checkPassword,
    checkform
}