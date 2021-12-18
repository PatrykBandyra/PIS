import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {

}

type State = {
    url: string;
    allText: string;
}

class GetText extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            url: "",
            allText: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        await fetch('/scrape/all/text?url=' + this.state.url, {
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

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
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