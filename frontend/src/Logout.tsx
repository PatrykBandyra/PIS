import React from 'react';
import { Button, Container, Form, FormGroup } from 'reactstrap';
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

const Logout = () => {
    let history = useHistory();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        await fetch('/api/logout', {
                method: 'POST'
        })
        .then((response) => {
            if(!response.ok) throw new Error(response.status.toString());
            toast.success("Successfully logged out!", {
                toastId: "logOut"
            });
            history.push('/login');
        })
        .catch((err) => {
            toast.error("Unhandled error: " + err.message, {
                toastId: "unhandled"
            });
        })


    }

    return (
        <div className="d-flex flex-column">
            <Container className="d-flex justify-content-center">
                <Form onSubmit={handleSubmit} className="d-flex flex-column">
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={handleSubmit}>Log out</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}
export default Logout;