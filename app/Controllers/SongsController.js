import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => template += s.resultsTemplate)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { }


function _drawCurrentSong() {
  let template = ''
  ProxyState.currentSong.forEach(s => template += s.currentSongTemplate)
  document.getElementById('current-song').innerHTML = template
}
//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('currentSong', _drawCurrentSong)
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      let addedSong = ProxyState.currentSong.find(s => s.id == id)
      await songService.addSong(addedSong)
    } catch (error) {
      console.log(error)
    }

  }

  viewSong(id) {
    let thisSong = ProxyState.songs.find(s => s.id == id)
    ProxyState.currentSong = [thisSong]
    console.log(thisSong)
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
