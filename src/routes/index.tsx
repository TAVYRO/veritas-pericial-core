import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Cpu, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
	component: SplashScreen,
});

function SplashScreen() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate({ to: "/onboarding" });
		}, 2500);

		const interval = setInterval(() => {
			setProgress((prev) => (prev < 100 ? prev + 2 : 100));
		}, 30);

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
		};
	}, [navigate]);

	return (
		<div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center relative overflow-hidden font-sans">
			{/* Technical Grid Background */}
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
			<div className="absolute inset-0 bg-gradient-to-b from-veritas-electric/5 via-transparent to-veritas-violet/5 opacity-30" />
			
			{/* Animated Background Rings */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.02] rounded-full animate-orbit-ring" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/[0.05] rounded-full animate-orbit-ring [animation-direction:reverse]" />

			<div className="relative z-10 flex flex-col items-center space-y-12">
				{/* Logo Construction */}
				<div className="relative group">
					{/* Glow effect */}
					<div className="absolute inset-0 bg-veritas-electric/20 blur-3xl rounded-full animate-pulse-glow" />
					
					{/* Main Icon Container */}
					<div className="relative w-24 h-24 bg-veritas-graphite border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl transition-transform duration-700 hover:scale-105 overflow-hidden">
						{/* Subtle tech lines */}
						<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						
						<Shield className="w-12 h-12 text-veritas-electric animate-pulse-glow" />
						
						{/* Animated Border Overlay */}
						<div className="absolute inset-0 border border-veritas-electric/20 rounded-[2rem]" />
					</div>

					{/* Orbiting particles */}
					<div className="absolute -top-4 -right-4 w-2 h-2 bg-veritas-violet rounded-full blur-[2px] animate-pulse" />
					<div className="absolute -bottom-2 -left-6 w-1.5 h-1.5 bg-veritas-electric rounded-full blur-[1px] animate-pulse [animation-delay:1s]" />
				</div>

				{/* Brand and Loading State */}
				<div className="text-center space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-black tracking-[0.2em] text-white flex items-center justify-center gap-3">
							VERITAS
							<span className="w-2 h-2 bg-veritas-electric rounded-full animate-pulse" />
						</h1>
						<p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] translate-x-1">
							Forensic Intelligence Core
						</p>
					</div>

					{/* Loading indicator */}
					<div className="space-y-3 pt-4">
						<div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
							<div 
								className="absolute top-0 left-0 h-full bg-gradient-to-r from-veritas-electric to-veritas-violet transition-all duration-300 ease-out"
								style={{ width: `${progress}%` }}
							/>
						</div>
						
						<div className="flex items-center justify-between px-1">
							<div className="flex items-center gap-2">
								<Cpu className="w-3 h-3 text-veritas-electric/40 animate-pulse" />
								<span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
									System Booting
								</span>
							</div>
							<span className="text-[8px] font-bold text-veritas-electric/60 tabular-nums">
								{progress}%
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Labels */}
			<div className="absolute bottom-12 flex items-center gap-8 text-[8px] font-bold text-white/10 uppercase tracking-[0.3em]">
				<span className="flex items-center gap-2">
					<Activity className="w-3 h-3" />
					Encrypted
				</span>
				<span>Standard 2.0.4</span>
				<span>v0.9.2-Beta</span>
			</div>
		</div>
	);
}
