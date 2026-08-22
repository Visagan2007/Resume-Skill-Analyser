import './SignUp.css';
import '../shared-auth.css';
import { FaDiscord, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dob: '',
        agreedToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!formData.agreedToTerms) {
            alert('Please agree to the Terms and Conditions.');
            return;
        }
        console.log('Sign up attempt:', { username: formData.username, email: formData.email, dob: formData.dob });
        // TODO: Integrate with authentication backend
    };

    return (
        <>
            <div className="min-h-screen w-full UBody">
                <form className="signup-card" onSubmit={handleSignUp}>
                    <h2>Sign Up</h2>
                    <p className="sub">Create your account</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
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
                    <label className="dob-label" htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <label className="terms-check">
                        <input
                            type="checkbox"
                            name="agreedToTerms"
                            checked={formData.agreedToTerms}
                            onChange={handleChange}
                        />
                        <span>I agree to the Terms and Conditions</span>
                    </label>
                    <button type="submit">Create Account</button>
                </form>

                <div className="Udivider"><span className="Uline"></span>Or<span className="Uline"></span></div>

                <div className="oauth-grid">
                    <button className="Uoauth-btn" type="button"><FaGoogle /> Google</button>
                    <button className="Uoauth-btn" type="button"><FaGithub /> GitHub</button>
                    <button className="Uoauth-btn" type="button"><FaMicrosoft /> Microsoft</button>
                    <button className="Uoauth-btn" type="button"><FaDiscord /> Discord</button>
                </div>

                <div className="Ualready">Already have an account? <Link to='/SignIn'>SignIn</Link></div>
            </div>
        </>
    )
}
export default SignUp;