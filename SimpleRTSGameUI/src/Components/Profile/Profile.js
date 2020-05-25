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
    let profileInfoClass = (this.state.page === 'info') ? "nav-link active" : "nav-link"
    let avatarClass = (this.state.page === 'avatar') ? "nav-link active" : "nav-link"
    return (
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class={profileInfoClass} onClick={()=>{this.switchTabs('info')}}>Profile Info</a>
          </li>
          <li class="nav-item">
            <a class={avatarClass} onClick={()=>{this.switchTabs('avatar')}}>Avatar</a>
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
          <div class="card-body">
            <h5 class="card-title">Profile Page</h5>
            <p class="card-text">You can make changes to your profile information or avatar. </p>
            <a class="btn btn-primary" onClick={()=>{this.switchTabs('info')}}>Make Changes</a>
          </div>
        )
    }
  }

  render() {
    return (
      <div class="card text-center">
        {this.displayCardHeader()}
        {this.displayCardBody()}
      </div>
    )
  }
}
export default Profile;
