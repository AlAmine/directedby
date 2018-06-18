import React from 'react';
import YouTube from 'react-youtube';

class Example extends React.Component {
  render() {
    const opts = {
      height: '195',
      width: '320',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        showinfo: 1
      }
    };

    return (
      <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
export default Example


// onFileSelect(e) {
//   this.setState({file: e.target.value}, () => {
//     let preview = document.getElementById('preview');
//     let file = document.getElementById('customFileLang').files[0];
//     let reader = new FileReader();
//     reader.addEventListener("load", () => {
//       preview.src = reader.result;
//       console.log(preview.src);
//     }, false );
//     if(file) {
//       reader.readAsDataURL(file);
//       console.log(file)
//     }
//
//   })
// }
