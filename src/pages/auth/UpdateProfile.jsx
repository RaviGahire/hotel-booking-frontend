import React, { useState } from 'react';
import axios from 'axios';
import { InputField } from '../../components/form/FormFields';

const API_URL = import.meta.env.VITE_API_URL
export const UpdateProfile = ({ isOpen, onClose, onUploadSuccess }) => {
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
        setError('');
    };
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!avatar) {
            setError("Please select an image first.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            const { data } = await axios.put(`${API_URL}/auth/users/me`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (data.success) {
                onUploadSuccess(data.user.avatar);
                onClose();
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Upload failed. Please try again.";
            setError(errorMessage);
            console.error("Profile update error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

                {/* Modal Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Update Profile Picture</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleUpload} className="p-6 space-y-6">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-dashed border-slate-600">
                        <InputField
                            label={'Select Image File'}
                            type='file'
                            name={'avatar'}
                            onChange={handleFileChange}
                            error={error}

                        />
                        <p className="text-xs text-slate-500 mt-2 italic">
                            Recommended: Square JPG or PNG, max 2MB.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-bold transition-all shadow-lg ${loading
                                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-[#ecedee] text-[#042053] hover:bg-white'
                                }`}
                        >
                            {loading ? 'Uploading...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};