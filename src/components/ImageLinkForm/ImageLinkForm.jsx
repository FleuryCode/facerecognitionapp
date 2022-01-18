import React from "react";

const ImageLinkForm = () => {
    return (
        <div className="mt7">
           <p className="f3 pa3">{'This Magic Brain Will Detect Faces in Your Images. Give it a try.'}</p> 
           <div className="center ph7 br3 w-50">
               <input className="f4 pa2" type="text" placeholder="Image url" />
               <button className="grow f4 link ph3 pv2 white bg-dark-gray pointer ba b--white-025 br3 mh2 shadow-1">
                   {'Detect'}
               </button>
           </div>
        </div>
    );
}

export default ImageLinkForm;