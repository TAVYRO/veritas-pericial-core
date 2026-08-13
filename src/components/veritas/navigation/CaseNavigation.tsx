import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { CASE_NAVIGATION_GROUPS, type NavGroup } from "./case-navigation-config";

interface CaseNavigationProps {
	caseId: string;
}

export function CaseNavigation({ caseId }: CaseNavigationProps) {
	const location = useLocation();
	const path = location.pathname;

	const caseBaseUrl = `/app/cases/${caseId}`;
	const relativePath = path.replace(caseBaseUrl, "").replace(/^\//, "");

	let foundGroup: NavGroup | undefined = undefined;
	let foundStepId = "";

	for (const group of CASE_NAVIGATION_GROUPS) {
		const exactMatch = group.steps.find((s) => s.path === relativePath);
		if (exactMatch) {
			foundGroup = group;
			foundStepId = exactMatch.id;
			break;
		}

		const prefixMatch = group.steps.find(
			(s) => s.matchPrefix && relativePath.startsWith(s.matchPrefix),
		);
		if (prefixMatch) {
			foundGroup = group;
			foundStepId = prefixMatch.id;
			break;
		}

		const startsWithMatch = group.steps.find(
			(s) => relativePath.startsWith(s.path) && s.path !== "",
		);
		if (startsWithMatch) {
			foundGroup = group;
			foundStepId = startsWithMatch.id;
			break;
		}
	}

	const activeGroup: NavGroup = (foundGroup || CASE_NAVIGATION_GROUPS[0]) as NavGroup;
	const activeStepId: string = foundStepId || (activeGroup.steps[0] ? activeGroup.steps[0].id : "");

	return (
		<div className="bg-[#0A0D14] border-b border-white/5">
			<div className="grid grid-cols-4 px-2 border-b border-white/5">
				{CASE_NAVIGATION_GROUPS.map((group) => {
					const isActive = activeGroup.id === group.id;
					const targetRoute = `/app/cases/${caseId}/${group.defaultPath}`;
					return (
						<Link
							key={group.id}
							to={targetRoute as any}
							className={cn(
								"flex flex-col items-center py-3 px-1 gap-1 transition-all duration-300 relative outline-none",
								isActive ? "text-veritas-electric" : "text-white/20 hover:text-white/40",
							)}
							aria-current={isActive ? "page" : undefined}
						>
							<span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-black text-center leading-tight text-white">
								{group.label}
							</span>
							{isActive && (
								<div className="absolute -bottom-px w-full h-0.5 bg-veritas-electric rounded-full shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
							)}
						</Link>
					);
				})}
			</div>

			<div className="overflow-x-auto no-scrollbar">
				<div className="flex px-6 py-3 gap-6 min-w-max items-center">
					{activeGroup.steps.map((step) => {
						const isActive = activeStepId === step.id;
						const Icon = step.icon;
						const targetRoute = `/app/cases/${caseId}/${step.path}`;

						return (
							<button
								key={step.id}
								type="button"
								onClick={() => navigate({ to: targetRoute as any })}
								className={cn(
									"flex items-center gap-2 transition-all duration-300 px-2 py-1 rounded-full whitespace-nowrap outline-none",
									isActive ? "text-veritas-electric bg-veritas-electric/5" : "text-white/30 hover:text-white/50",
								)}
								aria-current={isActive ? "step" : undefined}
							>
								<Icon className={cn("w-3.5 h-3.5", isActive && "animate-pulse-glow")} />
								<span className="text-[9px] uppercase tracking-widest font-bold">
									{step.label}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
