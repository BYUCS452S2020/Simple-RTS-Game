import React from 'react';
import { connect } from 'react-redux';
import { getAvatar, setAvatar } from '../../actions';


class EditAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarImagesField: {},
      readonly: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getAvatar();
  }

  enableEditing() {
    this.setState({
      readonly: !this.state.readonly,
      avatarImagesField: Object.assign({}, this.props.avatarImages)
    })
  }

  saveProfileInfo() {
    this.setState({
      readonly: !this.state.readonly,
    })

    let { happy, mad, mocking } = Object.assign({}, this.state.avatarImagesField);
    this.props.setAvatar(happy, mad, mocking)
  }

  cancelChanges() {
    this.setState({
      readonly: !this.state.readonly
    })
  }

  toBase64(file, avatarType) {
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
       let map = this.state.avatarImagesField;
       map[avatarType] = reader.result;
       this.setState({
         avatarImagesField: map
       })
     }
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
  }

  async handleChange(event) {
    await this.toBase64(event.target.files[0], event.target.id)
  }

  displayAvatarImages() {
    let out = [];
    let readonly = this.state.readonly;
    let map = (readonly) ? this.props.avatarImages : this.state.avatarImagesField
    for(let image in map) {
      out.push(
        <div class="editAvatarContainer">
          <img src={map[image]} class="editAvatar" alt="Smiley face" />
          {!readonly && <input class="avatarInput" type="file" id={image} accept="image/*" onChange={this.handleChange} />}
          <div class="avatarTypeText"> Your {image} avatar. </div>
        </div>
      )
    }
    return out;
  }

  displayButtons() {
    let readonly = this.state.readonly
    if(readonly) {
      return (
        <a class="btn btn-primary" onClick={this.enableEditing.bind(this)}>Edit</a>
      )
    }
    else {
      return (
        <div>
          <a class="btn btn-primary duoButton" onClick={this.cancelChanges.bind(this)}>Cancel</a>
          <a class="btn btn-primary duoButton" onClick={this.saveProfileInfo.bind(this)}>Save</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div class="editAvatarBody">
        <h5 class="subHeader">Avatar Page</h5>
        {this.displayAvatarImages()}
        {this.displayButtons()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    avatarImages: {
      happy: state.avatar.happy,
      mad: state.avatar.mad,
      mocking: state.avatar.mocking
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAvatar: () => { dispatch(getAvatar()) },
    setAvatar: (happy, mad, mocking) => { dispatch(setAvatar(happy, mad, mocking)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar);
