import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SettingsPage: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = () => {
    // Implement your delete account logic here (API call, logout, redirect, etc.)
    alert("Account deleted (placeholder)");
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>

        {/* Terms and Conditions */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium text-gray-700 mb-1">Terms and Conditions</h2>
          <p className="text-gray-600 mb-4">
            Please read our{" "}
            <button
              onClick={() => setShowTerms(true)}
              className="text-blue-600 hover:underline"
            >
              Terms and Conditions
            </button>.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium text-gray-700 mb-1">Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            View our{" "}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </button>{" "}
            to understand how we handle your data.
          </p>
        </div>

        {/* Notification Preferences */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium text-gray-700 mb-1">Notification Preferences</h2>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              defaultChecked
            />
            <span className="ml-2 text-gray-600">Enable notifications</span>
          </label>
        </div>

        {/* Account Deletion */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-medium text-gray-700 mb-1">Account</h2>
          <p className="text-gray-600 mb-2">
            Want to deactivate or delete your account?
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <Modal title="Terms and Conditions" onClose={() => setShowTerms(false)}>
         <p className="mb-4">
  These Terms and Conditions govern your use of our app. By accessing or using our services, you agree to be bound by these terms.
</p>
<ul className="list-disc pl-6 mb-4 text-sm text-gray-700">
  <li><strong>Use of Service:</strong> You agree to use this service only for lawful purposes and not to violate the rights of others.</li>
  <li><strong>Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
  <li><strong>Termination:</strong> We reserve the right to suspend or terminate your account if you violate these terms or use the service inappropriately.</li>
  <li><strong>Intellectual Property:</strong> All content, logos, and designs are the property of our team and may not be reused without permission.</li>
  <li><strong>Liability:</strong> We are not liable for any damages resulting from your use of the service.</li>
  <li><strong>Changes:</strong> We may update these Terms at any time. Continued use of the service constitutes your acceptance of any changes.</li>
</ul>
<p className="mb-4">
  If you have questions about these Terms, please contact us.
</p>

        </Modal>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p className="mb-4">
  We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
</p>
<ul className="list-disc pl-6 mb-4 text-sm text-gray-700">
  <li><strong>Data Collection:</strong> We collect basic personal information such as your name, email address, and preferences when you sign up or use our services.</li>
  <li><strong>Usage Data:</strong> We collect anonymous usage data to improve our services (e.g., page visits, interactions).</li>
  <li><strong>Cookies:</strong> Our site may use cookies to personalize content and analyze traffic.</li>
  <li><strong>Data Sharing:</strong> We do not sell or rent your personal information. We may share it with trusted third parties who help us run our service, under strict confidentiality agreements.</li>
  <li><strong>Security:</strong> We use industry-standard security to protect your data from unauthorized access.</li>
  <li><strong>Your Rights:</strong> You can request access to or deletion of your personal data at any time.</li>
</ul>
<p className="mb-4">
  By using this service, you consent to our Privacy Policy. We may update this policy occasionally, and we encourage you to review it regularly.
</p>

        </Modal>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <Modal title="Confirm Account Deletion" onClose={() => setShowDeleteModal(false)}>
          <p className="mb-4 text-sm text-gray-700">
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="text-gray-700 text-sm">{children}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
