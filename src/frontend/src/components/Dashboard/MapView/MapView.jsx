import React, { useEffect, useState } from "react";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import extractError from "../../../utils/extractError.js";
import ax from "../../../utils/ax.js";
import locationCodeToName from "../../../utils/locationCodeToName.js";

function MapView() {
	const [data, setData] = useState([]);

	useEffect(() => {
		ax.get(`${apiBaseURL}/nodes/map`)
			.then((res) => {
				const nodes = res.data.nodes.map((node) => {
					node.location =
						locationCodeToName[node.name.split("-").at(-2)];
					delete node.name;
					return node;
				});

				setData(nodes);
			})
			.catch((err) => alert(extractError(err)));
	}, []);

	return (
		<FadeDiv
			className="-z-30 h-screen w-full"
			style={{ paddingBottom: "54px" }}
		>
			<MapContainer
				center={[17.446, 78.348]}
				zoom={20}
				scrollWheelZoom={true}
				className="h-full w-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{data.map((item, index) => (
					<Marker
						position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
						key={index}
					>
						<Popup>
							{Object.keys(item).map((key) => (
								<p>
									{Object.keys(item[key]).map((key1) => (
										<>
											{key !== "latitude" &&
												key !== "longitude" &&
												key !== "location" && (
													<span>
														{key} : {item[key][key1]}
													</span>
												)}
										</>
									))}
								</p>
							))}
							<p>
								<span>Location : {item.location}</span>
							</p>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</FadeDiv>
	);
}

export default MapView;
