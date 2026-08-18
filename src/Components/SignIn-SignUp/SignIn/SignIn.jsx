import './SignIn.css';
import { FaDiscord, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignIn() {
    return (
        <>
            <div className="min-h-screen w-full IBody">
                <div className="signin-card">
                    <h2>Welcome Back</h2>
                    <p className="sub">Sign in to continue</p>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <div className="forgot-row">
                        <button>Forgot password?</button>
                    </div>
                    <button className="primary">Sign In</button>
                </div>

                <div className="Udivider"><span className="Uline"></span>Or<span className="Uline"></span></div>

                <div className="oauth-grid">
                    <button className="Uoauth-btn"><FaGoogle /> Google</button>
                    <button className="Uoauth-btn"><FaGithub /> GitHub</button>
                    <button className="Uoauth-btn"><FaMicrosoft /> Microsoft</button>
                    <button className="Uoauth-btn"><FaDiscord /> Discord</button>
                </div>

                <div className="Idivider">New here? <Link to='/SignUp'>SignUp</Link></div>
            </div>
        </>
    )
}
export default SignIn;