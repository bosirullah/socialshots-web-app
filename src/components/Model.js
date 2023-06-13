// import React from 'react'
// import { ContextProvider } from '../Global/Context'

// const Model = () => {
//     const {model, closeModel, register, login} = React.useContext(ContextProvider);
//     const [state, setState] = React.useState({
//         register : true,
//         login : false
//     });

//     const [inputs,setInputs] = React.useState({
//         username: '',
//         email: '',
//         password: ''
//     })

//     const handleInputs = e =>{
//         setInputs({ ...inputs, [e.target.name] : e.target.value });
//     }

//     const formToggle = () =>{
//         setState({
//             ...state,
//             register: !state.register,
//             login: !state.login
//         });
//     };

//     // const closeForm = (e) => {
//     //     const className = e.target.getAttribute("class");
//     //     if (className === "model") {
//     //         closeModel();
//     //     }
//     // };

//     const registerUser = e => {
//         e.preventDefault();
//         register(inputs);
//         setInputs({username : "", email : "", password : ""});
//     }

//     const userLogin = (e) =>{
//         e.preventDefault();
//         login(inputs);
//     }

//     // return(
//         // <>
//         // {/* if model is true then only show the following div*/}
//         //     {model ? <div className="model" onClick={closeForm}>
//         //         <div className="model__container">
//         //         {/* for register */}
//         //             {state.register ? (
//         //                 <div className="model__form">
//         //                     <form onSubmit={registerUser}>
//         //                         <div className="model__group">
//         //                             <h3 className="socialshots-logo" style={{textAlign : "center",marginBottom : "30px"}}>socialshots</h3>
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="text" name="username" className="model__input" placeholder="Enter username" onChange={handleInputs} value={inputs.username} required />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="email" name="email" className="model__input" placeholder="Enter email" onChange={handleInputs} value={inputs.email} required />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="password" name="password" className="model__input" placeholder="Enter password" onChange={handleInputs} value={inputs.password} required />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="submit" style={{marginTop : "30px"}} className="btn btn-smart" value="Register" />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <span onClick={formToggle}>Already have an account ? </span>
//         //                         </div>
//         //                     </form>
//         //                 </div>
//         //                 /* for login */
//         //                 ): (
//         //                 <div className="model__form">
//         //                     <form onSubmit={userLogin}>
//         //                         <div className="model__group">
//         //                             <h3 className="socialshots-logo" style={{textAlign : "center",marginBottom : "30px"}}>socialshots</h3>
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="email" name="email" className="model__input" placeholder="Enter email" onChange={handleInputs} value={inputs.email} required />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="password" name="password" className="model__input" placeholder="Enter password" onChange={handleInputs} value={inputs.password} required />
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <input type="submit" style={{marginTop : "30px"}} className="btn btn-smart" value="Login"/>
//         //                         </div>
//         //                         <div className="model__group">
//         //                             <span onClick={formToggle}>Create a new Account ? </span>
//         //                         </div>
//         //                     </form>
//         //                 </div>
//         //             )}
//         //         </div>
//         //     </div> : ""} 
//         // </>
//     // );
// }

// export default Model
