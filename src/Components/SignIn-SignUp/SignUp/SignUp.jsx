import './SignUp.css';
import { FaDiscord, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <>
            <div className="min-h-screen w-full UBody">
                <div className="signup-card">
                    <h2>Sign Up</h2>
                    <p className="sub">Create your account</p>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <label className="dob-label" htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" />
                    <label className="terms-check">
                        <input type="checkbox" />
                        <span>I agree to the Terms and Conditions</span>
                    </label>
                    <button>Create Account</button>
                </div>

                <div className="Udivider"><span className="Uline"></span>Or<span className="Uline"></span></div>

                <div className="oauth-grid">
                    <button className="Uoauth-btn"><FaGoogle /> Google</button>
                    <button className="Uoauth-btn"><FaGithub /> GitHub</button>
                    <button className="Uoauth-btn"><FaMicrosoft /> Microsoft</button>
                    <button className="Uoauth-btn"><FaDiscord /> Discord</button>
                </div>

                <div className="Ualready">Already have an account? <Link to='/SignIn'>SignIn</Link></div>
            </div>
        </>
    )
}
export default SignUp;