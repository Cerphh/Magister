class User {
  constructor(user = {}) {
    const {
      uid = "",
      name = "",
      email = "",
      userType = "",
      location = "",
      subjects = [],
      teachingLevel = [],
      about = "",
      companyName = "",
      companyType = "",
    } = user;

    this.uid = uid;
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.location = location;
    this.subjects = subjects;
    this.teachingLevel = teachingLevel;
    this.about = about;
    this.companyName = companyName;
    this.companyType = companyType;
    this.updatedAt = new Date();
  }

  toFirestore() {
    const base = {
      uid: this.uid,
      displayName: this.name,
      email: this.email,
      userType: this.userType,
      location: this.location,
      about: this.about,
      updatedAt: this.updatedAt,
    };

    if (this.userType === "applicant") {
      return {
        ...base,
        subjects: this.subjects,
        teachingLevel: this.teachingLevel,
      };
    }

    if (this.userType === "employer") {
      return {
        ...base,
        companyName: this.companyName,
        companyType: this.companyType,
      };
    }

    return base;
  }
}

module.exports = User;
