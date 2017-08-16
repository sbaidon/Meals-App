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
      autocompleteOptions: {
        types: ['establishment']
      }
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
  },
  mounted() {
    this.attachMap()
    this.addAutocomplete()
  },
  methods: {
    attachMap() {
      this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
    },
    addAutocomplete() {
      this.autocomplete = new google.maps.places.Autocomplete(this.input, this.autocompleteOptions);
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace()
        this.setRestaurant(place)
      })
    },
    createMarker(place) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng() 
      const location = new google.maps.LatLng(lat, lng)
      const marker = new google.maps.Marker({ position: location, title: place.name, })
      marker.setMap(this.map)
      this.map.setCenter({ lat, lng })
      this.addInfoWindow(marker, place)
    },
    addInfoWindow(marker, place) {
      const infoWindow = new google.maps.InfoWindow()
      marker.addListener('click', () => {
        infoWindow.setContent(this.getInfoWindowHtml(place));
        infoWindow.open(this.map, marker);
        this.setRestaurant(place) 
      }) 
    },
    getInfoWindowHtml(place) {
      let image = ''
      if (place.photos) {
        image = place.photos[0].getUrl({ maxWidth: 248 })
      }
      return `<figure class="image is-128x128">
                <img src="${image || ''}" alt="${place.name}"> 
              </figure>
              <p>${place.name}</p> `;  
    },
    setRestaurant(place) {
      if (!this.isRestaurant(place)) {
        this.setInput('')
        return this.$store.commit('PUSH_ERROR', 'Please select an establishment that is a restaurant')
      }
      if (!this.hasProperties(place)) {
        this.setInput('')
        return this.$store.commit('PUSH_ERROR', 'Restaurant is missing key information') 
      }
      this.createMarker(place)
      this.$emit('placeChanged', place)
      this.setInput(place.name)
    },
    setInput(value) {
      this.input.value = value 
    },
    isRestaurant(place) {
      if(!place) return false
      if(!place.types) return false
      return place.types.some((type) => type === 'restaurant')
    },
    hasProperties(place) {
      if (!place) return false
      return place.formatted_address && place.name && place.international_phone_number
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