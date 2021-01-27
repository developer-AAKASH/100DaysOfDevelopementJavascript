:::------->> Level : 4

So yesterday I have implement irreversible hash functionality but the problem in that
functionality is that if someone know the value of the hash value then it can get the value
of the all password which have same hash value.

So to avoid this, we have to implement such a mechanism which generats the unique hash
for every password.

And to do so, I have used "bcrypt" package which generats unique hash.

It basically adds a set of random numbers to password of the user and as its random numbers
every time, there is no possiblity of having same hash even if there is same password.

One iteration of adding the random numbers is called one "salt round" and for making more
secure password, you can perform multiple "sale rounds".

But thing to remember is the more salt rounds, more computation round is required so
to decision of salting rounds is very cruscial.
