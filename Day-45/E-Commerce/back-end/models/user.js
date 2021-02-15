import mongoose from 'mongoose';
import crypto from 'crypto';
import uuid from 'uuid/v1';

let userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        maxlength: 32, 
        trim: true
    },
    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true
    },
    userinfo: {
        type: String, 
        trim: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    },
    purchases: {
        type: Array,
        default: []
    }
});

userSchema.virtual("password")
    .set( function( password ){
        this._password = password;
        this.salt = uuid();
        this.encryptedPassword = this.securePassword( password );
    })
    .get( function(){
        return this._password;
    });

userSchema.method = {
    authenticate: function( plainPassword ){
        return this.securePassword( plainPassword ) === this.encryptedPassword;
    },
    securePassword: function( plainPassword ){
        if( !plainPassword )
            return "";
        
        try{
            return crypto
            .createHmac( "sha256", this.salt )
            .update( plainPassword )
            .digest( "hex" );
        } catch( error ){
            return "";
        }
    }
};

module.exports = mongoose.model( "User", userSchema );