import React from 'react';
import YouTube from 'react-youtube';

class ProfileYoutube extends React.Component {
  YouTubeGetID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }


  render () {

    const opts = {
      height: '195',
      width: '320',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        showinfo: 1
      }
    };
    const { videoEditingGears } = this.props;
    const videoItem = videoEditingGears.map(video => (
      <tr className="col-sm-12">

          <td className="p-3">
            <div key={video._id} className="video">
            <YouTube
              videoId={this.YouTubeGetID(video.url)}
              opts={opts}
              onReady={this._onReady}
              />
          </div>
          </td>
          <td className="p-3 mt-0 align-top">
            <div className="video-body">
              <h5 className="video-title">{video.title}</h5>
              <h6 className="video-type"><i>{video.typeofgears}</i></h6><br />
              <p className="video-text">{video.description.substr(0, 310)}</p>
            </div>
          </td>

      </tr>
    ))
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-primary mb-3">Vidéos</h3>
              <table>
                {videoItem}
              </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileYoutube;
