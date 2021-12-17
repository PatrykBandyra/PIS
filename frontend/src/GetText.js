import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GetText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            allText: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await fetch('/scrape/all?url=' + this.state.url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({allText: data.allText}));
        this.props.history.push('/scrapeit/text');
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {};
        item[name] = value;
        this.setState(item);
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="url">Url</Label>
                            <Input type="text" name="url" id="url" value={this.state.url || ''}
                                   onChange={this.handleChange} autoComplete="scrape_url"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Scrape it!</Button>{' '}
                        </FormGroup>
                    </Form>
                <div id="result">
                    {this.state.allText}
                </div>
                </Container>
            </div>
        );
    }
}
export default GetText;