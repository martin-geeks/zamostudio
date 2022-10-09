import * as React from 'react';

export default function Footer() {
  //controls go here;
  
  return (
    <React.Fragment>
      <div className='py-10 absolute bottom-[100%] w-screen bg-gray-200 dark:bg-black z-[40]' >
        <div>
          <span> subscribe to our newsletter</span>
          <label>
          <input type='email' className=''  />
          <button>
            <i className='fal fa-arrow-right' />
          </button>
          </label>
        </div>
      </div>
    </React.Fragment>
    );
}