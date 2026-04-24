import { motion } from 'framer-motion';

export function ParentToChildConnector({ childCount }: { childCount: number }) {
	if (childCount === 0) return null;

	const childDotX = 75;
	const parentDotY = 5;
	const parentDotX = 30;
	const childStep = 104;
	const firstChildDotY = 70;

	return (
		<svg className="pointer-events-none absolute top-0 left-0 z-0 overflow-visible">
			<defs>
				<linearGradient id="treeBranchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="rgba(103,232,249,0.95)" />
					<stop offset="100%" stopColor="rgba(34,211,238,0.45)" />
				</linearGradient>

				<filter id="treeBranchGlow">
					<feGaussianBlur stdDeviation="2.2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{Array.from({ length: childCount }, (_, index) => {
				const childDotY = firstChildDotY + index * childStep;

				return (
					<motion.path
						key={index}
						d={`
							M ${parentDotX} ${parentDotY}
							C ${parentDotX} ${childDotY}
							${parentDotX} ${childDotY}
							${childDotX} ${childDotY}
						`}
						stroke="url(#treeBranchGradient)"
						strokeWidth="3"
						fill="none"
						strokeLinecap="round"
						filter="url(#treeBranchGlow)"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{ duration: 0.35, delay: index * 0.25 }}
					/>
				);
			})}

			<circle cx={parentDotX} cy={parentDotY} r="6" fill="rgb(103,232,249)" />

			{Array.from({ length: childCount }, (_, index) => {
				const childDotY = firstChildDotY + index * childStep;
				return <circle key={index} cx={childDotX} cy={childDotY} r="4" fill="rgb(103,232,249)" />;
			})}
		</svg>
	);
}
