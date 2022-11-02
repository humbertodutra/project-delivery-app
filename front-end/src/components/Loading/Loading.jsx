import React from 'react';

import Images from '../../constants/images';
import './Loading.scss';

function Loading() {
  return (
    <div className="loading">
      <img src={ Images.Logo } alt="loading" />
    </div>
  );
}

export default Loading;
