export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId?.toString() || data.id;
  }

  get resultsTemplate() {
    return `
    <div onclick="app.songsController.viewSong('${this.id}')" class="bg-dark">
    <div class="d-flex text-center justify-content-center">
      <img class="selectable img-fluid p-2 col-6" src="${this.albumArt}" alt="">
    </div>
    <div class="p-1 text-center text-light">
      <h5>'${this.artist}</h5>
      <h5>${this.album}</h5>
      <p>${this.title}</p>
    </div>
  </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div onclick="app.songsController.removeSong('${this.id}')" class="bg-dark">
    <div class="d-flex text-center justify-content-center">
      <img class="selectable img-fluid p-2 col-6" src="${this.albumArt}" alt="">
    </div>
    <div class="p-1 text-center text-light">
      <h5>${this.artist}</h5>
      <h5>${this.album}</h5>
      <p>${this.title}</p>
    </div>
  </div>
        `;
  }

  get currentSongTemplate() {
    return `
    <div class="d-flex text-center justify-content-center">
    <img class="img-fluid col-12" src="${this.albumArt}" alt="">
  </div>
  <div class="p-3 text-center">
    <h2>${this.artist}</h2>
    <h4>${this.album}</h4>
    <p>${this.title}</p>
    </div>
    ${this.buttonSwitch}
    `

  }
  get buttonSwitch() {
    return `
    <button onclick="app.songsController.addSong('${this.id}')" class="col-12 p-1 rounded btn-success">Add to Playlist
    </button>
    <button class="col-12 p-1 rounded btn-danger" onclick="app.songsController.removeSong('${this.id}')">
    Remove From Playlist
    </button>
    `
  }
}
