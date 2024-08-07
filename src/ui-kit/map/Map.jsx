import React, {useRef, useState}                 from 'react'
import {Map as MapLeaflet, WMSTileLayer, Marker} from 'react-leaflet'
import styled                                    from 'styled-components'
import 'leaflet/dist/leaflet.css'
import Leaflet                                   from 'leaflet'
import {getReverseService}                       from 'src/api/services/mapServices'

const Map = ({getDataAddress}) => {
  const [markLatLng, onChangeMarkLatLng] = useState()
  const state = {
    center: [35.715298, 51.404343],
    zoom: 10
  }
  const refMap = useRef()


  function reverseFunction (e) {
    getReverseService({
      lat: e.latlng.lat,
      lon: e.latlng.lng
    })
      .then((res) => {
        if (res.status) {
          getDataAddress({...res.data, latLng: e.latlng})
        }
      })
    onChangeMarkLatLng(e.latlng)
  }

  return <StyledMap className={'radius-8 overflow-hidden'}>

    <MapLeaflet center={state.center} zoom={state.zoom}
                ref={refMap}
                onClick={reverseFunction}
    >
      <WMSTileLayer
        url={`${process.env.REACT_APP_MAP_URL}/shiveh?x-api-key=${process.env.REACT_APP_MAP_IR_KEY}`}
        version={'1.1.1'}
        attribution='map.ir'
        layers="Shiveh:Shiveh"
        format="image/png"
      />

      {markLatLng &&
      <Marker
        icon={
          Leaflet.icon({
            iconUrl: require('src/assets/images/icons/location.png'),
            iconRetinaUrl: require('src/assets/images/icons/location.png')
          })
        }
        draggable
        position={markLatLng}/>
      }

    </MapLeaflet>
  </StyledMap>
}

export default Map

Map.defaultProps = {
  getDataAddress: () => {}
}

const StyledMap = styled.div`

  font-family: sans-serif;
  text-align: center;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }

  .leaflet-div-icon {
    background: transparent;
    border: none;
  }


  .leaflet-routing-alternatives-container {
    display: none;
  }

  .leaflet-control-layers.leaflet-control {
    margin: 0;
    background-color: transparent;
    box-shadow: none;
    border: none !important;
    height: auto;
    width: auto;

  }

  .leaflet-control-layers:hover {
    padding: 0;
    color: #333;
    background: transparent;
  }

  .leaflet-top.leaflet-right {
    position: absolute;
    width: 44px;
    max-height: 65px;
    right: 50%;
    top: 50%;
    z-index: 400;
    transform: translate(50%, -100%);
  }

  .leaflet-control-container {
    width: 100%;
    min-height: 100%;
    position: relative;
  }

  .leaflet-control-layers-toggle {
    width: 45px !important;
    height: 66px !important;
    background-size: contain !important;
  }

  .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
    display: block;
  }

  height: 100%;

  .leaflet-control-attribution {
    display: none;
  }

  @media (max-width: 1200px) {
    .leaflet-control-zoom {
      display: none;
    }
  }

`