import {Composition} from 'remotion';
import Stack from './Stack';

type TextLinesVideoProps = {
	text: string;
	duration: number;
}

export default function TextLinesVideo({text, duration}: TextLinesVideoProps) {
	const fps = 30;
	const durationInFrames = duration * fps;
	return (
		<Composition
			id="TextLinesVideo"
			component={Stack}
			durationInFrames={durationInFrames}
			fps={fps}
			width={1920}
			height={1080}
      defaultProps={{
        text
      }}
		/>
	);
};
