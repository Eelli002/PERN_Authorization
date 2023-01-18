
const Valid_Info = (req, res, next) => {
    //console.log("Starting Valid_Info: server/middlware/validInfo")
    const { email, name, password } = req.body;

    //console.log("email: ", email)
    //console.log("name: ", name)
    //console.log("password: ", password)

    // Email Validation, returns true else we send the criteria that we are missing in res
    const Valid_Email = (email) => {
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email_regex.test(email);
    };

    const Email_Criteria_JSON = (email) => {
        const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const criteria = 
        {
          local: /^[^@\s]+/.test(email),
          domain: /@[^@\s]+/.test(email),
          tld: /\.[^@\s]+$/.test(email)
        };
        return {
          valid: email_regex.test(email),
          criteria
        };
    }

    // Password Validation, returns true else we send the criteria that we are missing in res
    const Valid_Password = (password) => {
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return password_regex.test(password);
    }

    const Password_Criteria_JSON = (password) => {
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const criteria = 
        {
          lowercase: /[a-z]/.test(password),
          uppercase: /[A-Z]/.test(password),
          digit: /[0-9]/.test(password),
          special: /[!@#\$%\^&\*]/.test(password),
          length: password.length >= 8
        };
        return {
          valid: password_regex.test(password),
          criteria
        };
    }


    if (req.path === '/register') 
    {
        if (![email, name, password].every(Boolean)) {
            //console.log("Didnt enter name, email, or password");
            return res.status(401).json("Missing Credentials");
        }
        else if (!Valid_Email(email)) {
            //console.log("Invalid email");
            return res.status(401).json(Email_Criteria_JSON(email));
        }
        else if (!Valid_Password(password)) {
            //console.log("Invalid password");
            return res.status(401).json(Password_Criteria_JSON(password));
        }
        //console.log("Register Credentials Passed");
    }
    else if (req.path === '/login')
    {
        //console.log("On /login, validating")
        
        if (![email, password].every(Boolean)) {
            //console.log("Didnt enter email or password");
            return res.status(401).json("Missing Credentials");
        }
        else if (!Valid_Email(email)) {
            //console.log("Invalid email");
            return res.status(401).json("Invalid email");
        }
        else if (!Valid_Password(password)) {
            //console.log("Invalid password");
            return res.status(401).json("invalid password");
        }
        // else console.log("Credentials passed")
    }
    next();
}

module.exports = Valid_Info;