import React, {Component} from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { fetchPhotos } from '../store'

class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount(props) {
    this.props.fetchPhotos(this.props.match.params.teamId)

  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  
  render(props) {
    const {photos, currentTeam} = this.props

    return (
      <div id="photoGallery">
        <h2 className="photoHeader">Successful Photo Matches: </h2>
        { photos.photos &&
          photos.photos.filter(photo => photo.success === true).map(photo => {
            return (
              <img id="photo" key={photo.id} src={photo.url} height="200" width="200"></img>
            )
          })
        }
        <h2 className="photoHeader">Unsuccessful Photo Attempts: </h2>
        { photos.photos &&
          photos.photos.filter(photo => photo.success === false).map(photo => {
            return (
              <img key={photo.id} src={photo.url} height="200" width="200"></img>
            )
          })
        }
      </div>
    )
  }
}

const mapState = ({currentTeam, photos}) => ({currentTeam, photos})

const mapDispatch = (dispatch) => {
  return {
    fetchPhotos(teamId) {
      dispatch(fetchPhotos(teamId))
    }
  }
}


export default connect(mapState, mapDispatch)(GalleryView)

/**
 *  <Gallery photos={photos.length && photos} onClick={this.openLightbox} />
      <Lightbox images={photos.length && photos}
        onClose={this.closeLightbox}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        currentImage={this.state.currentImage}
        isOpen={this.state.lightboxIsOpen}
      />
 */