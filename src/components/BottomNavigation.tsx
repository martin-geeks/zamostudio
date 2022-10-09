import * as  React from 'react';



interface BottomNavigationProps {
  open: boolean;
  children:any;
 // className:string;
}

export default function BottomNavigation(props: BottomNavigationProps){
  const myModalBox = React.useRef<any>();
  var open: string = 'modal-close';
  if(props.open === true){
    myModalBox.current.classList.add('modal-open')
  }
  if(props.open === false){
    open = '';
  }
  const closeNav = () => {
   myModalBox.current.classList.remove('modal-open')
  }
  return (
    <React.Fragment>
    <div>
{/*      
<label htmlFor="my-modal-6" className="btn modal-button">open modal</label>
*/}

<input type="checkbox" id="my-modal-6" className="modal-toggle" />
<div ref={myModalBox} className={`modal modal-bottom sm:modal-middle` }>

  <div className="modal-box bg-white dark:bg-black shadow-2xl">
    
    <div >
    {props.children}
    </div>
    <div className="modal-action">
      <label htmlFor="my-modal-6" className="btn border-red-400 text-red-400" onClick={closeNav} >close</label>
    </div>
  </div>
</div>

</div>
    </React.Fragment>
    );
}