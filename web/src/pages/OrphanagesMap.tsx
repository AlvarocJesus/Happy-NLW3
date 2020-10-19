import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarkerImg from '../images/map-maker.svg'
import mapIcon from '../utils/mapIcon';
import api from '../service/api';

import '../styles/pages/orphanages-map.css'

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas criancas estao esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Suzano</strong>
                    <span>Sao Paulo</span>
                </footer>
            </aside>

            <Map 
                center={[-23.5149546,-46.2946304]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://s.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <TileLayer url={`https://api.matbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude , orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color='#fff' />
                                </Link>
                            </Popup>

                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
            
        </div>
    );
}

export default OrphanagesMap;