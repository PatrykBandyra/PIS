import React, {useState} from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if(!response.ok) throw new Error();
                else {
                    toast.success("Successfully logged in!", {
                        toastId: "logIn"
                    });
                    history.push('/');
                }
            })
            .catch(() => {
                toast.error("Invalid email or password!", {
                    toastId: "loginError"
                });
            });
    }

    const routeRedirect = (path: string) => {
        history.push(path);
    }

    return (
        <div className="d-flex flex-column">
            <AppNavbar isLoggedIn={false}/>
            <Container className="d-flex justify-content-center">
                <Form onSubmit={handleSubmit} className="d-flex flex-column">
                    <FormGroup>
                        <Label for="email">Email address</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="login.email"
                        />
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-around mt-2">
                        <Button color="primary" type="submit">Log in</Button>
                        <Button
                            color="secondary"
                            type="submit"
                            name="signUp"
                            onClick={() => routeRedirect("signUp")}>
                            Sign up
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}
export default Login;