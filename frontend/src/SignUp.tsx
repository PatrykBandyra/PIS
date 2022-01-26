// @ts-ignore
import React, {useState} from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import isEmail from 'validator/lib/isEmail';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let history = useHistory();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const errors = [];
        if(name.length === 0) {
            errors.push("Name is required.");
        }
        if(email.length === 0) {
            errors.push("Email is required.");
        }
        else if(!isEmail(email)) {
            errors.push("Email is invalid.");
        }
        if(password.length === 0) {
            errors.push("Password is required.");
        }
        else if(confirmPassword.length === 0) {
            errors.push("You need to confirm your password.");
        }
        else if(confirmPassword !== password) {
            errors.push("Passwords are not identical.");
        }
        errors.forEach((error, i) => {
            toast.error(error, {
                toastId: "signUpError_" + i
            });
        })
        if(errors.length === 0) {
            if(password !== confirmPassword) {
                await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify({name: name, email: email, password: password}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status.toString())
                    })
                    .then(() => {
                        toast.success("Successfully signed up!", {
                            toastId: "signUp"
                        });
                        history.push('/login');
                    })
                    .catch((err) => {
                        if (err.message === "409") {
                            toast.error("Account with such email already exists!", {
                                toastId: "signUpError"
                            });
                        } else {
                            toast.error("Unhandled error: " + err.message, {
                                toastId: "unhandled"
                            });
                        }
                    });
            }
        }
    }

    const routeRedirect = (path: string) =>{
        history.push(path);
    }

    return (
        <div className="d-flex flex-column">
            <AppNavbar />
            <Container className="d-flex justify-content-center mt-5">
                <Form method="GET" onSubmit={handleSubmit} className="d-flex flex-column">
                    <FormGroup className="form-group text-left">
                        <Label>Name</Label>
                        <Input
                            autoFocus
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter name"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="signUp.name"
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Email address</Label>
                        <Input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="signUp.email"
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
                        />
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