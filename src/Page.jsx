import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import Contents from './Contents.jsx';
import { Grid,
Navbar, Nav, NavItem, NavDropdown,
MenuItem, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IssueAddNav  from './IssueAddNav.jsx';


function NavBar(){
        return (
                            <Navbar>
                <Navbar.Header>
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                <LinkContainer exact to="/">
                <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/issue">
                <NavItem>Issue List</NavItem>
                </LinkContainer>
                <LinkContainer to="/report">
                <NavItem>Report</NavItem>
                </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <IssueAddNav/>
                {/* <NavItem>
                <OverlayTrigger
                placement="left"
                delayShow={1000}
                overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
                >
                <Glyphicon glyph="plus" />
                </OverlayTrigger>
                </NavItem> */}
                <NavDropdown
                id="user-dropdown"
                title={<Glyphicon glyph="option-vertical" />}
                noCaret
                >
                <MenuItem>About</MenuItem>
                <MenuItem>Setting</MenuItem>
                </NavDropdown>
                </Nav>
                </Navbar>
        )}

        function Footer() {
                return (
                <small>
                    <hr/>
                <p className="text-center">
                Full source code available at this
                {' '}
                <a href="https://github.com/tigabum/IssueTracker">
                GitHub repository
                </a>
                </p>
                </small>
                );
                }

export default function Page(){
    return(
        <div>
            <NavBar/>
            <Grid fluid >
                  <Contents/>

            </Grid>
          
            <Footer/>
        </div>
    )
}