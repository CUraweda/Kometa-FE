import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import app from './firebaseConfig';

const OTPComponent: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState<string | null>(null);

    // Initialize Auth instance
    const auth = getAuth(app);

    // Setup Recaptcha when component renders
    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth ,
                "recaptcha-container",
                {
                    size: 'invisible',
                    callback: (_: any) => {
                        console.log('Recaptcha resolved');
                    },
                }
                // Ensure this is the Auth instance
            );
        }
    }, [auth]);

    const sendOTP = async () => {
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            alert('OTP dikirim!');
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOTP = async () => {
        if (!verificationId) return;

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            const result = await signInWithCredential(auth, credential);
            console.log('User signed in:', result.user);
            alert('Verifikasi berhasil!');
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div>
            <h1>OTP Authentication</h1>
            <div>
                <input
                    type="text"
                    placeholder="Masukkan nomor telepon"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button onClick={sendOTP}>Kirim OTP</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Masukkan OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={verifyOTP}>Verifikasi OTP</button>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default OTPComponent;
