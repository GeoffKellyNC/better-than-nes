import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Link } from '@reach/router';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { theme } from '../styles/theme';
import {
  formatPeopleAffected,
  formatDuration,
  getStatusColor,
} from '../utils/formatters';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapWrapper = styled.div`
  width: 100%;
  height: ${props => props.$height || '500px'};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.xl};
  position: relative;
  border: 2px solid ${theme.colors.border};

  .leaflet-container {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: ${props => props.$mobileHeight || '400px'};
    border-radius: ${theme.borderRadius.md};
    border-left: none;
    border-right: none;
  }
`;

const PopupContent = styled.div`
  min-width: 200px;
`;

const PopupTitle = styled.h3`
  font-size: ${theme.typography.sizes.base};
  font-weight: ${theme.typography.weights.semibold};
  margin: 0 0 ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
`;

const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const PopupRow = styled.div`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const PopupLabel = styled.span`
  color: ${theme.colors.text.muted};
`;

const StatusBadge = styled.span`
  display: inline-block;
  background-color: ${props => props.$color};
  color: white;
  padding: 2px ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  text-transform: uppercase;
`;

const ViewDetailsLink = styled(Link)`
  display: inline-block;
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.accent.primary};
  color: white;
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  text-align: center;

  &:hover {
    background-color: ${theme.colors.accent.secondary};
  }
`;

const FitBounds = ({ outages }) => {
  const map = useMap();

  useEffect(() => {
    if (outages && outages.length > 0) {
      const bounds = outages
        .filter(o => o.latitude && o.longitude)
        .map(o => [o.latitude, o.longitude]);

      if (bounds.length > 0) {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13,
        });
      }
    }
  }, [outages, map]);

  return null;
};

const createCustomIcon = (status) => {
  const color = getStatusColor(status);
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 1.9 0.4 3.7 1.2 5.3L12.5 41l11.3-23.2c0.8-1.6 1.2-3.4 1.2-5.3C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

export const OutageMap = ({ outages, addresses, height, mobileHeight, center, zoom }) => {
  const defaultCenter = center || [36.1627, -86.7816];
  const defaultZoom = zoom || 11;

  if (!outages || outages.length === 0) {
    return (
      <MapWrapper $height={height} $mobileHeight={mobileHeight}>
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper $height={height} $mobileHeight={mobileHeight}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds outages={outages} />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
        >
          {outages.map((outage) => {
            if (!outage.latitude || !outage.longitude) return null;

            const address = addresses[outage.id];

            return (
              <Marker
                key={outage.id}
                position={[outage.latitude, outage.longitude]}
                icon={createCustomIcon(outage.status)}
              >
                <Popup>
                  <PopupContent>
                    <PopupTitle>
                      <StatusBadge $color={getStatusColor(outage.status)}>
                        {outage.status}
                      </StatusBadge>
                    </PopupTitle>

                    <PopupInfo>
                      <PopupRow>
                        <strong>{formatPeopleAffected(outage.numPeople)}</strong> affected
                      </PopupRow>

                      {address && address.formatted && (
                        <PopupRow>{address.formatted}</PopupRow>
                      )}

                      <PopupRow>
                        <PopupLabel>Started:</PopupLabel> {formatDuration(outage.startTime)}
                      </PopupRow>

                      <PopupRow>
                        <PopupLabel>ID:</PopupLabel> #{outage.identifier || outage.id}
                      </PopupRow>
                    </PopupInfo>

                    <ViewDetailsLink to={`/outage/${outage.id}`}>
                      View Details
                    </ViewDetailsLink>
                  </PopupContent>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </MapWrapper>
  );
};
