import React, {useState} from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const SignUp = () => {
    const [name, setName] = useState("John");
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("testpass");
    const [confirmPassword, setConfirmPassword] = useState("testpass");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");

    let history = useHistory();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            setConfirmPasswordError("Passwords are not identical");
            setSignUpError("");
            history.push('/signUp');
        }
        else {
            setConfirmPasswordError("");
            await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({name: name, email: email, password: password}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                if(!response.ok) throw Error(response.status)
            })
            .then(() => {
                toast.success("Successfully signed up!", {
                    toastId: "signUp"
                });
                history.push('/login');
            })
            .catch((err) => {
                if(err.message === 409) {
                    toast.error("Account with such email already exists!", {
                        toastId: "signUpError"
                    });
                }
                else {
                    toast.error("Unhandled error: " + err.message, {
                        toastId: "unhandled"
                    });
                }
            });
        }
    }

    const routeRedirect = (path: string) =>{
        history.push(path);
    }

    return (
        <div className="d-flex flex-column">
            <AppNavbar isLoggedIn={false}/>
            <Container className="d-flex justify-content-center">
                <Form method="GET" onSubmit={handleSubmit} className="d-flex flex-column">
                    <FormGroup className="form-group text-left">
                        <Label>Name</Label>
                        <Input
                            autoFocus
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            aria-describedby="nameHelp"
                            placeholder="Enter name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="signUp.name"
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Email address</Label>
                        <Input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="signUp.email"
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Password</Label>
                        <Input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Confirm password</Label>
                        <Input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword || ''}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={true}
                        />
                        <div>
                            <small id="confirmPasswordError" className="text-danger form-text">
                                {confirmPasswordError}
                            </small>
                        </div>
                        <div>
                            <small id="signUpError" className="text-danger form-text">
                                {signUpError}
                            </small>
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-around mt-2">
                        <Button color="primary" type="submit">Sign up</Button>
                        <Button
                            color="secondary"
                            type="submit"
                            name="return"
                            onClick={() => routeRedirect("login")}>
                            Return
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}
export default SignUp;