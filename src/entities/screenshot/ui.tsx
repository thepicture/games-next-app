import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { rawgApi } from 'shared';

export const Screenshot = ({
	screenshot,
	gameName,
}: {
	screenshot: rawgApi.GameModels.Screenshot;
	gameName: string;
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<section style={{ position: 'relative', width: '256px', height: '256px' }}>
			{!isImageLoaded && (
				<section
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</section>
			)}
			<Image
				key={screenshot.id.toString()}
				src={screenshot.image}
				alt={`${gameName} screenshot`}
				width={256}
				height={256}
				loading="lazy"
				onLoad={() => setIsImageLoaded(true)}
				style={{
					opacity: isImageLoaded ? 1 : 0,
					position: 'absolute',
					objectFit: 'cover',
					borderRadius: '8px',
					padding: 4,
				}}
			/>
		</section>
	);
};
