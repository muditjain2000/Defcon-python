import React, { Component } from 'react';
import { python } from '../services/userService';

class Python extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>
                    <br/>
                    Part 1

                </h1>
                {python()}
                
            </div>

         );
    }
}
 
export default Python;