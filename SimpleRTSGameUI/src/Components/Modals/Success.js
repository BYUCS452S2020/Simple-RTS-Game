import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';

const MODAL_ID = "success";

class SuccessModal extends React.Component {
  render() {
    return (
      <div> {this.props.isVisible &&
        <div className="modal" tabindex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">SUCCESS!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{this.props.info.message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal">OK</button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);
