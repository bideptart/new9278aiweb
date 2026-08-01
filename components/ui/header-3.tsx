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
	Stethoscope,
	ShoppingBag,
	DollarSign,
	Wrench,
	UtensilsCrossed,
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

	const isFeaturesActive = pathname.startsWith("/features")
	const isIndustriesActive = pathname.startsWith("/industries")
	const isPricingActive = pathname === "/pricing"
	const isCompanyActive = pathname.startsWith("/about") || pathname.startsWith("/contact") || pathname.startsWith("/team") || pathname.startsWith("/blog")
	const isFaqActive = pathname === "/faq"

	return (
		<header className="fixed top-3 inset-x-0 z-50 w-full px-4 sm:px-6 flex justify-center transition-all duration-300 pointer-events-none">
			{/* Unified Floating Glossy Glassmorphism Pill Navbar */}
			<nav
				className={cn(
					'pointer-events-auto mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 rounded-full border border-white/60 dark:border-white/15 bg-gradient-to-b from-white/75 via-white/50 to-white/30 dark:from-white/10 dark:via-white/[0.05] dark:to-white/[0.02] backdrop-blur-2xl backdrop-saturate-200 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.85),0_12px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/40 hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.9),0_16px_40px_-6px_rgba(220,38,38,0.2)]',
					scrolled && 'border-white/80 dark:border-white/20 bg-gradient-to-b from-white/85 via-white/65 to-white/45 dark:from-white/15 dark:to-white/[0.05] shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.95),0_16px_40px_-8px_rgba(0,0,0,0.18)]'
				)}
			>
				{/* Left: Brand Logo */}
				<div className="flex items-center justify-start md:flex-1">
					<Link href="/" className="flex items-center gap-2 group transition-all duration-300 hover:scale-[1.04]" aria-label="9278.ai home">
						<Logo height={34} priority className="transition-all duration-300 group-hover:brightness-110" />
					</Link>
				</div>

				{/* Center: Centered Navbar Navigation Tags */}
				<div className="hidden md:flex items-center justify-center shrink-0">
					<NavigationMenu>
						<NavigationMenuList className="gap-1.5">
							<NavigationMenuItem>
								<NavigationMenuTrigger className={cn(
									"bg-transparent text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-[1.03] active:scale-[0.98] data-[state=open]:bg-rose-500/15 data-[state=open]:text-rose-600 dark:data-[state=open]:text-rose-400 data-[state=open]:font-bold data-[state=open]:border data-[state=open]:border-rose-200 dark:data-[state=open]:border-rose-900/50 data-[state=open]:shadow-xs",
									isFeaturesActive && "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900/50 shadow-xs"
								)}>
									Features
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1 border-0 shadow-none">
									<ul className="grid w-[640px] grid-cols-2 gap-3 p-3">
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
								<NavigationMenuTrigger className={cn(
									"bg-transparent text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-[1.03] active:scale-[0.98] data-[state=open]:bg-rose-500/15 data-[state=open]:text-rose-600 dark:data-[state=open]:text-rose-400 data-[state=open]:font-bold data-[state=open]:border data-[state=open]:border-rose-200 dark:data-[state=open]:border-rose-900/50 data-[state=open]:shadow-xs",
									isIndustriesActive && "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900/50 shadow-xs"
								)}>
									Industries
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1 border-0 shadow-none">
									<div className="grid w-[680px] grid-cols-2 gap-4 p-3">
										<ul className="space-y-2">
											<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Core Industries</div>
											{industryLinks.slice(0, 3).map((item, i) => (
>>>>>>> f41f265 (feat: add unique 3D industry pages (Real Estate, E-Commerce, Finance & Banking, Home Services), soft rose light theme, centered navbar, and universal soft rose button styling)
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2">
											<div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">More Verticals</div>
											{industryLinks.slice(3, 6).map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
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
											"text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 block hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-[1.03] active:scale-[0.98]",
											isPricingActive && "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900/50 shadow-xs"
										)}
									>
										Pricing
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							{/* Company Dropdown */}
							<NavigationMenuItem>
								<NavigationMenuTrigger className={cn(
									"bg-transparent text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-[1.03] active:scale-[0.98] data-[state=open]:bg-rose-500/15 data-[state=open]:text-rose-600 dark:data-[state=open]:text-rose-400 data-[state=open]:font-bold data-[state=open]:border data-[state=open]:border-rose-200 dark:data-[state=open]:border-rose-900/50 data-[state=open]:shadow-xs",
									isCompanyActive && "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900/50 shadow-xs"
								)}>
									Company
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1 border-0 shadow-none">
									<div className="grid w-[640px] grid-cols-2 gap-3 p-3">
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
											"text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200 block hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-[1.03] active:scale-[0.98]",
											isFaqActive && "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900/50 shadow-xs"
										)}
									>
										FAQ
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Right: Actions */}
				<div className="hidden items-center justify-end gap-3 md:flex md:flex-1">
					<Button variant="ghost" asChild className="h-9 rounded-full px-4 hover:bg-accent hover:text-primary transition-all duration-200 hover:scale-[1.03]">
						<a href="https://voice.9278.ai/" target="_blank" rel="noopener noreferrer">
							Sign In
						</a>
					</Button>
					<Button asChild className="btn-ai h-9 rounded-full px-5 shadow-sm hover:shadow-[0_4px_25px_0_rgba(243,90,90,0.45)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]">
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
					className="lg:hidden rounded-full size-9 border-border/60 hover:border-primary/50 hover:bg-accent transition-all duration-200"
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
				'fixed top-20 right-4 left-4 z-40 flex flex-col overflow-hidden border border-border/50 rounded-2xl shadow-2xl md:hidden animate-in fade-in-0 duration-200',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4 max-h-[80vh] overflow-y-auto',
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
		title: 'Real Estate & Property',
		href: '/industries/real-estate',
		description: 'Instant lead qualification & site tour booking',
		icon: Building2,
	},
	{
		title: 'Healthcare & Dental Clinics',
		href: '/industries/healthcare',
		description: 'Patient scheduling, triage & appointment reminders',
		icon: Stethoscope,
	},
	{
		title: 'Retail & E-commerce',
		href: '/industries/ecommerce',
		description: 'Order tracking, returns & 24/7 shopper support',
		icon: ShoppingBag,
	},
	{
		title: 'Finance & Banking',
		href: '/industries/finance',
		description: 'Loan pre-screening, payment capture & collection calls',
		icon: DollarSign,
	},
	{
		title: 'Home Services',
		href: '/industries/home-services',
		description: 'After-hours dispatch & HVAC/Plumbing scheduling',
		icon: Wrench,
	},
	{
		title: 'Restaurants & Hospitality',
		href: '/industries/restaurants',
		description: 'Reservations, party confirmations & catering intake',
		icon: UtensilsCrossed,
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
