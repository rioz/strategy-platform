import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {UserModal} from './Modals'
import Button from '@material-ui/core/Button';
import {logOut} from 'store/modules/actions'

const HomeIcon = () =>
<div className="HomeIcon">
  <svg width="36" height="36" viewBox="0 0 48 48">
    <path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"/>
  </svg>
</div>

class Nav extends Component {
  state = {
    anchorEl: null
  }
  handleOpen = event => {
   this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
   this.setState({ anchorEl: null });
  }

  handleLogOut = () => {
    this.handleClose()
    logOut()
  }

  render() {
    const {loggedIn, user} = this.props
    const {anchorEl} = this.state

    return (
      <nav>
        <span className='home'>
          <Link to="/"><HomeIcon/></Link>
        </span>
        <span className='title'>Unipro Content Platform - Admin Panel</span>
        {
          loggedIn?
          <span className='auth'>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleOpen}
            >
              {user.email.split("@").shift()}
            </Button>
            <UserModal
              handleClose={this.handleClose}
              handleLogOut={this.handleLogOut}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
            />
          </span>
          : null
        }
      </nav>
    )
  }
}

export default connect(state => ({
  loggedIn: state.data.loggedIn,
  user: state.data.user
}))(Nav)
