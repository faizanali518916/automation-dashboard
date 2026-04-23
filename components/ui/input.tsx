import * as React from 'react';

import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
	({ className, type = 'text', ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'h-10 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';
