import './SignIn.css';
import '../shared-auth.css';
import { FaDiscord, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignIn() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log('Sign in attempt:', { email: formData.email });
        // TODO: Integrate with authentication backend
    };

    const handleForgotPassword = () => {
        console.log('Forgot password for:', formData.email);
        // TODO: Integrate with password reset flow
    };

    return (
        <>
            <div className="min-h-screen w-full IBody">
                <form className="signin-card" onSubmit={handleSignIn}>
                    <h2>Welcome Back</h2>
                    <p className="sub">Sign in to continue</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="forgot-row">
                        <button type="button" onClick={handleForgotPassword}>Forgot password?</button>
                    </div>
                    <button type="submit" className="primary">Sign In</button>
                </form>

                <div className="Udivider"><span className="Uline"></span>Or<span className="Uline"></span></div>

                <div className="oauth-grid">
                    <button className="Uoauth-btn" type="button"><FaGoogle /> Google</button>
                    <button className="Uoauth-btn" type="button"><FaGithub /> GitHub</button>
                    <button className="Uoauth-btn" type="button"><FaMicrosoft /> Microsoft</button>
                    <button className="Uoauth-btn" type="button"><FaDiscord /> Discord</button>
                </div>

                <div className="Idivider">New here? <Link to='/SignUp'>SignUp</Link></div>
            </div>
        </>
    )
}
export default SignIn;