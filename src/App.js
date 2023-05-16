import React from 'react'
import './App.css'
import { Typeahead } from 'react-bootstrap-typeahead';
import { isValid } from './Utlis'
import { Modal, Button } from 'react-bootstrap';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [], // initialize to empty array
      value: '',
      error: null,
      options: ['example1@example.com', 'example2@example.com', 'example3@example.com'],
      showModal: false, // add showModal state
      modalMessage: '', // add modalMessage state
    };
  }

  setError = (error) => {
    this.setState({ error });
  };
  

  handleTypeaheadChange = (selected) => {
    this.setState({ emails: selected });
  };  
  
  handleChange = (selected) => {
    let value = "";
    if (selected.length > 0) {
      value = selected.slice(-1)[0];
    }
    const isValidEmail = isValid(value, this.state.emails, (error) => {
      this.setState({ showModal: true, modalMessage: error });
    });

    if (isValidEmail) {
      this.setState({ emails: selected });
    }
  };
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <Typeahead
          className="input"
          id="basic-typeahead-multi"
          labelKey="name"
          multiple
          allowNew
          onChange={this.handleChange}
          options={this.state.options}
          placeholder="Type or paste email and hit 'Enter'"
          selected={this.state.emails}
        />
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

export default App;
