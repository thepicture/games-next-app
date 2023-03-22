import styled from '@emotion/styled';

export const StickyHeader = styled('section')(() => ({
	position: 'sticky',
	top: 0,
	height: 'fit-content',

	zIndex: 2,
}));
