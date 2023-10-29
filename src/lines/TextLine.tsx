import {useRef, useLayoutEffect} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type TextLineProps = {
	speed: number;
	color: string;
	children?: string;
	isReverse?: boolean;
};

export default function TextLine({
	speed,
	color,
	children,
	isReverse,
}: TextLineProps) {
	const element = useRef<HTMLSpanElement>(null);
	const frame = useCurrentFrame();
	const {durationInFrames, width, fps} = useVideoConfig();

	// Finding the offset value (offsetWidth) 
	// to determine the position of the string at the end of the animation, 
	// based on the video duration and the speed of the moving string. 
	// Also, finding the necessary width of the string (fullWidth).
	const durationInSeconds = durationInFrames / fps;
	const offset = durationInSeconds * speed;
	const multiplier = offset / 100;
	const offsetWidth = width * multiplier * (isReverse ? -1 : 1);
	const fullWidth = width + Math.abs(offsetWidth);

	// Changing the start position of strings 
	// that move from left to right 
	// by the offset value (offsetWidth).
	const leftPosition = isReverse ? 0 : offsetWidth * -1;

	const transform = interpolate(frame, [0, durationInFrames], [0, offsetWidth]);

	// If the width of the input string is less 
	// than the necessary width (fullWidth), 
	// increase the width of the input string.
	useLayoutEffect(() => {
		if (element.current) {
			let textWidth = element.current.getBoundingClientRect().width;
			while (fullWidth > textWidth) {
				element.current.textContent += ` ${element.current.textContent}`;
				textWidth = element.current.getBoundingClientRect().width;
			}
		}
	}, []);

	return (
		<div
			className="text-line"
			style={{
				color,
				left: `${leftPosition}px`,
				transform: `translateX(${transform}px)`,
			}}
		>
			<span ref={element}>{children}</span>
		</div>
	);
}
