'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { Logo } from '@/components/logo';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
	LucideIcon,
	CodeIcon,
	LayersIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	HelpCircle,
	BarChart,
	PlugIcon,
	Mic,
	Building2,
	PhoneCall,
	ArrowRight,
	Info,
	Newspaper,
	Headphones,
	Sparkles,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const pathname = usePathname();

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent', {
				'bg-background/85 supports-[backdrop-filter]:bg-background/65 border-border/40 backdrop-blur-xl shadow-md shadow-black/5 dark:shadow-black/20':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
				{/* Left: Logo with Hover Scale & Glow */}
				<div className="flex items-center">
					<Link href="/" className="flex items-center gap-2 group transition-all duration-300 hover:scale-[1.04]" aria-label="9278.ai home">
						<Logo height={36} priority className="transition-all duration-300 group-hover:brightness-110" />
					</Link>
				</div>

				{/* Center: Center-aligned Navbar Tags with Ambient Red Hover Glow */}
				<div className="hidden md:flex items-center justify-center flex-1 mx-4">
					<div className="rounded-full border border-border/60 bg-background/60 p-1.5 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-primary/40 hover:bg-background/90 hover:shadow-[0_0_24px_-2px_rgba(220,38,38,0.22)] dark:hover:shadow-[0_0_28px_-2px_rgba(220,38,38,0.35)]">
						<NavigationMenu>
							<NavigationMenuList className="gap-1.5">
								{/* Features Dropdown */}
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent text-base font-semibold rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-accent hover:text-primary hover:scale-[1.04] active:scale-[0.98] data-[state=open]:bg-accent data-[state=open]:text-primary">
										Features
									</NavigationMenuTrigger>
									<NavigationMenuContent className="bg-background/95 backdrop-blur-xl p-2 border-border/50 shadow-2xl rounded-2xl animate-in fade-in-0 zoom-in-95 duration-200">
										<ul className="grid w-[680px] grid-cols-2 gap-3 p-3">
											{productLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<div className="p-3.5 border-t border-border/40 mt-1 bg-muted/40 rounded-b-xl transition-colors hover:bg-muted/60">
											<p className="text-muted-foreground text-xs flex items-center justify-between">
												<span className="flex items-center gap-1.5 font-medium">
													<Sparkles className="size-4 text-primary animate-pulse" />
													Ready to hear human-like AI in action?
												</span>
												<Link href="/get-started" className="text-primary font-semibold hover:underline flex items-center gap-1.5 group/demo transition-all text-xs">
													Schedule a demo <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/demo:translate-x-1" />
												</Link>
											</p>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Industries Dropdown */}
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent text-base font-semibold rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-accent hover:text-primary hover:scale-[1.04] active:scale-[0.98] data-[state=open]:bg-accent data-[state=open]:text-primary">
										Industries
									</NavigationMenuTrigger>
									<NavigationMenuContent className="bg-background/95 backdrop-blur-xl p-2 border-border/50 shadow-2xl rounded-2xl animate-in fade-in-0 zoom-in-95 duration-200">
										<div className="grid w-[660px] grid-cols-2 gap-3 p-3">
											<ul className="space-y-2">
												<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solutions by Sector</div>
												{industryLinks.map((item, i) => (
													<li key={i}>
														<ListItem {...item} />
													</li>
												))}
											</ul>
											<ul className="space-y-1.5 p-2.5 bg-muted/30 rounded-xl border border-border/30">
												<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Use Cases</div>
												{useCaseLinks.map((item, i) => (
													<li key={i}>
														<NavigationMenuLink asChild>
															<Link
																href={item.href}
																className="flex p-2.5 hover:bg-accent/80 rounded-lg items-center gap-x-3 text-sm transition-all duration-200 hover:translate-x-0.5 group/uc"
															>
																<item.icon className="text-primary size-4.5 shrink-0 transition-transform duration-200 group-hover/uc:scale-110" />
																<div className="flex flex-col">
																	<span className="font-semibold text-xs group-hover/uc:text-primary transition-colors">{item.title}</span>
																</div>
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Pricing */}
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link
											href="/pricing"
											className={cn(
												"text-base font-semibold rounded-full px-5 py-2.5 transition-all duration-200 block hover:bg-accent hover:text-primary hover:scale-[1.04] active:scale-[0.98]",
												pathname === "/pricing" && "bg-accent text-primary shadow-xs"
											)}
										>
											Pricing
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>

								{/* Company Dropdown */}
								<NavigationMenuItem>
									<NavigationMenuTrigger className="bg-transparent text-base font-semibold rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-accent hover:text-primary hover:scale-[1.04] active:scale-[0.98] data-[state=open]:bg-accent data-[state=open]:text-primary">
										Company
									</NavigationMenuTrigger>
									<NavigationMenuContent className="bg-background/95 backdrop-blur-xl p-2 border-border/50 shadow-2xl rounded-2xl animate-in fade-in-0 zoom-in-95 duration-200">
										<div className="grid w-[600px] grid-cols-2 gap-3 p-2">
											<ul className="space-y-2">
												<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">About 9278.ai</div>
												{companyMainLinks.map((item, i) => (
													<li key={i}>
														<ListItem {...item} />
													</li>
												))}
											</ul>
											<ul className="space-y-1.5 p-2.5 bg-muted/30 rounded-xl border border-border/30">
												<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Legal & Support</div>
												{companyLegalLinks.map((item, i) => (
													<li key={i}>
														<NavigationMenuLink asChild>
															<Link
																href={item.href}
																className="flex p-2.5 hover:bg-accent/80 rounded-lg items-center gap-x-3 text-xs font-medium transition-all duration-200 hover:translate-x-0.5 group/leg"
															>
																<item.icon className="text-muted-foreground size-4.5 shrink-0 transition-all duration-200 group-hover/leg:text-primary group-hover/leg:scale-110" />
																<span className="group-hover/leg:text-foreground text-xs font-medium transition-colors">{item.title}</span>
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* FAQ */}
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link
											href="/faq"
											className={cn(
												"text-base font-semibold rounded-full px-5 py-2.5 transition-all duration-200 block hover:bg-accent hover:text-primary hover:scale-[1.04] active:scale-[0.98]",
												pathname === "/faq" && "bg-accent text-primary shadow-xs"
											)}
										>
											FAQ
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				{/* Right: Actions with Pulsing Glow on CTA */}
				<div className="hidden items-center gap-3 md:flex">
					<Button variant="ghost" asChild className="h-9 rounded-full px-4 hover:bg-accent hover:text-primary transition-all duration-200 hover:scale-[1.03]">
						<a href="https://voice.9278.ai/" target="_blank" rel="noopener noreferrer">
							Sign In
						</a>
					</Button>
					<Button asChild className="btn-ai h-9 rounded-full px-5 shadow-sm hover:shadow-[0_4px_25px_0_rgba(220,38,38,0.45)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]">
						<Link href="/get-started" className="flex items-center gap-1 group/cta">
							<span>Get Started</span>
							<ArrowRight className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
						</Link>
					</Button>
				</div>

				{/* Mobile Menu Toggle Button */}
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden rounded-full size-9 border-border/60 hover:border-primary/50 hover:bg-accent transition-all duration-200"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			{/* Mobile Drawer */}
			<MobileMenu open={open} className="flex flex-col justify-between gap-4 overflow-y-auto">
				<NavigationMenu className="max-w-full w-full">
					<div className="flex w-full flex-col gap-y-2">
						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-2">Features</span>
						{productLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}

						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-4">Industries</span>
						{industryLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}

						<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 pt-4">Company</span>
						{companyMainLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						{companyLegalLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
					</div>
				</NavigationMenu>

				<div className="flex flex-col gap-2 pt-4 border-t border-border/40">
					<Button variant="outline" asChild className="w-full bg-transparent rounded-full border-border/60 hover:bg-accent">
						<a href="https://voice.9278.ai/" target="_blank" rel="noopener noreferrer">
							Sign In
						</a>
					</Button>
					<Button asChild className="w-full btn-ai rounded-full">
						<Link href="/get-started">
							Get Started
						</Link>
					</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-xl',
				'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-border/40 md:hidden animate-in fade-in-0 duration-200',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4 overflow-y-auto',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink
			className={cn(
				'w-full flex flex-row gap-x-3.5 rounded-xl p-3 transition-all duration-200 group hover:bg-accent/80 hover:shadow-xs border border-transparent hover:border-border/40',
				className
			)}
			{...props}
			asChild
		>
			<Link href={href}>
				<div className="bg-background/80 flex aspect-square size-10 items-center justify-center rounded-xl border border-border/60 shadow-xs shrink-0 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:text-primary transition-all duration-200">
					<Icon className="text-foreground size-5 group-hover:text-primary transition-colors group-hover:rotate-6" />
				</div>
				<div className="flex flex-col items-start justify-center overflow-hidden">
					<span className="font-semibold text-xs text-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200">{title}</span>
					{description && <span className="text-muted-foreground text-xs line-clamp-1 mt-0.5 group-hover:text-foreground/80 transition-colors">{description}</span>}
				</div>
			</Link>
		</NavigationMenuLink>
	);
}

/* Nav Link Data */
const productLinks: LinkItem[] = [
	{
		title: 'AI Voice Receptionist',
		href: '/features',
		description: 'Answer every inbound call 24/7 with zero latency',
		icon: PhoneCall,
	},
	{
		title: 'Sub-second Audio Engine',
		href: '/features',
		description: 'Audio-native engine with human emotion and timing',
		icon: Mic,
	},
	{
		title: 'Smart Interruptions',
		href: '/features',
		description: 'Barge-in detection for realistic voice conversations',
		icon: LayersIcon,
	},
	{
		title: 'Call Analytics',
		href: '/features',
		description: 'Track conversations, sentiments, and call conversions',
		icon: BarChart,
	},
	{
		title: 'SIP & Telephony Integrations',
		href: '/features',
		description: 'Connect directly with Twilio, Plivo, or custom SIP',
		icon: PlugIcon,
	},
	{
		title: 'Voice Agent API',
		href: '/features',
		description: 'Build and embed custom AI voice bots programmatically',
		icon: CodeIcon,
	},
];

const industryLinks: LinkItem[] = [
	{
		title: 'Healthcare & Clinics',
		href: '/industries/healthcare',
		description: 'Patient scheduling & appointment reminders',
		icon: Users,
	},
	{
		title: 'Real Estate & Property',
		href: '/industries/real-estate',
		description: 'Instant lead qualification & property tours',
		icon: Building2,
	},
	{
		title: 'Dental Practices',
		href: '/industries/dental',
		description: 'Recall calls and automated patient intake',
		icon: Star,
	},
];

const useCaseLinks: LinkItem[] = [
	{
		title: 'Inbound Customer Support',
		href: '/features',
		icon: Headphones,
	},
	{
		title: 'Outbound Sales & Qualification',
		href: '/features',
		icon: PhoneCall,
	},
	{
		title: 'Appointment Booking AI',
		href: '/features',
		icon: Sparkles,
	},
];

/* Company Menu Links */
const companyMainLinks: LinkItem[] = [
	{
		title: 'About 9278.ai',
		href: '/about',
		description: 'Our mission to make AI voice sound human',
		icon: Info,
	},
	{
		title: 'Blog & Articles',
		href: '/blog',
		description: 'Voice AI research, guides, and engineering logs',
		icon: Newspaper,
	},
	{
		title: 'Customer Stories',
		href: '/contact',
		description: 'Case studies from high-volume call centers',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '/contact',
		description: 'Collaborate with us for mutual growth',
		icon: Handshake,
	},
];

const companyLegalLinks: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '/terms',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '/privacy',
		icon: Shield,
	},
	{
		title: 'Acceptable Use',
		href: '/acceptable-use',
		icon: RotateCcw,
	},
	{
		title: 'Help & FAQ',
		href: '/faq',
		icon: HelpCircle,
	},
];

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
