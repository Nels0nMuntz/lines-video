import {
	AbsoluteFill,
	Audio,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	staticFile,
} from 'remotion';
import TextLine, {TextLineProps} from './TextLine';

type Data = Omit<TextLineProps, 'children'>;

type TextLinesProps = {
	text: string;
};

const data: Data[] = [
	{speed: 3, color: '#C62148', isReverse: true},
	{speed: 5, color: '#B79DB4', isReverse: true},
	{speed: 6, color: '#D67720'},
	{speed: 3.5, color: '#9ABBAF', isReverse: true},
	{speed: 4, color: '#B7989B'},
	{speed: 6, color: '#BB9BB7', isReverse: true},
	{speed: 3, color: '#B5B7A0'},
	{speed: 3.5, color: '#C47576', isReverse: true},
	{speed: 3, color: '#79A1B7'},
	{speed: 6, color: '#B476BB'},
	{speed: 4, color: '#D44E51'},
	{speed: 3.5, color: '#618FCD'},
	{speed: 6, color: '#4FD376', isReverse: true},
	{speed: 3, color: '#B7934D', isReverse: true},
	{speed: 3, color: '#6E4593'},
	{speed: 5, color: '#43A37C', isReverse: true},
	{speed: 4, color: '#D67720'},
	{speed: 4, color: '#26BEDF', isReverse: true},
];

const data2 = [
	{children: 'Well done', speed: 3, color: '#C62148', isReverse: true},
	{children: 'Well done', speed: 5, color: '#B79DB4', isReverse: true},
	{children: 'Well done', speed: 6, color: '#D67720'},
	{children: 'Well done', speed: 3.5, color: '#9ABBAF', isReverse: true},
	{children: 'Well done', speed: 4, color: '#B7989B'},
	{children: 'Well done', speed: 6, color: '#BB9BB7', isReverse: true},
	{children: 'Well done', speed: 3, color: '#B5B7A0'},
	{children: 'Well done', speed: 3.5, color: '#C47576', isReverse: true},
	{children: 'Well done', speed: 3, color: '#79A1B7'},
	{children: 'Well done', speed: 6, color: '#B476BB'},
	{children: 'Well done', speed: 4, color: '#D44E51'},
	{children: 'Well done', speed: 3.5, color: '#618FCD'},
	{children: 'Well done', speed: 6, color: '#4FD376', isReverse: true},
	{children: 'Well done', speed: 3, color: '#B7934D', isReverse: true},
	{children: 'Well done', speed: 3, color: '#6E4593'},
	{children: 'Well done', speed: 5, color: '#43A37C', isReverse: true},
	{children: 'Well done', speed: 4, color: '#D67720'},
	{children: 'Well done', speed: 4, color: '#26BEDF', isReverse: true},
];

export default function Stack({text}: TextLinesProps) {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();
	const durationInSeconds = durationInFrames / fps;

	// If the duration of the video is greater than 3 seconds,
	// the volume starts decreasing 3 seconds before the end.
	// If the duration of the video is less than 3 seconds,
	// the volume starts decreasing in the middle of the video.
	const audioFateOutStartPoint =
		durationInSeconds > 3
			? Math.round(
					(durationInFrames * (durationInSeconds - 3)) / durationInSeconds
			  )
			: Math.round(durationInFrames / 2);
	const audioFateOutEndPoint = durationInFrames;
	const blur = interpolate(frame, [0, 3], [25, 0], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	const opacity1 = interpolate(
		frame,
		[audioFateOutStartPoint, audioFateOutEndPoint],
		[1, 0]
	);
	const opacity2 = interpolate(
		frame,
		[audioFateOutStartPoint, audioFateOutEndPoint],
		[0, 1]
	);
	// Console.log([audioFateOutStartPoint, audioFateOutEndPoint]);

	return (
		<AbsoluteFill className="stack-bg">
			<AbsoluteFill>
				<div className="stack" style={{filter: `blur(${blur}px)`}}>
					{data.map((props, index) => (
						<div style={{opacity: opacity1}}>
							<TextLine {...props} key={index}>
								{text}
							</TextLine>
						</div>
					))}
				</div>
			</AbsoluteFill>
			<AbsoluteFill>
				<div className="stack" style={{filter: `blur(${blur}px)`}}>
					{data2.map(({children, ...props}, index) => (
						<div style={{opacity: opacity2}}>
						<TextLine {...props} key={index}>
							{children}
						</TextLine>
						</div>
					))}
				</div>
			</AbsoluteFill>
				<Audio
					src={staticFile('audio.wav')}
					volume={(f) =>
						interpolate(
							f,
							[audioFateOutStartPoint, audioFateOutEndPoint],
							[1, 0],
							{extrapolateLeft: 'clamp'}
						)
					}
				/>
		</AbsoluteFill>
	);
}
