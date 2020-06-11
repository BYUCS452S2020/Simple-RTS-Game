import React from 'react';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../actions';

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email ? props.email : "" ,
      firstNameField: "",
      lastNameField: "",
      emailField: "",
      readonly: true
    }

  }

  componentDidMount() {
    this.props.getUser()
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email ? this.props.email : ""
      })
    }
  }

  enableEditing() {
    let props = { ...this.props }
    this.setState({
      firstNameField: props.firstName,
      lastNameField: props.lastName,
      emailField: props.email,
      readonly: false
    })
  }

  inputChange(event) {
    const inputId = event.target.id
    const inputValue = event.target.value
    console.log(event.target.value);
    this.setState({
      [inputId]: inputValue
    })
  }

  saveProfileInfo() {
    let { firstNameField, lastNameField, emailField } = this.state;
    let body = {
      firstName: firstNameField,
      lastName: lastNameField,
      email: emailField
    }
    this.props.updateUser(body);

    this.setState({
      readonly: true
    })
  }

  cancelChanges() {
    this.setState({
      readonly: true
    })
  }

  displayForm() {
    let readonly = this.state.readonly
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
          {(readonly) ? <input type="text"  className="form-control-plaintext" id="firstName" value={this.state.firstName} readOnly/>
                      : <input type="text" className="form-control" id="firstNameField" placeholder="First Name" value={this.state.firstNameField} onChange={this.inputChange.bind(this)}/>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-10">
            {(readonly) ? <input type="text"  className="form-control-plaintext" id="lastName" value={this.state.lastName} readOnly/>
                        : <input type="text" className="form-control" id="lastNameField" placeholder="Last Name" value={this.state.lastNameField} onChange={this.inputChange.bind(this)}/>}
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            {(readonly) ? <input type="text"  className="form-control-plaintext" id="email" value={this.state.email} readOnly/>
                        : <input type="text" className="form-control" id="emailField" placeholder="Email" value={this.state.emailField} onChange={this.inputChange.bind(this)}/>}
          </div>
        </div>
      </form>
    )
  }

  displayButtons() {
    let readonly = this.state.readonly
    if(readonly) {
      return (
        <button className="btn btn-primary" onClick={this.enableEditing.bind(this)}>Edit</button>
      )
    }
    else {
      return (
        <div>
          <button className="btn btn-primary duoButton" onClick={this.cancelChanges.bind(this)}>Cancel</button>
          <button className="btn btn-primary duoButton" onClick={this.saveProfileInfo.bind(this)}>Save</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="profileInfoBody" >
        {this.displayForm()}
        {this.displayButtons()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => { dispatch(getUser()) },
    updateUser: (firstName, lastName, email) => { dispatch(updateUser(firstName, lastName, email)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
