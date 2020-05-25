import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MODAL_ID = "error";

class ErrorModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.isVisible} onHide={this.props.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.info.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVisible: state.modals[MODAL_ID].isVisible,
    info: state.modals[MODAL_ID].info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => { dispatch(toggleModal(MODAL_ID)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
