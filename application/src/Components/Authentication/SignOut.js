import React from 'react';
 
import {Button} from '@material-ui/core';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <div onClick={firebase.doSignOut}>
    Sign Out
  </div>

);
 
export default withFirebase(SignOutButton);