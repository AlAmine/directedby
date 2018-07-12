import React from 'react';
import YouTube from 'react-youtube';

class ProfileYoutube extends React.Component {
  YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }

  


  render () {

    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        showinfo: 1

      }
    };
    const { videoEditingGears } = this.props;
    const videoItem = videoEditingGears.map(video => (

      <div key={video._id} className="col-xl-4 col-md-6 col-sm-12 mt-3">
        <div className="card">
          <div className="card-content">
            <div className="card-body">

              <h4 className="card-title mt-3">{video.title.substr(0, 24)}</h4>
              <h6 className="card-subtitle text-muted"><i>{video.typeofgears}</i></h6>
              <div key={video._id} className="embed-responsive embed-responsive-4by3 mt-2">
                <YouTube
                  videoId={this.YouTubeGetID(video.url)}
                  opts={opts}
                  onReady={this._onReady}
                  />
              </div>
              <div className="card-body">
                <p className="card-text">{video.description.substr(0, 150)}...</p>

              </div>
          </div>
        </div>
      </div>
    </div>
    ))
    return (
      <div className="video">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-primary mb-3">Vidéos</h3>
            {videoItem.length > 0 ? (<div className="row">{videoItem}</div>) : <p className="text-center">Pas de vidéo</p>}
          </div>
        </div>
    )
  }
}

export default ProfileYoutube;
