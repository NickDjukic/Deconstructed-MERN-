import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import TeamMembers from '../team_members/team_members';
// import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false }
    
        this.handleClickLocation = this.handleClickLocation.bind(this);

        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleSessionForms = this.handleSessionForms.bind(this);       
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickLocation);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickLocation);
    }
    

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    handleSessionForms(e) {
        const { location, history } = this.props
        e.stopPropagation();
       
        if (location.pathname === "/login" || location.pathname === "/signup") {
            return document.addEventListener("click", (event) => {
               
                history.push("/")
            })
        }
    }

    handleClickLocation(e) {
        if (this.node.contains(e.target)) {
            if (this.state.modalOpen && this.svgmodal.contains(e.target)) {
                this.setState({modalOpen: false})
            } else {
                this.setState({modalOpen: true})
            }
          } else {
            this.setState({modalOpen: false})
         }
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <>   
                    <div className="nav_bar_buttons_container">
                        <button className="nav_bar_login" onClick={this.logoutUser}>Logout</button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="nav_bar_buttons_container">
                        <Link to={'/signup'}><button onClick={this.handleSessionForms} className="nav_bar_login"><p>Signup</p></button></Link>
                        <Link to={'/login'}><button onClick={this.handleSessionForms} className="nav_bar_login"><p>Login</p></button></Link>
                    </div>
                </>
            );
        }
    }

    modal() {
        if (this.state.modalOpen) {
            return <TeamMembers />
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="nav_bar_container" >
                <Link to="/"><h1>DECONSTRUCTED</h1> </Link>
                <a href="https://github.com/NicholasCocks/Deconstructed-MERN-" target="_blank">
                    <FontAwesomeIcon className="question_form_icon" icon={faGithub} className="modal modalhover"/>
                </a> 
                <div ref={node => this.node = node}>
                    <div ref={svgmodal => this.svgmodal = svgmodal} className="modaldiv">
                    <FontAwesomeIcon icon={faUsers} className={this.state.modalOpen ? 'modal modalactive' : 'modal modalhover'}/>
                    </div>
                    {this.modal()}
                </div>
                {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);