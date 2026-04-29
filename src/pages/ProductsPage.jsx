import { useState, useCallback } from 'react';
import {
  Award, ArrowRight, Download, CheckCircle, ChevronRight, ChevronDown,
  Package, Monitor, Server, Zap, CreditCard, Video, Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import PartnerLogo from '../components/PartnerLogo';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { validateFields, errCls } from '../hooks/useFormValidation';

// ─── Icon map (category icon strings → Lucide components) ─────────────────
const ICON_MAP = { Monitor, Server, Zap, CreditCard, Video, Layers, Package };

// ─── Tier partner data (unchanged from original) ───────────────────────────
const TIER1 = [
  { name: 'Dell',      tier: 'Platinum Partner', badge: 'tier-platinum', note: "Ethiopia's Only", glow: 'rgba(37,99,235,0.15)',  accent: '#2563EB', desc: "Highest tier in Dell's global partner program — exclusive to ALTA in Ethiopia." },
  { name: 'Cisco',     tier: 'Premier Partner',  badge: 'tier-premier',  note: 'Certified',      glow: 'rgba(2,132,199,0.15)',   accent: '#0284C7', desc: 'Enterprise networking, SD-WAN, and security solutions.' },
  { name: 'Oracle',    tier: 'Gold Partner',     badge: 'tier-gold',     note: 'Certified',      glow: 'rgba(220,38,38,0.12)',   accent: '#DC2626', desc: 'ERP, HCM, analytics, and database solutions.' },
  { name: 'Kaspersky', tier: 'Platinum Partner', badge: 'tier-platinum', note: 'Certified',      glow: 'rgba(22,163,74,0.15)',   accent: '#16A34A', desc: 'Enterprise endpoint security and threat intelligence.' },
];
const TIER2 = [
  { name: 'IBM'             },
  { name: 'Microsoft'       },
  { name: 'HP'              },
  { name: 'Huawei'          },
  { name: 'Fortinet'        },
  { name: 'Lenovo'          },
  { name: 'Eaton'           },
  { name: 'Vertiv'          },
  { name: 'SHARP',            exclusive: true },
  { name: 'Diebold Nixdorf' },
  { name: 'Jabra'           },
  { name: 'Poly'            },
  { name: 'Epson'           },
  { name: 'Backbase'        },
  { name: 'Symantec'        },
];

// ─────────────────────────────────────────────────────────────────────────────
// Configurator form definitions
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_FIELDS = [
  { type: 'text',  id: 'firstName', label: 'First Name',     placeholder: 'Tadesse',            half: true, required: true },
  { type: 'text',  id: 'lastName',  label: 'Last Name',      placeholder: 'Bekele',             half: true, required: true },
  { type: 'email', id: 'email',     label: 'Email Address',  placeholder: 'tadesse@org.com',    half: true, required: true },
  { type: 'tel',   id: 'phone',     label: 'Phone Number',   placeholder: '+251 911 000 000',   half: true },
];

const FORM_CONFIGS = {
  Desktop: {
    icon: Monitor,
    title: 'Build Your Ideal Business Workstation',
    copy: 'Configure desktops tailored to your exact performance and budget requirements. Choose brand, processor, RAM, storage, and more.',
    sections: [
      {
        label: 'Hardware Specifications',
        fields: [
          { type: 'select', id: 'brand',      label: 'Brand',           half: true, options: ['Dell','HP','Lenovo','Apple','Asus','Other'] },
          { type: 'select', id: 'processor',  label: 'Processor',       half: true, options: ['Intel i3','Intel i5','Intel i7','Intel i9','AMD Ryzen 3','AMD Ryzen 5','AMD Ryzen 7','AMD Ryzen 9'] },
          { type: 'select', id: 'ram',        label: 'RAM',             half: true, options: ['4GB','8GB','16GB','32GB','64GB'] },
          { type: 'select', id: 'storageType',label: 'Storage Type',    half: true, options: ['HDD','SSD','NVMe'] },
          { type: 'select', id: 'storageSize',label: 'Storage Size',    half: true, options: ['256GB','512GB','1TB','2TB'] },
          { type: 'select', id: 'os',         label: 'Operating System',half: true, options: ['Windows 10','Windows 11','Linux','macOS'] },
          { type: 'select', id: 'graphics',   label: 'Graphics Card',   half: true, options: ['Integrated','NVIDIA','AMD','Intel ARC'] },
          { type: 'radio',  id: 'monitor',    label: 'Monitor Included',half: true, options: ['Yes','No'] },
        ],
      },
      {
        label: 'Accessories & Quantity',
        fields: [
          { type: 'checkboxes', id: 'accessories', label: 'Accessories', options: ['Bag','Mouse','Dock','Charger'] },
          { type: 'number',     id: 'quantity',     label: 'Quantity',   half: true },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },

  Laptop: {
    icon: Monitor,
    title: 'Tailor Your Ideal Business Laptop',
    copy: 'Select brand, processor, RAM, storage, screen size, and accessories. Our team will respond with the best options for your fleet.',
    sections: [
      {
        label: 'Hardware Specifications',
        fields: [
          { type: 'select', id: 'brand',       label: 'Brand',              half: true, options: ['Dell','HP','Lenovo','Apple','Asus','Other'] },
          { type: 'select', id: 'processor',   label: 'Processor',          half: true, options: ['Intel i3','Intel i5','Intel i7','Intel i9','AMD Ryzen 3','AMD Ryzen 5','AMD Ryzen 7','AMD Ryzen 9'] },
          { type: 'select', id: 'ram',         label: 'RAM',                half: true, options: ['4GB','8GB','16GB','32GB','64GB'] },
          { type: 'select', id: 'storageType', label: 'Storage Type',       half: true, options: ['HDD','SSD','NVMe'] },
          { type: 'select', id: 'storageSize', label: 'Storage Size',       half: true, options: ['256GB','512GB','1TB','2TB'] },
          { type: 'select', id: 'screenSize',  label: 'Screen Size',        half: true, options: ['12"','13.3"','14"','15.6"','17"'] },
          { type: 'select', id: 'os',          label: 'Operating System',   half: true, options: ['Windows 10','Windows 11','Linux','macOS'] },
          { type: 'select', id: 'graphics',    label: 'Graphics Card',      half: true, options: ['Integrated','NVIDIA','AMD','Intel ARC'] },
          { type: 'text',   id: 'battery',     label: 'Battery Life Need',  half: true, placeholder: 'e.g. 8+ hours' },
        ],
      },
      {
        label: 'Accessories & Quantity',
        fields: [
          { type: 'checkboxes', id: 'accessories', label: 'Accessories', options: ['Bag','Mouse','Dock','Charger'] },
          { type: 'number',     id: 'quantity',     label: 'Quantity',   half: true },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },

  Server: {
    icon: Server,
    title: 'Power Your Infrastructure with Precision',
    copy: 'Configure enterprise servers from Dell EMC, HPe, and IBM. Specify type, CPU, RAM, storage, RAID, and virtualisation needs.',
    sections: [
      {
        label: 'Server Specifications',
        fields: [
          { type: 'select', id: 'serverType',   label: 'Server Type',           half: true, options: ['Tower','Rack','Blade'] },
          { type: 'select', id: 'cpu',          label: 'CPU Model',             half: true, options: ['Intel Xeon Silver','Intel Xeon Gold','Intel Xeon Platinum','AMD EPYC 7002','AMD EPYC 9004'] },
          { type: 'select', id: 'ram',          label: 'RAM Capacity',          half: true, options: ['16GB','32GB','64GB','128GB','256GB','512GB','1TB+'] },
          { type: 'select', id: 'storageType',  label: 'Storage Type',          half: true, options: ['HDD','SSD','NVMe','SAS'] },
          { type: 'select', id: 'storageSize',  label: 'Storage Size',          half: true, options: ['1TB','2TB','4TB','8TB','16TB','32TB+'] },
          { type: 'select', id: 'raid',         label: 'RAID Configuration',    half: true, options: ['RAID 0','RAID 1','RAID 5','RAID 6','RAID 10','None'] },
          { type: 'select', id: 'os',           label: 'Operating System',      half: true, options: ['Windows Server 2022','Red Hat Linux','Ubuntu Server','VMware ESXi','None'] },
          { type: 'select', id: 'virt',         label: 'Virtualisation',        half: true, options: ['Yes','No'] },
          { type: 'select', id: 'nic',          label: 'Network Interface',     half: true, options: ['1GbE','10GbE','25GbE','InfiniBand'] },
          { type: 'select', id: 'vendor',       label: 'Preferred Vendor',      half: true, options: ['Dell EMC','HPe','IBM','No preference'] },
          { type: 'number', id: 'quantity',     label: 'Quantity',              half: true },
        ],
      },
      {
        label: 'Additional Details',
        fields: [
          { type: 'textarea', id: 'notes', label: 'Additional Requirements', placeholder: 'Any special requirements, rack constraints, power limits…', rows: 3 },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },

  ATM: {
    icon: CreditCard,
    title: 'Secure, Reliable, and Customer-Focused Banking',
    copy: 'Configure ATM solutions from Diebold Nixdorf, NCR, and GRG Banking. Specify type, modules, authentication, and deployment needs.',
    sections: [
      {
        label: 'ATM Specifications',
        fields: [
          { type: 'select', id: 'atmType',    label: 'ATM Type',               half: true, options: ['Stand-alone','Wall-mounted','Through-the-wall'] },
          { type: 'select', id: 'cash',       label: 'Cash Dispensing',        half: true, options: ['Single','Dual','Recycler'] },
          { type: 'select', id: 'card',       label: 'Card Reader',            half: true, options: ['Chip','Magstripe','NFC/Contactless','All three'] },
          { type: 'radio',  id: 'receipt',    label: 'Receipt Printer',        half: true, options: ['Yes','No'] },
          { type: 'select', id: 'screen',     label: 'Screen Size',            half: true, options: ['7"','10"','15"','17"+'] },
          { type: 'radio',  id: 'biometric',  label: 'Biometric Auth',         half: true, options: ['Yes','No'] },
          { type: 'select', id: 'conn',       label: 'Connectivity',           half: true, options: ['Ethernet','4G/LTE','Both'] },
          { type: 'select', id: 'vendor',     label: 'Preferred Brand',        half: true, options: ['Diebold Nixdorf','NCR','GRG Banking','No preference'] },
          { type: 'number', id: 'quantity',   label: 'Quantity',               half: true },
          { type: 'text',   id: 'institution',label: 'Institution Name',       placeholder: 'Commercial Bank of Ethiopia' },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },

  'Smart Screen': {
    icon: Video,
    title: 'Engage, Present, and Collaborate Smarter',
    copy: 'Configure smart screens from Samsung, LG, BenQ, and ViewSonic. Choose screen type, size, resolution, touch capability, and connectivity.',
    sections: [
      {
        label: 'Display Specifications',
        fields: [
          { type: 'select', id: 'screenType', label: 'Screen Type',      half: true, options: ['Interactive','Kiosk','Digital Signage'] },
          { type: 'select', id: 'size',       label: 'Screen Size (in)', half: true, options: ['43"','55"','65"','75"','85"','98"+'] },
          { type: 'select', id: 'resolution', label: 'Resolution',       half: true, options: ['HD','FHD','4K','8K'] },
          { type: 'select', id: 'touch',      label: 'Touch Support',    half: true, options: ['Yes — 10 point','Yes — 20 point','No'] },
          { type: 'select', id: 'os',         label: 'Operating System', half: true, options: ['Android','Windows','Chrome OS','None'] },
          { type: 'select', id: 'conn',       label: 'Connectivity',     half: true, options: ['HDMI','Wi-Fi','USB-C','All'] },
          { type: 'select', id: 'vendor',     label: 'Preferred Brand',  half: true, options: ['Samsung','LG','BenQ','ViewSonic','No preference'] },
          { type: 'number', id: 'quantity',   label: 'Quantity',         half: true },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },

  'Datacenter Solution': {
    icon: Layers,
    title: 'Scalable, Secure, and Future-Ready Infrastructure',
    copy: `End-to-end data center design and deployment using Dell, Cisco, VMware, and Fortinet. Define your scope and we'll engineer the solution.`,
    sections: [
      {
        label: 'Project Overview',
        fields: [
          { type: 'select', id: 'projectType', label: 'Project Type',          half: true, options: ['New Build','Upgrade Existing','Colocation','Cloud Migration'] },
          { type: 'select', id: 'racks',       label: 'Rack Count',            half: true, options: ['1–5','6–20','21–50','50+'] },
          { type: 'select', id: 'power',       label: 'Power Requirement',     half: true, options: ['Up to 10kW','10–50kW','50–200kW','200kW+'] },
          { type: 'select', id: 'cooling',     label: 'Cooling System',        half: true, options: ['Air Cooling','In-Row Cooling','Liquid Cooling'] },
          { type: 'select', id: 'networking',  label: 'Networking Tier',       half: true, options: ['Basic LAN','Redundant Core','Spine-Leaf Architecture'] },
          { type: 'select', id: 'storage',     label: 'Storage Architecture',  half: true, options: ['DAS','SAN','NAS','Hyperconverged'] },
          { type: 'radio',  id: 'firewall',    label: 'Firewall Required',     half: true, options: ['Yes','No'] },
          { type: 'radio',  id: 'monitoring',  label: 'Monitoring & Mgmt',     half: true, options: ['Yes','No'] },
          { type: 'select', id: 'timeline',    label: 'Implementation Timeline', half: true, options: ['1–3 months','3–6 months','6–12 months','12+'] },
        ],
      },
      {
        label: 'Vendor Preferences',
        fields: [
          { type: 'checkboxes', id: 'vendors', label: 'Preferred Vendors', options: ['Dell','Cisco','VMware','Fortinet','No preference'] },
        ],
      },
      {
        label: 'Organisation Details',
        fields: [
          { type: 'text',     id: 'org',   label: 'Organisation Name', placeholder: 'e.g. Commercial Bank of Ethiopia' },
          { type: 'textarea', id: 'brief', label: 'Project Brief',     placeholder: 'Describe your data center requirements, constraints, and objectives…', rows: 3 },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  },
};

// Generic form factory for all other subcategories
function getGenericConfig(subcategory) {
  return {
    icon: Package,
    title: `Request ${subcategory} Configuration`,
    copy: 'Specify your exact requirements and our technical team will respond with tailored product options, pricing, and availability.',
    sections: [
      {
        label: 'Requirements',
        fields: [
          { type: 'text',     id: 'brand',    label: 'Preferred Brand',   placeholder: 'e.g. Dell, HP, Cisco…' },
          { type: 'number',   id: 'quantity', label: 'Quantity Required', half: true },
          { type: 'textarea', id: 'keyReqs',  label: 'Key Requirements',  placeholder: 'Describe your specific technical requirements…', rows: 3 },
          { type: 'select',   id: 'budget',   label: 'Budget Range',      options: ['Under $5,000','$5,000–$20,000','$20,000–$100,000','$100,000+','Prefer not to say'] },
          { type: 'select',   id: 'timeline', label: 'Timeline',          half: true, options: ['Immediate','1–3 months','3–6 months','6+ months'] },
        ],
      },
      { label: 'Contact Information', fields: CONTACT_FIELDS },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Field renderer component
// ─────────────────────────────────────────────────────────────────────────────
function Field({ field, formData, onChange, errors }) {
  const val  = formData[field.id] ?? '';
  const err  = errors[field.id];
  const wrap = field.half ? '' : 'sm:col-span-2';
  const inputCls = `form-input${err ? ' !border-red-400 focus:!ring-red-400/30' : ''}`;

  if (field.type === 'select') {
    return (
      <div className={wrap}>
        <label className="form-label">{field.label}{field.required && ' *'}</label>
        <div className="relative">
          <select
            className={inputCls + ' appearance-none pr-9 cursor-pointer'}
            value={val}
            onChange={e => onChange(field.id, e.target.value)}
          >
            <option value="">— Select —</option>
            {field.options.map(o => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        {err && <p className="text-red-500 text-[11px] mt-1">This field is required</p>}
      </div>
    );
  }

  if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
    const isEmail = field.type === 'email';
    const errMsg  = err
      ? (isEmail && val ? 'Enter a valid email address' : 'This field is required')
      : null;
    return (
      <div className={wrap}>
        <label className="form-label">{field.label}{field.required && ' *'}</label>
        <input
          type={field.type}
          className={inputCls}
          value={val}
          placeholder={field.placeholder || ''}
          onChange={e => onChange(field.id, e.target.value)}
        />
        {errMsg && <p className="text-red-500 text-[11px] mt-1">{errMsg}</p>}
      </div>
    );
  }

  if (field.type === 'number') {
    const num = parseInt(val) || 1;
    return (
      <div className={wrap}>
        <label className="form-label">{field.label}{field.required && ' *'}</label>
        <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }}>
          <button type="button" className="px-3 py-3 text-slate-500 hover:bg-slate-50 transition-colors text-lg font-medium" onClick={() => onChange(field.id, Math.max(1, num - 1))}>−</button>
          <input
            type="number"
            min={1}
            className="flex-1 text-center text-sm font-semibold text-navy-900 py-3 border-none outline-none bg-white"
            value={num}
            onChange={e => onChange(field.id, Math.max(1, parseInt(e.target.value) || 1))}
          />
          <button type="button" className="px-3 py-3 text-slate-500 hover:bg-slate-50 transition-colors text-lg font-medium" onClick={() => onChange(field.id, num + 1)}>+</button>
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="sm:col-span-2">
        <label className="form-label">{field.label}</label>
        <textarea
          className={inputCls + ' resize-none'}
          rows={field.rows || 3}
          value={val}
          placeholder={field.placeholder || ''}
          onChange={e => onChange(field.id, e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'checkboxes') {
    return (
      <div className="sm:col-span-2">
        <label className="form-label">{field.label}</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {field.options.map(opt => {
            const checked = Array.isArray(formData[field.id]) && formData[field.id].includes(opt);
            return (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-alta-green focus:ring-alta-green accent-green-600"
                  checked={checked}
                  onChange={e => {
                    const prev = Array.isArray(formData[field.id]) ? formData[field.id] : [];
                    onChange(field.id, e.target.checked ? [...prev, opt] : prev.filter(x => x !== opt));
                  }}
                />
                <span className="text-[13px] text-slate-700">{opt}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === 'radio') {
    return (
      <div className={wrap}>
        <label className="form-label">{field.label}</label>
        <div className="flex gap-5 mt-2">
          {field.options.map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.id}
                value={opt}
                className="accent-green-600"
                checked={val === opt}
                onChange={() => onChange(field.id, opt)}
              />
              <span className="text-[13px] text-slate-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ConfiguratorForm component
// ─────────────────────────────────────────────────────────────────────────────
function ConfiguratorForm({ subcategory, accent }) {
  const [formData, setFormData] = useState({});
  const [errors,   setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [fe, setFe] = useState({});

  // Reset form when subcategory changes
  const key = subcategory; // we also use it as a key on the outer div

  const handleChange = useCallback((id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev  => ({ ...prev, [id]: false }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = FORM_CONFIGS[subcategory] || getGenericConfig(subcategory);
    const newErrors = {};
    config.sections.forEach(s => s.fields.forEach(f => {
      if (f.required && !formData[f.id]) newErrors[f.id] = true;
    }));
    // email format check
    const emailVal = formData.email || '';
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailVal && !EMAIL_RE.test(emailVal)) newErrors.email = true;
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subcategory,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || '',
          specs: formData,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-light p-8 mb-8 text-center" style={{ borderLeft: `4px solid ${accent}` }}>
        <CheckCircle size={48} className="mx-auto mb-4 text-alta-green" />
        <h3 className="text-[20px] font-black text-navy-900 mb-2">Configuration Received!</h3>
        <p className="text-slate-500 text-[14px] max-w-md mx-auto leading-relaxed">
          Our technical team will review your requirements and respond with tailored options within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({}); setErrors({}); }}
          className="btn-outline mt-6 !text-[13px]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  const config = FORM_CONFIGS[subcategory] || getGenericConfig(subcategory);
  const FormIcon = config.icon || Package;

  return (
    <div key={key} className="card-light p-8 mb-8" style={{ borderLeft: `4px solid ${accent}` }}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18` }}>
          <FormIcon size={22} style={{ color: accent }} />
        </div>
        <div>
          <h2 className="text-[18px] font-black text-navy-900 leading-snug">{config.title}</h2>
          <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{config.copy}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {config.sections.map((section, si) => (
          <div key={si}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 mb-4 mt-6 first:mt-0">
              {section.label}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.fields.map(field => (
                <Field
                  key={field.id}
                  field={field}
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Submit area */}
        <div className="bg-slate-50 rounded-xl p-5 mt-7">
          {apiError && <p className="text-red-500 text-[13px] mb-3">{apiError}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-[14px] py-3.5">
            {loading ? 'Sending...' : 'Submit Configuration Request'} <ArrowRight size={15} />
          </button>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
            {['Our team responds within 24 hours', 'Free consultation included', 'No commitment required'].map(r => (
              <span key={r} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <CheckCircle size={12} className="text-alta-green flex-shrink-0" />{r}
              </span>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ activeSub, onSelectSub }) {
  const [expandedCats, setExpandedCats] = useState(['CLIENT PRODUCTS']);
  const [openSolutionGroup, setOpenSolutionGroup] = useState('Infrastructure');

  const toggleCat = (name) => {
    setExpandedCats(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 lg:sticky lg:top-24 self-start">
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 pt-4 pb-3">
          Browse by Category
        </p>

        {CATEGORIES.map((cat) => {
          const isExpanded = expandedCats.includes(cat.name);
          const CatIcon    = ICON_MAP[cat.icon] || Package;
          const isActive   = activeSub && (
            Array.isArray(cat.subs)
              ? cat.subs.some(s => typeof s === 'string' ? s === activeSub : s.children?.includes(activeSub))
              : false
          );
          const subsCount = Array.isArray(cat.subs)
            ? cat.subs.reduce((n, s) => n + (typeof s === 'string' ? 1 : s.children.length), 0)
            : 0;

          return (
            <div key={cat.name} className="border-t border-slate-100 first:border-t-0">
              {/* Category header */}
              <button
                onClick={() => toggleCat(cat.name)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors duration-150 hover:bg-slate-50 focus:outline-none ${isActive ? 'border-l-2 border-alta-green' : 'border-l-2 border-transparent'}`}
                style={isActive ? { color: cat.accent } : {}}
              >
                <CatIcon size={14} className="flex-shrink-0" style={{ color: cat.accent }} />
                <span className={`text-[11.5px] font-bold uppercase tracking-wide flex-1 ${isActive ? '' : 'text-slate-600'}`}>
                  {cat.name}
                </span>
                <span className="ml-auto text-[10px] bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 mr-1">{subsCount}</span>
                {isExpanded
                  ? <ChevronDown size={12} className="text-slate-400 flex-shrink-0" />
                  : <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
                }
              </button>

              {/* Sub-items */}
              {isExpanded && (
                <div className="pb-2">
                  {cat.subs.map(sub => {
                    // Solutions 3rd-level group
                    if (typeof sub === 'object' && sub.children) {
                      const groupOpen = openSolutionGroup === sub.name;
                      return (
                        <div key={sub.name}>
                          <button
                            onClick={() => setOpenSolutionGroup(groupOpen ? null : sub.name)}
                            className="w-full flex items-center gap-2 px-5 py-2 text-left hover:bg-slate-50 transition-colors"
                          >
                            {groupOpen
                              ? <ChevronDown size={11} className="text-slate-400 flex-shrink-0" />
                              : <ChevronRight size={11} className="text-slate-400 flex-shrink-0" />
                            }
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{sub.name}</span>
                          </button>
                          {groupOpen && sub.children.map(child => (
                            <button
                              key={child}
                              onClick={() => onSelectSub(child, cat)}
                              className={`w-full flex items-center px-8 py-2 text-left text-[12.5px] transition-colors duration-150 rounded-lg mx-1 ${activeSub === child ? 'bg-blue-50 text-alta-blue font-semibold' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'}`}
                            >
                              {child}
                            </button>
                          ))}
                        </div>
                      );
                    }

                    // Flat sub item
                    return (
                      <button
                        key={sub}
                        onClick={() => onSelectSub(sub, cat)}
                        className={`w-full flex items-center px-6 py-2 text-left text-[12.5px] transition-colors duration-150 ${activeSub === sub ? 'bg-blue-50 text-alta-blue font-semibold' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'}`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductsPage
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [activeSub,  setActiveSub]  = useState(null);
  const [activeCat,  setActiveCat]  = useState(null);
  const [rfqLoading, setRfqLoading] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqError,   setRfqError]   = useState('');
  const [rfqFe,      setRfqFe]      = useState({});

  async function handleRfqSubmit(e) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));
    const errs = validateFields({ fullName: body.fullName, email: body.email, organisation: body.organisation });
    if (Object.keys(errs).length) { setRfqFe(errs); return; }
    setRfqFe({});
    setRfqLoading(true);
    setRfqError('');
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setRfqSuccess(true);
    } catch (err) {
      setRfqError(err.message);
    } finally {
      setRfqLoading(false);
    }
  }

  const handleSelectSub = (sub, cat) => {
    setActiveSub(sub);
    setActiveCat(cat);
  };

  const subProducts = activeSub
    ? PRODUCTS.filter(p => p.subcategory === activeSub)
    : [];

  const accent = activeCat?.accent || '#1B4FD8';

  return (
    <PageLayout>
      <PageHero
        breadcrumb="Products"
        title="Enterprise Hardware & Software from the World's Leading Brands"
        subtitle="As Ethiopia's only Dell Platinum Partner and authorized reseller for 15+ global brands, ALTA delivers certified, warranty-backed products with local support."
      />

      {/* ── Dell Platinum Banner ────────────────────────────────────────────── */}
      <section
        className="py-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(to right, #431407, #7c2d12, #92400e)' }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          aria-hidden="true"
        />
        <div className="section-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Award size={28} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-amber-200 text-[11px] font-bold tracking-widest uppercase mb-1">Exclusive Designation</p>
                <h2 className="text-white font-black text-[22px] leading-tight">Ethiopia's ONLY Dell Platinum Partner</h2>
                <p className="text-amber-200/80 text-[13px] mt-1 max-w-lg">The highest tier in Dell's global partner program — meaning priority pricing, factory-certified engineers, and direct Dell engineering support for every project.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              {['Priority Pricing', 'Factory-Certified Engineers', 'Direct Dell Support'].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-[12px]">{b}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Gold shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)' }} aria-hidden="true" />
      </section>

      {/* ── Brand Partner Grid ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Our Authorized Portfolio</p>
            <h2 className="section-heading">15+ Global Technology Brands</h2>
          </div>

          {/* Tier 1 */}
          <div className="mb-10">
            <div className="divider-label mb-7">
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">Platinum & Premier Partners</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TIER1.map((p) => (
                <div
                  key={p.name}
                  className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 transition-all duration-250 hover:-translate-y-1 cursor-default overflow-hidden"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${p.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: p.accent }} aria-hidden="true" />
                  <div className="w-full h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-250 px-4">
                    <PartnerLogo name={p.name} size={72} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="font-bold text-navy-900 text-[14px]">{p.name}</span>
                    <span className={`tier-badge ${p.badge}`}>{p.tier}</span>
                    {p.note && <span className="text-[10px] text-slate-400 font-medium">{p.note}</span>}
                    <p className="text-[11px] text-slate-500 leading-relaxed text-center">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div>
            <div className="divider-label mb-6">
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">Authorized Partners</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
              {TIER2.map((p) => (
                <div key={p.name} className="group flex flex-col items-center gap-3 p-5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-default">
                  <div className="w-full h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 px-2">
                    <PartnerLogo name={p.name} size={56} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-600 text-center leading-tight">{p.name}</span>
                  {p.exclusive && <span className="text-[9px] font-bold text-amber-600">Exclusive</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sidebar + Configurator + Products ─────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">Product Catalogue</p>
            <h2 className="section-heading">Browse Our Product Range</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar */}
            <Sidebar activeSub={activeSub} onSelectSub={handleSelectSub} />

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {!activeSub ? (
                /* Overview state — prompt user to select */
                <div className="card-light p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(27,79,216,0.08)', border: '1px solid rgba(27,79,216,0.15)' }}>
                    <Package size={28} className="text-alta-blue" />
                  </div>
                  <h3 className="text-[18px] font-bold text-navy-900 mb-2">Select a Category</h3>
                  <p className="text-slate-500 text-[14px] max-w-sm mx-auto">
                    Choose any subcategory from the sidebar to configure your requirements. Our team will respond with tailored options within 24 hours.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {['Server', 'Laptop', 'ATM', 'Smart Screen', 'UPS', 'Software'].map(s => {
                      const cat = CATEGORIES.find(c => Array.isArray(c.subs) && c.subs.includes(s));
                      return (
                        <button
                          key={s}
                          onClick={() => cat && handleSelectSub(s, cat)}
                          className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[12px] font-semibold hover:border-alta-blue hover:text-alta-blue transition-colors"
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  {/* Configurator form */}
                  <ConfiguratorForm key={activeSub} subcategory={activeSub} accent={accent} />

                  {/* Reference divider */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium px-3 whitespace-nowrap">
                      Popular Configurations for Reference
                    </span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  {/* Reference product cards */}
                  {subProducts.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                      <Package size={48} className="mx-auto mb-4 opacity-40" />
                      <p className="font-medium text-slate-600">Configure your {activeSub} requirements above</p>
                      <p className="text-sm mt-1">Our team will respond with tailored options within 24 hours.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {subProducts.map((product) => (
                        <div key={`${product.name}-${product.subcategory}`} className="group card-light flex flex-col overflow-hidden p-0">
                          {/* Example badge + image */}
                          <div className="relative h-44 overflow-hidden flex-shrink-0">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" aria-hidden="true" />
                            <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                              Example
                            </span>
                            <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-white/90 bg-navy-900/60 backdrop-blur-sm rounded-full px-2 py-0.5">
                              {product.brand}
                            </span>
                          </div>
                          {/* Content */}
                          <div className="flex flex-col gap-3 p-5 flex-1">
                            <h3 className="font-bold text-navy-900 text-[13.5px] leading-snug">{product.name}</h3>
                            <ul className="flex flex-col gap-1.5 flex-1">
                              {product.specs.map((s) => (
                                <li key={s} className="flex items-start gap-2 text-[12px] text-slate-500">
                                  <span className="w-1 h-1 rounded-full bg-alta-blue flex-shrink-0 mt-1.5" aria-hidden="true" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                              <Link to="/contact" className="btn-outline !text-[12px] !px-3 !py-2 flex-1 justify-center" style={{ minHeight: '36px' }}>
                                Request Quote
                              </Link>
                              <a href="#" className="btn-ghost !text-[12px] !px-3 !py-2 flex items-center gap-1" style={{ minHeight: '36px' }}>
                                <Download size={12} /> Datasheet
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RFQ Form (preserved from original) ─────────────────────────────── */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="text-center mb-8">
            <p className="overline-tag justify-center text-alta-blue mb-3">Request a Quote</p>
            <h2 className="section-heading-light">Need a Formal Quotation for Procurement?</h2>
            <p className="section-subheading-light mx-auto text-center">Used by government procurement offices and enterprise buyers across Ethiopia.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            {rfqSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-[18px] font-bold text-navy-900 mb-2">RFQ Submitted!</h3>
                <p className="text-slate-500 text-[14px]">Our sales team will respond with a formal quotation within 24 hours.</p>
              </div>
            ) : (
            <form className="flex flex-col gap-4" onSubmit={handleRfqSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input name="fullName" type="text" className={`form-input${errCls(rfqFe.fullName)}`} placeholder="Tadesse Bekele" />
                  {rfqFe.fullName && <p className="text-red-500 text-[11px] mt-1">{rfqFe.fullName}</p>}
                </div>
                <div>
                  <label className="form-label">Organisation *</label>
                  <input name="organisation" type="text" className={`form-input${errCls(rfqFe.organisation)}`} placeholder="Commercial Bank of Ethiopia" />
                  {rfqFe.organisation && <p className="text-red-500 text-[11px] mt-1">{rfqFe.organisation}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email *</label>
                  <input name="email" type="email" className={`form-input${errCls(rfqFe.email)}`} placeholder="tadesse@org.com" />
                  {rfqFe.email && <p className="text-red-500 text-[11px] mt-1">{rfqFe.email}</p>}
                </div>
                <div><label className="form-label">Phone</label><input name="phone" type="tel" className="form-input" placeholder="+251 911 000 000" /></div>
              </div>
              <div>
                <label className="form-label">Product Category</label>
                <select name="productCategory" className="form-input">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="form-label">Products of Interest</label><textarea name="productsOfInterest" rows={3} className="form-input resize-none" placeholder="List the specific products or models you need…" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Quantity Estimate</label>
                  <input name="quantityEstimate" type="text" className="form-input" placeholder="e.g. 10 units" />
                </div>
                <div>
                  <label className="form-label">Additional Notes</label>
                  <input name="additionalNotes" type="text" className="form-input" placeholder="Delivery timeline, budget, etc." />
                </div>
              </div>
              {rfqError && <p className="text-red-500 text-[13px]">{rfqError}</p>}
              <button type="submit" disabled={rfqLoading} className="btn-primary w-full justify-center text-[15px] py-4 mt-2">
                {rfqLoading ? 'Sending...' : 'Submit RFQ'} <ArrowRight size={15} />
              </button>
            </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
