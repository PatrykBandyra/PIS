// @ts-ignore
import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import {toast} from "react-toastify";

const Scrape = () => {
    const [endpoint, setEndpoint] = useState("default");
    const [url, setUrl] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
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
        if(endpoint.length === 0 || endpoint === 'default') {
            errors.push("Type is required.");
        }
        else if(!(endpoint in ['text', 'html'])) {
            errors.push("Invalid query type.");
        }
        errors.forEach((error, i) => {
            toast.error(error, {
                toastId: "scrappingError_" + i
            });
        })
        if(errors.length === 0) {
            const fullUrl = '/scrape/' + encodeURIComponent(endpoint) + '' +
                '?url=' + encodeURIComponent(url) +
                "&query=" + encodeURIComponent(query);
            await toast.promise(
                fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            setResults([]);
                            throw new Error();
                        }
                        return response
                    }),
                {
                    pending: "Fetching data",
                    error: "Unable to fetch data",
                    success: "Data received 👌"
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setResults(data.content.split('\n'))
                })
                .catch(() => {});
        }
    }

    return (
        <div className='container-fluid scraper'>
            <Container className="row mh-100 h-auto p-0 scraper">
                <div className='col-sm-3 h-auto bg-dark scraper'>
                    <Form onSubmit={handleSubmit} className="mh-100 h-100 px-5">
                        <FormGroup>
                            <Label for="endpoint">Query type</Label>
                            <Input
                                type="select"
                                name="endpoint"
                                id="endpoint"
                                defaultValue='default'
                                onChange={(e) => setEndpoint(e.target.value)}
                                placeholder="Choose query type"
                            >
                                <option value='default' disabled hidden>Choose query type</option>
                                <option value="text">Text</option>
                                <option value="html">Html</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Url</Label>
                            <Input
                                type="text"
                                name="scrape_url"
                                id="url"
                                value={url || ''}
                                onChange={(e) => setUrl(e.target.value)}
                                autoComplete="scrape_url"
                                placeholder="Input ulr e.g. https://www.wikipedia.org/"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="query">Query</Label>
                            <Input
                                type="text"
                                name="scrape_query"
                                id="query"
                                value={query || ''}
                                onChange={(e) => setQuery(e.target.value)}
                                autoComplete="scrape_query"
                                placeholder="Input CSS or jquery selector e.g. h1"
                            />
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-around mt-2">
                            <Button color="primary" type="submit">Scrape it!</Button>{' '}
                        </FormGroup>
                    </Form>
                </div>
                <div id="result" className='col min-vh-100 scraper'>
                    <ul>
                        {results.map((result, i) => {
                            return (<li key={i}>{result}</li>)
                        })}
                    </ul>
                </div>
            </Container>
        </div>
    )
}
export default Scrape;