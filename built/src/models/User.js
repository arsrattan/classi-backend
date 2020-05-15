"use strict";
exports.__esModule = true;
var User = (function () {
    function User(userId) {
        this.userId = userId;
    }
    User.prototype.getFirstName = function () {
        return this.firstName;
    };
    User.prototype.followUser = function (user) {
        this.following.push(user);
    };
    User.prototype.editProfile = function (newUserName, newBio) {
        this.userId = newUserName !== null && newUserName !== void 0 ? newUserName : this.userId;
        this.biography = newBio !== null && newBio !== void 0 ? newBio : this.biography;
    };
    User.prototype.changeAccountType = function (newAccountType) {
        this.accountType = newAccountType !== null && newAccountType !== void 0 ? newAccountType : this.accountType;
    };
    return User;
}());
exports["default"] = User;
//# sourceMappingURL=User.js.map