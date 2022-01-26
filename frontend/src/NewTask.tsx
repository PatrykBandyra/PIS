// @ts-ignore
import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import {toast} from "react-toastify";
import isURL from 'validator/lib/isURL';

const NewTask = () => {
    const [url, setUrl] = useState("");
    const [query, setQuery] = useState("");
    const [type, setType] = useState("default");

    const handleSubmit = async () => {
        const errors = [];
        if(url.length === 0) {
            errors.push("Url is required.");
        }
        else if(!isURL(url)) {
            errors.push("Url is not valid.");
        }
        else if(!isURL(url, {require_protocol: true})) {
            errors.push("Url is not valid. Did you forget to add protocol (http:// or https://)?");
        }
        if(query.length === 0) {
            errors.push("Query is required.");
        }
        if(type.length === 0 || type === 'default') {
            errors.push("Type is required.");
        }
        else if(!(type in ['t', 'h'])) {
            errors.push("Invalid type.");
        }
        errors.forEach((error, i) => {
            toast.error(error, {
                toastId: "createTaskError_" + i
            });
        })
        if(errors.length === 0) {
            fetch('/api/task/create', {
                method: 'POST',
                body: JSON.stringify({
                    url: url,
                    query: query,
                    type: type
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
                toast.success("Successfully created task!!", {
                    toastId: "taskSuccess"
                });
            })
            .catch((err) => {
                toast.error("Unable to create task! (" + err + ")", {
                    toastId: "taskError"
                });
            });
        }
    }

    return (
        <div className='d-flex container-fluid scraper'>
            <Container className="d-flex justify-content-center mt-5">
                <Form method="GET" onSubmit={handleSubmit} className="d-flex flex-column">
                    <FormGroup className="form-group text-left">
                        <Label>Url</Label>
                        <Input
                            autoFocus
                            className="form-control"
                            type="url"
                            name="url"
                            id="url"
                            placeholder="Enter url"
                            value={url || ''}
                            onChange={(e) => setUrl(e.target.value)}
                            autoComplete="scrape_url"
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Query</Label>
                        <Input
                            className="form-control"
                            type="text"
                            name="query"
                            id="query"
                            placeholder="Enter query"
                            value={query || ''}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete="scrape_query"
                        />
                    </FormGroup>
                    <FormGroup className="form-group text-left">
                        <Label>Type</Label>
                        <Input
                            className="form-control"
                            type="select"
                            name="type"
                            id="type"
                            defaultValue='default'
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value='default' disabled hidden>Choose query type</option>
                            <option value='t'>Text</option>
                            <option value='h'>Html</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-around mt-2">
                        <Button color="primary" type="submit">Create task</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}
export default NewTask;