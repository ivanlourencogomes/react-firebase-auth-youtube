import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';


function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');

  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button className="active btn btn-block">Login</button>
                    : 
                    <button className="active btn btn-block">Sign Up</button>
                  }

                  <p className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  