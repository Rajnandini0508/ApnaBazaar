import React from 'react'
import scooter from "../assets/scooter.png"
import home from "../assets/home.png"
import { MapContainer,TileLayer,Marker,Popup,Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const DeliveryBoyIcon = new L.Icon({
    iconUrl: scooter,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
const customerIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
function DeliveryBoyTracking({ data }) {
    const DeliveryBoyLat = data.deliveryBoyLocation.lat
    const DeliveryBoylon = data.deliveryBoyLocation.lon
    const customerLat = data.customerLocation.lat
    const customerlon = data.customerLocation.lon

    const path = [
        [DeliveryBoyLat, DeliveryBoylon],
        [customerLat, customerlon]
    ]

    const center = [DeliveryBoyLat, DeliveryBoylon]

    return (
        <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>
            <MapContainer className={"w-full h-full"} center={center} zoom={16}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[DeliveryBoyLat,DeliveryBoylon]} icon={DeliveryBoyIcon}>
                    <Popup>Delivery Boy</Popup>
                </Marker>
                <Marker position={[customerLat,customerlon]} icon={customerIcon}>
                    <Popup>Customer</Popup>
                </Marker>

                <Polyline positions={path} color='blue' weight={4}/>
            </MapContainer>
        </div>
    )
}

export default DeliveryBoyTracking