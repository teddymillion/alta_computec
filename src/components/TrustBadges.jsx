import { ShieldCheck, Award, Users, Star, CheckCircle2 } from 'lucide-react';

const BADGES = [
  { icon: ShieldCheck, label: 'ISO 9001 Certified', color: 'icon-wrap-blue' },
  { icon: Award,       label: 'Dell Platinum Partner', color: 'icon-wrap-amber' },
  { icon: Users,       label: '470+ Enterprise Clients', color: 'icon-wrap-green' },
  { icon: Star,        label: '30+ Years Experience', color: 'icon-wrap-indigo' },
  { icon: CheckCircle2,label: 'Govt. Registered Supplier', color: 'icon-wrap-sky' },
];

export default function TrustBadges() {
  return (
    <section className="py-10 bg-white dark:bg-navy-950 border-y border-slate-100 dark:border-white/6" aria-label="Trust credentials">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {BADGES.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2.5 group">
              <div className={`icon-wrap ${color} w-9 h-9`}>
                <Icon size={15} aria-hidden="true" />
              </div>
              <span className="text-[13px] font-semibold text-navy-900 dark:text-slate-200 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
