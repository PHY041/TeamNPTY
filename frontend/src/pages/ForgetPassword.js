import React from "react"; 
import './Auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ForgetPassword = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        let newPassword = event.target.newpassword.value;
        let confirmPassword = event.target.confirmpassword.value;
    
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        let formData = {
            email: event.target.email.value,
            newPassword: newPassword
        };
    
        fetch("http://127.0.0.1:5000/resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("DATA:", data);
            if (data.success) {
                // Password reset successful, maybe redirect to login page
                window.location.href = "/login";
            } else {
                console.log("Success: ", data.success);
                alert("Error resetting password");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error resetting password");
        });
    
        console.log(formData);
    }    
    return (
        <div className="auth">
            <div className="card">
                <a href="/login"><FontAwesomeIcon icon={faChevronLeft} /></a>
                <div className="auth__header text-center">
                <h4>Reset Password </h4>
                </div>

                <form action="" method="POST" className="form auth__form reset-pw-form" onSubmit={handleSubmit}>

                    
                    <div className="form__field">
                        <label htmlFor="email">Email address:* </label>
                        <input className="input input--text" id="email" type="text" name="email"
                        placeholder="Email..." required/>
                    </div>

                    <div className="form__field">
                        <label htmlFor="reset_password">New password:* </label>
                        <input className="input input--password" id="reset_password" type="password" 
                            name="newpassword" placeholder="New Password..."required/>
                    </div>
                    <div className="form__field">
                        <label htmlFor="confirm_password">Confirm password:* </label>
                        <input className="input input--password" id="confirm_password" type="password" 
                            name="confirmpassword" placeholder="Confirm New Password:" required/>
                    </div>
                    <button className="button button--primary" type="submit"> Reset password </button>
                </form>

            </div>
        </div>
    )
};

export default ForgetPassword;