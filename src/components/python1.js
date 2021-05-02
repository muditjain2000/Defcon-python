import React, { Component } from 'react';
import { python1 } from '../services/userService';

class Python1 extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h1>
                    <br/>
                    Part 2

                </h1>
                {python1()}
                
            </div>

         );
    }
}
 
export default Python1;