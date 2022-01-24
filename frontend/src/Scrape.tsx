import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import {toast} from "react-toastify";

const Scrape = () => {
    const [endpoint, setEndpoint] = useState("text");
    const [url, setUrl] = useState("");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(endpoint === "") {
            toast.warn("You need to choose what kind of data you want to receive", {
                toastId: "signedUp"
            })
        }
        else {
            await toast.promise(
                fetch('/scrape/' + endpoint + '?url=' + url + "&query=" + query, {
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
                    console.log(data)
                    setResults(data.content.split('\n'))
                })
                .catch(() => {});
        }
    }

    return (
        <div className='container-fluid scraper'>
            <Container className="row mt-5 mh-100 h-100 scraper">
                <div className='col-sm-2 scraper'>
                    <Form onSubmit={handleSubmit} className="mh-100 h-100">
                        <FormGroup>
                            <Label for="endpoint">Data type</Label>
                            <Input
                                type="select"
                                name="endpoint"
                                id="endpoint"
                                onChange={(e) => setEndpoint(e.target.value)}
                                placeholder="Choose data type"
                            >
                                <option value="text">Text</option>
                                <option value="html">Html</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Url</Label>
                            <Input
                                type="url"
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