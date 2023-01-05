
const Valid_Info = (req, res, next) => {
    const { email, name, password } = req.body;

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
            return res.status(401).json("Missing Credentials");
        }
        else if (!Valid_Email(email)) {
            return res.status(401).json(Email_Criteria_JSON(email));
        }
        else if (!Valid_Password(password)) {
            return res.status(401).json(Password_Criteria_JSON(password));
        }
    }
    else if (req.path === '/login')
    {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
        else if (!Valid_Email(email)) {
            return res.status(401).json(Email_Criteria_JSON(email));
        }
        else if (!Valid_Password(password)) {
            return res.status(401).json(Password_Criteria_JSON(password));
        }
    }
    next();
}

module.exports = Valid_Info;