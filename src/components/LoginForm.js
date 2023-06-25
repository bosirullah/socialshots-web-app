import React from 'react';
// import { FaRectangleXmark } from "react-icons/fa6";
import { FaRegWindowClose  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../Global/Context';

const LoginForm = () => {
    const { register, login, error, timer, setTimer, visible, setVisible, isRegistered,initialized,loader } = React.useContext(ContextProvider);
    const navigate = useNavigate(); // Hook for navigation
    const [state, setState] = React.useState({
        register : true,
        login : false
    });

    const [inputs,setInputs] = React.useState({
        username: '',
        email: '',
        password: ''
    })

    

    const handleInputs = e =>{
        setInputs({ ...inputs, [e.target.name] : e.target.value });
    }

    const formToggle = () =>{
        setState({
            ...state,
            register: !state.register,
            login: !state.login
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        register(inputs);
        setInputs({username : "", email : "", password : ""});

        await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the delay if needed
        console.log("check if registererd = ",isRegistered)
        state.register =isRegistered;
    }

    const userLogin = (e) =>{
        e.preventDefault();
        login(inputs)
        navigate("/login"); // Redirect to the login page on authentication error
    }

    React.useEffect(() => {    
        if (error) {
            setVisible(true);
        
            setTimer(setTimeout(() => {
                setVisible(false);
            }, 3000));
        }
        
        return () => {
            clearTimeout(timer);
        };
    });

    if (!initialized || loader) {
        // Show a loading indicator or return null while the initialization or data loading is in progress
        return <div></div>;
    }

    return(

        <>
            {/* if model is true then only show the following div*/}
            
                <div className="model">
                    {
                        error && visible &&(
                            <div id="error-div" className={visible ? "error-message show" : "error-message"}>
                                {error && <p className="errMessage"> <FaRegWindowClose  className='errorIcon'/> Incorrect email or password !</p>}
                            </div>
                        )
                    }
                    <div className="model__container">
                    {/* for register */}
                        {!state.register ? (
                            <div className="model__form">
                                <form onSubmit={registerUser}>
                                    <div className="model__group">
                                        <h3 className="socialshots-logo" style={{textAlign : "center",marginBottom : "30px"}}>socialshots</h3>
                                    </div>
                                    <div className="model__group">
                                        <input type="text" name="username" className="model__input" placeholder="Enter username" onChange={handleInputs} value={inputs.username} required />
                                    </div>
                                    <div className="model__group">
                                        <input type="email" name="email" className="model__input" placeholder="Enter email" onChange={handleInputs} value={inputs.email} required />
                                    </div>
                                    <div className="model__group">
                                        <input type="password" name="password" className="model__input" placeholder="Enter password" onChange={handleInputs} value={inputs.password} required />
                                    </div>
                                    <div className="model__group">
                                        <input type="submit" style={{marginTop : "30px"}} className="btn btn-smart" value="Register" />
                                    </div>
                                    <div className="model__group">
                                        <span onClick={formToggle}>Already have an account ? </span>
                                    </div>
                                </form>
                            </div>
                            /* for login */
                            ): (
                            <div className="model__form">
                                <form onSubmit={userLogin}>
                                    
                                    <div className="model__group">
                                        <h3 className="socialshots-logo" style={{textAlign : "center",marginBottom : "30px"}}>socialshots</h3>
                                    </div>
                                    <div className="model__group">
                                        <input type="email" name="email" className="model__input" placeholder="Enter email" onChange={handleInputs} value={inputs.email} required />
                                    </div>
                                    <div className="model__group">
                                        <input type="password" name="password" className="model__input" placeholder="Enter password" onChange={handleInputs} value={inputs.password} required />
                                    </div>
                                    <div className="model__group">
                                        <input type="submit" style={{marginTop : "30px"}} className="btn btn-smart" value="Login"/>
                                    </div>
                                    <div className="model__group">
                                        <span onClick={formToggle}>Create a new Account ? </span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </>
    )
}

export default LoginForm;
