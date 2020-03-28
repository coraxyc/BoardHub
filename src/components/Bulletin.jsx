import React from 'react';
import '../styles/bulletin.css';

import Board from './Board';

class Bulletin extends React.Component {
    render() {
      return (
        <div className="bulletin">
          <div className="bulletin-board">
            <Board/>
          </div>
        </div>
      );
    }
}

export default Bulletin;