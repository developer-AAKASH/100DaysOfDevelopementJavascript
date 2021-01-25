-> In Level 1 and 2 we are storing user data with mongoose-encryption package of node.

-> This will encrypt the user password with some formula which cant reverted by anyone.

-> but drawback of this encryption is that it can be reverted and this is not very secure
algorithem of encryption. and such a encryption is not recommended to use for storing information
like user password.

Solution ::-> Solution of this is that we can use "md5" package which is non-revertable
encryption method which is more secure then this algorithem.
