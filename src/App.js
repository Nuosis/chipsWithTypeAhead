import React from 'react'
import './App.css'
class App extends React.Component {
  state={
    value:'',
    emails: [],
    error: null
  }

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null
    })
  }

  handleKeyDown = (evt) => {
    if(['Enter','Tab',','].includes(evt.key)) {
      evt.preventDefault();

      const email = this.state.value.trim();

      if(email && this.isValid(email)) {
        this.setState({
          emails: [...this.state.emails, email],
          value: ''
        });
      }
    }
  };

  handleDelete = (toBeRemoved) => {
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    const paste = evt.clipboardData.getData("text");
    // eslint-disable-next-line
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      const toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  isInList(email) {
    return this.state.emails.includes(email);
  }

  isEmail(email) {
    // eslint-disable-next-line
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  render() {
    return (

      <main className="wrapper">
        {this.state.emails.map(email => (
          <div className="tag-item" key={email}>
            {email}

            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(email)}
            >
              &times;
            </button>
          </div>
        ))}

        <input
        className="input"
        placeholder="Type or paste email and hit 'Enter'"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handlePaste}
        />

        {this.state.error &&
          <p className="error">{this.state.error}</p>}

      </main>
      );
  }
}

export default App;
