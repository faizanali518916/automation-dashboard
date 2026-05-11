'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

type ParentToChildConnectorProps = {
	childCount: number;
	childRefs: React.RefObject<HTMLDivElement>[];
};

export function ParentToChildConnector({ childCount, childRefs }: ParentToChildConnectorProps) {
	if (childCount === 0) return null;

	const containerRef = useRef<SVGSVGElement>(null);
	const [childPositions, setChildPositions] = useState<number[]>([]);

	const updatePositions = useCallback(() => {
		if (!containerRef.current?.parentElement) return;

		const positions: number[] = [];
		const containerParent = containerRef.current.parentElement;
		const containerRect = containerParent.getBoundingClientRect();

		for (let i = 0; i < childRefs.length; i++) {
			const ref = childRefs[i];
			if (!ref?.current) continue;

			const headerElement = ref.current.querySelector('[data-tree-node-header]') as HTMLElement | null;
			if (!headerElement) continue;

			const headerRect = headerElement.getBoundingClientRect();
			// Anchor to child header center so the branch target stays fixed while descendants expand/collapse.
			const relativeY = headerRect.top - containerRect.top + headerRect.height / 2;
			positions.push(relativeY);
		}

		if (positions.length > 0) {
			setChildPositions(positions);
		}
	}, [childRefs]);

	useEffect(() => {
		// Delay to allow DOM to settle
		const timer = setTimeout(() => {
			updatePositions();
		}, 150);

		// Setup observers
		const resizeObserver = new ResizeObserver(() => {
			updatePositions();
		});

		if (containerRef.current?.parentElement) {
			resizeObserver.observe(containerRef.current.parentElement);
		}

		childRefs.forEach((ref) => {
			if (ref?.current) {
				resizeObserver.observe(ref.current);
			}
		});

		window.addEventListener('resize', updatePositions);

		return () => {
			clearTimeout(timer);
			resizeObserver.disconnect();
			window.removeEventListener('resize', updatePositions);
		};
	}, [childRefs, updatePositions]);

	const parentDotX = 30;
	const parentDotY = 5;
	const childDotX = 75;

	const maxY = childPositions.length > 0 ? Math.max(...childPositions) : 100;
	const svgHeight = maxY + 30;

	return (
		<svg
			ref={containerRef}
			className="pointer-events-none absolute top-0 left-0 z-0 overflow-visible"
			width={200}
			height={svgHeight}
			viewBox={`0 0 200 ${svgHeight}`}
			preserveAspectRatio="none"
		>
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

			{childPositions.map((childDotY, index) => (
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
					transition={{ duration: 0.2, delay: index * 0.08 }}
				/>
			))}

			<circle cx={parentDotX} cy={parentDotY} r="6" fill="rgb(103,232,249)" />

			{childPositions.map((childDotY, index) => (
				<circle key={index} cx={childDotX} cy={childDotY} r="4" fill="rgb(103,232,249)" />
			))}
		</svg>
	);
}
