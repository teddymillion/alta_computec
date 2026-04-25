const U = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=380&fit=crop&q=80`;

// img aliases reused across subcategories
const IMG = {
  server1:   U('1695668548342-c0c1ad479aee'),
  server2:   U('1762163516269-3c143e04175c'),
  server3:   U('1759836096317-e746643cc277'),
  storage1:  U('1601737487795-dab272f52420'),
  storage2:  U('1680992046626-418f7e910589'),
  net1:      U('1680691257251-5fead813b73e'),
  net2:      U('1682559736721-c2e77ff4c650'),
  net3:      U('1750710583720-8b3bdd0f658a'),
  net4:      U('1750711158632-5273ec9b9b86'),
  sec1:      U('1548092372-0d1bd40894a3'),
  sec2:      U('1550751827-4bd374c3f58b'),
  sec3:      U('1667264501379-c1537934c7ab'),
  sec4:      U('1759752394755-1241472b589d'),
  power1:    U('1757262441258-df389b0ce39b'),
  power2:    U('1775558582580-920234177fcd'),
  collab1:   U('1764795849878-59b546cfe9c7'),
  collab2:   U('1764810815228-b7f9432eec5c'),
  collab3:   U('1758691736580-a41e0cfe9e9f'),
  collab4:   U('1542744173-8e7e53415bb0'),
  soft1:     U('1551288049-bebda4e38f71'),
  soft2:     U('1759752394755-1241472b589d'),
  laptop1:   U('1548092372-0d1bd40894a3'),
  laptop2:   U('1550751827-4bd374c3f58b'),
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// subs: string[]  → flat list (most categories)
// subs: { name, children }[]  → 3-level hierarchy (Solutions)
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    name: 'CLIENT PRODUCTS',
    icon: 'Monitor',
    accent: '#1B4FD8',
    subs: ['Desktop', 'Laptop', 'Copier', 'Printer', 'Scanner', 'Projector', 'Toners', 'External Drive', 'Flash Drive', 'Accessories', 'Spare Parts'],
  },
  {
    name: 'ENTERPRISE PRODUCTS',
    icon: 'Server',
    accent: '#16A34A',
    subs: ['Server', 'Storage', 'Workstation', 'Switch', 'Router', 'Firewall', 'Server Rack', 'Backup Device'],
  },
  {
    name: 'POWER QUALITY',
    icon: 'Zap',
    accent: '#F59E0B',
    subs: ['UPS', 'Surge Protector'],
  },
  {
    name: 'BANKING AUTOMATION',
    icon: 'CreditCard',
    accent: '#6366F1',
    subs: ['ATM', 'POS'],
  },
  {
    name: 'COLLABORATION & COMMUNICATION',
    icon: 'Video',
    accent: '#0EA5E9',
    subs: ['Smart Screen', 'Headset'],
  },
  {
    name: 'SOLUTIONS',
    icon: 'Layers',
    accent: '#DC2626',
    subs: [
      {
        name: 'Infrastructure',
        children: ['Datacenter Solution', 'Consultancy', 'Projects', 'Other Solutions'],
      },
      {
        name: 'Software',
        children: ['Software'],
      },
      {
        name: 'Service',
        children: ['Technical Support'],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// Each: { name, img, brand, mainCategory, subcategory, specs[] }
// ─────────────────────────────────────────────────────────────────────────────
export const PRODUCTS = [

  // ── CLIENT PRODUCTS — Desktop ───────────────────────────────────────────────
  { name: 'Dell OptiPlex 7090 Tower', img: IMG.collab4, brand: 'Dell', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Desktop', specs: ['Intel i7 11th Gen', '16GB DDR4 / 512GB SSD', 'Windows 11 Pro'] },
  { name: 'HP EliteDesk 800 G9 SFF', img: IMG.soft1, brand: 'HP', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Desktop', specs: ['Intel i5/i7 options', 'Up to 64GB DDR5', 'HPE Sure Shield security'] },
  { name: 'Lenovo ThinkCentre M70t Gen 3', img: IMG.sec4, brand: 'Lenovo', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Desktop', specs: ['Intel i5 12th Gen', '8–32GB DDR5', 'Ultra-small form factor'] },

  // ── CLIENT PRODUCTS — Laptop ────────────────────────────────────────────────
  { name: 'Dell Latitude 5540', img: IMG.laptop1, brand: 'Dell', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Laptop', specs: ['Intel i5/i7 13th Gen', '16GB LPDDR5 / 512GB NVMe', 'IR camera + fingerprint'] },
  { name: 'HP EliteBook 840 G10', img: IMG.laptop2, brand: 'HP', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Laptop', specs: ['Intel i7 13th Gen', '16–32GB DDR5', 'Sure Shield & Sure View'] },
  { name: 'Lenovo ThinkPad T14 Gen 4', img: IMG.sec3, brand: 'Lenovo', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Laptop', specs: ['AMD Ryzen 7 / Intel i7', 'Up to 64GB RAM', 'MIL-SPEC 810H tested'] },

  // ── CLIENT PRODUCTS — Copier ────────────────────────────────────────────────
  { name: 'HP LaserJet MFP M438nda', img: IMG.net1, brand: 'HP', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Copier', specs: ['Print / Copy / Scan', '40 ppm', 'Duplex & network ready'] },
  { name: 'Canon imageRUNNER 2625i', img: IMG.net2, brand: 'Canon', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Copier', specs: ['25 ppm A4 colour', 'Cloud print ready', '10.1" touch LCD'] },

  // ── CLIENT PRODUCTS — Printer ───────────────────────────────────────────────
  { name: 'Epson WorkForce Pro WF-C5790', img: IMG.net3, brand: 'Epson', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Printer', specs: ['Colour inkjet 34 ppm', 'Wi-Fi & Ethernet', 'Auto 2-sided print'] },
  { name: 'HP LaserJet Enterprise M507dn', img: IMG.server1, brand: 'HP', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Printer', specs: ['45 ppm mono laser', 'Auto duplex', 'JetIntelligence toner'] },

  // ── CLIENT PRODUCTS — Scanner ───────────────────────────────────────────────
  { name: 'Fujitsu fi-7300NX', img: IMG.storage1, brand: 'Fujitsu', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Scanner', specs: ['60 ppm / 120 ipm duplex', 'Network scanning', 'A4 flatbed + ADF'] },
  { name: 'Canon DR-C230', img: IMG.server2, brand: 'Canon', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Scanner', specs: ['30 ppm duplex', 'Compact footprint', 'USB & wireless'] },

  // ── CLIENT PRODUCTS — Projector ─────────────────────────────────────────────
  { name: 'Epson EB-L510U Laser Projector', img: IMG.collab3, brand: 'Epson', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Projector', specs: ['5000 lm laser light source', 'WUXGA 1920×1200', '20,000 hr lamp-free life'] },
  { name: 'BenQ MH560 1080p Projector', img: IMG.collab1, brand: 'BenQ', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Projector', specs: ['3800 lm brightness', 'Full HD 1080p', 'HDMI & VGA inputs'] },

  // ── CLIENT PRODUCTS — Toners ────────────────────────────────────────────────
  { name: 'HP LaserJet Toner 87A', img: IMG.power1, brand: 'HP', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Toners', specs: ['9,000 pages yield', 'Mono laser toner', 'Genuine HP cartridge'] },
  { name: 'Canon 057H High Yield Toner', img: IMG.power2, brand: 'Canon', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Toners', specs: ['10,000 pages yield', 'MF443/445/449 series', 'OEM quality'] },

  // ── CLIENT PRODUCTS — External Drive ───────────────────────────────────────
  { name: 'Seagate Backup Plus 4TB', img: IMG.storage2, brand: 'Seagate', mainCategory: 'CLIENT PRODUCTS', subcategory: 'External Drive', specs: ['4TB USB 3.0 portable HDD', 'Auto-backup software', 'Password protection'] },
  { name: 'WD My Passport 2TB SSD', img: IMG.storage1, brand: 'Western Digital', mainCategory: 'CLIENT PRODUCTS', subcategory: 'External Drive', specs: ['2TB USB-C', 'Hardware encryption', 'Drop-resistant casing'] },

  // ── CLIENT PRODUCTS — Flash Drive ──────────────────────────────────────────
  { name: 'SanDisk Ultra 128GB USB 3.0', img: IMG.net3, brand: 'SanDisk', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Flash Drive', specs: ['128GB capacity', 'Up to 130 MB/s read', 'Retractable design'] },
  { name: 'Kingston DataTraveler 64GB', img: IMG.net4, brand: 'Kingston', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Flash Drive', specs: ['64GB USB 3.2 Gen 1', 'Capless design', 'Windows & Mac compatible'] },

  // ── CLIENT PRODUCTS — Accessories ──────────────────────────────────────────
  { name: 'Dell USB-C Business Dock WD19S', img: IMG.collab4, brand: 'Dell', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Accessories', specs: ['90W power delivery', 'HDMI + DP + USB-A/C', 'Single cable connect'] },
  { name: 'Logitech MX Keys S Business', img: IMG.soft1, brand: 'Logitech', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Accessories', specs: ['Wireless keyboard + mouse', 'Multi-device Bluetooth', 'USB-C rechargeable'] },

  // ── CLIENT PRODUCTS — Spare Parts (NEW) ────────────────────────────────────
  { name: 'Laptop Screen Replacement Panel', img: IMG.sec4, brand: 'Multi-Brand', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Spare Parts', specs: ['Compatible: Dell/HP/Lenovo', 'HD & FHD variants', 'OEM Quality'] },
  { name: 'Desktop Power Supply Unit 600W', img: IMG.power1, brand: 'Multi-Brand', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Spare Parts', specs: ['80 Plus Bronze Certified', 'ATX Standard', 'Universal Fit'] },
  { name: 'Laptop Battery Replacement Pack', img: IMG.storage2, brand: 'Multi-Brand', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Spare Parts', specs: ['OEM Compatible', '6-cell/9-cell variants', '12-month warranty'] },
  { name: 'Server Memory Module 32GB DDR4', img: IMG.server3, brand: 'Multi-Brand', mainCategory: 'CLIENT PRODUCTS', subcategory: 'Spare Parts', specs: ['ECC Registered', '2933MHz speed', 'Dell/HP/IBM Compatible'] },

  // ── ENTERPRISE PRODUCTS — Server ───────────────────────────────────────────
  { name: 'Dell PowerEdge R750', img: IMG.server1, brand: 'Dell EMC', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Server', specs: ['3rd Gen Intel Xeon Scalable', 'Up to 3TB DDR4 RAM', 'NVMe SSD & SAS options'] },
  { name: 'HP ProLiant DL380 Gen11', img: IMG.server2, brand: 'HPe', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Server', specs: ['Dual Intel Xeon processors', 'HPE iLO 6 management', 'Hot-plug SAS/SATA drives'] },
  { name: 'IBM Power S1022', img: IMG.net2, brand: 'IBM', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Server', specs: ['IBM POWER10 processor', 'Up to 2TB ECC RAM', 'AIX, IBM i, Linux ready'] },

  // ── ENTERPRISE PRODUCTS — Storage ──────────────────────────────────────────
  { name: 'Dell PowerVault ME5', img: IMG.storage1, brand: 'Dell EMC', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Storage', specs: ['12Gb/s SAS connectivity', 'Up to 5PB raw capacity', 'Automated storage tiering'] },
  { name: 'IBM FlashSystem 5200', img: IMG.server3, brand: 'IBM', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Storage', specs: ['NVMe all-flash storage', '99.9999% availability', 'AI-powered management'] },
  { name: 'HPe MSA 2060 SAN Storage', img: IMG.net1, brand: 'HPe', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Storage', specs: ['12Gb SAS / 16Gb FC', 'SSD + SAS hybrid tiers', 'iSCSI connectivity'] },

  // ── ENTERPRISE PRODUCTS — Workstation ──────────────────────────────────────
  { name: 'Dell Precision 5860 Tower', img: IMG.sec3, brand: 'Dell', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Workstation', specs: ['Intel Xeon W-2400 series', 'Up to 2TB ECC RAM', 'NVIDIA RTX 4000 Ada'] },
  { name: 'HP Z8 Fury G5 Workstation', img: IMG.server1, brand: 'HP', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Workstation', specs: ['Dual Xeon Scalable', 'Up to 8TB DDR5 RAM', 'PCIe Gen 5 slots'] },

  // ── ENTERPRISE PRODUCTS — Switch ───────────────────────────────────────────
  { name: 'Cisco Catalyst 9300', img: IMG.net1, brand: 'Cisco', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Switch', specs: ['48-port PoE+ switching', 'SD-Access ready', 'Cisco DNA Center managed'] },
  { name: 'Huawei CloudEngine S5735', img: IMG.net4, brand: 'Huawei', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Switch', specs: ['48-port enterprise switch', '10GE uplink ports', 'Smart management platform'] },

  // ── ENTERPRISE PRODUCTS — Router ───────────────────────────────────────────
  { name: 'Cisco ISR 4000 Router', img: IMG.net3, brand: 'Cisco', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Router', specs: ['Integrated security services', 'SD-WAN capable', 'Gigabit throughput'] },
  { name: 'Huawei AR6120 Enterprise Router', img: IMG.net2, brand: 'Huawei', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Router', specs: ['4G LTE WAN backup', 'SD-WAN ready', 'Dual-WAN failover'] },

  // ── ENTERPRISE PRODUCTS — Firewall ─────────────────────────────────────────
  { name: 'Fortinet FortiGate 200F', img: IMG.sec2, brand: 'Fortinet', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Firewall', specs: ['Next-gen firewall', 'SD-WAN integrated', '20Gbps firewall throughput'] },
  { name: 'Fortinet FortiGate NGFW', img: IMG.sec1, brand: 'Fortinet', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Firewall', specs: ['IPS & SSL inspection', 'Zero-trust network access', 'Threat intelligence feeds'] },
  { name: 'Cisco Firepower 1140', img: IMG.sec3, brand: 'Cisco', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Firewall', specs: ['NGFW with AMP', 'Centralized FMC management', 'Snort 3 IPS engine'] },

  // ── ENTERPRISE PRODUCTS — Server Rack ──────────────────────────────────────
  { name: 'APC NetShelter SX 42U', img: IMG.server1, brand: 'APC', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Server Rack', specs: ['42U 600×1070mm footprint', 'Side panels included', 'Cable management arms'] },
  { name: 'Rittal TS IT Server Cabinet', img: IMG.server3, brand: 'Rittal', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Server Rack', specs: ['600mm × 1000mm footprint', 'IP 20 protection', 'Pre-configured airflow'] },

  // ── ENTERPRISE PRODUCTS — Backup Device ────────────────────────────────────
  { name: 'Dell EMC PowerProtect DD3300', img: IMG.server2, brand: 'Dell EMC', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Backup Device', specs: ['Up to 48TB usable', 'DD Boost deduplication', 'Cloud tiering ready'] },
  { name: 'HPe StoreOnce 3620', img: IMG.storage2, brand: 'HPe', mainCategory: 'ENTERPRISE PRODUCTS', subcategory: 'Backup Device', specs: ['48TB usable capacity', 'StoreOnce Catalyst', 'Veeam & Commvault certified'] },

  // ── POWER QUALITY — UPS ────────────────────────────────────────────────────
  { name: 'Eaton 9SX 6000i UPS', img: IMG.storage2, brand: 'Eaton', mainCategory: 'POWER QUALITY', subcategory: 'UPS', specs: ['6kVA online double conversion', 'LCD display & monitoring', 'Hot-swappable batteries'] },
  { name: 'Vertiv Liebert GXT5 10kVA', img: IMG.power1, brand: 'Vertiv', mainCategory: 'POWER QUALITY', subcategory: 'UPS', specs: ['10kVA online UPS', 'Remote monitoring card', 'Scalable runtime extension'] },
  { name: 'Eaton 93PM Modular UPS', img: IMG.net2, brand: 'Eaton', mainCategory: 'POWER QUALITY', subcategory: 'UPS', specs: ['10–200kW 3-phase UPS', 'Modular & scalable design', 'High efficiency mode 96%'] },
  { name: 'Vertiv VRC Precision Cooling', img: IMG.power2, brand: 'Vertiv', mainCategory: 'POWER QUALITY', subcategory: 'UPS', specs: ['10kW precision cooling', 'In-row deployment', 'Remote management card'] },

  // ── POWER QUALITY — Surge Protector ────────────────────────────────────────
  { name: 'APC P11VNT3 11-Outlet Surge', img: IMG.net3, brand: 'APC', mainCategory: 'POWER QUALITY', subcategory: 'Surge Protector', specs: ['11-outlet power strip', '3020 joule rating', 'Network & phone line protection'] },
  { name: 'Tripp Lite TLP1208TEL 12-Outlet', img: IMG.collab4, brand: 'Tripp Lite', mainCategory: 'POWER QUALITY', subcategory: 'Surge Protector', specs: ['12 outlets / 3345 joules', 'Tel/modem protection', 'Lifetime product warranty'] },

  // ── BANKING AUTOMATION — ATM ────────────────────────────────────────────────
  { name: 'Diebold Nixdorf DN Series ATM', img: IMG.collab2, brand: 'Diebold Nixdorf', mainCategory: 'BANKING AUTOMATION', subcategory: 'ATM', specs: ['Cash recycling module', 'EMV chip & NFC contactless', 'Wincor PROTOP software'] },
  { name: 'NCR SelfServ 80 ATM', img: IMG.collab3, brand: 'NCR', mainCategory: 'BANKING AUTOMATION', subcategory: 'ATM', specs: ['Pedestal & through-wall', 'Biometric auth option', 'NCR APTRA software'] },
  { name: 'GRG Banking H68N ATM', img: IMG.collab1, brand: 'GRG Banking', mainCategory: 'BANKING AUTOMATION', subcategory: 'ATM', specs: ['Cash deposit & dispense', 'NFC / contactless', 'Anti-skimming certified'] },

  // ── BANKING AUTOMATION — POS ────────────────────────────────────────────────
  { name: 'Ingenico Desk 3500 POS', img: IMG.soft1, brand: 'Ingenico', mainCategory: 'BANKING AUTOMATION', subcategory: 'POS', specs: ['EMV + NFC + Magstripe', 'Colour touch screen', 'Wi-Fi & Ethernet'] },
  { name: 'Verifone P200 Plus POS', img: IMG.sec4, brand: 'Verifone', mainCategory: 'BANKING AUTOMATION', subcategory: 'POS', specs: ['PCI PTS 5.x certified', 'Backlit PIN pad', 'Contactless tap-to-pay'] },

  // ── COLLABORATION & COMMUNICATION — Smart Screen (corrected brands) ─────────
  { name: 'Samsung Flip Pro 85" Interactive', img: IMG.collab1, brand: 'Samsung', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Smart Screen', specs: ['85" 4K UHD interactive', '20-point multi-touch', 'Wireless screen mirroring'] },
  { name: 'LG CreateBoard 75" TR3BF', img: IMG.collab2, brand: 'LG', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Smart Screen', specs: ['75" 4K UHD touch display', 'Built-in stylus pen', 'HDMI + USB-C + Wi-Fi'] },
  { name: 'BenQ Board RP8603 86"', img: IMG.collab3, brand: 'BenQ', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Smart Screen', specs: ['86" 4K touch display', 'Eye-Care Pro certified', 'DMS classroom software'] },
  { name: 'ViewSonic IFP8652 86" ViewBoard', img: IMG.collab4, brand: 'ViewSonic', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Smart Screen', specs: ['86" 4K UHD', '20-point IR touch', 'myViewBoard included'] },

  // ── COLLABORATION & COMMUNICATION — Headset ─────────────────────────────────
  { name: 'Jabra PanaCast 50 Camera', img: IMG.collab3, brand: 'Jabra', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Headset', specs: ['4K AI panoramic camera', '180° field of view', 'USB plug-and-play'] },
  { name: 'Poly Studio X70 Video Bar', img: IMG.collab4, brand: 'Poly', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Headset', specs: ['4K dual camera system', 'AI noise cancellation', 'Teams & Zoom certified'] },
  { name: 'Jabra Evolve2 85 Wireless', img: IMG.sec4, brand: 'Jabra', mainCategory: 'COLLABORATION & COMMUNICATION', subcategory: 'Headset', specs: ['Active noise cancellation', 'USB-A & USB-C versions', '37-hour battery life'] },

  // ── SOLUTIONS — Datacenter Solution ────────────────────────────────────────
  { name: 'Enterprise Data Center Design', img: IMG.server1, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Datacenter Solution', specs: ['Dell EMC + Cisco infrastructure', 'VMware virtualization layer', 'Fortinet network security'] },
  { name: 'Hyperconverged Infrastructure (HCI)', img: IMG.server2, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Datacenter Solution', specs: ['VMware vSAN or Nutanix', 'Scale-out architecture', 'Single pane of glass mgmt'] },
  { name: 'Colocation & Managed DC Services', img: IMG.server3, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Datacenter Solution', specs: ['24/7 NOC monitoring', 'SLA-backed uptime guarantee', 'Remote hands support'] },

  // ── SOLUTIONS — Consultancy ─────────────────────────────────────────────────
  { name: 'IT Strategy & Roadmap Consulting', img: IMG.soft1, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Consultancy', specs: ['Technology assessment', '3-year digital roadmap', 'C-level advisory sessions'] },
  { name: 'Vendor Selection & Procurement Advisory', img: IMG.collab3, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Consultancy', specs: ['Multi-vendor comparison', 'RFP preparation support', 'Cost optimisation'] },

  // ── SOLUTIONS — Projects ────────────────────────────────────────────────────
  { name: 'Turnkey IT Project Management', img: IMG.collab2, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Projects', specs: ['End-to-end delivery', 'Prince2 methodology', 'Real-time progress reporting'] },
  { name: 'System Integration Projects', img: IMG.collab1, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Projects', specs: ['Multi-vendor integration', 'API development & testing', 'UAT & go-live support'] },

  // ── SOLUTIONS — Other Solutions ─────────────────────────────────────────────
  { name: 'IT Training & Certification Programs', img: IMG.collab4, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Other Solutions', specs: ['Dell/Cisco/Oracle certified', 'On-site or remote delivery', 'Certificate of completion'] },
  { name: 'IT Health Check & Audit', img: IMG.net1, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Other Solutions', specs: ['Full infrastructure audit', 'Gap analysis report', 'Remediation road map'] },

  // ── SOLUTIONS — Software ────────────────────────────────────────────────────
  { name: 'Oracle Fusion ERP', img: IMG.soft1, brand: 'Oracle', mainCategory: 'SOLUTIONS', subcategory: 'Software', specs: ['Cloud ERP platform', 'Finance, HR & supply chain', 'Ethiopian compliance ready'] },
  { name: 'Microsoft 365 Enterprise', img: IMG.sec4, brand: 'Microsoft', mainCategory: 'SOLUTIONS', subcategory: 'Software', specs: ['Full Office app suite', 'Microsoft Teams & Azure AD', '1TB OneDrive per user'] },
  { name: 'Kaspersky Endpoint Security Cloud', img: IMG.sec1, brand: 'Kaspersky', mainCategory: 'SOLUTIONS', subcategory: 'Software', specs: ['EDR & anti-ransomware', 'Cloud management console', 'Multi-platform protection'] },
  { name: 'Backbase Digital Banking Platform', img: IMG.server3, brand: 'Backbase', mainCategory: 'SOLUTIONS', subcategory: 'Software', specs: ['Core banking UI platform', 'Mobile-first architecture', 'API-first integration'] },

  // ── SOLUTIONS — Technical Support ───────────────────────────────────────────
  { name: 'Annual Maintenance Contract (AMC)', img: IMG.server1, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Technical Support', specs: ['Preventive maintenance visits', '8×5 or 24×7 SLA options', 'On-site certified engineers'] },
  { name: 'Break-Fix & On-site Support', img: IMG.storage2, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Technical Support', specs: ['4-hour response SLA', 'Certified field engineers', 'On-site spare parts stock'] },
  { name: 'Remote Monitoring & Management', img: IMG.sec2, brand: 'ALTA Services', mainCategory: 'SOLUTIONS', subcategory: 'Technical Support', specs: ['24/7 NOC operations', 'Proactive alert management', 'Monthly health reports'] },
];
