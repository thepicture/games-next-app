import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { rawgApi } from 'shared';

import { IMAGE_QUALITY } from 'shared/config';

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
				key={screenshot.id}
				src={screenshot.image}
				alt={`${gameName} screenshot`}
				width={256}
				height={256}
				loading="lazy"
				quality={IMAGE_QUALITY}
				sizes="(max-width: 640px) 25vw,
					   (max-width: 1200px) 50vw,
					   33vw"
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
