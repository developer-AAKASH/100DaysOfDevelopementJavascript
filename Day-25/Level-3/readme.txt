Level: 3 --> Unrevertable hash.

So as we see yesterday that in mongoose encryption, we can revert the hash value which
ultimately reveal your password and to avoid that I have used "md5" package from node.
This package provide an Unrevertable hash which convert our information into unrevertable
hash value which makes our information more secure.

But there is one problem in this type of hashing. There is many open database available
on the internate which gives you what is the value of hash value.
for example, "320157b0a9d971845c5b0a0796058c79" is the hash value of "password" and
two value have same password.for example there is two user which have same password then
there hash value also will be same and this way, it is easy to know about password.

Solution to this is that we can use bcrypt methods to secure our password with salting.
