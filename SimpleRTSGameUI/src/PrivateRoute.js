import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

// authenticated routes should use this component
const PrivateRoute = (props) => (
    <Fragment>
        { props.isAuthenticated ? props.children : <Redirect to='/login' /> }
    </Fragment>
)

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute);
