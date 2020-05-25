import React from 'react';
import './Profile.css'
import ProfileInfo from './ProfileInfo'
import EditAvatar from './EditAvatar'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'default'
    }

    this.switchTabs = this.switchTabs.bind(this);
  }

  switchTabs(tab) {
    this.setState({
      page: tab
    })
  }

  displayCardHeader() {
    let profileInfoclassName = (this.state.page === 'info') ? "nav-link active" : "nav-link"
    let avatarclassName = (this.state.page === 'avatar') ? "nav-link active" : "nav-link"
    return (
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button className={profileInfoclassName} onClick={()=>{this.switchTabs('info')}}>Profile Info</button>
          </li>
          <li className="nav-item">
            <button className={avatarclassName} onClick={()=>{this.switchTabs('avatar')}}>Avatar</button>
          </li>
        </ul>
      </div>
    )
  }

  displayCardBody() {
    switch (this.state.page) {
      case 'info':
        return (
          <ProfileInfo/>
        )
      case 'avatar':
        return (
          <EditAvatar/>
        )
      default:
        return (
          <div className="card-body">
            <h5 className="card-title">Profile Page</h5>
            <p className="card-text">You can make changes to your profile information or avatar. </p>
            <button className="btn btn-primary" onClick={()=>{this.switchTabs('info')}}>Make Changes</button>
          </div>
        )
    }
  }

  render() {
    return (
      <div className="card text-center">
        {this.displayCardHeader()}
        {this.displayCardBody()}
      </div>
    )
  }
}
export default Profile;
