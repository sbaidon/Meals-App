<template>
  <div class="columns is-paddingless is-marginless is-multiline column is-12">
    <div class="field column is-12">
      <label class="label has-text-white">Restaurant</label>
      <div class="control has-icons-left">
        <input id="autocomplete" class="input" type="text" placeholder="Search">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </div>
    </div> 
    <div class="column is-12">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'map-view',
  data () {
    return {
      lat: 51.50,
      long: -0.127,
      selectedPlace: {}
    }
  },
  computed: {
    mapContainer() {
      return this.$el.querySelector('#map')
    },
    input() {
      return this.$el.querySelector('#autocomplete')
    },
    location() {
      return new google.maps.LatLng(this.lat, this.long);
    },
    mapOptions() {
      return {
        center: this.location,
        scrollwheel: false,
        zoom: 15
      }
    },
    nearbyOptions() {
      return {
        location: this.location,
        radius: '500',
        type: ['restaurant']
      }
    },
    autocompleteOptions() {
      return {
        types: ['establishment']
      }
    }
  },
  mounted() {
    this.getLocation()
    this.attachMap()
    this.addAutocomplete()
  },
  methods: {
    addAutocomplete() {
      this.matches = new google.maps.places.Autocomplete(this.input, this.autocompleteOptions);
      this.matches.addListener('place_changed', () => {
        this.removeMarker()
        this.selectedPlace = this.matches.getPlace()
        this.createMarker(this.selectedPlace)
        this.$emit('placeChanged', this.selectedPlace)
      })
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.receivePosition, this.handleError)
        return
      }
    },
    removeMarker() {
      if (this.selectedPlace) {
        
      }
    },
    createMarker(place) {
      const lat = place.geometry.location.lat() 
      const lng = place.geometry.location.lng()
      const location = new google.maps.LatLng(lat, lng)
      const marker = new google.maps.Marker({
        position: location, 
        title: place.name,
      });
      marker.setMap(this.map)
      this.map.setCenter({ lat, lng }); 
      this.addInfoWindow(marker, place)
    },
    addInfoWindow(marker, place) {
      const infoWindow = new google.maps.InfoWindow()
      marker.addListener('click', () => {
        infoWindow.setContent(this.getInfoWindowHtml(place));
        infoWindow.open(this.map, marker);
      }) 
    },
    getInfoWindowHtml(place) {
      let image = ''
      if (place.photos.length) {
        image = place.photos[0].getUrl({
          maxWidth: 248 
        })
      }
      return `
        <div class="popup">
            <figure class="image is-128x128">
              <img src="${image || ''}" alt="${place.name}"> 
            </figure>
            <p>${place.name}</p>
        </div>
      `;  
    },
    getNearbyPlaces() {
      this.service = new google.maps.places.PlacesService(this.map);
      this.service.nearbySearch(this.nearbyOptions, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(place => this.createMarker(place))
        }
      });
    },
    handleError(error) {
      console.log(error)
    },
    receivePosition(position) {
      this.lat = position.position.coords.latitude
      this.long = position.coords.longitde
    },
    attachMap() {
      this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
    },
    getNearbyRestaurants() {
      this.$store.dispatch('getNearbyRestaurants')
    }
  }
}
</script>

<style lang='sass'>
  #map 
    height: 300px
    width: 100%
    margin-bottom: 1rem

  .container
    width: 100%
</style>