<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Storing data about the user and the current session he's in (passwords,
  preferences, shopping cart, etc.) with the advantage that it's really
  easy to implement, but with the downside that it gets wiped every time the user closes the site (ends the session). Therefore it's great to
  use in production, but is unfit for deployment.

2. What does bcrypt do to help us store passwords in a secure manner.
It encryps them one way by using a hashing algorithm and a secret key
to transform the readable plain-text password into a human-unreadable long string of characters. It also has the option to re-hash this passwords many times and add a an extra, random, unrelated string of
characters ("salt").

3. What does bcrypt do to slow down attackers?
Iteratively re-hashing the password, increasing the number of brute force
or dictionary attacks per second an attacker must make.


4. What are the three parts of the JSON Web Token?
Header, payload, signature.
