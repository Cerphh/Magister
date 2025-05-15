const { db } = require("../config/firebase");

class JobApplication {
  static async createApplication(applicationData) {
    const ref = db.collection("job_applications").doc();
    await ref.set(applicationData);
    return ref.id;
  }

  static async getApplicationsByCompany(companyId) {
    const snapshot = await db.collection("job_applications")
      .where("companyId", "==", companyId)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getApplicationsByApplicant(applicantId) {
    const snapshot = await db.collection("job_applications")
      .where("applicantId", "==", applicantId)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async updateStatus(applicationId, status) {
    const ref = db.collection("job_applications").doc(applicationId);
    await ref.update({ status });
  }

  static async getApplicationById(applicationId) {
    const doc = await db.collection("job_applications").doc(applicationId).get();

    if (!doc.exists) {
      throw new Error("Application not found");
    }

    return { id: doc.id, ...doc.data() };
  }
}

module.exports = JobApplication;
